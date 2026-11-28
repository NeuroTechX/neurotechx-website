import { bilingual } from '../text';

// History entries: `id` is the anchor other pages link to (/about#student-competition and so on)
// and is the same in both languages. Link `href` is an English route path (localized by the page)
// or a full URL. Sources for each fact are the linked pages and Morgan Hough's 2026 talk
// (github.com/m9h/neurotechx-presentations), whose notes record what each source supports.
export default bilingual(
  {
    title: 'À propos',
    description:
      "L'histoire de NeuroTechX, OBNL fondé à Montréal en 2015 : sections locales, compétition étudiante, outils et matériel libres, hackathons, ainsi que notre conseil d'administration et notre équipe.",
    viewOnInstagram: 'Voir sur Instagram',
    photoAlt: 'Événement NeuroTechX {n}',
    storyTitle: 'Notre histoire',
    storyLead:
      "NeuroTechX a été cofondée à Montréal en 2015 par Yannick Roy, Sydney Swaine-Simon, Marion Le Borgne, Melanie Segado et Ferdinand Ephrem, des ingénieurs et des scientifiques qui voulaient rapprocher la recherche en neurosciences et les gens qui bâtissent de la technologie.",
    storyBody:
      "Nous sommes un organisme sans but lucratif. Notre nom légal est toujours Société BCI Montréal, le groupe local d'où tout est parti. Notre travail repose sur trois piliers : la communauté, la formation et le développement professionnel. Concrètement, cela veut dire des sections locales, des clubs étudiants, des hackathons, du matériel d'apprentissage et des projets libres, menés surtout par des bénévoles.",
    historyTitle: 'Notre parcours',
    historyLead:
      "Voici les grandes étapes, à peu près dans l'ordre. Chaque étape renvoie à ses sources. Si vous avez des documents ou des souvenirs à ajouter, écrivez-nous ou proposez une modification du site.",
    historyNav: 'Aller à une étape',
    history: [
      {
        id: 'founding',
        period: '2015',
        title: 'La fondation à Montréal',
        paragraphs: [
          "NeuroTechX est née à Montréal en 2015, à partir de Société BCI Montréal. L'atelier pratique d'introduction aux ICM créé par BCI Montréal au District 3 en mai 2015 (Raymundo Cassani et Hubert Banville) est conservé sur notre GitHub — ses versions historiques de 2015 à 2018 sont archivées par étiquettes Git aux côtés de la trousse modernisée destinée aux sections et aux clubs étudiants.",
          "Dès le départ, l'idée était simple : un endroit où des gens de la recherche, du génie et du design apprennent la neurotechnologie en la construisant ensemble.",
        ],
        links: [{ label: "Trousse d'atelier ICM (depuis 2015)", href: 'https://github.com/NeuroTechX/bci-workshop' }],
      },
      {
        id: 'first-wave',
        period: '2009 à 2016',
        title: "La première vague : l'EEG grand public et libre",
        paragraphs: [
          "Dans notre lecture de notre propre histoire, une « première vague » d'interfaces cerveau-machine a attiré les gens vers la communauté : des casques abordables et du matériel libre qui permettaient d'explorer les signaux du cerveau hors d'un laboratoire. Parmi les premiers : l'EPOC d'EMOTIV (2009), les jeux et outils de développement de NeuroSky, la campagne Kickstarter d'OpenBCI (décembre 2013) et Muse (2014).",
          "La promesse de « contrôler son monde » attirait les gens. Faire fonctionner le matériel et comprendre les signaux leur donnait une raison d'apprendre ensemble, et c'est ainsi que plusieurs soirées de hacking et sections ont commencé. C'est notre façon de raconter la formation de la communauté, pas une histoire de la recherche sur les ICM, qui est bien plus ancienne.",
        ],
        links: [
          { label: 'OpenBCI sur Kickstarter (2013)', href: 'https://openbci.com/community/openbci-on-kickstarter/' },
          { label: "L'EPOC d'EMOTIV", href: 'https://www.emotiv.com/blog/how-emotiv-epoc-changed-the-world-of-neurotechnology' },
        ],
      },
      {
        id: 'chapters',
        period: '2013 à aujourd’hui',
        title: 'Soirées de hacking et premières sections',
        paragraphs: [
          "Certains groupes locaux se réunissaient déjà avant NeuroTechX. À Paris, CogLab a été lancé en septembre 2013 par Romain Rouyer et incubé à La Paillasse; les soirées de hacking CogLab / NeuroTechX Paris se poursuivent. À San Francisco, le Cognitive Technology Group était une communauté existante qui s'est jointe à NeuroTechX.",
          "La soirée de hacking est devenue notre format commun : une soirée régulière où les nouveaux venus et les gens qui ont déjà un projet travaillent sur du matériel, des expériences et du code, et s'entraident.",
          "Les premières sections ont suivi. À New York, Conor Russomanno a commencé à organiser NeuroTechNYC en juillet 2015, avec des soirées de hacking mensuelles sur les interfaces humain-machine. À Toronto, la section tenait en janvier 2016 une série de conférences d'hiver sur l'EEG; sa page décrit aussi des soirées de hacking aux deux semaines et des projets libres comme EEG 101 et Neurodoro. La section de Boston date de 2016. À Londres, la première rencontre a eu lieu le 6 mai 2016 à la LSE, avec le projet NERRI, sous forme de présentations de trois minutes pour un public non spécialiste.",
          "D'autres formats se sont ajoutés. Buzz in Review, une revue annuelle de l'année en neurotechnologie que les sections présentent chez elles, a eu lieu en personne à Montréal en janvier 2020, puis en 2021 sous forme de 10 événements en ligne réunissant 19 sections. NeuroTechX Inde a tenu Neuro 2.0, un forum en ligne de deux jours, en octobre 2020. En 2022, Londres et Boston ont partagé un Buzz in Review hybride, et NeuroTechX Boston a coorganisé avec BrainMind un panel sur la neuroéthique au MIT. En janvier 2025, la Neurotech Society de l'Imperial College a tenu le London Neurotech Hackathon avec des partenaires, dont NeuroTechX.",
        ],
        links: [
          { label: "L'histoire de CogLab", href: 'https://coglab.fr/about/coglab/' },
          { label: 'Les soirées de hacking à Paris', href: 'https://coglab.fr/activites/hacknight/' },
          { label: 'Première rencontre à Londres (2016)', href: 'https://www.meetup.com/NeuroTechLDN/events/230512143/' },
          { label: 'Buzz in Review 2021 (archive)', href: 'https://web.archive.org/web/20250701153923/https://neurotechx.com/ntxbir2021/' },
          { label: 'Trouver une section', href: '/community' },
        ],
      },
      {
        id: 'content',
        period: '2015 à aujourd’hui',
        title: 'Infolettre, Content Lab et webinaires',
        paragraphs: [
          "Les archives de l'infolettre commencent avec le NeuroTechX Digest no 1, en novembre 2015. Le numéro de février 2016, signé par la cofondatrice Melanie Segado, rassemblait les nouvelles de la communauté, dont la série de conférences sur l'EEG de Toronto.",
          "Le Content Lab réunit des rédacteurs, des réviseurs et des designers bénévoles qui publient des articles, des entrevues et des comptes rendus d'événements sur la publication Medium de NeuroTechX. C'est une autre façon de contribuer : expliquer le domaine, raconter un projet ou réviser le texte de quelqu'un d'autre.",
          "Les webinaires mensuels et le NeuroTech Primer offrent d'autres portes d'entrée dans le domaine.",
        ],
        links: [
          { label: "Les archives de l'infolettre", href: '/newsletter' },
          { label: 'Écrire pour le Content Lab', href: '/content-lab' },
          { label: 'Les webinaires', href: '/education/webinars' },
        ],
      },
      {
        id: 'student-competition',
        period: '2016 à aujourd’hui',
        title: 'La compétition des clubs étudiants',
        paragraphs: [
          "Yannick Roy a lancé l'initiative des clubs étudiants en 2016. Plusieurs universités refusaient alors les clubs de neurotech : on disait aux étudiants de se joindre à un club de génie ou de neurosciences, ou qu'un club avait besoin d'une compétition pour exister. NeuroTechX a répondu en organisant une compétition annuelle et en aidant les étudiants à fonder leurs clubs.",
          "Le projet pilote de 2016 comptait cinq clubs à Montréal et à Toronto : SynapsETS (ÉTS), MENTAL (McGill), BSYS (Concordia), PolyCortex (Polytechnique Montréal) et NeuroTechUofT (Université de Toronto). Leur Demo Day a eu lieu à Montréal en novembre 2016.",
          "La compétition s'est poursuivie et s'est étendue au-delà du Canada. Par exemple, l'équipe de Neurotech@Davis a construit son projet NeuroAssist pour la compétition de 2020.",
        ],
        links: [
          { label: 'Le bilan de 2017', href: 'https://medium.com/neurotechx/ntx-student-clubs-initiative-2fba98b0d082' },
          { label: 'Neurotech@Davis (UC Davis)', href: 'https://neuroengineering.ucdavis.edu/news/neurotechdavis-student-club-undergraduate-students-learn-about-neurotechnology' },
          { label: 'Fonder ou inscrire un club', href: '/students' },
        ],
      },
      {
        id: 'open-tools',
        period: '2015 à aujourd’hui',
        title: "Outils libres : EEG-ExPy, MOABB et l'apprentissage profond en EEG",
        paragraphs: [
          "muse-lsl, d'Alexandre Barachant, permettait de diffuser l'EEG d'un Muse avec Lab Streaming Layer. eeg-notebooks s'est appuyé dessus : des expériences développées par la communauté qui combinent l'enregistrement, la présentation des stimuli et l'analyse. Le projet a ensuite été renommé EEG-ExPy. John Griffiths en est le développeur principal, avec de nombreux contributeurs, et la bibliothèque BrainFlow, d'Andrey Parfenov, a élargi la liste des appareils pris en charge.",
          "MOABB (Mother of All BCI Benchmarks), fondé par Alexandre Barachant et Vinay Jayaram, compare des chaînes de traitement d'ICM sur des jeux de données EEG publics pour que les résultats puissent être reproduits. Sylvain Chevallier et Bruno Aristimunha le maintiennent aujourd'hui. L'étude de référence publiée en 2024 portait sur 30 chaînes de traitement et 36 jeux de données.",
          "L'apprentissage profond appliqué à l'EEG nous intéresse depuis longtemps. En 2019, le cofondateur Yannick Roy et ses collègues ont publié une revue systématique des travaux parus de janvier 2010 à juillet 2018. En 2020, NeuroTechX et Novela Neurotech ont lancé Neureka, un défi de détection des crises d'épilepsie fondé sur le corpus EEG de l'hôpital de l'Université Temple. Dix-neuf équipes y ont participé, et les organisateurs ont ensuite étudié comment le choix des mesures de score change les résultats.",
          "Ce sont des projets communautaires aux contributeurs nombreux. Des bibliothèques comme BrainFlow, MNE et Braindecode sont des projets indépendants sur lesquels la communauté s'appuie.",
        ],
        links: [
          { label: 'EEG-ExPy', href: 'https://github.com/NeuroTechX/EEG-ExPy' },
          { label: 'MOABB', href: 'https://github.com/NeuroTechX/moabb' },
          { label: "L'étude MOABB (2024)", href: 'https://arxiv.org/abs/2404.15319' },
          { label: 'La revue de Roy et coll. (2019)', href: 'https://doi.org/10.1088/1741-2552/ab260c' },
          { label: 'Contribuer aux projets', href: '/projects' },
        ],
      },
      {
        id: 'open-hardware',
        period: '2016 à aujourd’hui',
        title: 'Le matériel libre soutenu par la communauté',
        paragraphs: [
          "Du matériel peu coûteux et bien documenté permet à plus de gens de participer. Les sections et les canaux en ligne de NeuroTechX ont offert à des projets de matériel indépendants un endroit où se faire connaître, être discutés et s'améliorer.",
          "À Paris, aux soirées de hacking CogLab / NeuroTechX, Jean Rintoul a présenté Spectra (OpenEIT), une trousse libre de tomographie par impédance électrique, et Luc Jonveaux a présenté un0rick, du matériel libre d'échographie impulsion-écho. icibici, une trousse EEG à un canal qui passe par une connexion audio, remercie NeuroTechX et sa communauté Slack. FreeEEG32, une carte d'acquisition libre à 32 canaux, et le HEGduino de Joshua Brewster font aussi partie des projets que la communauté a suivis et soutenus.",
          "Ce sont des projets indépendants : NeuroTechX ne les possède pas et ne les finance pas. Ce sont des outils d'apprentissage et de recherche, pas des dispositifs médicaux. Vérifiez la licence de chaque projet avant de le réutiliser; certaines, comme celle du micrologiciel d'OpenEIT, interdisent l'usage commercial.",
        ],
        links: [
          { label: 'Spectra (OpenEIT)', href: 'https://www.crowdsupply.com/mindseye-biomedical/spectra' },
          { label: 'un0rick', href: 'https://un0rick.cc/' },
          { label: 'icibici', href: 'https://icibici.github.io/site/' },
          { label: 'FreeEEG32', href: 'https://www.crowdsupply.com/neuroidss/freeeeg32' },
        ],
      },
      {
        id: 'ntx-services',
        period: '2019 à 2024',
        title: 'NTX Services',
        paragraphs: [
          "NTX Services a été lancé en 2019 comme groupe-conseil indépendant pour les entreprises et les investisseurs en neurotech, en partenariat avec NeuroTechX dès le départ. Les deux organisations ont officialisé ce partenariat au début de 2022 et y ont mis fin d'un commun accord en août 2024.",
        ],
        links: [{ label: 'Lire la déclaration commune', href: '/ntx-services-partnership-termination' }],
      },
      {
        id: 'queens',
        period: '2022 à aujourd’hui',
        title: 'Le programme de microcertification en neurotech',
        paragraphs: [
          "En octobre 2022, l'Université Queen's a annoncé le NeuroTech Micro-Credential Program, né d'un partenariat entre son Centre for Neuroscience Studies et NeuroTechX, avec une subvention du Micro-credentials Challenge Fund de l'Ontario. Susan Boehnke le dirige.",
          "Des cours en ligne mènent à un stage pratique de deux semaines, en équipe, à Queen's. Les deux premières cohortes, en mai 2024 et en août 2025, comptaient chacune 15 étudiants.",
        ],
        links: [
          { label: "L'annonce de Queen's (2022)", href: 'https://www.queensu.ca/gazette/media/news-release-queen-s-micro-credentials-address-knowledge-gaps-burgeoning-neurotech-industry' },
          { label: 'Le stage pratique', href: 'https://neurotechmicrocreds.com/capstone/' },
        ],
      },
      {
        id: 'hackathons',
        period: '2022 à 2026',
        title: 'Les hackathons mondiaux',
        paragraphs: [
          "Les 29 et 30 octobre 2022 : un hackathon mondial gratuit en ligne, avec des points de rencontre en personne tenus par des sections (Paris, Barcelone, Belgrade, San Francisco et Munich étaient annoncés). Le volet données proposait de prédire l'âge du cerveau à partir de l'EEG du Healthy Brain Network du Child Mind Institute, sur la plateforme CodaLab de l'Université Paris-Saclay.",
          "Les 2 et 3 décembre 2023 : le deuxième hackathon mondial, gratuit et hybride, avec huit lieux annoncés (Paris, Vienne, Zurich, Delhi, Kharagpur, Brasília, Buenos Aires et Londres) et un nouveau volet sur l'éthique, en plus du matériel, des données et du design. Ces éditions ont été coordonnées avec l'École 42 dans plusieurs villes.",
          "Du 10 au 12 avril 2026 : le Global NeuroHack à la Frontier Tower de San Francisco, avec l'appui de NeuroTechX à l'organisation. Ses trois volets : Blue-Sky Prototyping, Non-Implantable Speech Decoding et Maximizing Bit Rate.",
        ],
        links: [
          { label: 'Le hackathon de 2022 (archive)', href: 'https://web.archive.org/web/20240129163529/https://neurotechx.com/hackathon2022/' },
          { label: 'Le défi sur l’âge du cerveau', href: 'https://tailor-network.eu/brain-age-prediction-challenge/' },
          { label: 'Le hackathon de 2023 (archive)', href: 'https://web.archive.org/web/20240129173541/https://neurotechx.com/hackathon2023/' },
          { label: 'Global NeuroHack 2026', href: 'https://global-neurohack.github.io/' },
          { label: 'Les prochains événements', href: '/events' },
        ],
      },
      {
        id: 'ultrasound',
        period: '2024 à aujourd’hui',
        title: "Une communauté autour de l'ultrason à San Francisco",
        paragraphs: [
          "La tFUS Society, lancée par Leo Zaroff, réunit des chercheurs, des passionnés de technique et des fondateurs autour de l'ultrason focalisé transcrânien. NeuroTechSF a accueilli ses rencontres, dont une rencontre sur l'état de la recherche et du développement au Studio 55 le 6 novembre 2024 et un atelier conjoint sur la neuroimagerie par ultrason à la Frontier Tower le 11 novembre 2025. Parmi les projets partagés : Project Sonus, un effort libre pour simuler et reproduire une méthode publiée d'imagerie par ultrason.",
          "Des outils libres comme un0rick et pic0rick, ou la plateforme de recherche Open-LIFU d'Openwater, donnent du concret à étudier. C'est de la recherche : l'imagerie et la stimulation sont deux choses différentes, et stimuler un cerveau humain exige un encadrement de recherche, de l'équipement étalonné et une supervision qualifiée.",
        ],
        links: [
          { label: 'Rencontre au Studio 55 (2024)', href: 'https://luma.com/e5kwzyvq' },
          { label: 'Atelier à la Frontier Tower (2025)', href: 'https://luma.com/ultrasound-based-neuroimaging' },
          { label: 'Sécurité et éthique', href: '/safety-and-ethics' },
        ],
      },
      {
        id: 'connexin',
        period: '2025 à 2026',
        title: 'CONNExIN et Lagos',
        paragraphs: [
          "CONNExIN, d'Udunna Anazodo et de l'équipe de CONNExIN, est un programme hybride et gratuit de formation de formateurs en neuroimagerie. Il relie le MiND Lab du Neuro (Institut neurologique de Montréal), un centre de recherche sur le vieillissement de McGill, le Medical Artificial Intelligence Lab au Nigéria et CAMERA. L'édition 2025 s'est tenue d'août à octobre, avec le MAI Lab de Lagos comme lieu hybride.",
          "Morgan Hough a cosigné, au nom de NeuroTechX, un résumé sur ce programme présenté au congrès de l'ISMRM au Cap en mai 2026. Nous espérons que Lagos devienne la première section urbaine de NeuroTechX en Afrique subsaharienne. C'est un souhait, pas une annonce, et CONNExIN n'est pas un programme de NeuroTechX.",
        ],
        links: [
          { label: 'Le programme CONNExIN', href: 'https://event.fourwaves.com/connexin/pages/41f08c9e-6502-46b4-bf53-ec5a6cf095b7' },
          { label: "Le résumé de l'ISMRM 2026", href: 'https://echo.ismrm.org/p/ISMRM2026/563-01-002' },
        ],
      },
    ],
    figures: {
      unrick: {
        alt: 'Une carte électronique un0rick reliée à un Raspberry Pi et à un transducteur plongé dans un pot d’eau, sur un bureau.',
        caption: 'Montage d’essai d’un0rick, 2019.',
        credit: 'Photo : Luc Jonveaux (kelu124), redimensionnée',
        sourceHref: 'https://un0rick.cc/un0rick',
        licenseLabel: 'CC BY-SA 3.0',
        licenseHref: 'https://creativecommons.org/licenses/by-sa/3.0/',
      },
    },
    sourcesNote:
      "Cette histoire s'appuie sur la présentation de Morgan Hough au Japon en septembre 2026, dont les sources et les notes sont publiques.",
    sourcesLink: 'Voir la présentation et ses sources',
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
      'The history of NeuroTechX, a nonprofit founded in Montréal in 2015: chapters, the student competition, open tools and hardware, hackathons, and our board and team.',
    viewOnInstagram: 'View on Instagram',
    photoAlt: 'NeuroTechX Event {n}',
    storyTitle: 'Our Story',
    storyLead:
      'NeuroTechX was co-founded in Montréal in 2015 by Yannick Roy, Sydney Swaine-Simon, Marion Le Borgne, Melanie Segado, and Ferdinand Ephrem, engineers and scientists who wanted to bring neuroscience research and the people who build technology closer together.',
    storyBody:
      'We are a nonprofit. Our legal name is still Société BCI Montréal, the local group where it all started. Our work rests on three pillars: community, education, and professional development. In practice that means city chapters, student clubs, hackathons, learning material, and open projects, mostly run by volunteers.',
    historyTitle: 'Our History',
    historyLead:
      'These are the main steps, roughly in order. Each one links to its sources. If you have records or memories to add, write to us or suggest a change to the site.',
    historyNav: 'Jump to',
    history: [
      {
        id: 'founding',
        period: '2015',
        title: 'Founded in Montréal',
        paragraphs: [
          'NeuroTechX started in Montréal in 2015, growing out of Société BCI Montréal. The hands-on Introduction to BCI workshop created by BCI Montréal at District 3 in May 2015 (Raymundo Cassani & Hubert Banville) lives on our GitHub, with its 2015–2018 iterations preserved as Git tags alongside the modernized chapter and student-club kit.',
          'From the start the idea was simple: a place where people from research, engineering, and design learn neurotechnology by building it together.',
        ],
        links: [{ label: 'BCI Workshop kit (2015 to today)', href: 'https://github.com/NeuroTechX/bci-workshop' }],
      },
      {
        id: 'first-wave',
        period: '2009 to 2016',
        title: 'The first wave: consumer and open EEG',
        paragraphs: [
          'In our reading of our own history, a "first wave" of brain-computer interfaces drew people into the community: affordable headsets and open hardware that let people explore brain signals outside a lab. Early examples include the EMOTIV EPOC (2009), NeuroSky\'s games and developer tools, the OpenBCI Kickstarter (December 2013), and Muse (2014).',
          'The promise of "controlling your world" attracted people. Getting the hardware to work and understanding the signals gave them a reason to learn together, and that is how many hacknights and chapters began. This is our account of how the community formed, not a history of BCI research, which is much older.',
        ],
        links: [
          { label: 'OpenBCI on Kickstarter (2013)', href: 'https://openbci.com/community/openbci-on-kickstarter/' },
          { label: 'The EMOTIV EPOC', href: 'https://www.emotiv.com/blog/how-emotiv-epoc-changed-the-world-of-neurotechnology' },
        ],
      },
      {
        id: 'chapters',
        period: '2013 to today',
        title: 'Hacknights and the first chapters',
        paragraphs: [
          'Some local groups were meeting before NeuroTechX existed. In Paris, CogLab was launched in September 2013 by Romain Rouyer and incubated at La Paillasse; the CogLab / NeuroTechX Paris hacknights continue. In San Francisco, the Cognitive Technology Group was an existing community that became part of NeuroTechX.',
          'The hacknight became our shared format: a regular evening where newcomers and people who already have a project work on hardware, experiments, and code, and help each other.',
          'The first chapters followed. In New York, Conor Russomanno began organizing NeuroTechNYC in July 2015, with monthly hacknights on human-computer interfaces. In Toronto, the chapter ran a winter EEG lecture series in January 2016; its chapter page also describes biweekly hacknights and open projects such as EEG 101 and Neurodoro. The Boston chapter dates from 2016. In London, the first meetup took place on May 6, 2016 at the LSE, with the NERRI project, as three-minute talks for a non-specialist audience.',
          'Other formats were added. Buzz in Review, a yearly review of neurotechnology that chapters present locally, was held in person in Montréal in January 2020, and in 2021 as 10 online events with 19 chapters. NeuroTechX India held Neuro 2.0, a two-day online forum, in October 2020. In 2022, London and Boston shared a hybrid Buzz in Review, and NeuroTechX Boston co-hosted a neuroethics panel at MIT with BrainMind. In January 2025, Imperial College\'s Neurotech Society ran the London Neurotech Hackathon with partners including NeuroTechX.',
        ],
        links: [
          { label: "CogLab's history", href: 'https://coglab.fr/about/coglab/' },
          { label: 'Paris hacknights', href: 'https://coglab.fr/activites/hacknight/' },
          { label: 'First London meetup (2016)', href: 'https://www.meetup.com/NeuroTechLDN/events/230512143/' },
          { label: 'Buzz in Review 2021 (archive)', href: 'https://web.archive.org/web/20250701153923/https://neurotechx.com/ntxbir2021/' },
          { label: 'Find a chapter', href: '/community' },
        ],
      },
      {
        id: 'content',
        period: '2015 to today',
        title: 'Newsletter, Content Lab, and webinars',
        paragraphs: [
          'The newsletter archive starts with NeuroTechX Digest #1 in November 2015. The February 2016 issue, by co-founder Melanie Segado, gathered news from the community, including Toronto\'s EEG lecture series.',
          'The Content Lab brings together volunteer writers, editors, and designers who publish articles, interviews, and event write-ups on the NeuroTechX Medium publication. It is another way to contribute: explain the field, tell the story of a project, or edit someone else\'s work.',
          'Monthly webinars and the NeuroTech Primer are other ways into the field.',
        ],
        links: [
          { label: 'Newsletter archive', href: '/newsletter' },
          { label: 'Write for the Content Lab', href: '/content-lab' },
          { label: 'Webinars', href: '/education/webinars' },
        ],
      },
      {
        id: 'student-competition',
        period: '2016 to today',
        title: 'The student club competition',
        paragraphs: [
          'Yannick Roy started the Student Clubs Initiative in 2016. At the time, several universities turned down neurotech clubs: students were told to join an engineering or a neuroscience club, or that a club needed a competition to exist. NeuroTechX answered by organizing an annual competition and helping students set up their clubs.',
          'The 2016 pilot had five clubs in Montréal and Toronto: SynapsETS (ÉTS), MENTAL (McGill), BSYS (Concordia), PolyCortex (Polytechnique Montréal), and NeuroTechUofT (University of Toronto). Their Demo Day was held in Montréal in November 2016.',
          'The competition continued and spread beyond Canada. For example, the Neurotech@Davis team built its NeuroAssist project for the 2020 competition.',
        ],
        links: [
          { label: 'The 2017 retrospective', href: 'https://medium.com/neurotechx/ntx-student-clubs-initiative-2fba98b0d082' },
          { label: 'Neurotech@Davis (UC Davis)', href: 'https://neuroengineering.ucdavis.edu/news/neurotechdavis-student-club-undergraduate-students-learn-about-neurotechnology' },
          { label: 'Start or list a club', href: '/students' },
        ],
      },
      {
        id: 'open-tools',
        period: '2015 to today',
        title: 'Open tools: EEG-ExPy, MOABB, and deep learning for EEG',
        paragraphs: [
          "Alexandre Barachant's muse-lsl made it possible to stream EEG from a Muse over Lab Streaming Layer. eeg-notebooks built on it: community-developed experiments that combine recording, stimulus presentation, and analysis. The project was later renamed EEG-ExPy. John Griffiths is its lead developer, with many contributors, and Andrey Parfenov's BrainFlow library widened the range of supported devices.",
          'MOABB (Mother of All BCI Benchmarks), founded by Alexandre Barachant and Vinay Jayaram, compares BCI pipelines on public EEG datasets so that results can be reproduced. Sylvain Chevallier and Bruno Aristimunha maintain it today. Its 2024 benchmark study covered 30 pipelines and 36 datasets.',
          'Deep learning for EEG has been a long-running interest. In 2019, co-founder Yannick Roy and colleagues published a systematic review of work from January 2010 to July 2018. In 2020, NeuroTechX and Novela Neurotech launched Neureka, a seizure-detection challenge built on the Temple University Hospital EEG corpus. Nineteen teams took part, and the organizers then studied how the choice of scoring metric changes the results.',
          'These are community projects with many contributors. Libraries such as BrainFlow, MNE, and Braindecode are independent projects the community relies on.',
        ],
        links: [
          { label: 'EEG-ExPy', href: 'https://github.com/NeuroTechX/EEG-ExPy' },
          { label: 'MOABB', href: 'https://github.com/NeuroTechX/moabb' },
          { label: 'The MOABB study (2024)', href: 'https://arxiv.org/abs/2404.15319' },
          { label: 'Roy et al. review (2019)', href: 'https://doi.org/10.1088/1741-2552/ab260c' },
          { label: 'Contribute to projects', href: '/projects' },
        ],
      },
      {
        id: 'open-hardware',
        period: '2016 to today',
        title: 'Open hardware the community supported',
        paragraphs: [
          'Low-cost, well-documented hardware lets more people take part. NeuroTechX chapters and online channels have given independent hardware projects a place to be seen, discussed, and improved.',
          "At the CogLab / NeuroTechX hacknights in Paris, Jean Rintoul presented Spectra (OpenEIT), an open electrical impedance tomography kit, and Luc Jonveaux presented un0rick, open pulse-echo ultrasound hardware. icibici, a single-channel EEG kit that connects through an audio port, thanks NeuroTechX and its Slack community. FreeEEG32, an open 32-channel acquisition board, and Joshua Brewster's HEGduino are among the other projects the community has followed and supported.",
          'These are independent projects: NeuroTechX does not own or fund them. They are tools for learning and research, not medical devices. Check each project\'s licence before reusing it; some, such as the OpenEIT firmware licence, do not allow commercial use.',
        ],
        links: [
          { label: 'Spectra (OpenEIT)', href: 'https://www.crowdsupply.com/mindseye-biomedical/spectra' },
          { label: 'un0rick', href: 'https://un0rick.cc/' },
          { label: 'icibici', href: 'https://icibici.github.io/site/' },
          { label: 'FreeEEG32', href: 'https://www.crowdsupply.com/neuroidss/freeeeg32' },
        ],
      },
      {
        id: 'ntx-services',
        period: '2019 to 2024',
        title: 'NTX Services',
        paragraphs: [
          'NTX Services launched in 2019 as an independent advisory group for neurotech companies and investors, in partnership with NeuroTechX from the start. The two organizations formalized the partnership in early 2022 and ended it by mutual decision in August 2024.',
        ],
        links: [{ label: 'Read the joint statement', href: '/ntx-services-partnership-termination' }],
      },
      {
        id: 'queens',
        period: '2022 to today',
        title: 'The NeuroTech Micro-credential Program',
        paragraphs: [
          "In October 2022, Queen's University announced the NeuroTech Micro-Credential Program, a partnership between its Centre for Neuroscience Studies and NeuroTechX, with an award from Ontario's Micro-credentials Challenge Fund. Susan Boehnke directs it.",
          "Online courses lead into a two-week, team-based capstone at Queen's. The first two capstone cohorts, in May 2024 and August 2025, had 15 students each.",
        ],
        links: [
          { label: "Queen's announcement (2022)", href: 'https://www.queensu.ca/gazette/media/news-release-queen-s-micro-credentials-address-knowledge-gaps-burgeoning-neurotech-industry' },
          { label: 'The capstone', href: 'https://neurotechmicrocreds.com/capstone/' },
        ],
      },
      {
        id: 'hackathons',
        period: '2022 to 2026',
        title: 'Global hackathons',
        paragraphs: [
          "October 29 and 30, 2022: a free global online hackathon, with in-person hubs hosted by chapters (Paris, Barcelona, Belgrade, San Francisco, and Munich were announced). The data track asked teams to predict brain age from EEG in the Child Mind Institute's Healthy Brain Network data, on Université Paris-Saclay's CodaLab platform.",
          'December 2 and 3, 2023: the second global hackathon, free and hybrid, with eight announced locations (Paris, Vienna, Zurich, Delhi, Kharagpur, Brasília, Buenos Aires, and London) and a new ethics track alongside hardware, data, and design. These editions were coordinated with École 42 in several cities.',
          'April 10 to 12, 2026: Global NeuroHack at Frontier Tower in San Francisco, with organizing support from NeuroTechX. Its three tracks were Blue-Sky Prototyping, Non-Implantable Speech Decoding, and Maximizing Bit Rate.',
        ],
        links: [
          { label: 'The 2022 hackathon (archive)', href: 'https://web.archive.org/web/20240129163529/https://neurotechx.com/hackathon2022/' },
          { label: 'The brain-age challenge', href: 'https://tailor-network.eu/brain-age-prediction-challenge/' },
          { label: 'The 2023 hackathon (archive)', href: 'https://web.archive.org/web/20240129173541/https://neurotechx.com/hackathon2023/' },
          { label: 'Global NeuroHack 2026', href: 'https://global-neurohack.github.io/' },
          { label: 'Upcoming events', href: '/events' },
        ],
      },
      {
        id: 'ultrasound',
        period: '2024 to today',
        title: 'An ultrasound community in San Francisco',
        paragraphs: [
          'The tFUS Society, started by Leo Zaroff, brings researchers, technical enthusiasts, and founders together around transcranial focused ultrasound. NeuroTechSF has hosted its meetings, including a research and development meeting at Studio 55 on November 6, 2024 and a joint workshop on ultrasound-based neuroimaging at Frontier Tower on November 11, 2025. Shared projects include Project Sonus, an open effort to simulate and replicate a published ultrasound imaging method.',
          "Open tools such as un0rick and pic0rick, or Openwater's Open-LIFU research platform, give people something concrete to study. This is research: imaging and stimulation are different tasks, and stimulating a human brain needs research oversight, calibrated equipment, and qualified supervision.",
        ],
        links: [
          { label: 'Studio 55 meeting (2024)', href: 'https://luma.com/e5kwzyvq' },
          { label: 'Frontier Tower workshop (2025)', href: 'https://luma.com/ultrasound-based-neuroimaging' },
          { label: 'Safety and ethics', href: '/safety-and-ethics' },
        ],
      },
      {
        id: 'connexin',
        period: '2025 to 2026',
        title: 'CONNExIN and Lagos',
        paragraphs: [
          "CONNExIN, from Udunna Anazodo and the CONNExIN team, is a free, hybrid train-the-trainer program in neuroimaging. It connects the MiND Lab at the Montreal Neurological Institute, McGill's centre for research on aging, the Medical Artificial Intelligence Lab in Nigeria, and CAMERA. The 2025 program ran from August to October, with the MAI Lab in Lagos as its hybrid location.",
          'Morgan Hough co-authored, with a NeuroTechX affiliation, an abstract on the program presented at the ISMRM meeting in Cape Town in May 2026. We hope Lagos can become the first NeuroTechX city chapter in sub-Saharan Africa. That is a hope, not an announcement, and CONNExIN is not a NeuroTechX program.',
        ],
        links: [
          { label: 'The CONNExIN program', href: 'https://event.fourwaves.com/connexin/pages/41f08c9e-6502-46b4-bf53-ec5a6cf095b7' },
          { label: 'The ISMRM 2026 abstract', href: 'https://echo.ismrm.org/p/ISMRM2026/563-01-002' },
        ],
      },
    ],
    figures: {
      unrick: {
        alt: 'An un0rick circuit board connected to a Raspberry Pi and to a transducer in a jug of water, on a desk.',
        caption: 'un0rick bench test, 2019.',
        credit: 'Photo: Luc Jonveaux (kelu124), resized',
        sourceHref: 'https://un0rick.cc/un0rick',
        licenseLabel: 'CC BY-SA 3.0',
        licenseHref: 'https://creativecommons.org/licenses/by-sa/3.0/',
      },
    },
    sourcesNote:
      "This history draws on Morgan Hough's September 2026 talk in Japan, whose sources and notes are public.",
    sourcesLink: 'See the talk and its sources',
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
