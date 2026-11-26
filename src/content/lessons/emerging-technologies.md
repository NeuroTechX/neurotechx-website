---
title: "Emerging Technologies"
description: "This module covers some of the cutting-edge technologies being developed in neurotechnology! New methodologies for recording from the brain, recording to the brain, and closed-loop systems are covered, as well as consumer-facing devices and public perception."
module: bci
sourceUrl: "https://learn.neurotechedu.com/emerging_tech/"
---
*Updated November 2026: added a section on what has changed since 2018 (implanted BCI trials, speech decoding, focused ultrasound, adaptive stimulation and in-ear EEG), corrected outdated company and product details, and fixed dead links.*

-   Introduction
-   Reading (Recording)
-   Writing (Modulating)
-   Read/Write (Closed Loop Systems)
-   What Has Changed Since 2018
-   Applications/Public Perception
-   References


### Introduction

![Recording techniques](https://web.archive.org/web/20150621221047im_/http://www.the-scientist.com/Nov2014/Neuroprosthetics_Finalcmyk.jpg)

Neurotechnology is a broad term, encompassing any tool-based method of interacting with the brain. Driven by rapid technical development and neuroscientific research, it has exploded as a field in recent decades, inviting collaboration between biology, physics, computer science, materials science, and many engineering disciplines.

At its core, neurotechnology is working toward two types of interactions: “reading” information *from* the brain and “writing” information *to* the brain. [(1)](#references) “Reading” can be done by noninvasive imaging methods such as MRI, or invasive methods like directly recording signals from neurons with implanted electrodes. “Writing” refers to activating neurons in specific ways, and can be done with a number of modalities, like electricity, sound, and light. Many exciting developing efforts aim to build “Read/Write” devices that “close the loop” between these two activities, allowing for more complex and capable self-regulating systems.

This module is meant to introduce some of the latest developments and improvements on these methods from a technical side, as well as addressing how they are being applied outside of the research lab. Most of it was written in 2018. The section "What Has Changed Since 2018" covers newer work.

### Reading

![Neural recording](https://www.researchgate.net/profile/Elliot_Ludvig/publication/269517554/figure/fig4/AS:295080465321988@1447364073922/Single-unit-recording-A-Schematic-showing-the-placement-of-the-tip-of-an-electrode.png)

Observing the brain is one of the oldest methods used to understand its function. By looking at neural patterns of activity and correlating them with organism behavior or capabilities, we have already been able to make great progress in our understanding.

While there are many tools already used to observe the brain [(2)](#references), new innovations in this area are focused on overcoming the current limitations of those devices, while also building out downstream applications for the data. (Some basic considerations include invasive vs. non-invasive usage and higher temporal vs. spatial imaging resolution.)

One challenge is getting high quality data from specific brain areas in a non-invasive and more accessible way. In 2018, Openwater, led by Mary Lou Jepsen, described its goal as a wearable, light-based alternative to MRI. [(3)](#references) That device was not released. Openwater now builds open-source hardware: a wearable, steerable low-intensity focused ultrasound device (Open-LIFU) for research, and a near-infrared light system (Open-Motion) that measures blood flow under the skin. [(19)](#references)

Even when invasive methods are used to get direct neural recordings, the data quality problems aren’t completely solved, as there are hardware difficulties to contend with! The stiff nature of metal recording electrodes triggers an inflammatory response and scar tissue production, which causes signal quality to degrade over time and shortening the time between surgeries to replace electrodes. It is also difficult to get signal out of the brain through the skull without leaving a permanently open surgical site. To address these, many groups are building new electrodes to be flexible and highly biocompatible to integrate with brain tissue, smaller to minimize scarring, and wireless to transmit data to external devices. [(4, 5, 6)](#references)

“Neural dust” is a project from the Carmena and Maharbiz labs at UC Berkeley building a network of low-power, distributed recording devices that could be chronically implanted into the brain and work together to wirelessly transmit neural data from a relatively broad area. [(7)](#references) The small footprint of each device would allow it to move with its surrounding tissue instead of remaining stationary, and each unit would be powered by and communicated with via ultrasound, allowing them to operate without external power cables.

![Injectable mesh electronics](https://i0.wp.com/news.harvard.edu/wp-content/uploads/2015/06/lieber_pressfigure2_605.jpg?zoom=2&resize=808%2C539&ssl=1)

Another method to create chronic implants takes the route of highly flexible electronics, using injectable electrode arrays that unfold into a mesh on the surface of the brain. [(8, 9)](#references) This approach would allow neural implants with only very minimally invasive surgery. These arrays too would be able to move with the brain while reducing tissue damage and inflammation.

### Writing

“Writing” to the brain, i.e. stimulating neurons in purposeful ways, opens up new possibilities for interaction. It can be used to help understand brain function by looking for changes resulting from the stimulation, but it is also increasingly used therapeutically to treat chronic pain, movement disorders, and some psychiatric disorders.

Innovations in this arena have been focused mainly on specificity of simulation and discovery of new stimulation modalities.

![Noninvasive deep brain stimulation](https://web.archive.org/web/20181101001641/http://blogs.discovermagazine.com/neuroskeptic/files/2017/06/grossman_cell.png)

Unlike observational neural recordings, neural stimulation has classically been limited to invasive methods only, generally by applying direct electrical stimulation to a neuron. New modalities have recently been investigated, with an incentive to reduce the number of risky brain surgeries required to implant current stimulator devices. One such option is to deliver electrical stimulation to deep brain areas noninvasively, recently demonstrated by the Boyden lab at MIT. By stimulating with two high-frequency electrical currents, they were able to produce a targeted “beat frequency” at the points where the currents interfered with each other. [(10)](#references) This method was able to successfully reach areas deep in the brain, previously only accessible by highly invasive deep brain stimulation (DBS) probes. The 2017 work was done in mice. In 2023, a team including the same researchers reported that this method, called temporal interference, changed activity in the human hippocampus and improved performance on a memory task in healthy volunteers. [(20)](#references)

### Read/Write

Taking any of “Reading” and “Writing” methods alone represents an “open-loop” system. This means that in each case, the information is only flowing one way, so there is no feedback available to improve the system or change its behavior.

This can be a problem for neural stimulation in particular if there is no immediate data about how the stimulator is affecting its targets. So far, in cases like spinal implants for chronic pain, this has been addressed by relatively frequent doctor visits and parameter tuning of the device, but this latency between turning the stimulation on and having someone evaluate the results could be months.

With more mature methods of recording and stimulation, there have been many successful projects to close the data loop and combine both technologies into more intelligent and adaptable systems. [(11)](#references)

A first application is an improved version of the chronic spinal cord stimulator mentioned above. Rather than running without feedback, if a device knows the stimulation patterns it is using and takes those into account while recording, it can isolate what effects the stimulation is having on the surrounding neurons. These systems can adapt on the fly by adjusting the dosage of stimulation to have the best therapeutic effects. [(12, 13)](#references)

Similarly, other systems listen to cortical activity for signs of epileptic seizure activity. When early signs of a seizure are detected, the device can immediately intervene by delivering stimulation meant to halt the spread of abnormal neural firing and stop the seizure. [(14, 15)](#references) One such device, the NeuroPace RNS System, has been FDA approved for adults with hard-to-treat focal epilepsy since 2013. [(15)](#references) Systems like this, designed for immediate intervention, may be built for motor disorders or other patterns of neural activity as well. In 2025, the FDA approved Medtronic's adaptive deep brain stimulation for Parkinson's disease. It adjusts stimulation based on brain signals recorded by the implant. [(21)](#references)

![Regaining locomotion](https://www.nature.com/polopoly_fs/7.40458.1478773480!/image/monkey-graphic-online_NATURE.jpg_gen/derivatives/landscape_630/monkey-graphic-online_NATURE.jpg)

Separating the targets of recording and stimulation to different areas of the nervous system can also have compelling and restorative applications. Several groups have combined recording from motor areas in the brain with neural stimulation in lower limbs to regain the ability to walk in animals with spinal cord injury. [(16, 17)](#references) By listening for characteristic patterns of activity signaling leg movements and using those as triggers for the lower-limb stimulation, the spinal cord damage was bypassed and the animals were able to walk using their own voluntary mental activity. This type of device has a promising future in overcoming paralysis and spinal cord damage. [(18)](#references) In 2023, the same research group reported a "brain-spine interface" that let a man with chronic paralysis from a spinal cord injury stand and walk. [(22)](#references) Separately, in December 2024 the FDA authorized ONWARD Medical's ARC-EX, a noninvasive spinal cord stimulator for people with incomplete cervical spinal cord injury. It stimulates through the skin and does not read brain signals. [(23)](#references)

* * *

## What Has Changed Since 2018

This section gives a short, dated summary of developments since the original module was written. Most of the devices below are investigational. That means they are being tested in clinical studies and are not approved for general use.

### Implanted BCIs in human trials

The Utah array, made by Blackrock Neurotech, has been the main electrode used in academic human BCI studies such as BrainGate. Between 2004 and 2021, 14 adults received BrainGate implants. A 2023 review of their records found no device-related deaths, brain infections or permanent increases in disability. [(24)](#references)

Since 2019, several companies have started their own human studies:

-   **Neuralink** implanted its first participant in early 2024 as part of its PRIME study. [(25, 26)](#references) In November 2026, Neuralink announced FDA approval to start a pivotal study in people with paralysis from ALS. The company said that more than 30 people had received its implant in early studies by then. [(27)](#references)
-   **Synchron** places its Stentrode electrode in a blood vessel next to the motor cortex, so it does not need open brain surgery. A 4-patient study in Australia reported no serious device-related adverse events after 12 months. [(28)](#references) In 2024, Synchron reported that its 6-patient US COMMAND study met its primary safety goal. [(29)](#references)
-   **Paradromics** received FDA approval in November 2025 for Connect-One, an early study of its Connexus implant for restoring speech. [(30)](#references)
-   **Precision Neuroscience** makes a thin electrode film that sits on the surface of the brain. In 2025, the FDA cleared it for temporary use of less than 30 days, for example during brain surgery. [(31)](#references)

### Decoding speech

Speech has become a major focus. In 2023, a Stanford team using Utah arrays decoded attempted speech from a person with ALS into text. [(32)](#references) In 2024, a UC Davis team reported 97.5% word accuracy over 8 months for a man with ALS, using a large vocabulary. [(33)](#references) These results come from single participants or small groups, and the systems still need trained staff to run them.

### Focused ultrasound

Ultrasound can be focused through the skull onto a small target deep in the brain. At high intensity it heats and destroys a small spot of tissue. In 2016, the FDA approved Insightec's Exablate Neuro, which uses MRI-guided focused ultrasound to treat essential tremor without cutting the skin. [(34, 35)](#references) At low intensity, focused ultrasound is being studied as a way to change brain activity without destroying tissue. That use is still experimental. [(19)](#references)

### Wearable and in-ear EEG

EEG sensors are moving into earbuds and headphones. In January 2026, Naox Technologies received FDA 510(k) clearance for Naox Link, an in-ear EEG device for clinical monitoring. [(36)](#references) Several consumer headbands are also still sold. See the [headsets list](/learn/eeg-headsets) for current models.

* * *

## Applications and Public Perception

This section focuses on the changes within consumer brainwave (EEG) technologies in use cases and public perception, as well as outlooks and challenges to adoption as this technology continues to develop. It was written in 2018. Product notes were checked in November 2026.

### Healthcare Applications

Healthcare is, according to this 2018 market [research report](https://www.grandviewresearch.com/industry-analysis/brain-computer-interfaces-market), the fastest growing opportunity for commercial EEG headbands and products. A global increase in chronic conditions and diseases along with associated demands on treatment facilities are creating a heavy cost burden for the current healthcare system. A recent [PWC report suggests](https://www.pwc.com/gx/en/industries/healthcare/emerging-trends-pwc-healthcare/chronic-diseases.html) that the prevalence of these conditions and diseases is expected to increase rapidly in the coming years. That same report also states that emerging technologies will help alleviate these demands by providing a more patient-centric approach to health care solutions. There is the strong potential for commercial EEG products to fill this need by providing continuous in-home monitoring for patients with these conditions.

In 2015, a Las Vegas hospital held a [6-month long study](https://web.archive.org/web/20190821073839/https://internetofbusiness.com/las-vegas-hospital-trials-iot-headband-to-ease-patient-discomfort/) on how brainwave headbands could help patients with pain relief. The researchers stated that this technology could “open the door to the future of connected care” and help build a more personalized patient-centric approach to health treatments. The study projected that the technology would help to lower costs while improving access to care. Other institutions such as the Ontario Brain Institute with its [ONtrepreneurs program](http://braininstitute.ca/2017-entrepreneurs), are also exploring ways to include commercial EEG headbands into research and practice.

The global increase in chronic conditions and diseases, the [dangerous impact](http://ontario.cmha.ca/documents/the-relationship-between-mental-health-mental-illness-and-chronic-physical-conditions/) those have on mental illness and overall health, and an overloaded health care system are increasing the need for affordable health management tools. The possible applications of EEG and commercial alternatives, which are already being demonstrated in healthcare research, will also be applied to areas such as [mental health](https://spectrum.ieee.org/brain-controlled-game-helps-kids-with-adhd-improve-mental-focus) and [education](https://www.edweek.org/leadership/opinion-icerp-building-a-research-practice-partnership/2018/05) program innovations. As we take a more holistic approach to health with learning, diet, physical exercise, and meditation, commercial EEG will fulfill the unmet need for connected, affordable and personalized care options.

### Wellness Applications

While the product options for EEG headbands are still limited, companies are exploring new form-factors and uses for their technology. Wellness focused applications, especially for meditation and productivity, are becoming a common product focus. Here are just a few examples from 2018:

**Melomind** - Melomind describes itself as a “relaxation companion”, a product designed to increase productivity, efficiency, and focus in all aspects of your life. *As of November 2026, Melomind no longer appears to be sold. Its maker, myBrain Technologies, now lists medical EEG products.*

**Muse** - Muse is sold as a “personal meditation assistant”, with the product primarily used for mindfulness training. In 2018, Muse also worked with Smith on the Lowdown Focus sunglasses, meant to enhance focus and concentration for sport performance. *The sunglasses are no longer sold. Muse still sells headbands.*

**Mindset** - Mindset is a pair of headphones designed with built-in EEG sensors. The headphones detect when you are losing focus, and provides auditory feedback to help bring you back on track. *As of November 2026, Mindset's website is offline and the headphones no longer appear to be sold.*

**Focusband** - Focusband bills itself as the world’s first in-motion brain sensing headset, a brain training system that enhances focus and performance. *As of November 2026, the Focusband website redirects to Neuphoria, a neurofeedback product sold mainly for golf.*

[This list](/learn/eeg-headsets) has more details on the types of headbands available

Wellness-focused applications have the ability to give tangible confirmations through visuals, dashboards, and numbers, on the impact of our lifestyle behaviour. If showing real-time cognitive performance can encourage healthy habits, the applications could also be used - one day - to help a person avoid the habits which trigger chronic conditions and diseases.

Product Terminology

One challenge for larger adaptation of commercial EEG products is how we talk about the technology. Companies creating commercial EEG products have a difficult task of finding balance between factual and emotional appeals, and determining what the right balance is for their platforms. You can see by the visuals below that the ways companies describe their products, and what the benefits are, changed drastically between about 2013 and 2018.

*The Muse ‘Calm’ app in 2014*

![Muse 2014](https://lh3.googleusercontent.com/-lUskPA2awJ8/VAu4-uplDXI/AAAAAAABh8s/8J4i0mIO7hA/s800/Screenshot_2014-09-06-23-30-29.png)

You can also read up on the evolution of the package design for Muse, created by Tera Rego.

Descriptions of the outcome of product use, not the science behind the product, are more common now. Words like focus, calm, insight, balance, productivity, relaxation, and ways to quiet the mind.

*Emotiv in 2017*

![emotiv-2017](/learn/images/emerging_tech/emotiv.png)

These all play to wider audience not familiar with the technology. These are examples of outcomes we might also strive for in our everyday and want to have. Integrating these desires into objects we’re familiar with could help increase awareness of the technology and benefits.

*Melomind in 2017*

![melomind-2017](/learn/images/emerging_tech/melomind.png)

For example, a headband is known as a comfortable clothing piece, worn for both fashion and exercise. Product labels such as ‘brain-sensing headband’ become relatable and refer to objects that already have a place in our lives, even while EEG and neurotechnology might not yet. They can become products that fulfill a desire like ‘being focused’ and living a healthier life, while also being scientifically validated. Our choices in objects, things such as a pair of sunglasses or headphones can represent part of a personal story in a tangible way. The technology may be able to achieve broader appeal when commercial EEG products can show how they fit into that story, and become ubiquitous.

*Mindset in 2018*

![mindset-2018](/learn/images/emerging_tech/mindset.png)

Brainsensing headphones (like [Mindset](https://web.archive.org/web/20190205231906/https://www.thinkmindset.com/), archived page) or sunglasses (such as [Smith Lowdown Focus](https://web.archive.org/web/20190809160055/https://www.smithoptics.com/ca/lowdownfocus), archived page) help integrate a technology with familiar items we already wear and attach meaning and emotion to. Both products have since been discontinued, but EEG sensors are still being built into headphones and earbuds.

### Outlooks

There are many opinions about what the future of commercial EEG headbands can look like, and this section provides only one. It was written in 2018.

If you are interested in reading some insights about the commercial EEG landscape, [here is a great post](https://medium.com/neurotechx/eeg-bci-crowdfunding-landscape-cfdb0da08937) by our very own NeuroTechX founder Yannick Roy.

Or [this article](https://www.theverge.com/2016/1/12/10754436/commercial-eeg-headsets-video-games-mind-control-technology), written by Loren Grush for The Verge in 2016. It’s an honest but scathing review on the the capabilities of currently-available commercial EEG devices.

One thing that sticks out, from the endless opinions you can find, is the potential future use of these products for health care. As Grush wrote in the above article:

> “A likelier future than EEG-controlled cars are headbands that may aid people with disabilities. But for now, those technologies are still too young”

This ongoing research into the benefits of commercial EEG may give companies more ways to make science-backed claims about their products. The changes in terminology and increase in available product options may aide mainstream adoption and proliferation of the technology. Likewise, these changes will make it much easier for consumers to understand what the products actually do and why they should use them.

The diversification of EEG into wellness applications, along with the changes in language, could help humanize the technology and give the public more ways to relate to it. And with an already demonstrated global need for affordable and connected wellness tools, commercial EEG devices can give people a low-cost way of managing and making their health decisions autonomously. With the increase in awareness of the long-term benefits of a healthy lifestyle, an affordable and fashionable EEG device or headband which supports that, could become the linchpin of new and emerging commercial neurotech options.

* * *

## References

1.  *Disclaimer:* this terminology isn’t technically correct! It is only meant here to intuitively indicate the direction of data flow. More accurate terms would be “recording” and “modulating”. “Reading” and “writing” have been used to set up an analogy of the brain to a hard drive, which is an outdated comparison. That analogy would imply a number of incorrect things about brain function, including an overestimation of how precisely we can decode neural information or elicit specific effects. For those reasons, I am not promoting that analogy.
2.  [https://en.wikipedia.org/wiki/Neuroimaging](https://en.wikipedia.org/wiki/Neuroimaging)
3.  [https://www.openwater.cc/technology](https://web.archive.org/web/20191231085321/https://www.openwater.cc/technology) (archived page)
4.  Lu, Y., Lyu, H., Richardson, A. G., Lucas, T. H., & Kuzum, D. (2016). Flexible Neural Electrode Array Based-on Porous Graphene for Cortical Microstimulation and Sensing. Scientific Reports, 6(1). [https://www.nature.com/articles/srep33526](https://www.nature.com/articles/srep33526)
5.  Neely, R. M., Piech, D. K., Santacruz, S. R., Maharbiz, M. M., & Carmena, J. M. (2018). Recent advances in neural dust: towards a neural interface platform. Current Opinion in Neurobiology, 50, 64–71. [https://www.ncbi.nlm.nih.gov/pubmed/29331738](https://www.ncbi.nlm.nih.gov/pubmed/29331738)
6.  Schwarz, D. A., Lebedev, M. A., Hanson, T. L., Dimitrov, D. F., Lehew, G., Meloy, J., … Nicolelis, M. A. L. (2014). Chronic, wireless recordings of large-scale brain activity in freely moving rhesus monkeys. Nature Methods, 11(6), 670–676. [https://www.nature.com/articles/nmeth.2936](https://www.nature.com/articles/nmeth.2936)
7.  [http://news.berkeley.edu/2016/08/03/sprinkling-of-neural-dust-opens-door-to-electroceuticals/](http://news.berkeley.edu/2016/08/03/sprinkling-of-neural-dust-opens-door-to-electroceuticals/)
8.  Hong, G., Yang, X., Zhou, T., & Lieber, C. M. (2018). Mesh electronics: a new paradigm for tissue-like brain probes. Current Opinion in Neurobiology, 50, 33–41. [https://www.sciencedirect.com/science/article/pii/S0959438817301952](https://www.sciencedirect.com/science/article/pii/S0959438817301952)
9.  Zhou, T., Hong, G., Fu, T.-M., Yang, X., Schuhmann, T. G., Viveros, R. D., & Lieber, C. M. (2017). Syringe-injectable mesh electronics integrate seamlessly with minimal chronic immune response in the brain. Proceedings of the National Academy of Sciences, 114(23), 5894–5899. [http://www.pnas.org/content/114/23/5894](http://www.pnas.org/content/114/23/5894)
10.  [http://news.mit.edu/2017/noninvasive-method-deep-brain-stimulation-0601](http://news.mit.edu/2017/noninvasive-method-deep-brain-stimulation-0601)
11.  Cha, K.S., Yeo, D. & Kim, K.H. Biomed. Eng. Lett. (2016) 6: 113. [https://link.springer.com/article/10.1007/s13534-016-0231-5](https://link.springer.com/article/10.1007/s13534-016-0231-5)
12.  [https://neuronewsinternational.com/closed-loop-spinal-cord-stimulation-may-represent-new-paradigm-mitigate-tolerance/](https://neuronewsinternational.com/closed-loop-spinal-cord-stimulation-may-represent-new-paradigm-mitigate-tolerance/)
13.  Russo, M., Cousins, M. J., Brooker, C., Taylor, N., Boesel, T., Sullivan, R., … Parker, J. (2017). Effective Relief of Pain and Associated Symptoms With Closed-Loop Spinal Cord Stimulation System: Preliminary Results of the Avalon Study. Neuromodulation: Technology at the Neural Interface, 21(1), 38–47. [https://www.ncbi.nlm.nih.gov/pubmed/28922517](https://www.ncbi.nlm.nih.gov/pubmed/28922517)
14.  Pais-Vieira, M., Yadav, A. P., Moreira, D., Guggenmos, D., Santos, A., Lebedev, M., & Nicolelis, M. A. L. (2016). A Closed Loop Brain-machine Interface for Epilepsy Control Using Dorsal Column Electrical Stimulation. Scientific Reports, 6(1). [https://www.nature.com/articles/srep32814](https://www.nature.com/articles/srep32814)
15.  US FDA. Premarket approval P100026: NeuroPace RNS System (approved November 14, 2013). [https://www.accessdata.fda.gov/scripts/cdrh/cfdocs/cfpma/pma.cfm?id=P100026](https://www.accessdata.fda.gov/scripts/cdrh/cfdocs/cfpma/pma.cfm?id=P100026)
16.  Wenger, N., Moraud, E. M., Raspopovic, S., Bonizzato, M., DiGiovanna, J., Musienko, P., … Courtine, G. (2014). Closed-loop neuromodulation of spinal sensorimotor circuits controls refined locomotion after complete spinal cord injury. Science Translational Medicine, 6(255), 255ra133-255ra133. [http://stm.sciencemag.org/content/6/255/255ra133](http://stm.sciencemag.org/content/6/255/255ra133)
17.  Borton, D., Bonizzato, M., Beauparlant, J., DiGiovanna, J., Moraud, E. M., Wenger, N., … Courtine, G. (2014). Corticospinal neuroprostheses to restore locomotion after spinal cord injury. Neuroscience Research, 78, 21–29. [https://www.sciencedirect.com/science/article/pii/S0168010213002228](https://www.sciencedirect.com/science/article/pii/S0168010213002228)
18.  [https://www.sciencedaily.com/releases/2014/06/140625130137.htm](https://www.sciencedaily.com/releases/2014/06/140625130137.htm)
19.  Focused Ultrasound Foundation (2024). Company profile: Openwater. [https://www.fusfoundation.org/posts/company-profile-openwater/](https://www.fusfoundation.org/posts/company-profile-openwater/). See also [https://www.openwater.health/](https://www.openwater.health/)
20.  Violante, I. R., et al. (2023). Non-invasive temporal interference electrical stimulation of the human hippocampus. Nature Neuroscience, 26, 1994–2004. [https://www.nature.com/articles/s41593-023-01456-8](https://www.nature.com/articles/s41593-023-01456-8)
21.  Medtronic (February 24, 2025). Medtronic earns U.S. FDA approval for the world's first Adaptive deep brain stimulation system for people with Parkinson's. [https://news.medtronic.com/2025-02-24-Medtronic-earns-U-S-FDA-approval-for-the-worlds-first-Adaptive-deep-brain-stimulation-system-for-people-with-Parkinsons](https://news.medtronic.com/2025-02-24-Medtronic-earns-U-S-FDA-approval-for-the-worlds-first-Adaptive-deep-brain-stimulation-system-for-people-with-Parkinsons)
22.  Lorach, H., et al. (2023). Walking naturally after spinal cord injury using a brain–spine interface. Nature, 618, 126–133. [https://www.nature.com/articles/s41586-023-06094-5](https://www.nature.com/articles/s41586-023-06094-5)
23.  Christopher & Dana Reeve Foundation. A historic leap forward: FDA approves first SCI-specific therapy. [https://blog.christopherreeve.org/en/a-historic-leap-forward-fda-approves-first-sci-specific-therapy](https://blog.christopherreeve.org/en/a-historic-leap-forward-fda-approves-first-sci-specific-therapy)
24.  Rubin, D. B., et al. (2023). Interim Safety Profile From the Feasibility Study of the BrainGate Neural Interface System. Neurology, 100(11), e1177–e1192. [https://pmc.ncbi.nlm.nih.gov/articles/PMC10074470/](https://pmc.ncbi.nlm.nih.gov/articles/PMC10074470/)
25.  ClinicalTrials.gov. NCT06429735: Precise Robotically Implanted Brain-Computer Interface (PRIME) study. [https://clinicaltrials.gov/study/NCT06429735](https://clinicaltrials.gov/study/NCT06429735)
26.  Neuralink (May 8, 2024). PRIME Study Progress Update: User Experience. [https://neuralink.com/updates/prime-study-progress-update-user-experience/](https://neuralink.com/updates/prime-study-progress-update-user-experience/)
27.  Neuralink (November 25, 2026). Neuralink Receives FDA Approval to Launch LINK Pivotal Study. [https://neuralink.com/updates/neuralink-receives-fda-approval-to-launch-link-pivotal-study/](https://neuralink.com/updates/neuralink-receives-fda-approval-to-launch-link-pivotal-study/)
28.  Mitchell, P., et al. (2023). Assessment of Safety of a Fully Implanted Endovascular Brain-Computer Interface for Severe Paralysis in 4 Patients: The Stentrode With Thought-Controlled Digital Switch (SWITCH) Study. JAMA Neurology, 80(3), 270–278. [https://pmc.ncbi.nlm.nih.gov/articles/PMC9857731/](https://pmc.ncbi.nlm.nih.gov/articles/PMC9857731/)
29.  Synchron (September 30, 2024). Synchron Announces Positive Results from U.S. COMMAND Study of Endovascular Brain-Computer Interface. [https://www.biospace.com/news/synchron-announces-positive-results-from-u-s-command-study-of-endovascular-brain-computer-interface](https://www.biospace.com/news/synchron-announces-positive-results-from-u-s-command-study-of-endovascular-brain-computer-interface). Study record: [https://clinicaltrials.gov/study/NCT05035823](https://clinicaltrials.gov/study/NCT05035823)
30.  Paradromics (November 20, 2025). Paradromics Receives FDA Approval for the Connect-One Clinical Study with the Connexus Brain-Computer Interface. [https://paradromics.com/news/paradromics-receives-fda-approval-for-the-connect-one-clinical-study-with-the-connexus-brain-computer-interface/](https://paradromics.com/news/paradromics-receives-fda-approval-for-the-connect-one-clinical-study-with-the-connexus-brain-computer-interface/)
31.  US FDA. 510(k) K242618: Precision Neuroscience Layer 7 Cortical Interface. [https://www.accessdata.fda.gov/cdrh_docs/pdf24/K242618.pdf](https://www.accessdata.fda.gov/cdrh_docs/pdf24/K242618.pdf)
32.  Willett, F. R., et al. (2023). A high-performance speech neuroprosthesis. Nature, 620, 1031–1036. [https://www.nature.com/articles/s41586-023-06377-x](https://www.nature.com/articles/s41586-023-06377-x)
33.  Card, N. S., et al. (2024). An Accurate and Rapidly Calibrating Speech Neuroprosthesis. New England Journal of Medicine, 391, 609–618. [https://pmc.ncbi.nlm.nih.gov/articles/PMC11328962/](https://pmc.ncbi.nlm.nih.gov/articles/PMC11328962/)
34.  US FDA. Premarket approval P150038: Exablate Neuro (approved July 11, 2016). [https://www.accessdata.fda.gov/scripts/cdrh/cfdocs/cfpma/pma.cfm?id=P150038](https://www.accessdata.fda.gov/scripts/cdrh/cfdocs/cfpma/pma.cfm?id=P150038)
35.  Focused Ultrasound Foundation. FDA approves first MRI-guided focused ultrasound device to treat essential tremor. [https://www.fusfoundation.org/posts/fda-approves-first-mri-guided-focused-ultrasound-device-to-treat-essential-tremor/](https://www.fusfoundation.org/posts/fda-approves-first-mri-guided-focused-ultrasound-device-to-treat-essential-tremor/)
36.  Clinical Research News (January 12, 2026). New In-Ear EEG Platform Opens Door to Real-World Neurological Data Collection. [https://www.clinicalresearchnewsonline.com/news/2026/01/12/new-in-ear-eeg-platform-opens-door-to-real-world-neurological-data-collection](https://www.clinicalresearchnewsonline.com/news/2026/01/12/new-in-ear-eeg-platform-opens-door-to-real-world-neurological-data-collection)
