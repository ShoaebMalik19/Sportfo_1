import * as React from 'react';
import { cn } from '@/lib/utils';
import { FieldShell, inputBaseClasses, inputStateClasses } from './FieldShell';

interface SelectOption {
  value: string;
  label: string;
}

interface SelectFieldProps extends Omit<React.SelectHTMLAttributes<HTMLSelectElement>, 'children'> {
  label: string;
  name: string;
  options: SelectOption[];
  placeholder?: string;
  required?: boolean;
  optionalLabel?: boolean;
  hint?: string;
  error?: string;
}

export const SelectField = React.forwardRef<HTMLSelectElement, SelectFieldProps>(
  (
    { label, name, options, placeholder = 'Select an option', required, optionalLabel, hint, error, className, ...rest },
    ref
  ) => {
    return (
      <FieldShell
        label={label}
        htmlFor={name}
        required={required}
        optionalLabel={optionalLabel}
        hint={hint}
        error={error}
      >
        <div className="relative">
          <select
            id={name}
            name={name}
            ref={ref}
            aria-invalid={!!error}
            defaultValue=""
            className={cn(
              inputBaseClasses,
              inputStateClasses(!!error),
              'appearance-none pr-9',
              className
            )}
            {...rest}
          >
            <option value="" disabled>
              {placeholder}
            </option>
            {options.map((opt) => (
              <option key={opt.value} value={opt.value}>
                {opt.label}
              </option>
            ))}
          </select>
          <svg
            className="pointer-events-none absolute right-3 top-1/2 h-4 w-4 -translate-y-1/2 text-ink-900/40"
            viewBox="0 0 20 20"
            fill="none"
            aria-hidden="true"
          >
            <path d="M5 7.5L10 12.5L15 7.5" stroke="currentColor" strokeWidth="1.6" strokeLinecap="round" strokeLinejoin="round" />
          </svg>
        </div>
      </FieldShell>
    );
  }
);

SelectField.displayName = 'SelectField';
