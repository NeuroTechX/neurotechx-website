import type { Metadata } from 'next';
import Link from '@/components/LocaleLink';
import { notFound } from 'next/navigation';
import { DockitRenderer } from '@/components/DockitRenderer';
import { getContent, getHandbookSections } from '@/lib/dockit';

type Params = { slug: string };

export function generateStaticParams(): Params[] {
    return getHandbookSections().flatMap((section) => section.pages.map((page) => ({ slug: page.slug })));
}

export const dynamicParams = false;

export async function generateMetadata({ params }: { params: Promise<Params> }): Promise<Metadata> {
    const { slug } = await params;
    const content = getContent('handbook', slug);
    return {
        title: content ? `${content.frontmatter.title} · Volunteer Handbook` : 'Volunteer Handbook',
        alternates: { canonical: `/handbook/${slug}` },
    };
}

export default async function HandbookArticlePage({ params }: { params: Promise<Params> }) {
    const { slug } = await params;
    const content = getContent('handbook', slug);
    if (!content) {
        notFound();
    }

    // Previous and next page in the handbook's own order
    const order = getHandbookSections().flatMap((section) => section.pages);
    const at = order.findIndex((page) => page.slug === slug);
    const prev = order[at - 1];
    const next = order[at + 1];

    return (
        <div className="container mx-auto px-4 py-8">
            <p className="mb-6 text-sm">
                <Link href="/handbook" className="text-neuro-accent hover:underline">← Volunteer handbook</Link>
            </p>
            <DockitRenderer content={content} />
            <nav className="mt-12 flex justify-between gap-4 border-t border-[var(--border)] pt-6 text-sm">
                {prev ? <Link href={prev.href} className="text-neuro-accent hover:underline">← {prev.title}</Link> : <span />}
                {next ? <Link href={next.href} className="text-neuro-accent hover:underline">{next.title} →</Link> : <span />}
            </nav>
        </div>
    );
}
