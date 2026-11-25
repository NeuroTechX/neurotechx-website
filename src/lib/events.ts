export type NtxEvent = {
  name: string;
  tag: string;
  dateLabel: string;
  end: string; // ISO end date — drives Upcoming/Past + sorting
  location: string;
  url: string;
  desc: string;
  // French text for the event card; English is shown on French pages when it is missing.
  fr?: { dateLabel?: string; location?: string; desc: string };
};

// NeuroTechX-relevant neurotech/neuroscience conference calendar.
// Upcoming/Past is computed from `end` at render time (so it never goes stale).
export const EVENTS: NtxEvent[] = [
  // ── Past 2026 ──
  {
    name: 'Global NeuroHack 2026', tag: 'Hackathon', dateLabel: 'Apr 10–12, 2026', end: '2026-04-12',
    location: 'Frontier Tower, San Francisco', url: 'https://global-neurohack.github.io/',
    desc: 'A 48-hour student neurotech hackathon — 100+ students from world-leading universities.',
  },
  {
    name: 'California Neurotechnology Conference 2026', tag: 'Conference', dateLabel: 'Apr 26, 2026', end: '2026-04-26',
    location: 'UC Berkeley', url: 'https://neurotech.studentorg.berkeley.edu/conference.html',
    desc: '4th annual conference, co-hosted by UCLA, UCSD, UC Davis, UCSC & USC.',
  },
  {
    name: 'OHBM BrainHack 2026', tag: 'Hackathon', dateLabel: 'Jun 11–13, 2026', end: '2026-06-13',
    location: 'Bordeaux, France', url: 'https://ohbm.github.io/hackathon2026/',
    desc: 'OHBM hackathon — incl. the EEG101 & INDoS open/FAIR EEG workshops.',
  },
  // ── Upcoming ──
  {
    name: 'NYC Neuromodulation Conference 2026', tag: 'Conference', dateLabel: 'Jul 30 – Aug 3, 2026', end: '2026-08-03',
    location: 'City College of New York', url: 'https://neuromodec.org/2026-nyc-neuromodulation-conference/',
    desc: "Marom Bikson's NYC Neuromodulation — the standout meeting on brain stimulation & brain interfaces.",
  },
  {
    name: 'FUN26 — Focused Ultrasound Neuromodulation', tag: 'Conference', dateLabel: 'Jul 22–24, 2026', end: '2026-07-24',
    location: 'Paris, France', url: 'https://www.itrusst.com/fun26',
    desc: 'ITRUSST conference on transcranial ultrasound stimulation & neuromodulation.',
  },
  {
    name: 'CCN 2026 — Cognitive Computational Neuroscience', tag: 'Conference', dateLabel: 'Aug 3–6, 2026', end: '2026-08-06',
    location: 'New York University', url: 'https://2026.ccneuro.org/',
    desc: '9th annual conference uniting cognitive science, AI, and neuroscience.',
  },
  {
    name: 'CuttingGardens 2026', tag: 'Conference', dateLabel: '21–25 Sep 2026', end: '2026-09-25',
    location: 'Distributed · multi-hub', url: 'https://cuttingeeg.org/cuttinggardens2026/',
    desc: 'A distributed multi-hub conference on cutting-edge M/EEG analysis methods.',
  },
  {
    name: 'IEEE SMC 2026', tag: 'Conference', dateLabel: 'Oct 4–7, 2026', end: '2026-10-07',
    location: 'Bellevue, WA', url: 'https://www.ieeesmc2026.org/',
    desc: 'IEEE Systems, Man & Cybernetics — including the Brain-Machine Interface (BMI) Workshop.',
  },
  {
    name: 'BR41N.IO Hackathon @ IEEE SMC', tag: 'Hackathon', dateLabel: 'Oct 4–5, 2026', end: '2026-10-05',
    location: 'Bellevue, WA', url: 'https://www.br41n.io/IEEE-SMC-2026',
    desc: "g.tec's BCI hackathon during IEEE SMC — build brain-computer interface apps in a day.",
  },
  {
    name: 'NeuroTechX @ SF Tech Week', tag: 'Meetup', dateLabel: 'Oct 5–11, 2026', end: '2026-10-11',
    location: 'San Francisco', url: 'https://www.tech-week.com/',
    desc: 'A NeuroTechX × UC Berkeley event planned during SF Tech Week (details soon).',
  },
  {
    name: 'IEEE Brain Discovery & Neurotechnology Workshop', tag: 'Workshop', dateLabel: 'Nov 11–13, 2026', end: '2026-11-13',
    location: 'Washington, DC', url: 'https://brain.ieee.org/2026-ieee-brain-discovery-neurotechnology-workshop/',
    desc: 'The flagship neurotech satellite alongside Society for Neuroscience 2026.',
  },
  {
    name: 'Neuroscience 2026 (SfN)', tag: 'Conference', dateLabel: 'Nov 14–18, 2026', end: '2026-11-18',
    location: 'Washington, DC', url: 'https://www.sfn.org/meetings/neuroscience-2026/',
    desc: "Society for Neuroscience 56th annual meeting — the world's largest neuroscience gathering.",
  },
  {
    name: 'Heroes of the Brain 2026', tag: 'Hackathon', dateLabel: 'Nov 14–15, 2026', end: '2026-11-15',
    location: 'SKS, Wrocław University of Science and Technology', url: 'https://heroesofthebrain.pwr.edu.pl/',
    desc: 'Third edition of a 24-hour BCI hackathon: build a working prototype on real BCI hardware with live brain signals, with industry and academic mentors and prizes across 4 categories.',
  },
  {
    name: 'Brain Innovation Days 2026', tag: 'Conference', dateLabel: 'Nov 18–19, 2026', end: '2026-11-19',
    location: 'Area 42, Brussels, Belgium', url: 'https://www.braininnovationdays.eu/',
    desc: "The 6th edition of Europe's brain-innovation summit — startups, investors, researchers & clinicians across the brain ecosystem.",
  },
  {
    name: 'EEG/EMG Foundation Challenge 2026', tag: 'Competition', dateLabel: 'Final submissions Nov 21, 2026', end: '2026-11-21',
    location: 'Online · winners at NeurIPS, Sydney', url: 'https://neural-interfaces26.github.io/',
    desc: 'Neural-interface decoding competition run with the NeurIPS Brain and Body workshop — hosted by Yneuro, Inria & UC San Diego.',
  },
  // `end` carries the closing time for evening events, so they stay "Upcoming" until they are over.
  {
    name: 'Stimulating Conversations: Advances in Neuromodulation', tag: 'Meetup', dateLabel: 'Nov 25, 2026 · 7 PM ET', end: '2026-11-25T23:00:00-05:00',
    location: 'Peter Gilgan Centre for Research and Learning, Toronto', url: 'https://luma.com/lvklsd9o',
    desc: 'NeuroTechX Toronto evening of short talks, two panels and demos on brain stimulation and the Toronto companies bringing it to patients — speakers from Ampa, sync2brain, Roga and Vielight. Tickets CA$9.',
    fr: {
      dateLabel: '25 nov. 2026 · 19 h (HE)',
      location: 'Peter Gilgan Centre for Research and Learning, Toronto',
      desc: "Soirée de NeuroTechX Toronto : courtes conférences, deux panels et démonstrations sur la stimulation cérébrale et les entreprises torontoises qui l'amènent aux patients — avec Ampa, sync2brain, Roga et Vielight. Billets : 9\u00a0$\u00a0CA.",
    },
  },
  {
    name: 'Neurotech@Berkeley Symposium & Happy Hour', tag: 'Meetup', dateLabel: 'Dec 7, 2026 · 5–9 PM', end: '2026-12-07T21:00:00-08:00',
    location: 'Frontier Tower, San Francisco', url: 'https://luma.com/neurotechberkeley-showcase',
    desc: 'UC Berkeley undergraduate teams present their neurotech projects, live demos and published articles, followed by a mixer. Co-hosted by NeuroTechX — free with RSVP.',
    fr: {
      dateLabel: '7 déc. 2026 · 17 h à 21 h',
      location: 'Frontier Tower, San Francisco',
      desc: 'Des équipes étudiantes de premier cycle de UC Berkeley présentent leurs projets en neurotech, des démonstrations et des articles publiés, suivis d\'un cocktail réseautage. Coorganisé par NeuroTechX — gratuit, sur inscription.',
    },
  },
  {
    name: 'BrainsConnected — SF Launch Event', tag: 'Meetup', dateLabel: 'Dec 9, 2026 · 6–9 PM', end: '2026-12-09T21:00:00-08:00',
    location: 'Frontier Tower, San Francisco', url: 'https://luma.com/brains-connected-launch-event',
    desc: 'Launch of BrainsConnected, a new web hub for consumer neurotech, with talks from its leadership team including Neurotech Reports founder James Cavuoto. Co-hosted by NeuroTechX.',
    fr: {
      dateLabel: '9 déc. 2026 · 18 h à 21 h',
      location: 'Frontier Tower, San Francisco',
      desc: 'Lancement de BrainsConnected, une nouvelle plateforme web sur la neurotech grand public, avec des présentations de son équipe de direction, dont James Cavuoto, fondateur de Neurotech Reports. Coorganisé par NeuroTechX.',
    },
  },
  {
    name: 'NeurIPS 2026', tag: 'Conference', dateLabel: 'Dec 6–12, 2026', end: '2026-12-12',
    location: 'Sydney, Australia', url: 'https://neurips.cc/Conferences/2026/',
    desc: 'Flagship machine learning & computational neuroscience conference (satellites in Paris & Atlanta).',
    fr: {
      dateLabel: '6 au 12 déc. 2026',
      location: 'Sydney, Australie',
      desc: "Conférence phare en apprentissage automatique et en neurosciences computationnelles (antennes à Paris et à Atlanta).",
    },
  },
  {
    name: 'Foundation Models for the Brain and Body — NeurIPS 2026 Workshop', tag: 'Workshop', dateLabel: 'Dec 12, 2026', end: '2026-12-12',
    location: 'Sydney, Australia', url: 'https://brainbodyfm-workshop.github.io/',
    desc: 'Second edition of the NeurIPS workshop on foundation models for neural & biosignal data; hosts the EEG/EMG Foundation Challenge winners.',
    fr: {
      dateLabel: '12 déc. 2026',
      location: 'Sydney, Australie',
      desc: "Deuxième édition de l'atelier NeurIPS sur les modèles de fondation pour les données neuronales et les biosignaux; on y remet les prix du EEG/EMG Foundation Challenge.",
    },
  },
  {
    name: 'MAIN 2026 — Montreal AI & Neuroscience', tag: 'Conference', dateLabel: 'Dec 2026 · dates TBA', end: '2026-12-31',
    location: 'Montreal, QC', url: 'https://www.main2025.org/',
    desc: 'Annual Montreal conference at the intersection of AI and neuroscience.',
    fr: {
      dateLabel: 'Déc. 2026 · dates à confirmer',
      location: 'Montréal (Québec)',
      desc: "Conférence annuelle montréalaise à la croisée de l'intelligence artificielle et des neurosciences.",
    },
  },
  // ── 2027 ──
  {
    name: 'FUN27 — Focused Ultrasound Neuromodulation Conference', tag: 'Conference', dateLabel: 'May 25–28, 2027 · abstracts due Jan 15', end: '2027-05-28',
    location: 'Washington University in St. Louis', url: 'https://itrusst.org/fun27',
    desc: 'ITRUSST\'s annual meeting on transcranial ultrasound stimulation. Regular abstracts are due January 15, 2027 (decisions February 19); late-breaking abstracts March 15.',
    fr: {
      dateLabel: '25 au 28 mai 2027',
      location: 'Washington University in St. Louis',
      desc: "Rencontre annuelle d'ITRUSST sur la stimulation transcrânienne par ultrasons. Résumés réguliers attendus le 15 janvier 2027 (décisions le 19 février); résumés de dernière heure, le 15 mars.",
    },
  },
  {
    name: '12th International BCI Meeting', tag: 'Conference', dateLabel: 'Jun 7–10, 2027 · abstracts due Jan 15', end: '2027-06-10',
    location: 'Šibenik, Croatia', url: 'https://bcisociety.org/bci-meeting/',
    desc: "The BCI Society's meeting. Abstracts for oral and poster presentations are due January 15, 2027.",
    fr: {
      dateLabel: '7 au 10 juin 2027 · résumés avant le 15 janv.',
      location: 'Šibenik, Croatie',
      desc: 'La rencontre de la BCI Society. Les résumés pour les présentations orales et par affiches sont attendus le 15 janvier 2027.',
    },
  },
];

export function sortedEvents(now: Date = new Date()): (NtxEvent & { past: boolean })[] {
  return EVENTS
    .map((e) => ({ ...e, past: new Date(e.end) < now }))
    .sort((a, b) => {
      if (a.past !== b.past) return a.past ? 1 : -1; // upcoming first
      return a.past
        ? new Date(b.end).getTime() - new Date(a.end).getTime() // past: most recent first
        : new Date(a.end).getTime() - new Date(b.end).getTime(); // upcoming: soonest first
    });
}
