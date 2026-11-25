'use client';

import { useMemo, useState } from 'react';
import { ArrowUpRight, MapPin, Search } from 'lucide-react';
import { REGIONS, ROLES, TOPICS, type Job } from '@/lib/job-boards';

const DATE = new Intl.DateTimeFormat('en-US', { month: 'short', day: 'numeric', year: 'numeric', timeZone: 'UTC' });

const FIELD =
  'h-11 rounded-lg border border-[var(--border-strong)] bg-[var(--surface-1)] px-3 text-sm text-foreground focus:border-neuro-accent focus:outline-none';

function Select({
  label,
  value,
  onChange,
  options,
}: {
  label: string;
  value: string;
  onChange: (value: string) => void;
  options: [string, string][];
}) {
  if (options.length < 2) return null;
  return (
    <select aria-label={label} value={value} onChange={(e) => onChange(e.target.value)} className={FIELD}>
      <option value="">{label}</option>
      {options.map(([key, text]) => (
        <option key={key} value={key}>
          {text}
        </option>
      ))}
    </select>
  );
}

const PAGE = 60;

// Search and filters over the roles it is given.
export default function JobsBrowser({ jobs }: { jobs: Job[] }) {
  const [query, setQuery] = useState('');
  const [topic, setTopic] = useState('');
  const [role, setRole] = useState('');
  const [region, setRegion] = useState('');
  const [company, setCompany] = useState('');
  const [internships, setInternships] = useState(false);
  const [limit, setLimit] = useState(PAGE);

  const options = useMemo(() => {
    const present = (labels: Record<string, string>, has: (job: Job, key: string) => boolean) =>
      Object.entries(labels).filter(([key]) => jobs.some((job) => has(job, key)));
    return {
      topics: present(TOPICS, (job, key) => job.topics.includes(key)),
      roles: present(ROLES, (job, key) => job.role === key),
      regions: [
        ...present(REGIONS, (job, key) => job.regions.includes(key)),
        ...(jobs.some((job) => job.remote) ? [['remote', 'Remote'] as [string, string]] : []),
      ],
      companies: [...new Set(jobs.map((job) => job.company))].sort().map((name) => [name, name] as [string, string]),
      internships: jobs.some((job) => job.internship) && !jobs.every((job) => job.internship),
    };
  }, [jobs]);

  const shown = useMemo(() => {
    const words = query.toLowerCase().split(/\s+/).filter(Boolean);
    return jobs.filter((job) => {
      if (topic && !job.topics.includes(topic)) return false;
      if (role && job.role !== role) return false;
      if (region && (region === 'remote' ? !job.remote : !job.regions.includes(region))) return false;
      if (company && job.company !== company) return false;
      if (internships && !job.internship) return false;
      if (!words.length) return true;
      const text = `${job.title} ${job.company} ${job.location} ${job.department ?? ''}`.toLowerCase();
      return words.every((word) => text.includes(word));
    });
  }, [jobs, query, topic, role, region, company, internships]);

  const filtered = Boolean(query || topic || role || region || company || internships);
  const reset = () => {
    setQuery('');
    setTopic('');
    setRole('');
    setRegion('');
    setCompany('');
    setInternships(false);
  };

  return (
    <div>
      <div className="mb-4 flex flex-wrap items-center gap-3">
        <label className="relative min-w-[16rem] flex-1">
          <span className="sr-only">Search roles</span>
          <Search className="pointer-events-none absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2 text-muted-foreground" />
          <input
            type="search"
            value={query}
            onChange={(e) => setQuery(e.target.value)}
            placeholder="Search by title, company or place"
            className={`${FIELD} w-full pl-9`}
          />
        </label>
        <Select label="All topics" value={topic} onChange={setTopic} options={options.topics} />
        <Select label="All role types" value={role} onChange={setRole} options={options.roles} />
        <Select label="All regions" value={region} onChange={setRegion} options={options.regions} />
        <Select label="All companies" value={company} onChange={setCompany} options={options.companies} />
        {options.internships && (
          <label className="flex h-11 cursor-pointer items-center gap-2 text-sm text-muted-foreground">
            <input
              type="checkbox"
              checked={internships}
              onChange={(e) => setInternships(e.target.checked)}
              className="h-4 w-4 accent-[var(--neuro-accent)]"
            />
            Internships only
          </label>
        )}
      </div>

      <p className="mb-4 text-sm text-muted-foreground" aria-live="polite">
        {filtered ? `${shown.length} of ${jobs.length} roles` : `${jobs.length} roles`}
        {filtered && (
          <button type="button" onClick={reset} className="ml-3 text-neuro-accent hover:underline">
            Clear filters
          </button>
        )}
      </p>

      {shown.length === 0 ? (
        <p className="rounded-2xl border border-[var(--border-strong)] bg-[var(--surface-1)] p-8 text-center text-muted-foreground">
          No roles match. Try fewer filters.
        </p>
      ) : (
        <ul className="divide-y divide-[var(--border)] overflow-hidden rounded-2xl border border-[var(--border-strong)] bg-[var(--surface-1)]">
          {shown.slice(0, limit).map((job) => (
            <li key={job.id}>
              <a
                href={job.url}
                {...(job.posted ? {} : { target: '_blank', rel: 'noopener noreferrer' })}
                className="group flex flex-col gap-2 px-5 py-4 transition-colors hover:bg-[var(--surface-2)] md:flex-row md:items-center md:gap-6"
              >
                <div className="min-w-0 flex-1">
                  <h3 className="font-bold leading-snug group-hover:text-neuro-accent">
                    {job.title}
                    {job.isNew && (
                      <span className="ml-2 rounded-full bg-neuro-accent/15 px-2 py-0.5 align-middle text-xs font-bold text-neuro-accent">
                        New
                      </span>
                    )}
                    {job.posted && (
                      <span className="ml-2 rounded-full border border-[var(--border-strong)] px-2 py-0.5 align-middle text-xs font-semibold text-muted-foreground">
                        Posted by NeuroTechX
                      </span>
                    )}
                  </h3>
                  <p className="mt-1 flex flex-wrap items-center gap-x-3 gap-y-1 text-sm text-muted-foreground">
                    <span className="font-semibold text-foreground/90">{job.company}</span>
                    {job.location && (
                      <span className="inline-flex items-center gap-1">
                        <MapPin className="h-3.5 w-3.5 shrink-0" />
                        {job.location}
                      </span>
                    )}
                    {job.remote && !/remote/i.test(job.location) && <span>Remote</span>}
                  </p>
                </div>
                <div className="flex shrink-0 items-center gap-3 text-xs text-muted-foreground md:justify-end">
                  <span className="whitespace-nowrap rounded-full border border-[var(--border-strong)] px-2.5 py-1">{ROLES[job.role]}</span>
                  {job.postedAt && <time className="whitespace-nowrap" dateTime={job.postedAt}>{DATE.format(new Date(job.postedAt))}</time>}
                  <ArrowUpRight className="h-4 w-4 shrink-0 group-hover:text-neuro-accent" />
                </div>
              </a>
            </li>
          ))}
        </ul>
      )}

      {shown.length > limit && (
        <div className="mt-6 text-center">
          <button
            type="button"
            onClick={() => setLimit(limit + PAGE)}
            className="rounded-full border border-foreground/20 px-7 py-3 font-bold transition-colors hover:bg-muted-foreground/10"
          >
            Show more roles ({shown.length - limit} left)
          </button>
        </div>
      )}
    </div>
  );
}
