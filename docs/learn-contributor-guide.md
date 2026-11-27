# Contribute a Learn lesson

Start from one thing a beginner should be able to explain, choose, or reproduce. Link the relevant Primer section or published protocol, then give the learner a task that produces evidence of that outcome.

Copy this outline into a proposed lesson or lab PR.

- **Audience and prerequisites**. Name the prior lesson or skill, the time needed, and any hardware or software.
- **Learning objective**. Use an outcome the learner can demonstrate.
- **Reading and sources**. Give the chapter and section, or the course and module. Record the asset or dataset version, license, attribution, and changes.
- **Activity**. Ask the learner to predict an outcome, change one variable, and explain the result. Include a short interpretation the learner can check.
- **Self-check**. Ask a question that applies the concept. Give plausible alternatives, an explanation, and the source section to revisit.
- **Reference output**. Give representative values or a reproducible test and explain how real data can differ.
- **Translations and access**. Check that the English and French paths work, the controls have labels, and any chart has a useful text result.

Use AI to draft question variants, translate draft copy, or prototype controls. Have a contributor with relevant domain experience check the science, run the computation or notebook, and edit the final explanations. Ask a beginner in a NeuroTechX chapter or student club to try the lesson and tell you where they get stuck.

## Where content lives

- `src/content/learn/primer-chapters.ts` holds chapter links and public lab paths. Chapter self-checks live in `primer-checks.ts` and `additional-primer-checks.ts`. The PDF references use printed page numbers.
- Keep each question ID stable and identical across languages so a learner's completion carries over. Give a new question its own ID when it assesses a different objective.
- Browser labs live in `src/app/[lang]/learn/labs`, with localized copy in `src/content/learn` and interactive components in `src/components/learn`.
- Downloadable notebooks live in `public/learn/notebooks`. Cite the data, state how to reproduce the browser result, and keep downloaded participant files out of Git.
- Use the Primer for reading and interpretation. Link Neurotech@Berkeley for deeper exercises, and confirm the license of the particular notebook, slides, or figures before adapting them.

## MRI slice atlas

