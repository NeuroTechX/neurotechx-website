'use client';

import { usePathname } from 'next/navigation';
import { needsTranslation, parsePublicPath } from '@/i18n/routes';

// On a French address whose page has no French text yet, say so and mark the English body
// as English for screen readers and search engines.
export default function TranslationGate({ notice, children }: { notice: string; children: React.ReactNode }) {
  const [locale, routePath] = parsePublicPath(usePathname() ?? '/');
  if (locale === 'en' || !needsTranslation(routePath)) return <>{children}</>;
  return (
    <>
      <p role="note" className="border-b border-[var(--border)] bg-[var(--surface-1)] px-4 py-3 text-center text-sm text-muted-foreground">
        {notice}
      </p>
      <div lang="en">{children}</div>
    </>
  );
}
