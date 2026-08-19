'use client';

import * as React from 'react';
import { cn } from '@/lib/utils';
import { usePrefersReducedMotion } from '@/lib/use-prefers-reduced-motion';

interface CarouselProps {
  /** One node per slide. Each is rendered into the sliding track. */
  slides: React.ReactNode[];
  /** Accessible labels, one per slide, used by the dots and live region. */
  labels: string[];
  /** Milliseconds between automatic advances. Set 0 to disable autoplay. */
  autoplayMs?: number;
  className?: string;
  ariaLabel?: string;
}

/**
 * Image/content carousel with autoplay, dots, arrows, keyboard and swipe.
 *
 * Autoplay stops whenever the user is plausibly engaged — pointer over it,
 * keyboard focus inside it, the tab hidden, or the OS asking for reduced
 * motion — so it never fights the person using it.
 */
export function Carousel({
  slides,
  labels,
  autoplayMs = 5200,
  className,
  ariaLabel = 'Featured sports',
}: CarouselProps) {
  const count = slides.length;
  const [index, setIndex] = React.useState(0);
  const [paused, setPaused] = React.useState(false);
  const reducedMotion = usePrefersReducedMotion();
  const pointerStart = React.useRef<{ x: number; y: number } | null>(null);

  const goTo = React.useCallback((next: number) => setIndex(((next % count) + count) % count), [count]);
  const next = React.useCallback(() => goTo(index + 1), [goTo, index]);
  const prev = React.useCallback(() => goTo(index - 1), [goTo, index]);

  const autoplayActive = autoplayMs > 0 && !paused && !reducedMotion && count > 1;

  React.useEffect(() => {
    if (!autoplayActive) return;
    const timer = window.setInterval(() => setIndex((i) => (i + 1) % count), autoplayMs);
    return () => window.clearInterval(timer);
  }, [autoplayActive, autoplayMs, count]);

  // Don't advance slides the user can't see.
  React.useEffect(() => {
    function onVisibility() {
      setPaused(document.hidden);
    }
    document.addEventListener('visibilitychange', onVisibility);
    return () => document.removeEventListener('visibilitychange', onVisibility);
  }, []);

  function onKeyDown(e: React.KeyboardEvent) {
    if (e.key === 'ArrowRight') {
      e.preventDefault();
      next();
    } else if (e.key === 'ArrowLeft') {
      e.preventDefault();
      prev();
    }
  }

  return (
    <div
      className={cn('relative', className)}
      role="region"
      aria-roledescription="carousel"
      aria-label={ariaLabel}
      onKeyDown={onKeyDown}
      onMouseEnter={() => setPaused(true)}
      onMouseLeave={() => setPaused(false)}
      onFocusCapture={() => setPaused(true)}
      onBlurCapture={() => setPaused(false)}
    >
      <div
        className="overflow-hidden rounded-2xl"
        onPointerDown={(e) => {
          pointerStart.current = { x: e.clientX, y: e.clientY };
        }}
        onPointerUp={(e) => {
          const start = pointerStart.current;
          pointerStart.current = null;
          if (!start) return;
          const dx = e.clientX - start.x;
          const dy = e.clientY - start.y;
          // Ignore mostly-vertical drags so page scrolling still feels normal.
          if (Math.abs(dx) < 45 || Math.abs(dx) < Math.abs(dy)) return;
          if (dx < 0) next();
          else prev();
        }}
      >
        <div
          className={cn(
            'flex',
            !reducedMotion && 'transition-transform duration-700 ease-[cubic-bezier(0.16,1,0.3,1)]'
          )}
          style={{ transform: `translate3d(-${index * 100}%, 0, 0)` }}
        >
          {slides.map((slide, i) => (
            <div
              key={i}
              className="w-full shrink-0"
              role="group"
              aria-roledescription="slide"
              aria-label={`${i + 1} of ${count}: ${labels[i] ?? ''}`}
              aria-hidden={i !== index}
              // Keep off-screen slides out of the tab order entirely.
              {...(i !== index ? { inert: '' as unknown as boolean } : {})}
            >
              {slide}
            </div>
          ))}
        </div>
      </div>

      <div className="mt-5 flex items-center justify-between gap-4">
        <div className="flex items-center gap-2" role="tablist" aria-label="Choose slide">
          {labels.map((label, i) => (
            <button
              key={label}
              type="button"
              role="tab"
              aria-selected={i === index}
              aria-label={label}
              onClick={() => goTo(i)}
              className={cn(
                'focus-ring h-1.5 rounded-full transition-all duration-300',
                i === index ? 'w-8 bg-brand-600' : 'w-2.5 bg-ink-900/15 hover:bg-ink-900/30'
              )}
            />
          ))}
        </div>

        <div className="flex items-center gap-2">
          <CarouselButton onClick={prev} label="Previous slide" direction="left" />
          <CarouselButton onClick={next} label="Next slide" direction="right" />
        </div>
      </div>

      {/* Announces slide changes to screen readers without moving focus. */}
      <p className="sr-only" aria-live="polite">
        {`Slide ${index + 1} of ${count}: ${labels[index] ?? ''}`}
      </p>
    </div>
  );
}

function CarouselButton({
  onClick,
  label,
  direction,
}: {
  onClick: () => void;
  label: string;
  direction: 'left' | 'right';
}) {
  return (
    <button
      type="button"
      onClick={onClick}
      aria-label={label}
      className="focus-ring flex h-10 w-10 items-center justify-center rounded-full border border-ink-900/10 bg-white text-ink-900/70 transition-all duration-150 hover:border-ink-900/25 hover:text-ink-900 active:scale-95"
    >
      <svg width="18" height="18" viewBox="0 0 24 24" fill="none" aria-hidden="true">
        <path
          d={direction === 'left' ? 'M15 5l-7 7 7 7' : 'M9 5l7 7-7 7'}
          stroke="currentColor"
          strokeWidth="1.8"
          strokeLinecap="round"
          strokeLinejoin="round"
        />
      </svg>
    </button>
  );
}
