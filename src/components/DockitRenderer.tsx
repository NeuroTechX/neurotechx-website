import { MDXRemote } from 'next-mdx-remote/rsc';
import remarkGfm from 'remark-gfm';
import { DockitContent } from '@/lib/dockit';

interface DockitRendererProps {
    content: DockitContent;
}

export function DockitRenderer({ content }: DockitRendererProps) {
    // The synced body opens with its own "# Title"; drop it when it repeats the page title
    const heading = content.content.match(/^\s*# (.+)\n/);
    const body = heading && heading[1].trim().toLowerCase() === content.frontmatter.title.toLowerCase()
        ? content.content.slice(heading[0].length)
        : content.content;

    return (
        <div className="prose prose-invert max-w-none prose-a:text-neuro-accent">
            <h1>{content.frontmatter.title}</h1>
            <MDXRemote source={body} options={{ mdxOptions: { remarkPlugins: [remarkGfm] } }} />
        </div>
    );
}
