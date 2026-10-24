# klymentii-portfolio

Personal portfolio of Klymentii Boiko, Frontend / Product Engineer.
Live: https://klymentii-portfolio.vercel.app

## Stack

Next.js 16 (App Router, static generation) · TypeScript strict · Tailwind CSS 4 · Vercel Analytics.
Three.js is loaded only for the hero intro and the project objects, after the page has painted.

## Structure

```
src/
  app/[locale]/        pages for uk / en / pl (all statically generated)
  app/fonts/           Onest variable font, subset to Latin, Polish and Cyrillic (OFL)
  proxy.ts             redirects unprefixed paths by Accept-Language (x-default: /en)
  i18n/                locale config and typed dictionaries (en.ts is the schema)
  content/             all site content in three languages, typed in types.ts
  components/          UI; components read design tokens only (globals.css)
public/cv/             CV PDFs (UA / EN / PL)
```

## Content rules

All facts live in `src/content`. A missing fact is written as `todo('...')`: it shows as a yellow
marker in development, is hidden in production, and `npm run check:todo` lists every one left.

## Scripts

| Command | What it does |
| --- | --- |
| `npm run dev` | Development server |
| `npm run build` | Production build |
| `npm run typecheck` | TypeScript, including missing translation keys |
| `npm run lint` | ESLint |
| `npm run check:todo` | Lists unfilled content |
