'use client';

import * as React from 'react';
import { cn } from '@/lib/utils';

interface ParallaxProps {
  children: React.ReactNode;
  /** Pixels of drift across the element's full travel through the viewport. */
  strength?: number;
  className?: string;
}

/**
 * Drifts its children vertically as the page scrolls, for depth.
 *
 * Reads scroll position inside requestAnimationFrame and writes a transform
 * directly to the node — deliberately not React state, which would re-render
 * the subtree on every scroll frame. Disabled entirely under
 * prefers-reduced-motion, where parallax is a common trigger.
 */
export function Parallax({ children, strength = 40, className }: ParallaxProps) {
  const ref = React.useRef<HTMLDivElement>(null);

  React.useEffect(() => {
    const node = ref.current;
    if (!node) return;
    if (window.matchMedia('(prefers-reduced-motion: reduce)').matches) return;

    let frame = 0;

    function update() {
      frame = 0;
      const el = ref.current;
      if (!el) return;
      const rect = el.getBoundingClientRect();
      const viewport = window.innerHeight || 1;
      // -1 when the element sits just below the fold, +1 when just above it.
      const progress = (rect.top + rect.height / 2 - viewport / 2) / viewport;
      const offset = Math.max(-1, Math.min(1, progress)) * strength;
      el.style.transform = `translate3d(0, ${offset.toFixed(2)}px, 0)`;
    }

    function onScroll() {
      if (frame) return;
      frame = window.requestAnimationFrame(update);
    }

    update();
    window.addEventListener('scroll', onScroll, { passive: true });
    window.addEventListener('resize', onScroll);
    return () => {
      window.removeEventListener('scroll', onScroll);
      window.removeEventListener('resize', onScroll);
      if (frame) window.cancelAnimationFrame(frame);
    };
  }, [strength]);

  return (
    <div ref={ref} className={cn('will-change-transform', className)}>
      {children}
    </div>
  );
}
