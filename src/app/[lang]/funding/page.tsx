import type { Metadata } from 'next';
import Link from '@/components/LocaleLink';
import { ArrowUpRight, Search } from 'lucide-react';
import PageHeader from '@/components/PageHeader';
import { FUNDING_CHECKED, FUNDING_FINDERS, INVESTOR_DIRECTORIES, fundingOpportunities, type FundingAudience } from '@/data/funding';
import { alternatesFor, pageLocale, type Locale } from '@/i18n';
import text from '@/i18n/pages/funding';

export async function generateMetadata({ params }: PageProps<'/[lang]/funding'>): Promise<Metadata> {
    const lang = await pageLocale(params);
    const t = text[lang];
    return { title: t.title, description: t.description, alternates: alternatesFor('/funding', lang) };
}

// Rebuilt daily so that calls whose deadline has passed drop off.
export const revalidate = 86400;

const AUDIENCES: FundingAudience[] = ['startups', 'students', 'researchers', 'seed', 'outreach'];

const DATE_LOCALES: Record<Locale, string> = { fr: 'fr-CA', en: 'en-US' };

const formatDate = (iso: string, lang: Locale) =>
    new Intl.DateTimeFormat(DATE_LOCALES[lang], { month: 'short', day: 'numeric', year: 'numeric', timeZone: 'UTC' }).format(
        new Date(`${iso}T00:00:00Z`),
    );

export default async function FundingPage({ params }: PageProps<'/[lang]/funding'>) {
    const lang = await pageLocale(params);
    const t = text[lang];
    const today = new Date().toISOString().slice(0, 10);
    const open = fundingOpportunities[lang].filter((item) => !item.closes || item.closes >= today);

    return (
        <div className="container py-12">
            <PageHeader
                eyebrow={t.eyebrow}
                title={t.heading}
                subtitle={t.subtitle}
            />

            <section className="mb-12 rounded-2xl border border-neuro-accent/20 bg-neuro-accent/5 p-8">
                <h2 className="mb-3 flex items-center gap-2 text-xl font-bold">
                    <Search className="h-5 w-5 text-neuro-accent" /> {t.searchTitle}
                </h2>
                <ul className="space-y-2">
                    {FUNDING_FINDERS[lang].map((finder) => (
                        <li key={finder.href}>
                            <a
                                href={finder.href}
                                target="_blank"
                                rel="noopener noreferrer"
                                className="inline-flex items-center gap-1 font-semibold text-neuro-accent hover:underline"
                            >
                                {finder.name} <ArrowUpRight className="h-3.5 w-3.5" />
                            </a>
                            <p className="text-sm text-muted-foreground">{finder.about}</p>
                        </li>
                    ))}
                </ul>
                <h3 className="mb-2 mt-6 text-lg font-bold">{t.investorsTitle}</h3>
                <ul className="space-y-2">
                    {INVESTOR_DIRECTORIES[lang].map((directory) => (
                        <li key={directory.href}>
                            <a
                                href={directory.href}
                                target="_blank"
                                rel="noopener noreferrer"
                                className="inline-flex items-center gap-1 font-semibold text-neuro-accent hover:underline"
                            >
                                {directory.name} <ArrowUpRight className="h-3.5 w-3.5" />
                            </a>
                            <p className="text-sm text-muted-foreground">{directory.about}</p>
                        </li>
                    ))}
                </ul>
                <p className="mt-3 text-xs text-muted-foreground">{t.investorsNote}</p>
            </section>

            {AUDIENCES.map((audience) => {
                const items = open.filter((item) => item.audience === audience);
                if (items.length === 0) return null;
                return (
                    <section key={audience} className="mb-12">
                        <h2 className="mb-4 text-2xl font-bold">{t.audiences[audience]}</h2>
                        <div className="grid gap-6 md:grid-cols-2">
                            {items.map((item) => (
                                <article
                                    key={item.href}
                                    className={`flex flex-col rounded-xl border p-6 ${item.featured ? 'border-neuro-accent bg-neuro-accent/5 md:col-span-2' : 'border-[var(--border)] bg-[var(--surface-1)]'}`}
                                >
                                    <p className="mb-2 text-xs font-semibold uppercase tracking-wide text-neuro-accent">{item.featured ? t.featured : ''}{item.funder}</p>
                                    <h3 className="mb-2 text-lg font-bold">{item.name}</h3>
                                    <p className="flex-1 text-sm text-muted-foreground">{item.who}</p>
                                    <dl className="mt-4 space-y-1 text-sm">
                                        {item.amount && (
                                            <div>
                                                <dt className="inline font-semibold">{t.amount}</dt>
                                                <dd className="inline text-muted-foreground">{item.amount}</dd>
                                            </div>
                                        )}
                                        <div>
                                            <dt className="inline font-semibold">{t.deadline}</dt>
                                            <dd className="inline text-muted-foreground">
                                                {[item.closes && formatDate(item.closes, lang), item.timing].filter(Boolean).join('. ')}
                                            </dd>
                                        </div>
                                    </dl>
                                    <a
                                        href={item.href}
                                        target="_blank"
                                        rel="noopener noreferrer"
                                        className="mt-5 inline-flex items-center gap-1.5 text-sm font-semibold text-neuro-accent hover:underline"
                                    >
                                        {t.details} <ArrowUpRight width={15} height={15} />
                                    </a>
                                </article>
                            ))}
                        </div>
                    </section>
                );
            })}

            <section className="max-w-3xl">
                <p className="text-sm text-muted-foreground">
                    {t.checkedBefore}{formatDate(FUNDING_CHECKED, lang)}{t.checkedAfter}{' '}
                    <a className="text-neuro-accent underline" href="mailto:info@neurotechx.org">info@neurotechx.org</a>.
                </p>
                <p className="mt-4 text-sm text-muted-foreground">
                    {t.jobsBefore}<Link className="text-neuro-accent underline" href="/jobs">{t.jobsLink}</Link>{t.jobsAfter}
                </p>
            </section>
        </div>
    );
}
