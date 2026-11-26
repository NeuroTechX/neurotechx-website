import type { Metadata } from 'next';
import Link from '@/components/LocaleLink';
import { notFound } from 'next/navigation';
import { ArrowUpRight, MapPin } from 'lucide-react';
import PageHeader from '@/components/PageHeader';
import { livePosted } from '@/lib/jobs';
import { alternatesFor, format, pageLocale, type Locale } from '@/i18n';
import text from '@/i18n/pages/jobs';

// Expired postings drop off at the next rebuild.
export const revalidate = 14400;
export const dynamicParams = false;

type Props = PageProps<'/[lang]/jobs/posted/[id]'>;

const DATE_LOCALE: Record<Locale, string> = { en: 'en-US', fr: 'fr-CA' };

export function generateStaticParams() {
  return livePosted().map((p) => ({ id: p.id }));
}

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const lang = await pageLocale(params);
  const { id } = await params;
  const job = livePosted().find((p) => p.id === id);
  return job
    ? {
        title: format(text[lang].posted.metaTitle, { title: job.title, company: job.company }),
        description: job.summary,
        alternates: alternatesFor(`/jobs/posted/${job.id}`, lang),
      }
    : {};
}

export default async function PostedJobPage({ params }: Props) {
  const lang = await pageLocale(params);
  const { id } = await params;
  const job = livePosted().find((p) => p.id === id);
  if (!job) notFound();
  const t = text[lang].posted;
  const date = new Intl.DateTimeFormat(DATE_LOCALE[lang], { month: 'short', day: 'numeric', year: 'numeric', timeZone: 'UTC' });

  return (
    <div className="container max-w-3xl py-12">
      <PageHeader
        eyebrow={t.eyebrow}
        title={<span lang="en">{job.title}</span>}
        subtitle={
          <span className="flex flex-wrap items-center gap-x-4 gap-y-1">
            {job.site ? (
              <a href={job.site} target="_blank" rel="noopener noreferrer" className="font-semibold text-foreground hover:text-neuro-accent">
                {job.company}
              </a>
            ) : (
              <span className="font-semibold text-foreground">{job.company}</span>
            )}
            <span className="inline-flex items-center gap-1">
              <MapPin className="h-4 w-4 shrink-0" />
              {job.location}
            </span>
          </span>
        }
      />

      {t.inOriginal && <p className="mb-6 text-sm text-muted-foreground">{t.inOriginal}</p>}

      <div className="space-y-8 text-lg leading-relaxed">
        {job.employment && <p lang="en" className="font-semibold">{job.employment}</p>}
        <p lang="en">{job.summary}</p>

        {job.requirements && job.requirements.length > 0 && (
          <section>
            <h2 className="mb-3 text-2xl font-serif font-bold">{t.lookingFor}</h2>
            <ul lang="en" className="list-disc space-y-1 pl-6">
              {job.requirements.map((r) => (
                <li key={r}>{r}</li>
              ))}
            </ul>
          </section>
        )}

        <section className="rounded-2xl border border-[var(--border-strong)] bg-[var(--surface-1)] p-6">
          <h2 className="mb-3 text-2xl font-serif font-bold">{t.howToApply}</h2>
          <p lang="en">{job.apply}</p>
          {job.source && (
            <a
              href={job.source}
              target="_blank"
              rel="noopener noreferrer"
              className="mt-4 inline-flex items-center gap-1 text-neuro-accent hover:underline"
            >
              {t.employerPosting} <ArrowUpRight className="h-4 w-4" />
            </a>
          )}
        </section>

        <p className="text-sm text-muted-foreground">
          {format(t.footer, {
            posted: date.format(new Date(job.postedAt)),
            expires: date.format(new Date(job.expires)),
          })}
          <Link href="/jobs" className="text-neuro-accent hover:underline">
            {t.allJobs}
          </Link>
          .
        </p>
      </div>
    </div>
  );
}
