import sources from '@/data/job-sources.json';
import posted from '@/data/posted-jobs.json';
import { fetchBoard, type Job, type JobSource } from './job-boards';

// How long a board's answer is reused before it is read again (seconds).
const BOARD_TTL = 4 * 60 * 60;
const NEW_DAYS = 14;

export type Employer = JobSource & { openRoles: number };

export type JobsData = {
  jobs: Job[];
  employers: Employer[]; // companies whose board we read, with their open-role count
  linked: JobSource[]; // companies we only link to
  checkedAt: string;
};

// A role an employer asked us to list because it has no careers board we can read
// (src/data/posted-jobs.json). Shown only once the employer has agreed, and until it expires.
export type PostedJob = {
  id: string;
  approved: boolean;
  company: string;
  site?: string;
  title: string;
  employment?: string;
  location: string;
  remote: boolean;
  regions: string[];
  topics: string[];
  role: string;
  postedAt: string;
  expires: string;
  summary: string;
  requirements?: string[];
  apply: string;
  source?: string;
};

export function livePosted(now = Date.now()): PostedJob[] {
  const today = new Date(now).toISOString().slice(0, 10);
  return (posted as PostedJob[]).filter((p) => p.approved && p.expires >= today);
}

function postedJob(p: PostedJob): Job {
  return {
    id: `posted:${p.id}`,
    company: p.company,
    title: p.title,
    location: p.location,
    url: `/jobs/posted/${p.id}`,
    postedAt: p.postedAt,
    topics: p.topics,
    role: p.role,
    regions: p.regions,
    remote: p.remote,
    internship: /\bintern/i.test(p.title),
    posted: true,
  };
}

async function board(source: JobSource): Promise<Job[] | null> {
  for (let attempt = 1; ; attempt++) {
    try {
      return await fetchBoard(source, { next: { revalidate: BOARD_TTL } });
    } catch (error) {
      if (attempt === 2) {
        console.error(`[jobs] ${source.company}: ${error instanceof Error ? error.message : error}`);
        return null;
      }
    }
  }
}

// Every open role at every listed company. One board failing only hides that company;
// if none answers this throws, so the last good page stays up instead of an empty one.
async function readAll(): Promise<JobsData> {
  const all = sources as JobSource[];
  const listed = all.filter((s) => s.ats);
  const boards = await Promise.all(listed.map(board));
  if (boards.every((b) => b === null)) throw new Error('[jobs] no job board could be read');

  const now = Date.now();
  const jobs = boards
    .flatMap((b) => b ?? [])
    .concat(livePosted(now).map(postedJob))
    .map((job) => ({
      ...job,
      isNew: job.postedAt ? now - Date.parse(job.postedAt) < NEW_DAYS * 86_400_000 : false,
    }))
    // Newest first; roles without a date follow, by company.
    .sort(
      (a, b) =>
        (b.postedAt ?? '').localeCompare(a.postedAt ?? '') ||
        a.company.localeCompare(b.company) ||
        a.title.localeCompare(b.title)
    );

  return {
    jobs,
    employers: listed
      .map((s, i) => ({ ...s, openRoles: boards[i]?.length ?? 0 }))
      .sort((a, b) => a.company.localeCompare(b.company)),
    linked: all.filter((s) => !s.ats).sort((a, b) => a.company.localeCompare(b.company)),
    checkedAt: new Date(now).toISOString(),
  };
}

// The jobs pages are built side by side; they share one reading of the boards.
const SHARE_MS = 5 * 60 * 1000;
let shared: { at: number; data: Promise<JobsData> } | undefined;

export function loadJobs(): Promise<JobsData> {
  if (!shared || Date.now() - shared.at > SHARE_MS) {
    const data = readAll();
    shared = { at: Date.now(), data };
    data.catch(() => {
      if (shared?.data === data) shared = undefined;
    });
  }
  return shared.data;
}
