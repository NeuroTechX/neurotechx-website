"""Build the small browser excerpt from OpenNeuro ds005505 v1.0.1 (HBN-EEG Release 1).

The script uses MNE-Python to clean one participant's surround suppression recording
(128-channel EGI net plus the Cz reference), average the response to stimulus onset, and
compare the same scalp map sampled with every kept electrode, 64 or 32 electrodes, with and
without a surface Laplacian.
"""

import argparse
import csv
import hashlib
import json
from pathlib import Path

import mne
import numpy as np
from autoreject import AutoReject
from mne.channels.interpolation import _make_interpolation_matrix

SUBJECT = "sub-NDARAG143ARJ"
TASK = "surroundSupp"
RUNS = (1, 2)
TMIN, TMAX = -0.2, 0.6
DECIM = 4  # 500 Hz / 4 = 125 Hz, after a 20 Hz low-pass filter
DENSITIES = (64, 32)  # compared with every kept electrode
GRID = 31
TRIALS_SHOWN = 12
NOISY_RATIO = 3.0
EOG_PROXIES = ["E8", "E25", "E126", "E127"]  # electrodes above and below the eyes
# Peak search windows (s) on the global field power (spatial standard deviation) of the average.
WINDOWS = ((0.15, 0.25), (0.25, 0.35), (0.38, 0.55))


def sha256(path):
    with path.open("rb") as file:
        return hashlib.file_digest(file, "sha256").hexdigest()


def project(unit, scale):
    """Azimuthal equidistant projection, nose up (+y), right ear right (+x)."""
    theta = np.arccos(np.clip(unit[:, 2], -1, 1))
    phi = np.arctan2(unit[:, 1], unit[:, 0])
    r = theta / scale
    return np.column_stack([r * np.cos(phi), r * np.sin(phi)])


def unproject(xy, scale):
    theta = np.hypot(xy[:, 0], xy[:, 1]) * scale
    phi = np.arctan2(xy[:, 1], xy[:, 0])
    return np.column_stack([np.sin(theta) * np.cos(phi), np.sin(theta) * np.sin(phi), np.cos(theta)])


def farthest_point_order(unit, start):
    """Order electrodes so that every prefix is spread as evenly as possible over the net."""
    order = [start]
    distance = np.arccos(np.clip(unit @ unit[start], -1, 1))
    for _ in range(len(unit) - 1):
        distance[order] = -1
        nxt = int(np.argmax(distance))
        order.append(nxt)
        distance = np.minimum(distance, np.arccos(np.clip(unit @ unit[nxt], -1, 1)))
    return order


def read_run(input_dir, run):
    stem = f"{SUBJECT}_task-{TASK}_run-{run}"
    paths = [input_dir / f"{stem}_{suffix}" for suffix in ("eeg.set", "events.tsv", "channels.tsv")]
    raw = mne.io.read_raw_eeglab(paths[0], preload=True, verbose="error")
    if raw.info["sfreq"] != 500:
        raise ValueError("Expected 500 Hz recordings.")
    with paths[2].open(newline="") as file:
        names = [row["name"] for row in csv.DictReader(file, delimiter="\t") if row["type"] == "EEG"]
    if names != raw.ch_names or len(names) != 129:
        raise ValueError("Channel list differs from channels.tsv.")
    with paths[1].open(newline="") as file:
        stimuli = [row for row in csv.DictReader(file, delimiter="\t") if row["value"] == "stim_ON"]
    # Keep onsets where something appears on screen (the blank condition shows only the fixation dot).
    shown = [row for row in stimuli if not (row["background"] == "0" and row["foreground_contrast"] == "0")]
    annotated = raw.annotations.onset[raw.annotations.description == "stim_ON"]
    if len(annotated) != len(stimuli) or np.abs(annotated - [float(row["onset"]) for row in stimuli]).max() > 1 / 500:
        raise ValueError("events.tsv does not match the stim_ON markers in the recording.")
    samples = np.array([int(row["sample"]) for row in shown])
    # Keep the task section only (the second run also contains a video after the task).
    raw.crop(samples.min() / 500 - 10, min(samples.max() / 500 + 10, raw.times[-1]))
    return raw, samples, paths


