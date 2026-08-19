'use client';

import * as React from 'react';
import { cn } from '@/lib/utils';

/** Small floating button that appears once the user has scrolled a screen's worth down. */
export function BackToTop() {
  const [visible, setVisible] = React.useState(false);

  React.useEffect(() => {
    function onScroll() {
      setVisible(window.scrollY > 640);
    }
    onScroll();
    window.addEventListener('scroll', onScroll, { passive: true });
    return () => window.removeEventListener('scroll', onScroll);
  }, []);

  return (
    <button
      type="button"
      onClick={() => window.scrollTo({ top: 0, behavior: 'smooth' })}
      aria-label="Back to top"
      tabIndex={visible ? 0 : -1}
      className={cn(
        'focus-ring fixed bottom-6 right-5 z-40 flex h-11 w-11 items-center justify-center rounded-full border border-ink-900/8 bg-white text-ink-900/70 shadow-card-hover transition-all duration-200 hover:text-ink-900 sm:bottom-8 sm:right-8',
        visible ? 'translate-y-0 opacity-100' : 'pointer-events-none translate-y-3 opacity-0'
      )}
    >
      <svg width="18" height="18" viewBox="0 0 24 24" fill="none" aria-hidden="true">
        <path d="M12 19V5m0 0l-6 6m6-6l6 6" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round" />
      </svg>
    </button>
  );
}
