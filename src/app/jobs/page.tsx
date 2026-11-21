import type { Metadata } from 'next';
import { ArrowUpRight, Building2, Compass, Mail } from 'lucide-react';
import PageHeader from '@/components/PageHeader';
import JobsBrowser from '@/components/JobsBrowser';
import JobCategoryLinks from '@/components/JobCategoryLinks';
import { loadJobs } from '@/lib/jobs';

export const metadata: Metadata = {
  title: 'Neurotech Jobs',
  description:
    'Open jobs and internships at neurotechnology companies: brain–computer interfaces, EEG, neuromodulation and neuroimaging. Read from each employer’s own careers page and refreshed through the day.',
};

// The boards are read again at most every four hours.
export const revalidate = 14400;

// Where employers send job postings. Listing is free and at NeuroTechX's discretion (ED, 2026-11-20).
const EMPLOYER_CONTACT = 'info@neurotechx.com';

const OTHER_BOARDS = [
  {
    name: 'NeuroTech Futures',
    href: 'https://neurotechjobs.io',
    about: 'A job board for the neurotech industry.',
  },
  {
    name: 'Bernstein Network job pool',
    href: 'https://bernstein-network.de/en/career/job-pool/',
    about: 'Academic positions in computational neuroscience.',
  },
];

const CHECKED = new Intl.DateTimeFormat('en-US', {
  month: 'short',
  day: 'numeric',
  year: 'numeric',
  hour: 'numeric',
  minute: '2-digit',
  timeZone: 'UTC',
});

export default async function JobsPage() {
  const { jobs, employers, linked, checkedAt } = await loadJobs();
  const hiring = employers.filter((e) => e.openRoles > 0);

  return (
    <div className="container py-12">
      <PageHeader
        eyebrow="Careers"
        title="Neurotech jobs"
        subtitle={
          <>
            {jobs.length} open roles at {hiring.length} neurotechnology companies, read directly from each
            employer&apos;s own careers page. Every role links to the employer&apos;s posting, where you apply.
          </>
        }
      />

      <section className="mb-10" aria-label="Browse by category">
        <JobCategoryLinks jobs={jobs} />
      </section>

      <JobsBrowser jobs={jobs} />

      <p className="mt-4 text-sm text-muted-foreground">
        Last read from the employers&apos; boards on {CHECKED.format(new Date(checkedAt))} UTC. NeuroTechX does not
        take applications for these roles.
      </p>

      <section className="mt-20">
        <h2 className="mb-2 flex items-center gap-2 text-2xl font-serif font-bold">
          <Building2 className="h-6 w-6 text-neuro-accent" /> Companies on this page
        </h2>
        <p className="mb-6 text-muted-foreground">
          Their openings are read for the list above. Each name links to the company&apos;s own careers page.
        </p>
        <ul className="grid gap-3 sm:grid-cols-2 lg:grid-cols-3">
          {employers.map((e) => (
            <li key={e.company}>
              <a
                href={e.careers}
                target="_blank"
                rel="noopener noreferrer"
                className="group flex h-full items-start justify-between gap-3 rounded-xl border border-[var(--border)] bg-[var(--surface-1)] p-4 transition-colors hover:border-[var(--border-strong)]"
              >
                <span>
                  <span className="block font-bold group-hover:text-neuro-accent">{e.company}</span>
                  {e.about && <span className="mt-1 block text-sm text-muted-foreground">{e.about}</span>}
                </span>
                <span className="shrink-0 whitespace-nowrap text-sm text-muted-foreground">
                  {e.openRoles === 0 ? 'None open' : e.openRoles === 1 ? '1 role' : `${e.openRoles} roles`}
                </span>
              </a>
            </li>
          ))}
        </ul>
      </section>

      {linked.length > 0 && (
        <section className="mt-16">
          <h2 className="mb-2 text-2xl font-serif font-bold">More neurotech employers</h2>
          <p className="mb-6 text-muted-foreground">
            We can&apos;t read these companies&apos; openings automatically, so here are their own pages.
          </p>
          <ul className="grid gap-x-8 gap-y-3 sm:grid-cols-2 lg:grid-cols-3">
            {linked.map((e) => (
              <li key={e.company}>
                <a href={e.careers} target="_blank" rel="noopener noreferrer" className="group inline-flex items-baseline gap-1">
                  <span className="font-semibold group-hover:text-neuro-accent">{e.company}</span>
                  <ArrowUpRight className="h-3.5 w-3.5 self-center text-muted-foreground group-hover:text-neuro-accent" />
                </a>
                {e.about && <p className="text-sm text-muted-foreground">{e.about}</p>}
              </li>
            ))}
          </ul>
        </section>
      )}

      <div className="mt-16 grid gap-8 md:grid-cols-2">
        <section className="rounded-2xl border border-neuro-accent/20 bg-neuro-accent/5 p-8">
          <h2 className="mb-3 flex items-center gap-2 text-xl font-bold">
            <Mail className="h-5 w-5 text-neuro-accent" /> Hiring in neurotech?
          </h2>
          <p className="mb-6 text-muted-foreground">
            Email us your job postings or the link to your careers page. Listing is free and at NeuroTechX&apos;s
            discretion. Once your company is added, its roles appear here and stay up to date on their own.
          </p>
          <a
            href={`mailto:${EMPLOYER_CONTACT}?subject=${encodeURIComponent('Job posting for the NeuroTechX jobs page')}`}
            className="inline-flex items-center gap-2 rounded-full bg-neuro-accent px-7 py-3 font-bold text-[var(--background)] transition hover:brightness-110"
          >
            Email {EMPLOYER_CONTACT}
          </a>
        </section>

        <section className="rounded-2xl border border-[var(--border-strong)] bg-[var(--surface-1)] p-8">
          <h2 className="mb-3 flex items-center gap-2 text-xl font-bold">
            <Compass className="h-5 w-5 text-neuro-accent" /> Other places to look
          </h2>
          <ul className="space-y-4">
            {OTHER_BOARDS.map((board) => (
              <li key={board.href}>
                <a
                  href={board.href}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="inline-flex items-center gap-1 font-semibold hover:text-neuro-accent"
                >
                  {board.name} <ArrowUpRight className="h-3.5 w-3.5" />
                </a>
                <p className="text-sm text-muted-foreground">{board.about}</p>
              </li>
            ))}
          </ul>
        </section>
      </div>
    </div>
  );
}
