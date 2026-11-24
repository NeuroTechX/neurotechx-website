import fs from 'fs';
import path from 'path';
import matter from 'gray-matter';

// Pages converted from the NTX-dockit and NTX-handbook repositories by scripts/sync-dockit.mjs
const COLLECTIONS = {
    dockit: path.join(process.cwd(), 'src/content/dockit'),
    handbook: path.join(process.cwd(), 'src/content/handbook'),
} as const;

export type Collection = keyof typeof COLLECTIONS;

export interface DockitContent {
    slug: string;
    frontmatter: {
        title: string;
        sourceUrl: string;
        updatedAt: string;
        [key: string]: any;
    };
    content: string;
}

export function getContent(collection: Collection, slug: string): DockitContent | null {
    const filePath = path.join(COLLECTIONS[collection], `${slug}.mdx`);

    if (!fs.existsSync(filePath)) {
        return null;
    }

    const fileContent = fs.readFileSync(filePath, 'utf-8');
    const { data, content } = matter(fileContent);

    return {
        slug,
        frontmatter: data as DockitContent['frontmatter'],
        content,
    };
}

export function getDockitContent(slug: string): DockitContent | null {
    return getContent('dockit', slug);
}

export function getAllDockitSlugs(): string[] {
    if (!fs.existsSync(COLLECTIONS.dockit)) {
        return [];
    }

    const files = fs.readdirSync(COLLECTIONS.dockit);
    return files
        .filter((file) => file.endsWith('.mdx'))
        .map((file) => file.replace('.mdx', ''));
}

export interface HandbookSection {
    heading: string;
    pages: { slug: string; title: string }[];
}

// Table of contents in the handbook's own order, written by the sync from its index.rst
export function getHandbookSections(): HandbookSection[] {
    const indexPath = path.join(COLLECTIONS.handbook, '_index.json');
    if (!fs.existsSync(indexPath)) {
        return [];
    }
    return JSON.parse(fs.readFileSync(indexPath, 'utf-8'));
}
