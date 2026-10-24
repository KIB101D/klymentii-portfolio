import Link from 'next/link';
import { localeLabels, localeTags, locales, type Locale } from '@/i18n/config';
import type { Dictionary } from '@/i18n/dictionaries';
import { site } from '@/content/site';
import { getProject, projects } from '@/content/projects';
import { capabilities, offers } from '@/content/services';
import { experience } from '@/content/experience';
import { isTodo, type ExperienceItem, type YearMonth } from '@/content/types';
import { ExternalLink } from '../ExternalLink';
import { TodoMark } from '../Todo';
import { ProjectCard } from './ProjectCard';

type SectionProps = { locale: Locale; t: Dictionary };

function ProjectLinks({ slugs, locale }: { slugs: readonly { slug: Parameters<typeof getProject>[0]; note?: string }[]; locale: Locale }) {
  return (
    <>
      {slugs.map(({ slug, note }, i) => (
        <span key={slug}>
          {i > 0 ? ', ' : null}
          <Link href={`/${locale}/work/${slug}`} className="link">
            {getProject(slug).name[locale]}
            {note ? ` (${note})` : null}
          </Link>
        </span>
      ))}
    </>
  );
}

export function WorkSection({ locale, t }: SectionProps) {
  return (
    <section id="work" aria-labelledby="work-heading" className="container-page pb-8">
      <h2 id="work-heading" className="section-heading mb-8">
        {t.work.heading}
      </h2>
      {projects.map((project, i) => (
        <ProjectCard key={project.slug} project={project} locale={locale} t={t} index={i} />
      ))}
    </section>
  );
}

export function ServicesSection({ locale, t }: SectionProps) {
  return (
    <section id="services" aria-labelledby="services-heading" className="border-t border-line bg-paper-raised py-20 lg:py-28">
      <div className="container-page">
        <h2 id="services-heading" className="section-heading">
          {t.services.heading}
        </h2>
        <ul className="mt-12 grid gap-x-10 gap-y-12 sm:grid-cols-2 lg:grid-cols-4">
          {capabilities.map((c) => (
            <li key={c.id} className="flex flex-col">
              <h3 className="text-lg font-bold tracking-tight">{c.title[locale]}</h3>
              <p className="mt-3 text-sm text-ink-muted">{c.body[locale]}</p>
              <p className="mt-4 text-sm">
                <span className="text-ink-muted">{t.services.proof}: </span>
                <ProjectLinks slugs={c.proof.map((slug) => ({ slug }))} locale={locale} />
              </p>
            </li>
          ))}
        </ul>
      </div>
    </section>
  );
}

function formatMonth(value: YearMonth, locale: Locale): string {
  const [year, month] = value.split('-').map(Number);
  const date = new Date(Date.UTC(year ?? 2000, (month ?? 1) - 1, 1));
  const name = new Intl.DateTimeFormat(localeTags[locale], { month: 'long', timeZone: 'UTC' }).format(date);
  return `${name} ${year}`;
}

function formatPeriod(period: ExperienceItem['period'], locale: Locale, present: string): string {
  if ('year' in period) return period.year;
  const end = period.end === 'present' ? present : formatMonth(period.end, locale);
  return `${formatMonth(period.start, locale)} – ${end}`;
}

export function ExperienceSection({ locale, t }: SectionProps) {
  return (
    <section id="experience" aria-labelledby="experience-heading" className="container-page py-20 lg:py-28">
      <h2 id="experience-heading" className="section-heading">
        {t.experience.heading}
      </h2>
      <ol className="mt-12 border-l border-line-strong">
        {experience.map((item) => (
          <li key={item.id} className="relative grid gap-1 pb-10 pl-6 last:pb-0 md:grid-cols-12 md:gap-10 md:pl-8">
            <span className="absolute -left-[6px] top-[0.4rem] size-[11px] rounded-full border-2 border-paper bg-ink" aria-hidden="true" />
            <p className="text-sm tabular-nums text-ink-muted md:col-span-3 md:pt-0.5">
              {formatPeriod(item.period, locale, t.experience.present)}
            </p>
            <div className="md:col-span-9">
              <h3 className="text-lg font-bold tracking-tight">{item.role[locale]}</h3>
              {item.org ? <p className="text-sm font-medium">{item.org[locale]}</p> : null}
              {item.summary ? <p className="mt-2 max-w-[65ch] text-sm text-ink-muted">{item.summary[locale]}</p> : null}
              {item.projects ? (
                <p className="mt-2 text-sm">
                  <ProjectLinks slugs={item.projects.map((slug) => ({ slug }))} locale={locale} />
                </p>
              ) : null}
            </div>
          </li>
        ))}
      </ol>
    </section>
  );
}

