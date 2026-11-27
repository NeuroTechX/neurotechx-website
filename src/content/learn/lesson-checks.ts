import { bilingual } from '@/i18n/text';
import type { Locale } from '@/i18n/routes';
import type { Question } from './primer-checks';

// Self-check questions for the migrated lessons in src/content/lessons, keyed by lesson slug.
// Each question is written from the lesson text. `href` points at the heading of the lesson
// section that answers it (ids come from rehype-slug). A lesson without an entry shows no checks.

export const lessonCheckText = bilingual(
    {
        title: 'Autoévaluation',
        lead: 'Vérifiez ce que vous avez retenu. Chaque réponse est expliquée et renvoie à la section de la leçon (en anglais).',
    },
    {
        title: 'Self-check',
        lead: 'Check what you took away. Each answer is explained and links back to the section of the lesson.',
    },
);

type LessonCheck = Record<Locale, Question[]>;

export const lessonChecks: Record<string, LessonCheck> = {
    'intro-to-bci': bilingual<Question[]>(
        [
            {
                prompt: 'Selon la leçon, une ICM fonctionne en trois grandes étapes. Lesquelles, dans l’ordre ?',
                choices: [
                    'Stimuler le cerveau, mesurer la réponse, puis afficher une image.',
                    'Recueillir les signaux du cerveau, les interpréter, puis envoyer une commande à une machine.',
                    'Choisir un casque, entraîner un réseau de neurones, puis publier les données.',
                ],
                correct: 1,
                explanation: 'Une ICM recueille des signaux cérébraux, les interprète, puis envoie une commande à la machine branchée selon le signal reçu.',
                section: 'What is the definition', href: '#what-is-the-definition',
            },
            {
                prompt: 'L’ECoG est dite « semi-invasive ». Pourquoi les études d’ICM avec l’ECoG se limitent-elles surtout à des personnes épileptiques ?',
                choices: [
                    'Parce que les électrodes se posent sur le cuir chevelu sans préparation.',
                    'Parce que l’ECoG ne fonctionne que pendant une crise.',
                    'Parce que la pose exige une craniotomie, faite seulement quand une chirurgie est nécessaire pour une raison médicale.',
                ],
                correct: 2,
                explanation: 'Les électrodes sont posées à la surface du cerveau, ce qui exige une craniotomie. On le fait seulement quand une chirurgie est déjà nécessaire, par exemple pour retirer un foyer épileptique.',
                section: 'ECoG', href: '#ecog',
            },
            {
                prompt: 'Quelle est la configuration minimale d’électrodes décrite pour enregistrer l’EEG ?',
                choices: [
                    'Une électrode active, une électrode de référence et une électrode de masse.',
                    'Une seule électrode placée sur le front.',
                    'Au moins 32 électrodes réparties selon le système 10-20.',
                ],
                correct: 0,
                explanation: 'L’EEG mesure la différence de potentiel entre l’électrode active et la référence. La masse complète la configuration minimale à trois électrodes.',
                section: 'Signal acquisition', href: '#signal-acquisition',
            },
        ],
        [
            {
                prompt: 'The lesson says a BCI works in three main steps. Which ones, in order?',
                choices: [
                    'Stimulate the brain, measure the response, then display an image.',
                    'Collect brain signals, interpret them, then send a command to a machine.',
                    'Pick a headset, train a neural network, then publish the data.',
                ],
                correct: 1,
                explanation: 'A BCI collects brain signals, interprets them, and outputs a command to the connected machine based on the signal it received.',
                section: 'What is the definition', href: '#what-is-the-definition',
            },
            {
                prompt: 'ECoG is called "semi-invasive". Why are ECoG BCI studies mostly limited to people with epilepsy?',
                choices: [
                    'Because the electrodes go on the scalp with no preparation.',
                    'Because ECoG only works during a seizure.',
                    'Because placing the electrodes needs a craniotomy, which is only done when surgery is needed for medical reasons.',
                ],
                correct: 2,
                explanation: 'The electrodes sit on the surface of the brain, so a craniotomy is needed. That is only done when surgery is already required, for example to remove an epileptic focus.',
                section: 'ECoG', href: '#ecog',
            },
            {
                prompt: 'What is the minimal electrode configuration the lesson describes for recording EEG?',
                choices: [
                    'An active electrode, a reference electrode and a ground electrode.',
                    'A single electrode on the forehead.',
                    'At least 32 electrodes placed with the 10-20 system.',
                ],
                correct: 0,
                explanation: 'EEG measures the voltage difference between the active electrode and the reference. The ground completes the minimal three-electrode setup.',
                section: 'Signal acquisition', href: '#signal-acquisition',
            },
        ],
    ),
    'bci-applications': bilingual<Question[]>(
        [
            {
                prompt: 'Une méta-analyse de 2016 sur la neurorétroaction pour le TDAH trouve un effet quand les évaluateurs savaient quel traitement était donné, mais pas avec des évaluations probablement à l’aveugle. Que faut-il en conclure ?',
                choices: [
                    'La neurorétroaction guérit le TDAH.',
                    'Une partie de l’effet observé peut venir des attentes des évaluateurs. Il faut des essais à l’aveugle et contrôlés avant de conclure.',
                    'Les évaluations à l’aveugle sont moins fiables que les autres.',
                ],
                correct: 1,
                explanation: 'Les effets n’étaient pas significatifs avec des évaluations probablement à l’aveugle ni dans les essais avec un groupe témoin simulé ou actif. La leçon rappelle qu’une étude citée ne prouve pas qu’un traitement fonctionne.',
                section: 'ADHD', href: '#adhd',
            },
            {
                prompt: 'Que dit la leçon sur un appareil comme BrainScope pour les commotions cérébrales ?',
                choices: [
                    'Il pose seul le diagnostic de commotion.',
                    'Il remplace la tomodensitométrie de la tête.',
                    'Il aide les cliniciens à estimer la probabilité d’un saignement visible au scanner, sans remplacer celui-ci.',
                ],
                correct: 2,
                explanation: 'BrainScope ne diagnostique pas une commotion à lui seul. Le fabricant dit que l’appareil aide à estimer la probabilité d’un saignement qu’un scanner montrerait, et qu’il ne remplace pas ce scanner.',
                section: 'Concussion', href: '#concussion',
            },
        ],
        [
            {
                prompt: 'A 2016 meta-analysis of neurofeedback for ADHD found effects when raters knew which treatment was given, but not with probably blinded ratings. What should you conclude?',
                choices: [
                    'Neurofeedback cures ADHD.',
                    'Part of the effect may come from rater expectations. Blinded, controlled trials are needed before drawing conclusions.',
                    'Blinded ratings are less reliable than other ratings.',
                ],
                correct: 1,
                explanation: 'Effects were not significant with probably blinded ratings or in trials with sham or active controls. The lesson notes that a cited study does not mean a treatment is proven.',
                section: 'ADHD', href: '#adhd',
            },
            {
                prompt: 'What does the lesson say about a device like BrainScope for concussion?',
                choices: [
                    'It diagnoses concussion on its own.',
                    'It replaces a head CT scan.',
                    'It helps clinicians assess the likelihood of a bleed that would show on a CT scan, without replacing the scan.',
                ],
                correct: 2,
                explanation: 'BrainScope does not diagnose concussion on its own. The company says the device helps assess the likelihood of a brain bleed that a CT would show, and is not a substitute for a head CT.',
                section: 'Concussion', href: '#concussion',
            },
        ],
    ),
    'eeg-headsets': bilingual<Question[]>(
        [
            {
                prompt: 'Vous voulez étudier des ondes jusqu’à 40 Hz. D’après la règle de Nyquist et le conseil de la leçon, quelle fréquence d’échantillonnage minimale viser ?',
                choices: ['40 Hz.', 'Au moins 100 Hz, soit 2,5 fois 40 Hz.', '60 Hz, soit 1,5 fois 40 Hz.'],
                correct: 1,
                explanation: 'Il faut échantillonner à plus de deux fois la fréquence étudiée. En pratique, la leçon conseille au moins 2,5 fois, donc 100 Hz pour 40 Hz.',
                section: 'Sampling Rate', href: '#sampling-rate',
            },
            {
                prompt: 'Votre club veut un projet d’imagerie motrice. Pourquoi la leçon déconseille-t-elle la Muse pour ce projet ?',
                choices: [
                    'Ses électrodes sont fixes (TP9, AF7, AF8, TP10) et ne peuvent pas être placées au-dessus du cortex moteur.',
                    'Elle échantillonne trop lentement pour l’EEG.',
                    'Elle n’enregistre que le rythme cardiaque.',
                ],
                correct: 0,
                explanation: 'Beaucoup de casques grand public ont des électrodes rigides. Avec une carte OpenBCI, vous pouvez placer les électrodes où vous voulez, par exemple au-dessus du cortex moteur.',
                section: 'Number and Placement of Electrodes', href: '#number-and-placement-of-electrodes',
            },
            {
                prompt: 'Que vérifier avant d’acheter un casque, selon la section sur l’accès aux données ?',
                choices: [
                    'Que le casque a plus de bits que les autres, car plus de bits signifie toujours de meilleures données.',
                    'Que le prix est le plus bas possible.',
                    'Comment vous obtiendrez les données brutes : certains fabricants les donnent, d’autres les vendent avec une licence logicielle.',
                ],
                correct: 2,
                explanation: 'L’accès aux données brutes varie selon le fabricant. Des outils libres comme LSL et BrainFlow fonctionnent avec plusieurs appareils. La leçon précise aussi que plus de bits ne veut pas forcément dire de meilleures données.',
                section: 'Data Access and Software', href: '#data-access-and-software',
            },
        ],
        [
            {
                prompt: 'You want to study waves up to 40 Hz. Using the Nyquist rule and the lesson’s advice, what minimum sampling rate should you aim for?',
                choices: ['40 Hz.', 'At least 100 Hz, which is 2.5 times 40 Hz.', '60 Hz, which is 1.5 times 40 Hz.'],
                correct: 1,
                explanation: 'The sampling rate must be more than twice the frequency you study. In practice the lesson suggests at least 2.5 times, so 100 Hz for 40 Hz.',
                section: 'Sampling Rate', href: '#sampling-rate',
            },
            {
                prompt: 'Your club wants a motor imagery project. Why does the lesson advise against the Muse for it?',
                choices: [
                    'Its electrodes are fixed (TP9, AF7, AF8, TP10) and cannot be placed over the motor cortex.',
                    'It samples too slowly for EEG.',
                    'It only records heart rate.',
                ],
                correct: 0,
                explanation: 'Many consumer headsets have rigid electrodes. With an OpenBCI board you can place electrodes where you want, for example over the motor cortex.',
                section: 'Number and Placement of Electrodes', href: '#number-and-placement-of-electrodes',
            },
            {
                prompt: 'What should you check before buying a headset, according to the data access section?',
                choices: [
                    'That it has more ADC bits than the others, since more bits always means better data.',
                    'That it is the cheapest option.',
                    'How you will get the raw data out: some vendors give it freely, others sell it as a software license.',
                ],
                correct: 2,
                explanation: 'Raw data access varies by vendor. Free tools such as LSL and BrainFlow work with many devices. The lesson also notes that more bits does not necessarily mean better data.',
                section: 'Data Access and Software', href: '#data-access-and-software',
            },
        ],
    ),
    'bci-software': bilingual<Question[]>(
        [
            {
                prompt: 'Vous voulez recevoir l’EEG d’un casque et les marqueurs d’événements d’un autre programme, synchronisés dans le temps. Quel outil la leçon décrit-elle pour cela ?',
                choices: ['Psychtoolbox.', 'Lab Streaming Layer (LSL).', 'Braindecode.'],
                correct: 1,
                explanation: 'LSL transmet des séries temporelles, comme l’EEG et des marqueurs, sur un réseau local et garde les flux synchronisés.',
                section: 'Streaming and acquisition', href: '#streaming-and-acquisition',
            },
            {
                prompt: 'Votre club veut comparer des chaînes de décodage sur des jeux de données ICM publics, avec une évaluation standard. Quel projet NeuroTechX convient ?',
                choices: ['MOABB.', 'OpenEXP.', 'Pygame.'],
                correct: 0,
                explanation: 'MOABB donne une interface commune à des dizaines de jeux de données ICM publics et une façon standard d’évaluer les chaînes de décodage. OpenEXP est archivé depuis 2021.',
                section: 'Decoding and benchmarking', href: '#decoding-and-benchmarking',
            },
        ],
        [
            {
                prompt: 'You want EEG from a headset and event markers from another program, synchronized in time. Which tool does the lesson describe for this?',
                choices: ['Psychtoolbox.', 'Lab Streaming Layer (LSL).', 'Braindecode.'],
                correct: 1,
                explanation: 'LSL streams time series, such as EEG and markers, over a local network and keeps the streams time-synchronized.',
                section: 'Streaming and acquisition', href: '#streaming-and-acquisition',
            },
            {
                prompt: 'Your club wants to compare decoding pipelines on public BCI datasets with a standard evaluation. Which NeuroTechX project fits?',
                choices: ['MOABB.', 'OpenEXP.', 'Pygame.'],
                correct: 0,
                explanation: 'MOABB gives a common interface to dozens of public BCI datasets and a standard way to evaluate decoding pipelines. OpenEXP has been archived since 2021.',
                section: 'Decoding and benchmarking', href: '#decoding-and-benchmarking',
            },
        ],
    ),
    'eeg-experimental-protocol': bilingual<Question[]>(
        [
            {
                prompt: 'Pendant un test de potentiels évoqués, l’équipe remarque que les moments de stimulation n’ont pas été enregistrés. Que recommande la leçon ?',
                choices: [
                    'Continuer, car on pourra deviner les moments plus tard.',
                    'Recommencer le test si possible, car le moment de la stimulation est une information essentielle.',
                    'Augmenter le gain de l’amplificateur.',
                ],
                correct: 1,
                explanation: 'Le moment de la stimulation est essentiel. Le personnel doit vérifier qu’il est enregistré et, sinon, recommencer le test quand c’est possible.',
                section: 'Synchronization system', href: '#synchronization-system',
            },
            {
                prompt: 'Pourquoi la leçon recommande-t-elle une pièce autour de 20 °C ?',
                choices: [
                    'La sueur peut décoller les électrodes et les frissons peuvent les faire bouger, ce qui modifie le signal.',
                    'L’amplificateur surchauffe au-dessus de 20 °C.',
                    'Le cerveau produit plus d’ondes alpha au froid.',
                ],
                correct: 0,
                explanation: 'Une personne qui a trop chaud transpire et les électrodes adhèrent moins bien. Une personne qui a froid frissonne et les électrodes bougent. Les deux affectent le potentiel mesuré.',
                section: 'Practical measures', href: '#practical-measures',
            },
            {
                prompt: 'Quelle consigne donner aux participants avant leur venue ?',
                choices: [
                    'Mettre du gel coiffant pour tenir les cheveux.',
                    'Venir après une nuit blanche pour être détendus.',
                    'Venir les cheveux fraîchement lavés, sans produit capillaire.',
                ],
                correct: 2,
                explanation: 'La leçon demande des cheveux tout juste lavés, sans produit, et une personne en bonne condition physique et mentale.',
                section: 'Recruiting subjects', href: '#recruiting-subjects',
            },
        ],
        [
            {
                prompt: 'During an evoked potential test, the team notices that stimulus times were not recorded. What does the lesson recommend?',
                choices: [
                    'Keep going, since the times can be guessed later.',
                    'Restart the test when possible, because the time of stimulation is essential information.',
                    'Increase the amplifier gain.',
                ],
                correct: 1,
                explanation: 'When the stimulation occurs is essential. Staff should check it is being recorded and, if not, restart the test when possible.',
                section: 'Synchronization system', href: '#synchronization-system',
            },
            {
                prompt: 'Why does the lesson recommend a room temperature around 20 °C?',
                choices: [
                    'Sweat can stop electrodes adhering and shivering can move them, both of which change the signal.',
                    'The amplifier overheats above 20 °C.',
                    'The brain makes more alpha waves in the cold.',
                ],
                correct: 0,
                explanation: 'A participant who is too hot sweats and the electrodes adhere less well. One who is too cold shivers and the electrodes move. Both affect the measured potential.',
                section: 'Practical measures', href: '#practical-measures',
            },
            {
                prompt: 'What should participants be told before they come in?',
                choices: [
                    'Use hair gel to keep their hair in place.',
                    'Come after a sleepless night so they are relaxed.',
                    'Come with freshly washed hair and no hair products.',
                ],
                correct: 2,
                explanation: 'The lesson asks for just-washed hair with no hair products, and for participants to be in their best physical and mental condition.',
                section: 'Recruiting subjects', href: '#recruiting-subjects',
            },
        ],
    ),
    preprocessing: bilingual<Question[]>(
        [
            {
                prompt: 'Un spectre montre un pic étroit à 60 Hz dans un enregistrement fait en Amérique du Nord. Quel filtre retire cette fréquence précise ?',
                choices: ['Un filtre coupe-bande étroit (notch) à 60 Hz.', 'Un filtre passe-haut à 0,1 Hz.', 'Un rééchantillonnage à 50 Hz.'],
                correct: 0,
                explanation: 'Le bruit du réseau électrique apparaît à 50 ou 60 Hz selon le pays, avec ses multiples. Un filtre notch retire une seule fréquence.',
                section: '4. Filtering', href: '#4-filtering',
            },
            {
                prompt: 'Avec une Muse à 4 canaux, un canal est très bruité. Pourquoi la leçon dit-elle qu’on ne peut pas simplement le supprimer comme avec un casque haute densité ?',
                choices: [
                    'Parce que MNE refuse de supprimer des canaux.',
                    'Parce qu’avec si peu de canaux, chaque canal retiré fait perdre beaucoup d’information. Il vaut mieux réduire le bruit dès l’installation.',
                    'Parce que les électrodes sèches ne sont jamais bruitées.',
                ],
                correct: 1,
                explanation: 'Avec un système haute densité, les autres canaux compensent. Avec peu de canaux, rejeter un canal n’est pas réaliste, d’où l’importance de bien former la personne qui installe le matériel.',
                section: '8.1. Channel Removal', href: '#81-channel-removal',
            },
            {
                prompt: 'Vous voulez passer de 600 Hz à 100 Hz. Que fait la méthode resample de MNE, d’après la leçon ?',
                choices: [
                    'Elle garde un échantillon sur six sans autre traitement.',
                    'Elle supprime les canaux les plus lents.',
                    'Elle applique d’abord un filtre passe-bas, puis réduit le nombre d’échantillons (décimation).',
                ],
                correct: 2,
                explanation: 'Garder un échantillon sur N peut créer des artéfacts. La décimation applique d’abord un filtre passe-bas pour retirer les hautes fréquences qui les causent.',
                section: '5. Downsampling', href: '#5-downsampling',
            },
        ],
        [
            {
                prompt: 'A spectrum shows a narrow peak at 60 Hz in a recording made in North America. Which filter removes that one frequency?',
                choices: ['A notch filter at 60 Hz.', 'A 0.1 Hz high-pass filter.', 'Resampling to 50 Hz.'],
                correct: 0,
                explanation: 'Power line noise appears at 50 or 60 Hz depending on the country, plus multiples. A notch filter removes a single frequency.',
                section: '4. Filtering', href: '#4-filtering',
            },
            {
                prompt: 'On a 4-channel Muse, one channel is very noisy. Why does the lesson say you cannot just delete it as you would on a high-density cap?',
                choices: [
                    'Because MNE refuses to drop channels.',
                    'Because with so few channels, each one you drop loses a lot of information. It is better to reduce noise at setup.',
                    'Because dry electrodes are never noisy.',
                ],
                correct: 1,
                explanation: 'On a high-density system the other channels compensate. With few channels, rejecting one is not feasible, which is why training whoever sets up the hardware matters.',
                section: '8.1. Channel Removal', href: '#81-channel-removal',
            },
            {
                prompt: 'You want to go from 600 Hz to 100 Hz. What does MNE’s resample method do, according to the lesson?',
                choices: [
                    'It keeps every sixth sample with no other processing.',
                    'It drops the slowest channels.',
                    'It low-pass filters first, then reduces the number of samples (decimation).',
                ],
                correct: 2,
                explanation: 'Keeping every Nth sample alone can create artifacts. Decimation applies a low-pass filter first to remove the high frequencies that cause them.',
                section: '5. Downsampling', href: '#5-downsampling',
            },
        ],
    ),
    'neural-oscillations': bilingual<Question[]>(
        [
            {
                prompt: 'L’EEG est enregistré en fonction du temps, mais les oscillations se décrivent par leur fréquence. Quel outil fait le passage de l’un à l’autre ?',
                choices: ['Le moyennage des essais.', 'La transformée de Fourier.', 'Le rééchantillonnage.'],
                correct: 1,
                explanation: 'La transformée de Fourier décompose un signal temporel en fréquences. On l’applique sur des données prétraitées, puis on regarde les bandes qui nous intéressent.',
                section: 'How do we extract neural oscillations', href: '#how-do-we-extract-neural-oscillations-as-a-feature-of-our-eeg-data',
            },
            {
                prompt: 'Une personne serre la main droite. Que prévoit la leçon pour le rythme mu au-dessus du cortex moteur ?',
                choices: [
                    'Il augmente pendant le mouvement.',
                    'Il n’a aucun lien avec le mouvement.',
                    'Il est associé au repos et diminue (se désynchronise) pendant l’action motrice.',
                ],
                correct: 2,
                explanation: 'Le rythme mu (environ 7,2 à 12,5 Hz) est associé au repos physique et se désynchronise pendant une action motrice.',
                section: 'What are Neural Oscillations?', href: '#what-are-neural-oscillations',
            },
        ],
        [
            {
                prompt: 'EEG is recorded as a function of time, but oscillations are described by frequency. Which tool converts one into the other?',
                choices: ['Averaging trials.', 'The Fourier transform.', 'Resampling.'],
                correct: 1,
                explanation: 'The Fourier transform decomposes a time signal into frequencies. You apply it to preprocessed data, then look at the bands you care about.',
                section: 'How do we extract neural oscillations', href: '#how-do-we-extract-neural-oscillations-as-a-feature-of-our-eeg-data',
            },
            {
                prompt: 'A participant squeezes their right hand. What does the lesson predict for the mu rhythm over the motor cortex?',
                choices: [
                    'It increases during the movement.',
                    'It has no link to movement.',
                    'It is associated with rest and is suppressed (desynchronized) during the motor action.',
                ],
                correct: 2,
                explanation: 'The mu rhythm (about 7.2 to 12.5 Hz) is associated with physical rest and is desynchronized during a motor action.',
                section: 'What are Neural Oscillations?', href: '#what-are-neural-oscillations',
            },
        ],
    ),
    'event-related-potentials': bilingual<Question[]>(
        [
            {
                prompt: 'Dans un paradigme oddball, que se passe-t-il quand un stimulus rare apparaît parmi des stimuli fréquents ?',
                choices: [
                    'Le cerveau produit une grande onde P3 (P300), dont le pic arrive environ 300 à 600 ms après le stimulus.',
                    'Le signal EEG devient plat pendant une seconde.',
                    'Le rythme alpha double d’amplitude au moment exact du stimulus.',
                ],
                correct: 0,
                explanation: 'Le stimulus « intrus » produit une grande composante P3. Son pic arrive environ 300 à 600 ms après le stimulus. Le nom P300 date d’une époque où on croyait le pic toujours à 300 ms.',
                section: 'The P3 family of ERP’s', href: '#the-p3-family-of-erps',
            },
            {
                prompt: 'Dans l’épeleur de Farwell et Donchin (1988), comment l’ICM trouve-t-elle la lettre voulue ?',
                choices: [
                    'Elle suit le mouvement des yeux vers la lettre.',
                    'Les lignes et colonnes clignotent au hasard. Quand la lettre voulue s’allume, elle agit comme un stimulus « intrus » et produit une P3.',
                    'La personne imagine écrire la lettre avec la main.',
                ],
                correct: 1,
                explanation: 'La lettre sur laquelle la personne se concentre est l’intrus. Sa mise en évidence produit une P3, que l’ICM détecte pour choisir la lettre.',
                section: 'History of P3-based BCIs', href: '#history-of-p3-based-bcis',
            },
            {
                prompt: 'Selon la leçon, quelle caractéristique simple suffit souvent pour repérer un PE dans une époque ?',
                choices: [
                    'La fréquence d’échantillonnage du casque.',
                    'Le nombre de canaux rejetés.',
                    'La tension moyenne à chaque électrode pendant l’époque.',
                ],
                correct: 2,
                explanation: 'On découpe des époques synchronisées sur le stimulus, puis on calcule des statistiques. La tension moyenne à chaque électrode suffit souvent.',
                section: 'Which features to extract', href: '#which-features-to-extract',
            },
        ],
        [
            {
                prompt: 'In an oddball paradigm, what happens when a rare stimulus appears among frequent ones?',
                choices: [
                    'The brain produces a large P3 (P300) wave that peaks about 300 to 600 ms after the stimulus.',
                    'The EEG goes flat for one second.',
                    'Alpha doubles in amplitude at the exact moment of the stimulus.',
                ],
                correct: 0,
                explanation: 'The odd stimulus produces a large P3 component that peaks about 300 to 600 ms after it. The name P300 comes from a time when the peak was thought to always occur at 300 ms.',
                section: 'The P3 family of ERP’s', href: '#the-p3-family-of-erps',
            },
            {
                prompt: 'In the Farwell and Donchin speller (1988), how does the BCI find the intended letter?',
                choices: [
                    'It tracks eye movement toward the letter.',
                    'Rows and columns flash at random. When the intended letter lights up, it acts as an oddball stimulus and produces a P3.',
                    'The user imagines writing the letter by hand.',
                ],
                correct: 1,
                explanation: 'The letter the user focuses on is the oddball. Highlighting it produces a P3, which the BCI detects to pick the letter.',
                section: 'History of P3-based BCIs', href: '#history-of-p3-based-bcis',
            },
            {
                prompt: 'According to the lesson, which simple feature is often enough to identify an ERP in an epoch?',
                choices: [
                    'The headset’s sampling rate.',
                    'The number of rejected channels.',
                    'The mean voltage at each electrode during the epoch.',
                ],
                correct: 2,
                explanation: 'You cut epochs locked to the stimulus, then compute statistics. The mean voltage at each electrode is usually enough.',
                section: 'Which features to extract', href: '#which-features-to-extract',
            },
        ],
    ),
    'machine-learning-for-bci': bilingual<Question[]>(
        [
            {
                prompt: 'La leçon divise les données en trois ensembles. À quoi sert l’ensemble de test ?',
                choices: [
                    'À entraîner le modèle.',
                    'À régler le modèle pendant son développement.',
                    'À mesurer la performance finale sur des exemples que le modèle n’a jamais vus.',
                ],
                correct: 2,
                explanation: 'L’ensemble d’entraînement nourrit le modèle, l’ensemble de validation sert à le régler, et l’ensemble de test mesure la performance finale. Cette séparation aide le modèle à bien prédire de nouveaux exemples.',
                section: 'Supervised Learning', href: '#supervised-learning',
            },
            {
                prompt: 'Avant d’entraîner le réseau sur les données EEG de MNE, le tutoriel le teste sur des données artificielles faciles à classer. Pourquoi ?',
                choices: [
                    'Pour vérifier que le réseau fonctionne correctement avant de passer à un problème plus difficile.',
                    'Parce que les données EEG réelles ne sont pas disponibles.',
                    'Pour augmenter la taille de l’ensemble de test.',
                ],
                correct: 0,
                explanation: 'Si le réseau classe bien des données simples avec les mêmes dimensions, il a plus de chances de fonctionner sur les vraies données. Sinon, l’erreur est dans le réseau, pas dans l’EEG.',
                section: '(Step 3) Create Sample Data', href: '#step-3-create-sample-data',
            },
            {
                prompt: 'Quand une ligne ne peut pas séparer deux classes, que peut faire un SVM ?',
                choices: [
                    'Abandonner et choisir une classe au hasard.',
                    'Utiliser l’astuce du noyau (kernel trick), par exemple un noyau RBF, pour transformer les données.',
                    'Retirer les points mal classés de l’ensemble de test.',
                ],
                correct: 1,
                explanation: 'Le kernel trick applique une transformation mathématique qui permet de trouver un hyperplan séparateur. Le noyau le plus courant est la fonction de base radiale (RBF).',
                section: 'Support Vector Machine (SVM)', href: '#support-vector-machine-svm',
            },
        ],
        [
            {
                prompt: 'The lesson splits data into three sets. What is the test set for?',
                choices: [
                    'Training the model.',
                    'Tuning the model during development.',
                    'Measuring final performance on examples the model has never seen.',
                ],
                correct: 2,
                explanation: 'The training set is fed to the model, the validation set is used to tune it, and the test set measures final performance. Keeping them separate helps the model predict new examples well.',
                section: 'Supervised Learning', href: '#supervised-learning',
            },
            {
                prompt: 'Before training the network on the MNE EEG data, the tutorial tests it on easy artificial data. Why?',
                choices: [
                    'To check that the network works before moving to a harder problem.',
                    'Because the real EEG data is not available.',
                    'To make the test set larger.',
                ],
                correct: 0,
                explanation: 'If the network classifies simple data with the same dimensions correctly, it is more likely to work on the real data. If not, the problem is in the network, not the EEG.',
                section: '(Step 3) Create Sample Data', href: '#step-3-create-sample-data',
            },
            {
                prompt: 'When a line cannot separate two classes, what can an SVM do?',
                choices: [
                    'Give up and pick a class at random.',
                    'Use the kernel trick, for example an RBF kernel, to transform the data.',
                    'Remove misclassified points from the test set.',
                ],
                correct: 1,
                explanation: 'The kernel trick applies a mathematical transformation so a separating hyperplane can be found. The most common kernel is the radial basis function (RBF).',
                section: 'Support Vector Machine (SVM)', href: '#support-vector-machine-svm',
            },
        ],
    ),
    'bci-projects': bilingual<Question[]>(
        [
            {
                prompt: 'Votre club n’a aucun casque. Quelle piste la leçon propose-t-elle pour un premier projet de décodage ?',
                choices: [
                    'Attendre d’avoir un budget pour du matériel.',
                    'Utiliser MOABB, qui télécharge des jeux de données ICM publics et permet de tester des chaînes de décodage.',
                    'Construire d’abord un fauteuil roulant contrôlé par la pensée.',
                ],
                correct: 1,
                explanation: 'La section « No Headset » propose MOABB et ses exemples comme bon premier projet, ainsi qu’OpenNeuro pour des jeux de données ouverts.',
                section: 'No Headset', href: '#no-headset',
            },
            {
                prompt: 'Un tutoriel de la liste date de 2016 et n’est plus maintenu. À quoi faut-il s’attendre ?',
                choices: [
                    'Il fonctionnera sans changement avec les bibliothèques actuelles.',
                    'Il est faux et doit être ignoré.',
                    'Les idées restent utiles, mais le code demandera sans doute des bibliothèques mises à jour.',
                ],
                correct: 2,
                explanation: 'La plupart des tutoriels datent de 2015 à 2018. Ils enseignent encore des idées utiles, mais le code de cette période peut demander des mises à jour.',
                section: 'Start here', href: '#start-here-any-supported-headset',
            },
        ],
        [
            {
                prompt: 'Your club has no headset. What does the lesson suggest for a first decoding project?',
                choices: [
                    'Wait until there is budget for hardware.',
                    'Use MOABB, which downloads public BCI datasets and lets you test decoding pipelines on them.',
                    'Build a brain-controlled wheelchair first.',
                ],
                correct: 1,
                explanation: 'The "No Headset" section suggests MOABB and its examples as a good first project, and OpenNeuro for open datasets.',
                section: 'No Headset', href: '#no-headset',
            },
            {
                prompt: 'A tutorial on the list dates from 2016 and is not maintained. What should you expect?',
                choices: [
                    'It will run unchanged with current libraries.',
                    'It is wrong and should be ignored.',
                    'The ideas are still useful, but the code will probably need updated libraries.',
                ],
                correct: 2,
                explanation: 'Most tutorials were written between 2015 and 2018. They still teach useful ideas, but code from that period may need updated libraries to run.',
                section: 'Start here', href: '#start-here-any-supported-headset',
            },
        ],
    ),
    'emerging-technologies': bilingual<Question[]>(
        [
            {
                prompt: 'Qu’est-ce qui distingue un système en boucle fermée d’un système en boucle ouverte ?',
                choices: [
                    'Il enregistre et stimule à la fois, et utilise ce qu’il mesure pour ajuster son action.',
                    'Il est toujours implanté.',
                    'Il ne fonctionne qu’à l’hôpital.',
                ],
                correct: 0,
                explanation: 'Lire ou écrire seulement est une boucle ouverte : l’information va dans un seul sens. Combiner les deux permet d’ajuster la stimulation selon ses effets mesurés, par exemple pour arrêter une crise qui commence.',
                section: 'Read/Write', href: '#readwrite',
            },
            {
                prompt: 'Les ultrasons focalisés à faible intensité modifient-ils l’activité cérébrale de façon établie, selon la leçon ?',
                choices: [
                    'Oui, ils sont approuvés pour cet usage depuis 2016.',
                    'Non. À haute intensité, ils détruisent une petite zone de tissu (approuvé pour le tremblement essentiel). L’usage à faible intensité reste expérimental.',
                    'Oui, ils remplacent la stimulation cérébrale profonde.',
                ],
                correct: 1,
                explanation: 'L’approbation de 2016 concerne Exablate Neuro, qui chauffe et détruit un petit point de tissu pour traiter le tremblement essentiel. La modulation à faible intensité est encore à l’étude.',
                section: 'Focused ultrasound', href: '#focused-ultrasound',
            },
        ],
        [
            {
                prompt: 'What makes a closed-loop system different from an open-loop one?',
                choices: [
                    'It both records and stimulates, and uses what it measures to adjust what it does.',
                    'It is always implanted.',
                    'It only works in a hospital.',
                ],
                correct: 0,
                explanation: 'Reading or writing alone is open loop: information flows one way. Combining them lets the system adjust stimulation based on its measured effects, for example to stop a seizure as it starts.',
                section: 'Read/Write', href: '#readwrite',
            },
            {
                prompt: 'According to the lesson, is low-intensity focused ultrasound an established way to change brain activity?',
                choices: [
                    'Yes, it has been approved for this since 2016.',
                    'No. At high intensity it destroys a small spot of tissue (approved for essential tremor). Low-intensity use is still experimental.',
                    'Yes, it replaces deep brain stimulation.',
                ],
                correct: 1,
                explanation: 'The 2016 approval is for Exablate Neuro, which heats and destroys a small spot of tissue to treat essential tremor. Low-intensity modulation is still being studied.',
                section: 'Focused ultrasound', href: '#focused-ultrasound',
            },
        ],
    ),
    'nervous-system': bilingual<Question[]>(
        [
            {
                prompt: 'Une personne voit un danger : son cœur accélère et ses pupilles se dilatent. Quelle partie du système nerveux est en cause ?',
                choices: ['Le système nerveux parasympathique.', 'Le système nerveux sympathique.', 'Le système nerveux somatique.'],
                correct: 1,
                explanation: 'Le système sympathique prépare le corps à réagir (« combat ou fuite »). Le parasympathique favorise le repos et la digestion.',
                section: 'Sympathetic Nervous System', href: '#sympathetic-nervous-system',
            },
            {
                prompt: 'Que veut dire « afférent » pour la division sensorielle ?',
                choices: [
                    'Elle conduit l’information vers l’intérieur, du corps vers le SNC.',
                    'Elle conduit les commandes du SNC vers les muscles.',
                    'Elle relie les deux hémisphères.',
                ],
                correct: 0,
                explanation: 'Afférent signifie « conduire vers l’intérieur ». La division motrice, efférente, envoie l’information du SNC vers le corps.',
                section: 'Sensory Division', href: '#sensory-division',
            },
        ],
        [
            {
                prompt: 'A person sees a threat: their heart rate rises and pupils dilate. Which part of the nervous system is responsible?',
                choices: ['The parasympathetic nervous system.', 'The sympathetic nervous system.', 'The somatic nervous system.'],
                correct: 1,
                explanation: 'The sympathetic system prepares the body to react ("fight or flight"). The parasympathetic system supports "rest and digest".',
                section: 'Sympathetic Nervous System', href: '#sympathetic-nervous-system',
            },
            {
                prompt: 'What does "afferent" mean for the sensory division?',
                choices: [
                    'It conducts information inwards, from the body to the CNS.',
                    'It carries commands from the CNS to the muscles.',
                    'It connects the two hemispheres.',
                ],
                correct: 0,
                explanation: 'Afferent means conducting inwards. The motor division is efferent and sends information from the CNS out to the body.',
                section: 'Sensory Division', href: '#sensory-division',
            },
        ],
    ),
    'cellular-components': bilingual<Question[]>(
        [
            {
                prompt: 'Quelles cellules forment la gaine de myéline dans le système nerveux central ?',
                choices: ['Les cellules de Schwann.', 'Les cellules microgliales.', 'Les oligodendrocytes.'],
                correct: 2,
                explanation: 'Les oligodendrocytes myélinisent les axones du SNC. Les cellules de Schwann font ce travail dans le système nerveux périphérique.',
                section: 'Glial Cells', href: '#glial-cells',
            },
            {
                prompt: 'Quel est le principal neurotransmetteur inhibiteur du SNC ?',
                choices: ['Le glutamate.', 'Le GABA.', 'La dopamine.'],
                correct: 1,
                explanation: 'Le GABA est le principal neurotransmetteur inhibiteur du SNC. Le glutamate est le principal neurotransmetteur excitateur du cerveau.',
                section: 'Neurotransmitters', href: '#neurotransmitters',
            },
        ],
        [
            {
                prompt: 'Which cells form the myelin sheath in the central nervous system?',
                choices: ['Schwann cells.', 'Microglial cells.', 'Oligodendrocytes.'],
                correct: 2,
                explanation: 'Oligodendrocytes myelinate axons in the CNS. Schwann cells do this in the peripheral nervous system.',
                section: 'Glial Cells', href: '#glial-cells',
            },
            {
                prompt: 'What is the major inhibitory neurotransmitter in the CNS?',
                choices: ['Glutamate.', 'GABA.', 'Dopamine.'],
                correct: 1,
                explanation: 'GABA is the major inhibitory neurotransmitter in the CNS. Glutamate is the major excitatory neurotransmitter in the brain.',
                section: 'Neurotransmitters', href: '#neurotransmitters',
            },
        ],
    ),
    neuroanatomy: bilingual<Question[]>(
        [
            {
                prompt: 'Un signal de mouvement de la main gauche apparaît surtout sur une électrode placée au-dessus d’un hémisphère. Lequel, et pourquoi ?',
                choices: [
                    'L’hémisphère gauche, parce que le contrôle moteur est ipsilatéral.',
                    'Les deux également, parce que le corps calleux mélange les signaux.',
                    'L’hémisphère droit, parce que le cortex moteur contrôle le côté opposé (controlatéral) du corps.',
                ],
                correct: 2,
                explanation: 'Le contrôle moteur vient du cortex controlatéral au membre : le cortex moteur droit contrôle la main gauche.',
                section: 'Neuroanatomic Location', href: '#neuroanatomic-location',
            },
            {
                prompt: 'Vous voulez mesurer une réponse à des images. Quel lobe contient le cortex visuel primaire ?',
                choices: ['Le lobe occipital.', 'Le lobe temporal.', 'Le lobe frontal.'],
                correct: 0,
                explanation: 'Le lobe occipital, à l’arrière du cerveau, contient le cortex visuel primaire. Le lobe temporal contient le cortex auditif.',
                section: 'Lobes and Cortices', href: '#lobes-and-cortices',
            },
        ],
        [
            {
                prompt: 'A signal from moving the left hand appears mostly on an electrode over one hemisphere. Which one, and why?',
                choices: [
                    'The left hemisphere, because motor control is ipsilateral.',
                    'Both equally, because the corpus callosum mixes the signals.',
                    'The right hemisphere, because the motor cortex controls the opposite (contralateral) side of the body.',
                ],
                correct: 2,
                explanation: 'Motor control comes from the cortex contralateral to the limb: the right motor cortex controls the left hand.',
                section: 'Neuroanatomic Location', href: '#neuroanatomic-location',
            },
            {
                prompt: 'You want to measure a response to images. Which lobe contains the primary visual cortex?',
                choices: ['The occipital lobe.', 'The temporal lobe.', 'The frontal lobe.'],
                correct: 0,
                explanation: 'The occipital lobe, at the back of the brain, contains the primary visual cortex. The temporal lobe contains the auditory cortex.',
                section: 'Lobes and Cortices', href: '#lobes-and-cortices',
            },
        ],
    ),
    'brain-disorders': bilingual<Question[]>(
        [
            {
                prompt: 'Quelle perte de neurones la leçon associe-t-elle à la maladie de Parkinson ?',
                choices: [
                    'La perte des motoneurones inférieurs de la moelle épinière.',
                    'La perte de neurones dopaminergiques dans la substance noire.',
                    'La perte de neurones du cortex visuel.',
                ],
                correct: 1,
                explanation: 'La maladie de Parkinson est liée à la perte de neurones dopaminergiques de la substance noire. Les traitements comprennent des médicaments qui augmentent la dopamine et la stimulation cérébrale profonde.',
                section: 'Neurodegenerative disorders', href: '#neurodegenerative-disorders',
            },
            {
                prompt: 'Que veut dire « comorbide » dans la leçon ?',
                choices: [
                    'Qu’un trouble est toujours mortel.',
                    'Qu’un trouble est contagieux.',
                    'Qu’une personne ayant un trouble a plus de chances d’en avoir un autre, comme la dépression et l’anxiété.',
                ],
                correct: 2,
                explanation: 'Plusieurs troubles cérébraux surviennent souvent ensemble. La leçon donne l’exemple de la dépression et de l’anxiété.',
                section: 'What Can Go Wrong?', href: '#what-can-go-wrong',
            },
        ],
        [
            {
                prompt: 'Which loss of neurons does the lesson associate with Parkinson’s disease?',
                choices: [
                    'Loss of lower motor neurons in the spinal cord.',
                    'Loss of dopaminergic neurons in the substantia nigra.',
                    'Loss of neurons in the visual cortex.',
                ],
                correct: 1,
                explanation: 'Parkinson’s disease involves the loss of dopaminergic neurons in the substantia nigra. Treatments include medications that boost dopamine, and deep brain stimulation.',
                section: 'Neurodegenerative disorders', href: '#neurodegenerative-disorders',
            },
            {
                prompt: 'What does "comorbid" mean in the lesson?',
                choices: [
                    'That a disorder is always fatal.',
                    'That a disorder is contagious.',
                    'That someone with one disorder is more likely to also have another, such as depression and anxiety.',
                ],
                correct: 2,
                explanation: 'Many brain disorders tend to occur together. The lesson gives depression and anxiety as an example.',
                section: 'What Can Go Wrong?', href: '#what-can-go-wrong',
            },
        ],
    ),
};
