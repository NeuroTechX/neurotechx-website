import type { Metadata } from 'next';
import { DockitRenderer } from '@/components/DockitRenderer';
import { getDockitContent } from '@/lib/dockit';
import { notFound } from 'next/navigation';

export const metadata: Metadata = {
  title: 'Chapter Guidelines',
  description: 'Mission, structure, and guidelines for organizing and running a local NeuroTechX city chapter.',
  alternates: { canonical: '/community/chapter-guidelines' },
};

async function getPageData() {
  const content = getDockitContent('chapter-guidelines');
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
