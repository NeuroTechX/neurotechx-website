import type { Metadata } from 'next';
import Link from 'next/link';
import { ArrowUpRight } from 'lucide-react';
import { fieldMaps } from '@/data/field-maps';

export const metadata: Metadata = {
  title: 'Neurotech Ecosystem',
  description:
    'A community-maintained directory of the neurotechnology ecosystem — industry companies and academic labs across the globe.',
  alternates: { canonical: '/ecosystem' },
};

const VIEWS = [
  {
    id: 'industry',
    label: 'Industry',
    blurb: 'Companies building neurotechnology — hardware, software, BCI, and beyond.',
    embed: 'https://airtable.com/embed/shr6ovra8m2OTlXwv?backgroundColor=teal&viewControls=on',
    suggest: 'https://airtable.com/shrc8IMNKwib6mlKF',
  },
  {
    id: 'academic',
    label: 'Academic Labs',
    blurb: 'Research groups and academic labs advancing the field worldwide.',
    embed: 'https://airtable.com/embed/shrWbISXIhaOKKUvz?backgroundColor=teal&viewControls=on',
    suggest: 'https://airtable.com/shrGqkwnVZT6QCshc',
  },
];

// The Airtable suggestion forms stopped accepting entries when the workspace dropped to the free
// plan (Nov 2024). Set back to true once suggestions work again.
const SUGGESTIONS_OPEN = false;

const linkStyle = { color: 'var(--neuro-accent)' };

export default function EcosystemPage() {
  return (
    <div className="container" style={{ paddingTop: '4rem', paddingBottom: '5rem' }}>
      {/* Intro */}
      <header style={{ maxWidth: '52rem', marginBottom: '2.5rem' }}>
        <p className="eyebrow" style={{ marginBottom: '0.75rem' }}>Resources</p>
        <h1 style={{ fontSize: '2.75rem', marginBottom: '1rem' }}>
          The <span className="text-gradient">Neurotech</span> Ecosystem
        </h1>
        <p style={{ fontSize: '1.125rem', color: 'var(--muted-foreground)', marginBottom: '0.75rem' }}>
          A community-maintained map of the people, companies, and labs driving neurotechnology forward —
          with representation across the globe.
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
          🧪 This database is in beta — entries for Industry and Academic Labs are available for early access.
          Your feedback and contributions are welcome.
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
                <h2 id={`${v.id}-h`} style={{ fontSize: '1.6rem' }}>{v.label}</h2>
                <p style={{ color: 'var(--muted-foreground)', fontSize: '0.95rem', marginTop: '0.25rem' }}>{v.blurb}</p>
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
                + Suggest an entry
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
                title={`${v.label} — NeuroTechX Ecosystem`}
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
        <h2 style={{ fontSize: '1.4rem', marginBottom: '0.5rem' }}>Maps and trackers of the field</h2>
        <p style={{ color: 'var(--muted-foreground)', fontSize: '0.95rem', marginBottom: '1.25rem', maxWidth: '52rem' }}>
          Other groups chart the neurotech field too. These are kept by their makers; listing one is not an endorsement.
        </p>
        <div className="grid gap-5 md:grid-cols-2 lg:grid-cols-3">
          {fieldMaps.map((m) => (
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
        <h2 style={{ fontSize: '1.4rem', marginBottom: '0.75rem' }}>More on the neurotech industry</h2>
        <ul style={{ color: 'var(--muted-foreground)', fontSize: '0.95rem', lineHeight: 1.8, paddingLeft: '1.2rem', listStyle: 'disc' }}>
          <li>
            Who is hiring: <Link href="/jobs" style={linkStyle}>neurotech jobs</Link>, read from these companies&apos; own careers pages.
          </li>
          <li>
            Who writes about the industry: <Link href="/reports" style={linkStyle}>industry intelligence</Link>.
          </li>
          <li>
            Money for your work: <Link href="/funding" style={linkStyle}>funding opportunities</Link>.
          </li>
        </ul>
      </section>

      {/* Credit and contact */}
      <p style={{ marginTop: '2.5rem', color: 'var(--muted-foreground)', fontSize: '0.95rem' }}>
        The Neurotech Ecosystem database was built by NeuroTechX volunteers together with BrainMind.
      </p>
      <p style={{ marginTop: '0.75rem', color: 'var(--muted-foreground)', fontSize: '0.95rem' }}>
        {SUGGESTIONS_OPEN ? 'Questions or inquiries?' : 'New suggestions are paused while we move the database. To suggest an entry or ask a question,'}{' '}
        {SUGGESTIONS_OPEN ? 'Contact ' : 'write to '}
        <a href="mailto:info@neurotechx.org" style={linkStyle}>info@neurotechx.org</a>.
      </p>
    </div>
  );
}
