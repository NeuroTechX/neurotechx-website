"""Build the small motor imagery excerpt used by the Learn motor imagery lab.

Source: PhysioNet EEG Motor Movement/Imagery Dataset v1.0.0 (Schalk et al., 2004;
Goldberger et al., 2000), ODC-By 1.0. Runs 4, 8 and 12 are imagined opening and closing
of the left (T1) or right (T2) fist. Subjects 1 to 10 are used, in order, with no selection.
The 64 channels are re-referenced to their common average before anything else.

For every subject the script stores:
  - erd: mean band-power change (%) from the -1 to 0 s baseline, per class, channel (C3, Cz, C4)
    and band (mu 8-13 Hz, beta 13-30 Hz), in 250 ms bins from -1 to 4 s.
  - trials: per-trial spatial covariance (upper triangle, µV²) of 9 sensorimotor channels,
    band-passed 8-30 Hz, 0.5-2.5 s after the cue, plus the class label (0 left, 1 right).

Usage (MNE downloads about 75 MB of EDF files on the first run):
    python scripts/build-learn-motor-imagery.py src/content/learn/motor-imagery-data.json
"""

import argparse
import json

import mne
import numpy as np
from mne.datasets import eegbci

SUBJECTS = range(1, 11)
RUNS = [4, 8, 12]
ERD_CHANNELS = ["C3", "Cz", "C4"]
CSP_CHANNELS = ["FC3", "FCz", "FC4", "C3", "Cz", "C4", "CP3", "CPz", "CP4"]
BANDS = {"mu": (8.0, 13.0), "beta": (13.0, 30.0)}
TMIN, TMAX = -1.0, 4.0
BIN = 0.25
COV_WINDOW = (0.5, 2.5)


def load(subject):
    files = eegbci.load_data(subject, RUNS, update_path=False, verbose="ERROR")
    raw = mne.concatenate_raws([mne.io.read_raw_edf(f, preload=True, verbose="ERROR") for f in files])
    eegbci.standardize(raw)
    raw.set_eeg_reference("average", projection=False, verbose="ERROR")  # common average of all 64 channels
    events, _ = mne.events_from_annotations(raw, event_id=dict(T1=0, T2=1), verbose="ERROR")
    return raw, events


def erd_curves(raw, events):
    curves = {}
    edges = np.arange(TMIN, TMAX + 1e-9, BIN)
    for band, (low, high) in BANDS.items():
        filtered = raw.copy().pick(ERD_CHANNELS).filter(low, high, verbose="ERROR")
        filtered.apply_hilbert(envelope=True, verbose="ERROR")
        epochs = mne.Epochs(filtered, events, dict(left=0, right=1), TMIN, TMAX, baseline=None,
                            preload=True, verbose="ERROR")
        times = epochs.times
        for label in ("left", "right"):
            power = (epochs[label].get_data(copy=False) ** 2).mean(axis=0)  # channels x times
            base = power[:, times < 0].mean(axis=1, keepdims=True)
            change = 100 * (power / base - 1)
            binned = np.stack([change[:, (times >= a) & (times < a + BIN)].mean(axis=1) for a in edges[:-1]], axis=1)
            for ch, row in zip(ERD_CHANNELS, binned):
                curves.setdefault(label, {}).setdefault(ch, {})[band] = [round(float(v), 1) for v in row]
    return curves


def trial_covariances(raw, events):
    filtered = raw.copy().pick(CSP_CHANNELS).filter(8.0, 30.0, verbose="ERROR")
    epochs = mne.Epochs(filtered, events, dict(left=0, right=1), *COV_WINDOW, baseline=None,
                        preload=True, verbose="ERROR")
    data = epochs.get_data(copy=False) * 1e6  # volts to microvolts
    upper = np.triu_indices(len(CSP_CHANNELS))
    trials = []
    for x, label in zip(data, epochs.events[:, 2]):
        x = x - x.mean(axis=1, keepdims=True)
        cov = x @ x.T / x.shape[1]
        trials.append({"y": int(label), "c": [float(f"{v:.5g}") for v in cov[upper]]})
    return trials


def main(target):
    subjects = []
    for subject in SUBJECTS:
        raw, events = load(subject)
        subjects.append({"id": f"S{subject:03d}", "erd": erd_curves(raw, events),
                         "trials": trial_covariances(raw, events)})
        print(subject, len(subjects[-1]["trials"]))
    out = {
        "dataset": "https://physionet.org/content/eegmmidb/1.0.0/",
        "license": "https://opendatacommons.org/licenses/by/1-0/",
        "credit": "Schalk et al. (2004), IEEE TBME 51(6):1034-1043; Goldberger et al. (2000), Circulation 101(23):e215-e220.",
        "extraction": "scripts/build-learn-motor-imagery.py: runs 4, 8, 12 (imagined left/right fist), subjects 1-10, 160 Hz.",
        "sampleRate": 160,
        "erdChannels": ERD_CHANNELS,
        "cspChannels": CSP_CHANNELS,
        "erdStart": TMIN,
        "erdBin": BIN,
        "covWindow": list(COV_WINDOW),
        "subjects": subjects,
    }
    with open(target, "w") as f:
        json.dump(out, f, separators=(",", ":"))


if __name__ == "__main__":
    parser = argparse.ArgumentParser(description=__doc__, formatter_class=argparse.RawDescriptionHelpFormatter)
    parser.add_argument("target", help="Output JSON file")
    main(parser.parse_args().target)
