# klymentii-portfolio

Portfolio of Klymentii Boiko, Frontend / Product Engineer: five projects, each with its own page,
in Ukrainian, English and Polish.
Live: https://klymentii-portfolio.vercel.app

## Stack

Next.js 16 (App Router, fully static) · TypeScript strict · Tailwind CSS 4 · Vercel Analytics.

## Structure

```
src/
  app/[locale]/              home: name and the project list
  app/[locale]/work/[slug]/  project page: description, stack, demo and GitHub links
  proxy.ts                   redirects unprefixed paths by Accept-Language (x-default: /en)
  i18n/                      locale config and typed dictionaries (en.ts is the schema)
  content/projects.ts        all project texts in three languages
```

To change a project, edit `src/content/projects.ts`. A missing translation is a type error.

## Scripts

| Command | What it does |
| --- | --- |
| `npm run dev` | Development server |
| `npm run build` | Production build |
| `npm run typecheck` | TypeScript, including missing translation keys |
| `npm run lint` | ESLint |
