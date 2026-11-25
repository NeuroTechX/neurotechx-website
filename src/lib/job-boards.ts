// Reads neurotech employers' public job boards and turns them into one common shape.
// Self-contained on purpose (no imports, erasable TypeScript only): the site loads it
// through src/lib/jobs.ts and scripts/check-job-boards.mjs loads it with plain Node.

export type Ats =
  | 'greenhouse'
  | 'ashby'
  | 'lever'
  | 'rippling'
  | 'adp'
  | 'bamboohr'
  | 'personio'
  | 'recruitee'
  | 'jazzhr';

export const ATS_NAMES: Ats[] = [
  'greenhouse', 'ashby', 'lever', 'rippling', 'adp', 'bamboohr', 'personio', 'recruitee', 'jazzhr',
];

// One entry of src/data/job-sources.json. Without `ats` the company is only linked.
export type JobSource = {
  company: string;
  site: string;
  careers: string;
  about?: string;
  fields?: string[]; // topic slugs every role at this company belongs to
  region?: string; // used when a role's location names no region
  ats?: Ats;
  token?: string; // the board's name at that hiring system
  ccId?: string; // ADP only
  departments?: string[]; // shared boards: keep only these departments
  note?: string;
};

export type RawJob = {
  id: string;
  title: string;
  location: string;
  url: string;
  department?: string;
  postedAt?: string;
  remote?: boolean;
  employment?: string;
};

export type Job = {
  id: string;
  company: string;
  title: string;
  location: string;
  url: string;
  department?: string;
  postedAt?: string;
  isNew?: boolean;
  topics: string[];
  role: string;
  regions: string[];
  remote: boolean;
  internship: boolean;
  posted?: boolean; // posted by NeuroTechX on the employer's behalf; links to /jobs/posted/<id>
};

export const TOPICS: Record<string, string> = {
  bci: 'Brain–computer interfaces',
  eeg: 'EEG',
  neuromodulation: 'Neuromodulation',
  neuroimaging: 'Neuroimaging',
  'computational-neuroscience': 'Computational neuroscience & ML',
};

export const ROLES: Record<string, string> = {
  software: 'Software, data & ML',
  hardware: 'Hardware & engineering',
  research: 'Research & science',
  clinical: 'Clinical, regulatory & quality',
  business: 'Operations & business',
};

export const REGIONS: Record<string, string> = {
  'north-america': 'North America',
  europe: 'Europe',
  'asia-pacific': 'Asia-Pacific',
};

export type Category = {
  slug: string;
  kind: 'topic' | 'role' | 'region' | 'internship' | 'remote';
  label: string;
  title: string;
  intro: string;
};

