import type { Metadata } from 'next';
import PageHeader from '@/components/PageHeader';
import EventsList from '@/components/EventsList';
import { ArrowRight, Calendar } from 'lucide-react';
import { alternatesFor, pageLocale } from '@/i18n';
import text from '@/i18n/pages/events';

export async function generateMetadata({ params }: PageProps<'/[lang]/events'>): Promise<Metadata> {
    const lang = await pageLocale(params);
    const t = text[lang];
    return { title: t.title, description: t.description, alternates: alternatesFor('/events', lang) };
}

const LUMA = 'https://luma.com/neurotechx';

export default async function EventsPage({ params }: PageProps<'/[lang]/events'>) {
    const lang = await pageLocale(params);
    const t = text[lang];
    return (
        <div className="container py-12">
            <PageHeader eyebrow={t.title} title={t.title} subtitle={t.subtitle} />

            {/* Prominent Luma calendar CTA */}
            <a
                href={LUMA}
                target="_blank"
                rel="noopener noreferrer"
                className="group relative mb-14 block overflow-hidden rounded-2xl border border-[var(--border-strong)] bg-[var(--surface-1)] p-8 md:p-10 transition hover:border-neuro-accent"
            >
                <div className="pointer-events-none absolute inset-0 bg-[radial-gradient(circle_at_85%_50%,rgba(34,211,238,0.16),transparent_60%)]" />
                <div className="relative flex flex-col gap-6 md:flex-row md:items-center md:justify-between">
                    <div>
                        <p className="eyebrow mb-2 flex items-center gap-2">
                            <Calendar className="h-4 w-4" /> {t.lumaEyebrow}
                        </p>
                        <h2 className="mb-2 text-2xl md:text-3xl font-bold group-hover:text-neuro-accent transition-colors">
                            {t.lumaTitle}
                        </h2>
                        <p className="max-w-xl text-muted-foreground">{t.lumaBody}</p>
                    </div>
                    <span className="inline-flex shrink-0 items-center justify-center gap-2 rounded-lg bg-neuro-accent px-7 py-4 text-lg font-bold text-[var(--background)] shadow-glow transition group-hover:brightness-110">
                        {t.lumaCta} <ArrowRight width={20} height={20} />
                    </span>
                </div>
            </a>

            {/* Conferences & hackathons calendar */}
            <h2 className="mb-2 text-2xl md:text-3xl font-bold">{t.conferencesTitle}</h2>
            <p className="mb-8 max-w-2xl text-muted-foreground">{t.conferencesBody}</p>
            <EventsList lang={lang} />
        </div>
    );
}
