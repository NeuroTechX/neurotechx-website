import type { Metadata } from 'next';
import PageHeader from '@/components/PageHeader';
import Link from '@/components/LocaleLink';
import HdEegLab from '@/components/learn/HdEegLab';
import { hdEegText } from '@/content/learn/hd-eeg';
import { ERP_LAB_PATH, HD_EEG_LAB_PATH, primerCheckPath } from '@/content/learn/primer-chapters';
import { alternatesFor, pageLocale } from '@/i18n';

type Props = PageProps<'/[lang]/learn/labs/hd-eeg'>;

export async function generateMetadata({ params }: Props): Promise<Metadata> {
    const lang = await pageLocale(params);
    const t = hdEegText[lang];
    return { title: t.title, description: t.intro, alternates: alternatesFor(HD_EEG_LAB_PATH, lang) };
}

export default async function HdEegPage({ params }: Props) {
    const lang = await pageLocale(params);
    const t = hdEegText[lang];

    return (
        <div className="mx-auto max-w-5xl px-6 py-12">
            <Link href="/learn" className="mb-6 inline-block text-sm text-neuro-accent hover:underline">← {t.back}</Link>
            <PageHeader eyebrow={t.requirements} title={t.title} subtitle={t.intro} />
            <p className="mb-4 max-w-prose text-sm text-muted-foreground sm:text-base">{t.basics}</p>
            <ol className="mb-8 grid list-decimal gap-2 pl-6 text-sm marker:font-bold marker:text-neuro-accent sm:text-base">
                {t.instructions.map((instruction) => <li key={instruction} className="pl-1">{instruction}</li>)}
            </ol>
            <HdEegLab lang={lang} />
            <section className="mt-8 border-t border-[var(--border-strong)] pt-6">
                <h2 className="mb-2 text-xl font-bold">{t.takeaway}</h2>
                <p className="mb-4 max-w-prose text-muted-foreground">{t.summary}</p>
                <div className="flex flex-wrap gap-x-6 gap-y-2 text-sm text-neuro-accent">
                    <Link href={primerCheckPath('eeg')} className="hover:underline">{t.check} →</Link>
                    <Link href="/learn/eeg-headsets" className="hover:underline">{t.lesson} →</Link>
                    <Link href={ERP_LAB_PATH} className="hover:underline">{t.erp} →</Link>
                    <a href="https://childmind.org/science/global-open-science/healthy-brain-network/" className="hover:underline">{t.hbn} ↗</a>
                </div>
            </section>
        </div>
    );
}
