---
title: "Sensory and Motor Systems"
description: "How signals from the eyes, ears and skin reach the cortex, how the brain sends movement commands to the muscles, and why these pathways are the basis of the most common brain-computer interfaces."
module: neuro
sourceUrl: ""
---
Most brain-computer interfaces (BCIs) read activity from one of two places: the parts of the cortex that receive sensory input, or the parts that plan and send movement commands. This lesson follows those pathways from the body to the cortex and back, then shows which BCI signals come from each one.

For a fuller textbook treatment, chapter 14 of the free OpenStax *Anatomy and Physiology 2e* covers [sensory perception](https://openstax.org/books/anatomy-and-physiology-2e/pages/14-1-sensory-perception), [central processing](https://openstax.org/books/anatomy-and-physiology-2e/pages/14-2-central-processing) and [motor responses](https://openstax.org/books/anatomy-and-physiology-2e/pages/14-3-motor-responses). Purves et al., *[Neuroscience](https://www.ncbi.nlm.nih.gov/books/NBK10799/)* (2nd edition), is also free to read on the NCBI Bookshelf.

## A common plan

The main sensory systems share a basic layout:

1. A **receptor** turns a physical stimulus (light, sound pressure, touch) into electrical signals.
2. Sensory neurons carry the signal into the brainstem or spinal cord.
3. Most pathways pass through a relay nucleus in the **thalamus**. Smell is the main exception.
4. The thalamus sends the signal to a **primary sensory area** of the cortex. Nearby association areas then combine it with other information.

Two more rules are useful. Many pathways **cross the midline**, so the left side of the body or of visual space is handled mostly by the right hemisphere. And primary areas are **maps**: neighbouring points on the retina, along the cochlea or on the skin are handled by neighbouring patches of cortex.

## Vision

Light is detected by rods and cones in the retina. Retinal ganglion cells send their axons out through the optic nerve. At the **optic chiasm**, fibres from the nasal half of each retina cross to the other side. As a result, everything in the left half of visual space ends up in the right hemisphere, and the reverse.

Most fibres then reach the **lateral geniculate nucleus** of the thalamus, which projects to the **primary visual cortex (V1)** in the occipital lobe, at the back of the head. V1 is retinotopic: it holds a map of visual space, with the centre of gaze taking up a large share. From V1, visual information flows forward into many higher visual areas.

## Hearing

Sound vibrates the eardrum and the small bones of the middle ear, which move fluid in the **cochlea**. Hair cells along the cochlea respond to different frequencies: high pitches near its base, low pitches near its tip. The auditory nerve carries these signals to the brainstem, where several relay nuclei process timing and loudness differences between the two ears. That is how we locate sounds.

The pathway then reaches the **medial geniculate nucleus** of the thalamus and the **primary auditory cortex** on the upper surface of the temporal lobe. Auditory cortex is tonotopic: frequency is mapped along its surface. Unlike vision and touch, each ear sends information to both hemispheres.

## Touch and body sense (somatosensation)

Receptors in the skin, muscles and joints signal touch, vibration, pressure, temperature, pain and limb position (proprioception). Their axons enter the spinal cord and travel up in two main routes:

- The **dorsal column pathway** carries fine touch, vibration and proprioception. It crosses the midline in the lower brainstem (medulla).
- The **spinothalamic pathway** carries pain and temperature. It crosses in the spinal cord, close to where it enters.

Both reach the thalamus and then the **primary somatosensory cortex (S1)** in the postcentral gyrus, just behind the central sulcus.

## Movement

### Motor cortex and the corticospinal tract

The **primary motor cortex (M1)** lies in the precentral gyrus, just in front of the central sulcus and next to S1. In front of it, the **premotor cortex** and the **supplementary motor area** help plan and sequence movements.

Neurons in motor cortex send long axons down through the brainstem as the **corticospinal tract**. At the bottom of the medulla, most of these fibres cross to the other side (the pyramidal decussation). They then run down the spinal cord and connect, directly or through interneurons, to motor neurons in the spinal cord, whose axons leave the cord and make muscles contract. Because of the crossing, the left motor cortex mainly controls the right side of the body.

### Basal ganglia

The **basal ganglia** are a group of nuclei deep in the brain, including the caudate, putamen, globus pallidus, subthalamic nucleus and substantia nigra. They form loops with the cortex through the thalamus. A common summary is that these loops help select which movement to start and suppress competing ones. Loss of dopamine-producing neurons in the substantia nigra causes the slowed, hard-to-start movements of Parkinson's disease.

### Cerebellum

The **cerebellum**, at the back of the brain under the occipital lobe, compares the movement that was planned with sensory feedback about the movement that happened. It uses that comparison to fine-tune timing and coordination and to learn new motor skills. Damage to it causes clumsy, poorly timed movements rather than weakness. Each half of the cerebellum is linked to the same side of the body.

## Somatotopy: maps of the body

In S1 and M1, the body is laid out in order along the central sulcus: the leg and foot near the midline at the top of the head, then the trunk, arm and hand, with the face lower down on the side of the hemisphere. Penfield and Boldrey drew this map in 1937 from electrical stimulation of the cortex during brain surgery ([Penfield & Boldrey, 1937](https://doi.org/10.1093/brain/60.4.389)). The famous "homunculus" drawing shows that the hands, lips and tongue take up far more cortex than the back or legs, because they have finer control and denser receptors.

The map is a simplification. Recent imaging work suggests that motor cortex alternates between regions for specific body parts and regions involved in whole-body action planning ([Gordon et al., 2023](https://doi.org/10.1038/s41586-023-05964-2)).

## Why this matters for BCI

Each of the classic non-invasive BCI paradigms uses one of the systems above.

**Motor imagery (sensorimotor cortex).** When a person moves, or only imagines moving, a hand, the mu (about 8 to 13 Hz) and beta (about 13 to 30 Hz) rhythms over the opposite sensorimotor cortex get weaker. This is called event-related desynchronization ([Pfurtscheller & Lopes da Silva, 1999](https://doi.org/10.1016/S1388-2457(99)00141-8)). Somatotopy explains the electrode choices: left-hand imagery shows up mainly at C4 (right hemisphere), right-hand imagery at C3, and foot imagery near Cz on the midline ([Pfurtscheller & Neuper, 2001](https://doi.org/10.1109/5.939829)).

**SSVEP (visual cortex).** A light that flickers at a steady rate drives a response in visual cortex at that frequency and its harmonics. This is the steady-state visual evoked potential, strongest over the back of the head ([Norcia et al., 2015](https://doi.org/10.1167/15.6.4)). A BCI can show several targets flickering at different rates and detect which one the user is looking at.

**Auditory ERPs (auditory cortex).** Rare or deviant sounds in a stream produce event-related potentials such as the mismatch negativity and the P300 ([Näätänen et al., 2007](https://doi.org/10.1016/j.clinph.2007.04.026)). Auditory BCIs use this, for example by asking users to attend to sounds coming from one direction ([Schreuder et al., 2010](https://doi.org/10.1371/journal.pone.0009813)). They do not need vision or eye movements. The visual P300 speller works on the same principle with flashing letters ([Farwell & Donchin, 1988](https://doi.org/10.1016/0013-4694(88)90149-6)).

**Implanted BCIs.** Intracortical arrays placed in the hand area of M1 have let people with paralysis move a cursor ([Hochberg et al., 2006](https://doi.org/10.1038/nature04970)) and write text by imagining handwriting ([Willett et al., 2021](https://doi.org/10.1038/s41586-021-03506-2)). Going the other way, small currents delivered to S1 can produce touch sensations felt in the hand ([Flesher et al., 2016](https://doi.org/10.1126/scitranslmed.aaf8083)).

To see these rhythms in data, continue with the [Neural Oscillations](/learn/neural-oscillations) and [Event-Related Potentials](/learn/event-related-potentials) lessons.
