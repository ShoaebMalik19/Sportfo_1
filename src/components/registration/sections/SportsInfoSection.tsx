'use client';

import { Controller, useFormContext, useWatch, type FieldPath } from 'react-hook-form';
import { TextField } from '@/components/ui/TextField';
import { SelectField } from '@/components/ui/SelectField';
import { TextareaField } from '@/components/ui/TextareaField';
import { RadioPillGroup } from '@/components/ui/RadioPillGroup';
import { SectionShell } from '../SectionShell';
import { PRIMARY_SPORTS, SKILL_LEVELS } from '@/lib/constants/sports';
import type { AthleteRegistrationValues } from '@/types/athlete';

const PRIMARY_SPORT_OPTIONS = PRIMARY_SPORTS.map((s) => ({ value: s, label: s }));

export function SportsInfoSection() {
  const {
    register,
    control,
    clearErrors,
    formState: { errors },
  } = useFormContext<AthleteRegistrationValues>();
  const e = errors.sports;

  const primarySport = useWatch({ control, name: 'sports.primarySport' });

  // See PersonalInfoSection for why manually-set errors need an explicit clear.
  const registerField = (name: FieldPath<AthleteRegistrationValues>) =>
    register(name, { onChange: () => clearErrors(name) });

  return (
    <SectionShell
      title="Sports Information"
      description="Tell us about the sport you compete in and your current level."
    >
      <div className="grid gap-5 sm:grid-cols-2">
        <SelectField
          label="Primary Sport"
          required
          options={PRIMARY_SPORT_OPTIONS}
          error={e?.primarySport?.message}
          {...registerField('sports.primarySport')}
        />

        {primarySport === 'Other' && (
          <TextField
            label="Specify Sport"
            required
            placeholder="e.g. Fencing"
            error={e?.primarySportOther?.message}
            {...registerField('sports.primarySportOther')}
          />
        )}

        <TextField
          label="Sub-Category"
          optionalLabel
          placeholder="e.g. 100m Sprint, Batting, Freestyle"
          error={e?.subCategory?.message}
          {...registerField('sports.subCategory')}
        />

        <TextField
          label="Position / Role"
          optionalLabel
          placeholder="e.g. Forward, Wicket-keeper, Setter"
          error={e?.positionRole?.message}
          {...registerField('sports.positionRole')}
        />

        <SelectField
          label="Skill Level"
          required
          options={SKILL_LEVELS}
          error={e?.skillLevel?.message}
          {...registerField('sports.skillLevel')}
        />

        <Controller
          control={control}
          name="sports.scholarshipRecipient"
          render={({ field }) => (
            <RadioPillGroup
              label="Scholarship Recipient"
              name="scholarshipRecipient"
              required
              options={[
                { value: 'yes', label: 'Yes' },
                { value: 'no', label: 'No' },
              ]}
              value={field.value}
              onChange={(v) => {
                field.onChange(v);
                clearErrors('sports.scholarshipRecipient');
              }}
              error={e?.scholarshipRecipient?.message}
            />
          )}
        />

        <TextareaField
          label="Awards"
          optionalLabel
          placeholder="List any awards or recognitions you've received"
          className="sm:col-span-2"
          error={e?.awards?.message}
          {...registerField('sports.awards')}
        />
      </div>
    </SectionShell>
  );
}
