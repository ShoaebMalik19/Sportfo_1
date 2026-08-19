'use client';

import { useFormContext, useWatch } from 'react-hook-form';
import { useObjectUrl } from '@/lib/use-object-url';
import { SectionShell } from '../SectionShell';
import { ProfileStrengthBar } from '../ProfileStrengthBar';
import { Badge } from '@/components/ui/Badge';
import { GENDER_OPTIONS, SKILL_LEVELS } from '@/lib/constants/sports';
import { calculateProfileStrength } from '@/lib/profile-strength';
import type { AthleteRegistrationValues } from '@/types/athlete';

function ReviewRow({ label, value }: { label: string; value?: string | null }) {
  if (!value) return null;
  return (
    <div className="flex flex-col gap-0.5 py-2 sm:flex-row sm:justify-between sm:gap-4">
      <span className="text-xs font-medium uppercase tracking-wide text-ink-900/40">{label}</span>
      <span className="text-sm font-medium text-ink-900 sm:text-right">{value}</span>
    </div>
  );
}

/** Small circular preview of the chosen profile photo, if there is one. */
function PhotoPreview({ photo, url }: { photo: File | null; url?: string }) {
  const objectUrl = useObjectUrl(photo);
  const shown = objectUrl ?? url ?? null;
  if (!shown) return null;

  return (
    <div className="mb-4 flex items-center gap-3 border-b border-ink-900/6 pb-4">
      {/* eslint-disable-next-line @next/next/no-img-element -- blob: preview URL, not an optimizable asset */}
      <img
        src={shown}
        alt="Your profile photo"
        className="h-14 w-14 rounded-full object-cover ring-2 ring-brand-600/15"
      />
      <div>
        <p className="text-xs font-medium uppercase tracking-wide text-ink-900/40">Profile photo</p>
        <p className="text-sm font-medium text-ink-900">Added</p>
      </div>
    </div>
  );
}

function EditLink({ onClick }: { onClick: () => void }) {
  return (
    <button
      type="button"
      onClick={onClick}
      className="focus-ring rounded-md text-xs font-semibold text-brand-600 underline-offset-2 transition-colors hover:text-brand-700 hover:underline"
    >
      Edit
    </button>
  );
}

export function ReviewSection({
  goToStep,
  confirmed,
  onConfirmChange,
}: {
  goToStep: (index: number) => void;
  confirmed: boolean;
  onConfirmChange: (value: boolean) => void;
}) {
  const { control } = useFormContext<AthleteRegistrationValues>();
  const values = useWatch({ control }) as AthleteRegistrationValues;
  const strength = calculateProfileStrength(values);

  const genderLabel = GENDER_OPTIONS.find((g) => g.value === values.personal?.gender)?.label;
  const skillLabel = SKILL_LEVELS.find((s) => s.value === values.sports?.skillLevel)?.label;
  const sportLabel =
    values.sports?.primarySport === 'Other'
      ? values.sports?.primarySportOther
      : values.sports?.primarySport;

  return (
    <SectionShell title="Review Before Submission" description="Check everything looks right, then submit your profile.">
      <ProfileStrengthBar value={strength} className="mb-7" />

      <div className="space-y-6">
        <div className="rounded-2xl border border-ink-900/8 p-5 sm:p-6">
          <div className="mb-2 flex items-center justify-between">
            <p className="text-sm font-semibold text-ink-900">Personal Information</p>
            <EditLink onClick={() => goToStep(0)} />
          </div>
          <PhotoPreview photo={values.personal?.photo ?? null} url={values.personal?.photoUrl} />
          <div className="divide-y divide-ink-900/6">
            <ReviewRow label="Full Name" value={values.personal?.fullName} />
            <ReviewRow label="Gender" value={genderLabel} />
            <ReviewRow label="Date of Birth" value={values.personal?.dateOfBirth} />
            <ReviewRow label="Nationality" value={values.personal?.nationality} />
            <ReviewRow label="Address" value={values.personal?.address} />
            <ReviewRow label="City / State" value={[values.personal?.city, values.personal?.state].filter(Boolean).join(', ')} />
            <ReviewRow label="Pincode" value={values.personal?.pincode} />
            <ReviewRow label="Contact Number" value={values.personal?.contactNumber} />
            <ReviewRow label="Email" value={values.personal?.email} />
            <ReviewRow label="School / College" value={values.personal?.schoolCollege} />
            <ReviewRow label="Club / Academy" value={values.personal?.clubAcademy} />
            <ReviewRow label="Coach / Mentor" value={values.personal?.coachMentor} />
          </div>
        </div>

        <div className="rounded-2xl border border-ink-900/8 p-5 sm:p-6">
          <div className="mb-2 flex items-center justify-between">
            <p className="text-sm font-semibold text-ink-900">Sports Information</p>
            <EditLink onClick={() => goToStep(1)} />
          </div>
          <div className="divide-y divide-ink-900/6">
            <ReviewRow label="Primary Sport" value={sportLabel} />
            <ReviewRow label="Sub-Category" value={values.sports?.subCategory} />
            <ReviewRow label="Position / Role" value={values.sports?.positionRole} />
            <ReviewRow label="Skill Level" value={skillLabel} />
            <ReviewRow label="Awards" value={values.sports?.awards} />
            <ReviewRow
              label="Scholarship Recipient"
              value={values.sports?.scholarshipRecipient === 'yes' ? 'Yes' : values.sports?.scholarshipRecipient === 'no' ? 'No' : undefined}
            />
          </div>
        </div>

        <div className="rounded-2xl border border-ink-900/8 p-5 sm:p-6">
          <div className="mb-3 flex items-center justify-between">
            <p className="text-sm font-semibold text-ink-900">
              Achievements {values.achievements?.length ? `(${values.achievements.length})` : ''}
            </p>
            <EditLink onClick={() => goToStep(2)} />
          </div>
          {!values.achievements?.length ? (
            <p className="text-sm text-ink-900/45">No achievements added.</p>
          ) : (
            <ul className="space-y-2">
              {values.achievements.map((a, i) => (
                <li key={a.clientId || i} className="flex items-center justify-between rounded-lg bg-ink-900/[0.02] px-3 py-2">
                  <span className="text-sm text-ink-900/80">{a.title || 'Untitled achievement'}</span>
                  <Badge tone={a.file ? 'success' : 'neutral'}>{a.file ? a.file.name : 'No file'}</Badge>
                </li>
              ))}
            </ul>
          )}
        </div>
      </div>

      <label className="mt-7 flex items-start gap-3 rounded-lg border border-ink-900/10 bg-ink-900/[0.015] p-4 transition-colors has-[:checked]:border-brand-300 has-[:checked]:bg-brand-50/50">
        <input
          type="checkbox"
          checked={confirmed}
          onChange={(e) => onConfirmChange(e.target.checked)}
          className="focus-ring mt-0.5 h-4 w-4 rounded border-ink-900/25 text-brand-600"
        />
        <span className="text-sm text-ink-900/70">
          I confirm the information provided is accurate to the best of my knowledge.
        </span>
      </label>
    </SectionShell>
  );
}
