import Link from 'next/link';
import { cn } from '@/lib/utils';

export function Logo({ className, dark }: { className?: string; dark?: boolean }) {
  return (
    <Link
      href="/"
      className={cn(
        'focus-ring inline-flex items-center gap-2 rounded-md text-lg font-extrabold tracking-tight',
        dark ? 'text-white' : 'text-ink-900',
        className
      )}
    >
      <span
        className={cn(
          'flex h-7 w-7 items-center justify-center rounded-md text-sm font-black',
          dark ? 'bg-white text-ink-900' : 'bg-brand-600 text-white'
        )}
        aria-hidden="true"
      >
        S
      </span>
      SportFo
    </Link>
  );
}
