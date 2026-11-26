import type { Metadata } from 'next';
import { ArrowRight, ExternalLink } from 'lucide-react';
import Link from '@/components/LocaleLink';
import PageHeader from '@/components/PageHeader';
import { alternatesFor, pageLocale } from '@/i18n';
import type { Locale } from '@/i18n/routes';
import text from '@/i18n/pages/learn';

export async function generateMetadata({ params }: PageProps<'/[lang]/learn'>): Promise<Metadata> {
    const lang = await pageLocale(params);
    const t = text[lang];
    return { title: t.title, description: t.description, alternates: alternatesFor('/learn', lang) };
}

type Item = { name: string; body: string; href: string; english: boolean };

// One resource: pages on this site stay in the reader's language, outside links open in a new tab.
// On the French page, resources whose text is English say so.
function Resource({ item, lang, englishLabel }: { item: Item; lang: Locale; englishLabel: string }) {
    const inner = (
        <>
            <span className="flex items-center gap-1.5 font-bold group-hover:text-neuro-accent">
                {item.name}
                {item.href.startsWith('/') ? <ArrowRight size={14} /> : <ExternalLink size={14} />}
            </span>
            <span className="mt-1 block text-sm text-muted-foreground">{item.body}</span>
            {lang === 'fr' && item.english && (
                <span className="mt-2 inline-block rounded bg-muted px-2 py-0.5 text-xs">{englishLabel}</span>
            )}
        </>
    );
    const className = 'card group block p-5 transition-colors hover:border-neuro-accent';
    return item.href.startsWith('/') ? (
        <Link href={item.href} className={className}>{inner}</Link>
    ) : (
        <a href={item.href} target="_blank" rel="noopener noreferrer" className={className}>{inner}</a>
    );
}

function Step({ n, label, title, lead, children }: {
    n: number;
    label: string;
    title: string;
    lead: string;
    children: React.ReactNode;
}) {
    return (
        <section className="mb-14 grid gap-6 md:grid-cols-[3rem_1fr]">
            <div className="flex h-12 w-12 items-center justify-center rounded-full bg-neuro-accent text-xl font-bold text-[var(--background)]" aria-hidden>
                {n}
            </div>
            <div>
                <p className="eyebrow mb-1">{label} {n}</p>
                <h2 className="mb-2 text-3xl font-serif font-bold">{title}</h2>
                <p className="mb-6 max-w-3xl text-muted-foreground">{lead}</p>
                {children}
            </div>
        </section>
    );
}

export default async function LearnPage({ params }: PageProps<'/[lang]/learn'>) {
    const lang = await pageLocale(params);
    const t = text[lang];
    const { understand, track, build, people } = t.steps;
    const resource = (item: Item) => <Resource key={item.name} item={item} lang={lang} englishLabel={t.english} />;
    return (
        <div className="container py-12">
            <PageHeader eyebrow={t.eyebrow} title={t.title} subtitle={t.subtitle} />

            <p className="mb-14 max-w-3xl rounded-xl border border-neuro-accent/30 bg-neuro-accent/5 p-6 text-lg">
                {t.noNeed}
            </p>

            <Step n={1} label={t.step} title={understand.title} lead={understand.lead}>
                <div className="grid gap-4 md:grid-cols-3">{understand.items.map(resource)}</div>
            </Step>

            <Step n={2} label={t.step} title={track.title} lead={track.lead}>
                <div className="grid gap-6 lg:grid-cols-2">
                    {track.tracks.map((path) => (
                        <div key={path.title} className="rounded-xl border border-[var(--border-strong)] bg-[var(--surface-1)] p-6">
                            <h3 className="mb-1 text-xl font-bold">{path.title}</h3>
                            <p className="mb-4 text-sm text-muted-foreground">{path.body}</p>
                            <div className="grid gap-3">{path.items.map(resource)}</div>
                        </div>
                    ))}
                </div>
            </Step>

            <Step n={3} label={t.step} title={build.title} lead={build.lead}>
                <div className="grid gap-4 md:grid-cols-2">{build.items.map(resource)}</div>
            </Step>

            <Step n={4} label={t.step} title={people.title} lead={people.lead}>
                <div className="grid gap-4 md:grid-cols-2">{people.items.map(resource)}</div>
            </Step>

            <section className="mb-14">
                <p className="eyebrow mb-1">{t.launch.eyebrow}</p>
                <h2 className="mb-2 text-3xl font-serif font-bold">{t.launch.title}</h2>
                <p className="mb-6 max-w-3xl text-muted-foreground">{t.launch.lead}</p>
                <ol className="grid gap-6 md:grid-cols-2 lg:grid-cols-4">
                    {t.launch.stages.map((stage, i) => (
                        <li key={stage.title} className="flex flex-col rounded-xl border border-[var(--border-strong)] bg-[var(--surface-1)] p-6">
                            <span className="mb-3 flex h-9 w-9 items-center justify-center rounded-full border-2 border-neuro-accent font-bold text-neuro-accent" aria-hidden>
                                {i + 1}
                            </span>
                            <h3 className="mb-1 text-lg font-bold">{stage.title}</h3>
                            <p className="mb-4 text-sm text-muted-foreground">{stage.body}</p>
                            <div className="mt-auto grid gap-3">{stage.items.map(resource)}</div>
                        </li>
                    ))}
                </ol>
            </section>

            <section className="mb-14 rounded-xl bg-muted p-8">
                <h2 className="mb-2 text-2xl font-serif font-bold">{t.further.title}</h2>
                <p className="mb-6 max-w-3xl text-muted-foreground">{t.further.body}</p>
                <Link href="/education" className="inline-flex items-center gap-2 rounded-full bg-foreground px-6 py-3 font-bold text-background transition-opacity hover:opacity-90">
                    {t.further.cta} <ArrowRight size={16} />
                </Link>
            </section>

            <section>
                <h2 className="mb-6 text-2xl font-serif font-bold">{t.faq.title}</h2>
                <dl className="grid max-w-3xl gap-6">
                    {t.faq.items.map((item) => (
                        <div key={item.q}>
                            <dt className="mb-1 font-bold">{item.q}</dt>
                            <dd className="text-muted-foreground">{item.a}</dd>
                        </div>
                    ))}
                </dl>
            </section>
        </div>
    );
}
