import * as React from 'react';
import { cn } from '@/lib/utils';
import { FieldShell } from './FieldShell';

interface RadioPillOption {
  value: string;
  label: string;
}

interface RadioPillGroupProps {
  label: string;
  name: string;
  options: RadioPillOption[];
  value: string | undefined;
  onChange: (value: string) => void;
  required?: boolean;
  optionalLabel?: boolean;
  hint?: string;
  error?: string;
}

export function RadioPillGroup({
  label,
  name,
  options,
  value,
  onChange,
  required,
  optionalLabel,
  hint,
  error,
}: RadioPillGroupProps) {
  // `groupLabelFor` intentionally does not match any real element id.
  // Pointing FieldShell's <label htmlFor> at an actual radio button's id
  // would hijack that button's accessible name to the group label text
  // (e.g. the first "Yes"/"No" option would announce as "Scholarship
  // Recipient" instead of "Yes"). The group itself is labelled via
  // aria-labelledby below instead.
  const groupLabelFor = `${name}-group`;

  return (
    <FieldShell
      label={label}
      htmlFor={groupLabelFor}
      required={required}
      optionalLabel={optionalLabel}
      hint={hint}
      error={error}
    >
      <div
        className="flex flex-wrap gap-2"
        role="radiogroup"
        aria-labelledby={`${groupLabelFor}-label`}
      >
        {options.map((opt) => {
          const active = value === opt.value;
          return (
            <button
              key={opt.value}
              type="button"
              role="radio"
              aria-checked={active}
              onClick={() => onChange(opt.value)}
              className={cn(
                'focus-ring h-10 rounded-lg border px-4 text-sm font-medium transition-all duration-150 active:scale-95',
                active
                  ? 'border-brand-600 bg-brand-600 text-white shadow-sm'
                  : 'border-ink-900/12 bg-white text-ink-900/75 hover:border-ink-900/25'
              )}
            >
              {opt.label}
            </button>
          );
        })}
      </div>
    </FieldShell>
  );
}
