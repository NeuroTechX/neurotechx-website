import type { Metadata } from 'next';
import { notFound } from 'next/navigation';
import { MDXRemote } from 'next-mdx-remote/rsc';
import remarkGfm from 'remark-gfm';
import rehypeSlug from 'rehype-slug';
import Link from '@/components/LocaleLink';
import { MdxLink } from '@/components/DockitRenderer';
import { alternatesFor, pageLocale } from '@/i18n';
import text from '@/i18n/pages/learn';
import { getContributors, getLesson, getLessonSlugs, getModules } from '@/lib/lessons';
import { erpText } from '@/content/learn/erp-averaging';
import { filteringText } from '@/content/learn/eeg-filtering';
import { firstEegText } from '@/content/learn/first-eeg';
import { fnirsText } from '@/content/learn/fnirs-kernel';
import { hdEegText } from '@/content/learn/hd-eeg';
import { lessonCheckText, lessonChecks } from '@/content/learn/lesson-checks';
import ChapterQuestion from '@/components/learn/ChapterQuestion';
import { ERP_LAB_PATH, FILTERING_LAB_PATH, FIRST_EEG_PATH, FNIRS_LAB_PATH, primerCheckPath } from '@/content/learn/primer-chapters';
import { HD_EEG_LAB_PATH } from '@/content/learn/primer-chapters';

type Props = PageProps<'/[lang]/learn/[slug]'>;

const REPO = 'https://github.com/NeuroTechX/neurotechx-website/edit/main/src/content/lessons';
const EEG_LESSONS = new Set(['intro-to-bci', 'preprocessing', 'neural-oscillations']);

export function generateStaticParams(): { slug: string }[] {
    return getLessonSlugs().map((slug) => ({ slug }));
}

export const dynamicParams = false;

export async function generateMetadata({ params }: Props): Promise<Metadata> {
    const lang = await pageLocale(params);
    const { slug } = await params;
    if (!getLesson(slug)) {
        return {};
    }
    const lesson = getLesson(slug, lang)!;
    // A lesson with a French file has its own French page. Without one, the French address shows
    // the English text, so it points search engines at the English page.
    const alternates = getLesson(slug, 'fr')?.lang === 'fr' ? alternatesFor(`/learn/${slug}`, lang) : { canonical: `/learn/${slug}` };
    return { title: lesson.title, description: lesson.description, alternates };
}

export default async function LessonPage({ params }: Props) {
    const lang = await pageLocale(params);
    const { slug } = await params;
    const lesson = getLesson(slug, lang);
    if (!lesson) {
        notFound();
    }
    const t = text[lang];
    const checks = lessonChecks[slug]?.[lang] ?? [];
    const authors = getContributors().filter((person) => person.lessons.includes(slug));
    const relatedLabs: Partial<Record<string, { href: string; title: string }>> = {
        preprocessing: { href: FILTERING_LAB_PATH, title: filteringText[lang].title },
        'event-related-potentials': { href: ERP_LAB_PATH, title: erpText[lang].title },
        'fnirs-basics': { href: FNIRS_LAB_PATH, title: fnirsText[lang].title },
        'eeg-headsets': { href: HD_EEG_LAB_PATH, title: hdEegText[lang].title },
    };
    const lab = relatedLabs[slug];

    // Previous and next lesson within the same module
    const order = getModules(lang)[lesson.module];
    const at = order.findIndex((item) => item.slug === slug);
    const prev = order[at - 1];
    const next = order[at + 1];

    return (
        <div className="container mx-auto px-4 py-8">
            <p className="mb-6 text-sm">
                <Link href="/learn#lessons" className="text-neuro-accent hover:underline">{t.lesson.back}</Link>
            </p>
            <p className="mb-2 text-sm font-semibold text-muted-foreground">
                {t.lessons.modules[lesson.module]} · {t.lesson.lessonOf.replace('{n}', String(at + 1)).replace('{total}', String(order.length))}
            </p>
            {lab && (
                <div className="my-4 rounded-lg border border-neuro-accent/25 bg-neuro-accent/5 p-4 text-sm font-semibold">
                    <Link href={lab.href} className="text-neuro-accent hover:underline">{lab.title} →</Link>
                </div>
            )}
            <article lang={lesson.lang} className="prose prose-invert max-w-none prose-a:text-neuro-accent prose-img:rounded-lg prose-td:align-top [&_td_img]:my-0 [&_td_img]:max-w-48">
                <h1>{lesson.title}</h1>
                {lesson.description && <p className="lead">{lesson.description}</p>}
                {authors.length > 0 && (
                    <p className="text-sm text-muted-foreground">
                        {t.lesson.by} {authors.map((person) => person.name).join(', ')}
                    </p>
                )}
                <MDXRemote
                    source={lesson.content}
                    components={{ a: MdxLink }}
                    options={{ mdxOptions: { format: 'md', remarkPlugins: [remarkGfm], rehypePlugins: [rehypeSlug] } }}
                />
            </article>
            {EEG_LESSONS.has(slug) && (
                <div className="mt-8 flex flex-wrap gap-x-6 gap-y-2 rounded-lg border border-neuro-accent/25 bg-neuro-accent/5 p-4 text-sm font-semibold">
                    <Link href={FIRST_EEG_PATH} className="text-neuro-accent hover:underline">{firstEegText[lang].title} →</Link>
                    <Link href={primerCheckPath('eeg')} className="text-neuro-accent hover:underline">{firstEegText[lang].selfCheck} →</Link>
                </div>
            )}
            {checks.length > 0 && (
                <section className="mt-10">
                    <h2 className="mb-1 text-2xl font-bold">{lessonCheckText[lang].title}</h2>
                    <p className="mb-4 text-sm text-muted-foreground">{lessonCheckText[lang].lead}</p>
                    <div className="grid gap-4">
                        {checks.map((question) => <ChapterQuestion key={question.prompt} question={question} lang={lang} />)}
                    </div>
                </section>
            )}
            <p className="mt-10 text-sm text-muted-foreground">
                {lesson.sourceUrl && (
                    <>
                        {t.lesson.origin}{' '}
                        <a href={`https://web.archive.org/web/2025/${lesson.sourceUrl}`} target="_blank" rel="noopener noreferrer" className="text-neuro-accent hover:underline">{t.lesson.original}</a>
                        {' · '}
                    </>
                )}
                <a href={`${REPO}/${slug}${lesson.lang === 'fr' ? '.fr' : ''}.md`} target="_blank" rel="noopener noreferrer" className="text-neuro-accent hover:underline">{t.lesson.improve}</a>
            </p>
            <nav className="mt-6 flex justify-between gap-4 border-t border-[var(--border)] pt-6 text-sm">
                {prev ? <Link href={`/learn/${prev.slug}`} lang={prev.lang} className="text-neuro-accent hover:underline">← {prev.title}</Link> : <span />}
                {next ? <Link href={`/learn/${next.slug}`} lang={next.lang} className="text-neuro-accent hover:underline">{next.title} →</Link> : <span />}
            </nav>
        </div>
    );
}
