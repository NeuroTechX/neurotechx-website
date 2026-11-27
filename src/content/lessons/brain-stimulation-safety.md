---
title: "Brain Stimulation and Safety"
description: "What TMS, tDCS, tACS and transcranial focused ultrasound do, what the published safety guidelines say, why do-it-yourself stimulation is discouraged, and the ethical questions stimulation raises."
module: bci
sourceUrl: ""
---
Most of this course is about *reading* brain activity. Brain stimulation goes the other way: it sends energy into the brain to change how neurons behave. It is used in research to test what a brain region does, and some forms are used in clinical treatment. Because it acts on the brain directly, it comes with risks and with safety guidelines written by expert groups.

This lesson explains what each method does and summarizes those guidelines. It is not a guide to building or using stimulators. Stimulation of people should only be done within an approved research protocol or by trained clinicians.

## The main methods

### Transcranial magnetic stimulation (TMS)

A coil held over the head passes a brief, strong current, which produces a brief, strong magnetic field. The changing field induces an electric current in the cortex under the coil, which can excite or inhibit a small area of brain. Over the motor cortex, a single pulse can produce a twitch in a muscle, called a motor-evoked potential. TMS mainly reaches the parts of the brain just beneath the skull ([Hallett, 2007](https://doi.org/10.1016/j.neuron.2007.06.026)).

Pulses delivered in trains (repetitive TMS, or rTMS) can change brain excitability for some time after the session ends. That is why rTMS is studied, and in some places used, as a treatment.

### Transcranial electrical stimulation (tDCS and tACS)

Two or more electrodes on the scalp pass a weak current through the head, typically 1 to 2 mA.

- **tDCS** (direct current) applies a constant current. It does not normally make neurons fire on its own. It is thought to shift how easily neurons in the stimulated area fire.
- **tACS** (alternating current) applies a current that oscillates at a chosen frequency. The aim is to interact with the brain's own rhythms, such as alpha or gamma oscillations ([Herrmann et al., 2013](https://doi.org/10.3389/fnhum.2013.00279)).

Most of the current never reaches the brain: in rodents and human cadavers, about 75% of scalp-applied current was lost in the soft tissue and skull ([Vöröslakos et al., 2018](https://doi.org/10.1038/s41467-018-02928-3)). The part that does reach the brain spreads over a wide area.

### Transcranial ultrasound stimulation (TUS)

Low-intensity focused ultrasound is aimed through the skull at a target and causes a temporary change in neural activity, mainly through mechanical effects on the tissue ([Blackmore et al., 2019](https://doi.org/10.1016/j.ultrasmedbio.2018.12.015)). Its draw is that it can be focused to a few millimetres and can reach deep structures, which TMS and tES cannot. The skull distorts and absorbs ultrasound, so where the energy actually lands has to be estimated with acoustic simulations.

This is different from high-intensity focused ultrasound, which heats tissue in order to destroy it (ablation). That is a medical procedure and is outside the scope of the TUS safety consensus below.

## What the safety guidelines say

### TMS: Rossi et al. (2009, 2021)

The International Federation of Clinical Neurophysiology (IFCN) consensus guidelines are the main reference for TMS safety ([Rossi et al., 2009](https://doi.org/10.1016/j.clinph.2009.08.016); update [Rossi et al., 2021](https://doi.org/10.1016/j.clinph.2020.10.003)). Key points:

- **Seizures are the most serious acute risk.** They have been extremely rare. Most reported cases involved rTMS beyond the guideline limits, often in patients taking drugs that lower the seizure threshold. The 2021 update concludes that the risk is low, even in patients taking drugs that act on the nervous system, when traditional parameters and focal coils are used.
- **Recommended limits** on stimulation intensity, frequency and train duration, and monitoring of participants, especially when testing new protocols.
- **Screening** before every session, using a standard questionnaire about epilepsy, metal or implants in the head, medications and other risk factors.
- **Minor side effects** such as headache, neck pain and discomfort at the stimulation site. The coil makes a loud click, so hearing protection is recommended.
- **Training requirements** for operators (added in 2021).

### tDCS and tACS: Bikson et al. (2016), Antal et al. (2017)

[Bikson et al. (2016)](https://doi.org/10.1016/j.brs.2016.06.004) reviewed the evidence for tDCS. Conventional protocols in human trials (up to 40 minutes, up to 4 mA, up to 7.2 coulombs) had produced no reports of a serious adverse effect or irreversible injury across more than 33,200 sessions and 1,000 subjects with repeated sessions. The authors define "safe" narrowly: as the absence of evidence of serious harm under those conditions.

The IFCN guidelines on low-intensity transcranial electrical stimulation ([Antal et al., 2017](https://doi.org/10.1016/j.clinph.2017.06.001)) reached similar conclusions for tDCS, tACS and related methods, with no serious adverse events in over 18,000 sessions. They also note:

- **Skin burns** can happen with tDCS when the contact between electrode and skin is poor.
- **Mild effects** such as prickling or burning sensations during stimulation, and headache or fatigue afterwards, are common. People receiving sham (placebo) stimulation report many of them too.
- In a small number of patients with depression, **mania or hypomania** occurred during treatment, though a causal link is hard to prove.

These conclusions apply to the protocols that were studied, under research or clinical supervision. They do not cover untested parameters or unsupervised use.

### Ultrasound: the ITRUSST consensus (2025)

The International Transducer-Based Ultrasound Neuromodulation Safety Team ([ITRUSST](https://itrusst.org/)) published a consensus on biophysical safety for low-intensity TUS ([Aubry et al., 2025](https://doi.org/10.1016/j.brs.2025.10.007); [preprint](https://arxiv.org/abs/2311.05359)). It sets levels below which the mechanical and thermal risks are considered non-significant, for example a mechanical index of at most 1.9 and a peak temperature rise of at most 2 °C. The authors stress that these levels are not safety limits in themselves, that more data are needed, and that the consensus informs but does not replace regulations or official standards. Meeting these levels also depends on accurate modelling of the ultrasound through each person's skull.

## Why do-it-yourself stimulation is discouraged

tDCS devices can be built from cheap parts, and online communities share designs and electrode montages ([Wexler, 2016](https://doi.org/10.1136/medethics-2015-102704)). In 2016, a group of neurologists and tDCS researchers wrote an open letter to DIY users to explain what the research shows ([Wurzman et al., 2016](https://doi.org/10.1002/ana.24689)):

- Stimulation affects more of the brain than the area under the electrode.
- What you are doing during stimulation changes its effects.
- Improving one ability can come at the cost of another.
- Effects can last longer than intended, and the risks of repeated long-term use have not been studied.
- Small changes in current, duration or electrode position can change or even reverse the effect. More is not necessarily better.
- People respond very differently, depending on age, sex, medication, health and head anatomy.

Add to this the risks the guidelines above manage through supervision: skin burns from poor electrodes, faulty hardware, and no screening for conditions such as epilepsy. Research stimulation is done with tested equipment, screening, trained staff and ethics review for these reasons. The NeuroTechX [Safety and Ethics](/safety-and-ethics) page gives the same advice: stimulation should stay within supervised clinical or research protocols.

## Ethics

Stimulation raises questions beyond physical safety:

- **Informed consent.** Participants need to understand what is known and what is not, including that the long-term effects of repeated use have not been studied.
- **Enhancement.** Using stimulation to improve normal abilities shifts the balance of risk: a healthy person has more to lose than a patient for whom other treatments have failed ([Wurzman et al., 2016](https://doi.org/10.1002/ana.24689)). The 2021 TMS guidelines include a note on the ethics of neuroenhancement.
- **Vulnerable groups.** Safety reviews give special consideration to children, older adults and people with mood disorders, epilepsy, stroke or implants ([Bikson et al., 2016](https://doi.org/10.1016/j.brs.2016.06.004)). They also need extra care in study design and consent.
- **Mental integrity and privacy.** Ethicists have argued for rights that protect people from unwanted changes to their mental states and from misuse of their neural data ([Ienca & Andorno, 2017](https://doi.org/10.1186/s40504-017-0050-1)). The [OECD Recommendation on Responsible Innovation in Neurotechnology](https://legalinstruments.oecd.org/en/instruments/OECD-LEGAL-0457) (2019) sets out principles for governments and companies.

For more on these topics, and on safe practice with recording devices, see the [Safety and Ethics](/safety-and-ethics) page.
