# Klymentii Portfolio — Vite + React + TypeScript + Tailwind CSS

Merged portfolio with a persistent Three.js / GSAP intro layer and the interactive portfolio board above it.

## What is included

- Three.js + GSAP intro moved into an imperative engine factory with closure state.
- Render RAF runs during the intro and stops after the final sticker impact.
- `IntroScene` uses a stable `useEffect(..., [])` lifecycle for the engine while its DOM remains mounted as the visual base layer.
- Intro can be skipped with click, Enter, or Escape.
- `sessionStorage` remembers that the intro has been seen for the current browser session.
- Final CSS sticker stays visible underneath the Board.
- Old CSS-only intro, old watermark, Replay button, and debug UI were removed.
- Board is localized with EN as the default and UA / PL as persistent language options. The locale is stored in `localStorage`.
- Recommendations UI is present for StudentsAbroad and DMA with EN / UA document slots. No recommendation text or fake documents were invented because the original letters were not included among the provided source files.

## Run

```bash
npm install
npm run dev
```

Type-check:

```bash
npm run typecheck
```

Production build:

```bash
npm run build
```

## Font

The intro expects `public/fonts/helvetiker_bold.typeface.json`. The original font asset was not included in the uploaded source files, so the engine first tries the local path and then falls back to the Three.js hosted copy. For a fully self-contained/offline deploy, add the original JSON font file to that local path.
