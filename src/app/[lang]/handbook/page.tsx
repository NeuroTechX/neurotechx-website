import type { Metadata } from 'next';
import Link from '@/components/LocaleLink';
import PageHeader from '@/components/PageHeader';
import { getHandbookSections } from '@/lib/dockit';
import { alternatesFor, pageLocale } from '@/i18n';
import text from '@/i18n/pages/guide';

export async function generateMetadata({ params }: PageProps<'/[lang]/handbook'>): Promise<Metadata> {
    const lang = await pageLocale(params);
    const t = text[lang].handbook;
    return { title: t.title, description: t.description, alternates: alternatesFor('/handbook', lang) };
}

export default async function HandbookPage({ params }: PageProps<'/[lang]/handbook'>) {
    const lang = await pageLocale(params);
    const t = text[lang].handbook;
    const sections = getHandbookSections(lang);

    return (
        <div className="container py-12">
            <PageHeader
                eyebrow={t.eyebrow}
                title={t.heading}
                subtitle={t.subtitle}
            />
            <p className="mb-10 max-w-3xl text-muted-foreground">
                {t.clubsBefore}
                <Link className="text-neuro-accent underline" href="/community/start-a-chapter">{t.startChapter}</Link>
                {t.and}
                <Link className="text-neuro-accent underline" href="/students/start-a-club">{t.startClub}</Link>
                {t.draftBefore}
                <strong>{t.draft}</strong>
                {t.draftAfter}
            </p>
            <div className="grid gap-8 md:grid-cols-3">
                {sections.map((section) => (
                    <section key={section.heading}>
                        <h2 className="mb-4 text-xl font-bold">{section.heading}</h2>
                        <ul className="space-y-2">
                            {section.pages.map((page) => (
                                <li key={page.slug}>
                                    <Link href={page.href} className="text-neuro-accent hover:underline">
                                        {page.title}
                                    </Link>
                                </li>
                            ))}
                        </ul>
                    </section>
                ))}
            </div>
        </div>
    );
}
