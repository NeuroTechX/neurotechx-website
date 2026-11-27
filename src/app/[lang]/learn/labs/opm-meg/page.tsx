import type { Metadata } from 'next';
import PageHeader from '@/components/PageHeader';
import Link from '@/components/LocaleLink';
import OpmMegLab from '@/components/learn/OpmMegLab';
import { opmText } from '@/content/learn/opm-meg';
import data from '@/content/learn/opm-meg-data.json';
import { ERP_LAB_PATH, FNIRS_LAB_PATH, OPM_MEG_LAB_PATH } from '@/content/learn/primer-chapters';
import { alternatesFor, pageLocale } from '@/i18n';

type Props = PageProps<'/[lang]/learn/labs/opm-meg'>;

export async function generateMetadata({ params }: Props): Promise<Metadata> {
    const lang = await pageLocale(params);
    const t = opmText[lang];
    return { title: t.title, description: t.intro, alternates: alternatesFor(OPM_MEG_LAB_PATH, lang) };
}

export default async function OpmMegPage({ params }: Props) {
    const lang = await pageLocale(params);
    const t = opmText[lang];
    const links = [
        { href: data.dataset, label: t.dataset },
        { href: data.mneDataset, label: t.mneDataset },
        { href: data.paper, label: t.paper },
        { href: data.license, label: t.license },
        { href: 'https://mne.tools/stable/auto_tutorials/preprocessing/80_opm_processing.html', label: t.tutorial },
        { href: 'https://doi.org/10.3389/fnins.2013.00267', label: t.mne },
        { href: 'https://osl-dynamics.readthedocs.io/en/latest/', label: t.osl },
        { href: 'https://doi.org/10.7554/eLife.91949', label: t.oslPaper },
        { href: 'https://doi.org/10.1038/nature26147', label: t.boto },
        { href: 'https://doi.org/10.1016/j.tins.2022.05.008', label: t.brookes },
    ];

    return (
        <div className="mx-auto max-w-5xl px-6 py-12">
            <Link href="/learn" className="mb-6 inline-block text-sm text-neuro-accent hover:underline">← {t.back}</Link>
            <PageHeader eyebrow={t.requirements} title={t.title} subtitle={t.intro} />
            <p className="mb-4 max-w-prose text-sm text-muted-foreground sm:text-base">{t.basics}</p>
            <p className="mb-4 max-w-prose text-sm text-muted-foreground sm:text-base">{t.shielding}</p>
            <ol className="mb-8 grid list-decimal gap-2 pl-6 text-sm marker:font-bold marker:text-neuro-accent sm:text-base">
                {t.instructions.map((instruction) => <li key={instruction} className="pl-1">{instruction}</li>)}
            </ol>
            <OpmMegLab lang={lang} />
            <details className="mt-6 text-sm text-muted-foreground">
                <summary className="cursor-pointer font-medium">{t.methodHeading}</summary>
                <p className="mt-2 max-w-prose">{t.method}</p>
                <p className="mt-2 max-w-prose">{t.hmmMethod}</p>
                <p className="mt-2 max-w-prose">{t.copyright}</p>
                <div className="mt-2 flex flex-wrap gap-x-5 gap-y-2 text-neuro-accent">
                    {links.map(({ href, label }) => <a key={href} href={href} className="underline underline-offset-4">{label}</a>)}
                </div>
            </details>
            <section className="mt-8 border-t border-[var(--border-strong)] pt-6">
                <h2 className="mb-2 text-xl font-bold">{t.takeaway}</h2>
                <p className="mb-4 max-w-prose text-muted-foreground">{t.summary}</p>
                <div className="flex flex-wrap gap-x-6 gap-y-2 text-sm text-neuro-accent">
                    <Link href={FNIRS_LAB_PATH} className="hover:underline">{t.fnirs} →</Link>
                    <Link href={ERP_LAB_PATH} className="hover:underline">{t.erp} →</Link>
                </div>
            </section>
        </div>
    );
}
