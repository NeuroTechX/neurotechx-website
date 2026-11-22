import type { MetadataRoute } from 'next';
import { CATEGORIES } from '@/lib/job-boards';

export default function sitemap(): MetadataRoute.Sitemap {
  const base = 'https://neurotechx.org';
  const routes = [
    '', '/about', '/community', '/community/growth', '/community/chapter-guidelines',
    '/education', '/education/webinars', '/education/getting-started', '/education/resources', '/primer',
    '/events', '/projects', '/ecosystem', '/reports', '/content-lab', '/newsletter', '/jobs', '/join-the-team',
    '/transparency', '/donate', '/students', '/code-of-conduct', '/privacy',
    '/ntx-services-partnership-termination',
    ...CATEGORIES.map((c) => `/jobs/${c.slug}`),
  ];
  const now = new Date();
  return routes.map((r) => ({
    url: `${base}${r}`,
    lastModified: now,
    changeFrequency: r === '' || r === '/reports' || r === '/content-lab' || r.startsWith('/jobs') ? 'daily' : 'weekly',
    priority: r === '' ? 1 : 0.7,
  }));
}
