import type { Metadata } from 'next';
import Link from 'next/link';
import PageHeader from '@/components/PageHeader';
import { getSections } from '@/lib/dockit';

export const metadata: Metadata = {
    title: 'Chapter and Club Guide',
    description:
        'The NeuroTechX guide for chapters and student clubs: getting started, chapter guidelines, growing a community, meetups, hacknights and sponsorship.',
    alternates: { canonical: '/guide' },
};

export default function GuidePage() {
    const sections = getSections('dockit');

    return (
        <div className="container py-12">
            <PageHeader
                eyebrow="Guide"
                title="Chapter and club guide"
                subtitle="Everything a NeuroTechX chapter or student club needs: how to start, what we expect, and how to grow."
            />
            <p className="mb-10 max-w-3xl text-muted-foreground">
                Volunteering for NeuroTechX itself? See the{' '}
                <Link className="text-neuro-accent underline" href="/handbook">volunteer handbook</Link>.
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
