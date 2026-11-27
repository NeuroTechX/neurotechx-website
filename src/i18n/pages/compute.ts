import { bilingual } from '../text';

// Text for /compute (FR /calcul). Facts about NSG come from nsgportal.org (home, overview,
// policy, FAQ, infra, data, team, citation pages), the NSG portal's tool list and SDSC's Expanse
// page, all read on 26 November 2026. Facts about running jobs come from the nsg-agent-kit docs.
// Commands shown on the page are in page.tsx, copied from the kit's README and docs.
export default bilingual(
  {
    title: 'Calcul gratuit pour les neurosciences : la Neuroscience Gateway',
    description:
      "Ce qu'est la Neuroscience Gateway (NSG) du San Diego Supercomputer Center, les logiciels qu'elle offre, les données NEMAR déjà sur place, comment obtenir un compte et comment l'utiliser avec nsg-agent-kit.",
    eyebrow: 'Calcul',
    titleStart: 'Calcul gratuit pour les neurosciences : ',
    titleHighlight: 'la Neuroscience Gateway',
    lead:
      "La Neuroscience Gateway (NSG) donne aux neuroscientifiques du temps sur des superordinateurs, sans frais pour les utilisateurs universitaires et sans but lucratif. Vous envoyez votre code et vos paramètres, NSG lance la tâche et vous rend les résultats. Cette page explique ce que NSG offre, comment y accéder, et comment nsg-agent-kit, un projet de NeuroTechX, aide les personnes et les agents d'IA à s'en servir.",
    checked: 'Faits vérifiés sur les pages de NSG, de SDSC et de NEMAR le 26 novembre 2026.',
    tocTitle: 'Sur cette page',
    toc: {
      what: "Ce qu'est NSG",
      tools: 'Ce qui roule sur NSG',
      data: 'Les données déjà sur place',
      access: 'Obtenir un accès',
      kit: 'nsg-agent-kit',
      ideas: 'Idées pour les membres',
      limits: 'Limites et bonnes pratiques',
      boundaries: 'Ce que NeuroTechX est et n’est pas ici',
      sources: 'Sources',
    },

    what: {
      title: "Ce qu'est NSG",
      body: [
        "La Neuroscience Gateway est une passerelle scientifique : un portail Web et une API REST qui envoient des tâches de neurosciences sur des ressources de calcul de haute performance. Elle est en service depuis décembre 2012.",
        "Elle est exploitée par le San Diego Supercomputer Center (SDSC) de l'Université de Californie à San Diego, en collaboration avec l'Université Yale et l'University College London. L'équipe est dirigée par Amit Majumdar (SDSC, chercheur principal), avec Subhashini Sivagnanam (SDSC) et Ted Carnevale (Yale) comme cochercheurs.",
        "NSG est financée par des subventions actuelles et passées de la National Science Foundation (NSF) et des National Institutes of Health (NIH) des États-Unis, et du Biotechnology and Biological Sciences Research Council (BBSRC) du Royaume-Uni. Le temps de calcul vient d'une allocation annuelle que l'équipe de NSG obtient par ACCESS, le programme de la NSF qui répartit le temps sur ses superordinateurs. NSG le partage ensuite entre ses utilisateurs.",
      ],
      factsTitle: 'En bref',
      facts: [
        {
          name: 'Qui peut l’utiliser',
          body: "Toute personne qui fait de la recherche ou de l'enseignement en neurosciences, peu importe son pays : chercheurs d'établissements universitaires et sans but lucratif, étudiants, enseignants, et chercheurs de l'industrie.",
        },
        {
          name: 'Ce que ça coûte',
          body: "Rien pour les utilisateurs d'établissements universitaires et sans but lucratif. Les entreprises doivent écrire à nsghelp@sdsc.edu pour connaître les conditions; la politique de NSG demande aux utilisateurs de l'industrie de publier leurs résultats en libre accès.",
        },
        {
          name: 'Combien de temps de calcul',
          body: "La limite de départ est de 20 000 heures-cœur par année. On peut en demander plus selon ses besoins. NSG distribue une part équitable de son allocation : ce n'est pas illimité.",
        },
        {
          name: 'Pour les cours',
          body: "NSG encourage son usage en classe et en atelier. Écrivez à nsghelp@sdsc.edu bien avant le début du cours.",
        },
      ],
      cite:
        "Si NSG sert à vos travaux, citez-la. NSG demande de citer Sivagnanam et collab. (2013), « Introducing the Neuroscience Gateway », et l'article sur le portail EEGLAB si vous avez utilisé EEGLAB par NSG. Le financement de NSG dépend en partie des publications qui la citent.",
    },

    tools: {
      title: 'Ce qui roule sur NSG',
      lead:
        "Sur NSG, chaque logiciel est un « outil » déjà installé. Vous choisissez l'outil, vous envoyez votre code, et NSG lance la tâche. Voici les outils de la liste publique du portail, regroupés par usage. Les versions sont celles que le portail affiche.",
      groups: [
        {
          name: 'Simulation de neurones et de réseaux',
          items: [
            'NEURON 8.2.2 et CoreNEURON 8.2.3',
            'HNN (Human Neocortical Neurosolver) 0.6.1, avec ou sans interface graphique',
            'PGENESIS 2.4 (GENESIS parallèle)',
            'BluePyOpt (optimisation de modèles)',
            'Python on Expanse 3.11.4, avec BMTK, Brian 2, DEAP, HNN-Core, NetPyNE, PyNN et NEST',
          ],
        },
        {
          name: 'Analyse de données',
          items: [
            'EEGLAB et AMICA (ACI adaptative par mélange)',
            'MATLAB 2020B',
            'FreeSurfer 7.1.1 et MRtrix 3.0.3 (version Neurodesk) pour l’IRM',
            'SpikeInterface 0.101.0 pour le tri des potentiels d’action',
            'NIC Converter, NIC Correlator et NIC TDA',
          ],
        },
        {
          name: 'Apprentissage automatique sur GPU',
          items: [
            'PyTorch Python on Expanse (2.0.1+cu117)',
            'TensorFlow Python on Expanse, et une version sur l’Open Science Grid',
            'Python on Expanse GPU',
            'HiAER-Spike, Python accéléré par FPGA',
          ],
        },
      ],
      toolsNote: 'Il manque un logiciel? NSG accepte les demandes à nsghelp@sdsc.edu.',
      hardwareTitle: 'Le matériel',
      hardware:
        "Les outils roulent sur Expanse, un superordinateur du SDSC. Selon la page d'Expanse du SDSC, ses nœuds GPU portent chacun quatre GPU NVIDIA V100 SXM2 de 32 Go, et ses nœuds standards ont 128 cœurs AMD EPYC. Pour les fichiers de plus de 5 Go en entrée ou en sortie, NSG offre des transferts Globus sur demande.",
    },

    data: {
      title: 'Les données déjà sur place : NEMAR',
      body: [
        "NEMAR est une ressource libre de données, d'outils et de calcul pour l'EEG, la MEG, l'EEG intracrânien et l'EMG humains, y compris un miroir des données d'OpenNeuro, en format BIDS. Sa page d'accueil indiquait 910 jeux de données le 26 novembre 2026.",
        "NEMAR a été conçu avec NSG : on choisit un jeu de données dans NEMAR, puis on le traite sur les ressources du SDSC par NSG (Delorme et collab., 2022). Dans une tâche NSG, le miroir OpenNeuro se lit dans le dossier donné par la variable NEMARPATH, en lecture seule. Il n'y a rien à télécharger.",
      ],
      tip:
        "Pour trouver un jeu de données, cherchez sur nemar.org ou openneuro.org; chaque jeu a un identifiant ds suivi de six chiffres. Les scripts de recherche de nsg-agent-kit interrogent l'API publique d'OpenNeuro depuis votre ordinateur, en quelques secondes, sans tâche NSG.",
    },

    access: {
      title: 'Obtenir un accès',
      steps: [
        {
          name: '1. Créer un compte',
          body: "Sur la page de connexion du portail NSG, remplissez le formulaire pour les nouveaux utilisateurs, puis lisez et acceptez la politique d'utilisation. Le compte est approuvé par l'équipe de NSG.",
        },
        {
          name: '2. Choisir : portail ou API',
          body: "Le portail Web suffit pour commencer : on téléverse un fichier zip de son code, on crée une tâche, on choisit l'outil et les paramètres, puis on télécharge les résultats. L'API REST, NSG-R, sert à automatiser : scripts, balayages de paramètres, agents.",
        },
        {
          name: '3. Pour l’API : une clé d’application',
          body: "Dans le portail, menu Developer, puis Application Management : créez une application de type DIRECT. Le portail affiche un Application ID. Chaque requête envoie votre nom d'utilisateur et votre mot de passe en authentification HTTP Basic, plus cet identifiant dans l'en-tête cipres-appkey.",
        },
      ],
      policyTitle: 'Les règles à respecter',
      policy: [
        "Seulement des données dépersonnalisées. Les données de sujets humains doivent être dépersonnalisées avant d'être transférées sur NSG, et les exigences du comité d'éthique de votre établissement s'appliquent.",
        "Le temps de calcul est partagé entre tous les utilisateurs. Regroupez vos tâches et justifiez les gros balayages.",
        "Les données d'un compte inactif depuis un an peuvent être effacées après un avis.",
      ],
      secretsTitle: 'Vos identifiants',
      secrets:
        "Ne mettez jamais votre mot de passe dans un dépôt, un carnet ou une conversation avec une IA. Les exemples de cette page utilisent des valeurs fictives. Créez une clé d'application par projet ou par agent : chaque clé se régénère séparément si elle fuit. Si une requête échoue à cause d'un certificat, ne désactivez pas la vérification; écrivez plutôt à nsghelp@sdsc.edu.",
      portalCta: 'Ouvrir le portail NSG',
      registerNote: 'Le formulaire d’inscription est sur la page de connexion.',
    },

    kit: {
      title: 'nsg-agent-kit',
      byline: 'Par Morgan Hough, directeur général de NeuroTechX. Licence MIT.',
      body: [
        "nsg-agent-kit rassemble ce qu'il faut pour passer d'un compte NSG à une première tâche sur un GPU, puis à de vrais projets. Il est écrit pour les personnes et pour les agents d'IA qui pilotent NSG par son API.",
      ],
      featuresTitle: 'Ce qu’il contient',
      features: [
        {
          name: 'nsgr.sh',
          body: 'Un petit script autour de curl pour soumettre une tâche, lister ses tâches, suivre leur état et récupérer les résultats. Les identifiants viennent de variables d’environnement.',
        },
        {
          name: 'Gabarits et exemples',
          body: "Des gabarits de zip pour PyTorch sur GPU, Python sur CPU et l'EEG de NEMAR, et des exemples complets avec des tests qui passent au vert quand les résultats reviennent.",
        },
        {
          name: 'Recherche dans NEMAR',
          body: "Des scripts pour trouver un jeu de données par mot-clé, tâche BIDS, modalité ou nombre de participants, et vérifier son contenu, sans dépenser de tâche NSG.",
        },
        {
          name: 'Compétences pour agents',
          body: "Trois compétences (skills) pour agents, nemar-search, nemar-inspect et nemar-job, qui décrivent chaque étape : chercher, vérifier, puis lancer la tâche sur Expanse.",
        },
        {
          name: 'La documentation des contraintes',
          body: "Ce qu'il faut savoir avant de porter du vrai code : l'environnement Python est en lecture seule, les versions sont fixes, les tâches ne gardent rien d'une fois à l'autre. Chaque fait est daté.",
        },
        {
          name: 'OpenEEGBench à grande échelle',
          body: "Un planificateur et un pilote qui découpent le banc d'essai OpenEEGBench en tâches NSG et regroupent les résultats.",
        },
      ],
      quickTitle: 'Démarrage rapide',
      quickLead:
        "Ces commandes viennent du README du dépôt. Remplacez les valeurs fictives par les vôtres dans nsgr/config.env, un fichier que git ignore.",
      quickSteps: {
        clone: 'Cloner le dépôt et copier le fichier de configuration :',
        config: 'Dans nsgr/config.env, inscrire votre nom d’utilisateur et votre Application ID :',
        secret: 'Garder le mot de passe hors du dépôt, dans un fichier lisible par vous seul :',
        verify: 'Vérifier l’accès. Une réponse HTTP 200 avec une balise <joblist> veut dire que ça marche :',
        run: 'Construire le petit exemple (un encodeur figé sur de l’EEG simulé, environ 2 minutes sur un V100), le soumettre, puis récupérer les résultats :',
        search: 'Chercher des jeux de données NEMAR depuis votre ordinateur :',
      },
      portalNote: "Vous préférez cliquer? Le même zip se soumet par le portail; le guide submit-portal.md explique chaque écran.",
      docsTitle: 'La documentation',
      docs: {
        readme: 'README : vue d’ensemble et démarrage',
        access: 'NSG_ACCESS.md : compte et clé d’application, pas à pas',
        start: 'GETTING_STARTED.md : guide pour débutants',
        limits: 'LIMITATIONS.md : les contraintes à respecter',
        deps: 'dependencies.md : installer des paquets',
        nemar: 'nemar-data.md : lire les données NEMAR',
        portal: 'submit-portal.md : soumettre par le portail',
        rest: 'submit-rest.md : soumettre par l’API',
        oeb: 'OPENEEGBENCH.md : OpenEEGBench sur NSG',
      },
      repoCta: 'Voir le dépôt sur GitHub',
      lessonsTitle: 'Deux leçons EEG pour commencer',
      lessonsBody:
        "Le dépôt nemar-nsg-starter, une copie du kit, ajoute deux leçons pour les personnes qui arrivent du labo de moyennage d'Apprendre. Elles se soumettent par le portail avec l'outil Python on Expanse, sans GPU. La première mesure la P300 dans un enregistrement PURSUE déjà présent dans NEMAR. La seconde lance MNE-BIDS-Pipeline sur la tâche P3 des 40 participants d'ERP CORE, le jeu de données du laboratoire de Steven Luck, et compare le résultat avec l'article de Kappenman et collab. (2021). ERP CORE n'est pas dans NEMAR : la tâche télécharge les fichiers depuis OSF et vérifie chacun.",
      lessons: {
        pursue: 'Leçon 1 : la P300 dans un enregistrement PURSUE',
        erpCore: 'Leçon 2 : la P3 chez les 40 participants d’ERP CORE',
      },
    },

    ideas: {
      title: 'Idées pour les membres de NeuroTechX',
      lead: 'Des projets concrets pour lesquels un portable ne suffit plus.',
      items: [
        {
          name: 'Les labos d’Apprendre à pleine échelle',
          body: "Les scripts qui construisent les labos d'Apprendre sont dans le dossier scripts/ du dépôt du site. Celui du labo d'EEG haute densité traite un seul participant de ds005505 (HBN-EEG, version 1), un jeu que NEMAR liste : refaire les mêmes étapes pour tous les participants est une bonne première tâche NSG. Celui du labo de MEG à OPM ajuste un modèle de Markov caché; on peut comparer plusieurs germes aléatoires en parallèle. Celui du labo de fNIRS Kernel Flow2 lit ds005927, que NEMAR ne liste pas : il faut l'apporter dans le zip, ou par Globus s'il dépasse 5 Go.",
        },
        {
          name: 'Bancs d’essai',
          body: "Comparer des modèles EEG sur les mêmes données : OpenEEGBench avec le pilote du kit, ou des comparaisons MOABB. Publiez le code et les versions pour que d'autres puissent refaire le calcul.",
        },
        {
          name: 'Projets de clubs étudiants',
          body: "Chaque membre ouvre son propre compte. Un club peut simuler des réseaux avec NEURON, NetPyNE ou HNN, ou entraîner un petit décodeur sur un jeu de NEMAR. Pour un cours, prévenez NSG d'avance.",
        },
        {
          name: 'Calcul pour les hackathons',
          body: "Faites créer les comptes avant l'événement, puisqu'ils doivent être approuvés. Testez l'exemple du kit d'avance : une tâche prend au moins quelques minutes à revenir. Préparez les zips et choisissez les jeux de données avant le jour J.",
        },
      ],
    },

    limits: {
      title: 'Limites et bonnes pratiques',
      lead: "Ces points viennent de la documentation du kit, mesurés sur de vraies tâches. Lisez LIMITATIONS.md avant de porter un vrai projet.",
      items: [
        "C'est du traitement par lots, pas un poste interactif : même une tâche minuscule prend environ 8 à 10 minutes aller-retour. Déboguez sur votre ordinateur d'abord.",
        'Une tâche dure au plus 48 heures. Enregistrez des points de reprise dans le dossier de travail.',
        "L'environnement Python de chaque outil est en lecture seule. Installez vos paquets dans $TMPDIR avec pip install --target.",
        "Les versions sont fixes : l'outil PyTorch utilise torch 2.0.1. Fixez numpy sous la version 2.",
        "NSG vous renvoie tout le dossier de travail. N'y installez pas vos paquets, sinon le téléchargement grossit beaucoup.",
        'Chaque tâche part de zéro : rien n’est conservé d’une tâche à l’autre.',
      ],
    },

    boundaries: {
      title: 'Ce que NeuroTechX est et n’est pas ici',
      items: [
        "NeuroTechX n'est ni affiliée au SDSC ni partenaire de NSG. NSG est exploitée par le SDSC; ses règles et ses décisions sont les siennes.",
        "nsg-agent-kit est un projet communautaire bâti sur les interfaces publiques de NSG. NSG ne l'a pas produit et ne le soutient pas officiellement.",
        "Pour un compte, une allocation ou un problème sur NSG, écrivez à nsghelp@sdsc.edu. Pour un problème avec le kit, ouvrez un ticket sur son dépôt GitHub.",
      ],
    },

    sourcesTitle: 'Sources',
    sources: {
      overview: 'NSG : présentation du portail',
      policy: 'NSG : politiques du portail',
      faq: 'NSG : FAQ',
      infra: 'NSG : ressources de calcul et gestion des données',
      team: 'NSG : équipe',
      citation: 'NSG : comment citer NSG',
      dataTransfer: 'NSG : transferts de données et partage (Globus)',
      restGuide: 'NSG : guide de NSG-R',
      tools: 'Portail NSG : liste des outils',
      expanse: 'SDSC : Expanse',
      nemar: 'NEMAR',
      paper2013: 'Sivagnanam et collab. (2013), Introducing the Neuroscience Gateway, IWSG, CEUR Workshop Proceedings 993',
      paper2022: 'Delorme et collab. (2022), NEMAR: an open access data, tools and compute resource operating on neuroelectromagnetic data, Database',
      kit: 'nsg-agent-kit sur GitHub',
    },
    english: 'en anglais',
    related: 'Voir aussi',
    relatedLearn: 'Apprendre',
    relatedProjects: 'Projets libres',
  },
  {
    title: 'Free compute for neuroscience: the Neuroscience Gateway',
    description:
      "What the San Diego Supercomputer Center's Neuroscience Gateway (NSG) is, the software it offers, the NEMAR data already there, how to get an account, and how to use it with nsg-agent-kit.",
    eyebrow: 'Compute',
    titleStart: 'Free compute for neuroscience: ',
    titleHighlight: 'the Neuroscience Gateway',
    lead:
      "The Neuroscience Gateway (NSG) gives neuroscientists time on supercomputers, free for academic and non-profit users. You send your code and settings, NSG runs the job and hands back the results. This page explains what NSG offers, how to get access, and how nsg-agent-kit, a NeuroTechX project, helps people and AI agents use it.",
    checked: 'Facts checked on the NSG, SDSC and NEMAR pages on 26 November 2026.',
    tocTitle: 'On this page',
    toc: {
      what: 'What NSG is',
      tools: 'What runs on NSG',
      data: 'Data already there',
      access: 'Getting access',
      kit: 'nsg-agent-kit',
      ideas: 'Ideas for members',
      limits: 'Limits and good practice',
      boundaries: 'What NeuroTechX is and is not here',
      sources: 'Sources',
    },

    what: {
      title: 'What NSG is',
      body: [
        'The Neuroscience Gateway is a science gateway: a web portal and a REST API that send neuroscience jobs to high-performance computing resources. It has been in production since December 2012.',
        'It is run by the San Diego Supercomputer Center (SDSC) at UC San Diego, in collaboration with Yale University and University College London. The team is led by Amit Majumdar (SDSC, principal investigator), with Subhashini Sivagnanam (SDSC) and Ted Carnevale (Yale) as co-investigators.',
        "NSG is funded by current and past grants from the US National Science Foundation (NSF), the US National Institutes of Health (NIH) and the UK Biotechnology and Biological Sciences Research Council (BBSRC). The computer time comes from a yearly allocation that the NSG team wins through ACCESS, the NSF programme that shares out time on its supercomputers. NSG then shares that time among its users.",
      ],
      factsTitle: 'At a glance',
      facts: [
        {
          name: 'Who can use it',
          body: 'Anyone doing neuroscience research or education, from any country: researchers at academic and non-profit institutions, students, educators and industry researchers.',
        },
        {
          name: 'What it costs',
          body: "Nothing for users at academic and non-profit institutions. Companies should write to nsghelp@sdsc.edu about the conditions; NSG's policy asks industry users to publish their results in open journals.",
        },
        {
          name: 'How much compute',
          body: 'The starting limit is 20,000 core hours a year. You can ask for more based on your needs. NSG gives each user a fair share of its allocation: it is not unlimited.',
        },
        {
          name: 'For courses',
          body: 'NSG encourages use in classes and workshops. Write to nsghelp@sdsc.edu well before the course starts.',
        },
      ],
      cite:
        'If NSG helps your work, cite it. NSG asks you to cite Sivagnanam et al. (2013), "Introducing the Neuroscience Gateway", and the EEGLAB portal paper if you used EEGLAB through NSG. NSG\'s funding depends in part on the publications that cite it.',
    },

    tools: {
      title: 'What runs on NSG',
      lead:
        'On NSG each piece of software is a pre-installed "tool". You pick the tool, send your code, and NSG runs the job. These are the tools on the portal\'s public list, grouped by use. Versions are the ones the portal shows.',
      groups: [
        {
          name: 'Neuron and network simulation',
          items: [
            'NEURON 8.2.2 and CoreNEURON 8.2.3',
            'HNN (Human Neocortical Neurosolver) 0.6.1, with or without its GUI',
            'PGENESIS 2.4 (parallel GENESIS)',
            'BluePyOpt (model optimisation)',
            'Python on Expanse 3.11.4, with BMTK, Brian 2, DEAP, HNN-Core, NetPyNE, PyNN and NEST',
          ],
        },
        {
          name: 'Data analysis',
          items: [
            'EEGLAB and AMICA (adaptive mixture ICA)',
            'MATLAB 2020B',
            'FreeSurfer 7.1.1 and MRtrix 3.0.3 (Neurodesk build) for MRI',
            'SpikeInterface 0.101.0 for spike sorting',
            'NIC Converter, NIC Correlator and NIC TDA',
          ],
        },
        {
          name: 'Machine learning on GPUs',
          items: [
            'PyTorch Python on Expanse (2.0.1+cu117)',
            'TensorFlow Python on Expanse, and a version on the Open Science Grid',
            'Python on Expanse GPU',
            'HiAER-Spike, FPGA-accelerated Python',
          ],
        },
      ],
      toolsNote: 'Missing a package? NSG takes software requests at nsghelp@sdsc.edu.',
      hardwareTitle: 'The hardware',
      hardware:
        "The tools run on Expanse, an SDSC supercomputer. According to SDSC's Expanse page, each of its GPU nodes carries four NVIDIA V100 SXM2 GPUs with 32 GB each, and its standard nodes have 128 AMD EPYC cores. For input or output files over 5 GB, NSG offers Globus transfers on request.",
    },

    data: {
      title: 'Data already there: NEMAR',
      body: [
        "NEMAR is an open-access data, tools and compute resource for human EEG, MEG, intracranial EEG and EMG, including a mirror of OpenNeuro's data, in BIDS format. Its home page listed 910 datasets on 26 November 2026.",
        'NEMAR was built to work with NSG: you pick a dataset in NEMAR, then process it on SDSC resources through NSG (Delorme et al., 2022). Inside an NSG job, the OpenNeuro mirror is read from the folder in the NEMARPATH variable, read-only. There is nothing to download.',
      ],
      tip:
        "To find a dataset, search nemar.org or openneuro.org; each dataset has an id made of ds and six digits. The nsg-agent-kit search scripts query OpenNeuro's public API from your own computer, in seconds, without an NSG job.",
    },

    access: {
      title: 'Getting access',
      steps: [
        {
          name: '1. Create an account',
          body: "On the NSG portal's login page, fill in the new-user form, then read and accept the usage policy. The NSG team approves the account.",
        },
        {
          name: '2. Choose: portal or API',
          body: 'The web portal is enough to start: you upload a zip of your code, create a task, pick the tool and settings, then download the results. The REST API, NSG-R, is for automation: scripts, parameter sweeps, agents.',
        },
        {
          name: '3. For the API: an application key',
          body: 'In the portal, open the Developer menu, then Application Management, and create an application of type DIRECT. The portal shows an Application ID. Each request sends your username and password with HTTP Basic authentication, plus that ID in the cipres-appkey header.',
        },
      ],
      policyTitle: 'Rules to follow',
      policy: [
        "De-identified data only. Human-subject data must be de-identified before it is transferred to NSG, and your institution's ethics board requirements apply.",
        'Compute time is shared among all users. Batch your jobs and justify large sweeps.',
        'Data in an account unused for a year may be deleted after a notice.',
      ],
      secretsTitle: 'Your credentials',
      secrets:
        'Never put your password in a repository, a notebook or a chat with an AI. The examples on this page use placeholder values. Create one application key per project or agent: each key can be regenerated on its own if it leaks. If a request fails with a certificate error, do not turn off certificate checks; write to nsghelp@sdsc.edu instead.',
      portalCta: 'Open the NSG portal',
      registerNote: 'The sign-up form is on the login page.',
    },

    kit: {
      title: 'nsg-agent-kit',
      byline: 'By Morgan Hough, Executive Director of NeuroTechX. MIT licence.',
      body: [
        'nsg-agent-kit collects what you need to go from an NSG account to a first job on a GPU, and then to real projects. It is written for people and for AI agents that drive NSG through its API.',
      ],
      featuresTitle: 'What is in it',
      features: [
        {
          name: 'nsgr.sh',
          body: 'A small wrapper around curl to submit a job, list your jobs, check their status and fetch the results. Credentials come from environment variables.',
        },
        {
          name: 'Templates and examples',
          body: 'Zip templates for PyTorch on GPU, Python on CPU and NEMAR EEG, and complete examples with tests that turn green when the results come back.',
        },
        {
          name: 'NEMAR search',
          body: 'Scripts to find a dataset by keyword, BIDS task, modality or number of participants, and to check what it holds, without spending an NSG job.',
        },
        {
          name: 'Agent skills',
          body: 'Three agent skills, nemar-search, nemar-inspect and nemar-job, that describe each step: search, check, then run the job on Expanse.',
        },
        {
          name: 'Documented constraints',
          body: 'What to know before porting real code: the Python environment is read-only, versions are fixed, jobs keep nothing between runs. Each fact is dated.',
        },
        {
          name: 'OpenEEGBench at scale',
          body: 'A planner and a driver that split the OpenEEGBench benchmark into NSG jobs and collect the results.',
        },
      ],
      quickTitle: 'Quickstart',
      quickLead:
        "These commands come from the repository's README. Replace the placeholder values with your own in nsgr/config.env, a file git ignores.",
      quickSteps: {
        clone: 'Clone the repository and copy the config file:',
        config: 'In nsgr/config.env, fill in your username and your Application ID:',
        secret: 'Keep the password out of the repository, in a file only you can read:',
        verify: 'Check access. An HTTP 200 reply with a <joblist> tag means it works:',
        run: 'Build the small example (a frozen encoder on simulated EEG, about 2 minutes on a V100), submit it, then fetch the results:',
        search: 'Search NEMAR datasets from your own computer:',
      },
      portalNote: 'Prefer clicking? The same zip can be submitted through the portal; the submit-portal.md guide walks through each screen.',
      docsTitle: 'Documentation',
      docs: {
        readme: 'README: overview and quickstart',
        access: 'NSG_ACCESS.md: account and application key, step by step',
        start: 'GETTING_STARTED.md: guide for newcomers',
        limits: 'LIMITATIONS.md: the constraints to work within',
        deps: 'dependencies.md: installing packages',
        nemar: 'nemar-data.md: reading NEMAR data',
        portal: 'submit-portal.md: submitting through the portal',
        rest: 'submit-rest.md: submitting through the API',
        oeb: 'OPENEEGBENCH.md: OpenEEGBench on NSG',
      },
      repoCta: 'View the repository on GitHub',
      lessonsTitle: 'Two EEG lessons to start with',
      lessonsBody:
        "The nemar-nsg-starter repository, a copy of the kit, adds two lessons for people coming from the Learn averaging lab. Both are submitted through the portal with the CPU tool Python on Expanse. The first measures the P300 in one PURSUE recording that is already in NEMAR. The second runs MNE-BIDS-Pipeline on the P3 task for all 40 ERP CORE participants, the dataset from Steven Luck's lab, and compares the result with Kappenman et al. (2021). ERP CORE is not in NEMAR, so the job downloads the files from OSF and checks each one.",
      lessons: {
        pursue: 'Lesson 1: the P300 in one PURSUE recording',
        erpCore: 'Lesson 2: the P3 across 40 ERP CORE participants',
      },
    },

    ideas: {
      title: 'Ideas for NeuroTechX members',
      lead: 'Practical projects where a laptop is no longer enough.',
      items: [
        {
          name: 'The Learn labs at full scale',
          body: "The scripts that build the Learn labs are in the scripts/ folder of the website's repository. The HD-EEG lab script processes a single participant of ds005505 (HBN-EEG Release 1), a dataset NEMAR lists: running the same steps for every participant is a good first NSG job. The OPM-MEG lab script fits a hidden Markov model; you can compare several random seeds in parallel. The Kernel Flow2 fNIRS lab script reads ds005927, which NEMAR does not list: bring it in the zip, or through Globus if it is over 5 GB.",
        },
        {
          name: 'Benchmarks',
          body: "Compare EEG models on the same data: OpenEEGBench with the kit's driver, or MOABB comparisons. Publish the code and versions so others can redo the computation.",
        },
        {
          name: 'Student club projects',
          body: 'Each member opens their own account. A club can simulate networks with NEURON, NetPyNE or HNN, or train a small decoder on a NEMAR dataset. For a course, tell NSG ahead of time.',
        },
        {
          name: 'Hackathon compute',
          body: "Have accounts created before the event, since they need approval. Test the kit's example beforehand: a job takes at least a few minutes to come back. Prepare the zips and pick the datasets before the day.",
        },
      ],
    },

    limits: {
      title: 'Limits and good practice',
      lead: "These points come from the kit's docs, measured on real jobs. Read LIMITATIONS.md before porting a real project.",
      items: [
        'This is batch processing, not an interactive machine: even a tiny job takes about 8 to 10 minutes round trip. Debug on your own computer first.',
        'A job runs for at most 48 hours. Save checkpoints in the working folder.',
        "Each tool's Python environment is read-only. Install your packages into $TMPDIR with pip install --target.",
        'Versions are fixed: the PyTorch tool uses torch 2.0.1. Pin numpy below version 2.',
        'NSG returns the whole working folder. Do not install packages there, or the download grows a lot.',
        'Each job starts from scratch: nothing is kept between jobs.',
      ],
    },

    boundaries: {
      title: 'What NeuroTechX is and is not here',
      items: [
        'NeuroTechX is not affiliated with SDSC and is not a partner of NSG. NSG is run by SDSC; its rules and decisions are its own.',
        'nsg-agent-kit is a community project built on NSG\'s public interfaces. NSG did not produce it and does not officially support it.',
        'For an account, an allocation or a problem on NSG, write to nsghelp@sdsc.edu. For a problem with the kit, open an issue on its GitHub repository.',
      ],
    },

    sourcesTitle: 'Sources',
    sources: {
      overview: 'NSG: overview of the portal',
      policy: 'NSG: portal policies',
      faq: 'NSG: FAQ',
      infra: 'NSG: computing resources and data management',
      team: 'NSG: team',
      citation: 'NSG: how to cite NSG',
      dataTransfer: 'NSG: data transfer and sharing (Globus)',
      restGuide: 'NSG: NSG-R user guide',
      tools: 'NSG portal: list of tools',
      expanse: 'SDSC: Expanse',
      nemar: 'NEMAR',
      paper2013: 'Sivagnanam et al. (2013), Introducing the Neuroscience Gateway, IWSG, CEUR Workshop Proceedings 993',
      paper2022: 'Delorme et al. (2022), NEMAR: an open access data, tools and compute resource operating on neuroelectromagnetic data, Database',
      kit: 'nsg-agent-kit on GitHub',
    },
    english: 'in English',
    related: 'See also',
    relatedLearn: 'Learn',
    relatedProjects: 'Open source projects',
  },
);
