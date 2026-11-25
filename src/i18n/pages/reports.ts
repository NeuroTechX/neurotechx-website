import { bilingual } from '../text';

export default bilingual(
  {
    title: "Veille de l'industrie",
    description:
      "Qui lire sur les affaires en neurotechnologie, les dernières parutions des infolettres indépendantes en neurotech et l'actualité de l'industrie, mise à jour toutes les heures.",
    eyebrow: 'Industrie',
    subtitle:
      "Qui lire sur les affaires en neurotechnologie, les dernières parutions de leurs infolettres et l'actualité au fil des nouvelles.",
    whoToReadTitle: 'Qui lire',
    whoToReadBody:
      "Des infolettres et des analystes indépendants qui couvrent l'industrie de la neurotech. Abonnez-vous directement auprès d'eux.",
    latestTitle: 'Les dernières parutions de ces publications',
    newsTitle: "Plus d'actualités de l'industrie",
    noNews: 'Rien pour le moment. Revenez bientôt.',
    disclaimer:
      "L'inscription d'une publication à cette liste ne constitue pas une recommandation, et NeuroTechX n'est pas rémunéré pour celle-ci. Vous connaissez une infolettre indépendante en neurotech que nous devrions ajouter? Écrivez à",
    fundingLead: 'Vous cherchez du financement pour vos travaux? Consultez',
    fundingLink: 'les occasions de financement',
    access: {
      Free: 'Gratuit',
      'Free and paid': 'Gratuit et payant',
      Paid: 'Payant',
    },
  },
  {
    title: 'Industry Intelligence',
    description:
      'Who to read on the business of neurotechnology, the latest from independent neurotech newsletters, and industry news updated hourly.',
    eyebrow: 'Industry',
    subtitle:
      'Who to read on the business of neurotechnology, the latest from their newsletters, and the news as it breaks.',
    whoToReadTitle: 'Who to read',
    whoToReadBody:
      'Independent newsletters and analysts covering the neurotech industry. Subscribe to them directly.',
    latestTitle: 'Latest from these publications',
    newsTitle: 'More industry news',
    noNews: 'No items right now. Check back soon.',
    disclaimer:
      'Listing a publication is not an endorsement, and NeuroTechX is not paid for it. Know of an independent neurotech newsletter we should list? Write to',
    fundingLead: 'Looking for money for your work? See',
    fundingLink: 'funding opportunities',
    access: {
      Free: 'Free',
      'Free and paid': 'Free and paid',
      Paid: 'Paid',
    },
  }
);

/**
 * French descriptions of the publications in src/data/publications.ts, keyed by publication name
 * (names stay as published). The English page uses the data file's own text.
 */
export const publicationsFr: Record<string, { about: string; cadence: string; cta: string }> = {
  'Neurotech Reports': {
    about:
      "L'infolettre la plus ancienne de l'industrie de la neurotechnologie, avec des rapports de marché approfondis sur les affaires en neurotech.",
    cadence: 'Infolettre mensuelle et rapports de marché périodiques',
    cta: 'Visiter Neurotech Reports',
  },
  'Neurotech Futures': {
    about:
      "Nouvelles de l'industrie, analyses et portraits approfondis d'entreprises, ainsi que le babillard d'emplois et l'écosystème Neurotech Futures.",
    cadence: 'Plusieurs billets par mois',
    cta: "S'abonner sur Substack",
  },
  Neurofounders: {
    about:
      "Nouvelles de dernière heure en neurotech, notes de marché et analyses approfondies, avec une carte des jeunes pousses et une carte des investisseurs du domaine.",
    cadence: 'Plusieurs articles par semaine',
    cta: 'Lire Neurofounders',
  },
  Signals: {
    about:
      'Une note de marché mensuelle sur les transactions et les tendances qui comptent, rédigée pour les dirigeants commerciaux.',
    cadence: 'Mensuel',
    cta: 'À propos de Signals',
  },
  'The Neurotech Newsletter': {
    about:
      'Financement, réglementation, avancées cliniques, lancements, partenariats et embauches dans toute la neurotechnologie, avec des entrevues et des analyses régionales approfondies.',
    cadence: 'Toutes les deux semaines',
    cta: "S'abonner sur Substack",
  },
  'Inside Neurotech': {
    about:
      "Un résumé hebdomadaire des manchettes en neurotech, par une responsable du recrutement de cadres en neurotech établie au Royaume-Uni, accompagné du balado Crux of Neuro.",
    cadence: 'Hebdomadaire, sur LinkedIn',
    cta: 'Suivre sur LinkedIn',
  },
};
