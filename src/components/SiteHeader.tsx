import Link from 'next/link';
import { localeLabels, localeNames, locales, type Locale } from '@/i18n/config';
import type { Dictionary } from '@/i18n/dictionaries';
import { site } from '@/content/site';
import { ThemeToggle } from './ThemeToggle';

type Props = {
  locale: Locale;
  t: Dictionary;
  /** Path after the locale segment, used to build the language links ('' for Home). */
  path: string;
};

export function SiteHeader({ locale, t, path }: Props) {
  const home = `/${locale}`;
  const anchors = [
    { href: `${home}#work`, label: t.nav.work },
    { href: `${home}#services`, label: t.nav.services },
    { href: `${home}#experience`, label: t.nav.experience },
    { href: `${home}#business`, label: t.nav.business },
    { href: `${home}#contact`, label: t.nav.contact },
  ];

  return (
    <header className="sticky top-0 z-30 border-b border-line bg-paper/90 backdrop-blur-sm supports-[backdrop-filter]:bg-paper/75">
      <a
        href="#main"
        className="sr-only focus:not-sr-only focus:fixed focus:left-4 focus:top-3 focus:z-50 focus:rounded-md focus:bg-accent focus:px-4 focus:py-2 focus:text-accent-ink"
      >
        {t.nav.skip}
      </a>
      <div className="container-page flex h-16 items-center justify-between gap-4">
        <Link href={home} className="text-sm font-bold tracking-tight">
          {site.name[locale]}
        </Link>

        <nav aria-label={t.nav.main} className="hidden lg:block">
          <ul className="flex items-center gap-6 text-sm text-ink-muted">
            {anchors.map((a) => (
              <li key={a.href}>
                <a href={a.href} className="hover:text-ink">
                  {a.label}
                </a>
              </li>
            ))}
          </ul>
        </nav>

        <div className="flex items-center gap-1">
          <nav aria-label={t.nav.language}>
            <ul className="flex items-center text-sm">
              {locales.map((l) => (
                <li key={l}>
                  <Link
                    href={`/${l}${path}`}
                    hrefLang={l}
                    lang={l}
                    aria-current={l === locale ? 'true' : undefined}
                    className="inline-flex h-11 min-w-11 items-center justify-center rounded-md px-2 text-ink-muted hover:text-ink aria-[current=true]:font-bold aria-[current=true]:text-ink"
                  >
                    {localeLabels[l]}
                    <span className="sr-only"> {localeNames[l]}</span>
                  </Link>
                </li>
              ))}
            </ul>
          </nav>
          <ThemeToggle toDark={t.nav.themeToDark} toLight={t.nav.themeToLight} />
        </div>
      </div>
    </header>
  );
}
