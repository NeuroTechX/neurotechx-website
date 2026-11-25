import { bilingual } from '../text';

// Card links: `href` is an English route path (localized by the page) or a full URL.
export default bilingual(
  {
    title: 'À propos',
    description:
      "Notre histoire, nos origines, notre conseil d'administration et notre équipe — comment NeuroTechX, née à Montréal en 2015, est devenue la plus grande communauté internationale en neurotechnologie.",
    viewOnInstagram: 'Voir sur Instagram',
    photoAlt: 'Événement NeuroTechX {n}',
    storyTitle: 'Notre histoire',
    storyLead:
      "NeuroTechX a été cofondée en 2015 par Yannick Roy, Sydney Swaine-Simon, Marion Le Borgne, Melanie Segado et Ferdinand Ephrem — une équipe d'ingénieurs et de scientifiques qui avaient constaté un manque : aucun pont ne reliait le monde universitaire rigoureux des neurosciences et la culture pratique et rapide des passionnés de technologie.",
    storyBody:
      "Ce qui a commencé comme un petit groupe de bidouilleurs à Montréal est rapidement devenu la plus grande communauté internationale en neurotechnologie. Notre mission repose toujours sur trois piliers : la communauté, la formation et le développement professionnel. Nous continuons de bâtir une communauté ouverte et internationale vouée à l'avancement de la neurotechnologie.",
    originsTitle: 'Nos origines',
    originsLead:
      "NeuroTechX s'appuie sur le travail de pionniers. Nous saluons les fondateurs et les sources dont les contributions libres ont posé les bases techniques de notre communauté internationale.",
    origins: [
      {
        title: 'Paris : CogLab',
        label: 'Pilier historique',
        body: 'Fondé en 2013 à La Paillasse, CogLab a été le pionnier du modèle de « laboratoire communautaire », explorant les sciences cognitives grâce au matériel fait maison et à la science citoyenne ouverte.',
        links: [{ label: 'Visiter CogLab', href: 'https://coglab.fr/' }],
      },
      {
        title: 'San Francisco : Berkeley CogTech',
        label: 'Pilier historique',
        body: "Le Cognitive Technology Group de Berkeley, une association étudiante déterminante, a posé les jalons de ce qui allait devenir NeuroTech@Berkeley.",
        links: [{ label: 'Voir le projet', href: 'http://www.explorecogtech.com/' }],
      },
      {
        title: 'Montréal : atelier au District 3',
        label: 'Jalon éducatif (2018)',
        body: "L'atelier « Deep Learning for EEG » à l'Université Concordia a fait le pont entre le traitement du signal brut et l'apprentissage automatique moderne.",
        links: [{ label: 'Voir le matériel', href: 'https://github.com/NeuroTechX/bci-workshop' }],
      },
      {
        title: 'International : muse-lsl et eeg-notebooks',
        label: 'Jalon technique',
        body: "En démocratisant l'accès aux données EEG, muse-lsl et eeg-notebooks ont permis des études à grande échelle et des protocoles d'hyperscanning partout dans le monde.",
        links: [{ label: 'eeg-notebooks', href: 'https://github.com/NeuroTechX/eeg-notebooks' }],
      },
      {
        title: 'Science ouverte : MOABB',
        label: 'Jalon technique',
        body: "Le projet Mother of All BCI Benchmarks (MOABB) a établi une nouvelle norme de reproductibilité en recherche sur les ICM, avec un cadre complet pour comparer les jeux de données.",
        links: [{ label: 'Voir MOABB', href: 'https://github.com/NeuroTechX/moabb' }],
      },
      {
        title: 'NeuroTechX Services',
        label: 'Jalon stratégique (2019 à 2024)',
        body: "Lancé en 2019, NTX Services offrait des services-conseils spécialisés à l'industrie de la neurotech. Sa transition en 2024 a marqué un tournant et permis à NeuroTechX de se recentrer sur la science ouverte portée par la communauté.",
        links: [{ label: 'Lire la déclaration commune', href: '/ntx-services-partnership-termination' }],
      },
      {
        title: "Université Queen's",
        label: 'Jalon stratégique (2026)',
        body: "Un partenariat subventionné pour lancer le programme de microcertification en neurotechnologie, une nouvelle référence en formation pratique.",
        links: [{ label: 'Voir le programme', href: 'https://neurotechmicrocreds.com/' }],
      },
    ],
    boardTitle: "Conseil d'administration",
    board: [
      {
        name: 'Morgan Hough',
        role: 'Administrateur',
        body: "Spécialiste en neurologie clinique (Oxford) et en biophysique (Reed), Morgan a cofondé NeuroFedora et fait le lien entre la recherche scientifique et le développement de logiciels libres.",
      },
      {
        name: 'John Griffiths, Ph. D.',
        role: 'Administrateur',
        body: "Professeur adjoint à l'Université de Toronto, John se spécialise dans la modélisation mathématique de la dynamique cérébrale et l'analyse en neuroimagerie.",
      },
      {
        name: 'Susan Boehnke, Ph. D.',
        role: 'Administratrice',
        body: "Professeure agrégée à l'Université Queen's et directrice du programme de microcertification en neurotechnologie, elle dirige des initiatives en éthique et en formation.",
      },
    ],
    officersTitle: 'Dirigeants et équipe',
    officers: [
      {
        name: 'Han Cat Nguyen',
        role: 'Dirigeant',
        body: 'Ingénieur biomédical, spécialiste de la conception de biocapteurs et du matériel de neurotechnologie fait maison.',
      },
      {
        name: 'Dhruv Mehrotra',
        role: 'Dirigeant',
        body: "Chercheur en neurosciences et développeur de Pynapple, il s'intéresse à l'activité cérébrale spontanée et à la prise de décision.",
      },
      {
        name: 'Sophie Valentine',
        role: 'Responsable du Content Lab',
        body: "Psychologue expérimentale, elle dirige le Content Lab de NTX et s'intéresse à l'innovation en santé numérique.",
      },
    ],
    joinTeam: "Joindre l'équipe : voir les rôles à pourvoir",
  },
  {
    title: 'About',
    description:
      'Our story, origins, board of directors, and leadership — how NeuroTechX grew from Montreal in 2015 into the largest global neurotechnology community.',
    viewOnInstagram: 'View on Instagram',
    photoAlt: 'NeuroTechX Event {n}',
    storyTitle: 'Our Story',
    storyLead:
      'NeuroTechX was co-founded in 2015 by Yannick Roy, Sydney Swaine-Simon, Marion Le Borgne, Melanie Segado, and Ferdinand Ephrem — a dedicated team of engineers and scientists who recognized a critical gap: the lack of a bridge between the rigorous academic world of neuroscience and the fast-paced, hands-on culture of technology enthusiasts.',
    storyBody:
      'What began as a small group of hackers in Montreal quickly evolved into the largest global community for neurotechnology. Our mission remains centered on three pillars: Community, Education, and Professional Development. We continue to foster an open, global community dedicated to the advancement of neurotechnology.',
    originsTitle: 'Our Origins',
    originsLead:
      'NeuroTechX stands on the shoulders of giants. We acknowledge the founders and intellectual sources whose open-source contributions laid the technical foundation for our global community.',
    origins: [
      {
        title: 'Paris: CogLab',
        label: 'Historical Pillar',
        body: 'Founded in 2013 at La Paillasse, CogLab pioneered the "Community Lab" model, exploring cognitive science through DIY hardware and open citizen science.',
        links: [{ label: 'Visit CogLab', href: 'https://coglab.fr/home-en/' }],
      },
      {
        title: 'San Francisco: Berkeley CogTech',
        label: 'Historical Pillar',
        body: 'The Cognitive Technology Group at Berkeley was a seminal student organization that set the standard for what would become NeuroTech@Berkeley.',
        links: [{ label: 'Visit Project', href: 'http://www.explorecogtech.com/' }],
      },
      {
        title: 'Montreal: District 3 Workshop',
        label: 'Educational Milestone (2018)',
        body: 'The "Deep Learning for EEG" workshop at Concordia University bridged the gap between raw signal processing and modern machine learning.',
        links: [{ label: 'View Materials', href: 'https://github.com/NeuroTechX/bci-workshop' }],
      },
      {
        title: 'Global: muse-lsl & eeg-notebooks',
        label: 'Technical Milestone',
        body: 'The democratized access to EEG data through muse-lsl and eeg-notebooks enabled large-scale studies and hyperscanning protocols worldwide.',
        links: [{ label: 'eeg-notebooks', href: 'https://github.com/NeuroTechX/eeg-notebooks' }],
      },
      {
        title: 'Open Science: MOABB',
        label: 'Technical Milestone',
        body: 'The Mother of All BCI Benchmarks (MOABB) project set a new standard for reproducibility in BCI research, providing a comprehensive framework for dataset benchmarking.',
        links: [{ label: 'View MOABB', href: 'https://github.com/NeuroTechX/moabb' }],
      },
      {
        title: 'NeuroTechX Services',
        label: 'Strategic Milestone (2019 - 2024)',
        body: 'Launched in 2019, NTX Services provided expert advisory to the neurotech industry. Its successful operation and eventual transition in 2024 marked a pivotal moment, enabling the core NeuroTechX organization to redouble its commitment to community-driven open science.',
        links: [{ label: 'Read the joint statement', href: '/ntx-services-partnership-termination' }],
      },
      {
        title: "Queen's University",
        label: 'Strategic Milestone (2026)',
        body: 'A grant-funded partnership to launch the Neurotech Micro-credential Program, setting a new standard for hands-on neurotechnology education.',
        links: [{ label: 'Visit Program', href: 'https://neurotechmicrocreds.com/' }],
      },
    ],
    boardTitle: 'Board of Directors',
    board: [
      {
        name: 'Morgan Hough',
        role: 'Director',
        body: 'A specialist in Clinical Neurology (Oxford) and Biophysics (Reed), Morgan co-founded NeuroFedora and bridges scientific research with open-source development.',
      },
      {
        name: 'John Griffiths, PhD',
        role: 'Director',
        body: 'Assistant Professor at the University of Toronto, John specializes in mathematical modeling of brain dynamics and neuroimaging analysis.',
      },
      {
        name: 'Susan Boehnke, PhD',
        role: 'Director',
        body: "Associate Professor at Queen's University and Director of the NeuroTech Micro-credential Program, leading ethics and education initiatives.",
      },
    ],
    officersTitle: 'Officers & Leadership',
    officers: [
      {
        name: 'Han Cat Nguyen',
        role: 'Officer',
        body: 'A biomedical engineer expert in biosensor design and DIY neurotechnology hardware development.',
      },
      {
        name: 'Dhruv Mehrotra',
        role: 'Officer',
        body: 'Neuroscience researcher and developer of Pynapple, focusing on spontaneous brain activity and decision-making.',
      },
      {
        name: 'Sophie Valentine',
        role: 'Content Lab Lead',
        body: 'Experimental psychologist leading the NTX Content Laboratory with a focus on digital health innovation.',
      },
    ],
    joinTeam: 'Join the team: see the roles we would like to fill',
  }
);
