import type { Metadata } from 'next';
import { Activity, ArrowRight, BookOpenCheck, ExternalLink } from 'lucide-react';
import Link from '@/components/LocaleLink';
import PageHeader from '@/components/PageHeader';
import { alternatesFor, pageLocale } from '@/i18n';
import type { Locale } from '@/i18n/routes';
import text from '@/i18n/pages/learn';
import primerText from '@/i18n/pages/primer';
import { learnPaths, modalityGroups } from '@/content/learn/paths';
import { firstEegText } from '@/content/learn/first-eeg';
import { erpText } from '@/content/learn/erp-averaging';
import { capstoneText } from '@/content/learn/eeg-capstone';
import { filteringText } from '@/content/learn/eeg-filtering';
import { mriText } from '@/content/learn/mri-and-bold';
import { signalsText } from '@/content/learn/signals';
import { SYLLABUS_PATH, syllabusText } from '@/content/learn/syllabus';
import {
    BERKELEY_COURSE, BERKELEY_TEXTBOOK, EEG_CAPSTONE_PATH, ERP_LAB_PATH, FILTERING_LAB_PATH, FIRST_EEG_PATH, MRI_LAB_PATH,
    SIGNALS_LAB_PATH, primerChapterPdf, primerCheckPath,
} from '@/content/learn/primer-chapters';
import { getContributors, getModules, type Module } from '@/lib/lessons';

