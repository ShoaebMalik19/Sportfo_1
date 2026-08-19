import * as React from 'react';
import { cn } from '@/lib/utils';

export function Card({ className, children, ...rest }: React.HTMLAttributes<HTMLDivElement>) {
  return (
    <div
      className={cn(
        'rounded-2xl border border-ink-900/8 bg-white shadow-card',
        className
      )}
      {...rest}
    >
      {children}
    </div>
  );
}

export function CardBody({ className, children, ...rest }: React.HTMLAttributes<HTMLDivElement>) {
  return (
    <div className={cn('p-6 sm:p-7', className)} {...rest}>
      {children}
    </div>
  );
}
