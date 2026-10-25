import type { Metadata } from 'next';
import Link from 'next/link';
import { notFound } from 'next/navigation';
import { alternatesFor, isLocale, locales } from '@/i18n/config';
import { getDictionary } from '@/i18n/dictionaries';
import { getProject, isProjectSlug, projectSlugs } from '@/content/projects';
import { SiteHeader } from '@/components/SiteHeader';
import { ProjectMeta } from '@/components/ProjectMeta';
import { ExternalLink } from '@/components/ExternalLink';

export const dynamicParams = false;

export function generateStaticParams() {
  return locales.flatMap((locale) => projectSlugs.map((slug) => ({ locale, slug })));
}

export async function generateMetadata({ params }: PageProps<'/[locale]/work/[slug]'>): Promise<Metadata> {
  const { locale, slug } = await params;
  if (!isLocale(locale) || !isProjectSlug(slug)) return {};
  const project = getProject(slug);
  return {
    title: project.name[locale],
    description: project.summary[locale],
    alternates: alternatesFor(locale, `/work/${slug}`),
    openGraph: { title: project.name[locale], description: project.summary[locale], url: `/${locale}/work/${slug}` },
  };
}

export default async function ProjectPage({ params }: PageProps<'/[locale]/work/[slug]'>) {
  const { locale, slug } = await params;
  if (!isLocale(locale) || !isProjectSlug(slug)) notFound();
  const t = getDictionary(locale);
  const project = getProject(slug);
  const { links } = project;

  return (
    <>
      <SiteHeader locale={locale} t={t} path={`/work/${slug}`} />
      <main id="main" tabIndex={-1} className="container-page pb-24 pt-10 outline-none sm:pt-14">
        <Link href={`/${locale}`} className="inline-flex min-h-11 items-center gap-2 text-sm text-ink-muted hover:text-ink">
          <span aria-hidden="true">←</span>
          {t.project.back}
        </Link>

        <article className="mt-6 max-w-3xl">
          <ProjectMeta project={project} t={t} />
          <h1 className="mt-2 text-[clamp(2.5rem,1.6rem+4vw,4.5rem)] font-extrabold leading-[1.02] tracking-[-0.035em]">
            {project.name[locale]}
          </h1>
          <p className="mt-6 text-lg leading-relaxed">{project.summary[locale]}</p>

          <div className="mt-8 flex flex-wrap items-center gap-3">
            <ExternalLink href={links.demo} newTabLabel={t.project.opensInNewTab} className="btn btn-primary">
              {t.project.demo}
            </ExternalLink>
            {links.github ? (
              <ExternalLink href={links.github} newTabLabel={t.project.opensInNewTab} className="btn">
                {t.project.github}
              </ExternalLink>
            ) : null}
            {links.extra?.map((extra) => (
              <ExternalLink key={extra.href} href={extra.href} newTabLabel={t.project.opensInNewTab} className="btn">
                {extra.label[locale]}
              </ExternalLink>
            ))}
          </div>
          {links.demoNote ? <p className="mt-3 text-sm text-ink-muted">{links.demoNote[locale]}</p> : null}

          <ul className="mt-12 space-y-5 border-t border-line pt-10">
            {project.points[locale].map((point) => (
              <li key={point} className="relative pl-6 text-ink-muted">
                <span className="absolute left-0 top-[0.7em] h-px w-3 bg-ink" aria-hidden="true" />
                {point}
              </li>
            ))}
          </ul>

          <h2 className="mt-12 text-sm font-semibold">{t.project.stack}</h2>
          <ul className="mt-3 flex flex-wrap gap-2">
            {project.stack.map((tech) => (
              <li key={tech} className="chip">
                {tech}
              </li>
            ))}
          </ul>
        </article>
      </main>
    </>
  );
}
