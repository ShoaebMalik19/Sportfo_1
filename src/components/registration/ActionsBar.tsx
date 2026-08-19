'use client';

import { Button } from '@/components/ui/Button';
import { IconArrowRight } from '@/components/ui/icons';

interface ActionsBarProps {
  isFirstStep: boolean;
  isLastStep: boolean;
  onBack: () => void;
  onNext: () => void;
  onSaveDraft: () => void;
  onSubmit: () => void;
  isSavingDraft: boolean;
  isSubmitting: boolean;
  submitDisabled?: boolean;
  saveStatus?: string;
}

export function ActionsBar({
  isFirstStep,
  isLastStep,
  onBack,
  onNext,
  onSaveDraft,
  onSubmit,
  isSavingDraft,
  isSubmitting,
  submitDisabled,
  saveStatus,
}: ActionsBarProps) {
  return (
    <div className="mt-9 flex flex-col-reverse items-stretch gap-3 border-t border-ink-900/8 pt-6 sm:flex-row sm:items-center sm:justify-between">
      <div className="flex items-center gap-3">
        {!isFirstStep && (
          <Button type="button" variant="ghost" onClick={onBack}>
            Back
          </Button>
        )}
        <Button type="button" variant="outline" onClick={onSaveDraft} isLoading={isSavingDraft}>
          {isSavingDraft ? 'Saving…' : 'Save Draft'}
        </Button>
        {saveStatus && (
          <span key={saveStatus} className="animate-fade-in-up hidden text-xs text-ink-900/40 sm:inline">
            {saveStatus}
          </span>
        )}
      </div>

      {isLastStep ? (
        <Button type="button" onClick={onSubmit} isLoading={isSubmitting} disabled={submitDisabled} size="md">
          {isSubmitting ? 'Submitting…' : 'Submit Profile'}
        </Button>
      ) : (
        <Button
          type="button"
          onClick={onNext}
          size="md"
          icon={<IconArrowRight width={16} height={16} />}
        >
          Continue
        </Button>
      )}
    </div>
  );
}
