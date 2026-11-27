"""Build the small browser excerpt from OpenNeuro ds005927 v1.0.0 (Kernel Flow2)."""

import argparse
import csv
import hashlib
import json
from pathlib import Path

import h5py
import numpy as np


RECORDING = "sub-001_task-fingertapping_nirs.snirf"
EVENTS = "sub-001_task-fingertapping_events.tsv"
SOURCE_BY_REGION = {"left": "M021S01", "right": "M020S01"}
CHROMOPHORES = ("hbo", "hbr")
START, STOP, SAMPLE_RATE = -5, 30, 2
TIME = np.arange(START, STOP, 1 / SAMPLE_RATE)


def read_motor_regions(snirf_path):
    """Average each region's paired HbO and HbR channels with 15–30 mm separations."""
    regions = {}
    waves = {}
    with h5py.File(snirf_path) as file:
        data = file["nirs/data1"]
        probe = file["nirs/probe"]
        if file["nirs/metaDataTags/LengthUnit"][()] != b"mm":
            raise ValueError("Expected optode coordinates in mm.")
        if file["nirs/metaDataTags/TimeUnit"][()] != b"s":
            raise ValueError("Expected sample times in seconds.")
        sources = probe["sourceLabels"].asstr()[:].tolist()
        detectors = probe["detectorLabels"].asstr()[:]
        source_positions = probe["sourcePos3D"][:]
        detector_positions = probe["detectorPos3D"][:]
        series = data["dataTimeSeries"]
        time = data["time"][:]
        if not np.all(np.diff(time) > 0):
            raise ValueError("Expected increasing sample times.")

        for region, name in SOURCE_BY_REGION.items():
            source = sources.index(name)
            columns = {label: {} for label in CHROMOPHORES}
            for column in range(series.shape[1]):
                measurement = data[f"measurementList{column + 1}"]
                if measurement["sourceIndex"][()] - 1 != source:
                    continue
                detector = measurement["detectorIndex"][()] - 1
                separation = np.linalg.norm(source_positions[source] - detector_positions[detector])
                if not 15 <= separation <= 30:
                    continue
                chromophore = measurement["dataTypeLabel"][()].decode().lower()
                if chromophore in columns:
                    if measurement["dataUnit"][()] != b"uM":
                        raise ValueError("Expected hemoglobin concentration in micromolar.")
                    columns[chromophore][detector] = column
            if not columns["hbo"] or columns["hbo"].keys() != columns["hbr"].keys():
                raise ValueError(f"Could not find paired HbO/HbR measurements for {name}.")

            regions[region] = {
                "source": name,
                "detectors": [detectors[index] for index in sorted(columns["hbo"])],
            }
            waves[region] = {
                chromophore: series[:, sorted(indices.values())].mean(axis=1)
                for chromophore, indices in columns.items()
            }
    return time, regions, waves


def sha256(path):
    with path.open("rb") as file:
        return hashlib.file_digest(file, "sha256").hexdigest()


def build(input_dir):
    snirf_path = input_dir / RECORDING
    events_path = input_dir / EVENTS
    time, regions, waves = read_motor_regions(snirf_path)
    blocks = {"left": [], "right": []}
    with events_path.open(newline="") as file:
        for event in csv.DictReader(file, delimiter="\t"):
            if event["event_name"] != "start_block":
                continue
            onset = float(event["onset"])
            duration = float(event["duration"])
            sample_times = onset + TIME
            if sample_times[0] < time[0] or sample_times[-1] > time[-1]:
                raise ValueError(f"Block at {onset} s extends beyond the recording.")
            block = {"onset": round(onset, 6), "duration": round(duration, 6)}
            for region, signals in waves.items():
                block[region] = {}
                for chromophore, values in signals.items():
                    epoch = np.interp(sample_times, time, values)
                    epoch -= epoch[TIME < 0].mean()
                    if not np.isfinite(epoch).all():
                        raise ValueError(f"Non-finite signal in {region} {chromophore}.")
                    block[region][chromophore] = np.round(epoch, 3).tolist()
            blocks[event["block_type"]].append(block)

    if any(len(condition) != 10 for condition in blocks.values()):
        raise ValueError("Expected ten tapping blocks per hand in this recording.")
    return {
        "dataset": "https://openneuro.org/datasets/ds005927/versions/1.0.0",
        "doi": "10.18112/openneuro.ds005927.v1.0.0",
        "paper": "https://doi.org/10.1162/imag_a_00475",
        "license": "https://creativecommons.org/publicdomain/zero/1.0/",
        "subject": "sub-001",
        "sampleRate": SAMPLE_RATE,
        "start": START,
        "stop": STOP,
        "regions": regions,
        "rawFileSha256": {path.name: sha256(path) for path in (snirf_path, events_path)},
        "blocks": blocks,
    }


if __name__ == "__main__":
    parser = argparse.ArgumentParser(description=__doc__)
    parser.add_argument("input_dir", type=Path, help="Directory containing the SNIRF and events TSV")
    parser.add_argument("output", type=Path, help="Output JSON file")
    args = parser.parse_args()
    args.output.write_text(json.dumps(build(args.input_dir), separators=(",", ":")) + "\n")
