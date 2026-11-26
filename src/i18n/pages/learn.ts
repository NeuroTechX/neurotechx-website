import { bilingual } from '../text';

// Links starting with '/' are pages on this site; the others open the outside resource.
export default bilingual(
  {
    title: 'Par où commencer en neurotech',
    description:
      "Comment commencer à apprendre la neurotechnologie : un parcours en quatre étapes selon votre formation, avec des ressources gratuites, des données ouvertes et la communauté NeuroTechX.",
    eyebrow: 'Apprendre',
    subtitle:
      "La question qu'on nous pose le plus souvent. Voici notre réponse : quatre étapes, des ressources gratuites et un parcours adapté à votre formation.",
    noNeed:
      "Pas besoin d'un diplôme en neurosciences ni d'un casque EEG pour commencer. La plupart des gens commencent avec un livre gratuit, des données ouvertes et un ordinateur portable.",
    step: 'Étape',
    english: 'en anglais',
    steps: {
      understand: {
        title: 'Comprendre le domaine',
        lead: "Pour tout le monde. Comptez quelques soirées pour avoir une vue d'ensemble : comment on mesure et stimule le cerveau, qui fait quoi, et les questions éthiques.",
        items: [
          {
            name: 'The NeuroTech Primer',
            body: "Notre livre d'initiation, gratuit en PDF. Commencez par l'histoire, l'EEG et le dernier chapitre, « Where to Start ».",
            href: '/primer',
            english: true,
          },
          {
            name: 'NeuroTech 101 (vidéos)',
            body: 'Les notions de base et des tutoriels sur la chaîne YouTube de NeuroTechX.',
            href: 'https://www.youtube.com/@neurotechx',
            english: true,
          },
          {
            name: 'Webinaires NeuroTechX',
            body: "Des entreprises et des laboratoires présentent leur travail. Une bonne façon de voir à quoi ressemble le domaine aujourd'hui.",
            href: '/education/webinars',
            english: true,
          },
        ],
      },
      track: {
        title: 'Choisir votre parcours',
        lead: "Ensuite, mettez les mains dans les signaux du cerveau. Choisissez le parcours qui ressemble à votre formation; vous pourrez toujours en changer.",
        tracks: [
          {
            title: 'Vous programmez',
            body: "Travaillez avec de vrais enregistrements EEG publics, sans matériel.",
            items: [
              {
                name: 'Tutoriels MNE-Python',
                body: "L'outil de référence en Python pour lire, filtrer et analyser l'EEG et la MEG.",
                href: 'https://mne.tools/stable/auto_tutorials/index.html',
                english: true,
              },
              {
                name: 'OpenNeuro',
                body: "Des centaines de jeux de données EEG, MEG et IRM ouverts, au format BIDS.",
                href: 'https://openneuro.org/',
                english: true,
              },
            ],
          },
          {
            title: 'Vous venez des neurosciences, de la psychologie ou de la biologie',
            body: 'Apprenez les outils de programmation, puis les méthodes d’analyse des signaux.',
            items: [
              {
                name: 'Software Carpentry',
                body: 'Python, le terminal et Git pour les scientifiques, en partant de zéro.',
                href: 'https://software-carpentry.org/',
                english: true,
              },
              {
                name: 'Neuromatch Academy',
                body: 'Des cours en ligne intensifs et gratuits en neurosciences computationnelles.',
                href: 'https://neuromatch.io/courses/',
                english: true,
              },
              {
                name: 'NeuroTech Course',
                body: "Un cours en ligne gratuit, financé par les NIH, sur le transfert et la commercialisation des neurotechnologies, avec certificat.",
                href: 'https://www.neurotechcourse.org/',
                english: true,
              },
              {
                name: 'Luck Lab (ERP Info)',
                body: 'Les bonnes pratiques de conception expérimentale et d’analyse des potentiels évoqués.',
                href: 'https://lucklab.ucdavis.edu/blog/category/EEG%2FERP',
                english: true,
              },
            ],
          },
          {
            title: 'Vous aimez le matériel et l’électronique',
            body: 'Enregistrez vos propres signaux avec une trousse abordable.',
            items: [
              {
                name: 'Backyard Brains',
                body: 'Des SpikerBox pour enregistrer des signaux musculaires et nerveux, pensées pour les salles de classe.',
                href: 'https://backyardbrains.com/products/',
                english: true,
              },
              {
                name: 'OpenBCI',
                body: 'Le matériel EEG libre le plus utilisé en recherche et en formation.',
                href: 'https://shop.openbci.com/',
                english: true,
              },
              {
                name: 'PiEEG',
                body: "Une carte d'extension Raspberry Pi pour lire l'EEG, l'EMG et l'ECG.",
                href: 'https://pieeg.com/',
                english: true,
              },
            ],
          },
          {
            title: 'Vous ne faites pas de technique',
            body: "Politiques publiques, éthique, droit, affaires ou design : le domaine a autant besoin de vous.",
            items: [
              {
                name: 'The NeuroTech Primer : le domaine au-delà du labo',
                body: "Les chapitres sur le marché, l'écosystème, les défis du domaine et la neuroéthique.",
                href: '/primer',
                english: true,
              },
              {
                name: "Veille de l'industrie",
                body: 'Les nouvelles, le financement et les tendances du secteur, chaque jour.',
                href: '/reports',
                english: false,
              },
              {
                name: "Carte de l'écosystème",
                body: 'Les entreprises, les laboratoires et les organismes de la neurotech dans le monde.',
                href: '/ecosystem',
                english: false,
              },
            ],
          },
        ],
      },
      build: {
        title: 'Construire quelque chose',
        lead: "On apprend le plus en faisant un vrai projet. Commencez petit : reproduire une expérience connue, c'est déjà un projet.",
        items: [
          {
            name: 'Défis NeuroTechX',
            body: 'Des défis ouverts avec des données, des règles et des classements.',
            href: '/projects#challenges',
            english: false,
          },
          {
            name: 'EEG-ExPy',
            body: 'Reproduisez des expériences EEG classiques (P300, N170, SSVEP) avec un Muse ou un OpenBCI. Projet de NeuroTechX.',
            href: 'https://github.com/neurotechx/eeg-expy',
            english: true,
          },
          {
            name: 'MOABB',
            body: "Comparez des algorithmes d'ICM sur des jeux de données publics. Projet de NeuroTechX, avec des rencontres de développeurs chaque semaine.",
            href: 'https://github.com/NeuroTechX/moabb',
            english: true,
          },
          {
            name: 'Brainhack Global',
            body: 'Des hackathons de science ouverte du cerveau partout dans le monde, ouverts aux débutants.',
            href: 'https://brainhack.org/',
            english: true,
          },
        ],
      },
      people: {
        title: 'Trouver votre monde',
        lead: "On apprend plus vite avec d'autres. Joignez-vous à une section locale ou à un club étudiant, ou fondez-en un.",
        items: [
          {
            name: 'Sections locales',
            body: 'Des rencontres, des ateliers et des hackathons dans plus de 30 villes.',
            href: '/community',
            english: false,
          },
          {
            name: 'Clubs étudiants',
            body: 'Des équipes étudiantes qui bâtissent des projets et participent à des compétitions.',
            href: '/students',
            english: false,
          },
          {
            name: 'Événements',
            body: 'Les prochains événements de NeuroTechX et de nos partenaires.',
            href: '/events',
            english: false,
          },
          {
            name: 'Infolettre',
            body: 'Les nouvelles de la communauté, les événements et les occasions à saisir.',
            href: '/newsletter',
            english: false,
          },
        ],
      },
    },
    lessons: {
      eyebrow: 'Cours en ligne',
      title: 'Les cours NeuroTechX',
      lead: "Deux modules gratuits, écrits par des bénévoles de NeuroTechX pour NeuroTechEDU et maintenant publiés ici. Les textes sont en anglais.",
      modules: { bci: 'ICM 101', neuro: 'Neurosciences 101' },
      credits: 'Rédigés et révisés par',
      creditsMore: 'et les autres contributeurs sur GitHub',
      moduleLead: {
        bci: "Ce qu'est une interface cerveau-machine, du casque EEG au prétraitement, à l'extraction de caractéristiques et à l'apprentissage automatique.",
        neuro: 'Un survol du système nerveux, de ses cellules, de son anatomie et de ses maladies.',
      },
    },
    lesson: {
      back: '← Apprendre',
      lessonOf: 'Leçon {n} de {total}',
      origin: 'Écrit par des bénévoles de NeuroTechX pour NeuroTechEDU (2017–2020) et publié ici en 2026.',
      original: 'Page originale',
      improve: 'Proposer une correction sur GitHub',
      by: 'Par',
    },
    launch: {
      eyebrow: 'Et ensuite',
      title: 'De la formation à la jeune pousse',
      lead: "Vous voulez transformer une idée en produit? Ces programmes s'enchaînent bien. Les étapes 1 et 2 peuvent se faire dans l'ordre qui vous convient : commencez par l'étape 2 si vous venez du génie, par l'étape 1 si vous venez des neurosciences ou de la clinique.",
      stages: [
        {
          title: 'Apprendre le chemin vers le marché',
          body: 'Réglementation, essais cliniques, propriété intellectuelle, financement et remboursement.',
          items: [
            {
              name: 'NeuroTech Course',
              body: "Cours en ligne gratuit et à votre rythme, financé par les NIH, avec certificat en transfert des neurotechnologies et un atelier pratique.",
              href: 'https://www.neurotechcourse.org/',
              english: true,
            },
          ],
        },
        {
          title: 'Approfondir, avec une attestation',
          body: "L'enregistrement, la neuroimagerie, la neuromodulation, l'entrepreneuriat et l'éthique, puis un projet pratique.",
          items: [
            {
              name: 'NeuroTech Microcredential Program',
              body: "Queen's, Western, York et Nipissing. Modules en ligne d'environ 50 heures et projet intégrateur facultatif de deux semaines sur un campus.",
              href: 'https://neurotechmicrocreds.com/',
              english: true,
            },
          ],
        },
        {
          title: 'Former une équipe et une entreprise',
          body: 'Partir d’un vrai besoin clinique, bâtir le modèle d’affaires et présenter devant des investisseurs.',
          items: [
            {
              name: 'NeuroDesign Entrepreneurs Workshop',
              body: "Atelier annuel à Cleveland (septembre), désormais aussi à Munich, avec des mentors de l'industrie. Gratuit pour les étudiants admis.",
              href: 'https://www.clevelandneurodesign.com/',
              english: true,
            },
          ],
        },
        {
          title: 'Accélérer',
          body: 'Financement, mentorat et premiers essais avec des patients.',
          items: [
            {
              name: 'Accélérateurs et financement',
              body: "NERVE et NERD de l'Ontario Brain Institute, le volet Neuro du Creative Destruction Lab, l'accélérateur de MSWA à Perth, NeuroTech Harbor et d'autres, avec leurs dates limites.",
              href: '/funding',
              english: false,
            },
          ],
        },
      ],
    },
    further: {
      title: 'Pour aller plus loin',
      body: "Microcertification, programmes de maîtrise, données ouvertes, outils d'analyse et écoles d'été : toutes nos ressources choisies sont sur la page Formation.",
      cta: 'Voir toutes les ressources',
    },
    faq: {
      title: 'Questions fréquentes',
      items: [
        {
          q: "Faut-il une formation en neurosciences ou en génie?",
          a: "Non. Des membres de NeuroTechX viennent de l'informatique, de la psychologie, du design, du droit et des affaires. Choisissez le parcours de l'étape 2 qui part de ce que vous savez déjà.",
        },
        {
          q: 'Dois-je acheter un casque EEG?',
          a: "Pas pour commencer. Les jeux de données ouverts permettent d'apprendre l'analyse sans matériel. Si vous voulez enregistrer vos propres signaux plus tard, une SpikerBox ou un bandeau Muse sont des points d'entrée abordables.",
        },
        {
          q: 'Y a-t-il des ressources en français?',
          a: "La plupart de ces ressources sont en anglais; nous l'indiquons à côté de chacune. Si vous connaissez de bonnes ressources en français, écrivez-nous à info@neurotechx.org et nous les ajouterons.",
        },
      ],
    },
  },
  {
    title: 'How to start learning neurotech',
    description:
      'How to start learning neurotechnology: a four-step path by background, with free resources, open data and the NeuroTechX community.',
    eyebrow: 'Learn',
    subtitle:
      'The question we get asked most. Here is our answer: four steps, free resources, and a path that fits your background.',
    noNeed:
      "You don't need a neuroscience degree or an EEG headset to start. Most people begin with a free book, open data and a laptop.",
    step: 'Step',
    english: 'in English',
    steps: {
      understand: {
        title: 'Understand the field',
        lead: 'For everyone. Give it a few evenings to get the big picture: how we measure and stimulate the brain, who does what, and the ethical questions.',
        items: [
          {
            name: 'The NeuroTech Primer',
            body: 'Our beginner’s book, free as a PDF. Start with the history, EEG and the last chapter, “Where to Start”.',
            href: '/primer',
            english: true,
          },
          {
            name: 'NeuroTech 101 (videos)',
            body: 'The basics and tutorials on the NeuroTechX YouTube channel.',
            href: 'https://www.youtube.com/@neurotechx',
            english: true,
          },
          {
            name: 'NeuroTechX webinars',
            body: 'Companies and labs present their work. A good way to see what the field looks like today.',
            href: '/education/webinars',
            english: true,
          },
        ],
      },
      track: {
        title: 'Pick your path',
        lead: 'Next, get your hands on brain signals. Pick the path closest to your background; you can always switch.',
        tracks: [
          {
            title: 'You write code',
            body: 'Work with real public EEG recordings, no hardware needed.',
            items: [
              {
                name: 'MNE-Python tutorials',
                body: 'The standard Python tool for reading, filtering and analysing EEG and MEG.',
                href: 'https://mne.tools/stable/auto_tutorials/index.html',
                english: true,
              },
              {
                name: 'OpenNeuro',
                body: 'Hundreds of open EEG, MEG and MRI datasets, in BIDS format.',
                href: 'https://openneuro.org/',
                english: true,
              },
            ],
          },
          {
            title: 'You come from neuroscience, psychology or biology',
            body: 'Learn the programming tools, then the methods for analysing signals.',
            items: [
              {
                name: 'Software Carpentry',
                body: 'Python, the shell and Git for scientists, from scratch.',
                href: 'https://software-carpentry.org/',
                english: true,
              },
              {
                name: 'Neuromatch Academy',
                body: 'Free, intensive online courses in computational neuroscience.',
                href: 'https://neuromatch.io/courses/',
                english: true,
              },
              {
                name: 'NeuroTech Course',
                body: 'A free, NIH-funded online course on translating and commercialising neurotechnology, with a certificate.',
                href: 'https://www.neurotechcourse.org/',
                english: true,
              },
              {
                name: 'Luck Lab (ERP Info)',
                body: 'Good practice in experimental design and event-related potential analysis.',
                href: 'https://lucklab.ucdavis.edu/blog/category/EEG%2FERP',
                english: true,
              },
            ],
          },
          {
            title: 'You like hardware and electronics',
            body: 'Record your own signals with an affordable kit.',
            items: [
              {
                name: 'Backyard Brains',
                body: 'SpikerBoxes for recording muscle and nerve signals, made for classrooms.',
                href: 'https://backyardbrains.com/products/',
                english: true,
              },
              {
                name: 'OpenBCI',
                body: 'The most widely used open-source EEG hardware for research and teaching.',
                href: 'https://shop.openbci.com/',
                english: true,
              },
              {
                name: 'PiEEG',
                body: 'A Raspberry Pi add-on board for reading EEG, EMG and ECG.',
                href: 'https://pieeg.com/',
                english: true,
              },
            ],
          },
          {
            title: "You're not technical",
            body: 'Policy, ethics, law, business or design: the field needs you just as much.',
            items: [
              {
                name: 'The NeuroTech Primer: beyond the lab',
                body: 'The chapters on market drivers, the ecosystem, challenges in the field and neuroethics.',
                href: '/primer',
                english: true,
              },
              {
                name: 'Industry watch',
                body: 'News, funding and trends in the sector, every day.',
                href: '/reports',
                english: false,
              },
              {
                name: 'Ecosystem map',
                body: 'Neurotech companies, labs and organizations around the world.',
                href: '/ecosystem',
                english: false,
              },
            ],
          },
        ],
      },
      build: {
        title: 'Build something',
        lead: 'You learn most by doing a real project. Start small: reproducing a well-known experiment is already a project.',
        items: [
          {
            name: 'NeuroTechX challenges',
            body: 'Open challenges with data, rules and leaderboards.',
            href: '/projects#challenges',
            english: false,
          },
          {
            name: 'EEG-ExPy',
            body: 'Reproduce classic EEG experiments (P300, N170, SSVEP) with a Muse or OpenBCI. A NeuroTechX project.',
            href: 'https://github.com/neurotechx/eeg-expy',
            english: true,
          },
          {
            name: 'MOABB',
            body: 'Compare BCI algorithms on public datasets. A NeuroTechX project, with weekly developer meetings.',
            href: 'https://github.com/NeuroTechX/moabb',
            english: true,
          },
          {
            name: 'Brainhack Global',
            body: 'Open brain-science hackathons around the world, open to beginners.',
            href: 'https://brainhack.org/',
            english: true,
          },
        ],
      },
      people: {
        title: 'Find your people',
        lead: 'You learn faster with others. Join a local chapter or a student club, or start one.',
        items: [
          {
            name: 'Local chapters',
            body: 'Meetups, workshops and hackathons in more than 30 cities.',
            href: '/community',
            english: false,
          },
          {
            name: 'Student clubs',
            body: 'Student teams that build projects and enter competitions.',
            href: '/students',
            english: false,
          },
          {
            name: 'Events',
            body: 'Upcoming events from NeuroTechX and our partners.',
            href: '/events',
            english: false,
          },
          {
            name: 'Newsletter',
            body: 'Community news, events and opportunities.',
            href: '/newsletter',
            english: false,
          },
        ],
      },
    },
    lessons: {
      eyebrow: 'Online lessons',
      title: 'NeuroTechX lessons',
      lead: 'Two free modules written by NeuroTechX volunteers for NeuroTechEDU, now published here.',
      modules: { bci: 'BCI 101', neuro: 'Neuroscience 101' },
      credits: 'Written and edited by',
      creditsMore: 'and other contributors on GitHub',
      moduleLead: {
        bci: 'What a brain-computer interface is, from EEG headsets to preprocessing, feature extraction and machine learning.',
        neuro: 'An overview of the nervous system, its cells, its anatomy and its disorders.',
      },
    },
    lesson: {
      back: '← Learn',
      lessonOf: 'Lesson {n} of {total}',
      origin: 'Written by NeuroTechX volunteers for NeuroTechEDU (2017–2020), moved here in 2026.',
      original: 'Original page',
      improve: 'Suggest a fix on GitHub',
      by: 'By',
    },
    launch: {
      eyebrow: 'What comes next',
      title: 'From learning to launching',
      lead: "Want to turn an idea into a product? These programmes build on each other. Take stages 1 and 2 in whichever order suits you: start with stage 2 if you come from engineering, with stage 1 if you come from neuroscience or the clinic.",
      stages: [
        {
          title: 'Learn the path to market',
          body: 'Regulation, clinical trials, intellectual property, funding and reimbursement.',
          items: [
            {
              name: 'NeuroTech Course',
              body: 'Free, self-paced and NIH-funded, with a Certificate in Neurotechnology Translation and a hands-on workshop.',
              href: 'https://www.neurotechcourse.org/',
              english: true,
            },
          ],
        },
        {
          title: 'Go deeper, with a credential',
          body: 'Recording, neuroimaging, neuromodulation, entrepreneurship and ethics, then a hands-on project.',
          items: [
            {
              name: 'NeuroTech Microcredential Program',
              body: "Queen's, Western, York and Nipissing. Online modules of about 50 hours each and an optional two-week capstone on campus.",
              href: 'https://neurotechmicrocreds.com/',
              english: true,
            },
          ],
        },
        {
          title: 'Form a team and a venture',
          body: 'Start from a real clinical need, build the business model and pitch to investors.',
          items: [
            {
              name: 'NeuroDesign Entrepreneurs Workshop',
              body: 'Annual in Cleveland (September), now also in Munich, with industry mentors. Free for accepted students.',
              href: 'https://www.clevelandneurodesign.com/',
              english: true,
            },
          ],
        },
        {
          title: 'Accelerate',
          body: 'Funding, mentors and first trials with patients.',
          items: [
            {
              name: 'Accelerators and funding',
              body: "The Ontario Brain Institute's NERVE and NERD, Creative Destruction Lab's Neuro stream, MSWA's accelerator in Perth, NeuroTech Harbor and more, with their deadlines.",
              href: '/funding',
              english: false,
            },
          ],
        },
      ],
    },
    further: {
      title: 'Going further',
      body: 'Microcredentials, master’s programmes, open data, analysis tools and summer schools: all our selected resources are on the Education page.',
      cta: 'See all resources',
    },
    faq: {
      title: 'Common questions',
      items: [
        {
          q: 'Do I need a neuroscience or engineering background?',
          a: 'No. NeuroTechX members come from computer science, psychology, design, law and business. Pick the path in step 2 that starts from what you already know.',
        },
        {
          q: 'Do I need to buy an EEG headset?',
          a: "Not to start. Open datasets let you learn analysis without any hardware. If you want to record your own signals later, a SpikerBox or a Muse headband is an affordable way in.",
        },
        {
          q: 'Are there resources in French?',
          a: "Most of these resources are in English; we mark each one. If you know good resources in French, write to info@neurotechx.org and we'll add them.",
        },
      ],
    },
  }
);
