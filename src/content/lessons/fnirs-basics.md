---
title: "fNIRS Basics"
description: "How functional near-infrared spectroscopy measures blood oxygen in the cortex with light, how it compares with EEG, which artifacts to watch for, and how to analyse a first recording with MNE-NIRS."
module: bci
sourceUrl: ""
---
Functional near-infrared spectroscopy (fNIRS) measures brain activity with light. Like fMRI, it does not record neurons directly. It measures changes in blood oxygen that follow neural activity. Unlike fMRI, it fits in a cap, is quiet, and can be used while people sit, walk or talk. It has been used for BCIs, mostly in research settings ([Naseer & Hong, 2015](https://doi.org/10.3389/fnhum.2015.00003)).

Good starting reviews are [Scholkmann et al. (2014)](https://doi.org/10.1016/j.neuroimage.2013.05.004) on instruments and methods and [Pinti et al. (2020)](https://doi.org/10.1111/nyas.13948) on uses in cognitive neuroscience.

## How it works

**Near-infrared light gets through the head.** Skin, bone and brain absorb relatively little light between roughly 650 and 950 nm, so some of it passes through the scalp and skull, scatters in the tissue, and comes back out. Jöbsis showed in 1977 that this could be used to monitor oxygen in the brain through the intact skull ([Jöbsis, 1977](https://doi.org/10.1126/science.929199)).

**Sources and detectors.** An fNIRS cap holds light sources and detectors (together called optodes) a few centimetres apart. Light that travels from a source to a detector follows a curved, banana-shaped path through the tissue. At a typical distance of 3 cm, part of that path passes through the outer layer of the cortex. Each source-detector pair is one **channel**.

**Two kinds of haemoglobin.** Oxygenated haemoglobin (HbO) and deoxygenated haemoglobin (HbR) absorb near-infrared light differently. By measuring at two wavelengths (760 and 850 nm in the example below), you can work out how the concentration of each changed.

**The modified Beer-Lambert law.** The change in light absorbed at each wavelength (the change in optical density) is modelled as the sum of the HbO and HbR concentration changes, each multiplied by how strongly that molecule absorbs at that wavelength, and by the distance the light travelled. Because light scatters, it travels further than the straight-line distance between optodes. A correction called the differential pathlength factor accounts for this ([Delpy et al., 1988](https://doi.org/10.1088/0031-9155/33/12/008)). Solving the two equations (one per wavelength) gives the HbO and HbR changes. The method measures *changes* from a starting point, not absolute concentrations.

**The haemodynamic response is slow.** When a brain region becomes active, local blood flow increases more than its oxygen use. HbO goes up and HbR goes down in that region. This response takes several seconds to build up and many seconds to return to baseline. In the example below, the average HbO response peaks about 6 seconds after a 5-second finger-tapping block starts.

## Strengths and limits compared with EEG

| | EEG | fNIRS |
| --- | --- | --- |
| What it measures | Electrical activity of neurons | Blood oxygen changes that follow activity |
| Timing | Milliseconds | Seconds |
| Spatial detail | Coarse; each electrode picks up activity from a wide area | Somewhat better; each channel covers a patch of a few centimetres |
| Depth | Mostly cortex | Only the outer cortex |
| Sensitive to | Muscle activity, eye movements, electrical noise | Head movement, hair, blood flow in the scalp, heartbeat and breathing |

fNIRS is less affected by electrical noise and muscle activity than EEG, and it can be combined with EEG in the same cap. Its main limit for BCI is speed: a response that takes seconds limits how many commands per minute a user can send ([Naseer & Hong, 2015](https://doi.org/10.3389/fnhum.2015.00003)). Dark or thick hair blocks light and makes good contact harder.

## Artifacts

**Motion.** If an optode moves on the scalp, the light path changes and the signal jumps or drifts. Firm caps help. Motion correction methods, such as temporal derivative distribution repair (TDDR), can repair some of it afterwards ([Fishburn et al., 2019](https://doi.org/10.1016/j.neuroimage.2018.09.025)).

**Poor contact.** If an optode does not touch the skin well, the heartbeat, which should be visible as a small pulse in good channels, disappears. The scalp coupling index uses this to score each channel ([Pollonini et al., 2014](https://doi.org/10.1016/j.heares.2013.11.007)).

**Systemic physiology.** The heartbeat (around 1 Hz), breathing (around 0.2 to 0.3 Hz) and slow blood pressure waves (around 0.1 Hz, called Mayer waves) all change blood volume in the scalp and brain. A task can also change heart rate and blood pressure on its own, for example when it is stressful. These changes can look like brain activity or hide it ([Tachtsidis & Scholkmann, 2016](https://doi.org/10.1117/1.NPh.3.3.031405)). Filtering removes the heartbeat but not the slower waves, which overlap with the brain response.

**Short-separation channels.** A detector placed very close to a source (about 8 mm in adults) sees light that has only travelled through the scalp and skull ([Brigadoi & Cooper, 2015](https://doi.org/10.1117/1.NPh.2.2.025005)). Its signal is a measure of the scalp blood flow alone, and it can be regressed out of the normal long channels. Current reporting guidelines recommend using short channels where possible ([Yücel et al., 2021](https://doi.org/10.1117/1.NPh.8.1.012101)).

## A first analysis with MNE-NIRS

[MNE-Python](https://mne.tools/stable/auto_tutorials/preprocessing/70_fnirs_processing.html) reads fNIRS files from most devices and converts them to haemoglobin. [MNE-NIRS](https://mne.tools/mne-nirs/stable/index.html) adds short-channel regression, GLM analysis and group statistics ([Luke et al., 2021](https://doi.org/10.1117/1.NPh.8.2.025008)). fNIRS data can also be stored in [BIDS](https://bids-specification.readthedocs.io/en/stable/modality-specific-files/near-infrared-spectroscopy.html), so the [open data lesson](/learn/neuro-data-skills) applies.

The example uses MNE's [fNIRS motor dataset](https://mne.tools/stable/documentation/datasets.html): one person, recorded at Macquarie University with optodes over motor cortex, tapping their thumb to their fingers for 5 seconds at a time (30 blocks per hand) or resting. The download is about 18 MB.

```bash
pip install mne mne-nirs
```

```python
import mne
from mne.preprocessing.nirs import beer_lambert_law, optical_density, scalp_coupling_index
from mne_nirs.channels import get_long_channels
from mne_nirs.signal_enhancement import short_channel_regression

# MNE's fNIRS motor dataset: one person tapping thumb to fingers (left or right hand) or resting
folder = mne.datasets.fnirs_motor.data_path() / "Participant-1"
raw = mne.io.read_raw_nirx(folder, verbose=False).load_data()

# Light intensity -> optical density; check how well each optode touches the scalp
od = optical_density(raw)
print(f"Lowest scalp coupling index: {scalp_coupling_index(od).min():.2f}")

# The 8 mm channels mostly see the scalp; regress their signal out of the long channels
od = get_long_channels(short_channel_regression(od))

# Optical density -> oxy- and deoxy-haemoglobin (modified Beer-Lambert law)
haemo = beer_lambert_law(od, ppf=6.0)
haemo.filter(0.05, 0.7, verbose=False)  # keep the slow response, remove heartbeat

haemo.annotations.rename({"1.0": "Control", "2.0": "Tapping/Left", "3.0": "Tapping/Right"})
haemo.annotations.delete(haemo.annotations.description == "15.0")
events, event_id = mne.events_from_annotations(haemo, verbose=False)
epochs = mne.Epochs(haemo, events, event_id, tmin=-5, tmax=15, baseline=(None, 0),
                    reject=dict(hbo=80e-6), preload=True, verbose=False)

# Average over channels: HbO rises and HbR falls, seconds after tapping starts
for kind in ("hbo", "hbr"):
    trace = epochs["Tapping"].average(picks=kind).data.mean(axis=0) * 1e6  # micromolar
    at = abs(trace).argmax()
    print(f"{kind}: largest change {trace[at]:+.2f} uM at {epochs.times[at]:.1f} s")
print(f"{len(epochs['Tapping'])} tapping blocks kept")
```

With MNE 1.13.2 and MNE-NIRS 0.7.3 this prints:

```text
Lowest scalp coupling index: 0.58
hbo: largest change +0.23 uM at 5.8 s
hbr: largest change -0.04 uM at 7.9 s
60 tapping blocks kept
```

HbO rises by a fraction of a micromolar and peaks about 6 seconds after tapping starts, while HbR falls by a smaller amount. HbO and HbR moving in opposite directions is the expected pattern of a haemodynamic response; both moving together can be a sign of a systemic or motion artifact. Averaging all channels is a rough summary. The [MNE tutorial](https://mne.tools/stable/auto_tutorials/preprocessing/70_fnirs_processing.html) plots each channel and compares left- and right-hand tapping, and the MNE-NIRS examples fit a GLM, which handles overlapping responses better than block averaging.
