import type { Metadata } from 'next';
import DockitPage, { dockitMetadata } from '@/components/DockitPage';
import { pageLocale } from '@/i18n';

export async function generateMetadata({ params }: PageProps<'/[lang]/education/resources'>): Promise<Metadata> {
    return dockitMetadata('resources', '/education/resources', await pageLocale(params));
}

export default async function ResourcesPage({ params }: PageProps<'/[lang]/education/resources'>) {
    return <DockitPage slug="resources" lang={await pageLocale(params)} />;
}
