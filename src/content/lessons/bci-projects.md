---
title: "BCI Projects and Apps"
description: "An easy project for one person might be difficult for someone else. Therefore we have broken down the projects as to either requiring no programming experience (plug and play) or requiring some experience. You will notice that with certain EEG headsets that there is more tutorials than others. This is likely due to the ease of development when using that device. The best way to get started will also depend on the headset that you have available."
module: bci
sourceUrl: "https://learn.neurotechedu.com/projects/"
---
*Updated November 2026: checked every link, fixed moved or dead ones, marked projects that are no longer maintained, and added current open-source starting points such as EEG-ExPy.*

Many of the tutorials below were written between 2015 and 2018. They still teach useful ideas, but code from that period may need updated libraries to run. Projects marked "not maintained" have had no updates for several years.

## Start here (any supported headset)

These open-source resources are maintained and work with several low-cost headsets, including Muse and OpenBCI.

| Tutorial | Author | Technical Experience Required? | Description | Link |
| --- | --- | --- | --- | --- |
| EEG-ExPy experiments | NeuroTechX | A bit | Ready-to-run classic EEG experiments (N170, P300, SSVEP, and others) with stimulus presentation, recording, and analysis in Python | [Click](https://neurotechx.github.io/EEG-ExPy/getting_started/running_experiments.html) |
| BrainFlow code samples | BrainFlow | Yes | Short examples for reading and processing data from many boards in Python and other languages | [Click](https://brainflow.readthedocs.io/en/stable/Examples.html) |
| MNE-Python tutorials | MNE developers | Yes | Step-by-step tutorials on loading, filtering, epoching, and plotting EEG data | [Click](https://mne.tools/stable/auto_tutorials/index.html) |
| awesome-bci | NeuroTechX | No | A community-maintained list of BCI software, datasets, and learning resources | [Click](https://github.com/NeuroTechX/awesome-bci) |

## DIY EEG

* * *

If you are interested in building your own eeg, here are some options to get you started

| Tutorial | Author | Difficulty | Description | Link |
| --- | --- | --- | --- | --- |
| icibici | NeuroTechLDN | Some Technical Experience | This open source DIY EEG is a 20 Euro device that works with your smartphone and an SSVEP keyboard app. | [Click](https://icibici.github.io/site/) |
| DIY EEG | OpenEEG Community | Some Technical Experience | This is one of the first and oldest DIY EEG designs out there. The project is no longer active, but the documentation is still online. | [Click](http://openeeg.sourceforge.net/doc/) |

## Muse

* * *

Muse is an EEG device which has developed as a meditation device. [You can learn about its features here.](/learn/eeg-headsets)

![Muse Headset](/learn/images/muse-white.png)

| Tutorial | Author | Technical Experience Required? | Description | Link |
| --- | --- | --- | --- | --- |
| Introduction to Brain Computer Interfaces | Raymundo Cassani & Hubert Banville | A bit | A Brain Computer Interface tutorial. Not maintained; the code dates from 2017. | [Click](https://github.com/NeuroTechX/bci-workshop) |
| Muse SDK | Interaxon | Yes | The original Unity tutorial is no longer online. Interaxon now offers a Muse SDK for iOS, Android, Windows, and macOS apps, licensed for testing, prototyping, art projects, and personal use | [Click](https://choosemuse.com/pages/developers) |
| muse-lsl | Alexandre Barachant | A bit | A Python package to stream, record, and view Muse data over Lab Streaming Layer | [Click](https://github.com/alexandrebarachant/muse-lsl) |
| Web based EEG viewer | Uri Shaked | Yes | This app will allow for you to try out your Muse using Angular via a standard browser. The project was renamed EEG Explorer and has not been updated since 2019. It uses the [muse-js](https://github.com/urish/muse-js) library. | [Click](https://github.com/urish/eeg-explorer) |
| Topographic map | Brainavatar | No | This app will allow for you to see a topographic map | [Click](https://web.archive.org/web/20200114115655/http://www.brainavatar.com:80/ebrainavatar-muse.html) |

## OpenBCI

* * *

The OpenBCI is an open source EEG with a maximum of 16 channels. [Full list of features here.](/learn/eeg-headsets)

![OpenBCI headset](/learn/images/openBCI.png)

| Tutorial | Author | Technical Experience required? | Description | Link |
| --- | --- | --- | --- | --- |
| P300 Speller | Jeremy Frey | Yes | This is using the OpenBCI to build a P300 Speller using the oddball paradigm. Written in 2015 for an older version of OpenViBE. | [Click](http://blog.jfrey.info/2015/02/04/openbci-p300-coadapt/) |
| OpenBCI GUI | OpenBCI | No | If you would like to just see your eeg activity, OpenBCI has a visualizer you can try. Downloads are on the [OpenBCI downloads page](https://openbci.com/downloads). | [Click](https://docs.openbci.com/Software/OpenBCISoftware/GUIDocs/) |
| Alphawave display | Hassan Albalawi | Yes | One of the OpenBCI Community members built an alphawave display | [Click](http://openbci.com/community/alphawave-openbci-based-demo/) |
| ERP Detector | NeuroTechBerkeley | Yes | This tutorial gives you everything you need to detect an ERP using remembered words in a list | [Click](https://github.com/NeuroTechX/bci-course/tree/master/lab3) |
| Building a simple Neurofeedback system | NeuroTechBerkeley | Yes | Using the OpenBCI to have a high beta to theta ratio | [Click](https://github.com/NeuroTechX/bci-course/tree/master/lab4) |
| Build an SSVEP | NeuroTechBerkeley | Yes | Using the OpenBCI to capture Steady-State Visual Evoked Potentials (SSVEP) | [Click](https://github.com/NeuroTechX/bci-course/tree/master/lab5) |
| Measuring Attention via Cross Brain Correlation Study | NeuroTechBerkeley | Yes | In the project, you will be recording eeg activity from different subjects while they watch a video. The more attention people pay, the more their brain activity should correlate. | [Click](https://github.com/NeuroTechX/bci-course/tree/master/lab7) |
| Brain Response to Smell Study | NeuroTechBerkeley | Yes | These scripts will allow for you capture eeg data and determine which smells cause a change in brainwaves | [Click](https://github.com/NeuroTechX/bci-course/tree/master/lab9) |

The NeuroTechBerkeley labs come from the 2017 [bci-course](https://github.com/NeuroTechX/bci-course) repository, which is now archived. The ideas still apply, but expect to update the code.

## Emotiv

* * *

The Emotiv EPOC is a 14 channel EEG. The current model is the EPOC X. [More details here.](/learn/eeg-headsets)

![Emotiv headset](/learn/images/emotiv_epoc_600.png)

| Tutorial | Author | Technical Experience Required? | Description | Link |
| --- | --- | --- | --- | --- |
| Brain Controlled Wheelchair | jerkey | yes | This Instructable will show how to make a Brain-Controlled Electric Wheelchair, so that a person can become mobile without moving their body. | [Click](https://www.instructables.com/Brain-Controlled-Wheelchair/) |

## NeuroSky

* * *

The Neurosky is one of the original consumer EEGs on the market. [Detailed description here.](/learn/eeg-headsets)

![Neurosky headset](/learn/images/NeuroskyMindwave.png)

| Tutorial | Author | Technical Experience Required? | Description | Link |
| --- | --- | --- | --- | --- |
| Brain Controlled RC Helicopter | Puzzlebox | Yes | This Instructable will show you how take a Radio Controller Helicopter and modify the remote control hardware such that it can be operated by free, open source computer software and flown based on brainwave measurements of concentration and relaxation taken by consumer-grade EEG headsets. | [Click](https://www.instructables.com/Brain-Controlled-RC-Helicopter/) |
| Mini Arduino Portable EEG | johnag | Yes | This is another example of the versatility , and of what , the Arduino, a small LCD Color display and the right type of sensors, are capable of doing. | [Click](https://www.instructables.com/Mini-Arduino-Portable-EEG-Brain-Wave-Monitor-/) |
| Mind Controlled Fan | BruvneshT1 | Yes | In this Instructable I will show that how with the help of an Arduino and Processing I was able to control a Fan. | [Click](https://www.instructables.com/Mind-Controlled-Fan-for-ALS-or-Paralyzed-patients/) |
| Neurosky Visualizer | Neurosky | no | This is the free Neurosky Brainwave Visualizer that you can use right out of the box. It is listed in the NeuroSky app store. | [Click](https://neurosky.com/store/) |

## No Headset

* * *

If you don't have a headset available, there are still some stuff you could do with Brain data. Check out some of these sources.

-   Want to contribute to open Neuroscience in a gamified way? [Check out Eyewire](https://eyewire.org/explore)
-   You can also take a look at a buttload of MRI data [using Brainbox](https://brainbox.pasteur.fr/)
-   [MOABB](https://moabb.neurotechx.com/docs/index.html) downloads public BCI datasets for you and lets you test decoding pipelines on them. The [MOABB examples](https://moabb.neurotechx.com/docs/auto_examples/index.html) are a good first project.
-   [OpenNeuro](https://openneuro.org/) hosts a large collection of free, openly shared neuroimaging datasets, including many EEG datasets.
