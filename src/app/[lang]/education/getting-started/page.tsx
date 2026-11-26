import type { Metadata } from 'next';
import DockitPage, { dockitMetadata } from '@/components/DockitPage';
import { pageLocale } from '@/i18n';

export async function generateMetadata({ params }: PageProps<'/[lang]/education/getting-started'>): Promise<Metadata> {
    return dockitMetadata('getting-started', '/education/getting-started', await pageLocale(params));
}

export default async function GettingStartedPage({ params }: PageProps<'/[lang]/education/getting-started'>) {
    return <DockitPage slug="getting-started" lang={await pageLocale(params)} />;
}
