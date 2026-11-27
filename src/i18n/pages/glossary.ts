import { bilingual } from '../text';
import {
  EEG_CAPSTONE_PATH,
  ERP_LAB_PATH,
  FILTERING_LAB_PATH,
  FIRST_EEG_PATH,
  MRI_LAB_PATH,
  primerCheckPath,
} from '../../content/learn/primer-chapters';

// A link under a definition. Site paths start with '/' and are English route paths (the page
// localizes them); anything else is an external source and opens in a new tab.
type GlossaryLink = { label: string; href: string };
type GlossaryTerm = { id: string; term: string; summary: string; links?: GlossaryLink[] };
type GlossarySection = { id: string; title: string; terms: GlossaryTerm[] };

const lesson = (slug: string) => `/learn/${slug}`;

const SRC = {
  nuclearMedicine: 'https://www.nibib.nih.gov/science-education/science-topics/nuclear-medicine',
  purvesActionPotential: 'https://www.ncbi.nlm.nih.gov/books/NBK11053/',
  buzsaki2012: 'https://doi.org/10.1038/nrn3241',
  braingate: 'https://www.braingate.org/',
  mneReference: 'https://mne.tools/stable/auto_tutorials/preprocessing/55_setting_eeg_reference.html',
  biosemiDrl: 'https://www.biosemi.com/faq/cms&drl.htm',
  mneMontage: 'https://mne.tools/stable/auto_tutorials/intro/40_sensor_locations.html',
  mneArtifacts: 'https://mne.tools/stable/auto_tutorials/preprocessing/10_preprocessing_overview.html',
  mneFiltering: 'https://mne.tools/stable/auto_tutorials/preprocessing/25_background_filtering.html',
  mneEpochs: 'https://mne.tools/stable/auto_tutorials/epochs/10_epochs_overview.html',
  mneIca: 'https://mne.tools/stable/auto_tutorials/preprocessing/40_artifact_correction_ica.html',
  pfurtscheller1999: 'https://doi.org/10.1016/S1388-2457(99)00141-8',
  sitaram2017: 'https://doi.org/10.1038/nrn.2016.164',
  mneCsp: 'https://mne.tools/stable/auto_examples/decoding/decoding_csp_eeg.html',
  pyriemann: 'https://pyriemann.readthedocs.io/',
  congedo2017: 'https://doi.org/10.1080/2326263X.2017.1297192',
  sklearnLda: 'https://scikit-learn.org/stable/modules/lda_qda.html',
  sklearnCv: 'https://scikit-learn.org/stable/modules/cross_validation.html',
  combrisson2015: 'https://doi.org/10.1016/j.jneumeth.2015.01.010',
  moabbCrossSubject: 'https://moabb.neurotechx.com/docs/generated/moabb.evaluations.CrossSubjectEvaluation.html',
  labram: 'https://arxiv.org/abs/2405.18765',
  lsl: 'https://labstreaminglayer.readthedocs.io/',
  xdf: 'https://github.com/sccn/xdf',
  bids: 'https://bids.neuroimaging.io/',
  openneuro: 'https://openneuro.org/',
  mne: 'https://mne.tools/',
  moabb: 'https://moabb.neurotechx.com/',
  fda: 'https://www.fda.gov/medical-devices/how-study-and-market-your-device/premarket-submissions-selecting-and-preparing-correct-submission',
  mdr: 'https://eur-lex.europa.eu/eli/reg/2017/745/oj',
  hcRegsEn: 'https://laws-lois.justice.gc.ca/eng/regulations/sor-98-282/',
  hcRegsFr: 'https://laws-lois.justice.gc.ca/fra/reglements/DORS-98-282/',
  tcps2En: 'https://ethics.gc.ca/eng/policy-politique_tcps2-eptc2_2022.html',
  tcps2Fr: 'https://ethics.gc.ca/fra/policy-politique_tcps2-eptc2_2022.html',
  tcps2ConsentEn: 'https://ethics.gc.ca/eng/tcps2-eptc2_2022_chapter3-chapitre3.html',
  tcps2ConsentFr: 'https://ethics.gc.ca/fra/tcps2-eptc2_2022_chapter3-chapitre3.html',
  oecdNeurotech: 'https://legalinstruments.oecd.org/en/instruments/OECD-LEGAL-0457',
};

type GlossaryText = {
  title: string;
  description: string;
  eyebrow: string;
  heading: string;
  subtitle: string;
  jumpTo: string;
  learnMoreHeading: string;
  learnMoreBody: string;
  learnLink: string;
  safetyLink: string;
  sections: GlossarySection[];
};

