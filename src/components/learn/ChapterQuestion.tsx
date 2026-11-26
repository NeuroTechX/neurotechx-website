'use client';

import { useId, useState } from 'react';
import type { Question } from '@/content/learn/primer-checks';
import { primerPdfPage } from '@/content/learn/primer-chapters';
import type { Locale } from '@/i18n/routes';
import { markQuestionPassed } from './primer-progress-storage';

const messages = {
    en: { check: 'Check answer', correct: 'Correct.', retry: 'Try another answer.', review: 'Review section' },
    fr: { check: 'Vérifier la réponse', correct: 'Bonne réponse.', retry: 'Essayez une autre réponse.', review: 'Revoir la section' },
};

export default function ChapterQuestion({ question, lang, progressKey }: { question: Question; lang: Locale; progressKey?: string }) {
    const id = useId();
    const [choice, setChoice] = useState<number | null>(null);
    const [checked, setChecked] = useState(false);
    const t = messages[lang];

    return (
        <form className="card" onSubmit={(event) => {
            event.preventDefault();
            setChecked(true);
            if (progressKey && choice === question.correct) markQuestionPassed(progressKey);
        }}>
            <fieldset>
                <legend className="mb-4 text-lg font-semibold">{question.prompt}</legend>
                <div className="grid gap-2">
                    {question.choices.map((answer, index) => (
                        <label key={answer} className="flex cursor-pointer items-start gap-3 rounded-lg border border-[var(--border-strong)] p-3 text-sm has-[:checked]:border-neuro-accent has-[:checked]:bg-neuro-accent/5">
                            <input
                                type="radio"
                                name={id}
                                checked={choice === index}
                                onChange={() => { setChoice(index); setChecked(false); }}
                                className="mt-1 h-4 w-4 shrink-0 accent-neuro-accent"
                            />
                            <span>{answer}</span>
                        </label>
                    ))}
                </div>
            </fieldset>
            <button type="submit" disabled={choice === null} className="mt-4 rounded-full border border-neuro-accent px-4 py-1.5 text-sm font-semibold text-neuro-accent disabled:cursor-default disabled:opacity-50">
                {t.check}
            </button>
            <div aria-live="polite">
                {checked && (
                    <div className="mt-4 border-t border-[var(--border-strong)] pt-3 text-sm">
                        <p><strong>{choice === question.correct ? t.correct : t.retry}</strong> {question.explanation}</p>
                        <a href={primerPdfPage(question.page)} className="mt-2 inline-block text-neuro-accent underline underline-offset-4">
                            {t.review} {question.section} (PDF)
                        </a>
                    </div>
                )}
            </div>
        </form>
    );
}
