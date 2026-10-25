import type { Locale } from '@/i18n/config';

/** Localised value: every locale is required, so a missing translation is a type error. */
export type L10n<T = string> = Readonly<Record<Locale, T>>;

export type ProjectSlug = 'casacast' | 'loop' | 'canopy-configurator' | 'ekonom' | 'reactshop';
export type ProjectLabel = 'freelance' | 'test-task-product' | 'pet';

export type ProjectLink = { label: L10n; href: string };

export type Project = {
  slug: ProjectSlug;
  name: L10n;
  label: ProjectLabel;
  year?: string;
  /** One sentence, shown on Home and used as the page description. */
  summary: L10n;
  /** What was built, one point per line. */
  points: L10n<readonly string[]>;
  stack: readonly string[];
  links: {
    demo: string;
    /** Short hint under the demo link, e.g. where the back office is. */
    demoNote?: L10n;
    github?: string;
    extra?: readonly ProjectLink[];
  };
};

/** Home order is the array order. */
export type Projects = readonly [Project, Project, Project, Project, Project];
