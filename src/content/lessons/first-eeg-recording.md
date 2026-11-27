---
title: "Your First EEG Recording: Electrodes, Placement and Signal Quality"
description: "A practical guide to the bench: where electrodes go and how they are named, wet, dry and semi-dry electrodes, reference and bias, impedance, the artifacts you will see, electrical safety, and a checklist for your first session."
module: bci
sourceUrl: ""
---
*Written in November 2026. Every device note below was checked against the maker's own documentation at that date. Devices and software change, so check the linked pages before you buy or record.*

The previous lesson helped you choose a headset. This one is about the hour you spend with it on someone's head. Most problems in a first recording are not about the brain at all. They come from where the electrodes sit, how well they touch the skin, and what else is picking up electricity in the room. Learn to spot these and your data will be usable.

This lesson does not depend on a particular device. Short notes for OpenBCI, Muse, PiEEG and Emotiv are near the end.

## Where electrodes go: the 10-20 system

Researchers needed a way to put electrodes in the same place on heads of different sizes, so that a recording in Montréal could be compared with one in Paris. The answer is the **International 10-20 system**, proposed by Herbert Jasper in 1958 and still the basis of electrode placement today ([Wikipedia: 10-20 system](https://en.wikipedia.org/wiki/10%E2%80%9320_system_%28EEG%29)).

It starts from four landmarks you can find with your fingers:

- the **nasion**, the dip between the forehead and the nose;
- the **inion**, the bump at the back of the skull;
- the two **preauricular points**, just in front of each ear.

You measure the distance from nasion to inion over the top of the head, and from one preauricular point to the other. Electrodes are then placed at 10% or 20% steps of those distances. That is where the name comes from. **Cz**, the vertex, sits at the halfway point of both measurements.

![The 21 electrode positions of the International 10-20 system, seen from above with the nose at the top](/learn/images/first-eeg-recording/10-20.svg)

*The 21 positions of the 10-20 system. Diagram by トマトン124, [Wikimedia Commons](https://commons.wikimedia.org/wiki/File:21_electrodes_of_International_10-20_system_for_EEG.svg), public domain. A white background was added for this page.*

### Reading an electrode name

Each name has two parts.

**The letters say which region of the head.**

| Letters | Region |
| --- | --- |
| Fp | frontal pole (the forehead) |
| F | frontal |
| C | central (over the strip between frontal and parietal lobes; there is no "central lobe") |
| T | temporal |
| P | parietal |
| O | occipital |
| A or M | ear lobe (auricular) or mastoid bone behind the ear, often used for the reference |

**The number or the z says which side.**

- **Odd numbers are on the left**, **even numbers are on the right**. F3 is on the left, F4 on the right.
- Numbers get **bigger as you move away from the midline**. F3 is closer to the middle of the head than F7.
- A lower-case **z** (for "zero") means the **midline**: Fpz, Fz, Cz, Pz, Oz.

So **C3** is over the left central region and **C4** over the right one. These sites lie over the motor areas, which is why motor imagery studies often record from them. Keep in mind that each scalp electrode picks up activity from a wide area of cortex, not only from the tissue directly below it.

### The 10-10 system and the renamed electrodes

Twenty-one electrodes leave large gaps. The **10-10 system** adds positions halfway between the 10-20 ones and gives intermediate sites names that combine two letters: **AF** (between Fp and F), **FC**, **FT**, **CP**, **TP** and **PO**. The American Clinical Neurophysiology Society (ACNS) recommends this naming in its guideline on electrode nomenclature ([Acharya et al., 2016](https://doi.org/10.1097/WNP.0000000000000316)).

The 10-10 system also renamed four positions so that names in the same row share the same number. You will see both versions in papers and in device manuals:

| Old 10-20 name | 10-10 name |
| --- | --- |
| T3 | T7 |
| T4 | T8 |
| T5 | P7 |
| T6 | P8 |

This renaming is stated in ACNS Guideline 1 ([Sinha et al., 2016](https://doi.org/10.1097/WNP.0000000000000308)). If a manual says T3 and your cap says T7, they are the same place.

![Electrode positions of the 10-10 system, colour-coded by brain lobe, with a side view showing the nasion, inion and preauricular points](/learn/images/first-eeg-recording/10-10.svg)

*The 10-10 system. Nz is the nasion, Iz the inion, LPA and RPA the left and right preauricular points. Diagram by Laurens R. Krol, [Wikimedia Commons](https://commons.wikimedia.org/wiki/File:EEG_10-10_system_with_additional_information.svg), CC0. A white background was added for this page.*

**In practice:** caps come in sizes based on head circumference. Measure the head with a soft tape, pick the cap, then check that Cz really sits halfway between nasion and inion and halfway between the ears. A cap that has slid one or two centimetres backwards is a common reason for odd results.

## Wet, dry and semi-dry electrodes

The outer layer of the skin, the stratum corneum, is a poor conductor. It is the largest part of the electrical resistance between the electrode and the body ([Lopez-Gordo et al., 2014](https://doi.org/10.3390/s140712847)). Electrode types differ mostly in how they deal with that layer and with hair.

| Type | How it works | Strengths | Weaknesses |
| --- | --- | --- | --- |
| **Wet** | Metal disc, usually silver/silver chloride (Ag/AgCl) or gold, with conductive gel or paste between electrode and skin | Lowest and most stable contact; the reference against which other types are judged | Setup takes time; hair needs washing afterwards; gel slowly dries; too much gel can bridge two neighbouring electrodes |
| **Dry** | Metal pins, combs or conductive polymer pressed on the skin, no gel | Fast to put on; good for repeated or everyday use | Higher contact impedance; more sensitive to movement; usually needs an amplifier built into the electrode ("active" electrode) |
| **Semi-dry** | A sponge, felt pad or small reservoir that releases a little electrolyte, often saline, at the contact point | A compromise: little mess, lower impedance than dry | Pads dry out over time and need rewetting; saline can drip and bridge electrodes |

The review by [Lopez-Gordo et al. (2014)](https://doi.org/10.3390/s140712847) concluded that wet electrodes are still the gold standard, and that dry electrodes come close but have been tested with very different methods. Semi-dry designs keep appearing in research; [Hua et al. (2019)](https://doi.org/10.3390/mi10080518) describe one that stores electrolyte in a reservoir layer and releases it slowly for recordings over hairy sites.

A **salt bridge** is worth knowing about early. If gel or saline spreads between two electrodes, they become one electrode electrically. The two channels then show almost the same signal. ACNS Guideline 1 notes that an impedance below 100 Ω usually means a short circuit of this kind ([Sinha et al., 2016](https://doi.org/10.1097/WNP.0000000000000308)).

## Reference, ground and bias (DRL)

### The reference

An EEG amplifier cannot measure the voltage at one point. It can only measure a **difference between two points**. Each channel is the voltage at its electrode minus the voltage at a shared **reference** electrode. Common places for the reference are an ear lobe (A1 or A2), the mastoid bone behind the ear (M1 or M2), the midline (Cz or FCz), or the forehead (Fpz).

Three things follow from this:

1. **A bad reference ruins every channel at once.** If all channels suddenly look noisy in the same way, check the reference first. Emotiv's manual gives the same advice: when every channel shows the same poor quality, the likely cause is the reference sensors ([Emotiv EPOC user manual](https://emotiv.gitbook.io/epoc-user-manual/troubleshooting/contact_quality)).
2. **Activity at the reference appears in every channel.** A reference on the jaw muscles, for example, adds muscle noise everywhere.
3. **You can change the reference later in software** (for example to the average of all channels), but you cannot remove a problem that was in the reference while you recorded.

### Ground and bias

The amplifier also needs the body to sit at a known voltage relative to its own circuit. Clinical systems use a **ground** electrode for this. Many research and DIY boards built on the Texas Instruments ADS1299 chip, including OpenBCI and PiEEG, use a **bias** electrode instead. The ADS1299 has a built-in "bias drive amplifier" for this purpose ([TI ADS1299 product page](https://www.ti.com/product/ADS1299)).

The bias electrode works like the **driven right leg (DRL)** circuit first developed for heart recordings ([Winter and Webster, 1983](https://doi.org/10.1109/tbme.1983.325168)). The amplifier measures the part of the signal that is the same on all electrodes, the **common-mode** signal. Mains hum picked up by the whole body is a large part of it. The amplifier then drives an inverted copy back into the body through the bias electrode, which reduces that common-mode signal. Emotiv headsets use the same idea with a pair of electrodes called CMS and DRL.

![Diagram: an active electrode at Cz and a reference on the left ear lobe go to the plus and minus inputs of a differential amplifier, whose output is the channel Cz minus A1. A bias electrode on the right ear lobe is driven by a bias amplifier.](/learn/images/first-eeg-recording/reference-bias-en.svg)

*How the three kinds of electrode connect. Diagram made for this lesson by NeuroTechX.*

People often call the bias electrode "ground". On boards like OpenBCI, the labels you will actually see are **SRB** (the reference) and **BIAS**.

## Impedance: how good is the contact?

**Impedance** is how strongly the electrode-skin junction opposes a small alternating current. It is measured in ohms, usually kilo-ohms (kΩ). Software measures it by sending a very small test current through the electrode. The OpenBCI documentation, for example, describes its impedance widget this way ([OpenBCI GUI docs](https://docs.openbci.com/Software/OpenBCISoftware/GUIDocs/)).

Why it matters:

- **Mains noise and slow drift.** In a study recorded at the same time from low- and high-impedance sites, [Kappenman and Luck (2010)](https://doi.org/10.1111/j.1469-8986.2010.01009.x) found more low-frequency noise at the high-impedance sites, especially when the room was warm and humid.
- **Balance matters as much as the number.** The amplifier removes noise that is the same on both of its inputs (common-mode rejection). This works best when impedances are similar. ACNS Guideline 1 says that with modern digital equipment, impedances up to 10 kΩ are acceptable, but optimal recordings still need balanced impedances ([Sinha et al., 2016](https://doi.org/10.1097/WNP.0000000000000308)).
- **Modern amplifiers are more forgiving.** [Ferree et al. (2001)](https://doi.org/10.1016/s1388-2457%2800%2900533-2) found no significant change in EEG amplitude as impedance rose from under 10 kΩ to 40 kΩ when using high input-impedance amplifiers.

The 10 kΩ figure is a clinical guideline for wet electrodes. Dry and semi-dry systems run higher by design, so use the threshold your device's software suggests. What you can always do is make the values **low, similar to each other, and stable**.

To bring impedance down: move hair aside under the electrode, add a little more gel (wet) or saline (semi-dry), press the electrode gently but firmly, and give it a minute to settle. Do not scratch or abrade the skin. Breaking the skin creates a risk of infection ([Ferree et al., 2001](https://doi.org/10.1016/s1388-2457%2800%2900533-2)).

## The artifacts you will see

An **artifact** is any signal in the recording that does not come from the brain. Some come from the body, some from the equipment and the room ([Jiang et al., 2019](https://doi.org/10.3390/s19050987)). The table describes what each one looks like on a live display.

| Artifact | What it looks like | Where it is strongest | What to do |
| --- | --- | --- | --- |
| **Eye blinks** | Large, smooth bumps lasting a fraction of a second, much bigger than the EEG | Front of the head: Fp1, Fp2, AF7, AF8 | Normal. Ask for natural blinking; mark blinks or remove them later (for example with ICA) |
| **Eye movements** | Step-like shifts when the eyes look left or right | Front and sides of the head, opposite sign on left and right | Give the person a fixed point to look at |
| **Jaw clench, talking, swallowing** | Bursts of fast, spiky activity; muscle activity covers a broad range of frequencies, from near 0 Hz to above 200 Hz | Temporal sites (T7, T8, TP9, TP10), over the jaw muscles | Ask the person to relax the jaw and keep the mouth slightly open |
| **Line noise (50 or 60 Hz)** | A steady fast oscillation that makes the trace look thick; a sharp peak at 50 or 60 Hz in the spectrum | One channel: a bad contact on that electrode. All channels: the reference or bias, or the room | Fix the contact first. Move away from power cords. Use a notch filter only after that |
| **Head and body movement** | Large, slow swings, often on many channels together | Everywhere | Ask the person to sit comfortably and still |
| **Cable sway** | Irregular slow waves that follow movement of the wires | Channels whose wires are moving | Bundle and fix the cables |
| **Sweat** | Slow wandering of the baseline over seconds; neighbouring channels may start to look alike | Anywhere, worse in warm rooms | Keep the room cool; dry the skin; check for salt bridges |
| **Heartbeat** | Small regular wave about once per second | Electrodes near blood vessels or the neck | Usually harmless; note it |

A few of these deserve more detail.

**Eye blinks** are produced by the eye and eyelid, not the brain. The electrical signal from the eyes is many times larger than the EEG ([Jiang et al., 2019](https://doi.org/10.3390/s19050987)). On a forehead device like Muse, blinks are the first thing you will see.

**Line noise** comes from the power grid. It is 60 Hz in Canada, the United States and parts of South America, and 50 Hz in Europe, most of Africa and most of Asia ([Wikipedia: mains electricity by country](https://en.wikipedia.org/wiki/Mains_electricity_by_country)). OpenBCI's guide suggests keeping the board away from power cords and devices plugged into the wall, and lists other sources: extension cords on the floor, wiring in walls, metal desks and some lighting ([OpenBCI: Minimizing Noise](https://docs.openbci.com/Troubleshooting/minimizingNoise/)).

**Cable sway** matters most with passive electrodes, the plain wires most starter kits use. OpenBCI notes that shaking the dangling electrode wires "severely affects the signals", and suggests binding the cables together with electrical tape. Active electrodes reduce this problem ([OpenBCI: Minimizing Noise](https://docs.openbci.com/Troubleshooting/minimizingNoise/)).

**Sweat** changes the contact as you record. The study by [Kappenman and Luck (2010)](https://doi.org/10.1111/j.1469-8986.2010.01009.x) found that the extra noise at high-impedance sites was worst in a warm, humid room, and that a cool, dry room reduced it.

**A good first exercise:** at the start of your first session, record each artifact on purpose for a few seconds and label it. Blink five times. Look left, then right. Clench your jaw. Nod your head. Swing a cable. You will learn what your own system shows for each, and later you will recognise them at once.

## Electrical safety

EEG puts conductive electrodes on a person's head, so electrical safety is not optional. The rules below come from the makers' own documentation.

**1. Run DIY boards from a battery, and keep the person away from mains power.**

- OpenBCI boards "are designed to take power only from low-voltage DC sources, i.e. batteries" and do not take power from the grid, wall outlets or USB ports ([OpenBCI liability policy](https://docs.openbci.com/Policies/Liability/)). The Cyton specs say "Power with 3-6V DC Battery ONLY" ([Cyton specs](https://docs.openbci.com/Cyton/CytonSpecs/)). The board talks to the computer by radio, through a USB dongle.
- The PiEEG board has **no isolation**. While electrodes are on a person, the Raspberry Pi, the PiEEG and everything cabled to them must run from a 5 V power bank. That rules out a wall charger, a mains-powered monitor (the HDMI cable connects the mains to the Pi) and a USB or Ethernet cable to a computer that is plugged into the wall. A laptop is fine if it runs on battery and connects over Wi-Fi ([PiEEG safety page](https://docs.pieeg.com/hardware/devices/pieeg-8/safety/)).

**2. Do not charge anything that is connected to the person during a session.** PiEEG says to charge the power bank before the session, never during it ([PiEEG safety page](https://docs.pieeg.com/hardware/devices/pieeg-8/safety/)). Apply the same rule to any DIY setup: if a laptop is wired to a non-isolated board, unplug its charger before the electrodes go on.

**Why this matters.** The electrodes and gel make a low-resistance connection between the circuit and the person's body. If that circuit is wired to equipment powered from the wall, a fault or leakage current in that equipment's power supply has a path through the person. A battery-powered board with no wired link to mains equipment has no such path. As PiEEG puts it, full isolation from the mains "depends entirely on running from a battery".

**Why medical EEG is different.** Clinical EEG systems are built and tested to **IEC 60601-1**, the international standard for the basic safety of medical electrical equipment ([IEC 60601-1](https://webstore.iec.ch/en/publication/2612)). Under this standard, the parts that touch the patient are classed by how well they are isolated. Classes BF and CF are electrically "floating", and the standard limits how much current may leak through the patient, both in normal use and when one fault occurs ([Advanced Energy: designing for BF and CF](https://www.advancedenergy.com/en-us/about/news/blog/safety-requirements-in-medical-equipment-designing-for-bf-and-cf-classifications/)). That isolation is what makes it safe to connect a hospital amplifier to the mains. DIY and developer boards do not have it, which is why they rely on batteries.

**3. Other rules from the manufacturers.**

- These boards are not medical devices and must not be used to diagnose or treat anything ([OpenBCI liability policy](https://docs.openbci.com/Policies/Liability/), [PiEEG safety page](https://docs.pieeg.com/hardware/devices/pieeg-8/safety/)).
- Do not record from someone with a pacemaker or other implanted electronic device without a physician's approval ([PiEEG safety page](https://docs.pieeg.com/hardware/devices/pieeg-8/safety/)).
- Use clean, intact skin, stop if the skin becomes irritated, and clean off gel after the session ([PiEEG safety page](https://docs.pieeg.com/hardware/devices/pieeg-8/safety/)).

## Checklist for your first session

**Before the person arrives**

- [ ] Batteries charged; nothing will need charging during the session.
- [ ] Laptop on battery with the charger unplugged, or connected only by radio (Bluetooth, Wi-Fi, a radio dongle).
- [ ] Software installed and tested with the board alone, or with the BrainFlow synthetic board (see below).
- [ ] Notch filter set to your local mains frequency (60 Hz in Canada and the US, 50 Hz in Europe).
- [ ] Room cool, chair comfortable, phones and chargers moved away from the cables.
- [ ] Electrodes clean and dry; gel, saline, tissues and a measuring tape at hand.

**Putting the electrodes on**

- [ ] Explain what you will do and get the person's agreement. Ask about implanted devices and skin problems.
- [ ] Measure the head; place Cz at the midpoint; check the cap is centred and straight.
- [ ] Place the **reference and bias first** and check their contact. Every channel depends on them.
- [ ] Part the hair under each electrode; apply gel or saline as your system requires.
- [ ] Check impedance or contact quality. Aim for low, similar and stable values. Fix the worst channel first.
- [ ] Bundle and secure the cables.

**Before you press record**

- [ ] Look at the raw signal for a minute with filters off. Are all channels alive? Is any channel flat or much noisier than the others?
- [ ] Record the artifact tour: blinks, eye movements, jaw clench, a nod, a cable swing. Label each one.
- [ ] Record two minutes with eyes open, then two minutes with eyes closed. With eyes closed, most people show a clear increase in alpha rhythm (8 to 13 Hz), strongest at the back of the head. Seeing it is a good sign that you are recording brain activity.
- [ ] Write notes: date, device, electrode positions, reference, impedances, room conditions, anything that went wrong.

**After the session**

- [ ] Save the raw, unfiltered data and your notes together.
- [ ] Clean the electrodes as the maker recommends, and help the person clean off the gel.

## Device notes

### OpenBCI (Cyton and Ganglion)

- Battery powered only (see the safety section). The Cyton is built on the ADS1299 chip ([Cyton specs](https://docs.openbci.com/Cyton/CytonSpecs/)).
- In OpenBCI's EEG setup guide, the reference goes to the **SRB2** pin (REF on the Ganglion) and the bias goes to the **BIAS** pin (D_G on the Ganglion). The guide places one on each ear lobe ([OpenBCI EEG setup](https://docs.openbci.com/GettingStarted/Biosensing-Setups/EEGSetup/)).
- The OpenBCI GUI has an impedance widget. A value in red means you should adjust the electrode, part the hair or add gel or paste ([OpenBCI GUI docs](https://docs.openbci.com/Software/OpenBCISoftware/GUIDocs/)).
- The GUI has a 50/60 Hz notch filter and the noise guide gives practical tips: plug the dongle into a USB extension cord, sit slightly away from the computer, use a fully charged battery ([OpenBCI: Minimizing Noise](https://docs.openbci.com/Troubleshooting/minimizingNoise/)).
- Data out: the GUI's Networking widget streams over LSL ([OpenBCI GUI widgets](https://docs.openbci.com/Software/OpenBCISoftware/GUIWidgets/)); BrainFlow supports Cyton, Cyton Daisy and Ganglion.

### Muse

- The Muse 2 records from four fixed positions, **TP9, AF7, AF8 and TP10**, with the reference at **FPz**, at 256 Hz ([Muse 2 product page](https://choosemuse.com/products/muse-2)). You cannot move the sensors, so it suits forehead and behind-the-ear signals such as blinks, frontal alpha and jaw muscle activity, not motor imagery over C3 and C4.
- Muse's starter guide gives these tips for a good signal: make sure no hair is between the sensors and the skin; wipe the sensors with a cloth or tissue lightly dampened with water; extend both earpieces equally; and wait 30 to 60 seconds after any adjustment for the signal to settle. The app's sensor check shows whether the band is on correctly ([Muse 2 starter guide](https://choosemuse.com/blogs/news/muse-2-starter-guide)).
- Data out: BrainFlow supports Muse 2, Muse S, Muse S Athena and Muse 2016 ([BrainFlow supported boards](https://brainflow.readthedocs.io/en/stable/SupportedBoards.html)).

### PiEEG

- PiEEG is a shield for the Raspberry Pi built on the ADS1299. Channels 1 to 8 go to electrodes in a 10-20 cap; the **reference** is an ear clip on one ear lobe and the **bias** an ear clip on the other ([PiEEG on GitHub](https://github.com/pieeg-club/PiEEG-8)).
- Read the [safety page](https://docs.pieeg.com/hardware/devices/pieeg-8/safety/) before the first session. The rules on batteries, monitors and laptops in the safety section above come from it.
- Data out: the PiEEG Server streams to CSV, LSL and OSC, and BrainFlow has a PiEEG board ([PiEEG on GitHub](https://github.com/pieeg-club/PiEEG-8)).

### Emotiv (EPOC X)

- The EPOC X has 14 channels at **AF3, F7, F3, FC5, T7, P7, O1, O2, P8, T8, FC6, F4, F8 and AF4**, plus **CMS/DRL** references. The sensors are Ag/AgCl with felt pads wetted with saline (semi-dry), and the sampling rate is 128 or 256 samples per second ([EPOC X technical specifications](https://emotiv.gitbook.io/epoc-x-user-manual/introduction/technical-specifications)).
- Emotiv's contact quality map shows each sensor in green, orange, red or black. Get the reference sensors green before adjusting the others ([EPOC user manual](https://emotiv.gitbook.io/epoc-user-manual/troubleshooting/contact_quality)).
- Emotiv separates **contact quality** (CQ), which is an impedance measurement, from **EEG quality** (EQ), a score from a trained algorithm. Emotiv notes that a low-impedance signal is not necessarily a brain signal ([EmotivPRO: CQ vs EQ](https://emotiv.gitbook.io/emotivpro-v3/emotivpro-menu/contact-quality-map/contact-quality-cq-vs.-eeg-quality-eq)).
- Data out: EmotivPRO can stream over LSL ([EmotivPRO LSL outlet](https://emotiv.gitbook.io/emotivpro-v3/lab-streaming-layer-lsl/lsl-outlet)). Emotiv is not in BrainFlow's list of supported boards.

## Getting the data out: LSL and BrainFlow

Two open-source tools let you get data from almost any of these devices into your own code.

- **[Lab Streaming Layer (LSL)](https://labstreaminglayer.readthedocs.io/)** sends data streams over the local network with shared timestamps. It is the usual way to record EEG together with other streams, such as event markers from an experiment, and save them all to one file. OpenBCI, Emotiv and PiEEG software can send LSL streams.
- **[BrainFlow](https://brainflow.readthedocs.io/)** is a library with one API for many boards, in Python and other languages. You change one line to switch boards.

The Python example below uses BrainFlow's **synthetic board**, so you can run it without any hardware (`pip install brainflow numpy`). It records 10 seconds, saves the raw data, then prints each channel's standard deviation and how much of its power sits near 50 Hz and 60 Hz. Run the same check on real data: a channel with a large 50 or 60 Hz share usually has a bad contact.

```python
import time

import numpy as np
from brainflow.board_shim import BoardIds, BoardShim, BrainFlowInputParams
from brainflow.data_filter import DataFilter

board_id = BoardIds.SYNTHETIC_BOARD  # later: CYTON_BOARD, MUSE_2_BOARD, PIEEG_BOARD...
params = BrainFlowInputParams()  # e.g. params.serial_port = "/dev/ttyUSB0" for a Cyton

BoardShim.disable_board_logger()
board = BoardShim(board_id, params)
board.prepare_session()
board.start_stream()
time.sleep(10)  # record 10 seconds
data = board.get_board_data()
board.stop_stream()
board.release_session()

DataFilter.write_file(data, "first_session.csv", "w")  # keep the raw data

fs = BoardShim.get_sampling_rate(board_id)
for ch in BoardShim.get_eeg_channels(board_id):
    x = data[ch] - data[ch].mean()
    power = np.abs(np.fft.rfft(x)) ** 2
    freqs = np.fft.rfftfreq(len(x), 1 / fs)
    total = power[(freqs > 1) & (freqs < 100)].sum()
    share = {f: power[np.abs(freqs - f) < 1].sum() / total for f in (50, 60)}
    print(f"channel {ch}: SD {x.std():.1f} uV, "
          f"50 Hz share {share[50]:.1%}, 60 Hz share {share[60]:.1%}")
```

On the synthetic board, most channels show almost no line noise, and one or two channels show a large 50 Hz or 60 Hz share. That is what a channel with a poor contact looks like in numbers. Each real board needs its own connection settings (serial port, MAC address and so on), listed in the [BrainFlow supported boards page](https://brainflow.readthedocs.io/en/stable/SupportedBoards.html).

The next lesson, [Software Tools for BCI](/learn/bci-software), covers what to do with the data once you have it.

## References

- Acharya JN, Hani A, Cheek J, Thirumala P, Tsuchida TN (2016). American Clinical Neurophysiology Society Guideline 2: Guidelines for standard electrode position nomenclature. *Journal of Clinical Neurophysiology* 33(4):308-311. [doi:10.1097/WNP.0000000000000316](https://doi.org/10.1097/WNP.0000000000000316)
- Ferree TC, Luu P, Russell GS, Tucker DM (2001). Scalp electrode impedance, infection risk, and EEG data quality. *Clinical Neurophysiology* 112(3):536-544. [doi:10.1016/s1388-2457(00)00533-2](https://doi.org/10.1016/s1388-2457%2800%2900533-2)
- Hua H, Tang W, Xu X, Feng DD, Shu L (2019). Flexible multi-layer semi-dry electrode for scalp EEG measurements at hairy sites. *Micromachines* 10(8):518. [doi:10.3390/mi10080518](https://doi.org/10.3390/mi10080518)
- Jiang X, Bian GB, Tian Z (2019). Removal of artifacts from EEG signals: a review. *Sensors* 19(5):987. [doi:10.3390/s19050987](https://doi.org/10.3390/s19050987)
- Kappenman ES, Luck SJ (2010). The effects of electrode impedance on data quality and statistical significance in ERP recordings. *Psychophysiology* 47(5):888-904. [doi:10.1111/j.1469-8986.2010.01009.x](https://doi.org/10.1111/j.1469-8986.2010.01009.x)
- Lopez-Gordo MA, Sanchez-Morillo D, Pelayo Valle F (2014). Dry EEG electrodes. *Sensors* 14(7):12847-12870. [doi:10.3390/s140712847](https://doi.org/10.3390/s140712847)
- Sinha SR, Sullivan L, Sabau D, et al. (2016). American Clinical Neurophysiology Society Guideline 1: Minimum technical requirements for performing clinical electroencephalography. *Journal of Clinical Neurophysiology* 33(4):303-307. [doi:10.1097/WNP.0000000000000308](https://doi.org/10.1097/WNP.0000000000000308)
- Winter BB, Webster JG (1983). Driven-right-leg circuit design. *IEEE Transactions on Biomedical Engineering* 30(1):62-66. [doi:10.1109/tbme.1983.325168](https://doi.org/10.1109/tbme.1983.325168)
