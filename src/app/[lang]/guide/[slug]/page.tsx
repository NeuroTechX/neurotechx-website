import type { Metadata } from 'next';
import Link from '@/components/LocaleLink';
import { notFound } from 'next/navigation';
import { DockitRenderer } from '@/components/DockitRenderer';
import { alternatesFor, pageLocale } from '@/i18n';
import text from '@/i18n/pages/guide';
import { getContent, getSections } from '@/lib/dockit';

type Props = PageProps<'/[lang]/guide/[slug]'>;

// Pages with their own address elsewhere on the site (e.g. /community/growth) are not repeated here
function guidePages() {
    return getSections('dockit')
        .flatMap((section) => section.pages)
        .filter((page) => page.href === `/guide/${page.slug}`);
}

export function generateStaticParams(): { slug: string }[] {
    return guidePages().map((page) => ({ slug: page.slug }));
}

export const dynamicParams = false;

export async function generateMetadata({ params }: Props): Promise<Metadata> {
    const lang = await pageLocale(params);
    const { slug } = await params;
    const content = getContent('dockit', slug, lang);
    const name = text[content?.lang ?? lang].guide.title;
    return {
        title: content ? `${content.frontmatter.title} · ${name}` : name,
        // Until it has French text, the French address points search engines at the English page
        alternates: content?.lang === lang ? alternatesFor(`/guide/${slug}`, lang) : { canonical: `/guide/${slug}` },
    };
}

export default async function GuideArticlePage({ params }: Props) {
    const lang = await pageLocale(params);
    const { slug } = await params;
    const content = getContent('dockit', slug, lang);
    if (!content) {
        notFound();
    }

    // Previous and next page in the guide's own order
    const order = getSections('dockit', lang).flatMap((section) => section.pages);
    const at = order.findIndex((page) => page.slug === slug);
    const prev = order[at - 1];
    const next = order[at + 1];

    return (
        <div className="container mx-auto px-4 py-8">
            <p className="mb-6 text-sm">
                <Link href="/guide" className="text-neuro-accent hover:underline">{text[lang].guide.back}</Link>
            </p>
            <DockitRenderer content={content} />
            <nav className="mt-12 flex justify-between gap-4 border-t border-[var(--border)] pt-6 text-sm">
                {prev ? <Link href={prev.href} className="text-neuro-accent hover:underline">← {prev.title}</Link> : <span />}
                {next ? <Link href={next.href} className="text-neuro-accent hover:underline">{next.title} →</Link> : <span />}
            </nav>
        </div>
    );
}
