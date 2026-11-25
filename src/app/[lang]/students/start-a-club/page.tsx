import type { Metadata } from 'next';
import { DockitRenderer } from '@/components/DockitRenderer';
import { getDockitContent } from '@/lib/dockit';
import { notFound } from 'next/navigation';

export const metadata: Metadata = {
  title: 'Starting a Student Club',
  description: 'How to start a university neurotechnology club, or bring an existing club into the NeuroTechX network.',
  alternates: { canonical: '/students/start-a-club' },
};

async function getPageData() {
  const content = getDockitContent('student-club-onboarding');
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
