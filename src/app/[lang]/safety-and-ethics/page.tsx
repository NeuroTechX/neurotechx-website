import type { Metadata } from 'next';
import Link from '@/components/LocaleLink';
import { ArrowRight, ArrowUpRight, Scale, ShieldAlert, ShieldCheck } from 'lucide-react';
import PageHeader from '@/components/PageHeader';
import { alternatesFor, pageLocale } from '@/i18n';
import text from '@/i18n/pages/safety-and-ethics';

export async function generateMetadata({ params }: PageProps<'/[lang]/safety-and-ethics'>): Promise<Metadata> {
  const lang = await pageLocale(params);
  const t = text[lang];
  return { title: t.title, description: t.description, alternates: alternatesFor('/safety-and-ethics', lang) };
}

export default async function SafetyAndEthicsPage({ params }: PageProps<'/[lang]/safety-and-ethics'>) {
  const lang = await pageLocale(params);
  const t = text[lang];

  return (
    <div className="container py-12">
      <PageHeader eyebrow={t.eyebrow} title={t.heading} subtitle={t.subtitle} />

      <div className="mb-12 rounded-xl border border-amber-900 bg-amber-950/30 p-5 text-sm text-amber-200">
        {t.disclaimer}
      </div>

      <section className="mb-16">
        <h2 className="mb-2 flex items-center gap-2 text-2xl font-bold">
          <ShieldAlert className="h-6 w-6 text-neuro-accent" /> {t.safetyTitle}
        </h2>
        <p className="mb-6 max-w-3xl text-muted-foreground">{t.safetyLead}</p>
        <div className="grid gap-5 md:grid-cols-3">
          {t.safetyItems.map((item) => (
            <article key={item.heading} className="rounded-xl border border-[var(--border)] bg-[var(--surface-1)] p-6">
              <h3 className="mb-2 text-lg font-bold">{item.heading}</h3>
              <p className="text-sm leading-relaxed text-muted-foreground">{item.body}</p>
            </article>
          ))}
        </div>
      </section>

      <section className="mb-16">
        <h2 className="mb-2 flex items-center gap-2 text-2xl font-bold">
          <ShieldCheck className="h-6 w-6 text-neuro-accent" /> {t.ethicsTitle}
        </h2>
        <p className="mb-4 max-w-3xl text-muted-foreground">{t.ethicsLead}</p>
        <p className="mb-6 max-w-3xl text-sm text-muted-foreground">
          {t.ethicsNote}
          <Link href="/privacy" className="font-semibold text-neuro-accent hover:underline">
            {t.privacyLink}
          </Link>
          .
        </p>
        <div className="grid gap-5 md:grid-cols-3">
          {t.ethicsResources.map((r) => (
            <article key={r.href} className="flex flex-col rounded-xl border border-[var(--border)] bg-[var(--surface-1)] p-6">
              <p className="mb-2 text-xs font-semibold uppercase tracking-wide text-neuro-accent">{r.org}</p>
              <h3 className="mb-2 text-lg font-bold">{r.title}</h3>
              <p className="mb-4 flex-1 text-sm text-muted-foreground">{r.summary}</p>
              <a
                href={r.href}
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex items-center gap-1 text-sm font-semibold text-neuro-accent hover:underline"
              >
                {t.visitSource} <ArrowUpRight width={15} height={15} />
              </a>
            </article>
          ))}
        </div>
      </section>

      <section className="mb-16">
        <h2 className="mb-2 flex items-center gap-2 text-2xl font-bold">
          <Scale className="h-6 w-6 text-neuro-accent" /> {t.regTitle}
        </h2>
        <p className="mb-6 max-w-3xl text-muted-foreground">{t.regLead}</p>
        <div className="grid gap-5 md:grid-cols-2">
          {t.regResources.map((r) => (
            <article key={r.href} className="flex flex-col rounded-xl border border-[var(--border)] bg-[var(--surface-1)] p-6">
              <p className="mb-2 text-xs font-semibold uppercase tracking-wide text-neuro-accent">{r.org}</p>
              <h3 className="mb-2 text-lg font-bold">{r.title}</h3>
              <p className="mb-4 flex-1 text-sm text-muted-foreground">{r.summary}</p>
              <a
                href={r.href}
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex items-center gap-1 text-sm font-semibold text-neuro-accent hover:underline"
              >
                {t.visitSource} <ArrowUpRight width={15} height={15} />
              </a>
            </article>
          ))}
        </div>
      </section>

      <section className="rounded-2xl border border-neuro-accent/20 bg-neuro-accent/5 p-8">
        <h2 className="mb-4 text-xl font-bold">{t.relatedHeading}</h2>
        <div className="flex flex-wrap gap-6 text-sm font-semibold">
          <Link href="/glossary" className="inline-flex items-center gap-1.5 text-neuro-accent hover:underline">
            {t.glossaryLink} <ArrowRight width={15} height={15} />
          </Link>
          <Link href="/funding" className="inline-flex items-center gap-1.5 text-neuro-accent hover:underline">
            {t.fundingLink} <ArrowRight width={15} height={15} />
          </Link>
          <Link href="/code-of-conduct" className="inline-flex items-center gap-1.5 text-neuro-accent hover:underline">
            {t.conductLink} <ArrowRight width={15} height={15} />
          </Link>
        </div>
      </section>
    </div>
  );
}
