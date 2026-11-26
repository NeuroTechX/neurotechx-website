import type { Metadata } from 'next';
import { BookOpen, Download, ExternalLink, Mail } from 'lucide-react';
import PageHeader from '@/components/PageHeader';
import NewsletterSignup from '@/components/NewsletterSignup';
import Link from '@/components/LocaleLink';
import PrimerProgress from '@/components/learn/PrimerProgress';
import { alternatesFor, pageLocale } from '@/i18n';
import text from '@/i18n/pages/primer';
import { learnPaths } from '@/content/learn/paths';
import { PRIMER_PDF, PRIMER_CHECKS, primerChapterPdf, primerCheckPath } from '@/content/learn/primer-chapters';
import { primerProgressChapters } from '@/content/learn/primer-progress';

export async function generateMetadata({ params }: PageProps<'/[lang]/primer'>): Promise<Metadata> {
    const lang = await pageLocale(params);
    const t = text[lang];
    return { title: t.title, description: t.description, alternates: alternatesFor('/primer', lang) };
}

const AMAZON = 'https://www.amazon.com/Neurotech-Primer-Beginners-Everything-Neurotechnology/dp/B09CKP1D66/';

export default async function PrimerPage({ params }: PageProps<'/[lang]/primer'>) {
    const lang = await pageLocale(params);
    const t = text[lang];
    const paths = learnPaths[lang];
    return (
        <div className="container py-12">
            <PageHeader
                eyebrow={t.eyebrow}
                title={t.title}
                subtitle={t.subtitle}
            />

            <div className="mb-16 flex flex-col items-center gap-10 rounded-2xl border border-[var(--border-strong)] bg-[var(--surface-1)] p-8 md:flex-row md:items-start md:p-10">
                <div className="w-52 shrink-0">
                    <img
                        src="/images/neurotech-primer.png"
                        alt={t.coverAlt}
                        className="w-full rounded border border-foreground/5 object-contain shadow-2xl"
                    />
                </div>
                <div className="flex-1">
                    <h2 className="mb-4 text-3xl font-serif font-bold">{t.freeTitle}</h2>
                    <p className="mb-4 text-lg text-muted-foreground">
                        {t.freeBody}
                    </p>
                    <p className="mb-8 text-lg text-muted-foreground">
                        {t.printBody}
                    </p>
                    <div className="flex flex-wrap gap-4">
                        <a
                            href={PRIMER_PDF}
                            download
                            className="inline-flex items-center gap-2 rounded-full bg-neuro-accent px-7 py-3 font-bold text-[var(--background)] transition hover:brightness-110"
                        >
                            <Download className="h-5 w-5" /> {t.downloadPdf}
                        </a>
                        <a
                            href={AMAZON}
                            target="_blank"
                            rel="noopener noreferrer"
                            className="inline-flex items-center gap-2 rounded-full border border-foreground/20 px-7 py-3 font-bold transition-colors hover:bg-muted-foreground/10"
                        >
                            {t.getPrint} <ExternalLink className="h-4 w-4" />
                        </a>
                    </div>
                    <p className="mt-4 text-sm text-muted-foreground">
                        {t.fileInfo}
                    </p>
                </div>
            </div>

            <div className="grid gap-12 md:grid-cols-3">
                <section id="chapters" className="scroll-mt-24 md:col-span-2">
                    <h2 className="mb-6 flex items-center gap-2 text-2xl font-serif font-bold">
                        <BookOpen className="h-6 w-6 text-neuro-accent" /> {t.insideTitle}
                    </h2>
                    <p className="mb-6 text-muted-foreground">
                        {t.insideBody}
                    </p>
                    <div className="mb-6">
                        <PrimerProgress chapters={primerProgressChapters(lang)} lang={lang} />
                    </div>
                    <ol className="list-decimal space-y-3 pl-6 marker:text-muted-foreground">
                        {t.chapters.map((chapter, index) => {
                            const check = PRIMER_CHECKS.find((entry) => entry.chapter === index + 1);
                            return (
                                <li key={chapter} className="pl-1">
                                    <div className="flex flex-wrap items-baseline justify-between gap-x-4 gap-y-1 border-b border-[var(--border)] pb-2">
                                        <a href={primerChapterPdf(index + 1)} className="hover:underline">
                                            {chapter} <span className="ml-1 text-xs text-muted-foreground">({paths.readPdf})</span>
                                        </a>
                                        {check && (
                                            <Link href={primerCheckPath(check.slug)} aria-label={`${paths.check} · ${chapter}`} className="text-sm font-semibold text-neuro-accent hover:underline">
                                                {paths.check} →
                                            </Link>
                                        )}
                                    </div>
                                </li>
                            );
                        })}
                    </ol>
                </section>

                <aside className="h-fit rounded-2xl border border-neuro-accent/20 bg-neuro-accent/5 p-8">
                    <h3 className="mb-3 flex items-center gap-2 text-lg font-bold">
                        <Mail className="h-5 w-5 text-neuro-accent" /> {t.stayTitle}
                    </h3>
                    <p className="mb-6 text-sm text-muted-foreground">
                        {t.stayBody}
                    </p>
                    <NewsletterSignup lang={lang} />
                </aside>
            </div>
        </div>
    );
}