export async function generateMetadata({ params }: PageProps<'/[lang]/learn'>): Promise<Metadata> {
    const lang = await pageLocale(params);
    const t = learnPaths[lang];
    return { title: t.title, description: t.intro, alternates: alternatesFor('/learn', lang) };
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

function ResourceSection({ title, lead, children }: {
    title: string;
    lead: string;
    children: React.ReactNode;
}) {
    return (
        <section className="mb-14">
            <h2 className="mb-2 text-3xl font-serif font-bold">{title}</h2>
            <p className="mb-6 max-w-3xl text-muted-foreground">{lead}</p>
            {children}
        </section>
    );
}

export default async function LearnPage({ params }: PageProps<'/[lang]/learn'>) {
    const lang = await pageLocale(params);
    const t = text[lang];
    const { understand, track, build, people } = t.steps;
    const paths = learnPaths[lang];
    const lab = firstEegText[lang];
    const { chapters } = primerText[lang];
    const labs = [
        { href: SIGNALS_LAB_PATH, content: signalsText[lang] },
        { href: FILTERING_LAB_PATH, content: filteringText[lang] },
        { href: ERP_LAB_PATH, content: erpText[lang] },
        { href: EEG_CAPSTONE_PATH, content: capstoneText[lang] },
        { href: MRI_LAB_PATH, content: mriText[lang] },
    ];
    const modules = getModules(lang);
    const resource = (item: Item) => <Resource key={item.name} item={item} lang={lang} englishLabel={t.english} />;
    return (
        <div className="container py-12">
            <PageHeader title={paths.title} subtitle={paths.intro} />

            <div className="mb-14 grid gap-5 lg:grid-cols-[1.1fr_1fr]">
                <section className="rounded-2xl border border-neuro-accent/30 bg-gradient-to-br from-neuro-accent/10 to-[var(--surface-1)] p-6 sm:p-8">
                    <Activity aria-hidden className="mb-5 text-neuro-accent" size={28} />
                    <p className="mb-2 text-sm font-semibold text-neuro-accent">{lab.requirements}</p>
                    <h2 className="mb-3 text-3xl font-bold">{lab.title}</h2>
                    <p className="mb-6 max-w-prose text-muted-foreground">{lab.intro}</p>
                    <div className="flex flex-wrap items-center gap-x-5 gap-y-3">
                        <Link href={FIRST_EEG_PATH} className="inline-flex items-center gap-2 rounded-full bg-neuro-accent px-5 py-2.5 text-sm font-bold text-background hover:text-background hover:brightness-110">
                            {paths.start} <ArrowRight aria-hidden size={16} />
                        </Link>
                        <a href="#modalities" className="text-sm font-semibold text-neuro-accent underline underline-offset-4">{paths.browse}</a>
                    </div>
                </section>
                <section className="card p-6 sm:p-8">
                    <BookOpenCheck aria-hidden className="mb-5 text-neuro-accent" size={28} />
                    <h2 className="mb-2 text-2xl font-bold">{paths.primer}</h2>
                    <p className="mb-4 text-sm text-muted-foreground">{paths.primerBody}</p>
                    <ul className="mb-4 divide-y divide-[var(--border)]">
                        {([{ chapter: 2, slug: 'eeg' }, { chapter: 4, slug: 'fmri' }, { chapter: 16, slug: 'neuroethics' }] as const).map(({ chapter, slug }) => (
                            <li key={slug} className="flex flex-wrap items-baseline justify-between gap-x-4 gap-y-1 py-2 text-sm">
                                <span>{chapters[chapter - 1]}</span>
                                <Link href={primerCheckPath(slug)} aria-label={`${paths.check} · ${chapters[chapter - 1]}`} className="shrink-0 font-semibold text-neuro-accent hover:underline">
                                    {paths.check} →
                                </Link>
                            </li>
                        ))}
                    </ul>
                    <Link href="/primer#chapters" className="text-sm text-neuro-accent underline underline-offset-4">{paths.allChapters}</Link>
                </section>
            </div>

            <ResourceSection title={paths.labs} lead={paths.labsIntro}>
                <div className="grid gap-4 md:grid-cols-2">
                    {labs.map(({ href, content }) => resource({ name: content.title, body: content.intro, href, english: false }))}
                </div>
                <p className="mt-5 rounded-lg border border-neuro-accent/25 bg-neuro-accent/5 p-4 text-sm">
                    {syllabusText[lang].cta}{' '}
                    <Link href={SYLLABUS_PATH} className="font-semibold text-neuro-accent hover:underline">{syllabusText[lang].ctaLink} →</Link>
                </p>
            </ResourceSection>

            <section id="modalities" className="mb-14 scroll-mt-24">
                <h2 className="mb-2 text-3xl font-bold">{paths.modalityTitle}</h2>
                <p className="mb-6 max-w-3xl text-muted-foreground">{paths.modalityIntro}</p>
                <div className="grid items-start gap-4 md:grid-cols-3">
                    {modalityGroups.map((group, index) => (
                        <div key={paths.modalityGroups[index]} className="card">
                            <h3 className="mb-3 text-lg font-bold">{paths.modalityGroups[index]}</h3>
                            <ul className="divide-y divide-[var(--border)]">
                                {group.map((chapter) => (
                                    <li key={chapter} className="py-2">
                                        <a href={primerChapterPdf(chapter)} className="font-semibold text-neuro-accent hover:underline">
                                            {chapters[chapter - 1]} <span className="sr-only">({paths.readPdf})</span>
                                        </a>
                                        <p className="text-sm text-muted-foreground">{paths.modalityDescriptions[chapter]}</p>
                                    </li>
                                ))}
                            </ul>
                        </div>
                    ))}
                </div>
            </section>

            <ResourceSection title={paths.berkeley} lead={paths.berkeleyIntro}>
                <div className="grid gap-4 md:grid-cols-2">
                    {resource({ name: paths.course, body: paths.courseBody, href: BERKELEY_COURSE, english: true })}
                    {resource({ name: paths.textbook, body: paths.textbookBody, href: BERKELEY_TEXTBOOK, english: true })}
                </div>
                <h3 className="mb-2 mt-5 font-bold">{paths.tools}</h3>
                <ul className="flex flex-wrap gap-x-6 gap-y-2 text-sm text-neuro-accent">
                    <li><a href="https://eegedu.com/" className="underline underline-offset-4">{paths.eegEdu}</a></li>
                    <li><a href="https://gloneuro.org/sim-eeg.html" className="underline underline-offset-4">{paths.erp}</a></li>
                </ul>
            </ResourceSection>

            <section id="lessons" className="mb-14 scroll-mt-24">
                <p className="eyebrow mb-1">{t.lessons.eyebrow}</p>
                <h2 className="mb-2 text-3xl font-serif font-bold">{t.lessons.title}</h2>
                <p className="mb-6 max-w-3xl text-muted-foreground">{t.lessons.lead}</p>
                <div className="grid gap-6 lg:grid-cols-2">
                    {(Object.keys(modules) as Module[]).map((key) => (
                        <div key={key} className="rounded-xl border border-[var(--border-strong)] bg-[var(--surface-1)] p-6">
                            <h3 className="mb-1 text-xl font-bold">{t.lessons.modules[key]}</h3>
                            <p className="mb-4 text-sm text-muted-foreground">{t.lessons.moduleLead[key]}</p>
                            <ol className="grid gap-2">
                                {modules[key].map((lesson, i) => (
                                    <li key={lesson.slug} className="flex gap-3">
                                        <span className="w-6 shrink-0 text-right text-sm font-semibold text-muted-foreground">{i + 1}.</span>
                                        <span>
                                            <Link href={`/learn/${lesson.slug}`} lang={lesson.lang} className="font-medium hover:text-neuro-accent hover:underline">{lesson.title}</Link>
                                            {lang === 'fr' && lesson.lang === 'en' && (
                                                <span className="ml-2 rounded bg-muted px-2 py-0.5 text-xs">{t.english}</span>
                                            )}
                                        </span>
                                    </li>
                                ))}
                            </ol>
                        </div>
                    ))}
                </div>
                <p className="mt-6 max-w-3xl text-sm text-muted-foreground">
                    {t.lessons.credits} {getContributors().map((person) => person.name).join(', ')}{' '}
                    <a href="https://github.com/NeuroTechX/learn.neurotechedu.com/graphs/contributors" target="_blank" rel="noopener noreferrer" className="text-neuro-accent hover:underline">
                        {t.lessons.creditsMore}
                    </a>.
                </p>
            </section>

            <ResourceSection title={understand.title} lead={understand.lead}>
                <div className="grid gap-4 md:grid-cols-3">{understand.items.map(resource)}</div>
            </ResourceSection>

            <ResourceSection title={track.title} lead={track.lead}>
                <div className="grid gap-6 lg:grid-cols-2">
                    {track.tracks.map((path) => (
                        <div key={path.title} className="rounded-xl border border-[var(--border-strong)] bg-[var(--surface-1)] p-6">
                            <h3 className="mb-1 text-xl font-bold">{path.title}</h3>
                            <p className="mb-4 text-sm text-muted-foreground">{path.body}</p>
                            <div className="grid gap-3">{path.items.map(resource)}</div>
                        </div>
                    ))}
                </div>
            </ResourceSection>

            <ResourceSection title={build.title} lead={build.lead}>
                <div className="grid gap-4 md:grid-cols-2">{build.items.map(resource)}</div>
            </ResourceSection>

            <ResourceSection title={people.title} lead={people.lead}>
                <div className="grid gap-4 md:grid-cols-2">{people.items.map(resource)}</div>
            </ResourceSection>

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
