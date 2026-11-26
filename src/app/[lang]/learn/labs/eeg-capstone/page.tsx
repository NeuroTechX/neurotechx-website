import type { Metadata } from 'next';
import PageHeader from '@/components/PageHeader';
import Link from '@/components/LocaleLink';
import { alternatesFor, pageLocale } from '@/i18n';
import { EEG_CAPSTONE_PATH, FIRST_EEG_PATH } from '@/content/learn/primer-chapters';
import { capstoneText, CAPSTONE_NOTEBOOK } from '@/content/learn/eeg-capstone';

type Props = PageProps<'/[lang]/learn/labs/eeg-capstone'>;

export async function generateMetadata({ params }: Props): Promise<Metadata> {
    const lang = await pageLocale(params);
    const t = capstoneText[lang];
    return { title: t.title, description: t.intro, alternates: alternatesFor(EEG_CAPSTONE_PATH, lang) };
}

export default async function EegCapstonePage({ params }: Props) {
    const lang = await pageLocale(params);
    const t = capstoneText[lang];

    return (
        <div className="mx-auto max-w-3xl px-6 py-12">
            <Link href="/learn" className="mb-6 inline-block text-sm text-neuro-accent hover:underline">← {t.back}</Link>
            <PageHeader eyebrow={t.requirements} title={t.title} subtitle={t.intro} />
            <section className="card">
                <h2 className="mb-3 text-xl font-bold">{t.task}</h2>
                <ol className="mb-5 grid list-decimal gap-2 pl-5 text-sm marker:text-neuro-accent sm:text-base">
                    {t.steps.map((step) => <li key={step} className="pl-1">{step}</li>)}
                </ol>
                <a href={CAPSTONE_NOTEBOOK} download className="inline-flex rounded-full bg-neuro-accent px-5 py-2 text-sm font-bold text-background hover:text-background hover:brightness-110">{t.download}</a>
                <p className="mt-2 text-sm text-muted-foreground">{t.setup}</p>
            </section>
            <details className="mt-6 rounded-lg border border-[var(--border-strong)] p-4">
                <summary className="cursor-pointer font-semibold">{t.rubric}</summary>
                <p className="mt-2 text-sm text-muted-foreground">{t.expected}</p>
            </details>
            <nav className="mt-6 flex flex-wrap gap-x-6 gap-y-2 text-sm text-neuro-accent">
                <Link href={FIRST_EEG_PATH} className="hover:underline">{t.browserLab} →</Link>
                <a href="https://physionet.org/content/eegmmidb/1.0.0/" className="hover:underline">{t.dataset} ↗</a>
            </nav>
        </div>
    );
}
