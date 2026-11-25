import { NextResponse, type NextRequest } from 'next/server';
import { localizePath, parsePublicPath } from '@/i18n/routes';

// Every page lives in app/[lang]. Public addresses are English at the root (/events) and
// French under /fr with French page names (/fr/evenements); this maps them onto the route files.
export function proxy(request: NextRequest) {
  const url = request.nextUrl.clone();
  const { pathname } = url;

  // /en/... is the internal address of the English pages; send visitors to the root one.
  if (pathname === '/en' || pathname.startsWith('/en/')) {
    url.pathname = pathname.slice(3) || '/';
    return NextResponse.redirect(url, 308);
  }

  const [locale, routePath] = parsePublicPath(pathname);

  // /fr/events (English page name under /fr) → /fr/evenements, so each page has one French address.
  if (locale === 'fr') {
    const canonical = localizePath(routePath, 'fr');
    if (canonical !== pathname.replace(/\/$/, '')) {
      url.pathname = canonical;
      return NextResponse.redirect(url, 308);
    }
  }

  url.pathname = `/${locale}${routePath === '/' ? '' : routePath}`;
  return NextResponse.rewrite(url);
}

export const config = {
  // Skip Next internals, route handlers and anything with a file extension (icons, feed.xml,
  // robots.txt, sitemap.xml, files in public/).
  matcher: ['/((?!_next/|api/|opengraph-image|.*\\.[a-zA-Z0-9]+$).*)'],
};
