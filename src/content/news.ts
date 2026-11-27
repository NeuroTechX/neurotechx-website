import { bilingual } from '@/i18n/text';
import { NEUROMODULATION_LAB_PATH } from '@/content/learn/primer-chapters';

// NeuroTechX announcements shown on /news and in /feed.xml, newest first. Written in French
// first, then English with the same entries in the same order. `date` is when the change went
// live (ISO, UTC); `link` is an English route path (localized on the page) or a full URL.
// Add an entry only for something that is live on the site or verifiable at its link.

const dates = [
  '2026-11-27T21:54:38Z',
  '2026-11-27T07:52:49Z',
  '2026-11-27T07:24:17Z',
  '2026-11-27T07:04:34Z',
] as const;

const links = [NEUROMODULATION_LAB_PATH, '/compute', '/about#history', '/learn'] as const;

const text = bilingual(
  [
    {
      title: 'Nouveau labo Learn : la neuromodulation sur une tête entière',
      summary:
        "Une comparaison simulée de la SMT, de la tDCS et de la tACS, de l'interférence temporelle et des ultrasons focalisés sur un même modèle de tête réel, pour une cible superficielle (M1 de la main gauche) et une cible profonde (thalamus gauche). Les champs électriques sont calculés avec SimNIBS et les ultrasons avec BabelBrain.",
    },
    {
      title: 'Du calcul gratuit pour les membres : la Neuroscience Gateway',
      summary:
        "Une nouvelle page explique ce qu'est la Neuroscience Gateway (NSG), qui peut l'utiliser et à quel coût, les outils offerts, les données NEMAR sur Expanse et comment y accéder par le portail ou l'API REST, avec le démarrage rapide de nsg-agent-kit.",
    },
    {
      title: "L'histoire de NeuroTechX, avec ses sources",
      summary:
        "La page À propos présente maintenant une chronologie de NeuroTechX : la fondation, les hacknights et les sections, l'infolettre et le Content Lab, la compétition étudiante, les outils et le matériel ouverts, les hackathons mondiaux et plus. Chaque étape renvoie à ses sources.",
    },
    {
      title: "Trois labos d'imagerie sur la tête entière : fNIRS, OPM-MEG et EEG haute densité",
      summary:
        "Le labo fNIRS utilise maintenant des enregistrements Kernel Flow2 publics, et deux nouveaux labos Learn s'y ajoutent, eux aussi construits à partir de données publiques : l'OPM-MEG avec MNE-Python et osl-dynamics, et l'EEG haute densité tiré de HBN-EEG avec MNE-Python.",
    },
  ],
  [
    {
      title: 'New Learn lab: whole-head neuromodulation',
      summary:
        'A simulated comparison of TMS, tDCS and tACS, temporal interference and focused ultrasound on one real head model, at a superficial target (left hand M1) and a deep target (left thalamus). SimNIBS computes the electric fields and BabelBrain the ultrasound.',
    },
    {
      title: 'Free compute for members: the Neuroscience Gateway',
      summary:
        'A new page explains what the Neuroscience Gateway (NSG) is, who can use it and what it costs, the tools it offers, NEMAR data on Expanse, and how to get access through the portal or the REST API, with the nsg-agent-kit quickstart.',
    },
    {
      title: 'The history of NeuroTechX, with sources',
      summary:
        'The About page now has a NeuroTechX timeline: the founding, hacknights and chapters, the newsletter and Content Lab, the student competition, open tools and hardware, global hackathons and more. Each entry links to its sources.',
    },
    {
      title: 'Three whole-head imaging labs: fNIRS, OPM-MEG and high-density EEG',
      summary:
        'The fNIRS lab now uses public Kernel Flow2 recordings, and two new Learn labs join it, also built from public data: OPM-MEG with MNE-Python and osl-dynamics, and high-density EEG from HBN-EEG with MNE-Python.',
    },
  ]
);

export type Announcement = { date: string; title: string; summary: string; link: string };

export const announcements = {
  fr: text.fr.map((t, i) => ({ ...t, date: dates[i], link: links[i] })),
  en: text.en.map((t, i) => ({ ...t, date: dates[i], link: links[i] })),
} satisfies Record<'fr' | 'en', Announcement[]>;
