import Link from 'next/link';
import { notFound } from 'next/navigation';
import { isLocale } from '@/i18n/config';
import { getDictionary } from '@/i18n/dictionaries';
import { site } from '@/content/site';
import { projects } from '@/content/projects';
import { SiteHeader } from '@/components/SiteHeader';
import { ProjectMeta } from '@/components/ProjectMeta';

export default async function HomePage({ params }: PageProps<'/[locale]'>) {
  const { locale } = await params;
  if (!isLocale(locale)) notFound();
  const t = getDictionary(locale);
  const [first, ...rest] = site.name[locale].split(' ');

  return (
    <>
      <SiteHeader locale={locale} t={t} path="" />
      <main id="main" tabIndex={-1} className="container-page pb-24 pt-14 outline-none sm:pt-20">
        <h1 className="sticker">
          <span className="sticker-line">{first}</span>
          <span className="sticker-line">{rest.join(' ')}</span>
        </h1>
        <p className="mt-8 text-lg font-semibold tracking-tight">{site.title}</p>

        <section aria-labelledby="projects-heading" className="mt-16 sm:mt-24">
          <h2 id="projects-heading" className="section-heading">
            {t.home.heading}
          </h2>
          <ul className="mt-8 border-b border-line">
            {projects.map((project) => (
              <li key={project.slug} className="border-t border-line">
                <Link
                  href={`/${locale}/work/${project.slug}`}
                  className="group grid gap-2 py-7 sm:grid-cols-12 sm:gap-8 sm:py-9"
                >
                  <div className="sm:col-span-4">
                    <h3 className="text-xl font-bold tracking-tight group-hover:text-accent sm:text-2xl">
                      {project.name[locale]}
                    </h3>
                    <div className="mt-1">
                      <ProjectMeta project={project} t={t} />
                    </div>
                  </div>
                  <p className="max-w-[62ch] text-ink-muted sm:col-span-7">{project.summary[locale]}</p>
                  <span
                    aria-hidden="true"
                    className="hidden self-start justify-self-end pt-1 text-xl text-ink-muted transition-transform group-hover:translate-x-1 group-hover:text-accent sm:col-span-1 sm:block"
                  >
                    →
                  </span>
                </Link>
              </li>
            ))}
          </ul>
        </section>
      </main>
    </>
  );
}
