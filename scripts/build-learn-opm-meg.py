"""Build the small browser excerpt from the UCL OPM auditory dataset (MNE version 0.2).

MNE-Python handles the OPM-specific cleanup and the evoked fields. osl-dynamics fits a
time-delay embedded hidden Markov model (TDE-HMM) to the same cleaned sensor data.
"""

import argparse
import hashlib
import json
import time
from pathlib import Path

import mne
import numpy as np
from osl_dynamics.analysis import post_hoc, spectral
from osl_dynamics.data import Data
from osl_dynamics.inference import modes
from osl_dynamics.models.hmm import Config, Model
from osl_dynamics.utils.misc import set_random_seed


MEG_DIR = Path("sub-002/ses-001/meg")
STEM = "sub-002_ses-001_task-aef_run-001"
# SHA-256 of the files read_raw_fil() uses, from mne.datasets.ucl_opm_auditory version 0.2
# (archive auditory_OPM_stationary.zip, md5 b2d69aa2d656b960bd0c18968dc1a14d).
INPUT_SHA256 = {
    f"{STEM}_meg.bin": "4214d4a8232314899b64594525ef6014685266b5d2deb55fa9b01dfc424e3715",
    f"{STEM}_meg.json": "c535318bdf48381f7d40a60e937d6b588fc41e606f0eadb4c7fb721c532e4fc5",
    f"{STEM}_channels.tsv": "c25e66bcc1c65a4e1579a4b5c39d2e8a8fa3c4b83c6f5dc0cff5a07ceab071d4",
    f"{STEM}_positions.tsv": "5ac79a1b586916752d1d293fd99c81016d073eef3c84ba9c1130909ffeb1be8c",
}
# Bad channels named in the MNE OPM preprocessing tutorial for this recording.
EXTRA_BADS = ["G2-17-TAN"]
SFREQ = 250  # Hz, after filtering
TMIN, TMAX = -0.1, 0.4  # s around each tone
SHOWN_TRIALS = 10
AVERAGE_COUNTS = (10, 50)
DRIFT_WINDOW = (120.0, 180.0)  # s, the stretch the MNE tutorial plots
DRIFT_BIN = 0.2  # s
STATE_WINDOW = (80.0, 92.0)  # s, the first tones start near 86 s
N_STATES = 4
N_EMBEDDINGS = 15  # about 60 ms at 250 Hz, the osl-dynamics recommendation
N_PCA = 80
SEQUENCE_LENGTH = 200
SEED = 42
NOTICE = """The MIT License (MIT)

Copyright (c) 2022 WCHN OPM Lab, Dr. Robert Seymour, Dr. Nicholas Alexander

Permission is hereby granted, free of charge, to any person obtaining a copy
of this software and associated documentation files (the "Software"), to deal
in the Software without restriction, including without limitation the rights
to use, copy, modify, merge, publish, distribute, sublicense, and/or sell
copies of the Software, and to permit persons to whom the Software is
furnished to do so, subject to the following conditions:

The above copyright notice and this permission notice shall be included in
all copies or substantial portions of the Software.

THE SOFTWARE IS PROVIDED "AS IS", WITHOUT WARRANTY OF ANY KIND, EXPRESS OR
IMPLIED, INCLUDING BUT NOT LIMITED TO THE WARRANTIES OF MERCHANTABILITY,
FITNESS FOR A PARTICULAR PURPOSE AND NONINFRINGEMENT. IN NO EVENT SHALL THE
AUTHORS OR COPYRIGHT HOLDERS BE LIABLE FOR ANY CLAIM, DAMAGES OR OTHER
LIABILITY, WHETHER IN AN ACTION OF CONTRACT, TORT OR OTHERWISE, ARISING FROM,
OUT OF OR IN CONNECTION WITH THE SOFTWARE OR THE USE OR OTHER DEALINGS IN
THE SOFTWARE.
"""


def sha256(path):
    with path.open("rb") as file:
        return hashlib.file_digest(file, "sha256").hexdigest()


def check_inputs(meg_dir):
    for name, expected in INPUT_SHA256.items():
        if sha256(meg_dir / name) != expected:
            raise ValueError(f"{name} does not match the pinned SHA-256 digest.")


