import fs from 'fs';
import path from 'path';
import matter from 'gray-matter';
import type { Locale } from '@/i18n/routes';

// Lessons moved from learn.neurotechedu.com (NeuroTechEDU), written in English by NeuroTechX
// volunteers from 2017 to 2020. One Markdown file per lesson; _index.json keeps the module order.
// A French translation sits next to the English file as <slug>.fr.md, with the same front matter,
// and its title and description go under "fr" in the lesson's _index.json entry.
const DIR = path.join(process.cwd(), 'src/content/lessons');

export type Module = 'bci' | 'neuro';

export interface LessonSummary {
    slug: string;
    title: string;
    description: string;
    lang: Locale; // the language of title and description, which can be English on a French page
}

export interface Lesson extends LessonSummary {
    module: Module;
    sourceUrl: string;
    content: string;
}

interface IndexEntry {
    slug: string;
    title: string;
    description: string;
    fr?: { title: string; description: string };
}

/** Lessons of each module in order, with French titles where the lesson has a translation. */
export function getModules(lang: Locale = 'en'): Record<Module, LessonSummary[]> {
    const index: Record<Module, IndexEntry[]> = JSON.parse(fs.readFileSync(path.join(DIR, '_index.json'), 'utf-8'));
    const summary = ({ slug, title, description, fr }: IndexEntry): LessonSummary =>
        lang === 'fr' && fr ? { slug, ...fr, lang: 'fr' } : { slug, title, description, lang: 'en' };
    return { bci: index.bci.map(summary), neuro: index.neuro.map(summary) };
}

export function getLessonSlugs(): string[] {
    return Object.values(getModules()).flat().map((lesson) => lesson.slug);
}

/**
 * A lesson in the given language, or in English when it has no French file; `lang` says which.
 * next.config.mjs lists the same French files for the "English only" notice (src/i18n/routes.ts).
 */
export function getLesson(slug: string, lang: Locale = 'en'): Lesson | null {
    const english = path.join(DIR, `${slug}.md`);
    if (!fs.existsSync(english)) {
        return null;
    }
    const french = path.join(DIR, `${slug}.fr.md`);
    const [file, fileLang]: [string, Locale] = lang === 'fr' && fs.existsSync(french) ? [french, 'fr'] : [english, 'en'];
    const { data, content } = matter(fs.readFileSync(file, 'utf-8'));
    return {
        slug,
        title: data.title,
        description: data.description,
        lang: fileLang,
        module: data.module,
        sourceUrl: data.sourceUrl,
        content,
    };
}

// Named authors and editors, from the old site's contributors page
export interface Contributor {
    name: string;
    roles: string[];
    lessons: string[];
}

export function getContributors(): Contributor[] {
    return JSON.parse(fs.readFileSync(path.join(DIR, '_contributors.json'), 'utf-8'));
}
