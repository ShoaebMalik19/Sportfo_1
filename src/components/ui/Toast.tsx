'use client';

import * as React from 'react';
import { cn } from '@/lib/utils';

type ToastTone = 'success' | 'info' | 'warning';

interface ToastMessage {
  id: number;
  message: string;
  tone: ToastTone;
}

interface ToastContextValue {
  showToast: (message: string, tone?: ToastTone) => void;
}

const ToastContext = React.createContext<ToastContextValue | null>(null);

const DISMISS_AFTER_MS = 4200;

const toneStyles: Record<ToastTone, string> = {
  success: 'border-success-500/25 bg-white text-ink-900',
  info: 'border-ink-900/12 bg-white text-ink-900',
  warning: 'border-accent-500/30 bg-white text-ink-900',
};

const toneIcon: Record<ToastTone, React.ReactNode> = {
  success: (
    <span className="flex h-5 w-5 items-center justify-center rounded-full bg-success-500/12 text-success-600">
      <svg width="12" height="12" viewBox="0 0 24 24" fill="none" aria-hidden="true">
        <path d="M4.5 12.5l5 5 10-11" stroke="currentColor" strokeWidth="2.4" strokeLinecap="round" strokeLinejoin="round" />
      </svg>
    </span>
  ),
  info: (
    <span className="flex h-5 w-5 items-center justify-center rounded-full bg-brand-500/12 text-brand-600">
      <svg width="12" height="12" viewBox="0 0 24 24" fill="none" aria-hidden="true">
        <path d="M12 8h.01M11 12h1v5h1" stroke="currentColor" strokeWidth="2" strokeLinecap="round" />
      </svg>
    </span>
  ),
  warning: (
    <span className="flex h-5 w-5 items-center justify-center rounded-full bg-accent-500/15 text-accent-600">
      <svg width="12" height="12" viewBox="0 0 24 24" fill="none" aria-hidden="true">
        <path d="M12 8v5M12 16.5h.01" stroke="currentColor" strokeWidth="2.2" strokeLinecap="round" />
      </svg>
    </span>
  ),
};

/**
 * Minimal toast system: a provider that owns the queue and renders the stack.
 *
 * The stack is an aria-live region so messages like "Draft saved" are
 * announced without stealing focus from whatever the athlete was filling in.
 */
export function ToastProvider({ children }: { children: React.ReactNode }) {
  const [toasts, setToasts] = React.useState<ToastMessage[]>([]);
  const nextId = React.useRef(0);

  const showToast = React.useCallback((message: string, tone: ToastTone = 'success') => {
    const id = nextId.current++;
    setToasts((current) => [...current, { id, message, tone }]);
    window.setTimeout(() => {
      setToasts((current) => current.filter((t) => t.id !== id));
    }, DISMISS_AFTER_MS);
  }, []);

  const value = React.useMemo(() => ({ showToast }), [showToast]);

  return (
    <ToastContext.Provider value={value}>
      {children}
      <div
        className="pointer-events-none fixed inset-x-4 bottom-4 z-[60] flex flex-col items-center gap-2 sm:bottom-6 sm:left-auto sm:right-6 sm:items-end"
        role="status"
        aria-live="polite"
      >
        {toasts.map((toast) => (
          <div
            key={toast.id}
            className={cn(
              'animate-fade-in-up pointer-events-auto flex w-full max-w-sm items-start gap-2.5 rounded-xl border px-4 py-3 shadow-card-hover',
              toneStyles[toast.tone]
            )}
          >
            <span className="mt-0.5 shrink-0">{toneIcon[toast.tone]}</span>
            <p className="text-sm font-medium leading-snug">{toast.message}</p>
            <button
              type="button"
              onClick={() => setToasts((current) => current.filter((t) => t.id !== toast.id))}
              aria-label="Dismiss notification"
              className="focus-ring -mr-1 ml-auto shrink-0 rounded-md p-1 text-ink-900/35 transition-colors hover:text-ink-900"
            >
              <svg width="14" height="14" viewBox="0 0 24 24" fill="none" aria-hidden="true">
                <path d="M6 6l12 12M18 6L6 18" stroke="currentColor" strokeWidth="2" strokeLinecap="round" />
              </svg>
            </button>
          </div>
        ))}
      </div>
    </ToastContext.Provider>
  );
}

/**
 * Returns a `showToast` function. Safe to call outside a ToastProvider — it
 * no-ops rather than throwing, so a component can be reused on pages that
 * don't mount the provider.
 */
export function useToast(): ToastContextValue {
  const context = React.useContext(ToastContext);
  return context ?? { showToast: () => {} };
}
