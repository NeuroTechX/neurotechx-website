import { notFound } from 'next/navigation';
import en from './en';
import fr, { type Dictionary } from './fr';
import { isLocale, type Locale } from './routes';

export * from './routes';
export * from './text';
export type { Dictionary };

const DICTIONARIES: Record<Locale, Dictionary> = { en, fr };

export const getDictionary = (locale: Locale): Dictionary => DICTIONARIES[locale];

/** Fills {name} placeholders: format('Headline {n} of {total}', { n: 1, total: 3 }). */
export const format = (text: string, values: Record<string, string | number>) =>
  text.replace(/\{(\w+)\}/g, (match, key) => (key in values ? String(values[key]) : match));

/** The language of a page from its params; unknown languages are a 404. */
export async function pageLocale(params: Promise<{ lang: string }>): Promise<Locale> {
  const { lang } = await params;
  if (!isLocale(lang)) notFound();
  return lang;
}
