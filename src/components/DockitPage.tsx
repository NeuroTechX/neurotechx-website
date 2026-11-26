import type { Metadata } from 'next';
import { notFound } from 'next/navigation';
import { DockitRenderer } from '@/components/DockitRenderer';
import { getDockitContent } from '@/lib/dockit';
import { alternatesFor, type Locale } from '@/i18n';
import text from '@/i18n/pages/guide';

// A page of the chapter and club guide that has its own address (e.g. /community/growth).
type Slug = keyof (typeof text)['en']['pages'];

export function dockitMetadata(slug: Slug, path: string, lang: Locale): Metadata {
    const content = getDockitContent(slug, lang);
    if (!content) return {};
    return {
        title: content.frontmatter.title,
        description: text[content.lang].pages[slug],
        // Until it has French text, the French address points search engines at the English page
        alternates: content.lang === lang ? alternatesFor(path, lang) : { canonical: path },
    };
}

export default function DockitPage({ slug, lang }: { slug: Slug; lang: Locale }) {
    const content = getDockitContent(slug, lang);
    if (!content) notFound();
    return (
        <div className="container mx-auto px-4 py-8">
            <DockitRenderer content={content} />
        </div>
    );
}
