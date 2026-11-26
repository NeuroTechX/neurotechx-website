import type { MetadataRoute } from 'next';
import { CATEGORIES } from '@/lib/job-boards';
import { getHandbookSections, getSections } from '@/lib/dockit';
import { isTranslated, localizePath } from '@/i18n/routes';

export default function sitemap(): MetadataRoute.Sitemap {
  const base = 'https://neurotechx.org';
  const routes = [
    '', '/about', '/community', '/community/growth', '/community/chapter-guidelines',
    '/community/start-a-chapter',
    '/learn', '/education', '/education/webinars', '/education/getting-started', '/education/resources', '/primer',
    '/events', '/projects', '/ecosystem', '/reports', '/content-lab', '/newsletter', '/jobs', '/funding', '/join-the-team',
    '/transparency', '/donate', '/students', '/students/start-a-club', '/code-of-conduct', '/privacy',
    '/ntx-services-partnership-termination',
    ...CATEGORIES.map((c) => `/jobs/${c.slug}`),
    '/handbook',
    '/guide',
    ...getSections('dockit').flatMap((s) => s.pages.map((p) => p.href)).filter((h) => h.startsWith('/guide/')),
    ...getHandbookSections().flatMap((s) => s.pages.map((p) => `/handbook/${p.slug}`)),
  ];
  const now = new Date();
  const changeFrequency = (r: string) =>
    r === '' || r === '/reports' || r === '/content-lab' || r.startsWith('/jobs') ? 'daily' : 'weekly';
  // French addresses are listed only for pages that have French text (see isTranslated).
  return routes.flatMap((r) => {
    const path = r || '/';
    const entry = { lastModified: now, changeFrequency: changeFrequency(r), priority: r === '' ? 1 : 0.7 } as const;
    if (!isTranslated(path)) return [{ url: `${base}${r}`, ...entry }];
    const languages = { 'en-CA': `${base}${r}`, 'fr-CA': `${base}${localizePath(path, 'fr')}` };
    return [
      { url: languages['en-CA'], ...entry, alternates: { languages } },
      { url: languages['fr-CA'], ...entry, alternates: { languages } },
    ];
  });
}
