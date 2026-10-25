import type { Dictionary } from '@/i18n/dictionaries';
import type { Project } from '@/content/types';

/** "Freelance  2026" line shared by Home and the project page. */
export function ProjectMeta({ project, t }: { project: Project; t: Dictionary }) {
  return (
    <p className="flex flex-wrap items-center gap-x-3 text-sm text-ink-muted">
      <span className="font-semibold text-ink">{t.project.labels[project.label]}</span>
      {project.year ? <span>{project.year}</span> : null}
    </p>
  );
}
