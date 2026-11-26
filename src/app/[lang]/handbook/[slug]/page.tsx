import type { Metadata } from 'next';
import Link from '@/components/LocaleLink';
import { notFound } from 'next/navigation';
import { DockitRenderer } from '@/components/DockitRenderer';
import { alternatesFor, pageLocale } from '@/i18n';
import text from '@/i18n/pages/guide';
import { getContent, getHandbookSections } from '@/lib/dockit';

type Props = PageProps<'/[lang]/handbook/[slug]'>;

export function generateStaticParams(): { slug: string }[] {
    return getHandbookSections().flatMap((section) => section.pages.map((page) => ({ slug: page.slug })));
}

export const dynamicParams = false;

export async function generateMetadata({ params }: Props): Promise<Metadata> {
    const lang = await pageLocale(params);
    const { slug } = await params;
    const content = getContent('handbook', slug, lang);
    const name = text[content?.lang ?? lang].handbook.title;
    return {
        title: content ? `${content.frontmatter.title} · ${name}` : name,
        // Until it has French text, the French address points search engines at the English page
        alternates: content?.lang === lang ? alternatesFor(`/handbook/${slug}`, lang) : { canonical: `/handbook/${slug}` },
    };
}

export default async function HandbookArticlePage({ params }: Props) {
    const lang = await pageLocale(params);
    const { slug } = await params;
    const content = getContent('handbook', slug, lang);
    if (!content) {
        notFound();
    }

    // Previous and next page in the handbook's own order
    const order = getHandbookSections(lang).flatMap((section) => section.pages);
    const at = order.findIndex((page) => page.slug === slug);
    const prev = order[at - 1];
    const next = order[at + 1];

    return (
        <div className="container mx-auto px-4 py-8">
            <p className="mb-6 text-sm">
                <Link href="/handbook" className="text-neuro-accent hover:underline">{text[lang].handbook.back}</Link>
            </p>
            <DockitRenderer content={content} />
            <nav className="mt-12 flex justify-between gap-4 border-t border-[var(--border)] pt-6 text-sm">
                {prev ? <Link href={prev.href} className="text-neuro-accent hover:underline">← {prev.title}</Link> : <span />}
                {next ? <Link href={next.href} className="text-neuro-accent hover:underline">{next.title} →</Link> : <span />}
            </nav>
        </div>
    );
}
