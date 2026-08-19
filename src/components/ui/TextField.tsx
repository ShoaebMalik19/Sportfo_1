import * as React from 'react';
import { cn } from '@/lib/utils';
import { FieldShell, inputBaseClasses, inputStateClasses } from './FieldShell';

interface TextFieldProps extends React.InputHTMLAttributes<HTMLInputElement> {
  label: string;
  name: string;
  required?: boolean;
  optionalLabel?: boolean;
  hint?: string;
  error?: string;
}

export const TextField = React.forwardRef<HTMLInputElement, TextFieldProps>(
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
        <input
          id={name}
          name={name}
          ref={ref}
          aria-invalid={!!error}
          aria-describedby={error ? `${name}-error` : undefined}
          className={cn(inputBaseClasses, inputStateClasses(!!error), className)}
          {...rest}
        />
      </FieldShell>
    );
  }
);

TextField.displayName = 'TextField';
