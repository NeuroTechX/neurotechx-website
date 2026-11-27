import type { Strings } from './text';

// French is the source text for the site. Write new strings here first; en.ts must have the
// same keys (TypeScript fails the build otherwise), so English never gets ahead of French.
// Quebec French: « infolettre », « courriel », « section locale ».

const fr = {
  meta: {
    title: 'NeuroTechX — La communauté internationale de la neurotechnologie',
    description:
      "NeuroTechX est un organisme sans but lucratif mené par des bénévoles qui rassemble la plus grande communauté internationale d'innovateurs en neurotechnologie : formation, outils libres, hackathons et plus de 30 sections locales.",
    ogDescription: 'La communauté internationale de la neurotechnologie.',
  },
  skipToContent: 'Aller au contenu',
  languageSwitch: {
    label: 'Choisir la langue',
    other: 'English',
  },
  nav: {
    label: 'Menu principal',
    openMenu: 'Ouvrir le menu',
    closeMenu: 'Fermer le menu',
    donate: 'Faire un don',
    join: 'Rejoindre',
    about: {
      title: 'À propos',
      mission: 'Notre mission',
      joinTeam: "Joindre l'équipe",
      transparency: 'Transparence',
      conduct: 'Code de conduite',
    },
    community: {
      title: 'Communauté',
      overview: 'La communauté',
      chapters: 'Fonder une section locale',
      students: 'Clubs étudiants',
      contentLab: 'Content Lab',
      news: 'Nouvelles',
      newsletter: 'Infolettre',
      handbook: 'Guide des bénévoles',
    },
    learn: {
      title: 'Apprendre',
      education: 'Formation',
      primer: 'Le NeuroTech Primer',
      webinars: 'Webinaires',
      startHere: 'Par où commencer',
      glossary: 'Glossaire',
      safetyEthics: 'Sécurité et éthique',
    },
    projects: {
      title: 'Projets',
      openSource: 'Projets libres',
      challenges: 'Défis et classements',
    },
    ecosystem: {
      title: 'Écosystème',
      map: "Carte de l'écosystème",
      funding: 'Financement',
      reports: "Veille de l'industrie",
      jobs: 'Emplois',
    },
    events: 'Événements',
  },
  banner: {
    badge: 'Résumés avant le 15 janv.',
    title: '12e Rencontre internationale sur les ICM',
    details: 'Šibenik, Croatie • 7 au 10 juin 2027',
    cta: 'En savoir plus',
    close: 'Masquer cette annonce',
  },
  notTranslated:
    "Cette page n'est pas encore traduite. Vous en lisez la version anglaise; la traduction française est en cours.",
  footer: {
    label: 'Pied de page',
    getInvolved: 'Participer',
    learn: 'Apprendre',
    resources: 'Ressources',
    organization: 'Organisation',
    links: {
      community: 'Rejoindre la communauté',
      joinTeam: "Joindre l'équipe",
      students: 'Étudiants et clubs',
      newsletter: 'Infolettre',
      donate: 'Faire un don',
      education: 'Formation',
      primer: 'Le NeuroTech Primer',
      glossary: 'Glossaire',
      safetyEthics: 'Sécurité et éthique',
      contentLab: 'Content Lab',
      reports: "Veille de l'industrie",
      funding: 'Financement',
      jobs: 'Emplois',
      ecosystem: 'Écosystème',
      compute: 'Calcul gratuit (NSG)',
      guide: 'Guide des sections et clubs',
      handbook: 'Guide des bénévoles',
      about: 'À propos',
      events: 'Événements',
      news: 'Nouvelles',
      projects: 'Projets',
      transparency: 'Transparence',
    },
    conduct: 'Code de conduite',
    privacy: 'Confidentialité',
    transparency: 'Transparence',
    legal:
      'Exploité par la Société BCI Montréal, organisme sans but lucratif du Québec (NEQ 1170984166) · 6666, rue Saint-Urbain, bureau 200, Montréal (Québec) H2S 3H1, Canada',
  },
  notFound: {
    title: 'Page introuvable',
    body: "La page que vous cherchez a peut-être changé d'adresse lors du passage de neurotechx.com à neurotechx.org, ou elle n'existe plus.",
    home: "Retour à l'accueil",
  },
  hero: {
    region: 'Manchettes',
    previous: 'Manchette précédente',
    next: 'Manchette suivante',
    choose: 'Choisir une manchette',
    position: 'Manchette {n} de {total}',
    play: 'Reprendre le défilement',
    pause: 'Mettre le défilement en pause',
    blogEyebrow: 'Dernier billet du blogue NeuroTechX',
    blogCta: 'Lire sur Medium',
  },
  home: {
    doorsHeading: 'Par où commencer',
    doors: {
      learn: {
        title: 'Apprendre',
        desc: 'Par où commencer, le NeuroTech Primer et plus de 100 heures de webinaires.',
        cta: 'Commencer à apprendre',
      },
      participate: {
        title: 'Participer',
        desc: 'Sections locales dans plus de 30 villes, clubs étudiants, hackathons et défis ouverts.',
        cta: 'Trouver sa communauté',
      },
      work: {
        title: 'Travailler en neurotech',
        desc: "Emplois, financement et carte de l'écosystème pour bâtir une carrière ou une entreprise.",
        cta: 'Voir les emplois',
      },
    },
    eventsEyebrow: 'Événements',
    eventsHeading: 'À venir',
    allEvents: 'Tous les événements',
    newsletterEyebrow: 'Infolettre',
    newsletterHeading: "Recevoir l'infolettre NeuroTechX",
    ctaHeading: "Bâtissons ensemble l'avenir de la neurotech.",
    ctaBody: "Joignez-vous à des milliers d'innovateurs, d'étudiants et de chercheurs qui façonnent le domaine.",
    ctaJoin: 'Rejoindre la communauté',
    ctaSupport: 'Soutenir la mission',
  },
  events: {
    past: 'Passé',
    upcoming: 'À venir',
    tags: {
      Competition: 'Compétition',
      Conference: 'Conférence',
      Hackathon: 'Hackathon',
      Meetup: 'Rencontre',
      Workshop: 'Atelier',
    },
  },
  newsletter: {
    email: 'Adresse courriel',
    subscribe: "S'abonner",
    unsubscribe: 'Désabonnement en tout temps. Consultez notre',
    privacy: 'politique de confidentialité',
  },
};

export default fr;

export type Dictionary = Strings<typeof fr>;
