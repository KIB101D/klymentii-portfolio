'use client';

import { useLayoutEffect, useSyncExternalStore } from 'react';

type Theme = 'light' | 'dark';
const EVENT = 'themechange';

function storedTheme(): Theme | null {
  try {
    const value = localStorage.getItem('theme');
    return value === 'light' || value === 'dark' ? value : null;
  } catch {
    return null;
  }
}

function readTheme(): Theme {
  const applied = document.documentElement.dataset.theme;
  if (applied === 'light' || applied === 'dark') return applied;
  return window.matchMedia('(prefers-color-scheme: dark)').matches ? 'dark' : 'light';
}

function subscribe(onChange: () => void) {
  const media = window.matchMedia('(prefers-color-scheme: dark)');
  media.addEventListener('change', onChange);
  window.addEventListener(EVENT, onChange);
  return () => {
    media.removeEventListener('change', onChange);
    window.removeEventListener(EVENT, onChange);
  };
}

/** Renders a same-size placeholder on the server, so there is no dead button without JS. */
export function ThemeToggle({ toDark, toLight }: { toDark: string; toLight: string }) {
  const theme = useSyncExternalStore<Theme | null>(subscribe, readTheme, () => null);

  // The inline script applies the stored theme before paint. In development, Strict Mode's
  // remount resets <html> attributes, so re-apply it here. No-op in production.
  useLayoutEffect(() => {
    const stored = storedTheme();
    if (stored && document.documentElement.dataset.theme !== stored) {
      document.documentElement.dataset.theme = stored;
      window.dispatchEvent(new Event(EVENT));
    }
  }, []);

  if (theme === null) return <span className="inline-block size-11" aria-hidden="true" />;

  function toggle() {
    const next: Theme = readTheme() === 'dark' ? 'light' : 'dark';
    document.documentElement.dataset.theme = next;
    try {
      localStorage.setItem('theme', next);
    } catch {
      /* storage blocked: the choice lasts for this page only */
    }
    window.dispatchEvent(new Event(EVENT));
  }

  return (
    <button
      type="button"
      onClick={toggle}
      aria-label={theme === 'dark' ? toLight : toDark}
      className="inline-flex size-11 items-center justify-center rounded-md text-ink hover:bg-paper-raised"
    >
      {theme === 'dark' ? (
        <svg className="size-5" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8" aria-hidden="true">
          <circle cx="12" cy="12" r="4" />
          <path d="M12 2v2M12 20v2M4.9 4.9l1.4 1.4M17.7 17.7l1.4 1.4M2 12h2M20 12h2M4.9 19.1l1.4-1.4M17.7 6.3l1.4-1.4" strokeLinecap="round" />
        </svg>
      ) : (
        <svg className="size-5" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8" aria-hidden="true">
          <path d="M20.5 14.5A8.5 8.5 0 0 1 9.5 3.5a8.5 8.5 0 1 0 11 11Z" strokeLinejoin="round" />
        </svg>
      )}
    </button>
  );
}
