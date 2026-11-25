import fs from 'fs';
import path from 'path';
import matter from 'gray-matter';
import type { Locale } from '@/i18n/routes';

// Pages converted from the NTX-dockit and NTX-handbook repositories by scripts/sync-dockit.mjs.
// A French page is <slug>.fr.mdx; without one, the English page is shown.
const COLLECTIONS = {
    dockit: path.join(process.cwd(), 'src/content/dockit'),
    handbook: path.join(process.cwd(), 'src/content/handbook'),
} as const;

export type Collection = keyof typeof COLLECTIONS;

export interface DockitContent {
    slug: string;
    lang: Locale; // the language of `content`, which can be English on a French address
    frontmatter: {
        title: string;
        sourceUrl: string;
        updatedAt: string;
        [key: string]: any;
    };
    content: string;
}

export function getContent(collection: Collection, slug: string, lang: Locale = 'en'): DockitContent | null {
    const french = path.join(COLLECTIONS[collection], `${slug}.fr.mdx`);
    const english = path.join(COLLECTIONS[collection], `${slug}.mdx`);
    const [filePath, fileLang]: [string, Locale] =
        lang === 'fr' && fs.existsSync(french) ? [french, 'fr'] : [english, 'en'];

    if (!fs.existsSync(filePath)) {
        return null;
    }

    const fileContent = fs.readFileSync(filePath, 'utf-8');
    const { data, content } = matter(fileContent);

    return {
        slug,
        lang: fileLang,
        frontmatter: data as DockitContent['frontmatter'],
        content,
    };
}

export function getDockitContent(slug: string, lang: Locale = 'en'): DockitContent | null {
    return getContent('dockit', slug, lang);
}

export function getAllDockitSlugs(): string[] {
    if (!fs.existsSync(COLLECTIONS.dockit)) {
        return [];
    }

    const files = fs.readdirSync(COLLECTIONS.dockit);
    return files
        .filter((file) => file.endsWith('.mdx') && !file.endsWith('.fr.mdx'))
        .map((file) => file.replace('.mdx', ''));
}

export interface Section {
    heading: string;
    pages: { slug: string; title: string; href: string }[];
}

// Table of contents in the repository's own order, written by the sync from its index.rst
// (fr/index.rst for French). Hrefs are English site paths; LocaleLink localizes them.
export function getSections(collection: Collection, lang: Locale = 'en'): Section[] {
    const french = path.join(COLLECTIONS[collection], '_index.fr.json');
    const indexPath = lang === 'fr' && fs.existsSync(french) ? french : path.join(COLLECTIONS[collection], '_index.json');
    if (!fs.existsSync(indexPath)) {
        return [];
    }
    return JSON.parse(fs.readFileSync(indexPath, 'utf-8'));
}

export function getHandbookSections(lang: Locale = 'en'): Section[] {
    return getSections('handbook', lang);
}
