import Link from '@/components/LocaleLink';
import { ArrowUpRight } from 'lucide-react';
import { FEATURED_CHAPTERS, OTHER_CHAPTERS, STUDENT_CLUBS, STATUS_COLOR, cityIn, type ChapterStatus } from '@/lib/chapters';
import type { Locale } from '@/i18n';
import type community from '@/i18n/pages/community';

type Text = (typeof community)['en']['chapters'];

function statusStyle(status: ChapterStatus): React.CSSProperties {
  switch (status) {
    case 'restarting':
      return { background: 'rgba(251,191,36,0.15)', color: '#fbbf24' };
    case 'soon':
    case 'new':
      return { background: 'rgba(74,222,128,0.15)', color: '#4ade80' };
    case 'inactive':
      return { background: 'rgba(107,114,128,0.15)', color: '#9ca3af' };
    default:
      return { background: 'rgba(34,211,238,0.15)', color: 'var(--neuro-accent)' };
  }
}

export default function Chapters({ lang, t }: { lang: Locale; t: Text }) {
  return (
    <div>
      <div className="mb-6 flex flex-wrap items-end justify-between gap-4">
        <div>
          <p className="eyebrow mb-2">{t.eyebrow}</p>
          <h2 className="text-2xl md:text-3xl font-bold">{t.title}</h2>
        </div>
        <div className="flex items-center gap-4 text-xs text-muted-foreground">
          <span className="inline-flex items-center gap-1.5">
            <span className="h-2.5 w-2.5 rounded-full" style={{ background: 'var(--neuro-accent)' }} /> {t.status.active}
          </span>
          <span className="inline-flex items-center gap-1.5">
            <span className="h-2.5 w-2.5 rounded-full" style={{ background: '#fbbf24' }} /> {t.status.restarting}
          </span>
          <span className="inline-flex items-center gap-1.5">
            <span className="h-2.5 w-2.5 rounded-full" style={{ background: '#4ade80' }} /> {t.status.soon}
          </span>
          <span className="inline-flex items-center gap-1.5">
            <span className="h-2.5 w-2.5 rounded-full" style={{ background: '#6b7280' }} /> {t.status.inactive}
          </span>
          <span className="inline-flex items-center gap-1.5">
            <span className="h-2.5 w-2.5 rounded-full" style={{ background: '#a78bfa' }} /> {t.studentClubLegend}
          </span>
        </div>
      </div>

      {/* Featured / largest chapters */}
      <div className="grid gap-5 sm:grid-cols-2 lg:grid-cols-3">
        {FEATURED_CHAPTERS.map((c) => (
          <a
            key={c.name}
            href={c.url}
            target="_blank"
            rel="noopener noreferrer"
            className="group flex flex-col rounded-xl border border-[var(--border)] bg-[var(--surface-1)] p-6 transition hover:border-neuro-accent hover:-translate-y-0.5"
          >
            <div className="mb-3 flex items-center justify-between gap-2">
              <span className="text-xs font-semibold uppercase tracking-wider text-muted-foreground">{cityIn(c.city, lang)}</span>
              <span className="rounded-full px-2.5 py-0.5 text-xs font-semibold" style={statusStyle(c.status)}>
                {t.status[c.status]}
              </span>
            </div>
            <h3 className="mb-2 text-lg font-bold leading-snug group-hover:text-neuro-accent transition-colors">{c.name}</h3>
            {c.note && (
              <p className="mb-4 flex-1 text-sm text-muted-foreground">{(lang === 'fr' && c.fr?.note) || c.note}</p>
            )}
            <div className="flex flex-wrap items-center justify-between gap-2 text-sm">
              <span className="inline-flex items-center gap-1 font-semibold text-neuro-accent">
                {(lang === 'fr' && c.fr?.linkLabel) || c.linkLabel || t.visit} <ArrowUpRight width={15} height={15} />
              </span>
              {c.slack && (
                <span className="rounded bg-[var(--surface-2)] px-2 py-0.5 font-mono text-xs text-muted-foreground">
                  Slack: {c.slack}
                </span>
              )}
            </div>
          </a>
        ))}
      </div>

      {/* All other chapters */}
      <div className="mt-10">
        <h3 className="mb-4 text-sm font-semibold uppercase tracking-wider text-muted-foreground">{t.more}</h3>
        <div className="flex flex-wrap gap-2.5">
          {OTHER_CHAPTERS.map((c) => (
            <a
              key={c.name}
              href={c.url}
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center gap-1.5 rounded-full border border-[var(--border)] bg-[var(--surface-1)] px-3.5 py-1.5 text-sm font-medium transition hover:border-neuro-accent hover:text-neuro-accent"
              title={t.status[c.status]}
            >
              <span className="h-2 w-2 shrink-0 rounded-full" style={{ background: STATUS_COLOR[c.status] }} />
              {cityIn(c.city, lang)} <ArrowUpRight width={13} height={13} className="opacity-60" />
            </a>
          ))}
        </div>
      </div>

      {/* Student clubs */}
      <div className="mt-12">
        <h3 className="mb-1 text-sm font-semibold uppercase tracking-wider text-muted-foreground">{t.studentClubs}</h3>
        <p className="mb-4 max-w-2xl text-sm text-muted-foreground">
          {t.studentClubsLead}{' '}
          <a href="https://global-neurohack.github.io/" target="_blank" rel="noopener noreferrer" className="font-medium text-neuro-accent hover:underline">
            Global NeuroHack 2026
          </a>
          {lang === 'fr' ? ' ' : ''}
          {t.studentClubsLeadAfter}
        </p>
        <div className="flex flex-wrap gap-2.5">
          {STUDENT_CLUBS.map((s) => {
            const inner = (
              <>
                <span className="h-2 w-2 shrink-0 rounded-full" style={{ background: '#a78bfa' }} />
                <span>{s.name}</span>
                <span className="text-muted-foreground">· {s.school}</span>
              </>
            );
            return s.url ? (
              <a
                key={s.name}
                href={s.url}
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex items-center gap-1.5 rounded-full border border-[var(--border)] bg-[var(--surface-1)] px-3.5 py-1.5 text-sm font-medium transition hover:border-[#a78bfa] hover:text-foreground"
              >
                {inner}
              </a>
            ) : (
              <span
                key={s.name}
                className="inline-flex items-center gap-1.5 rounded-full border border-[var(--border)] bg-[var(--surface-1)] px-3.5 py-1.5 text-sm font-medium text-foreground/80"
              >
                {inner}
              </span>
            );
          })}
        </div>
        <Link href="/students" className="mt-4 inline-block text-sm font-semibold text-neuro-accent hover:underline">
          {t.allClubs}
        </Link>
      </div>

      <p className="mt-8 text-sm text-muted-foreground">
        {t.missingCity}{' '}
        <Link href="/community/start-a-chapter" className="font-semibold text-neuro-accent hover:underline">
          {t.missingCityLink}
        </Link>{' '}
        {t.missingCityAfter}
      </p>
    </div>
  );
}
