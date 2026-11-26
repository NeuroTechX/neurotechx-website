import type { Metadata } from 'next';
import DockitPage, { dockitMetadata } from '@/components/DockitPage';
import { pageLocale } from '@/i18n';

export async function generateMetadata({ params }: PageProps<'/[lang]/students/start-a-club'>): Promise<Metadata> {
    return dockitMetadata('student-club-onboarding', '/students/start-a-club', await pageLocale(params));
}

export default async function StartAClubPage({ params }: PageProps<'/[lang]/students/start-a-club'>) {
    return <DockitPage slug="student-club-onboarding" lang={await pageLocale(params)} />;
}
