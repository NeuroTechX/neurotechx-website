import fs from 'fs';
import path from 'path';
import matter from 'gray-matter';

// Lessons moved from learn.neurotechedu.com (NeuroTechEDU), written in English by NeuroTechX
// volunteers from 2017 to 2020. One Markdown file per lesson; _index.json keeps the module order.
const DIR = path.join(process.cwd(), 'src/content/lessons');

export type Module = 'bci' | 'neuro';

export interface LessonSummary {
    slug: string;
    title: string;
    description: string;
}

export interface Lesson extends LessonSummary {
    module: Module;
    sourceUrl: string;
    content: string;
}

export function getModules(): Record<Module, LessonSummary[]> {
    return JSON.parse(fs.readFileSync(path.join(DIR, '_index.json'), 'utf-8'));
}

export function getLessonSlugs(): string[] {
    return Object.values(getModules()).flat().map((lesson) => lesson.slug);
}

export function getLesson(slug: string): Lesson | null {
    const file = path.join(DIR, `${slug}.md`);
    if (!fs.existsSync(file)) {
        return null;
    }
    const { data, content } = matter(fs.readFileSync(file, 'utf-8'));
    return { slug, title: data.title, description: data.description, module: data.module, sourceUrl: data.sourceUrl, content };
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
