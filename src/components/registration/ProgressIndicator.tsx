import { cn } from '@/lib/utils';
import { IconCheck } from '@/components/ui/icons';

export interface WizardStep {
  key: string;
  label: string;
}

interface ProgressIndicatorProps {
  steps: WizardStep[];
  currentIndex: number;
}

export function ProgressIndicator({ steps, currentIndex }: ProgressIndicatorProps) {
  return (
    <nav aria-label="Registration progress">
      <ol className="flex items-start">
        {steps.map((step, i) => {
          const isComplete = i < currentIndex;
          const isCurrent = i === currentIndex;
          return (
            <li key={step.key} className="flex flex-1 flex-col items-center last:flex-initial">
              <div className="flex w-full items-center">
                <div
                  className={cn(
                    'flex h-8 w-8 shrink-0 items-center justify-center rounded-full border text-xs font-bold transition-all duration-300',
                    isComplete && 'border-brand-600 bg-brand-600 text-white',
                    isCurrent && 'scale-110 border-brand-600 bg-white text-brand-600 ring-4 ring-brand-500/15',
                    !isComplete && !isCurrent && 'border-ink-900/15 bg-white text-ink-900/35'
                  )}
                  aria-current={isCurrent ? 'step' : undefined}
                >
                  {isComplete ? (
                    <IconCheck width={14} height={14} className="animate-scale-in" />
                  ) : (
                    i + 1
                  )}
                </div>
                {i < steps.length - 1 && (
                  <div
                    className={cn(
                      'mx-2 h-0.5 flex-1 transition-colors duration-500',
                      isComplete ? 'bg-brand-600' : 'bg-ink-900/10'
                    )}
                    aria-hidden="true"
                  />
                )}
              </div>
              <p
                className={cn(
                  'mt-2 hidden text-center text-xs font-medium transition-colors duration-300 sm:block',
                  isCurrent ? 'text-ink-900' : 'text-ink-900/40'
                )}
              >
                {step.label}
              </p>
            </li>
          );
        })}
      </ol>
    </nav>
  );
}
