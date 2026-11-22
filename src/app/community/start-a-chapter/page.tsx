import type { Metadata } from 'next';
import { DockitRenderer } from '@/components/DockitRenderer';
import { getDockitContent } from '@/lib/dockit';
import { notFound } from 'next/navigation';

export const metadata: Metadata = {
  title: 'Starting a Chapter',
  description: 'How to start or restart a NeuroTechX chapter in your city: what you get, what we ask, and your first 90 days.',
  alternates: { canonical: '/community/start-a-chapter' },
};

async function getPageData() {
  const content = getDockitContent('chapter-onboarding');
  if (!content) {
    return null;
  }
  return content;
}

export default async function Page() {
  const content = await getPageData();
  if (!content) {
    notFound();
  }
  return (
    <div className="container mx-auto px-4 py-8">
      <DockitRenderer content={content} />
    </div>
  );
}
