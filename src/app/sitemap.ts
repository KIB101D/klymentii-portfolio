import type { MetadataRoute } from 'next';
import { alternatesFor, locales, siteUrl } from '@/i18n/config';
import { projectSlugs } from '@/content/projects';

/** Home and every project page in each locale, with hreflang alternates. */
export default function sitemap(): MetadataRoute.Sitemap {
  const paths = ['', ...projectSlugs.map((slug) => `/work/${slug}`)];
  return paths.flatMap((path) =>
    locales.map((locale) => {
      const { languages } = alternatesFor(locale, path);
      return {
        url: `${siteUrl}/${locale}${path}`,
        changeFrequency: 'monthly' as const,
        priority: path === '' ? 1 : 0.8,
        alternates: {
          languages: Object.fromEntries(Object.entries(languages).map(([k, v]) => [k, `${siteUrl}${v}`])),
        },
      };
    }),
  );
}
