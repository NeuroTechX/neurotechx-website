'use client';

import Link from '@/components/LocaleLink';
import type { PrimerProgressChapter } from '@/content/learn/primer-progress';
import type { Locale } from '@/i18n/routes';
import { useQuestionProgress } from './primer-progress-storage';

const messages = {
    en: {
        storage: 'Progress stays in this browser.',
        completed: (done: number, total: number) => `${done} of ${total} chapters complete`,
        questions: (done: number, total: number) => `${done} of ${total} questions answered correctly`,
        next: 'Continue with',
        start: 'Start with',
        review: 'Review the chapters',
    },
    fr: {
        storage: 'La progression reste dans ce navigateur.',
        completed: (done: number, total: number) => `${done} chapitre${done === 1 ? '' : 's'} sur ${total} terminé${done === 1 ? '' : 's'}`,
        questions: (done: number, total: number) => `${done} bonne${done === 1 ? '' : 's'} réponse${done === 1 ? '' : 's'} sur ${total}`,
        next: 'Poursuivre avec',
        start: 'Commencer par',
        review: 'Revoir les chapitres',
    },
};

export function ChapterProgress({ questionKeys, lang }: { questionKeys: string[]; lang: Locale }) {
    const passed = useQuestionProgress(questionKeys);
    const done = Array.from(passed).filter((value) => value === '1').length;
    return <p className="mb-4 text-sm text-muted-foreground" aria-live="polite">{messages[lang].questions(done, questionKeys.length)}</p>;
}

export default function PrimerProgress({ chapters, lang }: { chapters: PrimerProgressChapter[]; lang: Locale }) {
    const allKeys = chapters.flatMap(({ questionKeys }) => questionKeys);
    const progress = useQuestionProgress(allKeys);
    const passed = new Set(allKeys.filter((_, index) => progress[index] === '1'));
    const results = chapters.map((chapter) => ({
        ...chapter,
        done: chapter.questionKeys.filter((key) => passed.has(key)).length,
    }));
    const complete = results.filter(({ done, questionKeys }) => done === questionKeys.length).length;
    const next = results.find(({ done, questionKeys }) => done > 0 && done < questionKeys.length)
        ?? results.find(({ done, questionKeys }) => done < questionKeys.length);
    const t = messages[lang];
    const summary = t.completed(complete, chapters.length);

    return (
        <div className="rounded-lg border border-[var(--border-strong)] bg-[var(--background)] p-4 text-sm">
            <div className="flex flex-wrap items-baseline justify-between gap-x-4 gap-y-1">
                <p aria-live="polite" className="font-semibold">{summary}</p>
                <p className="text-xs text-muted-foreground">{t.storage}</p>
            </div>
            <progress
                aria-label={summary}
                max={chapters.length}
                value={complete}
                className="my-2 block h-2 w-full appearance-none overflow-hidden rounded-full bg-muted accent-neuro-accent [&::-webkit-progress-bar]:bg-muted [&::-webkit-progress-value]:bg-neuro-accent"
            />
            {next ? (
                <Link href={next.href} className="font-medium text-neuro-accent hover:underline">
                    {passed.size > 0 ? t.next : t.start} {next.title} →
                </Link>
            ) : (
                <Link href="/primer#chapters" className="font-medium text-neuro-accent hover:underline">{t.review} →</Link>
            )}
        </div>
    );
}
