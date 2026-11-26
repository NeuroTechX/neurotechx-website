import { bilingual } from '../text';

export default bilingual(
  {
    title: 'Formation et données',
    description:
      "Le NeuroTech Primer, des jeux de données neuronales ouverts, des boîtes à outils libres d'analyse EEG, les normes FAIR et des parcours d'apprentissage choisis avec soin.",
    eyebrow: 'Apprendre',
    subtitle: 'Des ressources de formation choisies avec soin et des normes ouvertes pour la communauté.',
    newHere: 'Vous débutez en neurotech?',
    startHere: 'Commencez par notre parcours en quatre étapes',
    micro: {
      label: 'Programme en vedette · Partenaire de NeuroTechX',
      title: 'Programme de microcertification NeuroTech',
      body: "Une certification professionnelle en neurotechnologie menée par l'Université Queen's avec les universités York, Western et Nipissing, et élaborée avec le soutien de la province de l'Ontario. Des cours en ligne d'environ 50 heures chacun portent sur les bases des neurosciences et de la neurotech, l'enregistrement et le traitement neuroélectroniques, la neuroimagerie, la neuromodulation, l'évaluation comportementale, l'entrepreneuriat en neurotech et la neuroéthique, suivis d'un projet intégrateur pratique de deux semaines sur un campus partenaire.",
      audience:
        "Pour les étudiants, les chercheurs et les professionnels qui se tournent vers la neurotech. NeuroTechX est partenaire du programme.",
      coursesCta: 'Voir les cours',
      labCta: 'Neurotech Discovery Lab',
    },
    primer: {
      label: 'Ressource en vedette',
      title: 'The NeuroTech Primer',
      body: "Le guide de référence pour s'initier aux interfaces cerveau-machine (ICM) et à la neurotechnologie. Écrit par la communauté, pour la communauté.",
      bookCta: 'Obtenir le livre',
      pdfCta: 'Lire le PDF',
      coverAlt: 'Couverture du NeuroTech Primer',
    },
    degrees: {
      title: 'Programmes de diplôme en neurotechnologie',
      lead: 'Des programmes de maîtrise et des réseaux universitaires consacrés à la neurotechnologie.',
      items: [
        {
          name: 'European Master in Neurotechnology',
          by: 'NeurotechEU : Bonn, Radboud, Miguel Hernández (Elche), Boğaziçi, Cluj-Napoca, Lille et Reykjavík',
          about:
            "Une maîtrise conjointe de deux ans (120 crédits ECTS) donnée en anglais, avec un séjour d'études dans une deuxième université partenaire et un mémoire interdisciplinaire. Première cohorte à l'année universitaire 2027-2028.",
          href: 'https://www.uni-bonn.de/en/news/210-2026',
        },
        {
          name: 'Master’s in Neurotechnology (MUNE)',
          by: 'Universidad Politécnica de Madrid',
          about:
            "Une maîtrise d'un an donnée en anglais qui couvre les neurosciences, les neurodispositifs, l'IA en neurotechnologie ainsi que les signaux et l'imagerie neuronaux, avec un stage au deuxième semestre. Elle s'adresse aux diplômés en génie biomédical; les personnes d'autres formations peuvent s'y joindre grâce à des cours d'appoint.",
          href: 'https://neurotec.upm.es/en/masters-of-science-in-neurotechnology/enrollment-procedure/',
        },
        {
          name: 'Master’s in Neuroscience and Neurotechnology',
          by: 'Universidad Autónoma de Madrid',
          about:
            "Une maîtrise d'un an (60 crédits ECTS) donnée en espagnol, destinée aux diplômés en sciences, en sciences de la santé ou en génie, et menant à la recherche, à l'industrie ou à l'entrepreneuriat.",
          href: 'https://www.uam.es/uam/en/master-universitario-neurociencia-neurotecnologia',
        },
        {
          name: 'Écoles, stages et réseau doctoral de NeurotechEU',
          by: "NeurotechEU, l'Université européenne du cerveau et de la technologie",
          about:
            "Des écoles d'hiver et d'automne, des stages en innovation et un réseau doctoral dans les universités partenaires de l'alliance. La plupart sont ouverts aux étudiants des universités partenaires.",
          href: 'https://theneurotech.eu/',
        },
      ],
    },
    archives: {
      title: 'Archives de données ouvertes',
      lead: 'Nous croyons fermement à la science ouverte. Utilisez ces dépôts reconnus pour vos recherches.',
      items: [
        {
          name: 'OpenNeuro',
          body: "Une plateforme libre et gratuite pour partager des données d'IRM, de MEG, d'EEG, d'iEEG et d'ECoG.",
          href: 'https://openneuro.org/',
        },
        { name: 'NEMAR', body: 'Archive et outils de données neuroélectromagnétiques.', href: 'https://nemar.org/' },
        {
          name: 'DANDI Archive',
          body: "Archives distribuées pour l'intégration des données de neurophysiologie.",
          href: 'https://dandiarchive.org/',
        },
      ],
    },
    tools: {
      title: "Outils d'analyse libres",
      lead: 'Des boîtes à outils Python essentielles pour le traitement et la paramétrisation des signaux neuronaux.',
      items: [
        {
          name: 'specparam (anciennement FOOOF)',
          body: 'Fitting Oscillations & One-Over-F. Paramétrisation des spectres de puissance neuronaux.',
          href: 'https://fooof-tools.github.io/fooof/',
        },
        {
          name: 'NeuroDSP',
          body: 'Traitement numérique du signal pour les séries temporelles neuronales : filtrage, analyse spectrale et simulation.',
          href: 'https://neurodsp-tools.github.io/neurodsp/',
        },
      ],
    },
    standards: {
      title: 'Normes et reproductibilité en EEG',
      lead: "Des normes et des outils ouverts pour un EEG FAIR et reproductible — issus des Actions COST EEG101 et INDoS.",
      items: [
        {
          name: 'EEG Community Framework',
          body: 'Rigueur, démocratisation et pérennité pour une science EEG ouverte.',
          href: 'https://linktr.ee/eegcf',
        },
        {
          name: 'ARTEM-IS',
          body: 'Application Web interactive pour décrire les méthodes EEG/PE de façon structurée et normalisée.',
          href: 'https://artemis.incf.org/',
        },
        {
          name: 'BIDS Manager',
          body: "Interface graphique pour convertir des données brutes au format BIDS, pour des jeux de données d'IRM, de MEG et d'EEG.",
          href: 'https://github.com/ANCPLabOldenburg/BIDS-Manager',
        },
        {
          name: 'MEEGqc',
          body: "Boîte à outils Python conforme à BIDS pour l'évaluation et le contrôle de la qualité en MEG/EEG.",
          href: 'https://github.com/ANCPLabOldenburg/MEGqc',
        },
      ],
    },
    devMeetings: {
      title: 'Rencontres de développeurs',
      lead: "Joignez-vous aux contributeurs qui bâtissent la prochaine génération d'outils libres en neurotech.",
      items: [
        {
          name: 'EEG-ExPy',
          body: 'Rencontre hebdomadaire des développeurs. Expériences EEG en Python.',
          href: 'https://github.com/neurotechx/eeg-expy',
        },
        {
          name: 'MOABB',
          body: 'Rencontre hebdomadaire des développeurs. Mother of All BCI Benchmarks.',
          href: 'https://github.com/NeuroTechX/moabb',
        },
      ],
    },
    gold: {
      title: 'Formations de référence',
      items: [
        {
          name: 'Neuromatch Academy',
          body: "La référence en formation en ligne en neurosciences computationnelles et en apprentissage profond. Intensive, portée par la communauté et ouverte.",
          href: 'https://neuromatch.io/courses/',
          tags: ['Neurosciences computationnelles', 'Apprentissage profond'],
        },
        {
          name: 'NeuroTech Course (Berkeley)',
          body: "Le premier programme d'études libre en neurotechnologie. Un vaste survol des biosignaux, du matériel et des laboratoires, de l'Université de Californie à Berkeley.",
          href: 'https://github.com/neurotech-berkeley/neurotech-course',
          tags: ["Programme d'études universitaire", 'Laboratoires et matériel'],
        },
      ],
    },
    skills: {
      title: 'Compétences de base et ateliers',
      items: [
        {
          name: 'Brainhack Global',
          body: "Des ateliers collaboratifs pour une science du cerveau ouverte. Une formule unique qui combine formation, hackathons et non-conférences.",
          href: 'https://brainhack.org/',
          tags: ['Science ouverte', 'Événements internationaux'],
        },
        {
          name: 'Software Carpentry',
          body: "Enseigner les compétences essentielles en informatique de recherche. Le « semestre manquant » de programmation pour les scientifiques.",
          href: 'https://software-carpentry.org/',
          tags: ['Git et shell', 'Python/R'],
        },
        {
          name: 'The Missing Semester (MIT)',
          body: "The Missing Semester of Your Computer Science Education. Maîtrisez la ligne de commande, un éditeur de texte puissant, les fonctions avancées des systèmes de gestion de versions, et bien plus encore!",
          href: 'https://missing.csail.mit.edu/',
          tags: ['Shell', 'Vim/Git', 'Sécurité'],
        },
        {
          name: 'CuttingEEG',
          body: "Plongée dans la méthodologie M/EEG. Une association qui fait la promotion des méthodes de pointe en recherche EEG et MEG grâce à des congrès et à des ateliers pratiques.",
          href: 'https://cuttingeeg.org/',
          tags: ['Méthodologie avancée', 'Traitement du signal'],
        },
        {
          name: 'Luck Lab (ERP Info)',
          body: "La référence en méthodologie des potentiels évoqués (PE, ou ERP en anglais). Les bonnes pratiques de conception expérimentale et d'analyse du professeur Steve Luck.",
          href: 'https://lucklab.ucdavis.edu/blog/category/EEG%2FERP',
          tags: ['Potentiels évoqués', 'Conception expérimentale'],
        },
        {
          name: 'Analyzing Neural Time Series Data',
          body: "Le guide essentiel de l'analyse spectrale et de la dynamique temps-fréquence. Le manuel de référence de Mike X Cohen sur l'analyse des données neuronales.",
          href: 'https://direct.mit.edu/books/monograph/4013/Analyzing-Neural-Time-Series-DataTheory-and',
          tags: ['Temps-fréquence', 'Analyse spectrale'],
        },
        {
          name: 'PURSUE',
          body: "Preparing Undergraduates for Research in STEM Using Electrophysiology : préparer les étudiants de premier cycle à la recherche en STIM grâce à l'électrophysiologie. Du matériel pédagogique, des jeux de données et des laboratoires ouverts pour des cours d'une session.",
          href: 'https://pursue.richmond.edu/',
          tags: ['Recherche au premier cycle', 'Cours ouverts'],
        },
        {
          name: 'Stuttgart Computational Cognitive Science (S-CCS)',
          body: "Comprendre le comportement humain et l'activité cérébrale en conditions réalistes. Faire progresser les méthodes en M/EEG, en oculométrie et en réalité virtuelle grâce à des outils libres comme Unfold.",
          href: 'https://www.s-ccs.de/',
          tags: ['Modélisation computationnelle', 'RV et oculométrie'],
        },
      ],
    },
    interactive: {
      title: 'Apprentissage interactif',
      items: [
        {
          name: 'EEGEdu',
          body: "Un terrain de jeu interactif pour le cerveau, directement dans votre navigateur. Apprenez les bases de l'EEG avec les appareils Muse, sans installer de logiciel.",
          href: 'https://eegedu.com/',
          tags: ['Muse', 'Dans le navigateur'],
        },
      ],
    },
    hardware: {
      title: 'Matériel et trousses étudiantes',
      items: [
        {
          name: 'OpenBCI',
          body: 'La référence libre pour la recherche et la formation en ICM.',
          cta: 'Visiter la boutique',
          href: 'https://shop.openbci.com/',
        },
        {
          name: 'Backyard Brains',
          body: '« Neuroscience for Everyone. » Des SpikerBox abordables pour les salles de classe.',
          cta: 'Voir les trousses',
          href: 'https://backyardbrains.com/products/',
        },
        {
          name: 'PiEEG',
          body: "Des cartes d'extension Raspberry Pi pour lire l'EEG, l'EMG, l'ECG et plus encore.",
          cta: 'En savoir plus',
          href: 'https://pieeg.com/',
        },
        {
          name: 'Muse (InteraXon)',
          body: 'Des bandeaux EEG grand public très utilisés pour une recherche accessible.',
          cta: 'Acheter un Muse',
          href: 'https://choosemuse.com/',
        },
      ],
    },
    openHardware: {
      title: 'Matériel ouvert et fait maison',
      items: [
        {
          name: 'FreeEEG32 / 128',
          body: 'Fabriquez vos propres trousses EEG à grand nombre de canaux. (GitHub)',
          cta: 'Voir le code source',
          href: 'https://github.com/neuroidss/FreeEEG32-beta',
        },
        {
          name: 'OpenEIT (Spectra)',
          body: "Mind's Eye Biomedical. Tomographie par impédance électrique en source ouverte.",
          cta: 'Voir le projet',
          href: 'https://github.com/OPENEIT',
        },
      ],
      communitiesTitle: 'Communautés de matériel scientifique ouvert',
    },
    frontier: {
      title: 'Technologies émergentes et science communautaire',
      items: [
        {
          name: 'MedARC (Sophont)',
          body: "IA médicale multimodale ouverte. Un collectif de recherche en science communautaire qui bâtit des modèles de fondation pour la médecine.",
          cta: 'Rejoindre le collectif',
          href: 'https://medarc.ai/',
        },
        {
          name: 'Biopunk Lab',
          body: 'Un laboratoire communautaire de science citoyenne et de biologie à faire soi-même.',
          cta: 'Visiter le laboratoire',
          href: 'https://biopunklab.com/',
        },
        {
          name: 'OpenFlexure',
          body: 'Un microscope imprimable en 3D pour la science ouverte.',
          cta: "L'imprimer",
          href: 'https://openflexure.org/',
        },
        {
          name: 'Mind in Vitro',
          body: 'Une Expedition de la NSF : calculer avec des neurones vivants.',
          cta: 'Explorer la recherche',
          href: 'https://mindinvitro.illinois.edu/',
        },
      ],
    },
    pro: {
      title: 'Développement professionnel',
      eventsTitle: "Grands événements de l'été 2026",
      events: [
        {
          name: 'OHBM 2026 & Brainhack',
          org: 'Organization for Human Brain Mapping',
          when: '14 au 18 juin • Bordeaux, France',
          href: 'https://humanbrainmapping.org',
        },
        {
          name: 'FENS Forum',
          org: 'Federation of European Neuroscience Societies',
          when: 'Tous les deux ans • Europe',
          href: 'https://www.fens.org/meetings/fens-forum',
        },
        {
          name: 'Neuromatch Academy 2027',
          org: 'Neurosciences computationnelles et apprentissage profond',
          when: '5 au 23 juillet • En ligne',
          href: 'https://neuromatch.io/courses/',
        },
      ],
      springTitle: 'BCI & Neurotechnology Spring School 2027',
      springBody:
        "Le plus grand événement de formation en ligne sur les ICM revient en 2027 : plus de 140 heures de conférences, des hackathons et une certification, gratuitement. Organisé par g.tec.",
      springCta: 'Détails et inscription',
      queensTitle: "Université Queen's",
      queensBody:
        "Programme de microcertification en neurotech. Un partenariat subventionné avec NeuroTechX pour offrir des compétences pratiques en imagerie, en enregistrement et en éthique.",
      queensCta: 'Voir le programme',
      stackTitle: 'Outils modernes de science des données',
      ecosystem: "L'écosystème Python d'apprentissage automatique en neurosciences",
      sklearnBody: "La base de l'apprentissage automatique en Python.",
      nilearnBody: "L'apprentissage statistique pour la neuroimagerie (bâti sur scikit-learn).",
      moabbBody: 'The Mother of All BCI Benchmarks.',
      moabbPi: 'Chercheur principal :',
      moabbPaper: 'À lire : Learning from small datasets (atelier du BCI Meeting 2023)',
      probablBody: 'Certification professionnelle et maintenance de scikit-learn.',
      hfBody: "La communauté de l'IA qui bâtit l'avenir : modèles, jeux de données et Spaces.",
      hfModels: 'Modèles à souligner :',
      mindeyeBody: "Reconstruction d'images à partir de l'IRMf à la fine pointe (1 h d'entraînement).",
      pymcBody: 'La programmation probabiliste pour la modélisation bayésienne.',
      codabenchBody:
        "Des bancs d'essai et des défis reproductibles. La plateforme de nouvelle génération pour les compétitions de science ouverte.",
    },
    gsoc: {
      title: 'Google Summer of Code (GSoC)',
      currentTitle: 'Appel en cours (2026)',
      currentBody:
        "L'INCF lance un appel d'idées de projets et de mentors pour le GSoC 2026. Participez à cette initiative internationale de développement de logiciels libres.",
      currentCta: "Voir l'appel de propositions",
      pastTitle: 'Faits saillants passés',
      pastBefore: 'Les membres de NeuroTechX ont une longue tradition de contribution, dont le projet remarqué de',
      pastAfter: '.',
      archives: "Archives offertes par l'INCF",
    },
    partners: {
      title: 'Partenaires et pôles de recherche',
      items: [
        {
          name: 'Ontario Brain Institute',
          href: 'https://braininstitute.ca/',
          before: "Accélérer la découverte et l'innovation en neurosciences. Il abrite la plateforme de données ouvertes",
          strong: 'Brain-CODE',
          after: "et des programmes d'entrepreneuriat en neurotech.",
          tags: ['Pôle de recherche', 'Données ouvertes'],
        },
        {
          name: 'The BCI Guys',
          href: 'https://www.bciguys.com/',
          before: "Des vidéos divertissantes et éducatives sur les interfaces cerveau-machine. La principale plateforme médiatique au monde consacrée aux ICM.",
          strong: '',
          after: '',
          tags: ['Médias', 'Formation'],
        },
        {
          name: 'The NeuroSociety',
          href: 'https://www.neurosociety.center/',
          before: 'Une communauté internationale sans but lucratif à la croisée des neurosciences, de la technologie et de la société.',
          strong: '',
          after: '',
          tags: ['Communauté', 'Sans but lucratif'],
        },
      ],
    },
    videos: {
      title: 'Ressources vidéo',
      neurotech101Title: 'NeuroTech 101',
      neurotech101Body: 'Notions de base et tutoriels.',
      webinarsTitle: 'Série de webinaires',
      webinarsBody: "Des analyses approfondies avec des experts de l'industrie.",
      allTitle: 'Toutes les vidéos',
      allBody: 'Explorez toute notre vidéothèque sur YouTube.',
    },
  },
  {
    title: 'Education & Data',
    description:
      'The NeuroTech Primer, open neural datasets, open-source EEG analysis toolkits, FAIR standards, and curated learning paths.',
    eyebrow: 'Learn',
    subtitle: 'Curated learning resources and open standards for the community.',
    newHere: 'New to neurotech?',
    startHere: 'Start with our four-step path',
    micro: {
      label: 'Featured Programme · NeuroTechX Partner',
      title: 'NeuroTech Microcredential Program',
      body: "A professional neurotechnology credential led by Queen's University with York, Western and Nipissing universities, developed with support from the Province of Ontario. Online courses of about 50 hours each cover the neuroscience and neurotech primer, neuroelectronic recording and processing, neuroimaging, neuromodulation, behavioural assessment, neuro-entrepreneurship and neuroethics, followed by a two-week hands-on capstone on a partner campus.",
      audience: 'For students, researchers and professionals moving into neurotech. NeuroTechX is a partner on the programme.',
      coursesCta: 'See the courses',
      labCta: 'Neurotech Discovery Lab',
    },
    primer: {
      label: 'Featured Resource',
      title: 'The NeuroTech Primer',
      body: "The definitive beginner's guide to brain-computer interfaces and neurotechnology. Written by the community, for the community.",
      bookCta: 'Get the Book',
      pdfCta: 'Read PDF',
      coverAlt: 'The NeuroTech Primer Cover',
    },
    degrees: {
      title: 'Degree Programmes in Neurotechnology',
      lead: "Master's programmes and university networks dedicated to neurotechnology.",
      items: [
        {
          name: 'European Master in Neurotechnology',
          by: 'NeurotechEU: Bonn, Radboud, Miguel Hernández (Elche), Boğaziçi, Cluj-Napoca, Lille and Reykjavík',
          about:
            'A two-year, 120 ECTS joint master’s taught in English, with study at a second partner university and an interdisciplinary thesis. Starting in the 2027/28 academic year.',
          href: 'https://www.uni-bonn.de/en/news/210-2026',
        },
        {
          name: 'Master’s in Neurotechnology (MUNE)',
          by: 'Universidad Politécnica de Madrid',
          about:
            'A one-year master’s taught in English covering neuroscience, neurodevices, AI in neurotechnology, and neural signals and imaging, with a placement in the second semester. Aimed at biomedical engineering graduates; other backgrounds can join with bridging courses.',
          href: 'https://neurotec.upm.es/en/masters-of-science-in-neurotechnology/enrollment-procedure/',
        },
        {
          name: 'Master’s in Neuroscience and Neurotechnology',
          by: 'Universidad Autónoma de Madrid',
          about:
            'A one-year, 60 ECTS master’s taught in Spanish for graduates in science, health sciences or engineering, leading to research, industry or entrepreneurship.',
          href: 'https://www.uam.es/uam/en/master-universitario-neurociencia-neurotecnologia',
        },
        {
          name: 'NeurotechEU schools, internships and doctoral network',
          by: 'NeurotechEU, the European University for Brain and Technology',
          about:
            'Winter and autumn schools, innovation internships and a doctoral network across the alliance’s partner universities. Most are open to students of partner universities.',
          href: 'https://theneurotech.eu/',
        },
      ],
    },
    archives: {
      title: 'Open Data Archives',
      lead: 'We strongly believe in open science. Use these verified repositories for your research.',
      items: [
        {
          name: 'OpenNeuro',
          body: 'A free and open platform for sharing MRI, MEG, EEG, iEEG, and ECoG data.',
          href: 'https://openneuro.org/',
        },
        { name: 'NEMAR', body: 'Neuroelectromagnetic Data Archive and Tools.', href: 'https://nemar.org/' },
        {
          name: 'DANDI Archive',
          body: 'Distributed Archives for Neurophysiology Data Integration.',
          href: 'https://dandiarchive.org/',
        },
      ],
    },
    tools: {
      title: 'Open Source Analysis Tools',
      lead: 'Essential Python toolkits for neural signal processing and parameterization.',
      items: [
        {
          name: 'specparam (formerly FOOOF)',
          body: 'Fitting Oscillations & One-Over-F. Parametrizing neural power spectra.',
          href: 'https://fooof-tools.github.io/fooof/',
        },
        {
          name: 'NeuroDSP',
          body: 'Digital signal processing for neural time series. Filtering, spectral analysis, and simulation.',
          href: 'https://neurodsp-tools.github.io/neurodsp/',
        },
      ],
    },
    standards: {
      title: 'EEG Standards & Reproducibility',
      lead: 'Open standards and tooling for FAIR, reproducible EEG — from the EEG101 & INDoS COST Actions.',
      items: [
        {
          name: 'EEG Community Framework',
          body: 'Rigor, democratization & sustainability for open EEG science.',
          href: 'https://linktr.ee/eegcf',
        },
        {
          name: 'ARTEM-IS',
          body: 'Interactive web app for structured, standardized EEG/ERP methods reporting.',
          href: 'https://artemis.incf.org/',
        },
        {
          name: 'BIDS Manager',
          body: 'GUI for raw-to-BIDS curation across MRI, MEG & EEG datasets.',
          href: 'https://github.com/ANCPLabOldenburg/BIDS-Manager',
        },
        {
          name: 'MEEGqc',
          body: 'BIDS-aligned Python toolbox for MEG/EEG quality assessment & control.',
          href: 'https://github.com/ANCPLabOldenburg/MEGqc',
        },
      ],
    },
    devMeetings: {
      title: 'Developer Meetings',
      lead: 'Join the contributors building the next generation of open neurotech tools.',
      items: [
        {
          name: 'EEG-ExPy',
          body: 'Weekly developer meeting. Python EEG experiments.',
          href: 'https://github.com/neurotechx/eeg-expy',
        },
        {
          name: 'MOABB',
          body: 'Weekly developer meeting. Mother of All BCI Benchmarks.',
          href: 'https://github.com/NeuroTechX/moabb',
        },
      ],
    },
    gold: {
      title: 'Gold Standard Education',
      items: [
        {
          name: 'Neuromatch Academy',
          body: 'The gold standard for online computational neuroscience and deep learning education. Intensive, community-driven, and open.',
          href: 'https://neuromatch.io/courses/',
          tags: ['Computational Neuroscience', 'Deep Learning'],
        },
        {
          name: 'NeuroTech Course (Berkeley)',
          body: 'The original open-source neurotechnology curriculum. A comprehensive survey of biosignals, hardware, and labs from UC Berkeley.',
          href: 'https://github.com/neurotech-berkeley/neurotech-course',
          tags: ['University Curriculum', 'Labs & Hardware'],
        },
      ],
    },
    skills: {
      title: 'Foundational Skills & Workshops',
      items: [
        {
          name: 'Brainhack Global',
          body: 'Collaborative workshops for open brain science. A unique format that combines education, hackathons, and unconferences.',
          href: 'https://brainhack.org/',
          tags: ['Open Science', 'Global Events'],
        },
        {
          name: 'Software Carpentry',
          body: 'Teaching essential lab skills for research computing. The foundational "missing semester" of coding skills for scientists.',
          href: 'https://software-carpentry.org/',
          tags: ['Git & Shell', 'Python/R'],
        },
        {
          name: 'The Missing Semester (MIT)',
          body: 'The Missing Semester of Your Computer Science Education. Master the command line, use a powerful text editor, use fancy features of version control systems, and much more!',
          href: 'https://missing.csail.mit.edu/',
          tags: ['Shell', 'Vim/Git', 'Security'],
        },
        {
          name: 'CuttingEEG',
          body: 'Deep dive into MEEG methodology. Association promoting cutting-edge methods for EEG and MEG research through conferences and hands-on workshops.',
          href: 'https://cuttingeeg.org/',
          tags: ['Advanced Methodology', 'Signal Processing'],
        },
        {
          name: 'Luck Lab (ERP Info)',
          body: 'The gold standard for Event-Related Potential (ERP) methodology. Best practices for experimental design and analysis from Prof. Steve Luck.',
          href: 'https://lucklab.ucdavis.edu/blog/category/EEG%2FERP',
          tags: ['ERPs', 'Experimental Design'],
        },
        {
          name: 'Analyzing Neural Time Series Data',
          body: "The essential guide to spectral analysis and time-frequency dynamics. Mike X Cohen's definitive textbook on analyzing neural data.",
          href: 'https://direct.mit.edu/books/monograph/4013/Analyzing-Neural-Time-Series-DataTheory-and',
          tags: ['Time-Frequency', 'Spectral Analysis'],
        },
        {
          name: 'PURSUE',
          body: 'Preparing Undergraduates for Research in STEM Using Electrophysiology. Open teaching materials, datasets, and labs for semester-long courses.',
          href: 'https://pursue.richmond.edu/',
          tags: ['Undergraduate Research', 'Open Courseware'],
        },
        {
          name: 'Stuttgart Computational Cognitive Science (S-CCS)',
          body: 'Understanding human behavior and brain activity under realistic conditions. Advancing MEEG, Eye-Tracking, and VR methods with open tools like Unfold.',
          href: 'https://www.s-ccs.de/',
          tags: ['Computational Modeling', 'VR & Eye-Tracking'],
        },
      ],
    },
    interactive: {
      title: 'Interactive Learning',
      items: [
        {
          name: 'EEGEdu',
          body: 'An interactive brain playground in your browser. Learn EEG basics with Muse devices without installing software.',
          href: 'https://eegedu.com/',
          tags: ['Muse', 'Browser-Based'],
        },
      ],
    },
    hardware: {
      title: 'Hardware & Student Kits',
      items: [
        {
          name: 'OpenBCI',
          body: 'The open-source gold standard for BCI research and education.',
          cta: 'Visit Store',
          href: 'https://shop.openbci.com/',
        },
        {
          name: 'Backyard Brains',
          body: '"Neuroscience for Everyone." Affordable SpikerBoxes for classrooms.',
          cta: 'View Kits',
          href: 'https://backyardbrains.com/products/',
        },
        {
          name: 'PiEEG',
          body: 'Raspberry Pi shields for reading EEG, EMG, ECG, and more.',
          cta: 'Learn More',
          href: 'https://pieeg.com/',
        },
        {
          name: 'Muse (InteraXon)',
          body: 'Consumer-grade EEG headbands widely used for accessible research.',
          cta: 'Shop Muse',
          href: 'https://choosemuse.com/',
        },
      ],
    },
    openHardware: {
      title: 'Open Hardware & DIY',
      items: [
        {
          name: 'FreeEEG32 / 128',
          body: 'Manufacture your own high-channel EEG kits. (GitHub)',
          cta: 'View Source',
          href: 'https://github.com/neuroidss/FreeEEG32-beta',
        },
        {
          name: 'OpenEIT (Spectra)',
          body: "Mind's Eye Biomedical. Open-source Electrical Impedance Tomography.",
          cta: 'View Project',
          href: 'https://github.com/OPENEIT',
        },
      ],
      communitiesTitle: 'Open Science Hardware Communities',
    },
    frontier: {
      title: 'Frontier Tech & Community Science',
      items: [
        {
          name: 'MedARC (Sophont)',
          body: 'Open multimodal medical AI. A community science research collective building foundational models for medicine.',
          cta: 'Join Collective',
          href: 'https://medarc.ai/',
        },
        {
          name: 'Biopunk Lab',
          body: 'A community lab for citizen science and DIY biology.',
          cta: 'Visit Lab',
          href: 'https://biopunklab.com/',
        },
        {
          name: 'OpenFlexure',
          body: 'A 3D-printable microscope for open science.',
          cta: 'Print It',
          href: 'https://openflexure.org/',
        },
        {
          name: 'Mind in Vitro',
          body: 'NSF Expedition: Computing with living neurons.',
          cta: 'Explore Research',
          href: 'https://mindinvitro.illinois.edu/',
        },
      ],
    },
    pro: {
      title: 'Professional Development',
      eventsTitle: 'Major Summer 2026 Events',
      events: [
        {
          name: 'OHBM 2026 & Brainhack',
          org: 'Organization for Human Brain Mapping',
          when: 'June 14-18 • Bordeaux, France',
          href: 'https://humanbrainmapping.org',
        },
        {
          name: 'FENS Forum',
          org: 'Federation of European Neuroscience Societies',
          when: 'Every two years • Europe',
          href: 'https://www.fens.org/meetings/fens-forum',
        },
        {
          name: 'Neuromatch Academy 2027',
          org: 'Computational Neuroscience & Deep Learning',
          when: 'July 5–23 • Online',
          href: 'https://neuromatch.io/courses/',
        },
      ],
      springTitle: 'BCI & Neurotechnology Spring School 2027',
      springBody:
        'The largest online BCI education event, back in 2027. 140+ hours of lectures, hackathons, and certification for free. Organized by g.tec.',
      springCta: 'Details and registration',
      queensTitle: "Queen's University",
      queensBody:
        'Neurotech Micro-credential Program. A grant-funded partnership with NeuroTechX to deliver hands-on skills in imaging, recording, and ethics.',
      queensCta: 'View Program',
      stackTitle: 'Modern Data Science Stack',
      ecosystem: 'The Python Neuro-ML Ecosystem',
      sklearnBody: 'The foundation of machine learning in Python.',
      nilearnBody: 'Statistical learning for neuroimaging (built on scikit-learn).',
      moabbBody: 'The Mother of All BCI Benchmarks.',
      moabbPi: 'PI:',
      moabbPaper: 'Read: Learning from small datasets (BCI Meeting 2023 Workshop)',
      probablBody: 'Professional scikit-learn certification & maintenance.',
      hfBody: 'The AI community building the future. Models, datasets, and spaces.',
      hfModels: 'Notable Models:',
      mindeyeBody: 'State-of-the-art fMRI-to-image reconstruction (1hr training).',
      pymcBody: 'Probabilistic programming for Bayesian modeling.',
      codabenchBody:
        'Reproducible benchmarks and challenges. The next-generation platform for open science competitions.',
    },
    gsoc: {
      title: 'Google Summer of Code (GSoC)',
      currentTitle: 'Current Call (2026)',
      currentBody:
        'INCF is calling for project ideas and mentors for GSoC 2026. Join the global open-source development initiative.',
      currentCta: 'View Call for Proposals',
      pastTitle: 'Past Highlights',
      pastBefore: 'NeuroTechX members have a strong history of contribution, including the notable project by',
      pastAfter: '.',
      archives: 'Archives available via INCF',
    },
    partners: {
      title: 'Partners & Research Hubs',
      items: [
        {
          name: 'Ontario Brain Institute',
          href: 'https://braininstitute.ca/',
          before: 'Accelerating neuroscience discovery and innovation. Home to the',
          strong: 'Brain-CODE',
          after: 'open data platform and neurotech entrepreneurship programs.',
          tags: ['Research Hub', 'Open Data'],
        },
        {
          name: 'The BCI Guys',
          href: 'https://www.bciguys.com/',
          before: "Entertaining and educational videos on Brain-Computer Interfaces. The world's leading BCI media platform.",
          strong: '',
          after: '',
          tags: ['Media', 'Education'],
        },
        {
          name: 'The NeuroSociety',
          href: 'https://www.neurosociety.center/',
          before: 'A global non-profit community at the intersection of neuroscience, technology, and society.',
          strong: '',
          after: '',
          tags: ['Community', 'Non-Profit'],
        },
      ],
    },
    videos: {
      title: 'Video Resources',
      neurotech101Title: 'NeuroTech 101',
      neurotech101Body: 'Foundational concepts and tutorials.',
      webinarsTitle: 'Webinar Series',
      webinarsBody: 'Deep dives with industry experts.',
      allTitle: 'Browse All Videos',
      allBody: 'Explore our full library on YouTube.',
    },
  }
);
