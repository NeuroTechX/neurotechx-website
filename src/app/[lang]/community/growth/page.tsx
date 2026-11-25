import type { Metadata } from 'next';
import DockitPage, { dockitMetadata } from '@/components/DockitPage';
import { pageLocale } from '@/i18n';

export async function generateMetadata({ params }: PageProps<'/[lang]/community/growth'>): Promise<Metadata> {
    return dockitMetadata('community-growth', '/community/growth', await pageLocale(params));
}

export default async function CommunityGrowthPage({ params }: PageProps<'/[lang]/community/growth'>) {
    return <DockitPage slug="community-growth" lang={await pageLocale(params)} />;
}
