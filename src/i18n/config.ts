export const locales = ['uk', 'en', 'pl'] as const;
export type Locale = (typeof locales)[number];

export const defaultLocale: Locale = 'en';

/** Label shown in the language switcher. */
export const localeLabels: Record<Locale, string> = { uk: 'UA', en: 'EN', pl: 'PL' };

/** Full language name, used as the accessible name of each switcher link. */
export const localeNames: Record<Locale, string> = {
  uk: 'Українська',
  en: 'English',
  pl: 'Polski',
};

/** BCP 47 tags for <html lang>, hreflang and Intl. */
export const localeTags: Record<Locale, string> = { uk: 'uk-UA', en: 'en', pl: 'pl-PL' };

export function isLocale(value: string): value is Locale {
  return (locales as readonly string[]).includes(value);
}

export const siteUrl = 'https://klymentii-portfolio.vercel.app';

/** Canonical path plus hreflang alternates (x-default points to English). */
export function alternatesFor(locale: Locale, path = '') {
  const languages: Record<string, string> = {};
  for (const l of locales) languages[localeTags[l]] = `/${l}${path}`;
  languages['x-default'] = `/${defaultLocale}${path}`;
  return { canonical: `/${locale}${path}`, languages };
}
