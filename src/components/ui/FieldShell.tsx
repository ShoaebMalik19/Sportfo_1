import * as React from 'react';
import { cn } from '@/lib/utils';

interface FieldShellProps {
  label: string;
  htmlFor: string;
  required?: boolean;
  optionalLabel?: boolean;
  hint?: string;
  error?: string;
  className?: string;
  children: React.ReactNode;
}

export function FieldShell({
  label,
  htmlFor,
  required,
  optionalLabel,
  hint,
  error,
  className,
  children,
}: FieldShellProps) {
  return (
    <div className={cn('flex flex-col gap-1.5', className)}>
      <label
        htmlFor={htmlFor}
        id={`${htmlFor}-label`}
        className="flex items-baseline justify-between text-sm font-medium text-ink-900"
      >
        <span>
          {label}
          {required && <span className="ml-0.5 text-brand-600">*</span>}
        </span>
        {optionalLabel && !required && (
          <span className="text-xs font-normal text-ink-900/40">Optional</span>
        )}
      </label>
      {children}
      {error ? (
        <p className="flex items-center gap-1 text-xs font-medium text-red-600" role="alert">
          {error}
        </p>
      ) : hint ? (
        <p className="text-xs text-ink-900/45">{hint}</p>
      ) : null}
    </div>
  );
}

export const inputBaseClasses =
  'h-11 w-full rounded-lg border bg-white px-3.5 text-sm text-ink-900 placeholder:text-ink-900/35 transition-colors focus-ring disabled:cursor-not-allowed disabled:bg-ink-900/[0.03]';

export function inputStateClasses(hasError?: boolean) {
  return hasError
    ? 'border-red-300 focus:border-red-400'
    : 'border-ink-900/12 focus:border-brand-400';
}
