'use client';

import { usePathname } from 'next/navigation';
import { localizePath, parsePublicPath } from '@/i18n/routes';
import styles from './Header.module.css';

// FR | EN, top right: the current language is marked, the other links to the same page in it.
export default function LanguageSwitch({ label }: { label: string }) {
  const [locale, routePath] = parsePublicPath(usePathname() ?? '/');
  const options = [
    { code: 'fr', short: 'FR', name: 'Français' },
    { code: 'en', short: 'EN', name: 'English' },
  ] as const;

  return (
    <nav aria-label={label} className={styles.languageSwitch}>
      {options.map((option, index) => (
        <span key={option.code} className={styles.languageItem}>
          {index > 0 && <span aria-hidden="true" className={styles.languageDivider}>|</span>}
          {option.code === locale ? (
            <span aria-current="true" className={styles.languageCurrent} title={option.name}>
              {option.short}
            </span>
          ) : (
            // A plain link: the other language reloads the page with its own <html lang>.
            <a
              href={localizePath(routePath, option.code)}
              hrefLang={option.code === 'fr' ? 'fr-CA' : 'en'}
              lang={option.code}
              className={styles.languageLink}
            >
              <abbr title={option.name} className="no-underline">{option.short}</abbr>
              <span className="sr-only"> ({option.name})</span>
            </a>
          )}
        </span>
      ))}
    </nav>
  );
}
