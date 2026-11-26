import type { Metadata } from 'next';
import Link from '@/components/LocaleLink';
import { notFound } from 'next/navigation';
import PageHeader from '@/components/PageHeader';
import JobsBrowser from '@/components/JobsBrowser';
import JobCategoryLinks from '@/components/JobCategoryLinks';
import { CATEGORIES, inCategory } from '@/lib/job-boards';
import { loadJobs } from '@/lib/jobs';
import { alternatesFor, format, pageLocale, type Locale } from '@/i18n';
import text from '@/i18n/pages/jobs';

export const revalidate = 14400;
export const dynamicParams = false;

type Props = PageProps<'/[lang]/jobs/[slug]'>;

export function generateStaticParams() {
  return CATEGORIES.map((c) => ({ slug: c.slug }));
}

function categoryText(slug: string, lang: Locale) {
  const categories = text[lang].categories;
  return slug in categories ? categories[slug as keyof typeof categories] : undefined;
}

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const lang = await pageLocale(params);
  const { slug } = await params;
  const category = categoryText(slug, lang);
  return category
    ? { title: category.title, description: category.intro, alternates: alternatesFor(`/jobs/${slug}`, lang) }
    : {};
}

export default async function JobCategoryPage({ params }: Props) {
  const lang = await pageLocale(params);
  const { slug } = await params;
  const category = CATEGORIES.find((c) => c.slug === slug);
  const words = categoryText(slug, lang);
  if (!category || !words) notFound();
  const t = text[lang];
  const c = t.category;

  const { jobs } = await loadJobs();
  const matching = jobs.filter((job) => inCategory(job, category));
  const companies = new Set(matching.map((job) => job.company)).size;

  return (
    <div className="container py-12">
      <PageHeader
        eyebrow={c.eyebrow}
        title={words.title}
        subtitle={
          <>
            {words.intro}{' '}
            {matching.length > 0 &&
              format(c.count, {
                roles: format(matching.length === 1 ? c.roleOne : c.roleMany, { n: matching.length }),
                companies: format(companies === 1 ? c.companyOne : c.companyMany, { n: companies }),
              })}
          </>
        }
      />

      {matching.length > 0 ? (
        <JobsBrowser jobs={matching} lang={lang} t={t} />
      ) : (
        <p className="rounded-2xl border border-[var(--border-strong)] bg-[var(--surface-1)] p-8 text-center text-muted-foreground">
          {c.none}
          <Link href="/jobs" className="text-neuro-accent hover:underline">
            {c.allJobs}
          </Link>
          .
        </p>
      )}

      <section className="mt-16">
        <h2 className="mb-6 text-2xl font-serif font-bold">{c.moreHeading}</h2>
        <JobCategoryLinks jobs={jobs} current={category.slug} lang={lang} />
      </section>
    </div>
  );
}