// The landing pages under /jobs/<slug>.
export const CATEGORIES: Category[] = [
  {
    slug: 'bci',
    kind: 'topic',
    label: 'BCI',
    title: 'Brain–Computer Interface Jobs',
    intro: 'Open roles at companies building brain–computer interfaces, implanted and non-invasive.',
  },
  {
    slug: 'eeg',
    kind: 'topic',
    label: 'EEG',
    title: 'EEG Jobs',
    intro: 'Open roles at companies working with EEG, from clinical monitoring to consumer headsets.',
  },
  {
    slug: 'neuromodulation',
    kind: 'topic',
    label: 'Neuromodulation',
    title: 'Neuromodulation Jobs',
    intro: 'Open roles in neurostimulation and neuromodulation: implanted, magnetic, electrical and ultrasound.',
  },
  {
    slug: 'neuroimaging',
    kind: 'topic',
    label: 'Neuroimaging',
    title: 'Neuroimaging Jobs',
    intro: 'Open roles in brain imaging and brain mapping.',
  },
  {
    slug: 'computational-neuroscience',
    kind: 'topic',
    label: 'Computational & ML',
    title: 'Computational Neuroscience & Machine Learning Jobs',
    intro: 'Open roles in computational neuroscience, neural data and machine learning at neurotech companies.',
  },
  {
    slug: 'software',
    kind: 'role',
    label: 'Software',
    title: 'Neurotech Software Jobs',
    intro: 'Software, firmware, data and machine-learning roles at neurotech companies.',
  },
  {
    slug: 'hardware',
    kind: 'role',
    label: 'Hardware',
    title: 'Neurotech Hardware & Engineering Jobs',
    intro: 'Electrical, mechanical, manufacturing and systems engineering roles at neurotech companies.',
  },
  {
    slug: 'research',
    kind: 'role',
    label: 'Research',
    title: 'Neurotech Research Jobs',
    intro: 'Scientist and research roles at neurotech companies.',
  },
  {
    slug: 'clinical',
    kind: 'role',
    label: 'Clinical',
    title: 'Clinical, Regulatory & Quality Jobs in Neurotech',
    intro: 'Clinical, regulatory and quality roles at neurotech companies.',
  },
  {
    slug: 'internships',
    kind: 'internship',
    label: 'Internships',
    title: 'Neurotech Internships',
    intro: 'Internships, co-ops and student roles at neurotech companies.',
  },
  {
    slug: 'remote',
    kind: 'remote',
    label: 'Remote',
    title: 'Remote Neurotech Jobs',
    intro: 'Roles at neurotech companies that the employer lists as remote.',
  },
  {
    slug: 'north-america',
    kind: 'region',
    label: 'North America',
    title: 'Neurotech Jobs in North America',
    intro: 'Open roles at neurotech companies in the United States and Canada.',
  },
  {
    slug: 'europe',
    kind: 'region',
    label: 'Europe',
    title: 'Neurotech Jobs in Europe',
    intro: 'Open roles at neurotech companies in Europe.',
  },
];

export function inCategory(job: Job, c: Category): boolean {
  if (c.kind === 'topic') return job.topics.includes(c.slug);
  if (c.kind === 'role') return job.role === c.slug;
  if (c.kind === 'region') return job.regions.includes(c.slug);
  if (c.kind === 'internship') return job.internship;
  return job.remote;
}

// ── Tagging ──────────────────────────────────────────────────────────────────

const TOPIC_WORDS: [string, RegExp][] = [
  ['bci', /brain[\s–-]+(computer|machine)|\bbci\b|neural interface|neural decod/i],
  ['eeg', /\beeg\b|electroenceph|polysomn/i],
  ['neuromodulation', /neuromodulat|neurostim|stimulation|\btms\b|\bdbs\b/i],
  ['neuroimaging', /imaging|\bf?mri\b|fnirs|microscop|connectom/i],
  [
    'computational-neuroscience',
    /computational|machine learning|\bml\b|\bai\b|data scien|neural (data|decod|signal)|signal processing|algorithm|neuroscien/i,
  ],
];

// First match wins. The title is tried before the department.
const ROLE_WORDS: [string, RegExp][] = [
  [
    'business',
    /\bsales\b|account (manager|executive)|territory|therapy consultant|business development|marketing|recruit|talent|accountant|accounting|financ|controller|payroll|counsel|paralegal|human resources|\bhr\b|people (ops|operations|partner)|office manager|executive assistant|customer (success|support|service)|supply chain|buyer|procurement/i,
  ],
  [
    'software',
    /software|firmware|embedded|machine learning|\bml\b|\bmle\b|ml ?ops|mobile app|android|\bios\b|\bai\b|data (scien|engineer|analy)|full[\s-]?stack|back[\s-]?end|front[\s-]?end|devops|\bsre\b|algorithm|computational|bioinformatic|cyber|security engineer|developer|\bweb\b|\bcloud\b|\bit\b/i,
  ],
  [
    'clinical',
    /clinical|regulatory|quality|medical affairs|medical science|patient|nurse|physician|surgeon|reimbursement|market access|therapy|compliance/i,
  ],
  ['research', /scientist|research|study director|thesis|studentenjob|neuroscien|postdoc|biolog|histolog|patholog|physiolog|chemist|\blab\b|laboratory/i],
  [
    'hardware',
    /engineer|electrical|mechanical|hardware|asic|analog|microfab|mems|manufactur|optical|robotic|packaging|materials|technician|mechatronic|machinist|assembler|designer, (ic|chip)/i,
  ],
];

