---
title: "Software Tools for BCI"
description: "This tutorial serves as an introduction to software tools that you can use to analyze EEG and MEG data."
module: bci
sourceUrl: "https://learn.neurotechedu.com/introbci_software/"
---
*Updated November 2026: checked every tool for recent releases, marked OpenEXP as archived, and added the core open-source BCI and EEG tools a newcomer should know today.*

# Introduction to Brain Computer Interfaces: Software to Use

This lesson has two parts. The first covers software for running experiments and presenting stimuli. The second covers the open-source tools most people now use to stream, analyze, and decode EEG.

## Experiment and stimulus software

### **PsychoPy**

[Psychopy](http://www.psychopy.org/about/index.html) is an open-source (GPLv2 license) Python application to build experiments. It is often used in psychology or cognitive neuroscience labs as an alternative to the proprietary E-Prime. Since it is written in Python, it's cross platform and scripts usually work on macOS, Windows, and Linux with no tweaking. It can allow timing based on frames, which it [claims](http://www.psychopy.org/coder/codeStimuli.html#timing) is more accurate than measuring with a clock. It includes an interface to [write code](https://www.psychopy.org/coder/index.html) for experiments:

![Psychopy](/learn/images/introbcisoftware/Psychopy-sample.png)

And [visual interface](https://www.psychopy.org/builder/index.html) to make experiments by dragging blocks around:

![Psychopy](/learn/images/introbcisoftware/psychopy_vis.png)

PsychoPy is actively maintained, with several releases each year. See the [PsychoPy website](https://www.psychopy.org/) for downloads and documentation.

### **Pygame**

[Pygame](https://web.archive.org/web/20200101032137/https://www.pygame.org/wiki/about) is an open (LGPL license) Python library to build games. Due to its simple library, it is also used in some labs to build experiments. As it is targeted to a wider audience, it has a pretty good set of tutorials and [docs](https://www.pygame.org/docs/). It has fewer dependencies and is generally easier to install than psychopy, and can sometimes give you greater control over what you display. However, it's also not geared towards experiments, and you may have to build up some helper functions to use pygame effectively.

The original pygame project has released less often in recent years. Its last release was 2.6.1 in September 2024. Many developers now use [pygame-ce](https://github.com/pygame-community/pygame-ce) (Community Edition), a fork with regular releases that keeps the same `import pygame` interface.

![Psychopy](/learn/images/introbcisoftware/pygame.png)

### **OpenViBE**

[OpenViBE](http://openvibe.inria.fr/) is an open-source (AGPLv3) platform specifically geared towards BCI experiments. It has a visual interface consisting of "blocks" that can be used to build experiments. These blocks can be extended using Python, Lua, C++, or Matlab.

![Psychopy](/learn/images/introbcisoftware/OpenViBE.png)

As it's geared towards BCI development, it has [comprehensive support](http://openvibe.inria.fr/supported-hardware/) for streaming EEG data from a lot of different devices, and [a lot of algorithms](http://openvibe.inria.fr/documentation/1.3.0/Doc_BoxAlgorithms.html) specifically for BCIs. It also has neat 3D interfaces for trying out BCI paradigms, like lifting a spaceship using motor imagery:

![Psychopy](/learn/images/introbcisoftware/OpenViBE.png)

The main downsides are that its interface can sometimes be intimidating and it does not have a library, so you cannot use OpenViBE without launching the full interface. Overall, OpenViBE is a great tool for getting started and experimenting with various BCI paradigms.

OpenViBE is still maintained. Version 3.7.0 was released in September 2025. Get the current version from the [OpenViBE downloads page](https://openvibe.inria.fr/downloads/).

### **OpenEXP**

[OpenEXP](https://github.com/openexp/OpenEXP) is an open-source (MIT license) desktop app for running experiments and collecting behavioural and physiological data. It was developed by [key NeurotechX members](https://github.com/openexp/OpenEXP/graphs/contributors) but never left the alpha stage.

**Status (2026):** the OpenEXP repository was archived in 2021 and is no longer developed. Use it only as a reference. For browser-based experiments, use [jsPsych](https://github.com/jspsych/jsPsych) directly. It is actively maintained.

![Psychopy](/learn/images/introbcisoftware/OPENEXP.png)

It is based on jsPsych and is written using Javascript, so it could run in a web browser for scalable data collection.

### **Psychtoolbox**

[Psychtoolbox](http://psychtoolbox.org/) is an open-source (MIT license) set of functions for running psychophysics experiments in Matlab or Octave. It has a lot of [tutorials](http://peterscarfe.com/ptbtutorials.html) geared towards psychophysics experiments and a comprehensive [FAQ](https://github.com/Psychtoolbox-3/Psychtoolbox-3/wiki/FAQ).

It can perform pretty much any visual, text, or audio you might need for psychophysics, such as a set of [rotating 3D cubes:](https://web.archive.org/web/20191217223456/http://peterscarfe.com:80/rotatingcubesdemo.html)

![Psychopy](/learn/images/introbcisoftware/psychtoolbox.png)

The functions provided can sometimes be close to the graphics pipeline, so it may have set textures or explicitly ask for anti-aliasing. However, this does provide more control.

Psychtoolbox is still maintained. Note that it changed its licensing model: recent versions need a paid license key for most setups, while the GNU Octave version on Linux remains free. See the [license key FAQ](https://github.com/Psychtoolbox-3/Psychtoolbox-3/wiki/FAQ#faqs-for-software-license-keys) for details.

## Core open-source tools for EEG and BCI (2026)

These tools are free, open source, and had releases or active development in 2025 or 2026. Most are written in Python and work together.

### Streaming and acquisition

- [Lab Streaming Layer (LSL)](https://labstreaminglayer.org/) streams time-series data, such as EEG and event markers, over a local network and keeps the streams time-synchronized. Many EEG devices and programs, including OpenViBE and [muse-lsl](https://github.com/alexandrebarachant/muse-lsl), can send or receive LSL streams. Code is on [GitHub](https://github.com/sccn/labstreaminglayer).
- [BrainFlow](https://brainflow.org/) is a library with one API for reading data from many biosensor boards, including OpenBCI and Muse. It has bindings for Python, C++, Java, C#, and other languages. See the [BrainFlow documentation](https://brainflow.readthedocs.io/).
- [Timeflux](https://timeflux.io/) is a Python framework for acquiring and processing biosignals in real time, for example to build closed-loop neurofeedback. Its last release was 0.17.2 in December 2024, so check the [repository](https://github.com/timeflux/timeflux) for activity before you depend on it.

### Analysis

- [MNE-Python](https://mne.tools/) is the standard Python package for exploring, visualizing, and analyzing EEG and MEG data. It covers filtering, epoching, ERPs, time-frequency analysis, and source localization. The [MNE tutorials](https://mne.tools/stable/auto_tutorials/index.html) are a good place to start.

### Decoding and benchmarking

- [pyRiemann](https://pyriemann.readthedocs.io/) provides machine learning methods based on Riemannian geometry of covariance matrices. These methods are widely used for motor imagery and ERP decoding. It follows the scikit-learn API.
- [Braindecode](https://braindecode.org/) is a deep learning toolbox for decoding raw EEG, built on PyTorch. It includes common EEG network architectures and data loaders.
- [MOABB](https://github.com/NeuroTechX/moabb) (Mother of All BCI Benchmarks) is a NeuroTechX project. It gives you a common interface to dozens of public BCI datasets and a standard way to evaluate and compare decoding pipelines. See the [MOABB documentation](https://moabb.neurotechx.com/docs/index.html).

### Experiments with low-cost EEG

- [EEG-ExPy](https://github.com/NeuroTechX/EEG-ExPy) is a NeuroTechX project, formerly called eeg-notebooks. It is a collection of classic EEG experiments in Python, such as N170, P300, and SSVEP, built for consumer hardware like the Muse and OpenBCI Cyton. It handles streaming, stimulus presentation, and analysis. See the [EEG-ExPy documentation](https://neurotechx.github.io/EEG-ExPy/).

### Full BCI platforms

- [OpenViBE](https://openvibe.inria.fr/) (described above) is a graphical platform for designing and running BCI scenarios.
- [BCI2000](https://www.bci2000.org/) is a general-purpose BCI research system written in C++. It has been used in many research labs since 2000 and supports a wide range of acquisition hardware and BCI paradigms. See the [BCI2000 wiki](https://www.bci2000.org/mediawiki/index.php/Main_Page) for documentation.
