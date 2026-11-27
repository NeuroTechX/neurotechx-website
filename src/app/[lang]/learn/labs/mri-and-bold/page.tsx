import type { Metadata } from 'next';
import PageHeader from '@/components/PageHeader';
import Link from '@/components/LocaleLink';
import ChapterQuestion from '@/components/learn/ChapterQuestion';
import MriAndBoldLab from '@/components/learn/MriAndBoldLab';
import { fnirsText } from '@/content/learn/fnirs-kernel';
import { modalityChoice, mriText } from '@/content/learn/mri-and-bold';
import { BERKELEY_FMRI_LAB, FNIRS_LAB_PATH, MRI_LAB_PATH, primerCheckPath } from '@/content/learn/primer-chapters';
import { alternatesFor, pageLocale } from '@/i18n';

type Props = PageProps<'/[lang]/learn/labs/mri-and-bold'>;

export async function generateMetadata({ params }: Props): Promise<Metadata> {
    const lang = await pageLocale(params);
    const t = mriText[lang];
    return { title: t.title, description: t.intro, alternates: alternatesFor(MRI_LAB_PATH, lang) };
}

export default async function MriAndBoldPage({ params }: Props) {
    const lang = await pageLocale(params);
    const t = mriText[lang];

    return (
        <div className="mx-auto max-w-5xl px-6 py-12">
            <Link href="/learn" className="mb-6 inline-block text-sm text-neuro-accent hover:underline">← {t.back}</Link>
            <PageHeader eyebrow={t.requirements} title={t.title} subtitle={t.intro} />
            <MriAndBoldLab lang={lang} />
            <section className="mt-8 border-t border-[var(--border-strong)] pt-6">
                <h2 className="mb-2 text-xl font-bold">{t.takeaway}</h2>
                <p className="mb-4 max-w-prose text-muted-foreground">{t.summary}</p>
                <ChapterQuestion question={modalityChoice[lang]} lang={lang} />
                <div className="mt-5 flex flex-wrap gap-x-6 gap-y-2 text-sm text-neuro-accent">
                    <Link href={primerCheckPath('fmri')} className="hover:underline">{t.check} →</Link>
                    <Link href={primerCheckPath('fnirs')} className="hover:underline">{t.fnirsCheck} →</Link>
                    <Link href={FNIRS_LAB_PATH} className="hover:underline">{fnirsText[lang].title} →</Link>
                    <a href={BERKELEY_FMRI_LAB} className="hover:underline">{t.berkeley} ↗</a>
                </div>
            </section>
        </div>
    );
}
