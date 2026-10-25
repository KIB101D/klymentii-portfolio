'use client';

/**
 * Inline script that runs during HTML parsing, before first paint.
 * Must be a Client Component: otherwise client-side navigations receive it from the server
 * as text/javascript and React warns.
 * On the client it renders as text/plain, so React does not warn about a <script> tag
 * and the script is not re-run on client-side navigations (pattern from the Next.js guide
 * "Preventing flash before hydration").
 */
export function InlineScript({ html }: { html: string }) {
  return (
    <script
      type={typeof window === 'undefined' ? 'text/javascript' : 'text/plain'}
      suppressHydrationWarning
      dangerouslySetInnerHTML={{ __html: html }}
    />
  );
}
