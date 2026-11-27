import type { Metadata } from 'next';
import PageHeader from '@/components/PageHeader';
import Link from '@/components/LocaleLink';
import SignalsLab from '@/components/learn/SignalsLab';
import { SCIPY_WELCH, signalsText } from '@/content/learn/signals';
import { FILTERING_LAB_PATH, FIRST_EEG_PATH, SIGNALS_LAB_PATH } from '@/content/learn/primer-chapters';
import { alternatesFor, pageLocale } from '@/i18n';

type Props = PageProps<'/[lang]/learn/labs/signals'>;

export async function generateMetadata({ params }: Props): Promise<Metadata> {
    const lang = await pageLocale(params);
    const t = signalsText[lang];
    return { title: t.title, description: t.intro, alternates: alternatesFor(SIGNALS_LAB_PATH, lang) };
}

export default async function SignalsPage({ params }: Props) {
    const lang = await pageLocale(params);
    const t = signalsText[lang];

    return (
        <div className="mx-auto max-w-5xl px-6 py-12">
            <Link href="/learn" className="mb-6 inline-block text-sm text-neuro-accent hover:underline">← {t.back}</Link>
            <PageHeader eyebrow={t.requirements} title={t.title} subtitle={t.intro} />
            <p className="mb-8 max-w-prose text-sm text-muted-foreground sm:text-base">{t.basics}</p>
            <SignalsLab lang={lang} />
            <section className="mt-10 border-t border-[var(--border-strong)] pt-6">
                <h2 className="mb-2 text-xl font-bold">{t.takeaway}</h2>
                <p className="mb-4 max-w-prose text-muted-foreground">{t.summary}</p>
                <div className="flex flex-wrap gap-x-6 gap-y-2 text-sm text-neuro-accent">
                    <Link href={FILTERING_LAB_PATH} className="font-semibold hover:underline">{t.filtering} →</Link>
                    <Link href={FIRST_EEG_PATH} className="hover:underline">{t.firstEeg} →</Link>
                    <a href={SCIPY_WELCH} className="hover:underline">{t.welch} ↗</a>
                </div>
            </section>
        </div>
    );
}
