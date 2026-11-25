import type { Metadata } from 'next';
import { BookOpen, Download, ExternalLink, Mail } from 'lucide-react';
import PageHeader from '@/components/PageHeader';
import NewsletterSignup from '@/components/NewsletterSignup';
import { alternatesFor, pageLocale } from '@/i18n';
import text from '@/i18n/pages/primer';

export async function generateMetadata({ params }: PageProps<'/[lang]/primer'>): Promise<Metadata> {
    const lang = await pageLocale(params);
    const t = text[lang];
    return { title: t.title, description: t.description, alternates: alternatesFor('/primer', lang) };
}

const PDF = '/downloads/the-neurotech-primer.pdf';
const AMAZON = 'https://www.amazon.com/Neurotech-Primer-Beginners-Everything-Neurotechnology/dp/B09CKP1D66/';

export default async function PrimerPage({ params }: PageProps<'/[lang]/primer'>) {
    const lang = await pageLocale(params);
    const t = text[lang];
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
                            href={PDF}
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
                <section className="md:col-span-2">
                    <h2 className="mb-6 flex items-center gap-2 text-2xl font-serif font-bold">
                        <BookOpen className="h-6 w-6 text-neuro-accent" /> {t.insideTitle}
                    </h2>
                    <p className="mb-6 text-muted-foreground">
                        {t.insideBody}
                    </p>
                    <ol className="grid list-inside list-decimal gap-x-8 gap-y-2 text-foreground/90 sm:grid-cols-2">
                        {t.chapters.map((chapter) => (
                            <li key={chapter}>{chapter}</li>
                        ))}
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
