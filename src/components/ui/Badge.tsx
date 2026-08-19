import * as React from 'react';
import { cn } from '@/lib/utils';

type BadgeTone = 'brand' | 'neutral' | 'success' | 'accent';

const toneClasses: Record<BadgeTone, string> = {
  brand: 'bg-brand-50 text-brand-700',
  neutral: 'bg-ink-900/[0.05] text-ink-700',
  success: 'bg-success-500/10 text-success-600',
  accent: 'bg-accent-500/10 text-accent-600',
};

export function Badge({
  tone = 'neutral',
  className,
  children,
}: {
  tone?: BadgeTone;
  className?: string;
  children: React.ReactNode;
}) {
  return (
    <span
      className={cn(
        'inline-flex items-center gap-1 rounded-full px-2.5 py-1 text-xs font-semibold',
        toneClasses[tone],
        className
      )}
    >
      {children}
    </span>
  );
}

/** Consistent "not built yet" marker for roadmap items shown on the landing page. */
export function ComingSoonBadge({ className }: { className?: string }) {
  return (
    <Badge tone="neutral" className={className}>
      Coming soon
    </Badge>
  );
}
