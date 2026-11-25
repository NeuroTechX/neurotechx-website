import type { Metadata } from 'next';
import Link from '@/components/LocaleLink';
import { ArrowUpRight } from 'lucide-react';
import { fieldMaps } from '@/data/field-maps';
import { alternatesFor, pageLocale } from '@/i18n';
import text from '@/i18n/pages/ecosystem';

export async function generateMetadata({ params }: PageProps<'/[lang]/ecosystem'>): Promise<Metadata> {
  const lang = await pageLocale(params);
  const t = text[lang];
  return { title: t.title, description: t.description, alternates: alternatesFor('/ecosystem', lang) };
}

const VIEWS: { id: 'industry' | 'academic'; embed: string; suggest: string }[] = [
  {
    id: 'industry',
    embed: 'https://airtable.com/embed/shr6ovra8m2OTlXwv?backgroundColor=teal&viewControls=on',
    suggest: 'https://airtable.com/shrc8IMNKwib6mlKF',
  },
  {
    id: 'academic',
    embed: 'https://airtable.com/embed/shrWbISXIhaOKKUvz?backgroundColor=teal&viewControls=on',
    suggest: 'https://airtable.com/shrGqkwnVZT6QCshc',
  },
];

// The Airtable suggestion forms stopped accepting entries when the workspace dropped to the free
// plan (Nov 2024). Set back to true once suggestions work again.
const SUGGESTIONS_OPEN = false;

const linkStyle = { color: 'var(--neuro-accent)' };

export default async function EcosystemPage({ params }: PageProps<'/[lang]/ecosystem'>) {
  const lang = await pageLocale(params);
  const t = text[lang];
  return (
    <div className="container" style={{ paddingTop: '4rem', paddingBottom: '5rem' }}>
      {/* Intro */}
      <header style={{ maxWidth: '52rem', marginBottom: '2.5rem' }}>
        <p className="eyebrow" style={{ marginBottom: '0.75rem' }}>{t.eyebrow}</p>
        <h1 style={{ fontSize: '2.75rem', marginBottom: '1rem' }}>
          {t.headingBefore}<span className="text-gradient">{t.headingAccent}</span>{t.headingAfter}
        </h1>
        <p style={{ fontSize: '1.125rem', color: 'var(--muted-foreground)', marginBottom: '0.75rem' }}>
          {t.lead}
        </p>
        <p
          style={{
            display: 'inline-block',
            fontSize: '0.875rem',
            color: 'var(--neuro-accent)',
            border: '1px solid var(--border-strong)',
            background: 'var(--surface-1)',
            borderRadius: 'var(--radius)',
            padding: '0.5rem 0.9rem',
          }}
        >
          {t.beta}
        </p>
      </header>

      {/* Airtable views */}
      <div style={{ display: 'flex', flexDirection: 'column', gap: '3.5rem' }}>
        {VIEWS.map((v) => (
          <section key={v.id} id={v.id} aria-labelledby={`${v.id}-h`}>
            <div
              style={{
                display: 'flex',
                flexWrap: 'wrap',
                alignItems: 'baseline',
                justifyContent: 'space-between',
                gap: '0.75rem',
                marginBottom: '1rem',
              }}
            >
              <div>
                <h2 id={`${v.id}-h`} style={{ fontSize: '1.6rem' }}>{t.views[v.id].label}</h2>
                <p style={{ color: 'var(--muted-foreground)', fontSize: '0.95rem', marginTop: '0.25rem' }}>{t.views[v.id].blurb}</p>
              </div>
              {SUGGESTIONS_OPEN && (
              <a
                href={v.suggest}
                target="_blank"
                rel="noopener noreferrer"
                style={{
                  whiteSpace: 'nowrap',
                  fontSize: '0.875rem',
                  fontWeight: 700,
                  color: 'var(--neuro-accent)',
                  border: '1px solid var(--border-strong)',
                  borderRadius: '9999px',
                  padding: '0.5rem 1rem',
                }}
              >
                {t.suggest}
              </a>
              )}
            </div>
            <div
              style={{
                border: '1px solid var(--border)',
                borderRadius: 'var(--radius)',
                overflow: 'hidden',
                background: 'var(--surface-1)',
              }}
            >
              <iframe
                className="airtable-embed"
                src={v.embed}
                title={`${t.views[v.id].label} — ${t.embedSuffix}`}
                width="100%"
                height={620}
                style={{ background: 'transparent', border: 'none', display: 'block' }}
                loading="lazy"
              />
            </div>
          </section>
        ))}
      </div>

      {/* Outside maps and trackers of the field */}
      <section style={{ marginTop: '3rem' }}>
        <h2 style={{ fontSize: '1.4rem', marginBottom: '0.5rem' }}>{t.mapsTitle}</h2>
        <p style={{ color: 'var(--muted-foreground)', fontSize: '0.95rem', marginBottom: '1.25rem', maxWidth: '52rem' }}>
          {t.mapsLead}
        </p>
        <div className="grid gap-5 md:grid-cols-2 lg:grid-cols-3">
          {fieldMaps[lang].map((m) => (
            <article key={m.name} className="flex flex-col rounded-xl border border-[var(--border)] bg-[var(--surface-1)] p-6">
              <p className="mb-2 text-xs font-semibold uppercase tracking-wide text-neuro-accent">{m.by}</p>
              <h3 className="mb-2 text-lg font-bold">{m.name}</h3>
              <p className="flex-1 text-sm text-muted-foreground">{m.about}</p>
              <a
                href={m.href}
                target="_blank"
                rel="noopener noreferrer"
                className="mt-4 inline-flex items-center gap-1.5 text-sm font-semibold text-neuro-accent hover:underline"
              >
                {m.cta} <ArrowUpRight width={15} height={15} />
              </a>
            </article>
          ))}
        </div>
      </section>

      {/* Related pages */}
      <section style={{ marginTop: '3rem', maxWidth: '52rem' }}>
        <h2 style={{ fontSize: '1.4rem', marginBottom: '0.75rem' }}>{t.moreTitle}</h2>
        <ul style={{ color: 'var(--muted-foreground)', fontSize: '0.95rem', lineHeight: 1.8, paddingLeft: '1.2rem', listStyle: 'disc' }}>
          <li>
            {t.more.jobsBefore}<Link href="/jobs" style={linkStyle}>{t.more.jobsLink}</Link>{t.more.jobsAfter}
          </li>
          <li>
            {t.more.reportsBefore}<Link href="/reports" style={linkStyle}>{t.more.reportsLink}</Link>{t.more.reportsAfter}
          </li>
          <li>
            {t.more.fundingBefore}<Link href="/funding" style={linkStyle}>{t.more.fundingLink}</Link>{t.more.fundingAfter}
          </li>
        </ul>
      </section>

      {/* Credit and contact */}
      <p style={{ marginTop: '2.5rem', color: 'var(--muted-foreground)', fontSize: '0.95rem' }}>
        {t.credit}
      </p>
      <p style={{ marginTop: '0.75rem', color: 'var(--muted-foreground)', fontSize: '0.95rem' }}>
        {SUGGESTIONS_OPEN ? t.questionsOpen : t.questionsPaused}{' '}
        {SUGGESTIONS_OPEN ? t.contactOpen : t.contactPaused}
        <a href="mailto:info@neurotechx.org" style={linkStyle}>info@neurotechx.org</a>.
      </p>
    </div>
  );
}
