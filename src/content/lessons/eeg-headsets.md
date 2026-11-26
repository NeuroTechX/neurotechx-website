---
title: "Consumer EEG Headsets"
description: "Your choice of headset will depend on what you intend to use it for. The answer will depend on your budget, interest, project idea and the number of electrodes required. Before purchasing a headset, think about your programming experience and Project Idea."
module: bci
sourceUrl: "https://learn.neurotechedu.com/headsets/"
---
*Updated November 2026: device specs and prices were checked against vendor pages, discontinued models were replaced with current ones, and new devices and software tools were added.*

## What to look for in a headset

When deciding which EEG headset to purchase, there are a few features you should look at when making your decision.

### Number and Placement of Electrodes:

Depending on the type of brain response you want to measure, your system may need a minimum number of electrodes. Measuring Relaxation levels is easy with 1 or 2 electrodes but measuring other brain activity can be difficult. In most eeg papers, they will state where on the brain the strong response came from.

Also, many consumer EEG's have electrodes which are rigid and can't be moved. If you want to measure [Motor Imagery](https://en.wikipedia.org/wiki/Motor_imagery) with the Muse, you won't have much success. You would be better off with an OpenBCI so that you can place the electrodes where you want.

**Reference and more information**

[IMOTIONS EEG 101 Guide](https://imotions.com/blog/learning/best-practice/eeg/)

### Sampling Rate:

The Sampling Rate of an EEG is the number of samples a second you can get from your device. Consumer devices range from about 128 to 512 samples a second, and some research systems go much higher. To capture a frequency, your sampling rate must be more than twice that frequency (the Nyquist rule). In practice, aim for at least 2.5 times the highest frequency you want to study.

**Reference and more information**

[This EEG tutorials has some more details on the sampling rate](http://www.ebme.co.uk/articles/clinical-engineering/56-introduction-to-eeg)

### ADC Bits:

Simply put, the Analog to Digital Converter (ADC) Bits is the resolution of the signal. The number of bits is important in being able to accurately estimate the voltage, but more bits doesn't necessarily mean better quality data. To give an idea of how it would work with eeg data, let's say your system has 2 ADC bits and you want to measure a signal between 0 and 10 Volts. This would mean that your computer would represent the data in the following way:

| Voltage | 2-Bit Digital Representation |
| --- | --- |
| 0-2.5 | 00 |
| 2.5-5.0 | 01 |
| 5.0-7.5 | 10 |
| 7.5-10.0 | 11 |

**Reference and more information**

[What does 12 or 16 bit resolution mean?](https://labjack.com/blogs/faq/what-does-12-or-16-bit-resolution-mean) [What are the advantages of a 24 bit system?](https://www.biosemi.com/faq/24bitsystem.htm)

### Data Access and Software:

Check how you will get the raw data out of the device before you buy it. Some vendors give free access to raw EEG. Others sell it as a separate software license. Two free, open-source tools work with many of the devices below:

-   [Lab Streaming Layer (LSL)](https://labstreaminglayer.org/) streams and time-syncs data from many devices.
-   [BrainFlow](https://brainflow.org/) is one library for reading many boards. See its [list of supported boards](https://brainflow.readthedocs.io/en/stable/SupportedBoards.html).

## Devices

Prices below are the vendor's US list price in November 2026. Prices change often, so check the vendor page before you buy.

### Muse

* * *

Muse is an EEG device made by Interaxon, a Toronto company, and was developed as a meditation device. It has 4 EEG channels, placed at TP9, AF7, AF8 and TP10 in the 10-20 International Standard, with a reference at FPz. It is one of the easier bands to get started with if you are interested in learning EEG as it requires no head prep.

Two models are sold now:

-   **Muse 2**: EEG plus heart rate (PPG) and motion sensors.
-   **Muse S Athena**: a headband with EEG plus fNIRS, a light-based sensor that measures blood oxygen over the forehead.

Both are listed on the [Muse store](https://choosemuse.com/).

Older models (the original Muse, Muse 2016 and earlier Muse S versions) are no longer listed on the Muse store's home page.

![Muse Headset](/learn/images/muse-white.png)

##### Features:

-   4 EEG channels
-   Static Electrode Placement (TP9, AF7, AF8, TP10)
-   Dry Electrodes
-   256 Hz Sampling Rate
-   12 bits (Muse 2), 14 bits (Muse S Athena)
-   SDK for iOS, Android, Windows and macOS, licensed for prototyping and personal projects. Commercial use needs a separate license, and researchers are asked to contact Muse for research tools. See the [Muse developer page](https://choosemuse.com/pages/developers).

##### Known Recordable EEG Paradigms:

-   "Relaxation" Level
-   "Concentration" levels
-   Frontal Asymmetry
-   P300

**US Price (November 2026):** Muse 2: $249.99. Muse S Athena: $474.99.

### OpenBCI

* * *

The OpenBCI is an open source EEG and can go to a maximum of 16 channels. It was originally a 2013 Kickstarter project, but has expanded the original concept to include an open source 3D printed headset, the Ultracortex. There is also a 4 channel board which can be purchased if you need something cheaper.

Current boards:

-   **Ganglion**: 4 channels, Bluetooth Low Energy. Default sampling rate 200 Hz. [Specs](https://docs.openbci.com/Ganglion/GanglionSpecs/)
-   **Cyton**: 8 channels, 24-bit ADS1299 chip, 250 Hz, micro SD card slot. [Specs](https://docs.openbci.com/Cyton/CytonSpecs/)
-   **Cyton + Daisy**: 16 channels. Over the wireless dongle, the 16-channel data arrive at 125 Hz.
-   **Galea**: a multi-sensor research headset. It costs far more than the boards.

![OpenBCI headset](/learn/images/openBCI.png)

##### Features:

-   4, 8 or 16 channels
-   Flexible Electrode Placement
-   Compatible with both Dry and Wet electrodes
-   200 Hz (Ganglion), 250 Hz (Cyton), 125 Hz (Cyton + Daisy) default sampling rates. See the [OpenBCI hardware FAQ](https://docs.openbci.com/FAQ/HardFAQ/).
-   24 bits
-   3-axis accelerometer
-   Open Source Software and Hardware

##### Known Recordable EEG Paradigms:

Any paradigm which needs only 16 channels or less

**US Price (November 2026, from the [OpenBCI shop](https://shop.openbci.com/)):**
Ganglion: $624.99. Cyton: $1,249. Cyton + Daisy: $2,499. Ultracortex Mark IV headset: from $499.99. Galea: $42,980.

### Emotiv EPOC X

* * *

The Emotiv Epoc is one of the first consumer EEG devices released on the market. The popularity of the company surged in 2012 and 2013, which can be reflected by its sales and number of DIY projects. The original EPOC and the EPOC+ are no longer sold. The current 14-channel model is the EPOC X.

The Epoc is more stylish and easier to wear. It has 14 channel EEG which has a static form factor. This board is a good option for easy development and it only requires software experience. It is a popular device to use for EEG research as the cost is much better versus other research grade mobile EEG providers. It is however less economic than other commercial headsets. Emotiv's software is not included with the EPOC X, Insight or Flex. Recording and exporting raw EEG, or reading it from your own code, needs a paid Emotiv license. A free tier lets you view raw EEG but not export it. See [what software is included](https://www.emotiv.com/knowledge-base/is-software-included-when-you-purchase-emotiv-eeg-headset) and [what the free tier allows](https://www.emotiv.com/knowledge-base/pro-lite-capabilities).

![Emotiv headset](/learn/images/emotiv_epoc_600.png)

##### Features

-   14 channels
-   Rigid Electrode Placement (AF3, F7, F3, FC5, T7, P7, O1, O2, P8, T8, FC6, F4, F8, AF4)
-   Wet Electrodes (require saline water)
-   128 or 256 Hz Sampling Rate (2048 Hz internally, then downsampled)
-   14 bits by default, 16 bits optional
-   9-axis motion sensor
-   Up to 9 hours of battery

Source: [EPOC X technical specifications](https://emotiv.gitbook.io/epoc-x-user-manual/introduction/technical-specifications).

##### Known Recordable EEG Paradigms:

Many paradigms which need only 14 channels or less

**US Price (November 2026):** $1,199. [Product page](https://www.emotiv.com/epoc-x)

### Emotiv Insight

* * *

The Emotiv Insight was the second product which Emotiv brought the market, and was marketed as a more economic option to their first product. The current version is the second generation of the Insight.

![Emotiv Insight](/learn/images/emotiv-insight.png)

##### Features

-   5 channels
-   Rigid Electrode Placement (AF3, AF4, T7, T8, Pz)
-   Semi-dry polymer electrodes
-   128 Hz Sampling Rate
-   16 bits
-   Up to 20 hours of battery

Source: [Insight technical specifications](https://emotiv.gitbook.io/insight-2-user-manual/introduction/technical-specifications).

##### Known Recordable EEG Paradigms:

Many paradigms which need only 5 channels or less

**US Price (November 2026):** $499, listed as on backorder. [Product page](https://www.emotiv.com/insight)

### Other Emotiv devices

* * *

-   **Flex 2.0**: a 32-channel cap. You choose the electrode positions. It uses gel or saline electrodes and samples at 128 or 256 Hz. [Product page](https://www.emotiv.com/flex), [specs](https://emotiv.gitbook.io/flex-2.0-user-manual/introduction/technical-specifications).
-   **MN8**: earbuds with 2 EEG channels at 128 Hz. [Product page](https://www.emotiv.com/mn8)

### Neurosky Mindwave Mobile 2

* * *

The Neurosky is one of the original consumer EEGs on the market. The design is simple and only has 1 channel meant for use. Some people say they have built more complicated products with them. The current model is the MindWave Mobile 2. NeuroSky's site links to an Amazon listing to buy it and does not show a price.

![Neurosky Mindwave](/learn/images/NeuroskyMindwave.png)

##### Features

-   1 channel
-   Rigid Electrode Placement (FP1, on the forehead)
-   Dry Electrodes
-   512 Hz Sampling Rate
-   12 bits
-   About 8 hours on one AAA battery
-   Available SDK

Source: [MindWave Mobile 2 page](https://neurosky.com/neurosky-products/mindwave-headset/).

##### Known Recordable EEG Paradigms:

-   "Relaxation" Level
-   "Concentration" levels

### Neurosity Crown

* * *

The Crown is an 8-channel headset with fixed electrodes at CP3, C3, F5, PO3, PO4, F6, C4 and CP4. It samples at 256 Hz and does some processing on the device. Neurosity provides JavaScript and Python SDKs.

**US Price (November 2026):** $1,499. [Product page](https://neurosity.co/crown)

### g.tec Unicorn Hybrid Black

* * *

The Unicorn is an 8-channel headset from g.tec, an Austrian maker of research EEG systems. Its electrodes can be used dry or with gel. It records at 250 Hz with 24 bits, and the battery lasts more than 3 hours. g.tec says its electrode layout suits motor imagery, P300, SSVEP and VEP experiments. [Product page](https://www.gtec.at/product/unicorn-hybrid-black-bci-platform/)

### Features Comparison

* * *

Specs are from the vendor pages linked above. Prices are US list prices in November 2026.

| Device | Channels | Electrodes | ADC Bits | Sample Rate | Motion sensors | Battery Length | Cost (US) |
| --- | --- | --- | --- | --- | --- | --- | --- |
| Muse 2 | 4 | Dry, fixed | 12 | 256 Hz | Yes | About 5 hours | $249.99 |
| Muse S Athena | 4 (plus fNIRS) | Dry, fixed | 14 | 256 Hz | Not checked | Not checked | $474.99 |
| OpenBCI Ganglion | 4 | Your choice | 24 | 200 Hz | 3 axis | Depends on battery | $624.99 |
| OpenBCI Cyton | 8 | Your choice | 24 | 250 Hz | 3 axis | Depends on battery | $1,249 |
| OpenBCI Cyton + Daisy | 16 | Your choice | 24 | 125 Hz | 3 axis | Depends on battery | $2,499 |
| Emotiv EPOC X | 14 | Saline, fixed | 14 or 16 | 128 or 256 Hz | 9 axis | Up to 9 hours | $1,199 |
| Emotiv Insight | 5 | Semi-dry, fixed | 16 | 128 Hz | 9 axis | Up to 20 hours | $499 |
| Emotiv Flex 2.0 | 32 | Gel or saline, your choice | 16 | 128 or 256 Hz | Not checked | Up to 6 hours | Not listed |
| Neurosky MindWave Mobile 2 | 1 | Dry, fixed | 12 | 512 Hz | N/A | About 8 hours | Not listed |
| Neurosity Crown | 8 | Fixed | Not checked | 256 Hz | Not checked | Not checked | $1,499 |
| g.tec Unicorn Hybrid Black | 8 | Dry or gel | 24 | 250 Hz | Accelerometer, gyroscope | More than 3 hours | Not checked |
