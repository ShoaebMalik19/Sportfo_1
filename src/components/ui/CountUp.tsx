'use client';

import * as React from 'react';
import { usePrefersReducedMotion } from '@/lib/use-prefers-reduced-motion';

interface CountUpProps {
  to: number;
  durationMs?: number;
  suffix?: string;
  prefix?: string;
  className?: string;
}

/**
 * Counts from zero up to `to` the first time it scrolls into view.
 *
 * The rendered number is wrapped in a `tabular-nums` span so the layout
 * doesn't jitter as digits change width mid-animation. Under
 * prefers-reduced-motion it renders the final value immediately.
 */
export function CountUp({ to, durationMs = 1400, suffix = '', prefix = '', className }: CountUpProps) {
  const ref = React.useRef<HTMLSpanElement>(null);
  const [value, setValue] = React.useState(0);
  const reducedMotion = usePrefersReducedMotion();

  React.useEffect(() => {
    const node = ref.current;
    if (!node) return;

    // No animation wanted (or possible): land on the final value on the next
    // frame. Deferring by a frame rather than setting state synchronously here
    // keeps this out of the render pass the effect was triggered by.
    if (reducedMotion || typeof IntersectionObserver === 'undefined') {
      const id = window.requestAnimationFrame(() => setValue(to));
      return () => window.cancelAnimationFrame(id);
    }

    let frame = 0;
    let start = 0;

    function step(now: number) {
      if (!start) start = now;
      const t = Math.min((now - start) / durationMs, 1);
      // Ease-out cubic: fast off the line, settles gently on the final value.
      const eased = 1 - Math.pow(1 - t, 3);
      setValue(Math.round(to * eased));
      if (t < 1) frame = window.requestAnimationFrame(step);
    }

    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry?.isIntersecting) {
          observer.disconnect();
          frame = window.requestAnimationFrame(step);
        }
      },
      { threshold: 0.4 }
    );

    observer.observe(node);
    return () => {
      observer.disconnect();
      if (frame) window.cancelAnimationFrame(frame);
    };
  }, [to, durationMs, reducedMotion]);

  return (
    <span ref={ref} className={className}>
      {prefix}
      <span className="tabular-nums">{value.toLocaleString('en-IN')}</span>
      {suffix}
    </span>
  );
}