const US_STATES =
  'AL|AK|AZ|AR|CA|CO|CT|FL|GA|HI|ID|IL|IN|IA|KS|KY|LA|ME|MD|MA|MI|MN|MS|MO|MT|NE|NV|NH|NJ|NM|NY|NC|ND|OH|OK|OR|PA|RI|SC|SD|TN|TX|UT|VT|VA|WA|WV|WI|WY|DC|ON|QC|BC|AB';

const US_STATE_NAMES =
  'alabama|alaska|arizona|arkansas|colorado|connecticut|delaware|florida|georgia|hawaii|idaho|illinois|indiana|iowa|kansas|kentucky|louisiana|maine|maryland|michigan|minnesota|mississippi|missouri|montana|nebraska|nevada|new hampshire|new jersey|new mexico|north carolina|north dakota|ohio|oklahoma|oregon|pennsylvania|rhode island|south carolina|south dakota|tennessee|utah|vermont|virginia|washington|wisconsin|wyoming|ontario|quebec|british columbia|alberta';

const REGION_WORDS: [string, RegExp][] = [
  [
    'north-america',
    new RegExp(
      `\\b(united states|usa|u\\.s\\.|us|canada|north america|california|texas|new york|massachusetts|san francisco|bay area|fremont|austin|boston|seattle|san diego|los angeles|toronto|montr[eé]al|vancouver|${US_STATE_NAMES})\\b|,\\s?(${US_STATES})\\b`,
      'i'
    ),
  ],
  [
    'europe',
    /\b(europe|emea|germany|deutschland|berlin|munich|münchen|freiburg|united kingdom|uk|england|scotland|london|oxford|france|paris|spain|españa|barcelona|madrid|netherlands|amsterdam|eindhoven|switzerland|zurich|zürich|geneva|lausanne|austria|vienna|graz|belgium|leuven|sweden|stockholm|denmark|copenhagen|norway|finland|ireland|dublin|italy|portugal|lisbon|poland)\b/i,
  ],
  [
    'asia-pacific',
    /\b(asia|apac|australia|nsw|new south wales|victoria|queensland|sydney|melbourne|brisbane|new zealand|singapore|japan|tokyo|china|shanghai|shenzhen|hong kong|taiwan|korea|seoul|india|bangalore|bengaluru)\b/i,
  ],
];

// Places outside the three regions: named so the company's home region is not assumed.
const ELSEWHERE = /\b(israel|tel aviv|jerusalem|brazil|argentina|mexico|chile|colombia|south africa|uae|dubai|saudi|turkey)\b/i;

const INTERN = /\bintern(ship)?s?\b|\bco-?op\b|\bthesis\b|studentenjob|werkstudent|working student|\bstudent\b/i;

