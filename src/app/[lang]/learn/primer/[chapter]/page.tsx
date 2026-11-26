import type { Metadata } from 'next';
import { notFound } from 'next/navigation';
import PageHeader from '@/components/PageHeader';
import Link from '@/components/LocaleLink';
import ChapterQuestion from '@/components/learn/ChapterQuestion';
import { ChapterProgress } from '@/components/learn/PrimerProgress';
import { alternatesFor, pageLocale } from '@/i18n';
import primerText from '@/i18n/pages/primer';
import { erpText } from '@/content/learn/erp-averaging';
import { fnirsText } from '@/content/learn/fnirs-short-channels';
import { mriText } from '@/content/learn/mri-and-bold';
import { BERKELEY_FMRI_LAB, ERP_LAB_PATH, FIRST_EEG_PATH, FNIRS_LAB_PATH, MRI_LAB_PATH, PRIMER_CHECKS, primerChapterPdf, primerCheckPath } from '@/content/learn/primer-chapters';
import { primerChecks } from '@/content/learn/primer-checks';
import { questionProgressKey } from '@/content/learn/primer-progress';

type Props = PageProps<'/[lang]/learn/primer/[chapter]'>;

const messages = {
    en: {
        back: 'All Primer chapters', chapter: 'Chapter', title: 'Self-check',
        read: 'Open the chapter (English PDF)', lab: 'Try the EEG lab', next: 'Next self-check',
        fmri: 'Continue with the Berkeley fMRI lab (in English)',
    },
    fr: {
        back: 'Tous les chapitres du Primer', chapter: 'Chapitre', title: 'Autoévaluation',
        read: 'Ouvrir le chapitre (PDF en anglais)', lab: 'Essayer le labo EEG', next: 'Autoévaluation suivante',
        fmri: 'Poursuivre avec le labo IRMf de Berkeley (en anglais)',
    },
};

export function generateStaticParams() {
    return PRIMER_CHECKS.map(({ slug }) => ({ chapter: slug }));
}

export const dynamicParams = false;

export async function generateMetadata({ params }: Props): Promise<Metadata> {
    const lang = await pageLocale(params);
    const { chapter } = await params;
    const current = PRIMER_CHECKS.find(({ slug }) => slug === chapter);
    if (!current) return {};
    return {
        title: `${primerText[lang].chapters[current.chapter - 1]} · ${messages[lang].title}`,
        description: primerChecks[current.slug][lang].goal,
        alternates: alternatesFor(primerCheckPath(current.slug), lang),
    };
}

export default async function PrimerCheckPage({ params }: Props) {
    const lang = await pageLocale(params);
    const { chapter } = await params;
    const index = PRIMER_CHECKS.findIndex(({ slug }) => slug === chapter);
    const current = PRIMER_CHECKS[index];
    if (!current) notFound();
    const next = PRIMER_CHECKS[index + 1];
    const t = messages[lang];
    const check = primerChecks[current.slug][lang];

    return (
        <div className="mx-auto max-w-3xl px-6 py-12">
            <Link href="/primer#chapters" className="mb-6 inline-block text-sm text-neuro-accent hover:underline">← {t.back}</Link>
            <PageHeader
                eyebrow={`The NeuroTech Primer · ${t.chapter} ${current.chapter}`}
                title={primerText[lang].chapters[current.chapter - 1]}
                subtitle={check.goal}
            />
            <div className="mb-8 rounded-lg border border-neuro-accent/25 bg-neuro-accent/5 p-4">
                <p className="text-sm">{check.reading}</p>
                <a href={primerChapterPdf(current.chapter)} className="mt-1 inline-block text-sm text-neuro-accent underline underline-offset-4">{t.read}</a>
            </div>
            <h2 className="mb-2 text-2xl font-bold">{t.title}</h2>
            <ChapterProgress questionKeys={check.questions.map(({ id }) => questionProgressKey(current.slug, id))} lang={lang} />
            <div className="grid gap-4">
                {check.questions.map((question) => (
                    <ChapterQuestion key={question.id} question={question} lang={lang} progressKey={questionProgressKey(current.slug, question.id)} />
                ))}
            </div>
            <nav className="mt-8 flex flex-wrap justify-between gap-4 border-t border-[var(--border-strong)] pt-5 text-sm">
                {current.slug === 'eeg' && (
                    <>
                        <Link href={FIRST_EEG_PATH} className="text-neuro-accent hover:underline">{t.lab} →</Link>
                        <Link href={ERP_LAB_PATH} className="text-neuro-accent hover:underline">{erpText[lang].title} →</Link>
                    </>
                )}
                {current.slug === 'fmri' && <Link href={MRI_LAB_PATH} className="text-neuro-accent hover:underline">{mriText[lang].title} →</Link>}
                {current.slug === 'fnirs' && <Link href={FNIRS_LAB_PATH} className="text-neuro-accent hover:underline">{fnirsText[lang].title} →</Link>}
                {current.slug === 'fmri' && <a href={BERKELEY_FMRI_LAB} className="text-neuro-accent hover:underline">{t.fmri} ↗</a>}
                {next && (
                    <Link href={primerCheckPath(next.slug)} className="text-neuro-accent hover:underline">
                        {t.next} · {t.chapter} {next.chapter} →
                    </Link>
                )}
            </nav>
        </div>
    );
}
