// NeuroTechX local chapters.
// Status drives the badge; `featured` promotes a chapter to a large card.

export type ChapterStatus = 'active' | 'restarting' | 'soon' | 'inactive' | 'new';

export type Chapter = {
  name: string;        // display name
  city: string;        // city / region label
  status: ChapterStatus;
  note?: string;       // one-line context
  url: string;         // primary link (X account, site, or join form)
  linkLabel?: string;  // label for the primary link
  featured?: boolean;
  fr?: { note?: string; linkLabel?: string }; // French text, where it differs
};

// University / student clubs — shown with a distinct (violet) dot in their own
// section. `school` is the institution; `url` is optional
// (omit when we don't have a verified current link).
export type StudentClub = {
  name: string;
  school: string;
  country?: string;
  url?: string;
};

const JOIN = 'https://docs.google.com/forms/d/e/1FAIpQLSfZyzhVdOLU8_oQ4NylHL8EFoKLIVmryGXA4u7HDsZpkTryvg/viewform';

export const CHAPTERS: Chapter[] = [
  // ── Featured / largest & most active ──
  {
    name: 'NeuroTechSF', city: 'San Francisco', status: 'active', featured: true,
    note: 'One of our largest and most active chapters, anchoring the Bay Area neurotech scene.',
    url: 'https://x.com/neurotechsf', linkLabel: '@neurotechsf',
    fr: { note: "L'une de nos sections les plus grandes et les plus actives, pilier de la neurotech dans la région de la baie de San Francisco." },
  },
  {
    name: 'NeuroNYC', city: 'New York', status: 'active', featured: true,
    note: 'The New York City community — talks, socials, and hack nights.',
    url: 'https://x.com/NeuroTechNYC', linkLabel: '@NeuroTechNYC',
    fr: { note: 'La communauté de New York — conférences, rencontres et soirées de hacking.' },
  },
  {
    name: 'NeuroTechX London', city: 'London · UK', status: 'active', featured: true,
    note: 'An active London chapter that also serves the wider UK community.',
    url: 'https://x.com/NeuroTechLDN', linkLabel: '@NeuroTechLDN',
    fr: { note: 'Une section londonienne active qui rayonne dans tout le Royaume-Uni.' },
  },
  {
    name: 'Coglab', city: 'Paris', status: 'active', featured: true,
    note: 'NeuroTechX Paris — the Coglab community for cognitive science & neurotech.',
    url: 'https://coglab.fr/', linkLabel: 'coglab.fr',
    fr: { note: 'NeuroTechX Paris — la communauté Coglab en sciences cognitives et en neurotech.' },
  },
  {
    name: 'NeuroTechX Toronto', city: 'Toronto', status: 'restarting', featured: true,
    note: 'Relaunching — get in touch to help reboot the Toronto chapter.',
    url: 'https://x.com/neurotechto', linkLabel: '@neurotechto',
    fr: { note: 'En relance — écrivez-nous pour aider à redémarrer la section de Toronto.' },
  },
  {
    name: 'NeuroTechMTL', city: 'Montreal', status: 'restarting', featured: true,
    note: 'Where NeuroTechX began — the Montreal chapter is restarting.',
    url: 'https://x.com/NeuroTechMTL', linkLabel: '@NeuroTechMTL',
    fr: { note: 'Là où NeuroTechX est née — la section de Montréal redémarre.' },
  },
  {
    name: 'NeuroTechX Houston', city: 'Houston', status: 'active', featured: true,
    note: 'A growing Texas hub with a couple of active local groups.',
    url: JOIN, linkLabel: 'Get involved',
    fr: { note: 'Un pôle texan en croissance, avec quelques groupes locaux actifs.', linkLabel: 'Participer' },
  },
  {
    name: 'NeuroTechX Salt Lake City', city: 'Salt Lake City', status: 'active', featured: true,
    note: 'The Utah community for neurotech and neuroengineering.',
    url: JOIN, linkLabel: 'Get involved',
    fr: { note: "La communauté de l'Utah en neurotech et en neuro-ingénierie.", linkLabel: 'Participer' },
  },
  {
    name: 'NeuroTechX Berlin', city: 'Berlin', status: 'active', featured: true,
    note: 'The Berlin community — part of the NeuroTechX Europe network.',
    url: 'https://x.com/NeuroTechX_EU', linkLabel: '@NeuroTechX_EU',
    fr: { note: 'La communauté berlinoise — membre du réseau NeuroTechX Europe.' },
  },

  // ── Other chapters ──
  { name: 'Barcelona', city: 'Barcelona', status: 'active', url: JOIN },
  { name: 'Boston', city: 'Boston', status: 'active', url: 'https://x.com/neurotechbos' },
  { name: 'Los Angeles', city: 'Los Angeles', status: 'active', url: 'https://x.com/neurotechla' },
  { name: 'Oslo', city: 'Oslo', status: 'active', url: 'https://x.com/neurotechoslo' },
  { name: 'Washington DC', city: 'Washington DC', status: 'active', url: 'https://x.com/neurotechdc' },
  { name: 'Tel Aviv', city: 'Tel Aviv', status: 'active', url: 'https://x.com/neurotechtlv' },
  { name: 'Vancouver', city: 'Vancouver', status: 'active', url: 'https://x.com/neurotechvan' },
  { name: 'Waterloo', city: 'Waterloo', status: 'active', url: 'https://x.com/neurotechkw' },
  { name: 'Lima', city: 'Lima', status: 'inactive', url: 'https://x.com/NeuroTechLIMA' },
  { name: 'Ottawa', city: 'Ottawa', status: 'active', url: 'https://x.com/neurotechott' },
  { name: 'Hamilton', city: 'Hamilton', status: 'active', url: 'https://x.com/NeuroTechHa' },

  // ── Latin America ──
  { name: 'La Paz', city: 'La Paz, Bolivia', status: 'active', url: 'https://www.instagram.com/neurotechxbolivia/' },
  { name: 'São Paulo', city: 'São Paulo, Brazil', status: 'active', url: 'https://www.instagram.com/ntxbrazil/' },
  { name: 'Buenos Aires', city: 'Buenos Aires, Argentina', status: 'active', url: 'https://x.com/neurotechba' },

  // ── Africa ──
  { name: 'Lagos', city: 'Lagos, Nigeria', status: 'soon', url: JOIN },

  // ── Asia ──
  { name: 'Hong Kong', city: 'Hong Kong', status: 'active', url: JOIN },
  { name: 'Tokyo', city: 'Tokyo, Japan', status: 'active', url: JOIN },
  { name: 'Shanghai', city: 'Shanghai, China', status: 'soon', url: JOIN },

  // ── NeuroTechX India ──
  { name: 'NeuroTechX India · Bangalore', city: 'Bangalore, India', status: 'active', url: JOIN },
  { name: 'NeuroTechX India · Kolkata', city: 'Kolkata, India', status: 'active', url: JOIN },
  { name: 'NeuroTechX India · Mumbai', city: 'Mumbai, India', status: 'active', url: JOIN },
  { name: 'NeuroTechX India · Chennai', city: 'Chennai, India', status: 'inactive', url: JOIN },

  // ── Australia (historical) ──
  { name: 'NeuroTechX Sydney', city: 'Sydney, Australia', status: 'inactive', url: JOIN },
  { name: 'NeuroTechX Melbourne', city: 'Melbourne, Australia', status: 'inactive', url: JOIN },
];

