import { MDXRemote } from 'next-mdx-remote/rsc';
import remarkGfm from 'remark-gfm';
import type { ComponentProps } from 'react';
import LocaleLink from '@/components/LocaleLink';
import { DockitContent } from '@/lib/dockit';

// Links between site pages stay in the reader's language
function MdxLink({ href = '', ...props }: ComponentProps<'a'>) {
    return href.startsWith('/') && !href.startsWith('//') ? <LocaleLink href={href} {...props} /> : <a href={href} {...props} />;
}

interface DockitRendererProps {
    content: DockitContent;
}

export function DockitRenderer({ content }: DockitRendererProps) {
    // The synced body opens with its own "# Title"; drop it when it repeats the page title
    const heading = content.content.match(/^\s*# (.+)\n/);
    const body = heading && heading[1].replace(/\\/g, '').trim().toLowerCase() === content.frontmatter.title.toLowerCase()
        ? content.content.slice(heading[0].length)
        : content.content;

    return (
        <div lang={content.lang} className="prose prose-invert max-w-none prose-a:text-neuro-accent">
            <h1>{content.frontmatter.title}</h1>
            <MDXRemote source={body} components={{ a: MdxLink }} options={{ mdxOptions: { remarkPlugins: [remarkGfm] } }} />
        </div>
    );
}
