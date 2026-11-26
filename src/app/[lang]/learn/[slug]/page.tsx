import type { Metadata } from 'next';
import { notFound } from 'next/navigation';
import { MDXRemote } from 'next-mdx-remote/rsc';
import remarkGfm from 'remark-gfm';
import rehypeSlug from 'rehype-slug';
import Link from '@/components/LocaleLink';
import { MdxLink } from '@/components/DockitRenderer';
import { pageLocale } from '@/i18n';
import text from '@/i18n/pages/learn';
import { getLesson, getLessonSlugs, getModules } from '@/lib/lessons';

type Props = PageProps<'/[lang]/learn/[slug]'>;

const REPO = 'https://github.com/NeuroTechX/neurotechx-website/edit/main/src/content/lessons';

export function generateStaticParams(): { slug: string }[] {
    return getLessonSlugs().map((slug) => ({ slug }));
}

export const dynamicParams = false;

export async function generateMetadata({ params }: Props): Promise<Metadata> {
    const { slug } = await params;
    const lesson = getLesson(slug);
    // The lessons are English only, so the French address points search engines at the English page
    return lesson
        ? { title: `${lesson.title} · NeuroTechX`, description: lesson.description, alternates: { canonical: `/learn/${slug}` } }
        : {};
}

export default async function LessonPage({ params }: Props) {
    const lang = await pageLocale(params);
    const { slug } = await params;
    const lesson = getLesson(slug);
    if (!lesson) {
        notFound();
    }
    const t = text[lang];

    // Previous and next lesson within the same module
    const order = getModules()[lesson.module];
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
            <article lang="en" className="prose prose-invert max-w-none prose-a:text-neuro-accent prose-img:rounded-lg">
                <h1>{lesson.title}</h1>
                {lesson.description && <p className="lead">{lesson.description}</p>}
                <MDXRemote
                    source={lesson.content}
                    components={{ a: MdxLink }}
                    options={{ mdxOptions: { format: 'md', remarkPlugins: [remarkGfm], rehypePlugins: [rehypeSlug] } }}
                />
            </article>
            <p className="mt-10 text-sm text-muted-foreground">
                {t.lesson.origin}{' '}
                <a href={`https://web.archive.org/web/2025/${lesson.sourceUrl}`} target="_blank" rel="noopener noreferrer" className="text-neuro-accent hover:underline">{t.lesson.original}</a>
                {' · '}
                <a href={`${REPO}/${slug}.md`} target="_blank" rel="noopener noreferrer" className="text-neuro-accent hover:underline">{t.lesson.improve}</a>
            </p>
            <nav className="mt-6 flex justify-between gap-4 border-t border-[var(--border)] pt-6 text-sm">
                {prev ? <Link href={`/learn/${prev.slug}`} className="text-neuro-accent hover:underline">← {prev.title}</Link> : <span />}
                {next ? <Link href={`/learn/${next.slug}`} className="text-neuro-accent hover:underline">{next.title} →</Link> : <span />}
            </nav>
        </div>
    );
}
