import type { Locale } from '@/i18n/config';
import type { Dictionary } from '@/i18n/dictionaries';
import { site } from '@/content/site';
import { CvMenu } from './CvMenu';

export function Hero({ locale, t }: { locale: Locale; t: Dictionary }) {
  const [first, ...rest] = site.name[locale].split(' ');

  return (
    <section aria-labelledby="hero-name" className="container-page pb-20 pt-14 sm:pt-20 lg:pb-28 lg:pt-24">
      {/* The 3D intro (next step) lands on this element; the text is real HTML and never waits for WebGL. */}
      <h1 id="hero-name" className="sticker" data-intro-target>
        <span className="sticker-line">{first}</span>
        <span className="sticker-line">{rest.join(' ')}</span>
      </h1>

      <div className="mt-10 grid gap-8 lg:mt-14 lg:grid-cols-12">
        <div className="lg:col-span-7">
          <p className="text-xl font-semibold tracking-tight">{site.title}</p>
          <p className="mt-4 max-w-[60ch] text-ink-muted">{site.statement[locale]}</p>
        </div>

        <ul className="grid content-start gap-3 text-sm lg:col-span-4 lg:col-start-9 lg:border-l lg:border-line lg:pl-6">
          <li className="font-medium">{site.stackLine}</li>
          <li className="flex items-baseline gap-2">
            <span className="relative top-[-1px] inline-block size-2 shrink-0 rounded-full bg-accent" aria-hidden="true" />
            {site.status[locale]}
          </li>
          <li className="text-ink-muted">{site.experienceLine[locale]}</li>
        </ul>
      </div>

      <div className="mt-10 flex flex-wrap items-start gap-3">
        <a href="#work" className="btn btn-primary">
          {t.hero.ctaProjects}
        </a>
        <CvMenu locale={locale} t={t} />
        <a href="#contact" className="btn">
          {t.hero.ctaContact}
        </a>
      </div>
    </section>
  );
}
