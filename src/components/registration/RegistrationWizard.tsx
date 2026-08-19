'use client';

import * as React from 'react';
import { FormProvider, useForm } from 'react-hook-form';
import { ProgressIndicator, type WizardStep } from './ProgressIndicator';
import { ActionsBar } from './ActionsBar';
import { PersonalInfoSection } from './sections/PersonalInfoSection';
import { SportsInfoSection } from './sections/SportsInfoSection';
import { AchievementsSection } from './sections/AchievementsSection';
import { ReviewSection } from './sections/ReviewSection';
import { SubmittedScreen } from './SubmittedScreen';
import { Card, CardBody } from '@/components/ui/Card';
import { EMPTY_REGISTRATION, type AthleteRegistrationValues } from '@/types/athlete';
import { personalInfoSchema, sportsInfoSchema } from '@/lib/validation/athlete-schema';
import { getOrCreateDraftId, loadLocalDraft, saveLocalDraft } from '@/lib/draft-storage';
import { isSupabaseConfigured } from '@/lib/supabase/client';
import { useToast } from '@/components/ui/Toast';
import {
  saveAthleteProfile,
  saveAchievements,
  uploadAllAchievementFiles,
  uploadProfilePhoto,
} from '@/lib/supabase/queries';

const STEPS: WizardStep[] = [
  { key: 'personal', label: 'Personal Information' },
  { key: 'sports', label: 'Sports Information' },
  { key: 'achievements', label: 'Achievements' },
  { key: 'review', label: 'Review & Submit' },
];

interface RegistrationWizardProps {
  /** Notified whenever the profile has just been submitted vs. still being edited. */
  onSubmittedChange?: (submitted: boolean) => void;
}

