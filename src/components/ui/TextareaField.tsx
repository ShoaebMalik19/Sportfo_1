import * as React from 'react';
import { cn } from '@/lib/utils';
import { FieldShell, inputStateClasses } from './FieldShell';

interface TextareaFieldProps extends React.TextareaHTMLAttributes<HTMLTextAreaElement> {
  label: string;
  name: string;
  required?: boolean;
  optionalLabel?: boolean;
  hint?: string;
  error?: string;
}

export const TextareaField = React.forwardRef<HTMLTextAreaElement, TextareaFieldProps>(
  ({ label, name, required, optionalLabel, hint, error, className, ...rest }, ref) => {
    return (
      <FieldShell
        label={label}
        htmlFor={name}
        required={required}
        optionalLabel={optionalLabel}
        hint={hint}
        error={error}
      >
        <textarea
          id={name}
          name={name}
          ref={ref}
          rows={3}
          aria-invalid={!!error}
          className={cn(
            'w-full resize-none rounded-lg border bg-white px-3.5 py-2.5 text-sm text-ink-900 placeholder:text-ink-900/35 transition-colors focus-ring disabled:cursor-not-allowed disabled:bg-ink-900/[0.03]',
            inputStateClasses(!!error),
            className
          )}
          {...rest}
        />
      </FieldShell>
    );
  }
);

TextareaField.displayName = 'TextareaField';
