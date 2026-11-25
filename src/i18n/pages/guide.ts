import { bilingual } from '../text';

// Page furniture for the chapter and club guide and the volunteer handbook. Their articles are
// synced from NTX-dockit and NTX-handbook, French from each repository's fr/ folder.
export default bilingual(
  {
    guide: {
      title: 'Guide des sections et des clubs',
      description:
        "Le guide NeuroTechX pour les sections locales et les clubs étudiants : premiers pas, lignes directrices, croissance d'une communauté, rencontres, hacknights et commandites.",
      eyebrow: 'Guide',
      heading: 'Guide des sections et des clubs',
      subtitle:
        "Tout ce dont une section locale ou un club étudiant NeuroTechX a besoin : comment démarrer, ce que nous attendons et comment grandir.",
      handbookBefore: 'Vous êtes bénévole pour NeuroTechX elle-même? Consultez le ',
      handbookLink: 'guide des bénévoles',
      back: '← Guide des sections et des clubs',
    },
    handbook: {
      title: 'Guide des bénévoles',
      description:
        "Le guide des bénévoles de NeuroTechX : comment se joindre à l'équipe, l'entente de contribution, les outils et accès, la confidentialité, l'argent et le départ.",
      eyebrow: 'Guide des bénévoles',
      heading: 'Travailler avec NeuroTechX',
      subtitle:
        "Comment vous joignez l'équipe, ce à quoi vous vous engagez, les outils que vous recevez, comment nous travaillons ensemble et comment vous partez.",
      clubsBefore: 'Les sections locales et les clubs étudiants ont leurs propres guides : ',
      startChapter: 'fonder une section',
      and: ' et ',
      startClub: 'fonder un club',
      draftBefore: '. Les passages marqués ',
      draft: 'Ébauche',
      draftAfter: " décrivent ce qui n'est pas encore décidé.",
      back: '← Guide des bénévoles',
    },
    // Pages of the guide with their own address elsewhere on the site
    pages: {
      'community-growth': "Conseils pratiques pour faire grandir une section locale NeuroTechX et animer des rencontres en neurotech qui mobilisent.",
      'chapter-guidelines': "Mission, structure et lignes directrices pour organiser et animer une section locale NeuroTechX.",
      'chapter-onboarding': "Comment fonder ou relancer une section NeuroTechX dans votre ville : ce que vous recevez, ce que nous demandons et vos 90 premiers jours.",
      'getting-started': "Guide étape par étape pour fonder une nouvelle section NeuroTechX dans votre ville.",
      resources: "Éléments de marque NeuroTechX, modèles pour l'équipe d'organisation et liens de référence en neurotechnologie.",
      'student-club-onboarding': "Comment fonder un club de neurotechnologie universitaire, ou joindre un club existant au réseau NeuroTechX.",
    },
  },
  {
    guide: {
      title: 'Chapter and Club Guide',
      description:
        'The NeuroTechX guide for chapters and student clubs: getting started, chapter guidelines, growing a community, meetups, hacknights and sponsorship.',
      eyebrow: 'Guide',
      heading: 'Chapter and club guide',
      subtitle: 'Everything a NeuroTechX chapter or student club needs: how to start, what we expect, and how to grow.',
      handbookBefore: 'Volunteering for NeuroTechX itself? See the ',
      handbookLink: 'volunteer handbook',
      back: '← Chapter and club guide',
    },
    handbook: {
      title: 'Volunteer Handbook',
      description:
        'The NeuroTechX volunteer handbook: how to join, the contributor agreement, tools and access, privacy, money and leaving.',
      eyebrow: 'Volunteer handbook',
      heading: 'Working with NeuroTechX',
      subtitle: 'How you join, what you agree to, the tools you get, how we work together, and how you leave.',
      clubsBefore: 'Chapters and student clubs have their own guides: ',
      startChapter: 'starting a chapter',
      and: ' and ',
      startClub: 'starting a club',
      draftBefore: '. Passages marked ',
      draft: 'Draft',
      draftAfter: ' describe something not yet decided.',
      back: '← Volunteer handbook',
    },
    pages: {
      'community-growth': 'Practical tips and playbooks for growing a local NeuroTechX chapter and hosting engaging neurotech meetups.',
      'chapter-guidelines': 'Mission, structure, and guidelines for organizing and running a local NeuroTechX city chapter.',
      'chapter-onboarding': 'How to start or restart a NeuroTechX chapter in your city: what you get, what we ask, and your first 90 days.',
      'getting-started': 'Step-by-step guide to starting a new NeuroTechX chapter in your city.',
      resources: 'NeuroTechX branding assets, organizer templates, and neurotechnology reference links.',
      'student-club-onboarding': 'How to start a university neurotechnology club, or bring an existing club into the NeuroTechX network.',
    },
  }
);