function clean(text: unknown): string {
  return String(text ?? '')
    .replace(/<[^>]+>/g, ' ')
    .replace(/&amp;/g, '&')
    .replace(/&lt;/g, '<')
    .replace(/&gt;/g, '>')
    .replace(/&quot;/g, '"')
    .replace(/&#0?39;|&apos;|&rsquo;/g, "'")
    .replace(/&nbsp;/g, ' ')
    .replace(/\s+/g, ' ')
    .trim();
}

function isoDate(value: unknown): string | undefined {
  if (value === undefined || value === null || value === '') return undefined;
  const d = new Date(typeof value === 'string' ? value.replace(' UTC', 'Z').replace(' ', 'T') : (value as number));
  return Number.isNaN(d.getTime()) ? undefined : d.toISOString();
}

export function normalize(source: JobSource, raw: RawJob): Job | null {
  const title = clean(raw.title);
  const url = String(raw.url ?? '');
  if (!title || !/^https:\/\//.test(url)) return null;
  const location = clean(raw.location);
  const department = clean(raw.department) || undefined;
  const text = `${title} ${department ?? ''}`;

  const topics = new Set(source.fields ?? []);
  for (const [slug, words] of TOPIC_WORDS) if (words.test(text)) topics.add(slug);

  const roleOf = (words: string) => ROLE_WORDS.find(([, re]) => re.test(words))?.[0];
  const role = roleOf(title) ?? roleOf(department ?? '') ?? 'business';

  let regions = REGION_WORDS.filter(([, words]) => words.test(location)).map(([slug]) => slug);
  if (!regions.length && source.region && !ELSEWHERE.test(location)) regions = [source.region];

  return {
    id: `${source.ats}:${source.token}:${raw.id}`,
    company: source.company,
    title,
    location,
    url,
    department,
    postedAt: isoDate(raw.postedAt),
    topics: Object.keys(TOPICS).filter((slug) => topics.has(slug)),
    role,
    regions,
    remote: Boolean(raw.remote) || /\bremote\b/i.test(`${location} ${title}`),
    internship: INTERN.test(text) || /intern/i.test(raw.employment ?? ''),
  };
}

// ── Reading each hiring system's public board ────────────────────────────────

const HEADERS = {
  'User-Agent': 'Mozilla/5.0 (compatible; NeuroTechX-jobs/1.0; +https://neurotechx.org/jobs)',
  Accept: 'application/json, text/html;q=0.9, */*;q=0.8',
};

// The boards' JSON is third-party and untyped.
type Get = (url: string) => Promise<any>;

function getter(init: RequestInit | undefined, as: 'json' | 'text'): Get {
  return async (url) => {
    const res = await fetch(url, { ...init, headers: HEADERS, signal: AbortSignal.timeout(15000) });
    if (!res.ok) throw new Error(`${res.status} from ${new URL(url).host}`);
    return as === 'json' ? res.json() : res.text();
  };
}

const READERS: Record<Ats, (s: JobSource, json: Get, text: Get) => Promise<RawJob[]>> = {
  async greenhouse(s, json) {
    const base = `https://boards-api.greenhouse.io/v1/boards/${encodeURIComponent(s.token!)}`;
    const [list, depts] = await Promise.all([json(`${base}/jobs`), json(`${base}/departments`).catch(() => null)]);
    const deptOf = new Map<number, string>();
    for (const d of depts?.departments ?? [])
      for (const j of d.jobs ?? []) if (d.name && d.name !== 'No Department') deptOf.set(j.id, d.name);
    return (list.jobs ?? []).map((j: any) => ({
      id: String(j.id),
      title: j.title,
      location: j.location?.name,
      url: j.absolute_url,
      department: deptOf.get(j.id),
      postedAt: j.first_published ?? j.updated_at,
    }));
  },

  async ashby(s, json) {
    const board = await json(`https://api.ashbyhq.com/posting-api/job-board/${encodeURIComponent(s.token!)}`);
    return (board.jobs ?? [])
      .filter((j: any) => j.isListed !== false)
      .map((j: any) => ({
        id: j.id,
        title: j.title,
        location: j.location,
        url: j.jobUrl,
        department: j.department ?? j.team,
        postedAt: j.publishedAt,
        remote: j.isRemote === true,
        employment: j.employmentType,
      }));
  },

  async lever(s, json) {
    const list = await json(`https://api.lever.co/v0/postings/${encodeURIComponent(s.token!)}?mode=json`);
    return (list ?? []).map((j: any) => ({
      id: j.id,
      title: j.text,
      location: j.categories?.location,
      url: j.hostedUrl,
      department: j.categories?.department ?? j.categories?.team,
      postedAt: j.createdAt,
      remote: j.workplaceType === 'remote',
      employment: j.categories?.commitment,
    }));
  },

  async rippling(s, json) {
    const list = await json(`https://api.rippling.com/platform/api/ats/v1/board/${encodeURIComponent(s.token!)}/jobs`);
    return (list ?? []).map((j: any) => ({
      id: j.uuid,
      title: j.name,
      location: j.workLocation?.label,
      url: j.url,
      department: j.department?.label,
    }));
  },

  async adp(s, json) {
    const query = `cid=${encodeURIComponent(s.token!)}&ccId=${encodeURIComponent(s.ccId ?? '')}&lang=en_US`;
    const data = await json(
      `https://workforcenow.adp.com/mascsr/default/careercenter/public/events/staffing/v1/job-requisitions?${query}&$top=100`
    );
    return (data.jobRequisitions ?? []).map((j: any) => ({
      id: j.itemID,
      title: j.requisitionTitle,
      location: (j.requisitionLocations ?? []).map((l: any) => l.nameCode?.shortName).filter(Boolean).join(' / '),
      url: `https://workforcenow.adp.com/mascsr/default/mdf/recruitment/recruitment.html?${query}&jobId=${j.itemID}`,
      postedAt: j.postDate,
    }));
  },

  async bamboohr(s, json) {
    const host = `https://${s.token}.bamboohr.com/careers`;
    const data = await json(`${host}/list`);
    return (data.result ?? []).map((j: any) => ({
      id: String(j.id),
      title: j.jobOpeningName,
      location: [
        j.atsLocation?.city ?? j.location?.city,
        j.atsLocation?.state ?? j.location?.state,
        j.atsLocation?.country,
      ]
        .filter(Boolean)
        .join(', '),
      url: `${host}/${j.id}`,
      department: j.departmentLabel,
      remote: j.isRemote === true || j.locationType === '1',
      employment: j.employmentStatusLabel,
    }));
  },

  async personio(s, _json, text) {
    const host = `https://${s.token}.jobs.personio.com`;
    const xml: string = await text(`${host}/xml`);
    const field = (block: string, name: string) => block.match(new RegExp(`<${name}>([\\s\\S]*?)</${name}>`))?.[1];
    return [...xml.matchAll(/<position>([\s\S]*?)<\/position>/g)].map(([, block]) => {
      const head = block.replace(/<jobDescriptions>[\s\S]*?<\/jobDescriptions>/, '');
      const id = field(head, 'id') ?? '';
      return {
        id,
        title: field(head, 'name') ?? '',
        location: field(head, 'office') ?? '',
        url: `${host}/job/${id}`,
        department: field(head, 'department'),
        postedAt: field(head, 'createdAt'),
        employment: field(head, 'employmentType'),
      };
    });
  },

  async recruitee(s, json) {
    const data = await json(`https://${s.token}.recruitee.com/api/offers/`);
    return (data.offers ?? [])
      .filter((j: any) => !j.status || j.status === 'published')
      .map((j: any) => ({
        id: String(j.id),
        title: j.title,
        location: j.location,
        url: j.careers_url,
        department: j.department,
        postedAt: j.published_at,
        remote: j.remote === true,
      }));
  },

  // JazzHR has no public feed: the job list is read from the board's own page.
  async jazzhr(s, _json, text) {
    const host = `https://${s.token}.applytojob.com/apply`;
    const html: string = await text(host);
    const jobs: RawJob[] = [];
    const link = new RegExp(`<a href="(${host}/([A-Za-z0-9]+)/[^"]*)"[^>]*>([\\s\\S]*?)</a>([\\s\\S]{0,400})`, 'g');
    for (const [, url, id, title, after] of html.matchAll(link)) {
      const place = after.match(/fa-map-marker[^>]*><\/i>([^<]*)/)?.[1] ?? '';
      if (!jobs.some((j) => j.id === id)) jobs.push({ id, title, location: place, url });
    }
    if (!jobs.length && !/list-group|no (current )?(open|job)/i.test(html)) throw new Error('JazzHR page not recognised');
    return jobs;
  },
};

// Every open role on one company's board. Throws when the board cannot be read.
export async function fetchBoard(source: JobSource, init?: RequestInit): Promise<Job[]> {
  if (!source.ats || !source.token || !READERS[source.ats]) throw new Error(`no readable board for ${source.company}`);
  const raw = await READERS[source.ats](source, getter(init, 'json'), getter(init, 'text'));
  const keep = source.departments;
  return raw
    .filter((j) => !keep || keep.includes(clean(j.department)))
    .map((j) => normalize(source, j))
    .filter((j): j is Job => j !== null);
}

// ── Recognising a hiring system from a careers page ──────────────────────────

export type Detected = { ats: string; token?: string; ccId?: string; readable: boolean };

const SIGNATURES: [string, RegExp][] = [
  ['greenhouse', /(?:boards|job-boards)(?:\.eu)?\.greenhouse\.io\/(?:embed\/job_board(?:\/js)?\?for=)?([a-z0-9_-]+)/i],
  ['lever', /jobs(?:\.eu)?\.lever\.co\/([a-z0-9_-]+)/i],
  ['ashby', /jobs\.ashbyhq\.com\/([^"'/?#\s<>\\]+)/i],
  ['rippling', /ats\.rippling\.com\/(?:[a-z]{2}-[A-Z]{2}\/)?([a-z0-9_-]+)|data-job-board-id="([a-z0-9_-]+)"/i],
  ['adp', /workforcenow\.adp\.com[^"'\s]*?cid=([0-9a-f-]{36})[^"'\s]*?ccId=([0-9_]+)/i],
  ['bamboohr', /\/\/([a-z0-9-]+)\.bamboohr\.com/i],
  ['personio', /\/\/([a-z0-9-]+)\.jobs\.personio\.(?:com|de)/i],
  ['recruitee', /\/\/([a-z0-9-]+)\.recruitee\.com/i],
  ['jazzhr', /\/\/([a-z0-9-]+)\.applytojob\.com/i],
  // Recognised, but not read automatically.
  ['workable', /apply\.workable\.com\/([a-z0-9-]+)/i],
  ['workday', /\/\/([a-z0-9-]+\.wd\d+\.myworkdayjobs\.com\/[^"'\s?#<>]*)/i],
  ['teamtailor', /\/\/([a-z0-9-]+)\.teamtailor\.com/i],
  ['smartrecruiters', /(?:jobs|careers)\.smartrecruiters\.com\/([a-z0-9-]+)/i],
  ['breezy', /\/\/([a-z0-9-]+)\.breezy\.hr/i],
  ['icims', /\/\/([a-z0-9-]+)\.icims\.com/i],
  ['jobvite', /jobs\.jobvite\.com\/([a-z0-9-]+)/i],
  ['gem', /jobs\.gem\.com\/([a-z0-9-]+)/i],
  ['pinpoint', /\/\/([a-z0-9-]+)\.pinpointhq\.com/i],
];

const SKIP_TOKENS = new Set(['www', 'api', 'app', 'embed', 'js', 'support', 'help', 'cdn', 'assets-cdn']);

// Hiring systems referenced by a careers page (or by a board address itself).
export function detectBoards(html: string): Detected[] {
  const found: Detected[] = [];
  for (const [ats, signature] of SIGNATURES) {
    const m = html.replace(/\\\//g, '/').match(signature);
    if (!m) continue;
    const token = decodeURIComponent(m[1] ?? m[2] ?? '');
    if (!token || SKIP_TOKENS.has(token.toLowerCase())) continue;
    found.push({
      ats,
      token,
      ccId: ats === 'adp' ? m[2] : undefined,
      readable: (ATS_NAMES as string[]).includes(ats),
    });
  }
  return found;
}
