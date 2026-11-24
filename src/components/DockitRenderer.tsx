import { MDXRemote } from 'next-mdx-remote/rsc';
import remarkGfm from 'remark-gfm';
import { DockitContent } from '@/lib/dockit';

interface DockitRendererProps {
    content: DockitContent;
    // Name shown on the "Source:" line; the repository the page is synced from
    sourceLabel?: string;
}

export function DockitRenderer({ content, sourceLabel = 'NTX-dockit' }: DockitRendererProps) {
    // The synced body opens with its own "# Title"; drop it when it repeats the page title
    const heading = content.content.match(/^\s*# (.+)\n/);
    const body = heading && heading[1].trim().toLowerCase() === content.frontmatter.title.toLowerCase()
        ? content.content.slice(heading[0].length)
        : content.content;

    return (
        <div className="prose prose-invert max-w-none prose-a:text-neuro-accent">
            <h1>{content.frontmatter.title}</h1>
            {content.frontmatter.sourceUrl && (
                <p className="text-sm text-gray-500 mb-8">
                    Source: <a href={content.frontmatter.sourceUrl} target="_blank" rel="noopener noreferrer" className="hover:underline">{sourceLabel}</a>
                </p>
            )}
            <MDXRemote source={body} options={{ mdxOptions: { remarkPlugins: [remarkGfm] } }} />
        </div>
    );
}
