import type { Metadata } from 'next';
import { alternatesFor, pageLocale } from '@/i18n';
import text from '@/i18n/pages/code-of-conduct';

export async function generateMetadata({ params }: PageProps<'/[lang]/code-of-conduct'>): Promise<Metadata> {
    const lang = await pageLocale(params);
    const t = text[lang];
    return { title: t.title, description: t.description, alternates: alternatesFor('/code-of-conduct', lang) };
}

const COVENANT = 'https://www.contributor-covenant.org/version/1/4/code-of-conduct.html';

export default async function CodeOfConductPage({ params }: PageProps<'/[lang]/code-of-conduct'>) {
    const lang = await pageLocale(params);
    const t = text[lang];
    return (
        <div className="container py-12 max-w-4xl mx-auto">
            <h1 className="text-4xl font-serif font-bold mb-8">{t.heading}</h1>

            <div className="prose prose-invert max-w-none prose-a:text-neuro-accent">
                <p className="lead text-xl text-muted-foreground mb-8">{t.lead}</p>

                {t.sections.map((section) => (
                    <section key={section.heading}>
                        <h2>{section.heading}</h2>
                        {section.body.map((block, index) =>
                            Array.isArray(block) ? (
                                <ul key={index}>
                                    {block.map((item) => (
                                        <li key={item}>{item}</li>
                                    ))}
                                </ul>
                            ) : (
                                <p key={index}>{block}</p>
                            )
                        )}
                    </section>
                ))}

                <h2>{t.enforcementHeading}</h2>
                <p>
                    {t.enforcementBefore}{' '}
                    <a href="mailto:admins@neurotechx.org" className="text-neuro-accent hover:underline">admins@neurotechx.org</a>.{' '}
                    {t.enforcementAfter}
                </p>
                <p>{t.enforcementMaintainers}</p>

                <h2>{t.attributionHeading}</h2>
                <p className="text-sm text-muted-foreground mt-8 border-t pt-4">
                    {t.attributionBefore}{' '}
                    <a href="https://www.contributor-covenant.org" target="_blank" rel="noopener noreferrer" className="underline">Contributor Covenant</a>
                    {t.attributionMiddle}{' '}
                    <a href={COVENANT} target="_blank" rel="noopener noreferrer" className="underline">{COVENANT}</a>
                </p>
            </div>
        </div>
    );
}
