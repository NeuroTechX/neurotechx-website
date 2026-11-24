import type { Metadata } from 'next';
import Link from 'next/link';
import { notFound } from 'next/navigation';
import { DockitRenderer } from '@/components/DockitRenderer';
import { getContent, getSections } from '@/lib/dockit';

type Params = { slug: string };

// Pages with their own address elsewhere on the site (e.g. /community/growth) are not repeated here
function guidePages() {
    return getSections('dockit')
        .flatMap((section) => section.pages)
        .filter((page) => page.href === `/guide/${page.slug}`);
}

export function generateStaticParams(): Params[] {
    return guidePages().map((page) => ({ slug: page.slug }));
}

export const dynamicParams = false;

export async function generateMetadata({ params }: { params: Promise<Params> }): Promise<Metadata> {
    const { slug } = await params;
    const content = getContent('dockit', slug);
    return {
        title: content ? `${content.frontmatter.title} · Chapter and Club Guide` : 'Chapter and Club Guide',
        alternates: { canonical: `/guide/${slug}` },
    };
}

export default async function GuideArticlePage({ params }: { params: Promise<Params> }) {
    const { slug } = await params;
    const content = getContent('dockit', slug);
    if (!content) {
        notFound();
    }

    // Previous and next page in the guide's own order
    const order = getSections('dockit').flatMap((section) => section.pages);
    const at = order.findIndex((page) => page.slug === slug);
    const prev = order[at - 1];
    const next = order[at + 1];

    return (
        <div className="container mx-auto px-4 py-8">
            <p className="mb-6 text-sm">
                <Link href="/guide" className="text-neuro-accent hover:underline">← Chapter and club guide</Link>
            </p>
            <DockitRenderer content={content} />
            <nav className="mt-12 flex justify-between gap-4 border-t border-[var(--border)] pt-6 text-sm">
                {prev ? <Link href={prev.href} className="text-neuro-accent hover:underline">← {prev.title}</Link> : <span />}
                {next ? <Link href={next.href} className="text-neuro-accent hover:underline">{next.title} →</Link> : <span />}
            </nav>
        </div>
    );
}
