import type { Metadata } from 'next';
import Link from 'next/link';
import { notFound } from 'next/navigation';
import { ArrowUpRight, MapPin } from 'lucide-react';
import PageHeader from '@/components/PageHeader';
import { livePosted } from '@/lib/jobs';

// Expired postings drop off at the next rebuild.
export const revalidate = 14400;
export const dynamicParams = false;

type Props = { params: Promise<{ id: string }> };

const DATE = new Intl.DateTimeFormat('en-US', { month: 'short', day: 'numeric', year: 'numeric', timeZone: 'UTC' });

export function generateStaticParams() {
  return livePosted().map((p) => ({ id: p.id }));
}

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const { id } = await params;
  const job = livePosted().find((p) => p.id === id);
  return job
    ? {
        title: `${job.title} at ${job.company}`,
        description: job.summary,
        alternates: { canonical: `/jobs/posted/${job.id}` },
      }
    : {};
}

export default async function PostedJobPage({ params }: Props) {
  const { id } = await params;
  const job = livePosted().find((p) => p.id === id);
  if (!job) notFound();

  return (
    <div className="container max-w-3xl py-12">
      <PageHeader
        eyebrow="Neurotech jobs"
        title={job.title}
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

      <div className="space-y-8 text-lg leading-relaxed">
        {job.employment && <p className="font-semibold">{job.employment}</p>}
        <p>{job.summary}</p>

        {job.requirements && job.requirements.length > 0 && (
          <section>
            <h2 className="mb-3 text-2xl font-serif font-bold">What they are looking for</h2>
            <ul className="list-disc space-y-1 pl-6">
              {job.requirements.map((r) => (
                <li key={r}>{r}</li>
              ))}
            </ul>
          </section>
        )}

        <section className="rounded-2xl border border-[var(--border-strong)] bg-[var(--surface-1)] p-6">
          <h2 className="mb-3 text-2xl font-serif font-bold">How to apply</h2>
          <p>{job.apply}</p>
          {job.source && (
            <a
              href={job.source}
              target="_blank"
              rel="noopener noreferrer"
              className="mt-4 inline-flex items-center gap-1 text-neuro-accent hover:underline"
            >
              The employer&apos;s posting <ArrowUpRight className="h-4 w-4" />
            </a>
          )}
        </section>

        <p className="text-sm text-muted-foreground">
          Posted by NeuroTechX on {DATE.format(new Date(job.postedAt))}; listed until{' '}
          {DATE.format(new Date(job.expires))}. Applications go to the employer, not to NeuroTechX.{' '}
          <Link href="/jobs" className="text-neuro-accent hover:underline">
            See all neurotech jobs
          </Link>
          .
        </p>
      </div>
    </div>
  );
}
