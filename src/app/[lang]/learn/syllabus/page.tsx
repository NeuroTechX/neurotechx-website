import type { Metadata } from 'next';
import PageHeader from '@/components/PageHeader';
import Link from '@/components/LocaleLink';
import { alternatesFor, pageLocale } from '@/i18n';
import { BERKELEY_COURSE } from '@/content/learn/primer-chapters';
import { SYLLABUS_PATH, syllabusText } from '@/content/learn/syllabus';
import { getLessonSlugs } from '@/lib/lessons';

type Props = PageProps<'/[lang]/learn/syllabus'>;

export async function generateMetadata({ params }: Props): Promise<Metadata> {
    const lang = await pageLocale(params);
    const t = syllabusText[lang];
    return { title: t.title, description: t.intro, alternates: alternatesFor(SYLLABUS_PATH, lang) };
}

export default async function SyllabusPage({ params }: Props) {
    const lang = await pageLocale(params);
    const t = syllabusText[lang];
    const lessons = new Set(getLessonSlugs().map((slug) => `/learn/${slug}`));
    // On the French page, links to English-only pages (lessons, outside sites) say so.
    const isEnglish = (href: string) => !href.startsWith('/') || lessons.has(href);

    return (
        <div className="mx-auto max-w-4xl px-6 py-12">
            <div className="mb-6 flex flex-wrap gap-x-6 gap-y-2 text-sm">
                <Link href="/learn" className="text-neuro-accent hover:underline">← {t.back}</Link>
                <Link href="/students" className="text-neuro-accent hover:underline">{t.clubs} →</Link>
            </div>
            <PageHeader eyebrow={t.eyebrow} title={t.title} subtitle={t.intro} />

            <section className="card mb-6">
                <h2 className="mb-3 text-xl font-bold">{t.howTitle}</h2>
                <ul className="grid list-disc gap-2 pl-5 text-sm marker:text-neuro-accent sm:text-base">
                    {t.how.map((item) => <li key={item}>{item}</li>)}
                </ul>
            </section>
            <div className="mb-12 grid gap-4 md:grid-cols-2">
                <section className="rounded-lg border border-neuro-accent/25 bg-neuro-accent/5 p-4 text-sm">
                    <h2 className="mb-2 font-bold">{t.noHeadsetTitle}</h2>
                    <p>{t.noHeadset}</p>
                </section>
                <section className="rounded-lg border border-[var(--border-strong)] p-4 text-sm">
                    <h2 className="mb-2 font-bold">{t.modelTitle}</h2>
                    <p className="mb-2">{t.model}</p>
                    <a href={BERKELEY_COURSE} target="_blank" rel="noopener noreferrer" className="text-neuro-accent underline underline-offset-4">
                        {t.modelLink}{lang === 'fr' ? ` (${t.english})` : ''} ↗
                    </a>
                </section>
            </div>

            <ol className="grid gap-6">
                {t.weeks.map((week, index) => (
                    <li key={week.title} id={`week-${index + 1}`} className="card scroll-mt-24">
                        <p className="eyebrow mb-1">{t.week} {index + 1}</p>
                        <h2 className="mb-3 text-2xl font-bold">{week.title}</h2>
                        <p className="mb-4"><strong>{t.goal}</strong> {week.goal}</p>
                        <h3 className="mb-2 font-semibold">{t.activity}</h3>
                        <ul className="mb-4 grid gap-1.5 pl-5 text-sm list-disc marker:text-neuro-accent sm:text-base">
                            {week.activity.map((step) => <li key={step}>{step}</li>)}
                        </ul>
                        <p className="mb-2 text-sm"><strong>{t.prepare}</strong> {week.prepare}</p>
                        {week.talk && <p className="mb-2 text-sm"><strong>{t.talk}</strong> {week.talk}</p>}
                        <h3 className="mb-2 mt-4 font-semibold">{t.use}</h3>
                        <ul className="flex flex-wrap gap-x-6 gap-y-2 text-sm">
                            {week.links.map(({ label, href }) => (
                                <li key={href}>
                                    {href.startsWith('/') ? (
                                        <Link href={href} className="text-neuro-accent hover:underline">
                                            {label}{lang === 'fr' && isEnglish(href) ? ` (${t.english})` : ''} →
                                        </Link>
                                    ) : (
                                        <a href={href} target="_blank" rel="noopener noreferrer" className="text-neuro-accent hover:underline">
                                            {label}{lang === 'fr' ? ` (${t.english})` : ''} ↗
                                        </a>
                                    )}
                                </li>
                            ))}
                        </ul>
                    </li>
                ))}
            </ol>
        </div>
    );
}
