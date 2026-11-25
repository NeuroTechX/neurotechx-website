import en from './en';
import fr, { type Dictionary } from './fr';
import type { Locale } from './routes';

export * from './routes';
export type { Dictionary };

const DICTIONARIES: Record<Locale, Dictionary> = { en, fr };

export const getDictionary = (locale: Locale): Dictionary => DICTIONARIES[locale];

/** Fills {name} placeholders: format('Headline {n} of {total}', { n: 1, total: 3 }). */
export const format = (text: string, values: Record<string, string | number>) =>
  text.replace(/\{(\w+)\}/g, (match, key) => (key in values ? String(values[key]) : match));
