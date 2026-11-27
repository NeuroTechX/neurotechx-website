import type { Metadata } from 'next';
import PageHeader from '@/components/PageHeader';
import Link from '@/components/LocaleLink';
import ErpAveragingLab from '@/components/learn/ErpAveragingLab';
import { erpText } from '@/content/learn/erp-averaging';
import { capstoneText } from '@/content/learn/eeg-capstone';
import { EEG_CAPSTONE_PATH, ERP_LAB_PATH, FIRST_EEG_PATH } from '@/content/learn/primer-chapters';
import { alternatesFor, pageLocale } from '@/i18n';

type Props = PageProps<'/[lang]/learn/labs/erp-averaging'>;

export async function generateMetadata({ params }: Props): Promise<Metadata> {
    const lang = await pageLocale(params);
    const t = erpText[lang];
    return { title: t.title, description: t.intro, alternates: alternatesFor(ERP_LAB_PATH, lang) };
}

export default async function ErpAveragingPage({ params }: Props) {
    const lang = await pageLocale(params);
    const t = erpText[lang];

    return (
        <div className="mx-auto max-w-5xl px-6 py-12">
            <Link href="/learn" className="mb-6 inline-block text-sm text-neuro-accent hover:underline">← {t.back}</Link>
            <PageHeader eyebrow={t.requirements} title={t.title} subtitle={t.intro} />
            <p className="mb-4 max-w-prose text-sm text-muted-foreground sm:text-base">{t.basics}</p>
            <ol className="mb-8 grid list-decimal gap-2 pl-6 text-sm marker:font-bold marker:text-neuro-accent sm:text-base">
                {t.instructions.map((instruction) => <li key={instruction} className="pl-1">{instruction}</li>)}
            </ol>
            <ErpAveragingLab lang={lang} />
            <section className="mt-8 border-t border-[var(--border-strong)] pt-6">
                <h2 className="mb-2 text-xl font-bold">{t.takeaway}</h2>
                <p className="mb-4 max-w-prose text-muted-foreground">{t.summary}</p>
                <div className="flex flex-wrap gap-x-6 gap-y-2 text-sm text-neuro-accent">
                    <Link href={EEG_CAPSTONE_PATH} className="font-semibold hover:underline">{capstoneText[lang].title} →</Link>
                    <Link href="/learn/event-related-potentials" className="hover:underline">{t.lesson} →</Link>
                    <a href="https://mne.tools/stable/auto_tutorials/evoked/30_eeg_erp.html" className="hover:underline">{t.notebook} ↗</a>
                    <Link href={FIRST_EEG_PATH} className="hover:underline">{t.firstLab} →</Link>
                </div>
            </section>
            <section className="mt-8 border-t border-[var(--border-strong)] pt-6">
                <h2 className="mb-2 text-xl font-bold">{t.nsgTitle}</h2>
                <p className="mb-4 max-w-prose text-muted-foreground">{t.nsgSummary}</p>
                <div className="flex flex-wrap gap-x-6 gap-y-2 text-sm text-neuro-accent">
                    <a href="https://github.com/NeuroTechX/nemar-nsg-starter/tree/master/lessons/pursue-p300" className="font-semibold hover:underline">{t.nsgGuide} ↗</a>
                    <a href="https://nemar.org/dataset/on007056" className="hover:underline">{t.nsgDataset} ↗</a>
                </div>
            </section>
            <section className="mt-8 border-t border-[var(--border-strong)] pt-6">
                <h2 className="mb-2 text-xl font-bold">{t.erpCoreTitle}</h2>
                <p className="mb-4 max-w-prose text-muted-foreground">{t.erpCoreSummary}</p>
                <div className="flex flex-wrap gap-x-6 gap-y-2 text-sm text-neuro-accent">
                    <a href="https://github.com/NeuroTechX/nemar-nsg-starter/tree/master/lessons/erp-core" className="font-semibold hover:underline">{t.erpCoreGuide} ↗</a>
                    <a href="https://erpinfo.org/erp-core" className="hover:underline">{t.erpCoreData} ↗</a>
                </div>
            </section>
        </div>
    );
}
