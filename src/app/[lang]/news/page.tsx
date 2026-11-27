import type { Metadata } from 'next';
import Link from '@/components/LocaleLink';
import { ArrowUpRight, Rss } from 'lucide-react';
import PageHeader from '@/components/PageHeader';
import { formatDistanceToNow } from 'date-fns';
import { fr as frLocale } from 'date-fns/locale';
import { alternatesFor, pageLocale, type Locale } from '@/i18n';
import { getNews, type NewsEntry } from '@/lib/news';
import text from '@/i18n/pages/news';

export async function generateMetadata({ params }: PageProps<'/[lang]/news'>): Promise<Metadata> {
    const lang = await pageLocale(params);
    const t = text[lang];
    return { title: t.title, description: t.description, alternates: alternatesFor('/news', lang) };
}

export const revalidate = 1800; // same refresh as /feed.xml

const cardClass =
    'group flex flex-col rounded-xl border border-[var(--border)] bg-[var(--surface-1)] p-5 transition hover:border-neuro-accent hover:-translate-y-0.5';

function NewsCard({ item, lang }: { item: NewsEntry; lang: Locale }) {
    const fr = lang === 'fr';
    const t = text[lang];
    const itemLang = fr && item.english ? 'en' : undefined;
    const body = (
        <>
            <div className="mb-3 flex items-center gap-2 text-xs text-muted-foreground">
                <span className="rounded-full bg-[var(--surface-3)] px-2 py-0.5 font-medium">{t.sources[item.source]}</span>
                <span>·</span>
                <time dateTime={item.date} title={new Date(item.date).toISOString().slice(0, 10)}>
                    {formatDistanceToNow(new Date(item.date), { addSuffix: true, locale: fr ? frLocale : undefined })}
                </time>
            </div>
            <h2 lang={itemLang} className="text-lg font-semibold leading-snug group-hover:text-neuro-accent transition-colors">
                {item.title}
            </h2>
            {item.summary && (
                <p lang={itemLang} className="mt-2 line-clamp-4 text-sm text-muted-foreground">
                    {item.summary}
                </p>
            )}
            <span className="mt-3 inline-flex items-center gap-1 text-sm font-semibold text-neuro-accent">
                {t.readMore}
                {!item.internal && <ArrowUpRight width={15} height={15} aria-hidden="true" />}
            </span>
        </>
    );
    return item.internal ? (
        <Link href={item.link} className={cardClass}>{body}</Link>
    ) : (
        <a href={item.link} target="_blank" rel="noopener noreferrer" className={cardClass}>{body}</a>
    );
}

export default async function NewsPage({ params }: PageProps<'/[lang]/news'>) {
    const lang = await pageLocale(params);
    const t = text[lang];
    const items = await getNews(lang, 30);

    return (
        <div className="container py-12">
            <PageHeader eyebrow={t.eyebrow} title={t.title} subtitle={t.subtitle} />

            <p className="mb-8 max-w-3xl text-sm text-muted-foreground">
                {t.rssNote}{' '}
                <a href="/feed.xml" type="application/rss+xml" className="inline-flex items-center gap-1 font-semibold text-neuro-accent hover:underline">
                    <Rss width={14} height={14} aria-hidden="true" /> {t.rss}
                </a>
                {t.englishNote && <> {t.englishNote}</>}
            </p>

            {items.length === 0 ? (
                <p className="text-muted-foreground">{t.empty}</p>
            ) : (
                <ul className="flex max-w-3xl flex-col gap-5">
                    {items.map((item) => (
                        <li key={item.id}>
                            <NewsCard item={item} lang={lang} />
                        </li>
                    ))}
                </ul>
            )}
        </div>
    );
}
