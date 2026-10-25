import type { ReactNode } from 'react';

type Props = {
  href: string;
  children: ReactNode;
  newTabLabel: string;
  className?: string;
};

/** Opens in a new tab and says so to screen readers; the arrow marks it visually. */
export function ExternalLink({ href, children, newTabLabel, className }: Props) {
  return (
    <a href={href} target="_blank" rel="noopener noreferrer" className={className}>
      {children}
      <svg viewBox="0 0 16 16" className="ml-1 inline size-3.5 align-[-0.1em]" fill="none" stroke="currentColor" strokeWidth="1.6" aria-hidden="true">
        <path d="M5 11 11 5M6 5h5v5" strokeLinecap="round" strokeLinejoin="round" />
      </svg>
      <span className="sr-only"> ({newTabLabel})</span>
    </a>
  );
}
