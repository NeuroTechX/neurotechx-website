import { bilingual } from '../text';

export default bilingual(
  {
    title: 'Sécurité, éthique et réglementation',
    description:
      "Repères pratiques sur la sécurité en laboratoire et en bricolage neurotech, la confidentialité des données neuronales, la neuroéthique et les voies réglementaires.",
    eyebrow: 'Repères',
    heading: 'Sécurité, éthique et réglementation',
    subtitle:
      "Ce que tout étudiant, développeur, chercheur ou fondateur en neurotechnologie devrait connaître avant d'enregistrer des données humaines, d'expérimenter avec du matériel ou de lancer un produit.",
    disclaimer:
      "Ces repères sont fournis à titre informatif par la communauté NeuroTechX et ne constituent ni un avis médical ni un avis juridique.",
    safetyTitle: 'Sécurité matérielle et expérimentation humaine',
    safetyLead:
      "L'enregistrement non invasif comme l'EEG est très accessible, mais toute interface reliée au corps demande une hygiène électrique et éthique rigoureuse.",
    safetyItems: [
      {
        heading: 'Isolation électrique en EEG et biosignaux',
        body: "Utilisez uniquement du matériel fonctionnant sur pile ou homologué avec une isolation galvanique médicale (CEI 60601-1). Ne branchez jamais un ordinateur sur secteur à un amplificateur maison sans barrière d'isolation vérifiée, et ne posez pas d'électrodes sur une peau irritée ou blessée.",
      },
      {
        heading: 'Prudence absolue avec la stimulation (tDCS, tACS, tFUS)',
        body: "Contrairement à l'enregistrement passif, la stimulation électrique ou ultrasonore applique de l'énergie au cerveau. Les montages maison comportent des risques réels (brûlures cutanées, céphalées, effets indésirables neurologiques). Les expériences de stimulation doivent rester encadrées par un protocole de recherche ou un cadre clinique supervisé.",
      },
      {
        heading: "Consentement éclairé et comité d'éthique (CER / IRB)",
        body: "Dès que vous recueillez des données auprès de participants humains pour de la recherche, un projet étudiant publiable ou un prototype, obtenez un consentement éclairé écrit, minimisez les données personnelles recueillies et passez par le comité d'éthique de votre établissement.",
      },
    ],
    ethicsTitle: 'Neuroéthique et confidentialité des données neuronales',
    ethicsLead:
      "Les données cérébrales peuvent révéler des états d'attention, de fatigue ou des marqueurs cliniques sensibles. Traitez-les comme des renseignements personnels sensibles dès la conception.",
    ethicsNote:
      "NeuroTechX est exploité depuis Montréal et applique les principes de la Loi 25 du Québec (minimisation des données, consentement clair et transparence). Consultez notre ",
    privacyLink: 'politique de confidentialité',
    ethicsResources: [
      {
        org: 'UNESCO',
        title: "Recommandation sur l'éthique de la neurotechnologie",
        summary: "Cadre international sur les droits humains, la gouvernance des données neuronales et l'usage responsable des neurotechnologies.",
        href: 'https://www.unesco.org/en/ethics-neurotech',
      },
      {
        org: 'IEEE Brain',
        title: 'IEEE Neuroethics Framework',
        summary: "Guide structuré couvrant la sécurité, l'autonomie, la vie privée, la justice et la responsabilité tout au long du cycle de vie d'un dispositif.",
        href: 'https://brain.ieee.org/publications/ieee-neuroethics-framework/',
      },
      {
        org: 'Neurorights Foundation',
        title: 'Principes et veille sur les neurodroits',
        summary: "Travaux de référence sur la protection juridique de la vie privée mentale et des données neuronales à travers le monde.",
        href: 'https://neurorightsfoundation.org/',
      },
    ],
    regTitle: 'Voies réglementaires pour les fondateurs',
    regLead:
      "La frontière entre bien-être grand public et dispositif médical dépend des allégations cliniques et du niveau de risque. Planifiez votre stratégie réglementaire tôt.",
    regResources: [
      {
        org: 'FDA (États-Unis)',
        title: 'Lignes directrices sur les dispositifs ICM implantés',
        summary: "Document de référence de la FDA sur les essais non cliniques et cliniques pour les interfaces cerveau-ordinateur implantées.",
        href: 'https://www.fda.gov/regulatory-information/search-fda-guidance-documents/implanted-brain-computer-interface-bci-devices-patients-paralysis-or-amputation-non-clinical-testing',
      },
      {
        org: 'FDA (États-Unis)',
        title: 'Voies de mise en marché : 510(k), De Novo, PMA et IDE',
        summary: "Vue d'ensemble officielle des parcours réglementaires américains selon la classe de risque du dispositif médical.",
        href: 'https://www.fda.gov/medical-devices/device-advice-comprehensive-regulatory-assistance/how-study-and-market-your-device',
      },
      {
        org: 'Santé Canada',
        title: 'Instruments médicaux au Canada',
        summary: "Classification (classes I à IV), homologation et autorisations d'essais expérimentaux auprès de Santé Canada.",
        href: 'https://www.canada.ca/fr/sante-canada/services/medicaments-produits-sante/instruments-medicaux.html',
      },
      {
        org: 'Union européenne',
        title: 'Règlement européen sur les dispositifs médicaux (RDM / EU MDR)',
        summary: "Cadre européen encadrant le marquage CE, l'évaluation clinique et la surveillance après commercialisation.",
        href: 'https://health.ec.europa.eu/medical-devices-sector/overview_fr',
      },
    ],
    visitSource: 'Consulter la référence',
    relatedHeading: 'Ressources complémentaires sur le site',
    glossaryLink: 'Glossaire de la neurotechnologie',
    fundingLink: 'Financement et programmes pour jeunes pousses',
    conductLink: 'Code de conduite de NeuroTechX',
  },
  {
    title: 'Safety, Ethics & Regulation',
    description:
      'Practical fundamentals on EEG and DIY neurotech safety, neural data privacy, neuroethics frameworks, and medical-device regulatory pathways.',
    eyebrow: 'Fundamentals',
    heading: 'Safety, Ethics & Regulation',
    subtitle:
      'What every student, developer, researcher, and founder in neurotechnology should know before recording human data, experimenting with hardware, or launching a product.',
    disclaimer:
      'This guide is provided by the NeuroTechX community for educational purposes and is not medical or legal advice.',
    safetyTitle: 'Hardware safety & human experimentation',
    safetyLead:
      'Non-invasive recording like EEG is remarkably accessible, but any hardware connected to a person requires solid electrical and ethical hygiene.',
    safetyItems: [
      {
        heading: 'Electrical isolation for EEG & biosignals',
        body: 'Use battery-powered or properly isolated amplifiers (IEC 60601-1 medical isolation for clinical setups). Never connect a mains-powered laptop directly to a DIY amplifier without verified galvanic isolation, and avoid placing electrodes over broken or irritated skin.',
      },
      {
        heading: 'Strict caution with stimulation (tDCS, tACS, tFUS)',
        body: 'Unlike passive recording, electrical and ultrasound stimulation deliver energy into the brain. DIY stimulation carries real risks (skin burns, headaches, unintended neurological effects) and should stay within supervised clinical or institutional research protocols.',
      },
      {
        heading: 'Informed consent & ethics review (IRB / REB)',
        body: 'Whenever you collect neural data from human participants for research, publishable student work, or user testing, obtain clear written informed consent, minimize personally identifiable data, and go through your institution’s IRB/REB.',
      },
    ],
    ethicsTitle: 'Neuroethics & neural data privacy',
    ethicsLead:
      'Brain recordings can reveal attention, fatigue, or clinical biomarkers. Treat neural recordings as sensitive personal data from day one.',
    ethicsNote:
      'NeuroTechX operates from Montréal under Quebec Law 25 principles (data minimization, clear consent, and transparency). Read our ',
    privacyLink: 'privacy policy',
    ethicsResources: [
      {
        org: 'UNESCO',
        title: 'Recommendation on the Ethics of Neurotechnology',
        summary: 'Global policy framework covering human rights, neural data governance, and responsible neurotechnology development.',
        href: 'https://www.unesco.org/en/ethics-neurotech',
      },
      {
        org: 'IEEE Brain',
        title: 'IEEE Neuroethics Framework',
        summary: 'Structured guidance across safety, agency, privacy, justice, and accountability throughout the neurotech product lifecycle.',
        href: 'https://brain.ieee.org/publications/ieee-neuroethics-framework/',
      },
      {
        org: 'Neurorights Foundation',
        title: 'Neurorights Principles & Policy Tracker',
        summary: 'Research and advocacy on legal protections for mental privacy and neural data worldwide.',
        href: 'https://neurorightsfoundation.org/',
      },
    ],
    regTitle: 'Regulatory pathways for founders',
    regLead:
      'Whether a product sits in general wellness or regulated medical-device territory depends on intended use, clinical claims, and risk class. Map your pathway early.',
    regResources: [
      {
        org: 'US FDA',
        title: 'Implanted BCI Device Guidance',
        summary: 'FDA non-clinical and clinical testing considerations for implanted brain–computer interface devices.',
        href: 'https://www.fda.gov/regulatory-information/search-fda-guidance-documents/implanted-brain-computer-interface-bci-devices-patients-paralysis-or-amputation-non-clinical-testing',
      },
      {
        org: 'US FDA',
        title: 'How to Study and Market Your Device (510(k), De Novo, PMA, IDE)',
        summary: 'Official FDA overview of US regulatory pathways by device risk class and clinical investigation requirements.',
        href: 'https://www.fda.gov/medical-devices/device-advice-comprehensive-regulatory-assistance/how-study-and-market-your-device',
      },
      {
        org: 'Health Canada',
        title: 'Medical Devices in Canada',
        summary: 'Device classification (Classes I–IV), licensing, and investigational testing authorizations from Health Canada.',
        href: 'https://www.canada.ca/en/health-canada/services/drugs-health-products/medical-devices.html',
      },
      {
        org: 'European Union',
        title: 'EU Medical Device Regulation (EU MDR)',
        summary: 'European Commission overview of CE marking, clinical evaluation, and post-market surveillance requirements.',
        href: 'https://health.ec.europa.eu/medical-devices-sector/overview_en',
      },
    ],
    visitSource: 'Read reference',
    relatedHeading: 'Related pages on NeuroTechX',
    glossaryLink: 'Neurotechnology Glossary',
    fundingLink: 'Funding & startup programmes',
    conductLink: 'NeuroTechX Code of Conduct',
  }
);