def bin_means(data, sfreq, start, stop, width):
    """Average each channel in non-overlapping bins (a simple low-pass for display)."""
    first, step = int(round(start * sfreq)), int(round(width * sfreq))
    n_bins = int(round((stop - start) / width))
    segment = data[:, first:first + n_bins * step]
    return segment.reshape(len(data), n_bins, step).mean(axis=2)


def fit_sphere(points):
    """Least-squares sphere through the sensor positions, for a flat sensor map."""
    a = np.column_stack([2 * points, np.ones(len(points))])
    b = (points ** 2).sum(axis=1)
    solution, *_ = np.linalg.lstsq(a, b, rcond=None)
    return solution[:3]


def flat_layout(positions):
    """Azimuthal equidistant projection seen from above: x to the right, y toward the nose.

    The farthest sensor lands at radius 0.95, so every point sits inside the unit circle.
    """
    directions = positions - fit_sphere(positions)
    directions /= np.linalg.norm(directions, axis=1, keepdims=True)
    theta = np.arccos(np.clip(directions[:, 2], -1, 1))
    phi = np.arctan2(directions[:, 1], directions[:, 0])
    flat = np.column_stack([theta * np.cos(phi), theta * np.sin(phi)])
    return 0.95 * flat / np.linalg.norm(flat, axis=1).max()


def preprocess(raw, events):
    """Follow the MNE OPM tutorial: reference regression, then HFC, then notch and band-pass."""
    picks = mne.pick_types(raw.info, meg=True)
    raw.filter(None, 5, picks="ref_meg")
    regress = mne.preprocessing.EOGRegression(picks, picks_artifact="ref_meg")
    regress.fit(raw)
    regress.apply(raw, copy=False)

    without_hfc = raw.copy()
    projs = mne.preprocessing.compute_proj_hfc(raw.info, order=2)
    raw.add_proj(projs).apply_proj(verbose="error")

    mags = mne.pick_types(raw.info, meg="mag")
    psd_kwargs = dict(fmin=1, fmax=20, n_fft=int(round(raw.info["sfreq"])), picks=mags)
    shielding = 10 * np.log10(
        without_hfc.compute_psd(**psd_kwargs).get_data() / raw.compute_psd(**psd_kwargs).get_data()
    )
    drift = {}
    for key, version in (("off", without_hfc), ("on", raw)):
        drift[key] = bin_means(version.get_data(picks=mags), raw.info["sfreq"], *DRIFT_WINDOW, DRIFT_BIN)

    cleaned = {}
    for key, version in (("off", without_hfc), ("on", raw)):
        version.notch_filter(np.arange(50, 251, 50), notch_widths=4)
        version.filter(2, 40, picks="meg")
        resampled, resampled_events = version.resample(SFREQ, events=events, n_jobs=4)
        cleaned[key] = resampled
    return cleaned, resampled_events, drift, shielding, mags, len(projs)


def pick_sensors(evoked, info):
    """Choose the left and right sensor whose radial axis shows the largest field near 100 ms."""
    window = (evoked.times >= 0.07) & (evoked.times <= 0.13)
    sensors = {}
    for side, keep in (("left", lambda x: x < 0), ("right", lambda x: x > 0)):
        best, best_value = None, 0.0
        for index, name in enumerate(evoked.ch_names):
            pair = (name, name.replace("-RAD", "-TAN"))
            if not name.endswith("-RAD") or pair[1] not in evoked.ch_names or set(pair) & set(info["bads"]):
                continue
            x = info["chs"][info["ch_names"].index(name)]["loc"][0]
            value = np.abs(evoked.data[index, window]).max()
            if keep(x) and value > best_value:
                best, best_value = name[:-4], value
        sensors[side] = best
    return sensors


def round_ft(values):
    return np.round(np.asarray(values) * 1e15).astype(int).tolist()


def evoked_excerpt(epochs, sensors):
    channels = [f"{sensors[side]}-{axis}" for side in ("left", "right") for axis in ("RAD", "TAN")]
    data = epochs.get_data(picks=channels)  # trials, channels, times
    excerpt = {}
    for index, name in enumerate(channels):
        trials = data[:, index]
        excerpt[name] = {
            "all": round_ft(trials.mean(axis=0)),
            **{f"first{count}": round_ft(trials[:count].mean(axis=0)) for count in AVERAGE_COUNTS},
            "trials": [round_ft(trial) for trial in trials[:SHOWN_TRIALS]],
        }
    return channels, excerpt


