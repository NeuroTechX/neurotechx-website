// Funding opportunities shown on /funding (/fr/financement).
// Each entry was checked on the funder's own page on the date in FUNDING_CHECKED.
// An entry with a `closes` date drops off the page by itself once that date has passed;
// entries without one (rolling or annual calls) stay until removed here.
// Each list is written in French first, then in English, with entries in the same position:
// add or remove an entry in both lists.
import { bilingual } from '@/i18n/text';

export const FUNDING_CHECKED = '2026-11-21';

// Section of the page an entry is listed under; the section titles are in src/i18n/pages/funding.ts.
export type FundingAudience = 'startups' | 'students' | 'researchers' | 'seed' | 'outreach';

export interface FundingOpportunity {
    name: string;
    funder: string;
    audience: FundingAudience;
    who: string;
    amount?: string;
    // ISO date of the next deadline, if one is published.
    closes?: string;
    // Shown instead of, or as well as, the date: "Rolling", "Annual", provisional dates.
    timing?: string;
    href: string;
    // Shown first and highlighted.
    featured?: boolean;
}

interface FundingLink {
    name: string;
    href: string;
    about: string;
}

export const FUNDING_FINDERS = bilingual<FundingLink[]>(
    [
        {
            name: 'The Transmitter: Neuroscience grants and funding finder',
            href: 'https://www.thetransmitter.org/neuroscience-grants-funding-finder/',
            about: 'Une liste consultable de subventions, de bourses et de prix en neurosciences.',
        },
    ],
    [
        {
            name: 'The Transmitter: Neuroscience grants and funding finder',
            href: 'https://www.thetransmitter.org/neuroscience-grants-funding-finder/',
            about: 'A searchable list of neuroscience grants, fellowships and awards.',
        },
    ],
);

// Directories of who invests in neurotech companies, for founders. Not funding offers.
export const INVESTOR_DIRECTORIES = bilingual<FundingLink[]>(
    [
        {
            name: 'BCI Funding Index (PL Neuro)',
            href: 'https://www.plneuro.xyz/neuro-atlas/funding',
            about: "Les rondes de financement et les investisseurs des entreprises d'interfaces cerveau-machine, dans le Neuro Atlas de PL Neuro.",
        },
        {
            name: 'Neurofounders investor map',
            href: 'https://www.neurofounders.co/resources/investor-map',
            about: 'Les investisseurs qui financent les jeunes pousses en neurotech.',
        },
    ],
    [
        {
            name: 'BCI Funding Index (PL Neuro)',
            href: 'https://www.plneuro.xyz/neuro-atlas/funding',
            about: 'Funding rounds and investors in brain–computer interface companies, part of PL Neuro’s Neuro Atlas.',
        },
        {
            name: 'Neurofounders investor map',
            href: 'https://www.neurofounders.co/resources/investor-map',
            about: 'Investors who fund neurotech start-ups.',
        },
    ],
);

