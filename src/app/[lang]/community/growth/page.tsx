import type { Metadata } from 'next';
import { getDockitContent } from '@/lib/dockit';
import { DockitRenderer } from '@/components/DockitRenderer';
import { notFound } from 'next/navigation';

export const metadata: Metadata = {
    title: 'Community Growth',
    description: 'Practical tips and playbooks for growing a local NeuroTechX chapter and hosting engaging neurotech meetups.',
    alternates: { canonical: '/community/growth' },
};

export default function CommunityGrowthPage() {
    const content = getDockitContent('community-growth');

    if (!content) {
        notFound();
    }

    return (
        <div className="container mx-auto px-4 py-8">
            <DockitRenderer content={content} />
        </div>
    );
}