// Student clubs that organized / competed in Global NeuroHack 2026.
// (Sourced from GNH 2026 coverage, not the deprecated student-clubs directory —
//  add/prune as the roster is confirmed; some links pending.)
export const STUDENT_CLUBS: StudentClub[] = [
  { name: 'NeuroTechSC', school: 'UC Santa Cruz', country: 'USA', url: 'https://neurotech.ucsc.edu/' },
  { name: 'Neurotech@Berkeley', school: 'UC Berkeley', country: 'USA', url: 'https://neurotech.berkeley.edu/' },
  { name: 'Neurotech@Davis', school: 'UC Davis', country: 'USA' },
  { name: 'McGill NeuroTech', school: 'McGill University', country: 'Canada', url: 'https://www.facebook.com/McGillNeurotech' },
  { name: 'JHU BCI Society', school: 'Johns Hopkins University', country: 'USA', url: 'https://jhu.campusgroups.com/jhubcis/home/' },
  { name: 'Penn Neurotech', school: 'University of Pennsylvania', country: 'USA' },
  { name: 'Neurotech X Columbia', school: 'Columbia University', country: 'USA', url: 'https://neurotech-x-columbia.github.io/' },
  { name: 'Longhorn Neurotech', school: 'UT Austin', country: 'USA' },
  { name: 'Imperial College Neurotech', school: 'Imperial College London', country: 'UK' },
  { name: 'Neurotech UCB', school: 'Universidad Católica Boliviana', country: 'Bolivia', url: 'https://ntxucb.github.io/' },
];

export const FEATURED_CHAPTERS = CHAPTERS.filter((c) => c.featured);
export const OTHER_CHAPTERS = CHAPTERS.filter((c) => !c.featured);

// City and country names in French where they differ ('London · UK' → 'Londres · R.-U.').
const FR_PLACES: [string, string][] = [
  ['London · UK', 'Londres · R.-U.'],
  ['Montreal', 'Montréal'],
  ['Washington DC', 'Washington (D.C.)'],
  ['Barcelona', 'Barcelone'],
  ['Tokyo, Japan', 'Tokyo, Japon'],
  ['Shanghai, China', 'Shanghai, Chine'],
  [', Bolivia', ', Bolivie'],
  [', Brazil', ', Brésil'],
  [', Argentina', ', Argentine'],
  [', Nigeria', ', Nigéria'],
  [', India', ', Inde'],
  [', Australia', ', Australie'],
];

export function cityIn(city: string, lang: 'en' | 'fr'): string {
  if (lang === 'en') return city;
  return FR_PLACES.reduce((name, [en, fr]) => name.replace(en, fr), city);
}

// Dot / badge colors per status (shared by the legend, chips and cards).
export const STATUS_COLOR: Record<ChapterStatus, string> = {
  active: 'var(--neuro-accent)',
  restarting: '#fbbf24',
  soon: '#4ade80',
  inactive: '#6b7280',
  new: '#4ade80',
};
