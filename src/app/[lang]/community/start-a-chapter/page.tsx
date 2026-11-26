import type { Metadata } from 'next';
import DockitPage, { dockitMetadata } from '@/components/DockitPage';
import { pageLocale } from '@/i18n';

export async function generateMetadata({ params }: PageProps<'/[lang]/community/start-a-chapter'>): Promise<Metadata> {
    return dockitMetadata('chapter-onboarding', '/community/start-a-chapter', await pageLocale(params));
}

export default async function StartAChapterPage({ params }: PageProps<'/[lang]/community/start-a-chapter'>) {
    return <DockitPage slug="chapter-onboarding" lang={await pageLocale(params)} />;
}
