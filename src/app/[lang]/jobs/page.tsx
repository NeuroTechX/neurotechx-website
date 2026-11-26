import type { Metadata } from 'next';
import Link from '@/components/LocaleLink';
import { ArrowUpRight, Building2, Compass, Mail, Users } from 'lucide-react';
import PageHeader from '@/components/PageHeader';
import JobsBrowser from '@/components/JobsBrowser';
import JobCategoryLinks from '@/components/JobCategoryLinks';
import { loadJobs } from '@/lib/jobs';
import { alternatesFor, format, pageLocale, type Locale } from '@/i18n';
import text from '@/i18n/pages/jobs';

export async function generateMetadata({ params }: PageProps<'/[lang]/jobs'>): Promise<Metadata> {
  const lang = await pageLocale(params);
  const t = text[lang];
  return { title: t.title, description: t.description, alternates: alternatesFor('/jobs', lang) };
}

// The boards are read again at most every four hours.
export const revalidate = 14400;

// Where employers send job postings. Listing is free and at NeuroTechX's discretion (ED, 2026-11-20).
const EMPLOYER_CONTACT = 'info@neurotechx.org';

const OTHER_BOARDS = [
  { key: 'futures', name: 'NeuroTech Futures', href: 'https://neurotechjobs.io' },
  { key: 'reccy', name: 'reccy neuro', href: 'https://neuro.reccy.dev/' },
  { key: 'bernstein', name: 'Bernstein Network job pool', href: 'https://bernstein-network.de/en/career/job-pool/' },
] as const;

const DATE_LOCALE: Record<Locale, string> = { en: 'en-US', fr: 'fr-CA' };

export default async function JobsPage({ params }: PageProps<'/[lang]/jobs'>) {
  const lang = await pageLocale(params);
  const t = text[lang];
  const { jobs, employers, linked, checkedAt } = await loadJobs();
  const hiring = employers.filter((e) => e.openRoles > 0);
  const checked = new Intl.DateTimeFormat(DATE_LOCALE[lang], {
    month: 'short',
    day: 'numeric',
    year: 'numeric',
    hour: 'numeric',
    minute: '2-digit',
    timeZone: 'UTC',
  });
  const about = (e: { about?: string; fr?: { about: string } }) => (lang === 'fr' && e.fr ? e.fr.about : e.about);

  return (
    <div className="container py-12">
      <PageHeader
        eyebrow={t.eyebrow}
        title={t.heading}
        subtitle={format(t.subtitle, { jobs: jobs.length, companies: hiring.length })}
      />

      <section className="mb-10" aria-label={t.browseLabel}>
        <JobCategoryLinks jobs={jobs} lang={lang} />
      </section>

      <JobsBrowser jobs={jobs} lang={lang} t={t} />

      <p className="mt-4 text-sm text-muted-foreground">
        {format(t.checked, { date: checked.format(new Date(checkedAt)) })}
      </p>

      <section className="mt-20">
        <h2 className="mb-2 flex items-center gap-2 text-2xl font-serif font-bold">
          <Building2 className="h-6 w-6 text-neuro-accent" /> {t.companiesHeading}
        </h2>
        <p className="mb-6 text-muted-foreground">{t.companiesBody}</p>
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
                  {about(e) && <span className="mt-1 block text-sm text-muted-foreground">{about(e)}</span>}
                </span>
                <span className="shrink-0 whitespace-nowrap text-sm text-muted-foreground">
                  {e.openRoles === 0 ? t.rolesNone : e.openRoles === 1 ? t.rolesOne : format(t.rolesMany, { n: e.openRoles })}
                </span>
              </a>
            </li>
          ))}
        </ul>
      </section>

      {linked.length > 0 && (
        <section className="mt-16">
          <h2 className="mb-2 text-2xl font-serif font-bold">{t.moreHeading}</h2>
          <p className="mb-6 text-muted-foreground">{t.moreBody}</p>
          <ul className="grid gap-x-8 gap-y-3 sm:grid-cols-2 lg:grid-cols-3">
            {linked.map((e) => (
              <li key={e.company}>
                <a href={e.careers} target="_blank" rel="noopener noreferrer" className="group inline-flex items-baseline gap-1">
                  <span className="font-semibold group-hover:text-neuro-accent">{e.company}</span>
                  <ArrowUpRight className="h-3.5 w-3.5 self-center text-muted-foreground group-hover:text-neuro-accent" />
                </a>
                {about(e) && <p className="text-sm text-muted-foreground">{about(e)}</p>}
              </li>
            ))}
          </ul>
        </section>
      )}

      <p className="mt-16 text-muted-foreground">
        {t.fundingBefore}
        <Link href="/funding" className="font-semibold text-neuro-accent hover:underline">
          {t.fundingLink}
        </Link>
        .
      </p>

      <section className="mt-8 rounded-2xl border border-[var(--border-strong)] bg-[var(--surface-1)] p-8">
        <h2 className="mb-3 flex items-center gap-2 text-xl font-bold">
          <Users className="h-5 w-5 text-neuro-accent" /> {t.teamHeading}
        </h2>
        <p className="mb-5 text-muted-foreground">{t.teamBody}</p>
        <Link href="/join-the-team" className="inline-flex items-center gap-1 font-semibold text-neuro-accent hover:underline">
          {t.teamLink} <ArrowUpRight className="h-3.5 w-3.5" />
        </Link>
      </section>

      <div className="mt-8 grid gap-8 md:grid-cols-2">
        <section className="rounded-2xl border border-neuro-accent/20 bg-neuro-accent/5 p-8">
          <h2 className="mb-3 flex items-center gap-2 text-xl font-bold">
            <Mail className="h-5 w-5 text-neuro-accent" /> {t.hiringHeading}
          </h2>
          <p className="mb-6 text-muted-foreground">{t.hiringBody}</p>
          <a
            href={`mailto:${EMPLOYER_CONTACT}?subject=${encodeURIComponent(t.hiringSubject)}`}
            className="inline-flex items-center gap-2 rounded-full bg-neuro-accent px-7 py-3 font-bold text-[var(--background)] transition hover:brightness-110"
          >
            {format(t.hiringEmail, { email: EMPLOYER_CONTACT })}
          </a>
        </section>

        <section className="rounded-2xl border border-[var(--border-strong)] bg-[var(--surface-1)] p-8">
          <h2 className="mb-3 flex items-center gap-2 text-xl font-bold">
            <Compass className="h-5 w-5 text-neuro-accent" /> {t.otherHeading}
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
                <p className="text-sm text-muted-foreground">{t.boards[board.key]}</p>
              </li>
            ))}
          </ul>
        </section>
      </div>
    </div>
  );
}
