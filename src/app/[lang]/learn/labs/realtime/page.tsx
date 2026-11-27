import type { Metadata } from 'next';
import PageHeader from '@/components/PageHeader';
import Link from '@/components/LocaleLink';
import RealtimeLab from '@/components/learn/RealtimeLab';
import { realtimeLinks, realtimeText, REALTIME_SCRIPT } from '@/content/learn/realtime';
import { FILTERING_LAB_PATH, FIRST_EEG_PATH, REALTIME_LAB_PATH } from '@/content/learn/primer-chapters';
import { alternatesFor, pageLocale } from '@/i18n';

type Props = PageProps<'/[lang]/learn/labs/realtime'>;

export async function generateMetadata({ params }: Props): Promise<Metadata> {
    const lang = await pageLocale(params);
    const t = realtimeText[lang];
    return { title: t.title, description: t.intro, alternates: alternatesFor(REALTIME_LAB_PATH, lang) };
}

const install = 'pip install pylsl numpy\npython realtime-alpha-lsl.py demo --seconds 30';
const twoTerminals = '# terminal 1\npython realtime-alpha-lsl.py outlet\n\n# terminal 2\npython realtime-alpha-lsl.py inlet --window 2 --update 0.25';
const code = 'overflow-x-auto rounded-lg border border-[var(--border-strong)] bg-[var(--background)] p-3 text-xs sm:text-sm';
const external = 'text-neuro-accent underline underline-offset-2';

export default async function RealtimePage({ params }: Props) {
    const lang = await pageLocale(params);
    const t = realtimeText[lang];

    return (
        <div className="mx-auto max-w-5xl px-6 py-12">
            <Link href="/learn" className="mb-6 inline-block text-sm text-neuro-accent hover:underline">← {t.back}</Link>
            <PageHeader eyebrow={t.requirements} title={t.title} subtitle={t.intro} />
            <p className="mb-6 max-w-prose text-sm text-muted-foreground sm:text-base">{t.basics}</p>

            <section className="mb-8">
                <h2 className="mb-3 text-xl font-bold">{t.loopTitle}</h2>
                <ol className="grid gap-3 sm:grid-cols-2 lg:grid-cols-5">
                    {t.loop.map((step, index) => (
                        <li key={step.name} className="rounded-lg border border-[var(--border-strong)] p-3">
                            <p className="mb-1 text-sm font-bold"><span className="text-neuro-accent">{index + 1}.</span> {step.name}</p>
                            <p className="text-sm text-muted-foreground">{step.body}</p>
                        </li>
                    ))}
                </ol>
            </section>

            <h2 className="mb-3 text-xl font-bold">{t.tasksTitle}</h2>
            <ol className="mb-8 grid list-decimal gap-2 pl-6 text-sm marker:font-bold marker:text-neuro-accent sm:text-base">
                {t.tasks.map((task) => <li key={task} className="pl-1">{task}</li>)}
            </ol>

            <RealtimeLab lang={lang} />

            <section className="mt-10">
                <h2 className="mb-2 text-2xl font-bold">{t.lslTitle}</h2>
                <p className="mb-4 max-w-prose text-muted-foreground">{t.lslIntro}</p>
                <dl className="grid gap-4 sm:grid-cols-2">
                    {t.lslPoints.map((point) => (
                        <div key={point.name} className="card p-4">
                            <dt className="mb-1 font-bold">{point.name}</dt>
                            <dd className="text-sm text-muted-foreground">{point.body}</dd>
                        </div>
                    ))}
                </dl>
                <p className="mt-3 flex flex-wrap gap-x-6 gap-y-2 text-sm">
                    <a href={realtimeLinks.lsl} className={external}>{t.lslDocs} ↗</a>
                    <a href={realtimeLinks.lslSync} className={external}>{t.lslSyncDocs} ↗</a>
                </p>
            </section>

            <section className="card mt-10">
                <h2 className="mb-2 text-2xl font-bold">{t.pythonTitle}</h2>
                <p className="mb-4 max-w-prose text-muted-foreground">{t.pythonIntro}</p>
                <a href={REALTIME_SCRIPT} download className="mb-5 inline-flex rounded-full bg-neuro-accent px-5 py-2 text-sm font-bold text-background hover:text-background hover:brightness-110">{t.download}</a>
                <p className="mb-2 text-sm font-semibold">{t.runIntro}</p>
                <pre className={code}><code>{install}</code></pre>
                <p className="mb-2 mt-4 text-sm font-semibold">{t.runTwo}</p>
                <pre className={code}><code>{twoTerminals}</code></pre>

                <h3 className="mb-2 mt-6 text-lg font-bold">{t.hardwareTitle}</h3>
                <p className="mb-3 text-sm text-muted-foreground">{t.hardwareIntro}</p>
                <ul className="grid gap-3 sm:grid-cols-2">
                    {t.hardware.map((item) => (
                        <li key={item.name} className="rounded-lg border border-[var(--border-strong)] p-3 text-sm">
                            <a href={realtimeLinks[item.href as keyof typeof realtimeLinks]} className="font-bold text-neuro-accent hover:underline">{item.name} ↗</a>
                            <p className="mt-1 text-muted-foreground">{item.body}</p>
                        </li>
                    ))}
                </ul>
                <p className="mt-4 text-sm text-muted-foreground">
                    {t.recordNote}{' '}
                    <a href={realtimeLinks.labRecorder} className={external}>LabRecorder ↗</a>
                    {' · '}
                    <a href={realtimeLinks.pyxdf} className={external}>pyxdf ↗</a>
                    {' · '}
                    <a href={realtimeLinks.pylsl} className={external}>pylsl ↗</a>
                </p>
            </section>

            <section className="mt-10">
                <h2 className="mb-3 text-2xl font-bold">{t.evidenceTitle}</h2>
                <div className="grid max-w-prose gap-3 text-muted-foreground">
                    {t.evidence.map((paragraph) => <p key={paragraph}>{paragraph}</p>)}
                </div>
                <h3 className="mb-2 mt-5 text-sm font-semibold">{t.references}</h3>
                <ul className="grid gap-1 text-sm">
                    <li><a href={realtimeLinks.sitaram} className={external}>{t.refSitaram}</a></li>
                    <li><a href={realtimeLinks.westwood} className={external}>{t.refWestwood}</a></li>
                    <li><a href={realtimeLinks.credNf} className={external}>{t.refCred}</a></li>
                </ul>
            </section>

            <section className="mt-10 border-t border-[var(--border-strong)] pt-6">
                <h2 className="mb-2 text-xl font-bold">{t.takeaway}</h2>
                <p className="mb-4 max-w-prose text-muted-foreground">{t.summary}</p>
                <div className="flex flex-wrap gap-x-6 gap-y-2 text-sm text-neuro-accent">
                    <Link href={FIRST_EEG_PATH} className="hover:underline">{t.firstLab} →</Link>
                    <Link href={FILTERING_LAB_PATH} className="hover:underline">{t.filteringLab} →</Link>
                </div>
            </section>
        </div>
    );
}
