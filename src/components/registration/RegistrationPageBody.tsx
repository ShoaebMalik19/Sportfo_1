'use client';

import * as React from 'react';
import { RegistrationWizard } from './RegistrationWizard';
import { ToastProvider } from '@/components/ui/Toast';

export function RegistrationPageBody() {
  const [submitted, setSubmitted] = React.useState(false);

  return (
    <ToastProvider>
      <div className="mx-auto mb-9 max-w-2xl text-center">
        <p className="eyebrow">Athlete Registration</p>
        <h1 className="mt-3 text-3xl font-extrabold tracking-tight text-ink-900 sm:text-4xl">
          {submitted ? 'You’re all set' : 'Create Your Profile'}
        </h1>
        <p className="mt-3 text-base text-ink-900/55">
          {submitted
            ? 'Your athlete profile is in. Here’s a summary of what you submitted.'
            : 'Elevate your game. Showcase your talent. It takes a few minutes, and you can save your progress and finish later.'}
        </p>
      </div>

      <div className="mx-auto max-w-3xl">
        <RegistrationWizard onSubmittedChange={setSubmitted} />
      </div>
    </ToastProvider>
  );
}
