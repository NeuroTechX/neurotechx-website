import type { Metadata } from 'next';
import { getDockitContent } from '@/lib/dockit';
import { DockitRenderer } from '@/components/DockitRenderer';
import { notFound } from 'next/navigation';

export const metadata: Metadata = {
    title: 'Getting Started',
    description: 'Step-by-step guide to starting a new NeuroTechX chapter in your city.',
    alternates: { canonical: '/education/getting-started' },
};

export default function GettingStartedPage() {
    const content = getDockitContent('getting-started');

    if (!content) {
        notFound();
    }

    return (
        <div className="container mx-auto px-4 py-8">
            <DockitRenderer content={content} />
        </div>
    );
}
