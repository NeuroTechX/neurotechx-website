import type { Metadata } from 'next';
import PageHeader from '@/components/PageHeader';
import Link from '@/components/LocaleLink';
import EegFilteringLab from '@/components/learn/EegFilteringLab';
import { filteringText } from '@/content/learn/eeg-filtering';
import { ERP_LAB_PATH, FILTERING_LAB_PATH } from '@/content/learn/primer-chapters';
import { alternatesFor, pageLocale } from '@/i18n';

type Props = PageProps<'/[lang]/learn/labs/eeg-filtering'>;

export async function generateMetadata({ params }: Props): Promise<Metadata> {
    const lang = await pageLocale(params);
    const t = filteringText[lang];
    return { title: t.title, description: t.intro, alternates: alternatesFor(FILTERING_LAB_PATH, lang) };
}

export default async function EegFilteringPage({ params }: Props) {
    const lang = await pageLocale(params);
    const t = filteringText[lang];

    return (
        <div className="mx-auto max-w-5xl px-6 py-12">
            <Link href="/learn" className="mb-6 inline-block text-sm text-neuro-accent hover:underline">← {t.back}</Link>
            <PageHeader eyebrow={t.requirements} title={t.title} subtitle={t.intro} />
            <ol className="mb-8 grid list-decimal gap-2 pl-6 text-sm marker:font-bold marker:text-neuro-accent sm:text-base">
                {t.tasks.map((task) => <li key={task} className="pl-1">{task}</li>)}
            </ol>
            <EegFilteringLab lang={lang} />
            <section className="mt-8 border-t border-[var(--border-strong)] pt-6">
                <h2 className="mb-2 text-xl font-bold">{t.takeaway}</h2>
                <p className="mb-4 max-w-prose text-muted-foreground">{t.summary}</p>
                <div className="flex flex-wrap gap-x-6 gap-y-2 text-sm text-neuro-accent">
                    <Link href={ERP_LAB_PATH} className="hover:underline">{t.next} →</Link>
                    <Link href="/learn/preprocessing" className="hover:underline">{t.reading} →</Link>
                </div>
            </section>
        </div>
    );
}
