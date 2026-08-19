'use client';

import * as React from 'react';
import { Controller, useFieldArray, useFormContext } from 'react-hook-form';
import { TextField } from '@/components/ui/TextField';
import { FileUpload } from '@/components/ui/FileUpload';
import { Button } from '@/components/ui/Button';
import { SectionShell } from '../SectionShell';
import { IconTrophy, IconUpload } from '@/components/ui/icons';
import type { AthleteRegistrationValues } from '@/types/athlete';

const MAX_ACHIEVEMENTS = 10;

export function AchievementsSection() {
  const {
    register,
    control,
    clearErrors,
    formState: { errors },
  } = useFormContext<AthleteRegistrationValues>();

  const { fields, append, remove } = useFieldArray({ control, name: 'achievements' });

  return (
    <SectionShell
      title="Achievements"
      description="Add medals, certificates, or results as proof. You can skip this for now and add achievements later."
    >
      {fields.length === 0 ? (
        <div className="animate-fade-in flex flex-col items-center justify-center rounded-2xl border border-dashed border-ink-900/15 px-6 py-12 text-center">
          <div className="flex h-12 w-12 items-center justify-center rounded-full bg-brand-50 text-brand-600">
            <IconTrophy width={22} height={22} />
          </div>
          <p className="mt-4 text-sm font-semibold text-ink-900">No achievements added yet</p>
          <p className="mt-1 max-w-xs text-sm text-ink-900/50">
            Adding at least one achievement makes your profile stand out — but it&rsquo;s
            optional and you can always add more later.
          </p>
          <Button
            type="button"
            variant="outline"
            size="sm"
            className="mt-5"
            icon={<IconUpload width={16} height={16} />}
            iconPosition="left"
            onClick={() => append({ clientId: crypto.randomUUID(), title: '', file: null })}
          >
            Add an achievement
          </Button>
        </div>
      ) : (
        <div className="space-y-5">
          {fields.map((field, index) => (
            <div key={field.id} className="animate-fade-in-up rounded-2xl border border-ink-900/8 p-5 sm:p-6 transition-shadow hover:shadow-card">
              <div className="mb-4 flex items-center justify-between">
                <p className="text-sm font-semibold text-ink-900">Achievement {index + 1}</p>
                <button
                  type="button"
                  onClick={() => remove(index)}
                  className="focus-ring rounded-md px-2 py-1 text-xs font-medium text-ink-900/40 hover:bg-ink-900/[0.05] hover:text-red-600"
                >
                  Remove
                </button>
              </div>

              <div className="grid gap-5 sm:grid-cols-2">
                <TextField
                  label="Achievement Title"
                  required
                  placeholder="e.g. State Athletics Championship — Gold"
                  className="sm:col-span-2"
                  error={errors.achievements?.[index]?.title?.message}
                  {...register(`achievements.${index}.title` as const, {
                    onChange: () => clearErrors(`achievements.${index}.title`),
                  })}
                />

                <div className="sm:col-span-2">
                  <p className="mb-1.5 flex items-baseline justify-between text-sm font-medium text-ink-900">
                    <span>
                      Supporting File<span className="ml-0.5 text-brand-600">*</span>
                    </span>
                  </p>
                  <Controller
                    control={control}
                    name={`achievements.${index}.file`}
                    render={({ field: fileField, fieldState }) => (
                      <FileUpload
                        id={`achievement-file-${field.id}`}
                        value={fileField.value}
                        onChange={(file) => {
                          fileField.onChange(file);
                          clearErrors(`achievements.${index}.file`);
                        }}
                        error={fieldState.error?.message}
                      />
                    )}
                  />
                  {!field.file && field.fileName && (
                    <p className="mt-1.5 text-xs text-accent-600">
                      Previously attached &ldquo;{field.fileName}&rdquo; — please re-attach it after loading a saved draft.
                    </p>
                  )}
                </div>
              </div>
            </div>
          ))}

          {fields.length < MAX_ACHIEVEMENTS && (
            <Button
              type="button"
              variant="outline"
              size="sm"
              icon={<IconUpload width={16} height={16} />}
              iconPosition="left"
              onClick={() => append({ clientId: crypto.randomUUID(), title: '', file: null })}
            >
              Add another achievement
            </Button>
          )}
        </div>
      )}
    </SectionShell>
  );
}
