import { bilingual } from '../text';

export default bilingual(
  {
    title: 'Glossaire de la neurotechnologie',
    description:
      "Définitions claires des acronymes et concepts essentiels en neurotechnologie : ICM, EEG, ECoG, fNIRS, TMS, tFUS, ERP, LSL, BIDS, MOABB et voies réglementaires.",
    eyebrow: 'Référence',
    heading: 'Glossaire de la neurotechnologie',
    subtitle:
      "Les sigles et notions de base que vous croiserez dans nos cours, offres d'emploi, articles et projets libres — expliqués simplement.",
    jumpTo: 'Aller à la section :',
    learnMoreHeading: 'Pour aller plus loin',
    learnMoreBody:
      "Parcourez nos 15 leçons gratuites pour approfondir l'EEG et les ICM, ou consultez nos repères en sécurité et en éthique.",
    learnLink: 'Commencer à apprendre',
    safetyLink: 'Sécurité et éthique',
    sections: [
      {
        id: 'recording',
        title: 'Interfaces et enregistrement',
        terms: [
          {
            id: 'bci',
            term: 'ICM / BCI (Interface cerveau-machine)',
            summary:
              "Système qui mesure l'activité du cerveau (ou du système nerveux) et la traduit en commandes pour un ordinateur, une prothèse ou un logiciel — parfois avec rétroaction sensorielle.",
          },
          {
            id: 'eeg',
            term: 'EEG (Électroencéphalographie)',
            summary:
              "Enregistrement non invasif de l'activité électrique cérébrale à l'aide d'électrodes posées sur le cuir chevelu. Excellente résolution temporelle (millisecondes), faible coût, mais résolution spatiale limitée.",
          },
          {
            id: 'ecog',
            term: 'ECoG (Électrocorticographie)',
            summary:
              "Grille d'électrodes placée directement à la surface du cortex (sous le crâne) lors d'une intervention chirurgicale. Signal beaucoup plus net que l'EEG, sans pénétrer le tissu cérébral.",
          },
          {
            id: 'seeg',
            term: 'sEEG (Stéréo-électroencéphalographie)',
            summary:
              "Électrodes fines implantées en profondeur dans le cerveau, surtout utilisées en clinique pour localiser les foyers épileptiques et de plus en plus en recherche sur les ICM.",
          },
          {
            id: 'meg',
            term: 'MEG (Magnétoencéphalographie)',
            summary:
              "Mesure non invasive des minuscules champs magnétiques produits par les courants neuronaux. Offre une résolution temporelle comparable à l'EEG avec une meilleure localisation spatiale, en salle blindée (capteurs SQUID ou OPM).",
          },
          {
            id: 'fnirs',
            term: 'fNIRS (Spectroscopie fonctionnelle proche infrarouge)',
            summary:
              "Imagerie optique portable qui utilise la lumière proche infrarouge pour mesurer les variations d'oxygénation sanguine dans le cortex. Plus lente que l'EEG mais robuste aux artefacts électriques.",
          },
          {
            id: 'fmri',
            term: 'IRMf / fMRI (Imagerie par résonance magnétique fonctionnelle)',
            summary:
              "Imagerie cérébrale non invasive mesurant le signal BOLD lié au flux sanguin dans tout le cerveau avec une résolution spatiale millimétrique, mais une résolution temporelle de l'ordre de la seconde.",
          },
          {
            id: 'emg',
            term: 'EMG (Électromyographie)',
            summary:
              "Mesure de l'activité électrique des muscles (souvent au poignet ou à l'avant-bras) utilisée dans les interfaces neuromotrices non invasives et les prothèses myoélectriques.",
          },
        ],
      },
      {
        id: 'stimulation',
        title: 'Stimulation et neuromodulation',
        terms: [
          {
            id: 'tms',
            term: 'SMT / TMS (Stimulation magnétique transcrânienne)',
            summary:
              "Impulsions magnétiques appliquées à travers le crâne pour moduler l'activité d'une région corticale ciblée. Utilisée en recherche et en clinique (notamment pour la dépression résistante).",
          },
          {
            id: 'tdcs-tacs',
            term: 'tDCS / tACS (Stimulation transcrânienne à courant continu ou alternatif)',
            summary:
              "Courants électriques faibles appliqués via des électrodes sur le cuir chevelu pour moduler l'excitabilité neuronale ou les rythmes cérébraux.",
          },
          {
            id: 'tfus',
            term: 'tFUS / LIFU (Ultrasons focalisés transcrâniens de faible intensité)',
            summary:
              "Technique non invasive qui focalise des ondes ultrasonores à travers le crâne pour moduler des structures profondes du cerveau avec une précision millimétrique.",
          },
          {
            id: 'dbs',
            term: 'SCP / DBS (Stimulation cérébrale profonde)',
            summary:
              "Électrodes implantées reliées à un neurostimulateur pour traiter des troubles comme la maladie de Parkinson, le tremblement essentiel ou certaines épilepsies. Les systèmes en boucle fermée s'adaptent aux signaux mesurés.",
          },
        ],
      },
      {
        id: 'signals',
        title: 'Signaux et paradigmes',
        terms: [
          {
            id: 'oscillations',
            term: 'Oscillations neuronales (delta, thêta, alpha, bêta, gamma)',
            summary:
              "Activité rythmique mesurée en EEG/MEG, regroupée par bandes de fréquences (de ~1 Hz à >30 Hz) associées au sommeil, à l'attention, au repos visuel, au mouvement et au traitement cognitif.",
          },
          {
            id: 'erp',
            term: 'PRE / ERP (Potentiel évoqué / lié aux événements)',
            summary:
              "Réponse électrique cérébrale synchronisée à un stimulus sensoriel, cognitif ou moteur précis, mise en évidence en moyennant plusieurs essais.",
          },
          {
            id: 'p300',
            term: 'P300',
            summary:
              "Onde positive survenant environ 300 ms après un stimulus rare ou pertinent (paradigme « oddball »), classique dans les épelleurs ICM.",
          },
          {
            id: 'ssvep',
            term: 'SSVEP (Potentiel évoqué visuel stationnaire)',
            summary:
              "Réponse oscillatoire du cortex visuel à la fréquence exacte d'une cible qui clignote, permettant une sélection rapide et fiable en ICM non invasive.",
          },
          {
            id: 'motor-imagery',
            term: 'Imagerie motrice (MI)',
            summary:
              "Fait d'imaginer un mouvement (par exemple la main gauche ou droite) sans bouger, ce qui modifie les rythmes mu et bêta au-dessus du cortex sensorimoteur.",
          },
        ],
      },
      {
        id: 'standards',
        title: 'Outils, normes et réglementation',
        terms: [
          {
            id: 'lsl',
            term: 'LSL (Lab Streaming Layer)',
            summary:
              "Protocole libre standard pour diffuser et synchroniser en temps réel des flux de signaux physiologiques (EEG, marqueurs d'événements, suivi oculaire) sur un réseau local.",
          },
          {
            id: 'bids',
            term: 'BIDS (Brain Imaging Data Structure)',
            summary:
              "Norme ouverte d'organisation des fichiers et métadonnées en neuroimagerie (IRM, EEG-BIDS, MEG, iEEG, fNIRS) facilitant le partage et la reproductibilité.",
          },
          {
            id: 'mne',
            term: 'MNE-Python',
            summary:
              "Bibliothèque Python libre de référence pour le prétraitement, la visualisation, l'estimation de sources et l'analyse de données MEG, EEG et sEEG.",
          },
          {
            id: 'moabb',
            term: 'MOABB (Mother of All BCI Benchmarks)',
            summary:
              "Projet libre maintenu par la communauté NeuroTechX qui rassemble des jeux de données EEG publics et des protocoles d'évaluation reproductibles pour comparer les algorithmes d'ICM.",
          },
          {
            id: 'fda-pathways',
            term: '510(k), De Novo, PMA et IDE',
            summary:
              "Principales voies réglementaires de la FDA américaine pour les dispositifs médicaux : 510(k) (équivalence substantielle), De Novo (nouveau dispositif à risque faible ou modéré), PMA (risque élevé, ex. implants) et IDE (autorisation d'essai clinique).",
          },
          {
            id: 'neurorights',
            term: 'Neurodroits et confidentialité des données neuronales',
            summary:
              "Cadres juridiques et éthiques visant à protéger la vie privée mentale, le consentement éclairé et l'intégrité cognitive face à la collecte et à l'analyse des données cérébrales.",
          },
        ],
      },
    ],
  },
  {
    title: 'Neurotechnology Glossary',
    description:
      'Plain-language definitions of core neurotechnology acronyms and concepts: BCI, EEG, ECoG, fNIRS, TMS, tFUS, ERP, LSL, BIDS, MOABB, and regulatory pathways.',
    eyebrow: 'Reference',
    heading: 'Neurotechnology Glossary',
    subtitle:
      'The core acronyms and concepts you will run into across our lessons, job board, funding calls, and open-source projects — explained clearly.',
    jumpTo: 'Jump to section:',
    learnMoreHeading: 'Keep learning',
    learnMoreBody:
      'Work through our 15 free lessons on EEG and BCI fundamentals, or read our guide to neurotech safety, privacy, and regulation.',
    learnLink: 'Start learning',
    safetyLink: 'Safety & ethics',
    sections: [
      {
        id: 'recording',
        title: 'Interfaces & recording',
        terms: [
          {
            id: 'bci',
            term: 'BCI (Brain–Computer Interface)',
            summary:
              'A system that measures brain (or nervous system) activity and translates it into commands for software, a computer, or a prosthetic — sometimes with closed-loop sensory feedback.',
          },
          {
            id: 'eeg',
            term: 'EEG (Electroencephalography)',
            summary:
              'Non-invasive recording of electrical brain activity using electrodes on the scalp. Millisecond time resolution and accessible hardware, with lower spatial precision than invasive or MRI methods.',
          },
          {
            id: 'ecog',
            term: 'ECoG (Electrocorticography)',
            summary:
              'An electrode grid placed directly on the cortical surface under the skull during surgery. Delivers much higher signal-to-noise ratio than scalp EEG without penetrating brain tissue.',
          },
          {
            id: 'seeg',
            term: 'sEEG (Stereo-electroencephalography)',
            summary:
              'Thin depth electrodes implanted into targeted brain structures, widely used clinically to localize epileptic seizures and increasingly studied for speech and motor BCIs.',
          },
          {
            id: 'meg',
            term: 'MEG (Magnetoencephalography)',
            summary:
              'Non-invasive measurement of tiny magnetic fields generated by neuronal currents. Combines EEG-like millisecond timing with sharper spatial localization inside a shielded room (SQUID or wearable OPM sensors).',
          },
          {
            id: 'fnirs',
            term: 'fNIRS (Functional Near-Infrared Spectroscopy)',
            summary:
              'Wearable optical brain imaging that uses near-infrared light to track blood oxygenation changes in the cortex. Slower than EEG, but immune to electrical line noise.',
          },
          {
            id: 'fmri',
            term: 'fMRI (Functional Magnetic Resonance Imaging)',
            summary:
              'Non-invasive whole-brain imaging that measures blood-oxygen-level-dependent (BOLD) signals at millimeter spatial resolution, with temporal resolution on the order of seconds.',
          },
          {
            id: 'emg',
            term: 'EMG (Electromyography)',
            summary:
              'Recording of electrical muscle activity (often at the wrist or forearm), used in non-invasive neuromotor interfaces and myoelectric prosthetics.',
          },
        ],
      },
      {
        id: 'stimulation',
        title: 'Stimulation & neuromodulation',
        terms: [
          {
            id: 'tms',
            term: 'TMS (Transcranial Magnetic Stimulation)',
            summary:
              'Focused magnetic pulses delivered through the skull to modulate activity in a targeted cortical region. Widely used in neuroscience research and clinical depression treatment.',
          },
          {
            id: 'tdcs-tacs',
            term: 'tDCS / tACS (Transcranial Direct / Alternating Current Stimulation)',
            summary:
              'Low-intensity electrical currents applied via scalp electrodes to shift cortical excitability (tDCS) or entrain neural oscillations (tACS).',
          },
          {
            id: 'tfus',
            term: 'tFUS / LIFU (Transcranial Focused Ultrasound)',
            summary:
              'Non-invasive technique focusing low-intensity ultrasound waves through the skull to modulate deep or superficial brain structures with millimeter spatial precision.',
          },
          {
            id: 'dbs',
            term: 'DBS (Deep Brain Stimulation)',
            summary:
              'Implanted electrodes connected to a pulse generator to treat conditions such as Parkinson’s disease, essential tremor, and refractory epilepsy. Adaptive (closed-loop) systems adjust stimulation using sensed neural signals.',
          },
        ],
      },
      {
        id: 'signals',
        title: 'Signals & paradigms',
        terms: [
          {
            id: 'oscillations',
            term: 'Neural oscillations (delta, theta, alpha, beta, gamma)',
            summary:
              'Rhythmic brain activity measured with EEG or MEG, grouped into frequency bands (~1 Hz to >30 Hz) linked to sleep, attention, visual rest, movement, and cognitive processing.',
          },
          {
            id: 'erp',
            term: 'ERP (Event-Related Potential)',
            summary:
              'A time-locked electrical brain response to a specific sensory, cognitive, or motor event, typically revealed by averaging across repeated trials.',
          },
          {
            id: 'p300',
            term: 'P300',
            summary:
              'A positive voltage peak occurring ~300 ms after a rare or attended target stimulus (the oddball paradigm), classic in BCI spellers.',
          },
          {
            id: 'ssvep',
            term: 'SSVEP (Steady-State Visual Evoked Potential)',
            summary:
              'An oscillatory visual-cortex response locked to the exact flicker frequency of an attended visual target, enabling fast, high-accuracy non-invasive selection.',
          },
          {
            id: 'motor-imagery',
            term: 'Motor imagery (MI)',
            summary:
              'Mentally rehearsing a movement (such as left vs. right hand) without physically moving, producing characteristic shifts in sensorimotor mu and beta rhythms.',
          },
        ],
      },
      {
        id: 'standards',
        title: 'Tools, standards & regulation',
        terms: [
          {
            id: 'lsl',
            term: 'LSL (Lab Streaming Layer)',
            summary:
              'Open-source networking protocol for streaming and time-synchronizing real-time biosignals (EEG, event markers, eye tracking) across devices and languages.',
          },
          {
            id: 'bids',
            term: 'BIDS (Brain Imaging Data Structure)',
            summary:
              'Open community standard for organizing neuroimaging and electrophysiology datasets (MRI, EEG-BIDS, MEG, iEEG, fNIRS) so pipelines and datasets are shareable and reproducible.',
          },
          {
            id: 'mne',
            term: 'MNE-Python',
            summary:
              'The flagship open-source Python library for preprocessing, visualizing, source-localizing, and analyzing MEG, EEG, and sEEG data.',
          },
          {
            id: 'moabb',
            term: 'MOABB (Mother of All BCI Benchmarks)',
            summary:
              'Open-source project maintained by the NeuroTechX community that bundles public EEG datasets and reproducible evaluation pipelines for benchmarking BCI algorithms.',
          },
          {
            id: 'fda-pathways',
            term: '510(k), De Novo, PMA & IDE',
            summary:
              'Core US FDA medical-device pathways: 510(k) (substantial equivalence to a predicate), De Novo (novel low-to-moderate-risk devices), PMA (high-risk devices such as implants), and IDE (permission to run a clinical study).',
          },
          {
            id: 'neurorights',
            term: 'Neurorights & neural data privacy',
            summary:
              'Legal and ethical frameworks focused on mental privacy, informed consent, and cognitive liberty as neural recording and decoding become more capable and widespread.',
          },
        ],
      },
    ],
  }
);
