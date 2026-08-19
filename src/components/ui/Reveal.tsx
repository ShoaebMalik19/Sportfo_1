'use client';

import * as React from 'react';
import { cn } from '@/lib/utils';

interface RevealProps extends React.HTMLAttributes<HTMLDivElement> {
  children: React.ReactNode;
  /** Stagger the animation start, in milliseconds. Useful for grids of cards. */
  delayMs?: number;
  as?: keyof React.JSX.IntrinsicElements;
}

/**
 * Fades + slides content in the moment it scrolls into view, using
 * IntersectionObserver. Animates once — re-scrolling past it doesn't replay.
 * Falls back to fully visible immediately if IntersectionObserver isn't
 * available (older browsers, SSR) so content is never stuck hidden.
 */
export function Reveal({ children, delayMs = 0, className, as = 'div', ...rest }: RevealProps) {
  const ref = React.useRef<HTMLDivElement>(null);
  const [visible, setVisible] = React.useState(() => typeof IntersectionObserver === 'undefined');

  React.useEffect(() => {
    const node = ref.current;
    if (!node || typeof IntersectionObserver === 'undefined') return;

    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry?.isIntersecting) {
          setVisible(true);
          observer.disconnect();
        }
      },
      { threshold: 0.15, rootMargin: '0px 0px -40px 0px' }
    );

    observer.observe(node);
    return () => observer.disconnect();
  }, []);

  const Tag = as as React.ElementType;

  return (
    <Tag
      ref={ref}
      className={cn('reveal', visible && 'reveal-visible', className)}
      style={visible && delayMs ? { animationDelay: `${delayMs}ms` } : undefined}
      {...rest}
    >
      {children}
    </Tag>
  );
}
