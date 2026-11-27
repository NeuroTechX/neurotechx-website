import { permanentRedirect } from 'next/navigation';
import { FNIRS_LAB_PATH } from '@/content/learn/primer-chapters';
import { pageLocale } from '@/i18n';
import { localizePath } from '@/i18n/routes';

export default async function PreviousFnirsLab({ params }: PageProps<'/[lang]/learn/labs/fnirs-short-channels'>) {
    const lang = await pageLocale(params);
    permanentRedirect(localizePath(FNIRS_LAB_PATH, lang));
}
