import * as React from 'react';
import Link from 'next/link';
import { cn } from '@/lib/utils';

type ButtonVariant = 'primary' | 'secondary' | 'outline' | 'ghost';
type ButtonSize = 'sm' | 'md' | 'lg';

const variantClasses: Record<ButtonVariant, string> = {
  primary: 'bg-brand-600 text-white shadow-sm hover:bg-brand-700 hover:shadow-card-hover active:bg-brand-800',
  secondary: 'bg-ink-900 text-white shadow-sm hover:bg-ink-800 hover:shadow-card-hover active:bg-ink-700',
  outline: 'border border-ink-900/15 text-ink-900 hover:border-ink-900/30 hover:bg-ink-900/[0.03]',
  ghost: 'text-ink-900 hover:bg-ink-900/[0.05]',
};

const sizeClasses: Record<ButtonSize, string> = {
  sm: 'h-9 px-3.5 text-sm gap-1.5',
  md: 'h-11 px-5 text-sm gap-2',
  lg: 'h-[3.25rem] px-6 text-base gap-2',
};

interface BaseProps {
  variant?: ButtonVariant;
  size?: ButtonSize;
  className?: string;
  children: React.ReactNode;
  icon?: React.ReactNode;
  iconPosition?: 'left' | 'right';
  /** Shows a spinner in place of the icon and disables the button. */
  isLoading?: boolean;
}

type ButtonAsButton = BaseProps &
  React.ButtonHTMLAttributes<HTMLButtonElement> & {
    href?: undefined;
  };

type ButtonAsLink = BaseProps &
  Omit<React.AnchorHTMLAttributes<HTMLAnchorElement>, 'href'> & {
    href: string;
  };

export type ButtonProps = ButtonAsButton | ButtonAsLink;

const base =
  'inline-flex items-center justify-center rounded-lg font-semibold transition-[colors,transform,box-shadow] duration-150 disabled:opacity-50 disabled:pointer-events-none focus-ring active:scale-[0.98]';

function Spinner({ className }: { className?: string }) {
  return (
    <svg
      className={cn('h-4 w-4 shrink-0 animate-spin', className)}
      viewBox="0 0 24 24"
      fill="none"
      aria-hidden="true"
    >
      <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="3" />
      <path className="opacity-90" d="M22 12a10 10 0 00-10-10" stroke="currentColor" strokeWidth="3" strokeLinecap="round" />
    </svg>
  );
}

export function Button(props: ButtonProps) {
  const {
    variant = 'primary',
    size = 'md',
    className,
    children,
    icon,
    iconPosition = 'right',
    isLoading,
    ...rest
  } = props;

  const classes = cn(base, variantClasses[variant], sizeClasses[size], isLoading && 'cursor-wait', className);

  const content = (
    <>
      {isLoading ? (
        <Spinner />
      ) : (
        icon && iconPosition === 'left' && <span className="shrink-0">{icon}</span>
      )}
      {children}
      {!isLoading && icon && iconPosition === 'right' && <span className="shrink-0">{icon}</span>}
    </>
  );

  if ('href' in props && props.href) {
    const { href, ...anchorRest } = rest as React.AnchorHTMLAttributes<HTMLAnchorElement>;
    return (
      <Link href={props.href} className={classes} {...anchorRest}>
        {content}
      </Link>
    );
  }

  const { disabled, ...buttonRest } = rest as React.ButtonHTMLAttributes<HTMLButtonElement>;

  return (
    <button
      className={classes}
      disabled={disabled || isLoading}
      aria-busy={isLoading || undefined}
      {...buttonRest}
    >
      {content}
    </button>
  );
}
