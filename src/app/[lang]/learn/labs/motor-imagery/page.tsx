import type { Metadata } from 'next';
import PageHeader from '@/components/PageHeader';
import Link from '@/components/LocaleLink';
import MotorImageryLab from '@/components/learn/MotorImageryLab';
import { erpText } from '@/content/learn/erp-averaging';
import {
    BRAINDECODE_GPU_LAB, EEGBCI_DATASET, MOABB_DOCS, MOABB_REPO, MOTOR_IMAGERY_NOTEBOOK, ODC_BY, motorImageryText,
} from '@/content/learn/motor-imagery';
import { ERP_LAB_PATH, MOTOR_IMAGERY_PATH } from '@/content/learn/primer-chapters';
import { alternatesFor, pageLocale } from '@/i18n';

type Props = PageProps<'/[lang]/learn/labs/motor-imagery'>;

export async function generateMetadata({ params }: Props): Promise<Metadata> {
    const lang = await pageLocale(params);
    const t = motorImageryText[lang];
    return { title: t.title, description: t.intro, alternates: alternatesFor(MOTOR_IMAGERY_PATH, lang) };
}

export default async function MotorImageryPage({ params }: Props) {
    const lang = await pageLocale(params);
    const t = motorImageryText[lang];

    return (
        <div className="mx-auto max-w-5xl px-6 py-12">
            <Link href="/learn" className="mb-6 inline-block text-sm text-neuro-accent hover:underline">← {t.back}</Link>
            <PageHeader eyebrow={t.requirements} title={t.title} subtitle={t.intro} />
            {t.basics.map((paragraph) => (
                <p key={paragraph} className="mb-4 max-w-prose text-sm text-muted-foreground sm:text-base">{paragraph}</p>
            ))}
            <ol className="mb-8 grid list-decimal gap-2 pl-6 text-sm marker:font-bold marker:text-neuro-accent sm:text-base">
                {t.instructions.map((instruction) => <li key={instruction} className="pl-1">{instruction}</li>)}
            </ol>
            <MotorImageryLab lang={lang} />
            <p className="mt-4 text-xs text-muted-foreground">
                {t.credits}{' '}
                <a href={EEGBCI_DATASET} className="text-neuro-accent hover:underline">{t.dataset} ↗</a>
                {' · '}
                <a href={ODC_BY} className="text-neuro-accent hover:underline">{t.license} ↗</a>
            </p>

            <section className="mt-8">
                <h2 className="mb-3 text-2xl font-bold">{t.evalTitle}</h2>
                <ul className="grid max-w-prose list-disc gap-3 pl-5 text-sm text-muted-foreground marker:text-neuro-accent sm:text-base">
                    {t.evalPoints.map((point) => <li key={point}>{point}</li>)}
                </ul>
            </section>

            <section className="card mt-8">
                <h2 className="mb-3 text-2xl font-bold">{t.pyTitle}</h2>
                <p className="mb-3 max-w-prose text-sm text-muted-foreground sm:text-base">{t.pyBody}</p>
                <p className="mb-5 max-w-prose text-sm text-muted-foreground sm:text-base">{t.moabbBody}</p>
                <a href={MOTOR_IMAGERY_NOTEBOOK} download className="inline-flex rounded-full bg-neuro-accent px-5 py-2 text-sm font-bold text-background hover:text-background hover:brightness-110">{t.download}</a>
                <p className="mt-2 text-sm text-muted-foreground">{t.setup}</p>
                <h3 className="mb-2 mt-6 font-semibold">{t.resultsTitle}</h3>
                <ul className="grid list-disc gap-1 pl-5 text-sm text-muted-foreground">
                    {t.results.map((result) => <li key={result}>{result}</li>)}
                </ul>
                <p className="mt-2 text-xs text-muted-foreground">{t.resultsNote}</p>
                <div className="mt-5 flex flex-wrap gap-x-6 gap-y-2 text-sm text-neuro-accent">
                    <a href={MOABB_REPO} className="hover:underline">{t.moabbRepo} ↗</a>
                    <a href={MOABB_DOCS} className="hover:underline">{t.moabbDocs} ↗</a>
                </div>
            </section>

            <section className="mt-8 border-t border-[var(--border-strong)] pt-6">
                <h2 className="mb-2 text-xl font-bold">{t.gpuTitle}</h2>
                <p className="mb-4 max-w-prose text-muted-foreground">{t.gpuBody}</p>
                <a href={BRAINDECODE_GPU_LAB} className="text-sm font-semibold text-neuro-accent hover:underline">{t.gpuGuide} ↗</a>
            </section>

            <section className="mt-8 border-t border-[var(--border-strong)] pt-6">
                <h2 className="mb-2 text-xl font-bold">{t.takeaway}</h2>
                <p className="mb-4 max-w-prose text-muted-foreground">{t.summary}</p>
                <div className="flex flex-wrap gap-x-6 gap-y-2 text-sm text-neuro-accent">
                    <Link href="/learn/machine-learning-for-bci" className="font-semibold hover:underline">{t.lesson} →</Link>
                    <Link href={ERP_LAB_PATH} className="hover:underline">{erpText[lang].title} →</Link>
                </div>
            </section>
        </div>
    );
}
