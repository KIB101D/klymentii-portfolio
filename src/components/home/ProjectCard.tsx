import Image from 'next/image';
import Link from 'next/link';
import type { Locale } from '@/i18n/config';
import type { Dictionary } from '@/i18n/dictionaries';
import { isTodo, type Project } from '@/content/types';
import { ExternalLink } from '../ExternalLink';
import { TodoMark } from '../Todo';

type Props = { project: Project; locale: Locale; t: Dictionary; index: number };

export function ProjectCard({ project, locale, t, index }: Props) {
  const caseHref = `/${locale}/work/${project.slug}`;
  const headingId = `project-${project.slug}`;
  const still = project.card.still;

  return (
    <article aria-labelledby={headingId} className="grid items-center gap-6 border-t border-line py-10 md:grid-cols-12 md:gap-10 lg:py-14">
      {/* Studio stage. Later the shared WebGL canvas draws the live object over this exact rect. */}
      <Link
        href={caseHref}
        tabIndex={-1}
        aria-hidden="true"
        className="stage block md:col-span-5"
        data-stage={project.slug}
        data-live={project.card.kind === 'live3d' ? project.card.model : undefined}
      >
        {isTodo(still) ? (
          <span className="absolute inset-0 grid place-items-center">
            <TodoMark value={still} />
          </span>
        ) : (
          <Image
            src={still.src}
            width={still.width}
            height={still.height}
            alt={still.alt[locale]}
            sizes="(min-width: 768px) 40vw, 100vw"
            priority={index === 0}
            className="relative z-10 size-full object-contain"
          />
        )}
      </Link>

      <div className="md:col-span-7">
        <p className="flex flex-wrap items-center gap-x-3 gap-y-1 text-sm text-ink-muted">
          <span className="font-semibold text-ink">{t.work.labels[project.label]}</span>
          {project.year ? <span>{project.year}</span> : null}
        </p>

        <h3 id={headingId} className="mt-2 text-xl font-bold tracking-tight sm:text-2xl">
          <Link href={caseHref} className="hover:text-accent">
            {project.name[locale]}
          </Link>
        </h3>

        <p className="mt-3 max-w-[62ch] text-ink-muted">{project.summary[locale]}</p>

        <ul aria-label={t.work.stack} className="mt-5 flex flex-wrap gap-2">
          {project.stack.map((tech) => (
            <li key={tech} className="chip">
              {tech}
            </li>
          ))}
        </ul>

        <ul className="mt-6 flex flex-wrap items-center gap-x-6 gap-y-3 text-sm font-semibold">
          <li>
            <Link href={caseHref} className="btn btn-primary">
              {t.work.caseStudy}
              <span className="sr-only">: {project.name[locale]}</span>
            </Link>
          </li>
          <li>
            <ExternalLink href={project.links.live} newTabLabel={t.work.opensInNewTab} className="link">
              {t.work.live}
            </ExternalLink>
          </li>
          {project.links.github ? (
            <li>
              <ExternalLink href={project.links.github} newTabLabel={t.work.opensInNewTab} className="link">
                {t.work.github}
              </ExternalLink>
            </li>
          ) : null}
          {project.links.extra?.map((extra) => (
            <li key={extra.href}>
              <ExternalLink href={extra.href} newTabLabel={t.work.opensInNewTab} className="link">
                {extra.label[locale]}
              </ExternalLink>
            </li>
          ))}
        </ul>

        {project.links.liveNote ? (
          <p className="mt-3 text-xs text-ink-muted">{project.links.liveNote[locale]}</p>
        ) : null}
      </div>
    </article>
  );
}
