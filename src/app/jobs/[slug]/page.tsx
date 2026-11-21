import type { Metadata } from 'next';
import Link from 'next/link';
import { notFound } from 'next/navigation';
import PageHeader from '@/components/PageHeader';
import JobsBrowser from '@/components/JobsBrowser';
import JobCategoryLinks from '@/components/JobCategoryLinks';
import { CATEGORIES, inCategory } from '@/lib/job-boards';
import { loadJobs } from '@/lib/jobs';

export const revalidate = 14400;
export const dynamicParams = false;

type Props = { params: Promise<{ slug: string }> };

export function generateStaticParams() {
  return CATEGORIES.map((c) => ({ slug: c.slug }));
}

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const { slug } = await params;
  const category = CATEGORIES.find((c) => c.slug === slug);
  return category ? { title: category.title, description: category.intro } : {};
}

export default async function JobCategoryPage({ params }: Props) {
  const { slug } = await params;
  const category = CATEGORIES.find((c) => c.slug === slug);
  if (!category) notFound();

  const { jobs } = await loadJobs();
  const matching = jobs.filter((job) => inCategory(job, category));
  const companies = new Set(matching.map((job) => job.company)).size;

  return (
    <div className="container py-12">
      <PageHeader
        eyebrow="Neurotech jobs"
        title={category.title}
        subtitle={
          <>
            {category.intro}{' '}
            {matching.length > 0 &&
              `${matching.length} open ${matching.length === 1 ? 'role' : 'roles'} at ${companies} ${
                companies === 1 ? 'company' : 'companies'
              }, read from each employer’s own careers page.`}
          </>
        }
      />

      {matching.length > 0 ? (
        <JobsBrowser jobs={matching} />
      ) : (
        <p className="rounded-2xl border border-[var(--border-strong)] bg-[var(--surface-1)] p-8 text-center text-muted-foreground">
          No open roles in this category right now.{' '}
          <Link href="/jobs" className="text-neuro-accent hover:underline">
            See all neurotech jobs
          </Link>
          .
        </p>
      )}

      <section className="mt-16">
        <h2 className="mb-6 text-2xl font-serif font-bold">More neurotech jobs</h2>
        <JobCategoryLinks jobs={jobs} current={category.slug} />
      </section>
    </div>
  );
}
