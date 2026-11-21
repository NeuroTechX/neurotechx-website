import type { Metadata } from 'next';
import { getDockitContent } from '@/lib/dockit';
import { DockitRenderer } from '@/components/DockitRenderer';
import { notFound } from 'next/navigation';

export const metadata: Metadata = {
    title: 'Chapter Resources',
    description: 'NeuroTechX branding assets, organizer templates, and neurotechnology reference links.',
    alternates: { canonical: '/education/resources' },
};

export default function EducationResourcesPage() {
    const content = getDockitContent('resources');

    if (!content) {
        notFound();
    }

    return (
        <div className="container mx-auto px-4 py-8">
            <DockitRenderer content={content} />
        </div>
    );
}
