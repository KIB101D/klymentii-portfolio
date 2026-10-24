import { locales, localeLabels, type Locale } from '@/i18n/config';
import type { Dictionary } from '@/i18n/dictionaries';
import { site } from '@/content/site';

/** Native <details> so the three CV links work without JS. */
export function CvMenu({ locale, t }: { locale: Locale; t: Dictionary }) {
  const ordered = [locale, ...locales.filter((l) => l !== locale)];
  return (
    <details className="group relative">
      <summary className="btn list-none [&::-webkit-details-marker]:hidden">
        {t.hero.ctaCv}
        <svg viewBox="0 0 16 16" className="size-4 transition-transform group-open:rotate-180" fill="none" stroke="currentColor" strokeWidth="1.6" aria-hidden="true">
          <path d="m4 6 4 4 4-4" strokeLinecap="round" strokeLinejoin="round" />
        </svg>
      </summary>
      <ul className="absolute left-0 top-full z-20 mt-2 min-w-56 rounded-md border border-line bg-paper-raised p-1 shadow-lg shadow-black/10">
        {ordered.map((l) => (
          <li key={l}>
            <a
              href={site.cv[l]}
              download
              hrefLang={l}
              className="flex items-center justify-between gap-6 rounded-sm px-3 py-2.5 text-sm hover:bg-paper"
            >
              <span>{t.contact.cv[l]}</span>
              <span className="text-xs text-ink-muted">
                {localeLabels[l]} · {t.contact.pdf}
              </span>
            </a>
          </li>
        ))}
      </ul>
    </details>
  );
}
