---
title: "Working with Open Neuro Data"
description: "Where to find open EEG and other brain datasets, how the BIDS format organizes them, how to load them with MNE-BIDS, and how to handle licences, privacy and reproducibility."
module: bci
sourceUrl: ""
---
You do not need your own headset to learn BCI analysis. Thousands of brain recordings are shared openly by research labs. This lesson covers where to find them, how they are organized, how to load one in Python, and the rules that come with using other people's data.

## Where to find data

- **[OpenNeuro](https://openneuro.org)** hosts more than a thousand datasets: MRI, EEG, MEG, intracranial EEG and fNIRS. Every dataset is stored in BIDS format and has versioned snapshots with a DOI ([Markiewicz et al., 2021](https://doi.org/10.7554/eLife.71774)).
- **[NEMAR](https://nemar.org)** is a portal to the EEG, MEG and iEEG datasets on OpenNeuro, with tools for browsing and analysing them on high-performance computers ([Delorme et al., 2022](https://doi.org/10.1093/database/baac096)).
- **[PhysioNet](https://physionet.org)** hosts physiological recordings, including the widely used [EEG Motor Movement/Imagery Dataset](https://physionet.org/content/eegmmidb/1.0.0/) (109 people, 64 channels).
- **[MOABB](https://moabb.neurotechx.com/docs/)** (Mother of All BCI Benchmarks), hosted by NeuroTechX, downloads dozens of public BCI datasets (motor imagery, P300, SSVEP) through one Python interface and runs standard benchmarks on them ([Jayaram & Barachant, 2018](https://doi.org/10.1088/1741-2552/aadea0)). Its [dataset summary](https://moabb.neurotechx.com/docs/dataset_summary.html) lists each one with its number of subjects, channels and trials.

Before downloading, read the dataset's README and paper. Check how many people were recorded, which device and reference were used, what the task was, and how big the files are.

## BIDS and EEG-BIDS

The **Brain Imaging Data Structure ([BIDS](https://bids.neuroimaging.io))** is a community standard for naming and describing neuroimaging files ([Gorgolewski et al., 2016](https://doi.org/10.1038/sdata.2016.44)). The [EEG extension](https://bids-specification.readthedocs.io/en/stable/modality-specific-files/electroencephalography.html) was added in 2019 ([Pernet et al., 2019](https://doi.org/10.1038/s41597-019-0104-8)); there are also extensions for iEEG, MEG and [fNIRS](https://bids-specification.readthedocs.io/en/stable/modality-specific-files/near-infrared-spectroscopy.html).

Here is part of the dataset used in the example below. One person was recorded twice, off and on medication:

```text
ds002778/
├── dataset_description.json      name, authors, licence, DOI
├── participants.tsv              one row per person (age, handedness, ...)
├── README
└── sub-pd6/
    ├── ses-off/
    │   └── eeg/
    │       ├── sub-pd6_ses-off_task-rest_eeg.bdf        the recording
    │       ├── sub-pd6_ses-off_task-rest_eeg.json       sampling rate, reference, device
    │       ├── sub-pd6_ses-off_task-rest_channels.tsv   one row per channel
    │       └── sub-pd6_ses-off_task-rest_events.tsv     event onsets and labels
    └── ses-on/
        └── ...
```

File names are made of key-value pairs (`sub-`, `ses-`, `task-`, `run-`) and end with the data type. Because every BIDS dataset follows these rules, software can find the right files without custom code. The [BIDS validator](https://bids-validator.readthedocs.io) checks a folder against the standard.

## Loading data with MNE-BIDS

[MNE-BIDS](https://mne.tools/mne-bids/stable/index.html) reads and writes BIDS datasets using [MNE-Python](https://mne.tools/stable/index.html) ([Appelhoff et al., 2019](https://doi.org/10.21105/joss.01896)). The example below downloads one person (about 30 MB) from the UC San Diego resting-state EEG dataset on OpenNeuro, [ds002778](https://openneuro.org/datasets/ds002778), with [openneuro-py](https://github.com/hoechenberger/openneuro-py), then loads one recording.

```bash
pip install mne mne-bids openneuro-py
```

```python
from pathlib import Path

import openneuro
from mne_bids import BIDSPath, get_entity_vals, read_raw_bids

# Download one subject of an open resting-state EEG dataset
root = Path("ds002778")
openneuro.download(dataset="ds002778", tag="1.0.5", target_dir=root, include=["sub-pd6"])

# Ask the BIDS folder what it contains, then load one recording
print(get_entity_vals(root, "subject"))
bids_path = BIDSPath(root=root, subject="pd6", session="off", task="rest", datatype="eeg")
raw = read_raw_bids(bids_path)
print(raw.info["sfreq"], len(raw.ch_names), raw.times[-1])
```

It prints `['pd6']` and then `512.0 41 190.998046875`: a sampling rate of 512 Hz, 41 channels and about 191 seconds of data. MNE-BIDS also reads the channel types, events and participant information from the side files. It will warn that some `participants.tsv` columns (such as clinical scores) do not map to MNE fields; that is expected. From here `raw` is an ordinary MNE object, so the [Preprocessing](/learn/preprocessing) and [Neural Oscillations](/learn/neural-oscillations) lessons apply.

This example was run with MNE 1.13.2, MNE-BIDS 0.20.0 and openneuro-py 2026.9.1.

## Licences and citing data

Open does not mean "no rules". Every dataset should state a licence, usually in `dataset_description.json` or on its landing page.

- **[CC0](https://creativecommons.org/publicdomain/zero/1.0/)** places the data in the public domain. OpenNeuro uses it by default. ds002778 is CC0.
- **[CC BY 4.0](https://creativecommons.org/licenses/by/4.0/)** and the Open Data Commons Attribution licence (used by the PhysioNet motor imagery dataset) allow reuse if you credit the source.
- Some datasets need you to sign a data use agreement or forbid commercial use. Read the terms before you build a product on them.

Even when the licence does not require it, cite the dataset (with its DOI and version) and the paper that describes it. The [Joint Declaration of Data Citation Principles](https://force11.org/info/joint-declaration-of-data-citation-principles-final/) explains why data should be cited like papers. Some authors also make requests in their README; the ds002778 authors ask to be contacted before you publish results from their data.

## Privacy for human recordings

Brain recordings come from people who agreed to take part in a study, usually under an ethics approval that limits how the data can be used.

- Do not try to re-identify participants or link a dataset with other sources.
- If you record your own data, get informed consent that says whether and how the data will be shared. The [Open Brain Consent](https://open-brain-consent.readthedocs.io) project offers template consent forms written for data sharing, including a version for the EU General Data Protection Regulation.
- Remove names, birth dates and recording dates before sharing. Use codes such as `sub-01`, not initials. MNE's `raw.anonymize()` removes personal fields from the file header.
- Treat `participants.tsv` with care: age, sex, diagnosis and clinical scores are personal information, and rare combinations can identify someone.

The [Safety and Ethics](/safety-and-ethics) page covers consent and neural data privacy in more depth.

## Reproducibility

A result someone else cannot reproduce is hard to trust. A few habits help:

- **Record versions.** Note the dataset version (OpenNeuro snapshots are tagged, as with `tag="1.0.5"` above) and your software versions. `mne.sys_info()` prints MNE and its main dependencies; `pip freeze > requirements.txt` saves your whole environment.
- **Fix random seeds.** Classifiers, cross-validation splits and ICA all use random numbers. Create one generator, for example `rng = np.random.default_rng(42)`, and pass seeds (`random_state=42` in scikit-learn and MNE) explicitly.
- **Use an isolated environment.** A virtual environment (`python -m venv`) or a conda environment per project keeps package versions from drifting.
- **Script everything.** Keep the steps from raw download to final figure in code, not in manual clicks, and keep the code under version control.
- **Follow FAIR.** The [FAIR principles](https://doi.org/10.1038/sdata.2016.18) (findable, accessible, interoperable, reusable) are a checklist for sharing your own data. [The Turing Way](https://book.the-turing-way.org/) is a free guide to reproducible research in general.
