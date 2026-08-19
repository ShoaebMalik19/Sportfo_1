import { cn } from '@/lib/utils';

interface MarqueeProps {
  items: string[];
  className?: string;
  /** Seconds for one full loop. Longer = slower. */
  durationSec?: number;
}

/**
 * Continuously scrolling ticker of text items.
 *
 * The list is rendered twice back-to-back and the track is translated by
 * exactly -50%, so the second copy lands precisely where the first started —
 * that's what makes the loop seamless rather than visibly snapping. The
 * duplicate is aria-hidden so the items are announced once.
 */
export function Marquee({ items, className, durationSec = 38 }: MarqueeProps) {
  const row = (hidden: boolean) => (
    <ul
      className="flex shrink-0 items-center gap-8 pr-8"
      aria-hidden={hidden || undefined}
    >
      {items.map((item) => (
        <li key={item} className="flex items-center gap-8 whitespace-nowrap">
          <span className="font-display text-sm font-semibold uppercase tracking-[0.16em] text-white/45">
            {item}
          </span>
          <span aria-hidden="true" className="h-1 w-1 rounded-full bg-accent-500/70" />
        </li>
      ))}
    </ul>
  );

  return (
    <div
      className={cn(
        'group relative flex overflow-hidden',
        // Fade the ends so items enter and leave rather than being cut off.
        '[mask-image:linear-gradient(to_right,transparent,black_8%,black_92%,transparent)]',
        '[-webkit-mask-image:linear-gradient(to_right,transparent,black_8%,black_92%,transparent)]',
        className
      )}
    >
      <div
        className="animate-marquee flex min-w-full shrink-0 items-center group-hover:[animation-play-state:paused]"
        style={{ animationDuration: `${durationSec}s` }}
      >
        {row(false)}
        {row(true)}
      </div>
    </div>
  );
}
