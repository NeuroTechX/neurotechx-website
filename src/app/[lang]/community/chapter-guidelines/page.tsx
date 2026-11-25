import type { Metadata } from 'next';
import DockitPage, { dockitMetadata } from '@/components/DockitPage';
import { pageLocale } from '@/i18n';

export async function generateMetadata({ params }: PageProps<'/[lang]/community/chapter-guidelines'>): Promise<Metadata> {
    return dockitMetadata('chapter-guidelines', '/community/chapter-guidelines', await pageLocale(params));
}

export default async function ChapterGuidelinesPage({ params }: PageProps<'/[lang]/community/chapter-guidelines'>) {
    return <DockitPage slug="chapter-guidelines" lang={await pageLocale(params)} />;
}
