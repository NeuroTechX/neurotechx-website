// Languages and addresses. English is served at the root (/events), French under /fr with
// French page names (/fr/evenements), the way desjardins.com pairs /fr and /en pages.
// The proxy (src/proxy.ts) maps French addresses onto the shared route files in app/[lang].

export const LOCALES = ['en', 'fr'] as const;
export type Locale = (typeof LOCALES)[number];
export const DEFAULT_LOCALE: Locale = 'en';

export const isLocale = (value: string): value is Locale => (LOCALES as readonly string[]).includes(value);

// English path segment → French path segment. Every top-level page is listed, even when its
// name is the same in French. Segments not listed (job categories, handbook slugs) are the
// same in both languages.
const FR_SEGMENTS: Record<string, string> = {
  about: 'a-propos',
  community: 'communaute',
  growth: 'croissance',
  'chapter-guidelines': 'lignes-directrices',
  'start-a-chapter': 'fonder-une-section',
  'content-lab': 'content-lab',
  education: 'formation',
  webinars: 'webinaires',
  'getting-started': 'premiers-pas',
  resources: 'ressources',
  primer: 'primer',
  events: 'evenements',
  projects: 'projets',
  ecosystem: 'ecosysteme',
  reports: 'veille',
  newsletter: 'infolettre',
  jobs: 'emplois',
  funding: 'financement',
  'join-the-team': 'joindre-lequipe',
  transparency: 'transparence',
  donate: 'don',
  students: 'etudiants',
  'start-a-club': 'fonder-un-club',
  'code-of-conduct': 'code-de-conduite',
  privacy: 'confidentialite',
  'ntx-services-partnership-termination': 'fin-partenariat-ntx-services',
  handbook: 'guide-benevole',
};
const EN_SEGMENTS: Record<string, string> = Object.fromEntries(
  Object.entries(FR_SEGMENTS).map(([en, fr]) => [fr, en])
);

const mapSegments = (path: string, table: Record<string, string>) =>
  path
    .split('/')
    .map((segment) => table[segment] ?? segment)
    .join('/');

// '/events/x' → '/evenements/x' (no /fr prefix)
export const toFrenchSegments = (enPath: string) => mapSegments(enPath, FR_SEGMENTS);
// '/evenements/x' → '/events/x'
export const toEnglishSegments = (frPath: string) => mapSegments(frPath, EN_SEGMENTS);

/** Public address of an English route path in the given language: ('/events', 'fr') → '/fr/evenements'. */
export function localizePath(enPath: string, locale: Locale): string {
  if (locale === 'en') return enPath;
  return enPath === '/' ? '/fr' : `/fr${toFrenchSegments(enPath)}`;
}

/** Language and English route path of a public address: '/fr/evenements' → ['fr', '/events']. */
export function parsePublicPath(pathname: string): [Locale, string] {
  if (pathname === '/fr' || pathname.startsWith('/fr/')) {
    return ['fr', toEnglishSegments(pathname.slice(3)) || '/'];
  }
  return ['en', pathname];
}

// Pages whose body text exists in French. Every other page shows the French menu and footer
// with its English text and a notice. Add a route here when its French version is merged.
export const TRANSLATED_ROUTES = new Set<string>([
  '/', '/events', '/about', '/community',
  '/join-the-team', '/donate', '/transparency', '/code-of-conduct', '/privacy',
  '/education', '/education/webinars', '/primer', '/students', '/newsletter',
  '/content-lab', '/reports', '/ecosystem', '/funding', '/projects',
]);

/** True for an existing page whose body is still English only (unknown addresses are 404s, which are translated). */
export const needsTranslation = (routePath: string) =>
  !TRANSLATED_ROUTES.has(routePath) && routePath.split('/')[1] in FR_SEGMENTS;

/**
 * Metadata `alternates` for a translated page: its own address as canonical, plus hreflang
 * links to both languages. Untranslated pages keep `canonical` pointing at the English page,
 * since their French address shows the English text.
 */
export function alternatesFor(enPath: string, locale: Locale) {
  return {
    canonical: localizePath(enPath, locale),
    languages: {
      'en-CA': localizePath(enPath, 'en'),
      'fr-CA': localizePath(enPath, 'fr'),
      'x-default': localizePath(enPath, 'en'),
    },
  };
}