const fr: FundingOpportunity[] = [
    // Programmes pour jeunes pousses et mentorat
    {
        name: 'NeuroDesign Entrepreneurs Workshop',
        funder: 'Case Western Reserve University et le Cleveland FES Center',
        audience: 'startups',
        who: "Étudiants aux cycles supérieurs et professionnels en début de carrière. Un atelier d'une fin de semaine : les équipes partent d'un vrai besoin clinique, imaginent une solution neurotech, bâtissent le modèle d'affaires avec des mentors et présentent leur projet devant un jury d'investisseurs et de leaders de la neurotech. Plus de 200 participants jusqu'ici; gratuit pour les étudiants admis, avec une aide aux frais de déplacement.",
        timing: "Annuel, désormais offert ailleurs qu'à Cleveland : Cleveland (sept. 2026) et Munich (juin 2026). Les inscriptions pour Cleveland ont ouvert en juin",
        href: 'https://www.clevelandneurodesign.com/',
        featured: true,
    },
    {
        name: 'Cambridge NeuroWorks',
        funder: 'Cambridge University Health Partners, propulsé par ARIA',
        audience: 'startups',
        who: "Chercheurs, cliniciens et innovateurs établis au Royaume-Uni qui ont des idées neurotech audacieuses contre la dépression, la démence, la douleur chronique et d'autres troubles du cerveau; aucune formation en neurotech requise. Bourses Blue Sky et Frontier avec financement, mentorat et espace de laboratoire, ainsi qu'un fonds de validation de principe Blue Sky pour des projets de six mois menés par une université britannique.",
        amount: "Projets de validation de principe jusqu'à 50\u00a0000\u00a0GBP",
        timing: 'Appels par vagues; consultez le site pour le prochain',
        href: 'https://cambridgeneuroworks.org/',
    },
    {
        name: 'Incubateur neurotech Araya',
        funder: 'Araya, avec le soutien du programme Moonshot R&D du Japon',
        audience: 'startups',
        who: "Chercheurs et futurs fondateurs au Japon qui veulent transformer leurs recherches en neurotech en entreprises. Premier incubateur neurotech du Japon, il tient des séances d'information et des ateliers dans des universités partout au pays.",
        timing: 'En continu',
        href: 'https://www.araya.org/service/neurotech/',
    },
    {
        name: 'NERVE: Neurotech Entrepreneurship to Validate Emerging Innovations',
        funder: 'Ontario Brain Institute',
        audience: 'startups',
        who: "Entrepreneurs canadiens en neurotech en démarrage. Jusqu'à cinq par année reçoivent une subvention non dilutive, 12 mois d'ateliers et du mentorat individuel par un expert de leur secteur. L'OBI ne prend ni participation ni propriété intellectuelle.",
        amount: "Jusqu'à 100\u00a0000\u00a0CAD",
        timing: "Annuel. L'appel 2026 a pris fin en avril; surveillez l'appel 2027",
        href: 'https://braininstitute.ca/programs-opportunities/nerve-program',
    },
    {
        name: 'NERD: Neurotech Early Research and Development',
        funder: 'Ontario Brain Institute',
        audience: 'startups',
        who: "Entreprises qui commercialisent une neurotechnologie et dont le produit a dépassé le stade des subventions de recherche sans être prêt pour le capital privé. Un investissement par jalons, versé directement aux organismes de recherche contractuelle et aux fournisseurs de services; l'entreprise garde toute sa propriété intellectuelle. L'étape naturelle après NERVE.",
        timing: "En continu; communiquez avec l'OBI",
        href: 'https://braininstitute.ca/programs-opportunities/nerd',
    },
    {
        name: 'CORTEX: Community-Led Real-World Neurotech Experience',
        funder: 'Ontario Brain Institute',
        audience: 'startups',
        who: "Entreprises neurotech et organismes communautaires qui veulent tester une neurotechnologie dans la vraie vie, auprès des personnes atteintes d'un trouble du cerveau et de leurs proches, avec des échelles cliniques et des mesures rapportées par les patients. Près de 1\u00a0500 participants dans 10 collaborations en 2025.",
        timing: "En continu; communiquez avec l'OBI",
        href: 'https://braininstitute.ca/programs-opportunities/cortex',
    },
    {
        name: 'MS & Neurological Care Accelerator',
        funder: 'MSWA et Founders Factory',
        audience: 'startups',
        who: "Jeunes pousses en démarrage de partout dans le monde qui utilisent l'IA, la robotique, les dispositifs portables ou la santé numérique pour la sclérose en plaques, l'AVC, la maladie de Parkinson, la maladie de Huntington, la maladie du motoneurone ou les lésions cérébrales acquises. Programme de 16 semaines basé à Perth (Australie), avec des essais auprès du réseau clinique et de la communauté de MSWA. Première cohorte de cinq jeunes pousses en juin 2026, dont une interface cerveau-ordinateur sous-cutanée pour la parole.",
        amount: "200\u00a0000\u00a0AUD d'investissement en argent",
        timing: 'Inscriptions ouvertes; aucune date limite publiée',
        href: 'https://foundersfactory.com/mswa-ms-neurological-care-accelerator/',
    },
    {
        name: 'Creative Destruction Lab: volet Neuro',
        funder: 'Creative Destruction Lab (CDL-Toronto)',
        audience: 'startups',
        who: "Fondateurs et projets en démarrage, même avant l'incorporation, qui commercialisent une innovation en neurosciences : interfaces cerveau-ordinateur, neuroprothèses, neuromodulation, neurosurveillance, IA pour les neurosciences, maladies neurodégénératives. Neuf mois d'objectifs fixés avec des mentors (cinq séances d'octobre à juin, à Toronto ou en ligne), avec de l'aide sur la réglementation, les essais cliniques et le financement. Aucuns frais et aucune prise de participation.",
        timing: "Cohorte annuelle d'octobre à juin; inscriptions ouvertes pour 2026-2027",
        href: 'https://creativedestructionlab.com/streams/health/neuro/',
    },
    {
        name: 'One Mind Accelerator',
        funder: 'One Mind',
        audience: 'startups',
        who: "Jeunes pousses en santé mentale, de la préamorçage à la série A, surtout en maladie mentale grave, santé mentale des jeunes, santé mentale maternelle et psychiatrie de précision. Dix semaines en formule hybride (ouverture et clôture à Menlo Park, en Californie), avec plus de 300 mentors, des présentations à des investisseurs et des rencontres avec des payeurs et des employeurs. De 10 à 15 jeunes pousses par année.",
        timing: 'Annuel; communiquez avec One Mind pour la prochaine cohorte',
        href: 'https://onemind.org/what-we-do/one-mind-accelerator/',
    },
    {
        name: 'NIA Start-Up Challenge and Accelerator',
        funder: 'National Institute on Aging des NIH',
        audience: 'startups',
        who: "Personnes nouvelles en entrepreneuriat qui ont une technologie pour le vieillissement et les maladies liées à l'âge, dont la démence et d'autres enjeux de santé cérébrale. Des prix en argent et un accélérateur de cinq mois avec des mentors fondateurs et investisseurs.",
        amount: "Jusqu'à 994\u00a0000\u00a0USD en prix au total",
        closes: '2027-01-15',
        timing: 'Soumissions ouvertes à partir du 1er déc. 2026',
        href: 'https://www.nih.gov/challenges/2027-nia-start-challenge-accelerator',
    },
    {
        name: 'Spec Brains fellowship',
        funder: 'Speculative Technologies',
        audience: 'startups',
        who: "Chercheurs de niveau doctoral qui portent un programme de recherche ambitieux en neurosciences ou en neurotech qui ne trouve pas sa place dans les institutions existantes. Quatre mois à temps partiel : formation, coaching, mentors ayant une expérience à la DARPA et mises en relation avec des bailleurs de fonds. Gratuit, sans prise de participation.",
        timing: "Annuel. La cohorte 2027 est complète (les candidatures se tenaient en octobre); surveillez le prochain appel",
        href: 'https://spec.tech/brains',
    },
    // Étudiants et début de carrière
    {
        name: 'FENS/IBRO-PERC Exchange Fellowships',
        funder: 'FENS et IBRO-PERC',
        audience: 'students',
        who: "Étudiants à la maîtrise et au doctorat et postdoctorants (jusqu'à 5 ans) en Europe, pour un échange de 4 semaines à 4 mois dans un autre laboratoire.",
        amount: "Jusqu'à 4\u00a0000\u00a0EUR",
        closes: '2027-04-15',
        timing: 'Ouverture le 1er déc. 2026; dates limites chaque 15 avril et 15 octobre',
        href: 'https://www.fens.org/careers/grants-and-stipends/grant/fens-ibro-perc-exchange-fellowships',
    },
    {
        name: 'IBRO World Congress Travel Grants',
        funder: 'IBRO',
        audience: 'students',
        who: 'Doctorants, postdoctorants et chercheurs en début de carrière, partout dans le monde.',
        closes: '2027-03-15',
        timing: 'Ouverture le 11 janv. 2027',
        href: 'https://ibro.org/grants/grants-calendar/',
    },
    {
        name: 'EMBO Postdoctoral Fellowships',
        funder: 'EMBO',
        audience: 'students',
        who: 'Postdoctorants en sciences de la vie, y compris en neurosciences, qui rejoignent un laboratoire dans un autre pays.',
        amount: "Allocation et indemnités pendant jusqu'à 2 ans",
        closes: '2027-01-22',
        timing: "Dates limites tout au long de l'année",
        href: 'https://www.embo.org/funding/fellowships-grants-and-career-support/postdoctoral-fellowships/',
    },
    {
        name: 'HFSP Postdoctoral Fellowships',
        funder: 'Human Frontier Science Program',
        audience: 'students',
        who: 'Postdoctorants en début de parcours qui changent à la fois de pays et de domaine.',
        amount: "Trois ans d'indemnités",
        closes: '2027-05-11',
        timing: "Date limite de la lettre d'intention",
        href: 'https://www.hfsp.org/funding/hfsp-funding/postdoctoral-fellowships',
    },
    {
        name: 'MSCA Postdoctoral Fellowships',
        funder: 'Commission européenne',
        audience: 'students',
        who: "Titulaires d'un doctorat de toute nationalité, accueillis dans l'Union européenne ou dans un pays associé.",
        timing: "Prochain appel prévu d'avril à septembre 2027",
        href: 'https://marie-sklodowska-curie-actions.ec.europa.eu/funding/msca-postdoctoral-fellowships-2027',
    },
    {
        name: 'Fellows-to-Faculty Award',
        funder: 'Simons Foundation',
        audience: 'students',
        who: 'Postdoctorants qui postulent à des postes de professeur menant à la permanence, de toute citoyenneté.',
        amount: '600\u00a0000\u00a0USD sur 3 ans',
        closes: '2027-01-13',
        href: 'https://www.simonsfoundation.org/funding/fellows-to-faculty-2027/',
    },
    {
        name: 'Wellcome Early-Career Awards',
        funder: 'Wellcome',
        audience: 'students',
        who: 'Chercheurs en début de carrière accueillis au Royaume-Uni ou dans un pays à revenu faible ou intermédiaire admissible.',
        amount: "Salaire et jusqu'à 400\u00a0000\u00a0GBP en frais de recherche",
        timing: 'En continu',
        href: 'https://wellcome.org/research-funding/schemes/wellcome-early-career-awards',
    },
    {
        name: 'BBRF Young Investigator Grants',
        funder: 'Brain & Behavior Research Foundation',
        audience: 'students',
        who: 'Chercheurs en début de carrière en psychiatrie et en recherche sur les troubles du cerveau.',
        amount: "Jusqu'à 70\u00a0000\u00a0USD sur 2 ans",
        timing: 'Annuel; prochain cycle prévu vers février 2027',
        href: 'https://bbrfoundation.org/grants-prizes/bbrf-young-investigator-grants',
    },

    // Chercheurs et laboratoires
    {
        name: 'EMOTIV NeuroDiscovery Grant Program',
        funder: 'EMOTIV',
        audience: 'researchers',
        who: 'Chercheurs universitaires et du milieu sans but lucratif, cliniciens et étudiants aux cycles supérieurs, partout dans le monde.',
        amount: 'Matériel et logiciels EMOTIV',
        closes: '2027-01-15',
        href: 'https://www.emotiv.com/neurodiscovery-grants',
    },
    {
        name: 'BCI Award',
        funder: 'BCI Award Foundation',
        audience: 'researchers',
        who: 'Chercheurs, étudiants, cliniciens, entreprises et jeunes pousses en ICM, partout dans le monde.',
        amount: '2\u00a0000\u00a0USD à chacun des trois lauréats de catégorie',
        closes: '2027-01-15',
        href: 'https://www.bci-award.com/Home',
    },
    {
        name: 'Neuromodulation and neurostimulation device development for mental health (PAR-25-286 / PAR-25-287)',
        funder: 'NIH (NIMH)',
        audience: 'researchers',
        who: "Universités, organismes sans but lucratif et entreprises; les organisations à l'extérieur des États-Unis sont admissibles.",
        amount: 'Budgets R21 et R01 habituels',
        closes: '2027-02-16',
        timing: "Autres dates de dépôt en juin et en octobre 2027",
        href: 'https://grants.nih.gov/grants/guide/pa-files/PAR-25-286.html',
    },
    {
        name: 'BRAIN Initiative: invasive neural recording and stimulating technologies in the human brain (RFA-NS-28-010)',
        funder: 'NIH BRAIN Initiative',
        audience: 'researchers',
        who: "Universités, organismes sans but lucratif et entreprises des États-Unis, y compris les petites entreprises. Non ouvert aux organisations à l'extérieur des États-Unis.",
        timing: "Plusieurs dates de dépôt jusqu'en février 2029",
        href: 'https://www.grants.gov/search-results-detail/360402',
    },
    {
        name: 'Wellcome Discovery Awards',
        funder: 'Wellcome',
        audience: 'researchers',
        who: 'Chefs de file de la recherche établis au Royaume-Uni ou dans un pays à revenu faible ou intermédiaire admissible.',
        amount: "Jusqu'à 8 ans de financement",
        timing: 'En continu',
        href: 'https://wellcome.org/research-funding/schemes/wellcome-discovery-awards',
    },
    {
        name: 'Brainclinics Foundation Prize (TDBRAIN Challenge)',
        funder: 'Brainclinics Foundation et Alto Neuroscience',
        audience: 'researchers',
        who: "Toute personne, de l'étudiant au spécialiste en apprentissage automatique, capable de prédire un diagnostic de dépression ou la réponse à la SMTr à partir de l'EEG seul, sur des données de réplication scellées. Le classement figure sur notre page de projets.",
        amount: '10\u00a0000\u00a0EUR',
        timing: "Se déroule sur 18 mois à partir du 1er septembre 2026; la première soumission qui dépasse le seuil et garde la première place pendant deux mois l'emporte",
        href: 'https://brainclinics.com/research/brainclinics-prize',
    },

    // Jeunes pousses et logiciels libres
    {
        name: 'MedTech Innovator Accelerator (including the Heart & Brain Health track)',
        funder: 'MedTech Innovator',
        audience: 'startups',
        who: 'Jeunes pousses en technologies médicales et en santé numérique, en démarrage ou en croissance, de tout pays, qui visent le marché américain.',
        amount: "Plus de 700\u00a0000\u00a0USD en prix; frais de programme ou prise de participation, bourses offertes",
        closes: '2026-12-01',
        href: 'https://medtechinnovator.org/apply/',
    },
    {
        name: 'NIH Blueprint MedTech Incubator Hubs: NeuroTech Harbor and CINTA',
        funder: 'NeuroTech Harbor (Johns Hopkins et Howard University) avec CIMIT, pour les NIH',
        audience: 'startups',
        who: "Équipes universitaires, industrielles et du milieu sans but lucratif dont le dispositif médical pour le système nerveux a fait ses preuves en principe et qui visent un premier prototype chez l'humain.",
        amount: "Prix Sprinter de 100\u00a0000\u00a0USD, puis jusqu'à 1,28 M USD par année comme Optimizer",
        timing: "Appels par cycles. Les préprojets du cycle 7 ont pris fin le 21 oct. 2026; surveillez le prochain cycle",
        href: 'https://neurotechharbor.org/',
    },
    {
        name: 'NLnet open calls',
        funder: 'NLnet Foundation',
        audience: 'seed',
        who: 'Particuliers, collectifs, organismes sans but lucratif, universités et petites entreprises qui créent des logiciels ou du matériel libres, avec une dimension européenne.',
        amount: "De 5\u00a0000 à 50\u00a0000\u00a0EUR pour une première subvention",
        closes: '2027-01-03',
        timing: 'Appels tous les deux mois',
        href: 'https://nlnet.nl/propose/',
    },
    {
        name: 'ARIA Rolling Opportunity Seeds',
        funder: 'ARIA (Royaume-Uni)',
        audience: 'seed',
        who: "Particuliers, étudiants, universités, entreprises et organismes de bienfaisance, la majeure partie du travail devant se faire au Royaume-Uni. Comprend des thèmes d'interfaces neuronales.",
        amount: 'De 10\u00a0000 à 500\u00a0000\u00a0GBP',
        timing: 'En continu, évaluation mensuelle',
        href: 'https://aria.org.uk/media/gsjkrshi/rolling-opportunity-seeds.pdf',
    },

    // Vulgarisation et communauté
    {
        name: 'Brain Awareness Week Grants',
        funder: 'IBRO et la Dana Foundation',
        audience: 'outreach',
        who: "Organisateurs d'activités de vulgarisation et groupes communautaires en Afrique, en Asie-Pacifique, en Amérique latine, aux États-Unis et au Canada. Un bon choix pour les sections locales et les clubs étudiants.",
        amount: "Jusqu'à 1\u00a0250\u00a0USD",
        timing: 'Annuel; prochaine période prévue en septembre et octobre 2027',
        href: 'https://ibro.org/grant/brain-awareness-week-grants/',
    },
    {
        name: 'Event Funding Program',
        funder: 'Ontario Brain Institute',
        audience: 'outreach',
        who: "Organismes sans but lucratif enregistrés (universités, collèges, hôpitaux, instituts de recherche, fondations, groupes de patients) qui tiennent un événement sur la santé du cerveau en Ontario. Les clubs étudiants et les sections locales présentent leur demande par l'entremise d'un de ces organismes, par exemple leur université.",
        amount: "Jusqu'à 5\u00a0000\u00a0CAD",
        timing: "Deux périodes par année : en mars (événements d'avril à septembre) et en août (événements d'octobre à mars)",
        href: 'https://braininstitute.ca/programs-opportunities/event-funding-program',
    },
];

