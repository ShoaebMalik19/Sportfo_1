'use client';

import { Controller, useFormContext, type FieldPath } from 'react-hook-form';
import { TextField } from '@/components/ui/TextField';
import { TextareaField } from '@/components/ui/TextareaField';
import { RadioPillGroup } from '@/components/ui/RadioPillGroup';
import { AvatarUpload } from '@/components/ui/AvatarUpload';
import { SectionShell } from '../SectionShell';
import { GENDER_OPTIONS } from '@/lib/constants/sports';
import type { AthleteRegistrationValues } from '@/types/athlete';

export function PersonalInfoSection() {
  const {
    register,
    control,
    clearErrors,
    watch,
    formState: { errors },
  } = useFormContext<AthleteRegistrationValues>();
  const e = errors.personal;

  // Errors here are set manually (via zod, see RegistrationWizard.validateStep)
  // rather than through a resolver, so React Hook Form won't clear them on
  // its own when the field changes. Clear the specific field's error as the
  // user edits it, so a fixed field doesn't keep showing a stale message.
  const registerField = (name: FieldPath<AthleteRegistrationValues>) =>
    register(name, { onChange: () => clearErrors(name) });

  return (
    <SectionShell
      title="Personal Information"
      description="This is how coaches, academies, and sponsors will identify and contact you."
    >
      <div className="grid gap-5 sm:grid-cols-2">
        <Controller
          control={control}
          name="personal.photo"
          render={({ field }) => (
            <div className="sm:col-span-2">
              <AvatarUpload
                value={field.value ?? null}
                existingUrl={watch('personal.photoUrl') || undefined}
                onChange={field.onChange}
              />
            </div>
          )}
        />

        <TextField
          label="Full Name"
          required
          placeholder="e.g. Aditi Rao"
          error={e?.fullName?.message}
          {...registerField('personal.fullName')}
        />

        <Controller
          control={control}
          name="personal.gender"
          render={({ field }) => (
            <RadioPillGroup
              label="Gender"
              name="gender"
              required
              options={GENDER_OPTIONS}
              value={field.value}
              onChange={(v) => {
                field.onChange(v);
                clearErrors('personal.gender');
              }}
              error={e?.gender?.message}
            />
          )}
        />

        <TextField
          label="Date of Birth"
          type="date"
          required
          error={e?.dateOfBirth?.message}
          {...registerField('personal.dateOfBirth')}
        />

        <TextField
          label="Nationality"
          required
          placeholder="e.g. Indian"
          error={e?.nationality?.message}
          {...registerField('personal.nationality')}
        />

        <TextareaField
          label="Address"
          required
          placeholder="House / street / area"
          className="sm:col-span-2"
          error={e?.address?.message}
          {...registerField('personal.address')}
        />

        <TextField
          label="City"
          required
          placeholder="e.g. Pune"
          error={e?.city?.message}
          {...registerField('personal.city')}
        />

        <TextField
          label="State"
          required
          placeholder="e.g. Maharashtra"
          error={e?.state?.message}
          {...registerField('personal.state')}
        />

        <TextField
          label="Pincode"
          required
          placeholder="e.g. 411001"
          error={e?.pincode?.message}
          {...registerField('personal.pincode')}
        />

        <TextField
          label="Contact Number"
          type="tel"
          required
          placeholder="e.g. +91 98765 43210"
          error={e?.contactNumber?.message}
          {...registerField('personal.contactNumber')}
        />

        <TextField
          label="Email"
          type="email"
          required
          placeholder="you@example.com"
          className="sm:col-span-2"
          error={e?.email?.message}
          {...registerField('personal.email')}
        />

        <TextField
          label="School / College"
          optionalLabel
          placeholder="e.g. DAV Public School"
          error={e?.schoolCollege?.message}
          {...registerField('personal.schoolCollege')}
        />

        <TextField
          label="Club / Academy"
          optionalLabel
          placeholder="e.g. Pune Athletics Club"
          error={e?.clubAcademy?.message}
          {...registerField('personal.clubAcademy')}
        />

        <TextField
          label="Coach / Mentor"
          optionalLabel
          placeholder="e.g. Coach Rajesh Kumar"
          className="sm:col-span-2"
          error={e?.coachMentor?.message}
          {...registerField('personal.coachMentor')}
        />
      </div>
    </SectionShell>
  );
}
