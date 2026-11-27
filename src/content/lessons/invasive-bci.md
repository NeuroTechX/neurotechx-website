---
title: "Invasive and Intracortical BCI"
description: "What implanted electrodes record, how spikes are detected and sorted, how intracortical decoders turn neural activity into cursor movement or text, and what is known about safety and how long implants last."
module: bci
sourceUrl: ""
---
*Written November 2026 for NeuroTechX. Most of the systems described here are investigational: they are used in research studies and are not approved for general clinical use.*

## Why record from inside the head?

EEG measures voltages on the scalp. By the time brain signals reach the scalp, they have passed through the skull and skin, which blur and weaken them. Electrodes placed on or in the brain avoid most of this. They pick up smaller, faster and more local signals. The cost is surgery and its risks. [(1)](#references)

This lesson covers what these electrodes record, how the signals are processed, how decoders work, and what is known about safety. For company news and the current list of human trials, see [Emerging Technologies](/learn/emerging-technologies#implanted-bcis-in-human-trials).

## What electrodes record

Electrodes record different signals depending on where they sit and how large they are. [(1)](#references)

-   **Single units.** A fine electrode tip close to a neuron records its action potentials (spikes) as brief voltage deflections, about 1 ms long. If the spikes of one neuron can be told apart from its neighbours, that neuron is a "single unit".
-   **Multi-unit activity (MUA).** Spikes from several nearby neurons that cannot be separated. MUA is often counted as threshold crossings (see below).
-   **Local field potentials (LFP).** The slower part of the same recording (below a few hundred hertz). The LFP mostly reflects synaptic currents summed over many neurons near the tip.
-   **Electrocorticography (ECoG).** Disc electrodes on the surface of the brain record field potentials summed over a larger area. ECoG does not resolve single neurons, but it has much better spatial resolution and signal quality than EEG.

### Common electrode types

-   **Utah array.** A small square of silicon with a 10 x 10 grid of needles that penetrate about 1 to 1.5 mm into the cortex. It records single units, MUA and LFP. [(2)](#references) It has been the main electrode in academic human studies such as BrainGate since the first participant in 2004. [(3)](#references) A Utah array needs a wire through the skull. In most human studies so far, this has been a connector (pedestal) that passes through the skin.
-   **Stereo-EEG (sEEG).** Thin depth electrodes with several contacts along their length, inserted through small holes in the skull. They are used clinically to locate the source of seizures in people with epilepsy. Because these patients already have electrodes for a week or two, many BCI research studies are done with them. sEEG reaches deep structures that ECoG cannot. [(4)](#references)
-   **Thin-film surface arrays.** Flexible sheets with many small contacts that lie on the brain surface. High-density ECoG grids are an example. The speech study by Metzger and colleagues used a high-density surface array. [(5)](#references)
-   **Endovascular electrodes.** The Stentrode is a stent with electrodes. It is guided through the jugular vein into the superior sagittal sinus, a large vein next to the motor cortex, so it does not need open brain surgery. It was first tested in sheep. [(6)](#references) A 4-patient study in Australia reported no device-related serious adverse events after 12 months. [(7)](#references) It records signals more like ECoG than single units.

## Spike detection and spike sorting

The raw signal from a penetrating electrode is usually sampled at about 30 kHz. A typical processing chain:

1.  **High-pass filter** (for example above 250 Hz) to remove the LFP and keep the spike band.
2.  **Detect spikes** where the voltage crosses a threshold. A common choice is a negative threshold of a few times the root-mean-square (RMS) noise of that channel, often between -3 and -4.5 x RMS. [(8)](#references)
3.  **Spike sorting** (optional). Cut out a short waveform around each detected event, describe its shape with a few features (for example principal components or wavelet coefficients), and cluster the waveforms so that each cluster is one putative neuron. [(9)](#references) Modern sorters such as Kilosort, and frameworks such as SpikeInterface that run many sorters with the same interface, automate much of this for dense probes. [(10, 11)](#references)

Many BCIs skip step 3. They count threshold crossings per electrode in short time bins (often 10 to 20 ms) and decode from those counts. In monkeys with Utah arrays, decoding from threshold crossings lost only a little performance compared with sorted units. [(8)](#references) Threshold crossings also keep working when single neurons drift and can no longer be isolated, which matters for long-term implants. Population-level analyses can also be accurate without sorting. [(12)](#references)

## How intracortical decoders work

A decoder maps binned neural features (for example spike counts on 96 or more channels) to an output: cursor velocity, a robot arm command, a letter or a word.

### Linear decoders and the Kalman filter

The simplest decoders are linear: the output is a weighted sum of firing rates, with the weights fit by regression on calibration data. The first BrainGate participant moved a computer cursor this way. [(3)](#references)

A **Kalman filter** adds a model of how the movement itself evolves. It keeps a running estimate of the cursor state (position, velocity), predicts the next state, and corrects that prediction with the new neural data. It assumes linear relations and Gaussian noise. It gave smoother and more accurate estimates than simple linear filters in early monkey work. [(13)](#references)

How the decoder is trained matters as much as which decoder is used. In ReFIT, the Kalman filter is retrained on closed-loop data, under the assumption that the user always intended to move toward the target. In monkeys, this halved the time needed to reach targets compared with earlier decoders. [(14)](#references) Kalman-filter cursor control of this kind let three people with paralysis type by pointing and clicking. [(15)](#references) Other studies have used decoders of the same family to control a robotic arm with several degrees of freedom. [(16, 17)](#references)

### Recurrent neural network decoders

Recurrent neural networks (RNNs) can learn nonlinear and time-dependent relations between neural activity and output. In monkeys, an early closed-loop RNN decoder reached targets faster than a velocity Kalman filter. [(18)](#references) RNNs are now standard for decoding sequences: one study decoded attempted handwriting of letters into text. [(19)](#references) RNNs are also the core of the speech decoders below.

## Speech neuroprostheses

Speech decoding systems usually have two stages. A neural network turns neural activity into probabilities for speech sounds (phonemes) or words. A language model then picks the most likely sentence. Results so far come from single participants or very small groups, and the systems need trained staff to run them.

-   **Moses et al. 2021.** A person with anarthria after a brainstem stroke used a high-density ECoG array to produce sentences from a 50-word vocabulary. [(20)](#references)
-   **Willett et al. 2023.** A participant with ALS had intracortical microelectrode arrays in speech motor cortex. Word error rate was 9.1% with a 50-word vocabulary and 23.8% with a 125,000-word vocabulary, at 62 words per minute. [(21)](#references)
-   **Metzger et al. 2023.** A participant with severe limb and vocal paralysis used a high-density surface array. Text decoding from attempted silent speech reached a median of 78 words per minute with a median word error rate of 25%. The system also produced synthesized speech and animated a facial avatar. [(5)](#references)
-   **Card et al. 2024.** A man with ALS had four arrays (256 electrodes). On the first day of use, accuracy was 99.6% with a 50-word vocabulary after 30 minutes of calibration recordings. Accuracy with a 125,000-word vocabulary was 97.5%, sustained over 8.4 months. He used it for more than 248 hours of conversation at about 32 words per minute. [(22)](#references)

Natural conversation is about 160 words per minute. [(21)](#references) Word error rates are measured on prompted sentences and in specific conditions, so numbers from different studies are not directly comparable.

## Safety and longevity

**Safety.** The largest safety report so far covers 14 BrainGate participants implanted between 2004 and 2021, with an average implant duration of 872 days (12,203 implant-days in total). There were 68 device-related adverse events, including 6 serious ones. The most common was skin irritation around the pedestal. There were no intracranial infections, no events that required removing the device, and no device-related deaths or permanent increases in disability. [(23)](#references) This is evidence from a small, selected group. It does not tell us about rare risks or about other devices.

**Longevity.** Recordings change over time. In human BCI users, some neurons could be recorded for weeks or months, while others changed within a day. [(24)](#references) In a review of 78 Utah arrays in 27 monkeys, the median recording duration was 182 days and the longest was about 5.75 years. Most complete failures within the first year were mechanical, mainly connector problems. Biological failures included a tissue reaction that separated the array from the brain. [(25)](#references) Decoders therefore need to be recalibrated or made robust to these changes, which is one reason threshold crossings are popular.

## Ethics

Implanted BCIs raise questions that non-invasive ones do not: surgical risk, who maintains or removes a device when a study or company ends, and access for people who are not in a trial. See the [Safety and Ethics](/safety-and-ethics) page.

## References

1.  Buzsáki G, Anastassiou CA, Koch C. The origin of extracellular fields and currents: EEG, ECoG, LFP and spikes. *Nature Reviews Neuroscience* 13, 407–420 (2012). [doi:10.1038/nrn3241](https://doi.org/10.1038/nrn3241)
2.  Maynard EM, Nordhausen CT, Normann RA. The Utah intracortical electrode array: a recording structure for potential brain-computer interfaces. *Electroencephalography and Clinical Neurophysiology* 102, 228–239 (1997). [doi:10.1016/S0013-4694(96)95176-0](https://doi.org/10.1016/S0013-4694(96)95176-0)
3.  Hochberg LR et al. Neuronal ensemble control of prosthetic devices by a human with tetraplegia. *Nature* 442, 164–171 (2006). [doi:10.1038/nature04970](https://doi.org/10.1038/nature04970)
4.  Herff C, Krusienski DJ, Kubben P. The potential of stereotactic-EEG for brain-computer interfaces: current progress and future directions. *Frontiers in Neuroscience* 14, 123 (2020). [doi:10.3389/fnins.2020.00123](https://doi.org/10.3389/fnins.2020.00123)
5.  Metzger SL et al. A high-performance neuroprosthesis for speech decoding and avatar control. *Nature* 620, 1037–1046 (2023). [doi:10.1038/s41586-023-06443-4](https://doi.org/10.1038/s41586-023-06443-4)
6.  Oxley TJ et al. Minimally invasive endovascular stent-electrode array for high-fidelity, chronic recordings of cortical neural activity. *Nature Biotechnology* 34, 320–327 (2016). [doi:10.1038/nbt.3428](https://doi.org/10.1038/nbt.3428)
7.  Mitchell P et al. Assessment of safety of a fully implanted endovascular brain-computer interface for severe paralysis in 4 patients: the Stentrode with Thought-Controlled Digital Switch (SWITCH) study. *JAMA Neurology* 80, 270–278 (2023). [doi:10.1001/jamaneurol.2022.4847](https://doi.org/10.1001/jamaneurol.2022.4847)
8.  Christie BP et al. Comparison of spike sorting and thresholding of voltage waveforms for intracortical brain-machine interface performance. *Journal of Neural Engineering* 12, 016009 (2015). [doi:10.1088/1741-2560/12/1/016009](https://doi.org/10.1088/1741-2560/12/1/016009)
9.  Quiroga RQ, Nadasdy Z, Ben-Shaul Y. Unsupervised spike detection and sorting with wavelets and superparamagnetic clustering. *Neural Computation* 16, 1661–1687 (2004). [doi:10.1162/089976604774201631](https://doi.org/10.1162/089976604774201631)
10. Pachitariu M, Sridhar S, Pennington J, Stringer C. Spike sorting with Kilosort4. *Nature Methods* 21, 914–921 (2024). [doi:10.1038/s41592-024-02232-7](https://doi.org/10.1038/s41592-024-02232-7). Code: [github.com/MouseLand/Kilosort](https://github.com/MouseLand/Kilosort)
11. Buccino AP et al. SpikeInterface, a unified framework for spike sorting. *eLife* 9, e61834 (2020). [doi:10.7554/eLife.61834](https://doi.org/10.7554/eLife.61834). Docs: [spikeinterface.readthedocs.io](https://spikeinterface.readthedocs.io/)
12. Trautmann EM et al. Accurate estimation of neural population dynamics without spike sorting. *Neuron* 103, 292–308 (2019). [doi:10.1016/j.neuron.2019.05.003](https://doi.org/10.1016/j.neuron.2019.05.003)
13. Wu W et al. Bayesian population decoding of motor cortical activity using a Kalman filter. *Neural Computation* 18, 80–118 (2006). [doi:10.1162/089976606774841585](https://doi.org/10.1162/089976606774841585)
14. Gilja V et al. A high-performance neural prosthesis enabled by control algorithm design. *Nature Neuroscience* 15, 1752–1757 (2012). [doi:10.1038/nn.3265](https://doi.org/10.1038/nn.3265)
15. Pandarinath C et al. High performance communication by people with paralysis using an intracortical brain-computer interface. *eLife* 6, e18554 (2017). [doi:10.7554/eLife.18554](https://doi.org/10.7554/eLife.18554)
16. Hochberg LR et al. Reach and grasp by people with tetraplegia using a neurally controlled robotic arm. *Nature* 485, 372–375 (2012). [doi:10.1038/nature11076](https://doi.org/10.1038/nature11076)
17. Collinger JL et al. High-performance neuroprosthetic control by an individual with tetraplegia. *The Lancet* 381, 557–564 (2013). [doi:10.1016/S0140-6736(12)61816-9](https://doi.org/10.1016/S0140-6736(12)61816-9)
18. Sussillo D et al. A recurrent neural network for closed-loop intracortical brain-machine interface decoders. *Journal of Neural Engineering* 9, 026027 (2012). [doi:10.1088/1741-2560/9/2/026027](https://doi.org/10.1088/1741-2560/9/2/026027)
19. Willett FR et al. High-performance brain-to-text communication via handwriting. *Nature* 593, 249–254 (2021). [doi:10.1038/s41586-021-03506-2](https://doi.org/10.1038/s41586-021-03506-2)
20. Moses DA et al. Neuroprosthesis for decoding speech in a paralyzed person with anarthria. *New England Journal of Medicine* 385, 217–227 (2021). [doi:10.1056/NEJMoa2027540](https://doi.org/10.1056/NEJMoa2027540)
21. Willett FR et al. A high-performance speech neuroprosthesis. *Nature* 620, 1031–1036 (2023). [doi:10.1038/s41586-023-06377-x](https://doi.org/10.1038/s41586-023-06377-x)
22. Card NS et al. An accurate and rapidly calibrating speech neuroprosthesis. *New England Journal of Medicine* 391, 609–618 (2024). [doi:10.1056/NEJMoa2314132](https://doi.org/10.1056/NEJMoa2314132)
23. Rubin DB et al. Interim safety profile from the feasibility study of the BrainGate Neural Interface System. *Neurology* 100, e1177–e1192 (2023). [doi:10.1212/WNL.0000000000201707](https://doi.org/10.1212/WNL.0000000000201707)
24. Downey JE et al. Intracortical recording stability in human brain-computer interface users. *Journal of Neural Engineering* 15, 046016 (2018). [doi:10.1088/1741-2552/aab7a0](https://doi.org/10.1088/1741-2552/aab7a0)
25. Barrese JC et al. Failure mode analysis of silicon-based intracortical microelectrode arrays in non-human primates. *Journal of Neural Engineering* 10, 066014 (2013). [doi:10.1088/1741-2560/10/6/066014](https://doi.org/10.1088/1741-2560/10/6/066014)
