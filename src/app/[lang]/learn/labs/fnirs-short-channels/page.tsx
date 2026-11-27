import type { Metadata } from 'next';
import PageHeader from '@/components/PageHeader';
import Link from '@/components/LocaleLink';
import FnirsShortChannelsLab from '@/components/learn/FnirsShortChannelsLab';
import { fnirsText } from '@/content/learn/fnirs-short-channels';
import { FNIRS_LAB_PATH, MRI_LAB_PATH, primerCheckPath } from '@/content/learn/primer-chapters';
import { alternatesFor, pageLocale } from '@/i18n';

type Props = PageProps<'/[lang]/learn/labs/fnirs-short-channels'>;

export async function generateMetadata({ params }: Props): Promise<Metadata> {
    const lang = await pageLocale(params);
    const t = fnirsText[lang];
    return { title: t.title, description: t.intro, alternates: alternatesFor(FNIRS_LAB_PATH, lang) };
}

export default async function FnirsShortChannelsPage({ params }: Props) {
    const lang = await pageLocale(params);
    const t = fnirsText[lang];

    return (
        <div className="mx-auto max-w-5xl px-6 py-12">
            <Link href="/learn" className="mb-6 inline-block text-sm text-neuro-accent hover:underline">← {t.back}</Link>
            <PageHeader eyebrow={t.requirements} title={t.title} subtitle={t.intro} />
            <p className="mb-4 max-w-prose text-sm text-muted-foreground sm:text-base">{t.basics}</p>
            <ol className="mb-8 grid list-decimal gap-2 pl-6 text-sm marker:font-bold marker:text-neuro-accent sm:text-base">
                {t.instructions.map((instruction) => <li key={instruction} className="pl-1">{instruction}</li>)}
            </ol>
            <FnirsShortChannelsLab lang={lang} />
            <section className="mt-8 border-t border-[var(--border-strong)] pt-6">
                <h2 className="mb-2 text-xl font-bold">{t.takeaway}</h2>
                <p className="mb-4 max-w-prose text-muted-foreground">{t.summary}</p>
                <div className="flex flex-wrap gap-x-6 gap-y-2 text-sm text-neuro-accent">
                    <Link href={primerCheckPath('fnirs')} className="hover:underline">{t.check} →</Link>
                    <Link href={MRI_LAB_PATH} className="hover:underline">{t.mri} →</Link>
                    <a href="https://pmc.ncbi.nlm.nih.gov/articles/PMC3254723/" className="hover:underline">{t.paper} ↗</a>
                    <a href="https://mne.tools/mne-nirs/stable/index.html" className="hover:underline">{t.deeper} ↗</a>
                </div>
            </section>
        </div>
    );
}