export function RegistrationWizard({ onSubmittedChange }: RegistrationWizardProps = {}) {
  const methods = useForm<AthleteRegistrationValues>({
    defaultValues: EMPTY_REGISTRATION,
    mode: 'onBlur',
  });
  const { getValues, setError, clearErrors, reset } = methods;
  const { showToast } = useToast();

  const [currentStep, setCurrentStep] = React.useState(0);
  // Lazy-initialized on the client only: getOrCreateDraftId() guards on
  // `typeof window` and returns '' during SSR, so this can't cause a
  // hydration mismatch (draftId is never rendered into HTML, only used
  // internally when saving/uploading).
  const [draftId] = React.useState(() => getOrCreateDraftId());
  const [confirmed, setConfirmed] = React.useState(false);
  const [isSavingDraft, setIsSavingDraft] = React.useState(false);
  const [isSubmitting, setIsSubmitting] = React.useState(false);
  const [saveStatus, setSaveStatus] = React.useState<string>('');
  const [submitMode, setSubmitMode] = React.useState<'synced' | 'local-only' | null>(null);
  const formTopRef = React.useRef<HTMLDivElement>(null);
  const formRef = React.useRef<HTMLFormElement>(null);

  React.useEffect(() => {
    onSubmittedChange?.(submitMode !== null);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [submitMode]);

  React.useEffect(() => {
    const draft = loadLocalDraft();
    if (draft) {
      reset({
        personal: { ...EMPTY_REGISTRATION.personal, ...draft.personal },
        sports: { ...EMPTY_REGISTRATION.sports, ...draft.sports },
        achievements: (draft.achievements || []).map((a) => ({
          clientId: a.clientId,
          title: a.title,
          file: null,
          fileName: a.fileName,
        })),
      });
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  function scrollToTop() {
    formTopRef.current?.scrollIntoView({ block: 'start' });
  }

  /** After a failed validation, send focus to the first invalid field so keyboard/screen-reader users land on it directly. */
  function focusFirstError() {
    requestAnimationFrame(() => {
      const invalid = formRef.current?.querySelector<HTMLElement>('[aria-invalid="true"]');
      if (invalid) {
        invalid.scrollIntoView({ block: 'center', behavior: 'smooth' });
        invalid.focus({ preventScroll: true });
      } else {
        scrollToTop();
      }
    });
  }

  async function validateStep(index: number): Promise<boolean> {
    clearErrors();
    if (index === 0) {
      const result = personalInfoSchema.safeParse(getValues('personal'));
      if (!result.success) {
        result.error.issues.forEach((issue) => {
          setError(`personal.${issue.path.join('.')}` as never, { message: issue.message });
        });
        return false;
      }
      return true;
    }
    if (index === 1) {
      const result = sportsInfoSchema.safeParse(getValues('sports'));
      if (!result.success) {
        result.error.issues.forEach((issue) => {
          setError(`sports.${issue.path.join('.')}` as never, { message: issue.message });
        });
        return false;
      }
      return true;
    }
    if (index === 2) {
      const achievements = getValues('achievements');
      let valid = true;
      achievements.forEach((a, i) => {
        if (!a.title || !a.title.trim()) {
          setError(`achievements.${i}.title` as const, { message: 'Give this achievement a title' });
          valid = false;
        }
        if (!a.file && !a.fileUrl) {
          setError(`achievements.${i}.file` as const, { message: 'Attach a supporting file, or remove this entry' });
          valid = false;
        }
      });
      return valid;
    }
    return true;
  }

  async function handleNext() {
    const valid = await validateStep(currentStep);
    if (valid) {
      setCurrentStep((s) => Math.min(s + 1, STEPS.length - 1));
      scrollToTop();
    } else {
      focusFirstError();
      showToast('Some fields still need attention before you continue.', 'warning');
    }
  }

  function handleBack() {
    setCurrentStep((s) => Math.max(s - 1, 0));
    scrollToTop();
  }

  function goToStep(index: number) {
    setCurrentStep(index);
    scrollToTop();
  }

  async function syncToSupabase(status: 'draft' | 'submitted') {
    const values = getValues();

    // Upload the profile photo first so its URL is part of the profile row we
    // then write, rather than needing a second update.
    let personal = values.personal;
    if (personal.photo) {
      const photoResult = await uploadProfilePhoto(draftId, personal.photo);
      if (photoResult.ok) {
        personal = { ...personal, photoUrl: photoResult.url, photoName: personal.photo.name };
        methods.setValue('personal.photoUrl', photoResult.url, { shouldDirty: false });
        methods.setValue('personal.photoName', personal.photoName, { shouldDirty: false });
      }
    }

    const uploaded = await uploadAllAchievementFiles(draftId, values.achievements);
    methods.setValue('achievements', uploaded, { shouldDirty: false });
    const finalValues = { ...values, personal, achievements: uploaded };
    const profileResult = await saveAthleteProfile(draftId, finalValues, status);
    if (!profileResult.ok) throw new Error(profileResult.error);
    await saveAchievements(draftId, uploaded);
  }

  async function handleSaveDraft() {
    setIsSavingDraft(true);
    saveLocalDraft(getValues());
    if (isSupabaseConfigured) {
      try {
        await syncToSupabase('draft');
        setSaveStatus('Saved to your account');
        showToast('Draft saved to your account. You can finish this later.');
      } catch {
        setSaveStatus('Saved on this device — will sync once reconnected');
        showToast('Saved on this device — we’ll sync it once you’re reconnected.', 'warning');
      }
    } else {
      setSaveStatus('Saved on this device');
      showToast('Draft saved on this device. Come back any time to finish it.');
    }
    setIsSavingDraft(false);
  }

  async function handleSubmit() {
    const stepsValid = await Promise.all([validateStep(0), validateStep(1), validateStep(2)]);
    const firstInvalid = stepsValid.findIndex((v) => !v);
    if (firstInvalid !== -1) {
      setCurrentStep(firstInvalid);
      scrollToTop();
      focusFirstError();
      return;
    }
    if (!confirmed) {
      scrollToTop();
      return;
    }

    setIsSubmitting(true);
    saveLocalDraft(getValues());

    if (isSupabaseConfigured) {
      try {
        await syncToSupabase('submitted');
        setSubmitMode('synced');
      } catch {
        setSubmitMode('local-only');
      }
    } else {
      setSubmitMode('local-only');
    }
    setIsSubmitting(false);
  }

  if (submitMode) {
    return (
      <SubmittedScreen
        values={getValues()}
        mode={submitMode}
        onEdit={() => {
          setSubmitMode(null);
          setCurrentStep(0);
        }}
      />
    );
  }

  return (
    <FormProvider {...methods}>
      <div ref={formTopRef} />
      <div className="mb-9">
        <ProgressIndicator steps={STEPS} currentIndex={currentStep} />
      </div>

      {!isSupabaseConfigured && (
        <div className="mb-6 rounded-lg border border-accent-500/25 bg-accent-500/[0.06] px-4 py-3 text-sm text-accent-700">
          Running without a connected Supabase project — your progress is saved on this
          device only. Add Supabase credentials to persist profiles for real.
        </div>
      )}

      <Card>
        <CardBody className="sm:p-8">
          <form ref={formRef} onSubmit={(e) => e.preventDefault()}>
            <div key={currentStep} className="animate-fade-in-up">
              {currentStep === 0 && <PersonalInfoSection />}
              {currentStep === 1 && <SportsInfoSection />}
              {currentStep === 2 && <AchievementsSection />}
              {currentStep === 3 && (
                <ReviewSection goToStep={goToStep} confirmed={confirmed} onConfirmChange={setConfirmed} />
              )}
            </div>

            {currentStep === 3 && !confirmed && (
              <p className="mt-4 text-xs font-medium text-accent-600">
                Please confirm the information above before submitting.
              </p>
            )}

            <ActionsBar
              isFirstStep={currentStep === 0}
              isLastStep={currentStep === STEPS.length - 1}
              onBack={handleBack}
              onNext={handleNext}
              onSaveDraft={handleSaveDraft}
              onSubmit={handleSubmit}
              isSavingDraft={isSavingDraft}
              isSubmitting={isSubmitting}
              submitDisabled={currentStep === STEPS.length - 1 && !confirmed}
              saveStatus={saveStatus}
            />
          </form>
        </CardBody>
      </Card>
    </FormProvider>
  );
}