const en: FundingOpportunity[] = [
    // Start-up programmes and mentorship
    {
        name: 'NeuroDesign Entrepreneurs Workshop',
        funder: 'Case Western Reserve University and the Cleveland FES Center',
        audience: 'startups',
        who: 'Graduate students and early-career professionals. A weekend course: teams take a real clinical need, invent a neurotech solution, build the business model with mentors, and pitch to a panel of investors and neurotech leaders. Over 200 participants so far; free for accepted students, with some travel support.',
        timing: 'Annual, now franchised beyond Cleveland: Cleveland (Sept 2026) and Munich (June 2026). Cleveland applications have opened in June',
        href: 'https://www.clevelandneurodesign.com/',
        featured: true,
    },
    {
        name: 'Cambridge NeuroWorks',
        funder: 'Cambridge University Health Partners, powered by ARIA',
        audience: 'startups',
        who: 'UK-based researchers, clinicians and innovators with radical neurotech ideas for depression, dementia, chronic pain and other brain conditions; no neurotech background needed. Blue Sky and Frontier fellowships with funding, mentorship and lab space, plus a Blue Sky Proof-of-Concept Fund for six-month projects through a UK university.',
        amount: 'Proof-of-concept projects up to GBP 50,000',
        timing: 'Calls in rounds; check the site for the next one',
        href: 'https://cambridgeneuroworks.org/',
    },
    {
        name: 'Araya neurotech incubator',
        funder: "Araya, with support from Japan's Moonshot R&D Program",
        audience: 'startups',
        who: "Researchers and would-be founders in Japan turning neurotech research into companies. Japan's first neurotech incubator, running information sessions and workshops at universities across Japan.",
        timing: 'Ongoing',
        href: 'https://www.araya.org/service/neurotech/',
    },
    {
        name: 'NERVE: Neurotech Entrepreneurship to Validate Emerging Innovations',
        funder: 'Ontario Brain Institute',
        audience: 'startups',
        who: 'Early-stage Canadian neurotech entrepreneurs. Up to five a year get a non-dilutive grant, 12 months of workshops and one-to-one mentorship from an expert in their sector. OBI takes no equity or IP.',
        amount: 'Up to CAD 100,000',
        timing: 'Annual. The 2026 call closed in April; watch for the 2027 call',
        href: 'https://braininstitute.ca/programs-opportunities/nerve-program',
    },
    {
        name: 'NERD: Neurotech Early Research and Development',
        funder: 'Ontario Brain Institute',
        audience: 'startups',
        who: 'Companies commercialising a neurotechnology that has outgrown research grants but is not yet ready for private capital. Milestone-based investment paid directly to contract research organisations and service providers; the company keeps all its IP. The natural next step after NERVE.',
        timing: 'Rolling; contact OBI',
        href: 'https://braininstitute.ca/programs-opportunities/nerd',
    },
    {
        name: 'CORTEX: Community-Led Real-World Neurotech Experience',
        funder: 'Ontario Brain Institute',
        audience: 'startups',
        who: 'Neurotech companies and community organisations that want to test a neurotechnology in real life, with people affected by a brain disorder and their caregivers, using clinical scales and patient-reported outcomes. Nearly 1,500 participants across 10 collaborations in 2025.',
        timing: 'Rolling; contact OBI',
        href: 'https://braininstitute.ca/programs-opportunities/cortex',
    },
    {
        name: 'MS & Neurological Care Accelerator',
        funder: 'MSWA and Founders Factory',
        audience: 'startups',
        who: "Early-stage startups from anywhere using AI, robotics, wearables or digital health for multiple sclerosis, stroke, Parkinson's, Huntington's, motor neurone disease or acquired brain injury. A 16-week programme run from Perth, Australia, with pilots alongside MSWA's clinical network and community. The first cohort of five startups was announced in June 2026, including a subscalp brain–computer interface for speech.",
        amount: 'A$200,000 cash investment',
        timing: 'Applications open; no closing date published',
        href: 'https://foundersfactory.com/mswa-ms-neurological-care-accelerator/',
    },
    {
        name: 'Creative Destruction Lab: Neuro stream',
        funder: 'Creative Destruction Lab (CDL-Toronto)',
        audience: 'startups',
        who: 'Early-stage founders and pre-incorporation projects commercialising neuroscience: brain–computer interfaces, neuroprosthetics, neuromodulation, neuromonitoring, AI for neuroscience, neurodegenerative disease. Nine months of objective-setting with mentors (five sessions from October to June, in Toronto or online), with help on regulation, clinical trials and fundraising. No fees and no equity taken.',
        timing: 'Annual cohort, October to June; applications open for 2026/27',
        href: 'https://creativedestructionlab.com/streams/health/neuro/',
    },
    {
        name: 'One Mind Accelerator',
        funder: 'One Mind',
        audience: 'startups',
        who: 'Mental health startups from pre-seed to Series A, with priority on serious mental illness, youth and maternal mental health, and precision psychiatry. Ten weeks, hybrid (opening and closing weeks in Menlo Park, California), with a 300+ mentor network, investor introductions and meetings with payers and employers. 10 to 15 startups a year.',
        timing: 'Annual; contact One Mind about the next cohort',
        href: 'https://onemind.org/what-we-do/one-mind-accelerator/',
    },
    {
        name: 'NIA Start-Up Challenge and Accelerator',
        funder: 'NIH National Institute on Aging',
        audience: 'startups',
        who: 'People new to entrepreneurship with a technology for ageing and age-related conditions, including dementia and other brain health. Cash prizes plus a five-month accelerator with founder and investor mentors.',
        amount: 'Up to USD 994,000 in prizes in total',
        closes: '2027-01-15',
        timing: 'Submissions open 1 Dec 2026',
        href: 'https://www.nih.gov/challenges/2027-nia-start-challenge-accelerator',
    },
    {
        name: 'Spec Brains fellowship',
        funder: 'Speculative Technologies',
        audience: 'startups',
        who: 'PhD-level researchers with an ambitious neuroscience or neurotech research programme that does not fit existing institutions. Four months, part-time: training, coaching and mentors with DARPA experience, and introductions to funders. Free, no equity taken.',
        timing: 'Annual. The 2027 cohort is closed (applications ran in October); watch for the next call',
        href: 'https://spec.tech/brains',
    },
    // Students and early career
    {
        name: 'FENS/IBRO-PERC Exchange Fellowships',
        funder: 'FENS and IBRO-PERC',
        audience: 'students',
        who: 'MSc and PhD students and postdocs (up to 5 years) in Europe, for a 4-week to 4-month lab exchange.',
        amount: 'Up to EUR 4,000',
        closes: '2027-04-15',
        timing: 'Opens 1 Dec 2026; deadlines every 15 April and 15 October',
        href: 'https://www.fens.org/careers/grants-and-stipends/grant/fens-ibro-perc-exchange-fellowships',
    },
    {
        name: 'IBRO World Congress Travel Grants',
        funder: 'IBRO',
        audience: 'students',
        who: 'PhD students, postdocs and early-career investigators, worldwide.',
        closes: '2027-03-15',
        timing: 'Opens 11 Jan 2027',
        href: 'https://ibro.org/grants/grants-calendar/',
    },
    {
        name: 'EMBO Postdoctoral Fellowships',
        funder: 'EMBO',
        audience: 'students',
        who: 'Life-science postdocs, including neuroscience, moving to a lab in another country.',
        amount: 'Stipend and allowances for up to 2 years',
        closes: '2027-01-22',
        timing: 'Cut-offs through the year',
        href: 'https://www.embo.org/funding/fellowships-grants-and-career-support/postdoctoral-fellowships/',
    },
    {
        name: 'HFSP Postdoctoral Fellowships',
        funder: 'Human Frontier Science Program',
        audience: 'students',
        who: 'Early postdocs changing both country and field.',
        amount: 'Three years of allowances',
        closes: '2027-05-11',
        timing: 'Letter of intent deadline',
        href: 'https://www.hfsp.org/funding/hfsp-funding/postdoctoral-fellowships',
    },
    {
        name: 'MSCA Postdoctoral Fellowships',
        funder: 'European Commission',
        audience: 'students',
        who: 'PhD holders of any nationality, hosted in the EU or an associated country.',
        timing: 'Next call expected to open April 2027 and close September 2027',
        href: 'https://marie-sklodowska-curie-actions.ec.europa.eu/funding/msca-postdoctoral-fellowships-2027',
    },
    {
        name: 'Fellows-to-Faculty Award',
        funder: 'Simons Foundation',
        audience: 'students',
        who: 'Postdocs entering the tenure-track job market, any citizenship.',
        amount: 'USD 600,000 over 3 years',
        closes: '2027-01-13',
        href: 'https://www.simonsfoundation.org/funding/fellows-to-faculty-2027/',
    },
    {
        name: 'Wellcome Early-Career Awards',
        funder: 'Wellcome',
        audience: 'students',
        who: 'Early-career researchers hosted in the UK or in eligible low- and middle-income countries.',
        amount: 'Salary plus up to GBP 400,000 research costs',
        timing: 'Rolling',
        href: 'https://wellcome.org/research-funding/schemes/wellcome-early-career-awards',
    },
    {
        name: 'BBRF Young Investigator Grants',
        funder: 'Brain & Behavior Research Foundation',
        audience: 'students',
        who: 'Early-career investigators in psychiatric and brain-disorders research.',
        amount: 'Up to USD 70,000 over 2 years',
        timing: 'Annual; next cycle expected around February 2027',
        href: 'https://bbrfoundation.org/grants-prizes/bbrf-young-investigator-grants',
    },

    // Researchers and labs
    {
        name: 'EMOTIV NeuroDiscovery Grant Program',
        funder: 'EMOTIV',
        audience: 'researchers',
        who: 'Academic and non-profit researchers, clinicians and graduate students, worldwide.',
        amount: 'EMOTIV hardware and software',
        closes: '2027-01-15',
        href: 'https://www.emotiv.com/neurodiscovery-grants',
    },
    {
        name: 'BCI Award',
        funder: 'BCI Award Foundation',
        audience: 'researchers',
        who: 'BCI researchers, students, clinicians, companies and startups, worldwide.',
        amount: 'USD 2,000 to each of three category winners',
        closes: '2027-01-15',
        href: 'https://www.bci-award.com/Home',
    },
    {
        name: 'Neuromodulation and neurostimulation device development for mental health (PAR-25-286 / PAR-25-287)',
        funder: 'NIH (NIMH)',
        audience: 'researchers',
        who: 'Universities, non-profits and companies; organisations outside the US are eligible.',
        amount: 'Standard R21 and R01 budgets',
        closes: '2027-02-16',
        timing: 'Further receipt dates June and October 2027',
        href: 'https://grants.nih.gov/grants/guide/pa-files/PAR-25-286.html',
    },
    {
        name: 'BRAIN Initiative: invasive neural recording and stimulating technologies in the human brain (RFA-NS-28-010)',
        funder: 'NIH BRAIN Initiative',
        audience: 'researchers',
        who: 'US universities, non-profits and companies, including small businesses. Not open to organisations outside the US.',
        timing: 'Several receipt dates through February 2029',
        href: 'https://www.grants.gov/search-results-detail/360402',
    },
    {
        name: 'Wellcome Discovery Awards',
        funder: 'Wellcome',
        audience: 'researchers',
        who: 'Established research leaders in the UK or in eligible low- and middle-income countries.',
        amount: 'Up to 8 years of funding',
        timing: 'Rolling',
        href: 'https://wellcome.org/research-funding/schemes/wellcome-discovery-awards',
    },
    {
        name: 'Brainclinics Foundation Prize (TDBRAIN Challenge)',
        funder: 'Brainclinics Foundation and Alto Neuroscience',
        audience: 'researchers',
        who: 'Anyone, from students to ML specialists, who can predict depression diagnosis or rTMS outcome from EEG alone on sealed replication data. Standings on our projects page.',
        amount: 'EUR 10,000',
        timing: 'Runs 18 months from 1 September 2026; the first entry to beat the bar and hold first place for two months wins',
        href: 'https://brainclinics.com/research/brainclinics-prize',
    },

    // Startups and open source
    {
        name: 'MedTech Innovator Accelerator (including the Heart & Brain Health track)',
        funder: 'MedTech Innovator',
        audience: 'startups',
        who: 'Early- to mid-stage medtech and digital-health startups from any country, aiming at the US market.',
        amount: 'Prize pool over USD 700,000; programme fee or equity, scholarships available',
        closes: '2026-12-01',
        href: 'https://medtechinnovator.org/apply/',
    },
    {
        name: 'NIH Blueprint MedTech Incubator Hubs: NeuroTech Harbor and CINTA',
        funder: 'NeuroTech Harbor (Johns Hopkins and Howard University) with CIMIT, for NIH',
        audience: 'startups',
        who: 'Academic, industry and non-profit teams with a proven-concept medical device for the nervous system, heading to a first-in-human prototype.',
        amount: 'USD 100,000 Sprinter award, then up to USD 1.28M a year as an Optimizer',
        timing: 'Calls in cycles. Cycle 7 pre-proposals closed 21 Oct 2026; watch for the next cycle',
        href: 'https://neurotechharbor.org/',
    },
    {
        name: 'NLnet open calls',
        funder: 'NLnet Foundation',
        audience: 'seed',
        who: 'Individuals, collectives, non-profits, universities and small companies building open-source software or hardware, with a European dimension.',
        amount: 'EUR 5,000 to 50,000 for a first grant',
        closes: '2027-01-03',
        timing: 'Calls every two months',
        href: 'https://nlnet.nl/propose/',
    },
    {
        name: 'ARIA Rolling Opportunity Seeds',
        funder: 'ARIA (UK)',
        audience: 'seed',
        who: 'Individuals, students, universities, companies and charities, with most of the work done in the UK. Includes neural-interface themes.',
        amount: 'GBP 10,000 to 500,000',
        timing: 'Rolling, reviewed monthly',
        href: 'https://aria.org.uk/media/gsjkrshi/rolling-opportunity-seeds.pdf',
    },

    // Outreach and community
    {
        name: 'Brain Awareness Week Grants',
        funder: 'IBRO and the Dana Foundation',
        audience: 'outreach',
        who: 'Outreach organisers and community groups in Africa, Asia-Pacific, Latin America, the US and Canada. A good fit for chapters and student clubs.',
        amount: 'Up to USD 1,250',
        timing: 'Annual; next window expected September–October 2027',
        href: 'https://ibro.org/grant/brain-awareness-week-grants/',
    },
    {
        name: 'Event Funding Program',
        funder: 'Ontario Brain Institute',
        audience: 'outreach',
        who: 'Registered not-for-profits (universities, colleges, hospitals, research institutes, foundations, patient groups) holding a brain health event in Ontario. Student clubs and chapters apply through one of these, such as their university.',
        amount: 'Up to C$5,000',
        timing: 'Two intakes a year: March (events April to September) and August (events October to March)',
        href: 'https://braininstitute.ca/programs-opportunities/event-funding-program',
    },
];

export const fundingOpportunities = bilingual(fr, en);