def noisy_channels(raw):
    """Channels whose standard deviation is over 3x (or under 0.1x) the median across the net."""
    probe = raw.copy().set_eeg_reference("average", verbose="error")
    sd = probe.get_data().std(axis=1)
    median = np.median(sd)
    return {name for name, value in zip(raw.ch_names, sd) if value > NOISY_RATIO * median or value < median / 10}


def remove_eye_components(raw):
    fit = raw.copy().filter(1.0, None, verbose="error")
    ica = mne.preprocessing.ICA(n_components=30, method="picard", random_state=0, max_iter=500, verbose="error")
    ica.fit(fit, decim=2, reject={"eeg": 1e-3}, verbose="error")
    proxies = [name for name in EOG_PROXIES if name not in raw.info["bads"]]
    eye, _ = ica.find_bads_eog(raw, ch_name=proxies, verbose="error")
    ica.exclude = [int(index) for index in eye]
    ica.apply(raw, verbose="error")
    return len(ica.exclude)


def build(input_dir):
    runs = [read_run(input_dir, run) for run in RUNS]
    full_info = runs[0][0].info.copy()
    for raw, _, _ in runs:
        raw.filter(0.5, 20.0, h_trans_bandwidth=4.0, n_jobs=4, verbose="error")
    # A channel that is noisy in either run is left out of every comparison below.
    excluded = sorted(set().union(*(noisy_channels(raw) for raw, _, _ in runs)), key=full_info.ch_names.index)
    epochs_list, report = [], []
    for raw, samples, _ in runs:
        raw.info["bads"] = list(excluded)
        raw.set_eeg_reference("average", verbose="error")  # average of the kept channels
        removed = remove_eye_components(raw)
        raw.pick("eeg", exclude="bads")
        events = np.column_stack([samples, np.zeros_like(samples), np.ones_like(samples)])
        epochs = mne.Epochs(raw, events, event_id={"onset": 1}, tmin=TMIN, tmax=TMAX, baseline=(None, 0),
                            decim=DECIM, preload=True, verbose="error")
        report.append({"icaRemoved": removed, "onsets": len(epochs)})
        epochs_list.append(epochs)
    epochs = mne.concatenate_epochs(epochs_list, verbose="error")
    # Autoreject learns per-channel thresholds, repairs a few channels per epoch and drops the rest.
    epochs = AutoReject(random_state=0, n_jobs=4, verbose=False).fit_transform(epochs)
    evoked = epochs.average()
    times = evoked.times
    gfp = evoked.data.std(axis=0)
    peaks = []
    for lo, hi in WINDOWS:
        window = np.flatnonzero((times >= lo) & (times <= hi))
        peaks.append(int(window[np.argmax(gfp[window])]))

    radius, origin, _ = mne.bem.fit_sphere_to_headshape(full_info, dig_kinds=("eeg",), units="m", verbose="error")
    sphere = (*origin, radius)
    pos = np.array([channel["loc"][:3] for channel in full_info["chs"]]) - origin
    all_unit = pos / np.linalg.norm(pos, axis=1, keepdims=True)
    scale = np.arccos(np.clip(all_unit[:, 2], -1, 1)).max() / 0.95  # lowest electrodes just inside the circle
    all_xy = project(all_unit, scale)
    kept = [full_info.ch_names.index(name) for name in evoked.ch_names]
    unit, xy = all_unit[kept], all_xy[kept]
    order = farthest_point_order(unit, evoked.ch_names.index("Cz"))
    rank = np.empty(len(order), dtype=int)
    rank[order] = np.arange(len(order))
    densities = (len(kept), *DENSITIES)

    axis = np.linspace(-1, 1, GRID)
    gx, gy = np.meshgrid(axis, axis[::-1])
    inside = np.hypot(gx, gy).ravel() <= 1.0
    grid_unit = unproject(np.column_stack([gx.ravel(), gy.ravel()])[inside], scale)

    maps = {}
    for density in densities:
        subset = np.flatnonzero(rank < density)
        names = [evoked.ch_names[index] for index in subset]
        to_grid = _make_interpolation_matrix(unit[subset], grid_unit)
        held_out = np.flatnonzero(rank >= density)
        to_rest = _make_interpolation_matrix(unit[subset], unit[held_out]) if len(held_out) else None
        csd = mne.preprocessing.compute_current_source_density(evoked.copy().pick(names), sphere=sphere, verbose="error")
        entries = []
        for index in peaks:
            potential = evoked.data[subset, index] * 1e6  # µV
            laplacian = csd.data[:, index] * 1e2  # V/m² to µV/cm²
            entry = {
                "potential": np.round(to_grid @ potential, 2).tolist(),
                "laplacian": np.round(to_grid @ laplacian, 3).tolist(),
            }
            if to_rest is not None:
                measured = evoked.data[held_out, index] * 1e6
                predicted = to_rest @ potential
                entry["heldOutError"] = round(float(np.sqrt(np.mean((predicted - measured) ** 2) / np.mean(measured ** 2))), 3)
            entries.append(entry)
        maps[str(density)] = entries
    for density in DENSITIES:
        for kind in ("potential", "laplacian"):
            for full, sparse in zip(maps[str(densities[0])], maps[str(density)]):
                reference, estimate = np.array(full[kind]), np.array(sparse[kind])
                sparse[f"{kind}Difference"] = round(float(np.sqrt(np.mean((estimate - reference) ** 2) / np.mean(reference ** 2))), 3)

    # Traces: the strongest posterior electrode at the second peak, the strongest lateral one,
    # the kept electrode closest to its mirror position, and Cz.
    posterior = np.flatnonzero(xy[:, 1] < -0.2)
    lateral = posterior[np.abs(xy[posterior, 0]) > 0.3]
    strongest = int(posterior[np.argmax(np.abs(evoked.data[posterior, peaks[1]]))])
    side = int(lateral[np.argmax(np.abs(evoked.data[lateral, peaks[1]]))])
    mirror = int(np.argmin(np.linalg.norm(unit - unit[side] * np.array([-1, 1, 1]), axis=1)))
    picks = list(dict.fromkeys([strongest, side, mirror, evoked.ch_names.index("Cz")]))
    rng = np.random.default_rng(0)
    shown = np.sort(rng.choice(len(epochs), size=TRIALS_SHOWN, replace=False))
    data = epochs.get_data(picks="eeg") * 1e6
    traces = {
        evoked.ch_names[index]: {
            "trials": np.round(data[shown, index], 1).tolist(),
            "average": np.round(evoked.data[index] * 1e6, 2).tolist(),
        }
        for index in picks
    }

    inputs = [path for _, _, paths in runs for path in paths]
    return {
        "dataset": "https://openneuro.org/datasets/ds005505/versions/1.0.1",
        "doi": "10.18112/openneuro.ds005505.v1.0.1",
        "license": "https://creativecommons.org/licenses/by-sa/4.0/",
        "attribution": "Shirazi, Franco, Scopel Hoffmann, Esper, Truong, Delorme, Milham and Makeig, HBN-EEG Release 1 (Child Mind Institute Healthy Brain Network), CC BY-SA 4.0. Excerpt derived with MNE-Python and shared under the same licence.",
        "subject": SUBJECT,
        "task": TASK,
        "mne": mne.__version__,
        "recordedRate": 500,
        "sampleRate": 500 / DECIM,
        "start": round(float(times[0]), 3),
        "runs": report,
        "trials": len(epochs),
        "inputSha256": {path.name: sha256(path) for path in inputs},
        "excluded": excluded,
        "densities": list(densities),
        "sensors": [
            {"label": name, "x": round(float(x), 4), "y": round(float(y), 4),
             "rank": int(rank[evoked.ch_names.index(name)]) if name in evoked.ch_names else None}
            for name, (x, y) in zip(full_info.ch_names, all_xy)
        ],
        "grid": {"size": GRID, "inside": np.flatnonzero(inside).tolist()},
        "times": [round(float(times[index]) * 1e3) for index in peaks],
        "gfp": np.round(gfp * 1e6, 2).tolist(),
        "maps": maps,
        "traces": traces,
    }


if __name__ == "__main__":
    parser = argparse.ArgumentParser(description=__doc__)
    parser.add_argument("input_dir", type=Path, help="Directory with the two runs' .set, events.tsv and channels.tsv")
    parser.add_argument("output", type=Path, help="Output JSON file")
    args = parser.parse_args()
    args.output.write_text(json.dumps(build(args.input_dir), separators=(",", ":"), ensure_ascii=False) + "\n")
