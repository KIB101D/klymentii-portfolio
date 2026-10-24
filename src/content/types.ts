import type { Locale } from '@/i18n/config';

/** Localised value: every locale is required, so a missing translation is a type error. */
export type L10n<T = string> = Readonly<Record<Locale, T>>;

/** Explicit gap in the facts. Visible in development, hidden in production, listed by `npm run check:todo`. */
export type Todo = { readonly todo: string };
export const todo = (note: string): Todo => ({ todo: note });
export type Maybe<T> = T | Todo;
export const isTodo = (value: unknown): value is Todo =>
  typeof value === 'object' && value !== null && 'todo' in value;

/* ---------- Site ---------- */

export type Site = {
  name: L10n;
  title: string;
  stackLine: string;
  status: L10n;
  experienceLine: L10n;
  statement: L10n;
  contacts: {
    email: string;
    linkedin: string;
    github: string;
    telegram: Maybe<string>;
  };
  cv: L10n<`/cv/${string}.pdf`>;
};

/* ---------- Projects ---------- */

export type Tech =
  | 'Next.js 16' | 'Next.js' | 'React' | 'React 19' | 'TypeScript' | 'Vite'
  | 'Tailwind CSS 4' | 'PostgreSQL' | 'Drizzle' | 'Vitest'
  | 'Three.js' | 'GSAP' | 'Lenis' | 'Web Audio API' | 'Rough.js' | 'd3';

export type ProjectSlug = 'casacast' | 'loop' | 'canopy-configurator' | 'ekonom' | 'reactshop';
export type ProjectLabel = 'freelance' | 'test-task-product' | 'pet';

export type StillImage = { src: string; width: number; height: number; alt: L10n };

/** Card visual: progressive enhancement over a still that always renders. */
export type CardVisual =
  | { kind: 'live3d'; model: 'cassette'; still: Maybe<StillImage> }
  | { kind: 'still'; still: Maybe<StillImage> };

export type ExtraLink = { label: L10n; href: string };

export type Project = {
  slug: ProjectSlug;
  name: L10n;
  label: ProjectLabel;
  year?: string;
  summary: L10n;
  stack: readonly Tech[];
  links: { live: string; liveNote?: L10n; github?: string; githubNote?: L10n; extra?: readonly ExtraLink[] };
  card: CardVisual;
};

/** Home order is the array order. */
export type Projects = readonly [Project, Project, Project, Project, Project];

/* ---------- Case studies (filled in the next step) ---------- */

export type Decision = { title: L10n; what: L10n; why: L10n; tradeoff: Maybe<L10n> };
export type Decisions =
  | readonly [Decision, Decision, Decision]
  | readonly [Decision, Decision, Decision, Decision]
  | readonly [Decision, Decision, Decision, Decision, Decision];

export type Media =
  | { kind: 'image'; src: string; width: number; height: number; alt: L10n; caption?: L10n }
  | { kind: 'video'; src: string; poster: string; width: number; height: number; caption: L10n };

export type CaseStudy = {
  problem: L10n<readonly string[]>;
  role: L10n<readonly string[]>;
  decisions: Decisions;
  result: L10n<readonly Maybe<string>[]>;
  media: readonly Media[];
};

/* ---------- What I do / For businesses ---------- */

export type Capability = {
  id: 'product-ui' | '3d-creative' | 'fullstack-next' | 'data';
  title: L10n;
  body: L10n;
  proof: readonly ProjectSlug[];
};

export type ProofRef = { slug: ProjectSlug; note?: L10n };

export type Offer = {
  id: 'landing' | 'admin-dashboard' | 'multichannel';
  title: L10n;
  body: L10n;
  proof: readonly ProofRef[];
};

/* ---------- Experience ---------- */

export type YearMonth = `${number}-${'01' | '02' | '03' | '04' | '05' | '06' | '07' | '08' | '09' | '10' | '11' | '12'}`;

export type ExperienceItem = {
  id: 'freelance' | 'school-of-heroes' | 'dma-eu' | 'studentabroad';
  role: L10n;
  org?: L10n;
  /** Freelance shows the year only, never months. */
  period: { year: string } | { start: YearMonth; end: YearMonth | 'present' };
  summary?: L10n;
  projects?: readonly ProjectSlug[];
};