def fit_hmm(cleaned, events, seed):
    """Fit a small TDE-HMM to the cleaned sensor data with a fixed seed."""
    set_random_seed(seed)
    picks = mne.pick_types(cleaned.info, meg="mag")
    names = [cleaned.ch_names[index] for index in picks]
    series = cleaned.get_data(picks=picks).T.astype(np.float32)
    data = Data(series, sampling_frequency=SFREQ)
    data.prepare({"tde_pca": {"n_embeddings": N_EMBEDDINGS, "n_pca_components": N_PCA}, "standardize": {}})
    config = Config(
        n_states=N_STATES,
        n_channels=data.n_channels,
        sequence_length=SEQUENCE_LENGTH,
        learn_means=False,
        learn_covariances=True,
        batch_size=16,
        learning_rate=0.01,
        n_epochs=20,
    )
    model = Model(config)
    started = time.time()
    model.random_state_time_course_initialization(data, n_init=3, n_epochs=1)
    history = model.fit(data)
    train_seconds = time.time() - started
    free_energy = float(model.free_energy(data))
    alpha = model.get_alpha(data)
    stc = modes.argmax_time_courses(alpha)

    offset = N_EMBEDDINGS // 2  # samples lost at the start to time-delay embedding
    spectra = spectral.multitaper_spectra(
        data, alpha=alpha, frequency_range=[2, 40], cross_spectra=False, n_jobs=4,
    )
    psd = np.asarray(spectra.psd).reshape(N_STATES, len(names), -1)
    freqs = np.asarray(spectra.frequencies)
    static = np.asarray(spectra.static_psd).reshape(len(names), -1)

    # Tone-locked state probability.
    onsets = events[:, 0] - cleaned.first_samp - offset
    lags = np.arange(int(round(TMIN * SFREQ)), int(round(TMAX * SFREQ)) + 1)
    valid = onsets[(onsets + lags[0] >= 0) & (onsets + lags[-1] < len(alpha))]
    locked = alpha[valid[:, None] + lags[None, :]].mean(axis=0)  # lags, states

    first_tone = int(onsets.min())
    before, during = stc[:first_tone], stc[first_tone:int(onsets.max()) + int(TMAX * SFREQ)]

    start, stop = (int(round(t * SFREQ)) - offset for t in STATE_WINDOW)
    window = stc[start:stop].argmax(axis=1)
    changes = np.flatnonzero(np.diff(window)) + 1
    segments = [[round(STATE_WINDOW[0] + int(i) / SFREQ, 3), int(window[i])] for i in np.r_[0, changes]]
    tones = [round(float((e - cleaned.first_samp) / SFREQ), 3) for e in events[:, 0]
             if STATE_WINDOW[0] <= (e - cleaned.first_samp) / SFREQ < STATE_WINDOW[1]]

    return names, {
        "nStates": N_STATES,
        "nEmbeddings": N_EMBEDDINGS,
        "nPca": N_PCA,
        "sequenceLength": SEQUENCE_LENGTH,
        "seed": seed,
        "trainSeconds": round(train_seconds, 1),
        "freeEnergy": round(free_energy, 1),
        "finalLoss": round(float(history["loss"][-1]), 4),
        "fractionalOccupancy": np.round(post_hoc.fractional_occupancies(stc), 3).tolist(),
        "occupancyBeforeTones": np.round(post_hoc.fractional_occupancies(before), 3).tolist(),
        "occupancyDuringTones": np.round(post_hoc.fractional_occupancies(during), 3).tolist(),
        "meanLifetimeMs": np.round(post_hoc.mean_lifetimes(stc, sampling_frequency=SFREQ) * 1000, 1).tolist(),
        "switchingRate": np.round(post_hoc.switching_rates(stc, sampling_frequency=SFREQ), 2).tolist(),
        "spectrumFreqs": np.round(freqs, 2).tolist(),
        "spectra": np.round(psd.mean(axis=1), 4).tolist(),
        "staticSpectrum": np.round(static.mean(axis=0), 4).tolist(),
        "powerChange": np.round((psd - static[None]).mean(axis=2), 4).tolist(),
        "lockedTimes": np.round(lags / SFREQ, 3).tolist(),
        "locked": np.round(locked.T, 3).tolist(),
        "window": {"start": STATE_WINDOW[0], "stop": STATE_WINDOW[1], "segments": segments, "tones": tones},
        "firstToneSeconds": round(float((first_tone + offset) / SFREQ), 3),
        "nTones": int(len(valid)),
    }


