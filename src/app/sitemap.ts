import type { MetadataRoute } from 'next';
import { alternatesFor, defaultLocale, locales, siteUrl } from '@/i18n/config';

/** Home in every locale with hreflang alternates. Case studies are added with their pages. */
export default function sitemap(): MetadataRoute.Sitemap {
  const paths = [''];
  return paths.flatMap((path) =>
    locales.map((locale) => {
      const { languages } = alternatesFor(locale, path);
      return {
        url: `${siteUrl}/${locale}${path}`,
        changeFrequency: 'monthly' as const,
        priority: path === '' ? (locale === defaultLocale ? 1 : 0.9) : 0.8,
        alternates: {
          languages: Object.fromEntries(Object.entries(languages).map(([k, v]) => [k, `${siteUrl}${v}`])),
        },
      };
    }),
  );
}