const fr: GlossaryText = {
  title: 'Glossaire de la neurotechnologie',
  description:
    "Définitions claires des sigles et notions essentiels en neurotechnologie : ICM, EEG, fNIRS, TEP, filtres, époques, CSP, validation croisée, LSL, BIDS, consentement et voies réglementaires.",
  eyebrow: 'Référence',
  heading: 'Glossaire de la neurotechnologie',
  subtitle:
    "Les sigles et notions de base que vous croiserez dans nos cours, offres d'emploi, articles et projets libres, expliqués simplement.",
  jumpTo: 'Aller à la section :',
  learnMoreHeading: 'Pour aller plus loin',
  learnMoreBody:
    "Parcourez nos 15 leçons gratuites pour approfondir l'EEG et les ICM, ou consultez nos repères en sécurité et en éthique.",
  learnLink: 'Commencer à apprendre',
  safetyLink: 'Sécurité et éthique',
  sections: [
    {
      id: 'basics',
      title: 'Notions de base en neurosciences',
      terms: [
        {
          id: 'neuron',
          term: 'Neurone',
          summary:
            "Cellule du système nerveux spécialisée dans la transmission de signaux. Les dendrites reçoivent les signaux d'autres neurones et l'axone transmet la réponse vers d'autres cellules.",
          links: [{ label: 'Leçon : composantes cellulaires (en anglais)', href: lesson('cellular-components') }],
        },
        {
          id: 'action-potential',
          term: "Potentiel d'action / spike",
          summary:
            "Impulsion électrique brève (environ une milliseconde) qui se propage le long de l'axone selon la loi du tout ou rien. Les microélectrodes implantées peuvent enregistrer les spikes de neurones individuels. L'EEG ne les capte pas directement.",
          links: [
            { label: 'Leçon : composantes cellulaires (en anglais)', href: lesson('cellular-components') },
            { label: 'Purves et al., Neuroscience (en anglais)', href: SRC.purvesActionPotential },
          ],
        },
        {
          id: 'synapse',
          term: 'Synapse',
          summary:
            "Zone de contact où un neurone transmet un signal à une autre cellule, le plus souvent par des neurotransmetteurs. Les courants postsynaptiques de nombreux neurones alignés sont la principale source du signal EEG.",
          links: [{ label: 'Leçon : composantes cellulaires (en anglais)', href: lesson('cellular-components') }],
        },
        {
          id: 'lfp',
          term: 'LFP (Potentiel de champ local)',
          summary:
            "Composante basse fréquence du potentiel enregistré par une électrode placée dans le tissu cérébral. Il reflète surtout la somme des courants synaptiques des neurones proches, alors que les spikes reflètent l'activité de quelques cellules.",
          links: [{ label: 'Buzsáki et al., 2012 (en anglais)', href: SRC.buzsaki2012 }],
        },
      ],
    },
    {
      id: 'recording',
      title: 'Interfaces et enregistrement',
      terms: [
        {
          id: 'bci',
          term: 'ICM / BCI (Interface cerveau-machine)',
          summary:
            "Système qui mesure l'activité du cerveau (ou du système nerveux) et la traduit en commandes pour un ordinateur, une prothèse ou un logiciel, parfois avec une rétroaction sensorielle.",
          links: [{ label: 'Leçon : introduction aux ICM (en anglais)', href: lesson('intro-to-bci') }],
        },
        {
          id: 'eeg',
          term: 'EEG (Électroencéphalographie)',
          summary:
            "Enregistrement non invasif de l'activité électrique cérébrale à l'aide d'électrodes posées sur le cuir chevelu. Excellente résolution temporelle (millisecondes), faible coût, mais résolution spatiale limitée.",
          links: [
            { label: 'Labo : lire votre premier signal EEG', href: FIRST_EEG_PATH },
            { label: 'Autoévaluation du Primer : EEG', href: primerCheckPath('eeg') },
          ],
        },
        {
          id: 'ecog',
          term: 'ECoG (Électrocorticographie)',
          summary:
            "Grille d'électrodes placée directement à la surface du cortex (sous le crâne) lors d'une intervention chirurgicale. Signal beaucoup plus net que l'EEG, sans pénétrer le tissu cérébral.",
          links: [{ label: 'Autoévaluation du Primer : EEG intracrânien', href: primerCheckPath('ieeg') }],
        },
        {
          id: 'seeg',
          term: 'sEEG (Stéréo-électroencéphalographie)',
          summary:
            "Électrodes fines implantées en profondeur dans le cerveau, surtout utilisées en clinique pour localiser les foyers épileptiques et de plus en plus en recherche sur les ICM.",
          links: [{ label: 'Autoévaluation du Primer : EEG intracrânien', href: primerCheckPath('ieeg') }],
        },
        {
          id: 'utah-array',
          term: 'Matrice de Utah (Utah array)',
          summary:
            "Petite grille de silicium portant jusqu'à 100 microélectrodes (10 × 10) d'environ 1 à 1,5 mm de long, implantée dans le cortex. Elle enregistre des spikes et des LFP et a servi à la plupart des études d'ICM implantées chez l'humain, dont BrainGate.",
          links: [
            { label: 'Leçon : technologies émergentes (en anglais)', href: lesson('emerging-technologies') },
            { label: 'BrainGate (en anglais)', href: SRC.braingate },
          ],
        },
        {
          id: 'meg',
          term: 'MEG (Magnétoencéphalographie)',
          summary:
            "Mesure non invasive des minuscules champs magnétiques produits par les courants neuronaux. Offre une résolution temporelle comparable à l'EEG avec une meilleure localisation spatiale, en salle blindée (capteurs SQUID ou OPM).",
          links: [{ label: 'Autoévaluation du Primer : MEG', href: primerCheckPath('meg') }],
        },
        {
          id: 'fnirs',
          term: 'fNIRS (Spectroscopie fonctionnelle proche infrarouge)',
          summary:
            "Imagerie optique portable qui utilise la lumière proche infrarouge pour mesurer les variations d'oxygénation sanguine dans le cortex. Plus lente que l'EEG mais robuste aux artefacts électriques.",
          links: [{ label: 'Autoévaluation du Primer : fNIRS', href: primerCheckPath('fnirs') }],
        },
        {
          id: 'fmri',
          term: 'IRMf / fMRI (Imagerie par résonance magnétique fonctionnelle)',
          summary:
            "Imagerie cérébrale non invasive mesurant le signal BOLD lié au flux sanguin dans tout le cerveau avec une résolution spatiale millimétrique, mais une résolution temporelle de l'ordre de la seconde.",
          links: [
            { label: 'Labo : explorer une IRM et le signal BOLD', href: MRI_LAB_PATH },
            { label: 'Autoévaluation du Primer : IRMf', href: primerCheckPath('fmri') },
          ],
        },
        {
          id: 'pet',
          term: 'TEP / PET (Tomographie par émission de positons)',
          summary:
            "Imagerie qui suit dans le corps un traceur faiblement radioactif, par exemple un analogue du glucose pour mesurer le métabolisme ou un ligand qui se lie à des récepteurs. Elle expose à des rayonnements ionisants et sa résolution temporelle se compte en minutes.",
          links: [
            { label: 'Autoévaluation du Primer : TEP', href: primerCheckPath('pet') },
            { label: 'NIBIB : médecine nucléaire (en anglais)', href: SRC.nuclearMedicine },
          ],
        },
        {
          id: 'emg',
          term: 'EMG (Électromyographie)',
          summary:
            "Mesure de l'activité électrique des muscles (souvent au poignet ou à l'avant-bras) utilisée dans les interfaces neuromotrices non invasives et les prothèses myoélectriques.",
        },
        {
          id: 'ten-twenty',
          term: 'Système international 10-20',
          summary:
            "Méthode standard pour placer et nommer les électrodes EEG à 10 % ou 20 % des distances entre des repères du crâne (nasion, inion, points préauriculaires). La lettre indique la région (Fp, F, C, P, O, T), les chiffres impairs sont à gauche, les pairs à droite et « z » sur la ligne médiane.",
          links: [{ label: 'Leçon : introduction aux ICM (en anglais)', href: lesson('intro-to-bci') }],
        },
        {
          id: 'montage',
          term: 'Montage',
          summary:
            "Le mot a deux sens. Dans les logiciels comme MNE-Python, c'est la liste des positions des électrodes sur la tête. En EEG clinique, c'est la façon de combiner les électrodes pour afficher les canaux (montage bipolaire ou référentiel).",
          links: [{ label: 'MNE : positions des capteurs (en anglais)', href: SRC.mneMontage }],
        },
        {
          id: 'reference-electrode',
          term: 'Électrode de référence',
          summary:
            "L'EEG mesure une différence de potentiel : chaque canal est exprimé par rapport à une référence (mastoïde, Cz, ou moyenne de toutes les électrodes calculée après coup). Changer de référence change la forme des signaux, il faut donc toujours l'indiquer.",
          links: [{ label: 'MNE : choisir la référence EEG (en anglais)', href: SRC.mneReference }],
        },
        {
          id: 'ground-drl',
          term: 'Électrode de masse / DRL',
          summary:
            "Électrode qui relie la personne au circuit commun de l'amplificateur pour réduire les interférences présentes sur toutes les électrodes à la fois. Dans un montage DRL (driven right leg), le circuit renvoie activement ce signal commun inversé vers le corps.",
          links: [{ label: 'BioSemi : CMS et DRL (en anglais)', href: SRC.biosemiDrl }],
        },
        {
          id: 'impedance',
          term: 'Impédance des électrodes',
          summary:
            "Opposition au passage du courant au contact entre l'électrode et la peau, mesurée en kiloohms (kΩ). Une impédance faible et semblable entre les électrodes réduit le bruit. La valeur acceptable dépend de l'amplificateur : suivez les indications du fabricant.",
          links: [{ label: 'Leçon : protocole expérimental EEG (en anglais)', href: lesson('eeg-experimental-protocol') }],
        },
        {
          id: 'artifact',
          term: 'Artéfact',
          summary:
            "Partie d'un enregistrement qui ne vient pas du cerveau : clignements et mouvements des yeux, contractions musculaires, battements cardiaques, bruit du réseau électrique (50 ou 60 Hz) ou électrode qui bouge. Les artéfacts peuvent être plus grands que le signal cérébral.",
          links: [
            { label: 'Labo : repérer les artéfacts et comparer les filtres EEG', href: FILTERING_LAB_PATH },
            { label: 'Leçon : prétraitement (en anglais)', href: lesson('preprocessing') },
          ],
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
          links: [{ label: 'Autoévaluation du Primer : TMS', href: primerCheckPath('tms') }],
        },
        {
          id: 'tdcs-tacs',
          term: 'tDCS / tACS (Stimulation transcrânienne à courant continu ou alternatif)',
          summary:
            "Courants électriques faibles appliqués via des électrodes sur le cuir chevelu pour moduler l'excitabilité neuronale ou les rythmes cérébraux.",
          links: [{ label: 'Autoévaluation du Primer : stimulation électrique transcrânienne', href: primerCheckPath('tes') }],
        },
        {
          id: 'tfus',
          term: 'tFUS / LIFU (Ultrasons focalisés transcrâniens de faible intensité)',
          summary:
            "Technique non invasive qui focalise des ondes ultrasonores à travers le crâne pour moduler des structures profondes du cerveau avec une précision millimétrique.",
          links: [{ label: 'Autoévaluation du Primer : ultrasons focalisés', href: primerCheckPath('fus') }],
        },
        {
          id: 'dbs',
          term: 'SCP / DBS (Stimulation cérébrale profonde)',
          summary:
            "Électrodes implantées reliées à un neurostimulateur pour traiter des troubles comme la maladie de Parkinson, le tremblement essentiel ou certaines épilepsies. Les systèmes en boucle fermée s'adaptent aux signaux mesurés.",
          links: [{ label: 'Autoévaluation du Primer : SCP', href: primerCheckPath('dbs') }],
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
          links: [{ label: 'Leçon : oscillations neuronales (en anglais)', href: lesson('neural-oscillations') }],
        },
        {
          id: 'erd-ers',
          term: 'ERD / ERS (Désynchronisation et synchronisation liées aux événements)',
          summary:
            "Baisse (ERD) ou hausse (ERS) de la puissance dans une bande de fréquences par rapport à une période de base, liée à un événement. Par exemple, les rythmes mu et bêta diminuent au-dessus du cortex sensorimoteur pendant un mouvement réel ou imaginé.",
          links: [
            { label: 'Leçon : oscillations neuronales (en anglais)', href: lesson('neural-oscillations') },
            { label: 'Pfurtscheller et Lopes da Silva, 1999 (en anglais)', href: SRC.pfurtscheller1999 },
          ],
        },
        {
          id: 'erp',
          term: 'PRE / ERP (Potentiel évoqué / lié aux événements)',
          summary:
            "Réponse électrique cérébrale synchronisée à un stimulus sensoriel, cognitif ou moteur précis, mise en évidence en moyennant plusieurs essais.",
          links: [
            { label: 'Labo : faire ressortir une réponse EEG par moyennage', href: ERP_LAB_PATH },
            { label: 'Leçon : potentiels évoqués (en anglais)', href: lesson('event-related-potentials') },
          ],
        },
        {
          id: 'p300',
          term: 'P300',
          summary:
            "Onde positive survenant environ 300 ms après un stimulus rare ou pertinent (paradigme « oddball »), classique dans les épelleurs ICM.",
          links: [{ label: 'Labo : faire ressortir une réponse EEG par moyennage', href: ERP_LAB_PATH }],
        },
        {
          id: 'ssvep',
          term: 'SSVEP (Potentiel évoqué visuel stationnaire)',
          summary:
            "Réponse oscillatoire du cortex visuel à la fréquence exacte d'une cible qui clignote, permettant une sélection rapide et fiable en ICM non invasive.",
          links: [{ label: 'Leçon : applications de l’EEG (en anglais)', href: lesson('bci-applications') }],
        },
        {
          id: 'motor-imagery',
          term: 'Imagerie motrice (MI)',
          summary:
            "Fait d'imaginer un mouvement (par exemple la main gauche ou droite) sans bouger, ce qui modifie les rythmes mu et bêta au-dessus du cortex sensorimoteur.",
        },
        {
          id: 'neurofeedback',
          term: 'Neurorétroaction (neurofeedback)',
          summary:
            "Méthode qui présente à une personne, en temps réel, une mesure de sa propre activité cérébrale (son, image, jeu) pour qu'elle apprenne à la modifier. Les preuves d'efficacité varient beaucoup selon l'usage visé.",
          links: [
            { label: 'Leçon : applications de l’EEG (en anglais)', href: lesson('bci-applications') },
            { label: 'Sitaram et al., 2017 (en anglais)', href: SRC.sitaram2017 },
          ],
        },
        {
          id: 'closed-loop',
          term: 'Boucle fermée',
          summary:
            "Système qui ajuste sa sortie en temps réel selon les signaux qu'il mesure. La neurorétroaction, une ICM avec rétroaction et la stimulation cérébrale profonde adaptative fonctionnent en boucle fermée. En boucle ouverte, la sortie ne dépend pas de la mesure.",
          links: [{ label: 'Leçon : technologies émergentes (en anglais)', href: lesson('emerging-technologies') }],
        },
      ],
    },
    {
      id: 'processing',
      title: 'Traitement du signal et décodage',
      terms: [
        {
          id: 'sampling-rate',
          term: "Fréquence d'échantillonnage",
          summary:
            "Nombre de mesures prises par seconde sur chaque canal, en hertz (Hz). Beaucoup de casques EEG grand public échantillonnent entre 128 et 512 Hz. Elle limite les fréquences que l'on peut analyser.",
          links: [{ label: 'Leçon : casques EEG grand public (en anglais)', href: lesson('eeg-headsets') }],
        },
        {
          id: 'nyquist',
          term: 'Fréquence de Nyquist',
          summary:
            "Moitié de la fréquence d'échantillonnage : c'est la plus haute fréquence que le signal numérique peut représenter. Une activité plus rapide se replie sur des fréquences plus basses (repliement ou aliasing), d'où le filtre anti-repliement appliqué avant la numérisation.",
          links: [{ label: 'Leçon : prétraitement (en anglais)', href: lesson('preprocessing') }],
        },
        {
          id: 'fourier',
          term: 'Transformée de Fourier et spectre de puissance',
          summary:
            "La transformée de Fourier décompose un signal en sinusoïdes de différentes fréquences. Le spectre de puissance montre combien de puissance contient chaque fréquence. En EEG, on l'estime souvent avec la méthode de Welch.",
          links: [{ label: 'Leçon : oscillations neuronales (en anglais)', href: lesson('neural-oscillations') }],
        },
        {
          id: 'band-power',
          term: 'Puissance de bande',
          summary:
            "Puissance du signal dans une bande de fréquences, par exemple alpha (8 à 12 Hz). Elle peut être absolue ou relative, c'est-à-dire exprimée en part de la puissance totale. C'est une des caractéristiques les plus utilisées en ICM.",
          links: [{ label: 'Labo : mini-projet EEG avec MNE-Python', href: EEG_CAPSTONE_PATH }],
        },
        {
          id: 'filters',
          term: 'Filtres (passe-haut, passe-bas, coupe-bande)',
          summary:
            "Un filtre passe-haut retire les variations lentes sous une fréquence de coupure et un passe-bas retire les variations rapides au-dessus. Un filtre coupe-bande (notch) retire une bande étroite, souvent le bruit du réseau à 50 ou 60 Hz. Tout filtre peut aussi déformer le signal utile.",
          links: [
            { label: 'Labo : repérer les artéfacts et comparer les filtres EEG', href: FILTERING_LAB_PATH },
            { label: 'MNE : notions de filtrage (en anglais)', href: SRC.mneFiltering },
          ],
        },
        {
          id: 'epoch',
          term: 'Époque (epoch)',
          summary:
            "Segment de signal découpé autour d'un événement, par exemple de 200 ms avant à 800 ms après un stimulus. Les époques permettent de moyenner les essais ou de classer chacun d'eux.",
          links: [
            { label: 'Labo : faire ressortir une réponse EEG par moyennage', href: ERP_LAB_PATH },
            { label: 'MNE : objets Epochs (en anglais)', href: SRC.mneEpochs },
          ],
        },
        {
          id: 'snr',
          term: 'RSB / SNR (Rapport signal sur bruit)',
          summary:
            "Rapport entre l'amplitude ou la puissance du signal recherché et celle du bruit. Moyenner N essais réduit le bruit aléatoire d'un facteur racine de N, ce qui fait ressortir les potentiels évoqués.",
          links: [{ label: 'Labo : faire ressortir une réponse EEG par moyennage', href: ERP_LAB_PATH }],
        },
        {
          id: 'ica',
          term: 'ACI / ICA (Analyse en composantes indépendantes)',
          summary:
            "Méthode de séparation de sources qui décompose les canaux en composantes statistiquement indépendantes. On s'en sert surtout pour repérer et retirer les composantes liées aux clignements ou au cœur.",
          links: [
            { label: 'Leçon : prétraitement (en anglais)', href: lesson('preprocessing') },
            { label: 'MNE : correction des artéfacts par ICA (en anglais)', href: SRC.mneIca },
          ],
        },
        {
          id: 'csp',
          term: 'CSP (Patrons spatiaux communs)',
          summary:
            "Filtres spatiaux appris à partir d'essais étiquetés, qui maximisent la variance du signal pour une classe et la minimisent pour l'autre. Avec le logarithme de la variance et une LDA, c'est un pipeline classique d'imagerie motrice à deux classes.",
          links: [
            { label: 'MNE : décodage par CSP (en anglais)', href: SRC.mneCsp },
            { label: 'Ramoser et al., 2000 (en anglais)', href: 'https://doi.org/10.1109/86.895946' },
          ],
        },
        {
          id: 'riemannian',
          term: 'Géométrie riemannienne (décodage par covariance)',
          summary:
            "Approche qui représente chaque essai par sa matrice de covariance spatiale et compare ces matrices avec une distance adaptée à leur géométrie. Ces méthodes simples à calibrer sont très performantes dans les bancs d'essai d'ICM.",
          links: [
            { label: 'pyRiemann (en anglais)', href: SRC.pyriemann },
            { label: 'Congedo et al., 2017 (en anglais)', href: SRC.congedo2017 },
          ],
        },
        {
          id: 'lda',
          term: 'ADL / LDA (Analyse discriminante linéaire)',
          summary:
            "Classifieur linéaire qui cherche la projection séparant le mieux les classes par rapport à leur dispersion interne. Rapide et robuste, souvent avec régularisation (shrinkage), il reste une référence pour le P300 et l'imagerie motrice.",
          links: [{ label: 'scikit-learn : LDA (en anglais)', href: SRC.sklearnLda }],
        },
        {
          id: 'cross-validation',
          term: 'Validation croisée',
          summary:
            "On divise les données en parties, on entraîne le modèle sur certaines et on le teste sur celles qu'il n'a pas vues, puis on répète. En EEG, gardez les blocs, séances ou personnes séparés entre entraînement et test, car des essais voisins se ressemblent.",
          links: [
            { label: 'Leçon : apprentissage automatique pour les ICM (en anglais)', href: lesson('machine-learning-for-bci') },
            { label: 'scikit-learn : validation croisée (en anglais)', href: SRC.sklearnCv },
          ],
        },
        {
          id: 'chance-level',
          term: 'Niveau du hasard',
          summary:
            "Exactitude attendue en devinant au hasard, soit 50 % pour deux classes équilibrées. Avec peu d'essais, un classifieur peut dépasser ce seuil par chance. Un test de permutation ou un seuil binomial indique si le résultat est vraiment au-dessus du hasard.",
          links: [{ label: 'Combrisson et Jerbi, 2015 (en anglais)', href: SRC.combrisson2015 }],
        },
        {
          id: 'transfer-learning',
          term: 'Apprentissage par transfert / inter-sujets',
          summary:
            "Réutiliser des données ou un modèle provenant d'autres personnes ou séances pour réduire la calibration d'un nouvel utilisateur. L'évaluation inter-sujets teste le modèle sur une personne absente de l'entraînement.",
          links: [{ label: 'MOABB : CrossSubjectEvaluation (en anglais)', href: SRC.moabbCrossSubject }],
        },
        {
          id: 'eeg-foundation-model',
          term: 'Modèle de fondation EEG',
          summary:
            "Grand réseau de neurones préentraîné, souvent de façon autosupervisée, sur des milliers d'heures d'EEG issues de nombreux jeux de données, puis ajusté à des tâches précises. Par exemple, LaBraM (2024) a été préentraîné sur environ 2 500 heures d'EEG.",
          links: [{ label: 'Jiang et al., 2024 : LaBraM (en anglais)', href: SRC.labram }],
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
          links: [{ label: 'Documentation LSL (en anglais)', href: SRC.lsl }],
        },
        {
          id: 'xdf',
          term: 'XDF (Extensible Data Format)',
          summary:
            "Format de fichier libre qui enregistre plusieurs flux de séries temporelles avec leurs horodatages et leurs métadonnées en XML. C'est le format produit par LabRecorder, l'enregistreur de LSL.",
          links: [{ label: 'Spécification XDF (en anglais)', href: SRC.xdf }],
        },
        {
          id: 'bids',
          term: 'BIDS (Brain Imaging Data Structure)',
          summary:
            "Norme ouverte d'organisation des fichiers et métadonnées en neuroimagerie (IRM, EEG-BIDS, MEG, iEEG, fNIRS) facilitant le partage et la reproductibilité.",
          links: [{ label: 'Site de BIDS (en anglais)', href: SRC.bids }],
        },
        {
          id: 'openneuro',
          term: 'OpenNeuro',
          summary:
            "Plateforme gratuite de partage de données de neuroimagerie et d'électrophysiologie (IRM, MEG, EEG, iEEG, TEP). Les jeux de données y sont déposés au format BIDS.",
          links: [{ label: 'OpenNeuro (en anglais)', href: SRC.openneuro }],
        },
        {
          id: 'mne',
          term: 'MNE-Python',
          summary:
            "Bibliothèque Python libre de référence pour le prétraitement, la visualisation, l'estimation de sources et l'analyse de données MEG, EEG et sEEG.",
          links: [{ label: 'Site de MNE-Python (en anglais)', href: SRC.mne }],
        },
        {
          id: 'moabb',
          term: 'MOABB (Mother of All BCI Benchmarks)',
          summary:
            "Projet libre maintenu par la communauté NeuroTechX qui rassemble des jeux de données EEG publics et des protocoles d'évaluation reproductibles pour comparer les algorithmes d'ICM.",
          links: [{ label: 'Site de MOABB (en anglais)', href: SRC.moabb }],
        },
        {
          id: 'reb-irb',
          term: 'CER / REB / IRB (Comité d’éthique de la recherche)',
          summary:
            "Comité qui examine et approuve un projet de recherche avec des êtres humains avant son début, puis en assure le suivi. Au Canada, les CER suivent l'EPTC 2. Aux États-Unis, on parle d'IRB.",
          links: [{ label: 'EPTC 2 (2022)', href: SRC.tcps2Fr }],
        },
        {
          id: 'informed-consent',
          term: 'Consentement libre et éclairé',
          summary:
            "Accord donné volontairement par une personne qui a reçu toute l'information utile sur une étude : buts, procédures, risques, utilisation des données. Le consentement se maintient tout au long de l'étude et la personne peut se retirer à tout moment.",
          links: [
            { label: 'EPTC 2, chapitre 3 : processus de consentement', href: SRC.tcps2ConsentFr },
            { label: 'Leçon : protocole expérimental EEG (en anglais)', href: lesson('eeg-experimental-protocol') },
          ],
        },
        {
          id: 'neuroethics',
          term: 'Neuroéthique',
          summary:
            "Domaine qui étudie les questions éthiques, juridiques et sociales soulevées par les neurosciences et les neurotechnologies : vie privée, autonomie, équité d'accès, usages hors clinique. En 2019, l'OCDE a adopté une recommandation sur l'innovation responsable en neurotechnologie.",
          links: [
            { label: 'Autoévaluation du Primer : neuroéthique', href: primerCheckPath('neuroethics') },
            { label: 'Recommandation de l’OCDE (en anglais)', href: SRC.oecdNeurotech },
          ],
        },
        {
          id: 'fda-pathways',
          term: '510(k), De Novo, PMA et IDE',
          summary:
            "Principales voies réglementaires de la FDA américaine pour les dispositifs médicaux : 510(k) (équivalence substantielle), De Novo (nouveau dispositif à risque faible ou modéré), PMA (risque élevé, ex. implants) et IDE (autorisation d'essai clinique).",
          links: [{ label: 'FDA : choisir la bonne demande (en anglais)', href: SRC.fda }],
        },
        {
          id: 'ce-mdr',
          term: 'Marquage CE et RDM (UE)',
          summary:
            "Le Règlement (UE) 2017/745 relatif aux dispositifs médicaux (RDM ou MDR) s'applique depuis mai 2021. Le marquage CE indique qu'un dispositif est conforme. L'annexe XVI couvre aussi les appareils de stimulation cérébrale sans finalité médicale qui appliquent des courants ou des champs à travers le crâne.",
          links: [{ label: 'Règlement (UE) 2017/745 sur EUR-Lex', href: SRC.mdr }],
        },
        {
          id: 'health-canada',
          term: 'Santé Canada : homologation des instruments médicaux',
          summary:
            "Le Règlement sur les instruments médicaux classe les instruments de I (risque le plus faible) à IV (risque le plus élevé). Pour importer ou vendre un instrument de classe II, III ou IV au Canada, le fabricant doit détenir une homologation (licence d'instrument médical).",
          links: [{ label: 'Règlement sur les instruments médicaux (DORS/98-282)', href: SRC.hcRegsFr }],
        },
        {
          id: 'neurorights',
          term: 'Neurodroits et confidentialité des données neuronales',
          summary:
            "Cadres juridiques et éthiques visant à protéger la vie privée mentale, le consentement éclairé et l'intégrité cognitive face à la collecte et à l'analyse des données cérébrales.",
          links: [{ label: 'Sécurité et éthique', href: '/safety-and-ethics' }],
        },
      ],
    },
  ],
};

