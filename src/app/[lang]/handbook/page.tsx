import type { Metadata } from 'next';
import Link from '@/components/LocaleLink';
import PageHeader from '@/components/PageHeader';
import { getHandbookSections } from '@/lib/dockit';

export const metadata: Metadata = {
    title: 'Volunteer Handbook',
    description:
        'The NeuroTechX volunteer handbook: how to join, the contributor agreement, tools and access, privacy, money and leaving.',
    alternates: { canonical: '/handbook' },
};

export default function HandbookPage() {
    const sections = getHandbookSections();

    return (
        <div className="container py-12">
            <PageHeader
                eyebrow="Volunteer handbook"
                title="Working with NeuroTechX"
                subtitle="How you join, what you agree to, the tools you get, how we work together, and how you leave."
            />
            <p className="mb-10 max-w-3xl text-muted-foreground">
                Chapters and student clubs have their own guides: <Link className="text-neuro-accent underline" href="/community/start-a-chapter">starting a chapter</Link> and{' '}
                <Link className="text-neuro-accent underline" href="/students/start-a-club">starting a club</Link>. Passages marked{' '}
                <strong>Draft</strong> describe something not yet decided.
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
