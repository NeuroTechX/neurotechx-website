import type { Metadata } from 'next';
import Link from '@/components/LocaleLink';
import { ArrowUpRight } from 'lucide-react';
import { fetchFeeds, REPORTS_FEEDS } from '@/lib/rss';
import type { FeedConfig, NewsItem } from '@/lib/types';
import PageHeader from '@/components/PageHeader';
import { publications } from '@/data/publications';
import { formatDistanceToNow } from 'date-fns';
import { fr as frLocale } from 'date-fns/locale';
import { alternatesFor, pageLocale, type Locale } from '@/i18n';
import text, { publicationsFr } from '@/i18n/pages/reports';

export async function generateMetadata({ params }: PageProps<'/[lang]/reports'>): Promise<Metadata> {
    const lang = await pageLocale(params);
    const t = text[lang];
    return { title: t.title, description: t.description, alternates: alternatesFor('/reports', lang) };
}

export const revalidate = 3600; // refresh hourly

const PUBLICATION_FEEDS: FeedConfig[] = publications
    .filter((p) => p.feed)
    .map((p) => ({ name: p.name, url: p.feed as string, type: 'external' }));

// De-dupe by normalized title, keep newest-first.
function dedupe(items: NewsItem[], limit: number) {
    const seen = new Set<string>();
    return items
        .filter((i) => i?.title && i.pubDate)
        .filter((i) => {
            const k = i.title.toLowerCase().replace(/\s+/g, ' ').trim();
            if (seen.has(k)) return false;
            seen.add(k);
            return true;
        })
        .slice(0, limit);
}

function NewsGrid({ items, lang }: { items: NewsItem[]; lang: Locale }) {
    const fr = lang === 'fr';
    return (
        <div className="grid gap-5 md:grid-cols-2 lg:grid-cols-3">
            {items.map((item) => (
                <a
                    key={item.id}
                    href={item.link}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="group flex flex-col rounded-xl border border-[var(--border)] bg-[var(--surface-1)] p-5 transition hover:border-neuro-accent hover:-translate-y-0.5"
                >
                    <div className="mb-3 flex items-center gap-2 text-xs text-muted-foreground">
                        <span className="rounded-full bg-[var(--surface-3)] px-2 py-0.5 font-medium">{item.source.name}</span>
                        <span>·</span>
                        <time dateTime={item.pubDate}>{formatDistanceToNow(new Date(item.pubDate), { addSuffix: true, locale: fr ? frLocale : undefined })}</time>
                    </div>
                    <h3 lang={fr ? 'en' : undefined} className="line-clamp-3 font-semibold leading-snug group-hover:text-neuro-accent transition-colors">
                        {item.title}
                    </h3>
                    {item.contentSnippet && (
                        <p lang={fr ? 'en' : undefined} className="mt-2 line-clamp-2 text-sm text-muted-foreground">
                            {item.contentSnippet.replace(/<[^>]*>?/gm, '')}
                        </p>
                    )}
                </a>
            ))}
        </div>
    );
}

export default async function ReportsPage({ params }: PageProps<'/[lang]/reports'>) {
    const lang = await pageLocale(params);
    const t = text[lang];
    const [fromPublications, fromNews] = await Promise.all([
        fetchFeeds(PUBLICATION_FEEDS).catch(() => []),
        fetchFeeds(REPORTS_FEEDS).catch(() => []),
    ]);
    const latest = dedupe(fromPublications, 9);
    const news = dedupe(fromNews, 12);

    return (
        <div className="container py-12">
            <PageHeader
                eyebrow={t.eyebrow}
                title={t.title}
                subtitle={t.subtitle}
            />

            <section className="mb-14">
                <h2 className="mb-2 text-2xl font-bold">{t.whoToReadTitle}</h2>
                <p className="mb-6 max-w-3xl text-muted-foreground">
                    {t.whoToReadBody}
                </p>
                <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
                    {publications.map((p) => {
                        // French text where we have it; otherwise the English from the data file, marked as such.
                        const pt = lang === 'fr' ? publicationsFr[p.name] : undefined;
                        const untranslated = lang === 'fr' && !pt ? 'en' : undefined;
                        return (
                        <article key={p.name} className="flex flex-col rounded-xl border border-[var(--border)] bg-[var(--surface-1)] p-6">
                            <p className="mb-2 text-xs font-semibold uppercase tracking-wide text-neuro-accent">{p.by}</p>
                            <h3 className="mb-2 text-lg font-bold">{p.name}</h3>
                            <p lang={untranslated} className="flex-1 text-sm text-muted-foreground">{pt?.about ?? p.about}</p>
                            <p className="mt-4 text-xs text-muted-foreground">
                                <span lang={untranslated}>{pt?.cadence ?? p.cadence}</span> · {t.access[p.access]}
                            </p>
                            <a
                                href={p.href}
                                target="_blank"
                                rel="noopener noreferrer"
                                className="mt-4 inline-flex items-center gap-1.5 text-sm font-semibold text-neuro-accent hover:underline"
                            >
                                <span lang={untranslated}>{pt?.cta ?? p.cta}</span> <ArrowUpRight width={15} height={15} />
                            </a>
                        </article>
                        );
                    })}
                </div>
            </section>

            {latest.length > 0 && (
                <section className="mb-14">
                    <h2 className="mb-6 text-2xl font-bold">{t.latestTitle}</h2>
                    <NewsGrid items={latest} lang={lang} />
                </section>
            )}

            <section className="mb-12">
                <h2 className="mb-6 text-2xl font-bold">{t.newsTitle}</h2>
                {news.length === 0 ? (
                    <p className="text-muted-foreground">{t.noNews}</p>
                ) : (
                    <NewsGrid items={news} lang={lang} />
                )}
            </section>

            <section className="max-w-3xl">
                <p className="text-sm text-muted-foreground">
                    {t.disclaimer}{' '}
                    <a className="text-neuro-accent underline" href="mailto:info@neurotechx.org">info@neurotechx.org</a>.{' '}
                    {t.fundingLead}{' '}
                    <Link className="text-neuro-accent underline" href="/funding">{t.fundingLink}</Link>.
                </p>
            </section>
        </div>
    );
}
