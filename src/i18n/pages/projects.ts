import { bilingual } from '../text';

// The challenge entries themselves (name, organiser, about, prize, timing, standings) come from
// src/data/challenges.ts and are not translated here.
export default bilingual(
  {
    title: 'Projets libres',
    description:
      "Bancs d'essai ICM libres, boîtes à outils en EEG et en neuroimagerie, et dépôts communautaires de NeuroTechX et de contributeurs du monde entier.",
    eyebrow: 'Créer',
    titleStart: 'Projets ',
    titleHighlight: 'libres',
    subtitleBefore:
      "Découvrez les outils qui propulsent la prochaine génération de la neurotechnologie. Ajoutez votre projet en associant le sujet ",
    subtitleAfter: ' à votre dépôt GitHub.',
    challengesTitle: 'Défis ouverts et classements',
    challengesLead:
      "Des bancs d'essai aux données de test scellées, où les méthodes ouvertes s'affrontent à armes égales.",
    prize: 'Prix : ',
    leaderboardAsOf: 'Classement, {asOf}',
    liveLeaderboard: 'Classement en direct',
    howToEnter: 'Règlement et inscription',
    featuredTitle: 'Projets en vedette',
    communityTitle: 'Projets de la communauté',
    researchTitle: 'Recherche et références',
    viewCode: 'Voir le code',
    visitWebsite: 'Visiter le site',
    readArticle: "Lire l'article",
    learnMore: 'En savoir plus',
    sci: {
      description:
        "Modèles anatomiques de la tête à haute résolution pour l'imagerie des sources électromagnétiques et la stimulation.",
      topics: ['modèle de tête', 'IRM', 'segmentation'],
      kind: 'Ressource',
    },
    pieegxr: {
      description:
        "Interface neuronale pour la réalité étendue, par PiEEG, membre de la communauté : 16 canaux EEG, EMG et ECG (deux ADS1299 de TI, 24 bits), électrodes faciales et électrodes sèches sur le cortex visuel, pour Meta Quest et d'autres casques. Matériel et logiciel libres. Campagne Kickstarter en tout ou rien jusqu'au 31 décembre 2026.",
      topics: ['matériel libre', 'EEG', 'RV'],
      kind: 'Kickstarter',
      back: 'Soutenir sur Kickstarter',
    },
    openvibe: {
      description:
        "Logiciel pour les interfaces cerveau-machine et les neurosciences en temps réel. Une plateforme graphique pour concevoir des scénarios d'ICM.",
      topics: ['C++', 'Temps réel', 'ICM'],
      kind: 'Plateforme',
    },
    spd: {
      description:
        "Réduction de dimension riemannienne pour les matrices de covariance. Un outil essentiel pour le traitement avancé des signaux en ICM.",
      topics: ['Riemannien', 'Apprentissage automatique', 'ICM'],
    },
    nature: {
      description:
        "Une interface neuromotrice à large bande passante qui se généralise d'emblée et avec efficacité d'une personne à l'autre. Par Reality Labs de Meta.",
      topics: ['IHM', 'EMG', 'neuromoteur'],
      kind: 'Article',
    },
    braincode: {
      description:
        "Une plateforme de neuroinformatique à grande échelle pour la gestion et le partage des données. Elle rend possible la recherche collaborative sur le cerveau partout au Canada.",
      topics: ['Informatique', 'Données ouvertes'],
      kind: 'Plateforme',
    },
    nerve: {
      name: 'Programme NERVE',
      description:
        'Neurotech Entrepreneurship to Validate Emerging Innovations. Un programme de soutien aux jeunes pousses et aux entrepreneurs en neurotech.',
      topics: ['Entrepreneuriat', 'Jeune pousse'],
      kind: 'Programme',
    },
  },
  {
    title: 'Open Source Projects',
    description:
      'Open-source BCI benchmarks, EEG/neuroimaging toolkits, and community repositories from NeuroTechX and contributors worldwide.',
    eyebrow: 'Build',
    titleStart: 'Open Source ',
    titleHighlight: 'Projects',
    subtitleBefore:
      'Discover the tools powering the next generation of neurotechnology. Add your project by tagging your GitHub repository with ',
    subtitleAfter: '.',
    challengesTitle: 'Open Challenges & Leaderboards',
    challengesLead: 'Benchmarks with sealed test data, where open methods compete on the same footing.',
    prize: 'Prize: ',
    leaderboardAsOf: 'Leaderboard, {asOf}',
    liveLeaderboard: 'Live leaderboard',
    howToEnter: 'Rules and how to enter',
    featuredTitle: 'Featured Projects',
    communityTitle: 'Community Projects',
    researchTitle: 'Research & References',
    viewCode: 'View Code',
    visitWebsite: 'Visit Website',
    readArticle: 'Read Article',
    learnMore: 'Learn More',
    sci: {
      description:
        'High-resolution anatomical head models for electromagnetic source imaging and stimulation.',
      topics: ['head-model', 'mri', 'segmentation'],
      kind: 'Resource',
    },
    pieegxr: {
      description:
        'A neural interface for extended reality from community member PiEEG: 16 channels of EEG, EMG and ECG (dual TI ADS1299, 24-bit), facial electrodes and dry electrodes over the visual cortex, for Meta Quest and other headsets. Open-source hardware and software. All-or-nothing Kickstarter campaign until December 31, 2026.',
      topics: ['open hardware', 'EEG', 'VR'],
      kind: 'Kickstarter',
      back: 'Back it on Kickstarter',
    },
    openvibe: {
      description:
        'Software for Brain-Computer Interfaces and Real-Time Neurosciences. A graphical platform for designing BCI scenarios.',
      topics: ['C++', 'Real-Time', 'BCI'],
      kind: 'Platform',
    },
    spd: {
      description:
        'Riemannian dimension reduction for covariance matrices. Essential for advanced BCI signal processing.',
      topics: ['Riemannian', 'Machine Learning', 'BCI'],
    },
    nature: {
      description:
        'A high-bandwidth neuromotor interface offering performant out-of-the-box generalization across people. By Reality Labs at Meta.',
      topics: ['HCI', 'EMG', 'neuromotor'],
      kind: 'Paper',
    },
    braincode: {
      description:
        'A large-scale neuroinformatics platform for data management and sharing. Enables collaborative brain research across Canada.',
      topics: ['Informatics', 'Open Data'],
      kind: 'Platform',
    },
    nerve: {
      name: 'NERVE Program',
      description:
        'Neurotech Entrepreneurship to Validate Emerging Innovations. Supporting neurotech startups and entrepreneurs.',
      topics: ['Entrepreneurship', 'Startup'],
      kind: 'Program',
    },
  },
);