def build(dataset_dir, seed=SEED):
    meg_dir = dataset_dir / MEG_DIR
    check_inputs(meg_dir)
    raw = mne.io.read_raw_fil(meg_dir / f"{STEM}_meg.bin", verbose="error").load_data()
    flux = [raw.ch_names[index] for index in mne.pick_channels_regexp(raw.ch_names, "Flux.")]
    raw.info["bads"].extend(flux + EXTRA_BADS)
    events = mne.find_events(raw, min_duration=0.1)
    if len(events) != 572:
        raise ValueError(f"Expected 572 tones, found {len(events)}.")

    recorded_sfreq = raw.info["sfreq"]
    cleaned, events, drift, shielding, mag_picks, n_projs = preprocess(raw, events)
    mag_names = [raw.ch_names[index] for index in mag_picks]

    evoked = {}
    epochs = {}
    for key, version in cleaned.items():
        epochs[key] = mne.Epochs(version, events, tmin=TMIN, tmax=TMAX, baseline=(TMIN, 0.0),
                                 picks=mne.pick_types(version.info, meg="mag"), preload=True, verbose="error")
        if len(epochs[key]) != len(events):
            raise ValueError("Epoching dropped tones.")
        evoked[key] = epochs[key].average()
    sensors = pick_sensors(evoked["on"], cleaned["on"].info)
    channels = None
    traces = {}
    for key in ("off", "on"):
        channels, traces[key] = evoked_excerpt(epochs[key], sensors)

    shown = [mag_names.index(name) for name in channels]
    drift_excerpt = {key: {name: np.round(values[index] * 1e12, 1).tolist() for name, index in zip(channels, shown)}
                     for key, values in drift.items()}

    hmm_names, hmm = fit_hmm(cleaned["on"], events, seed)
    radial = [name for name in hmm_names if name.endswith("-RAD")]
    positions = np.array([cleaned["on"].info["chs"][cleaned["on"].ch_names.index(name)]["loc"][:3] for name in radial])
    layout = flat_layout(positions)
    radial_index = [hmm_names.index(name) for name in radial]
    hmm["powerChange"] = [[state[index] for index in radial_index] for state in hmm["powerChange"]]

    return {
        "dataset": "https://osf.io/vy5n6/",
        "mneDataset": "https://mne.tools/stable/documentation/datasets.html#ucl-opm-auditory",
        "paper": "https://doi.org/10.1016/j.neuroimage.2021.118834",
        "license": "https://opensource.org/license/mit",
        "notice": NOTICE,
        "subject": "sub-002",
        "datasetVersion": "0.2",
        "software": {"mne": mne.__version__, "osl-dynamics": __import__("osl_dynamics").__version__},
        "inputSha256": INPUT_SHA256,
        "sfreq": SFREQ,
        "tmin": TMIN,
        "tmax": TMAX,
        "recordedSfreq": recorded_sfreq,
        "nChannels": len(mne.pick_types(raw.info, meg="mag", exclude=[])),
        "nReference": len(mne.pick_types(raw.info, meg=False, ref_meg=True, exclude=[])),
        "nTrials": len(events),
        "hfcProjectors": n_projs,
        "channels": channels,
        "sensors": sensors,
        "evoked": traces,
        "drift": {"start": DRIFT_WINDOW[0], "stop": DRIFT_WINDOW[1], "bin": DRIFT_BIN, **drift_excerpt},
        "shielding": {
            "freqs": list(range(1, 21)),
            "median": np.round(np.median(shielding, axis=0), 1).tolist(),
        },
        "layout": {"names": [name[:-4] for name in radial], "xy": np.round(layout, 3).tolist()},
        "hmm": hmm,
    }


if __name__ == "__main__":
    parser = argparse.ArgumentParser(description=__doc__)
    parser.add_argument("dataset_dir", type=Path, help="The auditory_OPM_stationary directory")
    parser.add_argument("output", type=Path, help="Output JSON file")
    parser.add_argument("--seed", type=int, default=SEED, help="Random seed for the HMM")
    args = parser.parse_args()
    args.output.write_text(json.dumps(build(args.dataset_dir, args.seed), separators=(",", ":")) + "\n")