export function BusinessSection({ locale, t }: SectionProps) {
  return (
    <section id="business" aria-labelledby="business-heading" className="border-t border-line bg-paper-raised py-20 lg:py-28">
      <div className="container-page">
        <h2 id="business-heading" className="section-heading">
          {t.business.heading}
        </h2>
        <ul className="mt-12 grid gap-px overflow-hidden rounded-lg border border-line bg-line md:grid-cols-3">
          {offers.map((o) => (
            <li key={o.id} className="flex flex-col bg-paper-raised p-6 lg:p-8">
              <h3 className="text-lg font-bold tracking-tight">{o.title[locale]}</h3>
              <p className="mt-3 flex-1 text-sm text-ink-muted">{o.body[locale]}</p>
              <p className="mt-6 text-sm">
                <span className="text-ink-muted">{t.business.proof}: </span>
                <ProjectLinks
                  slugs={o.proof.map((p) => (p.note ? { slug: p.slug, note: p.note[locale] } : { slug: p.slug }))}
                  locale={locale}
                />
              </p>
            </li>
          ))}
        </ul>
        <a href="#contact" className="btn btn-primary mt-10">
          {t.business.cta}
        </a>
      </div>
    </section>
  );
}

export function ContactSection({ t }: SectionProps) {
  const { email, linkedin, github, telegram } = site.contacts;
  const linkClass = 'link text-base font-semibold';

  return (
    <section id="contact" aria-labelledby="contact-heading" className="container-page py-20 lg:py-28">
      <h2 id="contact-heading" className="section-heading">
        {t.contact.heading}
      </h2>
      <p className="mt-4 text-ink-muted">{t.contact.lead}</p>

      <div className="mt-10 grid gap-12 lg:grid-cols-12">
        <div className="lg:col-span-7">
          <a href={`mailto:${email}`} className="break-all text-xl font-bold tracking-tight underline decoration-line-strong decoration-2 underline-offset-[0.2em] hover:decoration-accent sm:text-2xl">
            {email}
          </a>
          <ul className="mt-8 flex flex-wrap gap-x-8 gap-y-3">
            <li>
              <ExternalLink href={linkedin} newTabLabel={t.work.opensInNewTab} className={linkClass}>
                {t.contact.linkedin}
              </ExternalLink>
            </li>
            <li>
              <ExternalLink href={github} newTabLabel={t.work.opensInNewTab} className={linkClass}>
                {t.contact.github}
              </ExternalLink>
            </li>
            {isTodo(telegram) ? (
              <li>
                <TodoMark value={telegram} />
              </li>
            ) : (
              <li>
                <ExternalLink href={`https://t.me/${telegram}`} newTabLabel={t.work.opensInNewTab} className={linkClass}>
                  {t.contact.telegram}
                </ExternalLink>
              </li>
            )}
          </ul>
        </div>

        <div className="lg:col-span-4 lg:col-start-9">
          <h3 className="text-sm font-semibold">{t.contact.cvHeading}</h3>
          <ul className="mt-3 divide-y divide-line border-y border-line">
            {locales.map((l) => (
              <li key={l}>
                <a href={site.cv[l]} download hrefLang={l} className="flex items-center justify-between py-3 text-sm hover:text-accent">
                  <span>{t.contact.cv[l]}</span>
                  <span className="text-xs text-ink-muted">
                    {localeLabels[l]} · {t.contact.pdf}
                  </span>
                </a>
              </li>
            ))}
          </ul>
        </div>
      </div>
    </section>
  );
}

export function SiteFooter({ t }: { t: Dictionary }) {
  return (
    <footer className="border-t border-line">
      <div className="container-page flex h-20 items-center text-xs text-ink-muted">
        <p>
          © {new Date().getFullYear()} {t.footer.rights}
        </p>
      </div>
    </footer>
  );
}
