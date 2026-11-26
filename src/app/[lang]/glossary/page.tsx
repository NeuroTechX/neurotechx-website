import type { Metadata } from 'next';
import Link from '@/components/LocaleLink';
import { ArrowRight } from 'lucide-react';
import PageHeader from '@/components/PageHeader';
import { alternatesFor, pageLocale } from '@/i18n';
import text from '@/i18n/pages/glossary';

export async function generateMetadata({ params }: PageProps<'/[lang]/glossary'>): Promise<Metadata> {
  const lang = await pageLocale(params);
  const t = text[lang];
  return { title: t.title, description: t.description, alternates: alternatesFor('/glossary', lang) };
}

export default async function GlossaryPage({ params }: PageProps<'/[lang]/glossary'>) {
  const lang = await pageLocale(params);
  const t = text[lang];

  return (
    <div className="container py-12">
      <PageHeader eyebrow={t.eyebrow} title={t.heading} subtitle={t.subtitle} />

      <nav aria-label={t.jumpTo} className="mb-12 flex flex-wrap items-center gap-2.5 text-sm">
        <span className="text-muted-foreground mr-1">{t.jumpTo}</span>
        {t.sections.map((section) => (
          <a
            key={section.id}
            href={`#${section.id}`}
            className="rounded-full border border-[var(--border-strong)] bg-[var(--surface-1)] px-3.5 py-1.5 font-medium text-foreground transition hover:border-neuro-accent hover:text-neuro-accent"
          >
            {section.title}
          </a>
        ))}
      </nav>

      <div className="space-y-14">
        {t.sections.map((section) => (
          <section key={section.id} id={section.id} className="scroll-mt-28">
            <h2 className="mb-6 text-2xl font-bold">{section.title}</h2>
            <dl className="grid gap-5 md:grid-cols-2">
              {section.terms.map((item) => (
                <div
                  key={item.id}
                  id={item.id}
                  className="scroll-mt-28 rounded-xl border border-[var(--border)] bg-[var(--surface-1)] p-6"
                >
                  <dt className="mb-2 text-lg font-bold text-foreground">{item.term}</dt>
                  <dd className="text-sm leading-relaxed text-muted-foreground">{item.summary}</dd>
                </div>
              ))}
            </dl>
          </section>
        ))}
      </div>

      <section className="mt-16 rounded-2xl border border-neuro-accent/20 bg-neuro-accent/5 p-8">
        <h2 className="mb-2 text-xl font-bold">{t.learnMoreHeading}</h2>
        <p className="mb-5 max-w-2xl text-muted-foreground">{t.learnMoreBody}</p>
        <div className="flex flex-wrap gap-6 text-sm font-semibold">
          <Link href="/learn" className="inline-flex items-center gap-1.5 text-neuro-accent hover:underline">
            {t.learnLink} <ArrowRight width={15} height={15} />
          </Link>
          <Link href="/safety-and-ethics" className="inline-flex items-center gap-1.5 text-neuro-accent hover:underline">
            {t.safetyLink} <ArrowRight width={15} height={15} />
          </Link>
        </div>
      </section>
    </div>
  );
}
