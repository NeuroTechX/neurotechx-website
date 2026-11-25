import type { Locale } from './routes';

// The same shape with every string widened to `string`: the English text must have exactly
// the keys of the French text it is written from.
export type Strings<T> = { [K in keyof T]: T[K] extends string ? string : Strings<T[K]> };

/** Page text written in French first, then English with the same keys. */
export function bilingual<T>(fr: T, en: Strings<T>): Record<Locale, Strings<T>> {
  return { fr: fr as Strings<T>, en };
}
