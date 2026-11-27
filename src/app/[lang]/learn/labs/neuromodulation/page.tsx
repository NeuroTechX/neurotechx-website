import type { Metadata } from 'next';
import PageHeader from '@/components/PageHeader';
import Link from '@/components/LocaleLink';
import NeuromodulationLab from '@/components/learn/NeuromodulationLab';
import { neuromodulationText } from '@/content/learn/neuromodulation';
import { NEUROMODULATION_LAB_PATH, primerCheckPath } from '@/content/learn/primer-chapters';
import { alternatesFor, pageLocale } from '@/i18n';

type Props = PageProps<'/[lang]/learn/labs/neuromodulation'>;

export async function generateMetadata({ params }: Props): Promise<Metadata> {
    const lang = await pageLocale(params);
    const t = neuromodulationText[lang];
    return { title: t.title, description: t.intro, alternates: alternatesFor(NEUROMODULATION_LAB_PATH, lang) };
}

export default async function NeuromodulationPage({ params }: Props) {
    const lang = await pageLocale(params);
    const t = neuromodulationText[lang];
    const { links } = t;
    const sources = [
        { href: 'https://simnibs.github.io/simnibs/', label: links.simnibs, cite: 'https://doi.org/10.1109/EMBC.2015.7318340' },
        { href: 'https://doi.org/10.1016/j.neuroimage.2020.117044', label: links.charm },
        { href: 'https://github.com/simnibs/example-dataset/releases/tag/v4.1', label: links.ernie },
        { href: 'https://github.com/ProteusMRIgHIFU/BabelBrain', label: links.babelbrain, cite: 'https://doi.org/10.1109/TUFFC.2023.3274046' },
        { href: 'https://github.com/ProteusMRIgHIFU/BabelViscoFDTD', label: links.babelvisco },
        { href: 'https://doi.org/10.1016/j.cell.2017.05.024', label: links.ti },
        { href: 'https://doi.org/10.1016/j.brs.2012.02.005', label: links.deng },
        { href: 'https://doi.org/10.1038/s41467-018-04529-6', label: links.lipsman },
        { href: 'https://research.sunnybrook.ca/research/centres/centre-of-excellence-in-focused-ultrasound/', label: links.sunnybrook },
        { href: 'https://research.sunnybrook.ca/facilities-and-research-groups/focused-ultrasound/', label: links.sunnybrookLab },
        { href: 'https://research.sunnybrook.ca/research/centres/harquail-centre-for-neuromodulation/', label: links.harquail },
        { href: 'https://arxiv.org/abs/2311.05359', label: links.safety },
    ];

    return (
        <div className="mx-auto max-w-5xl px-6 py-12">
            <Link href="/learn" className="mb-6 inline-block text-sm text-neuro-accent hover:underline">← {t.back}</Link>
            <PageHeader eyebrow={t.requirements} title={t.title} subtitle={t.intro} />
            <p role="note" className="mb-6 max-w-prose rounded-lg border border-amber-400/40 bg-amber-400/10 p-4 text-sm font-semibold sm:text-base">{t.simulated}</p>
            <p className="mb-4 max-w-prose text-sm text-muted-foreground sm:text-base">{t.basics}</p>
            <p className="mb-4 max-w-prose text-sm text-muted-foreground sm:text-base">{t.context}</p>
            <ol className="mb-8 grid list-decimal gap-2 pl-6 text-sm marker:font-bold marker:text-neuro-accent sm:text-base">
                {t.instructions.map((instruction) => <li key={instruction} className="pl-1">{instruction}</li>)}
            </ol>
            <NeuromodulationLab lang={lang} />
            <section className="mt-6 max-w-prose">
                <h2 className="mb-2 text-xl font-bold">{t.limitsTitle}</h2>
                <p className="text-sm text-muted-foreground sm:text-base">{t.limits}</p>
            </section>
            <details className="mt-5 text-sm text-muted-foreground">
                <summary className="cursor-pointer font-medium">{t.methodHeading}</summary>
                <p className="mt-2 max-w-prose">{t.method}</p>
                <p className="mt-2 max-w-prose">{t.metricsMethod}</p>
                <p className="mt-2">{t.script} <code>scripts/build-learn-neuromod.py</code>, <code>scripts/learn-neuromod/</code></p>
            </details>
            <section className="mt-8 border-t border-[var(--border-strong)] pt-6">
                <h2 className="mb-2 text-xl font-bold">{t.takeaway}</h2>
                <p className="mb-4 max-w-prose text-muted-foreground">{t.summary}</p>
                <div className="mb-6 flex flex-wrap gap-x-6 gap-y-2 text-sm text-neuro-accent">
                    <Link href="/learn/brain-stimulation-safety" className="hover:underline">{t.lesson} →</Link>
                    <Link href={primerCheckPath('fus')} className="hover:underline">{t.check} →</Link>
                </div>
                <h3 className="mb-2 text-base font-semibold">{t.sources}</h3>
                <ul className="grid gap-1 text-sm text-neuro-accent sm:grid-cols-2">
                    {sources.map(({ href, label, cite }) => (
                        <li key={href}>
                            <a href={href} className="hover:underline">{label} ↗</a>
                            {cite && <> · <a href={cite} className="hover:underline">DOI ↗</a></>}
                        </li>
                    ))}
                </ul>
            </section>
        </div>
    );
}