export default bilingual(fr, {
  title: 'Neurotechnology Glossary',
  description:
    'Plain-language definitions of core neurotechnology acronyms and concepts: BCI, EEG, fNIRS, PET, filters, epochs, CSP, cross-validation, LSL, BIDS, consent, and regulatory pathways.',
  eyebrow: 'Reference',
  heading: 'Neurotechnology Glossary',
  subtitle:
    'The core acronyms and concepts you will run into across our lessons, job board, funding calls, and open-source projects, explained clearly.',
  jumpTo: 'Jump to section:',
  learnMoreHeading: 'Keep learning',
  learnMoreBody:
    'Work through our 15 free lessons on EEG and BCI fundamentals, or read our guide to neurotech safety, privacy, and regulation.',
  learnLink: 'Start learning',
  safetyLink: 'Safety & ethics',
  sections: [
    {
      id: 'basics',
      title: 'Neuroscience basics',
      terms: [
        {
          id: 'neuron',
          term: 'Neuron',
          summary:
            'A nerve cell specialized for passing signals. Dendrites receive input from other neurons, and the axon carries the output to other cells.',
          links: [{ label: 'Lesson: Cellular components', href: lesson('cellular-components') }],
        },
        {
          id: 'action-potential',
          term: 'Action potential / spike',
          summary:
            'A brief (about one millisecond), all-or-none electrical impulse that travels along the axon. Implanted microelectrodes can record spikes from single neurons. Scalp EEG does not pick them up directly.',
          links: [
            { label: 'Lesson: Cellular components', href: lesson('cellular-components') },
            { label: 'Purves et al., Neuroscience', href: SRC.purvesActionPotential },
          ],
        },
        {
          id: 'synapse',
          term: 'Synapse',
          summary:
            'The junction where a neuron passes a signal to another cell, usually through chemical neurotransmitters. Postsynaptic currents in many aligned neurons are the main source of the EEG signal.',
          links: [{ label: 'Lesson: Cellular components', href: lesson('cellular-components') }],
        },
        {
          id: 'lfp',
          term: 'LFP (Local Field Potential)',
          summary:
            'The low-frequency part of the voltage recorded by an electrode inside brain tissue. It mostly reflects summed synaptic currents from nearby neurons, while spikes reflect the firing of a few cells.',
          links: [{ label: 'Buzsáki et al., 2012', href: SRC.buzsaki2012 }],
        },
      ],
    },
    {
      id: 'recording',
      title: 'Interfaces & recording',
      terms: [
        {
          id: 'bci',
          term: 'BCI (Brain–Computer Interface)',
          summary:
            'A system that measures brain (or nervous system) activity and translates it into commands for software, a computer, or a prosthetic, sometimes with closed-loop sensory feedback.',
          links: [{ label: 'Lesson: Introduction to BCI', href: lesson('intro-to-bci') }],
        },
        {
          id: 'eeg',
          term: 'EEG (Electroencephalography)',
          summary:
            'Non-invasive recording of electrical brain activity using electrodes on the scalp. Millisecond time resolution and accessible hardware, with lower spatial precision than invasive or MRI methods.',
          links: [
            { label: 'Lab: Read your first EEG signal', href: FIRST_EEG_PATH },
            { label: 'Primer self-check: EEG', href: primerCheckPath('eeg') },
          ],
        },
        {
          id: 'ecog',
          term: 'ECoG (Electrocorticography)',
          summary:
            'An electrode grid placed directly on the cortical surface under the skull during surgery. Delivers much higher signal-to-noise ratio than scalp EEG without penetrating brain tissue.',
          links: [{ label: 'Primer self-check: Intracranial EEG', href: primerCheckPath('ieeg') }],
        },
        {
          id: 'seeg',
          term: 'sEEG (Stereo-electroencephalography)',
          summary:
            'Thin depth electrodes implanted into targeted brain structures, widely used clinically to localize epileptic seizures and increasingly studied for speech and motor BCIs.',
          links: [{ label: 'Primer self-check: Intracranial EEG', href: primerCheckPath('ieeg') }],
        },
        {
          id: 'utah-array',
          term: 'Utah array',
          summary:
            'A small silicon grid of up to 100 microelectrodes (10 × 10), each about 1 to 1.5 mm long, implanted into the cortex. It records spikes and LFPs and has been used in most implanted human BCI studies, including BrainGate.',
          links: [
            { label: 'Lesson: Emerging technologies', href: lesson('emerging-technologies') },
            { label: 'BrainGate', href: SRC.braingate },
          ],
        },
        {
          id: 'meg',
          term: 'MEG (Magnetoencephalography)',
          summary:
            'Non-invasive measurement of tiny magnetic fields generated by neuronal currents. Combines EEG-like millisecond timing with sharper spatial localization inside a shielded room (SQUID or wearable OPM sensors).',
          links: [{ label: 'Primer self-check: MEG', href: primerCheckPath('meg') }],
        },
        {
          id: 'fnirs',
          term: 'fNIRS (Functional Near-Infrared Spectroscopy)',
          summary:
            'Wearable optical brain imaging that uses near-infrared light to track blood oxygenation changes in the cortex. Slower than EEG, but immune to electrical line noise.',
          links: [{ label: 'Primer self-check: fNIRS', href: primerCheckPath('fnirs') }],
        },
        {
          id: 'fmri',
          term: 'fMRI (Functional Magnetic Resonance Imaging)',
          summary:
            'Non-invasive whole-brain imaging that measures blood-oxygen-level-dependent (BOLD) signals at millimeter spatial resolution, with temporal resolution on the order of seconds.',
          links: [
            { label: 'Lab: Explore MRI slices and BOLD timing', href: MRI_LAB_PATH },
            { label: 'Primer self-check: fMRI', href: primerCheckPath('fmri') },
          ],
        },
        {
          id: 'pet',
          term: 'PET (Positron Emission Tomography)',
          summary:
            'Imaging that tracks a weakly radioactive tracer in the body, such as a glucose analog to measure metabolism or a ligand that binds to receptors. It involves ionizing radiation, and its time resolution is measured in minutes.',
          links: [
            { label: 'Primer self-check: PET', href: primerCheckPath('pet') },
            { label: 'NIBIB: Nuclear medicine', href: SRC.nuclearMedicine },
          ],
        },
        {
          id: 'emg',
          term: 'EMG (Electromyography)',
          summary:
            'Recording of electrical muscle activity (often at the wrist or forearm), used in non-invasive neuromotor interfaces and myoelectric prosthetics.',
        },
        {
          id: 'ten-twenty',
          term: 'International 10-20 system',
          summary:
            'The standard way to place and name EEG electrodes at 10% or 20% of the distances between skull landmarks (nasion, inion, preauricular points). The letter gives the region (Fp, F, C, P, O, T), odd numbers are on the left, even numbers on the right, and "z" on the midline.',
          links: [{ label: 'Lesson: Introduction to BCI', href: lesson('intro-to-bci') }],
        },
        {
          id: 'montage',
          term: 'Montage',
          summary:
            'The word has two meanings. In software such as MNE-Python, it is the set of electrode positions on the head. In clinical EEG, it is how electrodes are combined into displayed channels (bipolar or referential montage).',
          links: [{ label: 'MNE: Sensor locations', href: SRC.mneMontage }],
        },
        {
          id: 'reference-electrode',
          term: 'Reference electrode',
          summary:
            'EEG measures voltage differences, so each channel is expressed relative to a reference (a mastoid, Cz, or the average of all electrodes computed afterward). Changing the reference changes the waveforms, so always report it.',
          links: [{ label: 'MNE: Setting the EEG reference', href: SRC.mneReference }],
        },
        {
          id: 'ground-drl',
          term: 'Ground electrode / DRL',
          summary:
            'An electrode that ties the person to the amplifier’s common circuit to reduce interference that appears on all electrodes at once. In a driven right leg (DRL) design, the circuit actively feeds an inverted copy of that common signal back to the body.',
          links: [{ label: 'BioSemi: CMS and DRL', href: SRC.biosemiDrl }],
        },
        {
          id: 'impedance',
          term: 'Electrode impedance',
          summary:
            'Opposition to current flow at the electrode–skin contact, measured in kilohms (kΩ). Low impedance that is similar across electrodes reduces noise. The acceptable value depends on the amplifier, so follow the manufacturer’s guidance.',
          links: [{ label: 'Lesson: EEG experimental protocol', href: lesson('eeg-experimental-protocol') }],
        },
        {
          id: 'artifact',
          term: 'Artifact',
          summary:
            'Any part of a recording that does not come from the brain: blinks and eye movements, muscle tension, heartbeat, power-line noise (50 or 60 Hz), or a moving electrode. Artifacts can be larger than the brain signal.',
          links: [
            { label: 'Lab: Spot artifacts and compare EEG filters', href: FILTERING_LAB_PATH },
            { label: 'Lesson: Preprocessing', href: lesson('preprocessing') },
          ],
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
          links: [{ label: 'Primer self-check: TMS', href: primerCheckPath('tms') }],
        },
        {
          id: 'tdcs-tacs',
          term: 'tDCS / tACS (Transcranial Direct / Alternating Current Stimulation)',
          summary:
            'Low-intensity electrical currents applied via scalp electrodes to shift cortical excitability (tDCS) or entrain neural oscillations (tACS).',
          links: [{ label: 'Primer self-check: Transcranial electrical stimulation', href: primerCheckPath('tes') }],
        },
        {
          id: 'tfus',
          term: 'tFUS / LIFU (Transcranial Focused Ultrasound)',
          summary:
            'Non-invasive technique focusing low-intensity ultrasound waves through the skull to modulate deep or superficial brain structures with millimeter spatial precision.',
          links: [{ label: 'Primer self-check: Focused ultrasound', href: primerCheckPath('fus') }],
        },
        {
          id: 'dbs',
          term: 'DBS (Deep Brain Stimulation)',
          summary:
            'Implanted electrodes connected to a pulse generator to treat conditions such as Parkinson’s disease, essential tremor, and refractory epilepsy. Adaptive (closed-loop) systems adjust stimulation using sensed neural signals.',
          links: [{ label: 'Primer self-check: DBS', href: primerCheckPath('dbs') }],
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
          links: [{ label: 'Lesson: Neural oscillations', href: lesson('neural-oscillations') }],
        },
        {
          id: 'erd-ers',
          term: 'ERD / ERS (Event-Related Desynchronization / Synchronization)',
          summary:
            'A decrease (ERD) or increase (ERS) in power in a frequency band relative to a baseline, linked to an event. For example, mu and beta rhythms drop over sensorimotor cortex during real or imagined movement.',
          links: [
            { label: 'Lesson: Neural oscillations', href: lesson('neural-oscillations') },
            { label: 'Pfurtscheller & Lopes da Silva, 1999', href: SRC.pfurtscheller1999 },
          ],
        },
        {
          id: 'erp',
          term: 'ERP (Event-Related Potential)',
          summary:
            'A time-locked electrical brain response to a specific sensory, cognitive, or motor event, typically revealed by averaging across repeated trials.',
          links: [
            { label: 'Lab: Reveal an EEG response by averaging trials', href: ERP_LAB_PATH },
            { label: 'Lesson: Event-related potentials', href: lesson('event-related-potentials') },
          ],
        },
        {
          id: 'p300',
          term: 'P300',
          summary:
            'A positive voltage peak occurring ~300 ms after a rare or attended target stimulus (the oddball paradigm), classic in BCI spellers.',
          links: [{ label: 'Lab: Reveal an EEG response by averaging trials', href: ERP_LAB_PATH }],
        },
        {
          id: 'ssvep',
          term: 'SSVEP (Steady-State Visual Evoked Potential)',
          summary:
            'An oscillatory visual-cortex response locked to the exact flicker frequency of an attended visual target, enabling fast, high-accuracy non-invasive selection.',
          links: [{ label: 'Lesson: EEG applications', href: lesson('bci-applications') }],
        },
        {
          id: 'motor-imagery',
          term: 'Motor imagery (MI)',
          summary:
            'Mentally rehearsing a movement (such as left vs. right hand) without physically moving, producing characteristic shifts in sensorimotor mu and beta rhythms.',
        },
        {
          id: 'neurofeedback',
          term: 'Neurofeedback',
          summary:
            'A method that shows people a real-time measure of their own brain activity (as a sound, image, or game) so they can learn to change it. Evidence of benefit varies widely by application.',
          links: [
            { label: 'Lesson: EEG applications', href: lesson('bci-applications') },
            { label: 'Sitaram et al., 2017', href: SRC.sitaram2017 },
          ],
        },
        {
          id: 'closed-loop',
          term: 'Closed loop',
          summary:
            'A system that adjusts its output in real time based on the signals it measures. Neurofeedback, BCIs with feedback, and adaptive deep brain stimulation are closed-loop. In an open-loop system, the output does not depend on the measurement.',
          links: [{ label: 'Lesson: Emerging technologies', href: lesson('emerging-technologies') }],
        },
      ],
    },
    {
      id: 'processing',
      title: 'Signal processing & decoding',
      terms: [
        {
          id: 'sampling-rate',
          term: 'Sampling rate',
          summary:
            'The number of measurements taken per second on each channel, in hertz (Hz). Many consumer EEG headsets sample at 128 to 512 Hz. It limits which frequencies you can analyze.',
          links: [{ label: 'Lesson: Consumer EEG headsets', href: lesson('eeg-headsets') }],
        },
        {
          id: 'nyquist',
          term: 'Nyquist frequency',
          summary:
            'Half the sampling rate: the highest frequency a digital signal can represent. Faster activity folds back onto lower frequencies (aliasing), which is why an anti-aliasing filter is applied before digitization.',
          links: [{ label: 'Lesson: Preprocessing', href: lesson('preprocessing') }],
        },
        {
          id: 'fourier',
          term: 'Fourier transform & power spectrum',
          summary:
            'The Fourier transform breaks a signal into sine waves of different frequencies. The power spectrum shows how much power each frequency holds. For EEG it is often estimated with Welch’s method.',
          links: [{ label: 'Lesson: Neural oscillations', href: lesson('neural-oscillations') }],
        },
        {
          id: 'band-power',
          term: 'Band power',
          summary:
            'Signal power within a frequency band, such as alpha (8 to 12 Hz). It can be absolute or relative, meaning a share of total power. It is one of the most common BCI features.',
          links: [{ label: 'Lab: EEG capstone with MNE-Python', href: EEG_CAPSTONE_PATH }],
        },
        {
          id: 'filters',
          term: 'Filters (high-pass, low-pass, notch)',
          summary:
            'A high-pass filter removes slow changes below a cutoff frequency, and a low-pass filter removes fast changes above one. A notch filter removes a narrow band, often 50 or 60 Hz power-line noise. Any filter can also distort the signal you care about.',
          links: [
            { label: 'Lab: Spot artifacts and compare EEG filters', href: FILTERING_LAB_PATH },
            { label: 'MNE: Background on filtering', href: SRC.mneFiltering },
          ],
        },
        {
          id: 'epoch',
          term: 'Epoch',
          summary:
            'A segment of signal cut around an event, for example from 200 ms before to 800 ms after a stimulus. Epochs let you average trials or classify each one.',
          links: [
            { label: 'Lab: Reveal an EEG response by averaging trials', href: ERP_LAB_PATH },
            { label: 'MNE: The Epochs data structure', href: SRC.mneEpochs },
          ],
        },
        {
          id: 'snr',
          term: 'SNR (Signal-to-Noise Ratio)',
          summary:
            'The ratio between the amplitude or power of the signal you want and that of the noise. Averaging N trials reduces random noise by a factor of the square root of N, which is how event-related potentials emerge.',
          links: [{ label: 'Lab: Reveal an EEG response by averaging trials', href: ERP_LAB_PATH }],
        },
        {
          id: 'ica',
          term: 'ICA (Independent Component Analysis)',
          summary:
            'A source-separation method that splits channels into statistically independent components. It is mostly used to find and remove components caused by blinks or the heartbeat.',
          links: [
            { label: 'Lesson: Preprocessing', href: lesson('preprocessing') },
            { label: 'MNE: Artifact correction with ICA', href: SRC.mneIca },
          ],
        },
        {
          id: 'csp',
          term: 'CSP (Common Spatial Patterns)',
          summary:
            'Spatial filters learned from labeled trials that maximize signal variance for one class while minimizing it for the other. Combined with log-variance features and LDA, it is a classic two-class motor imagery pipeline.',
          links: [
            { label: 'MNE: Decoding with CSP', href: SRC.mneCsp },
            { label: 'Ramoser et al., 2000', href: 'https://doi.org/10.1109/86.895946' },
          ],
        },
        {
          id: 'riemannian',
          term: 'Riemannian geometry (covariance-based decoding)',
          summary:
            'An approach that represents each trial by its spatial covariance matrix and compares these matrices with a distance suited to their geometry. These methods are simple to calibrate and perform strongly in BCI benchmarks.',
          links: [
            { label: 'pyRiemann', href: SRC.pyriemann },
            { label: 'Congedo et al., 2017', href: SRC.congedo2017 },
          ],
        },
        {
          id: 'lda',
          term: 'LDA (Linear Discriminant Analysis)',
          summary:
            'A linear classifier that finds the projection that best separates classes relative to their spread. Fast and robust, often with shrinkage regularization, it remains a baseline for P300 and motor imagery.',
          links: [{ label: 'scikit-learn: LDA', href: SRC.sklearnLda }],
        },
        {
          id: 'cross-validation',
          term: 'Cross-validation',
          summary:
            'Split the data into parts, train the model on some, test it on the parts it has not seen, and repeat. With EEG, keep blocks, sessions, or people separate between training and testing, because neighboring trials resemble each other.',
          links: [
            { label: 'Lesson: Machine learning for BCI', href: lesson('machine-learning-for-bci') },
            { label: 'scikit-learn: Cross-validation', href: SRC.sklearnCv },
          ],
        },
        {
          id: 'chance-level',
          term: 'Chance level',
          summary:
            'The accuracy expected from random guessing, such as 50% for two balanced classes. With few trials, a classifier can beat this by luck. A permutation test or a binomial threshold tells you whether a result is really above chance.',
          links: [{ label: 'Combrisson & Jerbi, 2015', href: SRC.combrisson2015 }],
        },
        {
          id: 'transfer-learning',
          term: 'Transfer learning / cross-subject decoding',
          summary:
            'Reusing data or a model from other people or sessions to shorten calibration for a new user. Cross-subject evaluation tests a model on a person left out of training.',
          links: [{ label: 'MOABB: CrossSubjectEvaluation', href: SRC.moabbCrossSubject }],
        },
        {
          id: 'eeg-foundation-model',
          term: 'EEG foundation model',
          summary:
            'A large neural network pretrained, often self-supervised, on thousands of hours of EEG from many datasets, then fine-tuned for specific tasks. For example, LaBraM (2024) was pretrained on about 2,500 hours of EEG.',
          links: [{ label: 'Jiang et al., 2024: LaBraM', href: SRC.labram }],
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
          links: [{ label: 'LSL documentation', href: SRC.lsl }],
        },
        {
          id: 'xdf',
          term: 'XDF (Extensible Data Format)',
          summary:
            'An open file format that stores several time-series streams with their timestamps and XML metadata. It is the format written by LabRecorder, the LSL recorder.',
          links: [{ label: 'XDF specification', href: SRC.xdf }],
        },
        {
          id: 'bids',
          term: 'BIDS (Brain Imaging Data Structure)',
          summary:
            'Open community standard for organizing neuroimaging and electrophysiology datasets (MRI, EEG-BIDS, MEG, iEEG, fNIRS) so pipelines and datasets are shareable and reproducible.',
          links: [{ label: 'BIDS website', href: SRC.bids }],
        },
        {
          id: 'openneuro',
          term: 'OpenNeuro',
          summary:
            'A free platform for sharing neuroimaging and electrophysiology data (MRI, MEG, EEG, iEEG, PET). Datasets are uploaded in BIDS format.',
          links: [{ label: 'OpenNeuro', href: SRC.openneuro }],
        },
        {
          id: 'mne',
          term: 'MNE-Python',
          summary:
            'The flagship open-source Python library for preprocessing, visualizing, source-localizing, and analyzing MEG, EEG, and sEEG data.',
          links: [{ label: 'MNE-Python website', href: SRC.mne }],
        },
        {
          id: 'moabb',
          term: 'MOABB (Mother of All BCI Benchmarks)',
          summary:
            'Open-source project maintained by the NeuroTechX community that bundles public EEG datasets and reproducible evaluation pipelines for benchmarking BCI algorithms.',
          links: [{ label: 'MOABB website', href: SRC.moabb }],
        },
        {
          id: 'reb-irb',
          term: 'REB / IRB (Research Ethics Board)',
          summary:
            'A committee that reviews and approves research involving people before it starts, then monitors it. In Canada, REBs follow the TCPS 2. In the United States, they are called institutional review boards (IRBs).',
          links: [{ label: 'TCPS 2 (2022)', href: SRC.tcps2En }],
        },
        {
          id: 'informed-consent',
          term: 'Informed consent',
          summary:
            'Voluntary agreement from a person who has received the relevant information about a study: its aims, procedures, risks, and data use. Consent continues throughout the study, and the person can withdraw at any time.',
          links: [
            { label: 'TCPS 2, Chapter 3: The consent process', href: SRC.tcps2ConsentEn },
            { label: 'Lesson: EEG experimental protocol', href: lesson('eeg-experimental-protocol') },
          ],
        },
        {
          id: 'neuroethics',
          term: 'Neuroethics',
          summary:
            'The field that studies the ethical, legal, and social questions raised by neuroscience and neurotechnology, such as privacy, autonomy, fair access, and non-clinical uses. In 2019 the OECD adopted a Recommendation on Responsible Innovation in Neurotechnology.',
          links: [
            { label: 'Primer self-check: Neuroethics', href: primerCheckPath('neuroethics') },
            { label: 'OECD Recommendation', href: SRC.oecdNeurotech },
          ],
        },
        {
          id: 'fda-pathways',
          term: '510(k), De Novo, PMA & IDE',
          summary:
            'Core US FDA medical-device pathways: 510(k) (substantial equivalence to a predicate), De Novo (novel low-to-moderate-risk devices), PMA (high-risk devices such as implants), and IDE (permission to run a clinical study).',
          links: [{ label: 'FDA: Selecting the correct submission', href: SRC.fda }],
        },
        {
          id: 'ce-mdr',
          term: 'CE marking & MDR (EU)',
          summary:
            'The EU Medical Device Regulation (EU) 2017/745 (MDR) has applied since May 2021. The CE marking shows that a device conforms. Annex XVI also covers brain stimulation equipment without a medical purpose that applies currents or fields through the skull.',
          links: [{ label: 'Regulation (EU) 2017/745 on EUR-Lex', href: SRC.mdr }],
        },
        {
          id: 'health-canada',
          term: 'Health Canada medical device licensing',
          summary:
            'The Medical Devices Regulations sort devices into Classes I (lowest risk) to IV (highest risk). A Class II, III, or IV device can be imported or sold in Canada only if its manufacturer holds a medical device licence.',
          links: [{ label: 'Medical Devices Regulations (SOR/98-282)', href: SRC.hcRegsEn }],
        },
        {
          id: 'neurorights',
          term: 'Neurorights & neural data privacy',
          summary:
            'Legal and ethical frameworks focused on mental privacy, informed consent, and cognitive liberty as neural recording and decoding become more capable and widespread.',
          links: [{ label: 'Safety & ethics', href: '/safety-and-ethics' }],
        },
      ],
    },
  ],
});
