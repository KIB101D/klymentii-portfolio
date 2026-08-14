# Klymentii Portfolio — Vite + React + TypeScript + Tailwind CSS

This is the merged portfolio project: the Three.js/GSAP intro stays mounted as a persistent visual layer, while the portfolio board is mounted above it after the intro finishes.

## Architecture

- `src/intro/createIntroEngine.ts` owns the imperative Three.js/GSAP engine and closure state.
- The render RAF runs only during the intro and is stopped after the final sticker impact.
- `IntroScene` is mounted once and uses `useEffect(..., [])` with a stable callback ref for `onFinished`.
- The final CSS sticker remains visible after the Three.js logo disappears.
- The Board is transparent so the intro's `#1c1c1c` visual background remains the base layer.
- The old CSS-only intro, old watermark, debug UI, and Replay button were removed.
- Board interactions are React state; curve and mouse motion use imperative RAF hooks.

## Run

```bash
npm install
npm run dev
```

Production build:

```bash
npm run build
```
