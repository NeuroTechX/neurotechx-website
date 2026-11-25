'use client';

import Link from 'next/link';
import { usePathname } from 'next/navigation';
import type { ComponentProps } from 'react';
import { localizePath, parsePublicPath } from '@/i18n/routes';

/**
 * next/link that keeps visitors in the language they are reading: on a French page,
 * href="/events" goes to /fr/evenements. Pages pass English route paths, as before.
 */
export default function LocaleLink({ href, ...props }: ComponentProps<typeof Link>) {
  const [locale] = parsePublicPath(usePathname() ?? '/');
  const target =
    typeof href === 'string' && href.startsWith('/') && !href.startsWith('//')
      ? localizeHref(href, locale)
      : href;
  return <Link href={target} {...props} />;
}

function localizeHref(href: string, locale: 'en' | 'fr') {
  const match = href.match(/^([^?#]*)(.*)$/);
  const [path, rest] = match ? [match[1] || '/', match[2]] : [href, ''];
  return localizePath(path, locale) + rest;
}
