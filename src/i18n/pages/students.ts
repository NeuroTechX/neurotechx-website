import { bilingual } from '../text';

export default bilingual(
  {
    title: 'Clubs étudiants',
    description:
      "Clubs étudiants universitaires en neurotechnologie liés à NeuroTechX — projets, compétitions et comment faire inscrire votre club.",
    subtitleLine1: 'La relève des innovateurs en neurotechnologie.',
    subtitleLine2: 'Découvrez les groupes menés par des étudiants dans des universités du monde entier.',
    addButton: 'Vous lancez un club ou voulez faire inscrire le vôtre? Lisez le guide',
    fundingBefore: 'Vous cherchez des bourses de voyage, des bourses de recherche ou du financement pour vos activités de rayonnement? Consultez les ',
    fundingLink: 'possibilités de financement',
    fundingAfter: '.',
    website: 'Site Web',
    contact: 'Contact',
    ctaTitle: 'Votre club ne figure pas dans la liste?',
    ctaReadThe: 'Lisez le ',
    ctaGuideLink: 'guide pour lancer un club étudiant',
    ctaThenWrite: ', puis écrivez à ',
    ctaWith:
      " en indiquant le nom de votre club, votre université, votre page Web et une adresse de contact. Si vous utilisez GitHub, vous pouvez aussi ouvrir une demande de tirage (pull request) :",
    codeStep1: '# 1. Faites un fork du dépôt et modifiez ce fichier :',
    codeStep2: "# 2. Ajoutez l'objet de votre club :",
    editOnGithub: 'Modifier sur GitHub',
    historyTitle: 'Une compétition depuis 2016',
    historyBody:
      "La compétition des clubs étudiants a commencé en 2016 avec un projet pilote de cinq clubs à Montréal et à Toronto. À l'époque, des universités refusaient les clubs de neurotech parce qu'ils n'avaient pas de compétition. La compétition annuelle a donné aux étudiants une raison de s'organiser et de fonder leur club.",
    historyLink: "Lire l'histoire de la compétition",
    projectsHeading: 'Idées de projets de session selon votre budget',
    projectsLead:
      "Pas besoin d'un laboratoire coûteux pour démarrer un club. Voici trois façons concrètes de lancer un premier projet étudiant :",
    projectTiers: [
      {
        budget: '0 $ · Logiciel et données ouvertes',
        title: 'Classifieur ICM et bancs d’essai',
        body: "Téléchargez des jeux de données EEG publics avec MNE-Python ou MOABB (imagerie motrice, P300, sommeil) et entraînez un classifieur reproductible ou participez à un défi ouvert.",
        cta: 'Voir les cours et défis',
        href: '/learn',
      },
      {
        budget: '200–400 $ · EEG grand public / DIY',
        title: 'Détection d’état ou contrôle en temps réel',
        body: "Utilisez un bandeau EEG accessible ou un module PiEEG avec Lab Streaming Layer (LSL) pour piloter un jeu simple, visualiser les ondes alpha ou tester un protocole PRE.",
        cta: 'Consulter les projets libres',
        href: '/projects',
      },
      {
        budget: '1 000 $+ · Matériel multi-canaux',
        title: 'Prototypes de recherche et compétitions',
        body: "Montez un système OpenBCI ou un capteur hybride EEG/EMG pour des applications d'accessibilité, de prothétique ou les compétitions étudiantes internationales.",
        cta: 'Sécurité et éthique avant de tester',
        href: '/safety-and-ethics',
      },
    ],
  },
  {
    title: 'Student Clubs',
    description:
      'University neurotechnology student clubs connected with NeuroTechX — projects, competitions, and how to list your club.',
    subtitleLine1: 'The next generation of neurotechnology innovators.',
    subtitleLine2: 'Explore student-led groups from universities around the world.',
    addButton: 'Starting a club, or want yours listed? Read the guide',
    fundingBefore: 'Looking for travel grants, fellowships or outreach funding? See ',
    fundingLink: 'funding opportunities',
    fundingAfter: '.',
    website: 'Website',
    contact: 'Contact',
    ctaTitle: "Don't see your club?",
    ctaReadThe: 'Read the ',
    ctaGuideLink: 'guide to starting a student club',
    ctaThenWrite: ', then write to ',
    ctaWith:
      " with your club's name, university, web page and contact address. If you use GitHub, you can also open a pull request:",
    codeStep1: '# 1. Fork the repo & edit this file:',
    codeStep2: '# 2. Add your club object:',
    editOnGithub: 'Edit on GitHub',
    historyTitle: 'A competition since 2016',
    historyBody:
      'The student club competition started in 2016 with a pilot of five clubs in Montréal and Toronto. At the time, some universities turned down neurotech clubs because there was no competition for them. The annual competition gave students a reason to organize and start their clubs.',
    historyLink: 'Read the history of the competition',
    projectsHeading: 'Starter semester projects by budget',
    projectsLead:
      'You do not need an expensive lab to launch an active student club. Three practical tiers for your first semester:',
    projectTiers: [
      {
        budget: '$0 · Software & open data',
        title: 'BCI classifier & open benchmarks',
        body: 'Pull public EEG datasets with MNE-Python or MOABB (motor imagery, P300, sleep staging), reproduce a baseline pipeline, or enter an open community challenge.',
        cta: 'Start with our lessons',
        href: '/learn',
      },
      {
        budget: '$200–400 · Entry EEG / DIY',
        title: 'Real-time demos & LSL prototypes',
        body: 'Pair an accessible EEG headband or PiEEG board with Lab Streaming Layer (LSL) to build an alpha-wave visualizer, blink-controlled game, or simple ERP demo.',
        cta: 'Explore open-source tools',
        href: '/projects',
      },
      {
        budget: '$1,000+ · Multi-channel research kits',
        title: 'Assistive tech & competition builds',
        body: 'Build with OpenBCI or hybrid EEG/EMG hardware for assistive interfaces, neurofeedback, or international student competitions like Global NeuroHack.',
        cta: 'Read safety & ethics first',
        href: '/safety-and-ethics',
      },
    ],
  }
);
