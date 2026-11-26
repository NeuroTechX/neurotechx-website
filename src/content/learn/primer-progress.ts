import type { Locale } from '@/i18n/routes';
import primerText from '@/i18n/pages/primer';
import { PRIMER_CHECKS, primerCheckPath } from './primer-chapters';
import { primerChecks } from './primer-checks';

export type PrimerProgressChapter = {
    title: string;
    href: string;
    questionKeys: string[];
};

export function questionProgressKey(chapterSlug: string, questionId: string) {
    return `${chapterSlug}/${questionId}`;
}

export function primerProgressChapters(lang: Locale): PrimerProgressChapter[] {
    return PRIMER_CHECKS.map(({ chapter, slug }) => ({
        title: primerText[lang].chapters[chapter - 1],
        href: primerCheckPath(slug),
        questionKeys: primerChecks[slug][lang].questions.map(({ id }) => questionProgressKey(slug, id)),
    }));
}