The atlas is derived from the [TemplateFlow brain-only 2 mm MNI152NLin2009cAsym T1w template](https://templateflow.s3.amazonaws.com/tpl-MNI152NLin2009cAsym/tpl-MNI152NLin2009cAsym_res-02_desc-brain_T1w.nii.gz). The script reorients the volume to RAS, maps intensities to grayscale, and extracts 17 evenly spaced slices per plane. The source notice is shipped with the atlas at `public/learn/mri/LICENSE.txt`.

Install `nibabel`, `numpy`, and `pillow`, then run `python scripts/build-learn-mri-slices.py <input.nii.gz> public/learn/mri/mni152-slices.png`.

## Kernel Flow2 fNIRS excerpt

The [Flow2-Chekin2025 dataset on OpenNeuro](https://openneuro.org/datasets/ds005927/versions/1.0.0) is CC0. The lab uses Kernel’s published Hb Moments derivative for `sub-001` and links to [Chekin et al. (2025)](https://doi.org/10.1162/imag_a_00475). The two sources follow the motor-region labels in the [MNE-NIRS Flow2 walkthrough](https://mne.tools/mne-nirs/dev/auto_examples/general/plot_11b_kf2_fingertapping.html).

Download `sub-001_task-fingertapping_nirs.snirf` and `sub-001_task-fingertapping_events.tsv` into the same directory. In a Python environment, install the [pinned dot-jax revision](https://github.com/m9h/dot-jax/tree/3ffd5442f0a91a278392fe48715d7d25c189b81b) with `python -m pip install 'dot-jax @ git+https://github.com/m9h/dot-jax.git@3ffd5442f0a91a278392fe48715d7d25c189b81b'`. Then run `python scripts/build-learn-kernel-fnirs.py <download-directory> src/content/learn/fnirs-kernel-data.json`.

The script reads the labeled Hb Moments concentrations from SNIRF and uses dot-jax to select paired HbO and HbR channels with 15–30 mm source–detector separations. It interpolates each block to 2 Hz, subtracts the pre-onset mean, and uses dot-jax’s epoch accumulator to calculate each hand’s average before shipping the data to the browser. The excerpt records the input SHA-256 digests.

## OPM-MEG excerpt

The lab uses `sub-002` from the [WCHN OPM example data on OSF](https://osf.io/vy5n6/) (MIT license, © 2022 WCHN OPM Lab, Robert Seymour and Nicholas Alexander), as packaged by [`mne.datasets.ucl_opm_auditory`](https://mne.tools/stable/documentation/datasets.html#ucl-opm-auditory) version 0.2. The recording is described by [Seymour et al. (2022)](https://doi.org/10.1016/j.neuroimage.2021.118834). The excerpt keeps the MIT notice in its `notice` field.

Create a Python 3.12 environment and install `mne==1.13.2` and `osl-dynamics[tf]==3.9.1`. Fetch the data with `python -c "import mne; print(mne.datasets.ucl_opm_auditory.data_path())"` (about 790 MB), then run `python scripts/build-learn-opm-meg.py <auditory_OPM_stationary> src/content/learn/opm-meg-data.json`. The script checks the SHA-256 digests of the input files. It needs about 7 GB of memory and ran in under 2 minutes on 8 CPU cores; on a shared machine, run it through the job scheduler.

MNE-Python does the cleanup from the [MNE OPM tutorial](https://mne.tools/stable/auto_tutorials/preprocessing/80_opm_processing.html): reference-sensor regression, order-2 homogeneous field correction (HFC), a 50 Hz notch filter and harmonics, a 2–40 Hz band-pass, resampling to 250 Hz and epochs from −100 to 400 ms. The “HFC off” traces skip only the HFC step. osl-dynamics fits a 4-state TDE-HMM (15 lags, 80 principal components, seed 42) to the 86 cleaned channels and exports state statistics, multitaper state spectra, tone-locked state probabilities and a 12 s state sequence. The flat sensor layout is an azimuthal projection from above, scaled into the unit circle.

## HBN high-density EEG excerpt

The [HBN-EEG Release 1 dataset on OpenNeuro](https://openneuro.org/datasets/ds005505/versions/1.0.1) (version 1.0.1) is licensed CC BY-SA 4.0, so `src/content/learn/hd-eeg-data.json` is shared under the same licence and carries the attribution. The lab credits the dataset, the [HBN-EEG preprint by Shirazi et al.](https://doi.org/10.1101/2024.10.03.615261) and the [HBN data descriptor by Alexander et al. (2017)](https://doi.org/10.1038/sdata.2017.181). Participants are children and adolescents: use subject IDs only and no phenotypic or demographic data.

Download the `surroundSupp` run 1 and run 2 files (`_eeg.set`, `_events.tsv`, `_channels.tsv`) for `sub-NDARAG143ARJ` into one directory (about 200 MB). In a Python environment, install `mne`, `autoreject` and `python-picard`, then run `python scripts/build-learn-hd-eeg.py <download-directory> src/content/learn/hd-eeg-data.json`. The excerpt records the MNE version and the input SHA-256 digests.

The script checks the events against the recording, keeps the onsets where a stimulus is visible, filters from 0.5 to 20 Hz (removing the 25 Hz flicker), leaves out electrodes whose standard deviation is over three times the median in either run, applies an average reference, removes eye components found with Picard ICA, epochs from −200 to 600 ms and runs autoreject. It then compares the evoked map at three peaks of the global field power sampled with every kept electrode, 64 or 32 electrodes (farthest-point subsets starting at Cz). Maps use spherical-spline interpolation onto one grid, and the surface Laplacian is MNE's `compute_current_source_density` computed from each subset.

## Whole-head neuromodulation excerpt (simulated)

Every field in this lab is simulated; no person was measured. The head is `ernie` from the [SimNIBS 4 example dataset v4.1](https://github.com/simnibs/example-dataset/releases/tag/v4.1) (`simnibs4_examples.zip`, SHA-256 `a7e729db1306657f5c4f9a5dee493e22eb5a4c6fb2fd62f8ec81dc0cca4196e6`). The dataset's readme licenses it under [CC BY-NC 4.0](https://creativecommons.org/licenses/by-nc/4.0/) and asks users to cite [Thielscher et al. (2015)](https://doi.org/10.1109/EMBC.2015.7318340), so `src/content/learn/neuromodulation-data.json` is a non-commercial derived excerpt under the same licence and carries the attribution. SimNIBS is GPL-3.0; BabelBrain and BabelViscoFDTD are BSD-3-Clause. The lab cites the [BabelBrain paper by Pichardo (2023)](https://doi.org/10.1109/TUFFC.2023.3274046) and the [charm segmentation paper by Puonti et al. (2020)](https://doi.org/10.1016/j.neuroimage.2020.117044).

Targets are MNI coordinates mapped to ernie with `simnibs.mni2subject_coords`: left hand motor cortex (−37, −21, 58) and left thalamus (−12, −18, 8), defined in `scripts/learn-neuromod/targets.py`.

1. Electric fields. Install SimNIBS 4.6.0 from its [release](https://github.com/simnibs/simnibs/releases/tag/v4.6.0) (`environment_linux.yml` with micromamba, then the `cp311` wheel). Run `python scripts/learn-neuromod/simnibs_fields.py <m2m_ernie> <simnibs-out>` (about 12 minutes on 4 CPU cores with a 14 GB memory limit; `scripts/learn-neuromod/simnibs_job.sbatch` runs it through Slurm). It runs TMS with the Magstim 70 mm figure-8 coil at 1 A/µs over each target, the SimNIBS tDCS example montage (C3 50 × 50 mm, AF4 50 × 70 mm, 1 mA) and the SimNIBS TI example montage (F5–P5 and F6–P6, 1 mA per pair, maximal envelope with `TI_utils.get_maxTI`), and resamples |E| to ernie's T1 grid.
2. Ultrasound. Install [BabelBrain v0.8.9](https://github.com/ProteusMRIgHIFU/BabelBrain/releases/tag/v0.8.9) from source with the pinned packages in `scripts/learn-neuromod/babelbrain-requirements.txt` (BabelViscoFDTD 1.2.7, CuPy for CUDA). Write trajectories with `python scripts/learn-neuromod/fus_trajectories.py <BabelBrain/BabelBrain> <m2m_ernie> <simnibs-out>/targets_subject.json <traj-dir>`, then submit `scripts/learn-neuromod/fus_job.sbatch` once per run: `DomeTx` at 220 kHz with `BB_REFOCUS=0` and `1` for each target, and `Single` at 250 kHz (`BB_SINGLE_FOCAL_MM=80`, `BB_SINGLE_DIAM_MM=64`; the script sets the water gap so that the natural focus falls on the target) for each target. The job drives BabelBrain headless through its `--execute` scripting mode (steps 1 and 2, no CT, 6 points per wavelength) on one GPU; a helmet run with refocusing took about 20 minutes on an NVIDIA GB10 within the job's 48 GB memory limit, and a single-transducer run under a minute. BabelBrain writes the trajectory matrix with its third column pointing from the target toward the transducer; `fus_trajectories.py` follows that convention. In headless mode the run script sends BabelBrain's log straight to the console, because the Qt log widget crashed PySide6 6.12 on linux-aarch64.
3. Excerpt. Run `python scripts/build-learn-neuromod.py <m2m_ernie> <simnibs-out> <babelbrain-runs> src/content/learn/neuromodulation-data.json` (numpy, scipy and nibabel). It resamples every field to the T1 grid, computes the brain metrics shown in the lab (peak, share at the target, volume above half the peak, depth of that volume below the outer brain surface, distance from the maximum to the target), writes one coronal slice per target at 1.5 mm and records the SHA-256 digest of every input file.
