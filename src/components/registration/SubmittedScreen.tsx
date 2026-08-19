'use client';

import { Button } from '@/components/ui/Button';
import { useObjectUrl } from '@/lib/use-object-url';
import { Badge } from '@/components/ui/Badge';
import { Card, CardBody } from '@/components/ui/Card';
import { ProfileStrengthBar } from './ProfileStrengthBar';
import { IconCheck, IconTrophy } from '@/components/ui/icons';
import { GENDER_OPTIONS, SKILL_LEVELS } from '@/lib/constants/sports';
import { calculateProfileStrength } from '@/lib/profile-strength';
import type { AthleteRegistrationValues } from '@/types/athlete';

interface SubmittedScreenProps {
  values: AthleteRegistrationValues;
  mode: 'synced' | 'local-only';
  onEdit: () => void;
}

/** The athlete's uploaded photo if there is one, falling back to their initials. */
function ProfileAvatar({
  photo,
  url,
  initials,
}: {
  photo: File | null;
  url?: string;
  initials: string;
}) {
  const objectUrl = useObjectUrl(photo);
  const shown = objectUrl ?? url ?? null;

  if (shown) {
    return (
      // eslint-disable-next-line @next/next/no-img-element -- blob: preview URL, not an optimizable asset
      <img
        src={shown}
        alt=""
        className="animate-pop-in h-16 w-16 shrink-0 rounded-full object-cover ring-2 ring-brand-600/20"
      />
    );
  }

  return (
    <div className="animate-pop-in flex h-16 w-16 shrink-0 items-center justify-center rounded-full bg-brand-600 text-xl font-bold text-white">
      {initials || 'SF'}
    </div>
  );
}

export function SubmittedScreen({ values, mode, onEdit }: SubmittedScreenProps) {
  const strength = calculateProfileStrength(values);
  const genderLabel = GENDER_OPTIONS.find((g) => g.value === values.personal.gender)?.label;
  const skillLabel = SKILL_LEVELS.find((s) => s.value === values.sports.skillLevel)?.label;
  const sportLabel =
    values.sports.primarySport === 'Other' ? values.sports.primarySportOther : values.sports.primarySport;
  const initials = values.personal.fullName
    .split(' ')
    .filter(Boolean)
    .slice(0, 2)
    .map((p) => p[0]?.toUpperCase())
    .join('');

  return (
    <div>
      <div className="mb-8 flex flex-col items-center text-center">
        <div className="animate-pop-in flex h-12 w-12 items-center justify-center rounded-full bg-success-500/12 text-success-600">
          <IconCheck width={22} height={22} />
        </div>
        <h1 className="animate-fade-in-up mt-4 text-2xl font-extrabold tracking-tight text-ink-900 sm:text-3xl" style={{ animationDelay: '80ms' }}>
          Profile submitted
        </h1>
        <p className="animate-fade-in-up mt-2 max-w-md text-sm text-ink-900/55" style={{ animationDelay: '140ms' }}>
          {mode === 'synced'
            ? 'Your athlete profile has been saved to your SportFo account.'
            : "Your athlete profile was saved on this device. Once this app is connected to a live Supabase project, submissions will sync automatically."}
        </p>
      </div>

      <Card className="animate-fade-in-up" style={{ animationDelay: '200ms' }}>
        <CardBody className="sm:p-8">
          <div className="flex flex-col items-center gap-4 border-b border-ink-900/8 pb-6 text-center sm:flex-row sm:text-left">
            <ProfileAvatar
              photo={values.personal.photo ?? null}
              url={values.personal.photoUrl}
              initials={initials}
            />
            <div>
              <p className="text-lg font-bold text-ink-900">{values.personal.fullName}</p>
              <p className="text-sm text-ink-900/50">
                {[sportLabel, values.personal.city, values.personal.state].filter(Boolean).join(' · ')}
              </p>
              <div className="mt-2 flex flex-wrap justify-center gap-2 sm:justify-start">
                {skillLabel && <Badge tone="brand">Skill level: {skillLabel}</Badge>}
                <Badge tone="neutral">Verification: Pending</Badge>
                <Badge tone="success">Status: Submitted</Badge>
              </div>
            </div>
          </div>

          <div className="py-6">
            <ProfileStrengthBar value={strength} />
          </div>

          <div className="grid gap-6 border-t border-ink-900/8 pt-6 sm:grid-cols-2">
            <div>
              <p className="text-xs font-semibold uppercase tracking-wide text-ink-900/40">Personal</p>
              <dl className="mt-3 space-y-2 text-sm">
                <div className="flex justify-between gap-3">
                  <dt className="text-ink-900/45">Gender</dt>
                  <dd className="font-medium text-ink-900">{genderLabel || '—'}</dd>
                </div>
                <div className="flex justify-between gap-3">
                  <dt className="text-ink-900/45">Contact</dt>
                  <dd className="font-medium text-ink-900">{values.personal.contactNumber}</dd>
                </div>
                <div className="flex justify-between gap-3">
                  <dt className="text-ink-900/45">Email</dt>
                  <dd className="truncate font-medium text-ink-900">{values.personal.email}</dd>
                </div>
                <div className="flex justify-between gap-3">
                  <dt className="text-ink-900/45">Club / Academy</dt>
                  <dd className="font-medium text-ink-900">{values.personal.clubAcademy || '—'}</dd>
                </div>
              </dl>
            </div>

            <div>
              <p className="text-xs font-semibold uppercase tracking-wide text-ink-900/40">
                Achievements ({values.achievements.length})
              </p>
              {values.achievements.length === 0 ? (
                <p className="mt-3 text-sm text-ink-900/45">None added yet.</p>
              ) : (
                <ul className="mt-3 space-y-2">
                  {values.achievements.map((a) => (
                    <li key={a.clientId} className="flex items-start gap-2 text-sm">
                      <IconTrophy width={15} height={15} className="mt-0.5 shrink-0 text-accent-500" />
                      <span className="text-ink-900/80">{a.title}</span>
                    </li>
                  ))}
                </ul>
              )}
            </div>
          </div>
        </CardBody>
      </Card>

      <div
        className="animate-fade-in-up mt-6 flex flex-col items-center gap-3 sm:flex-row sm:justify-center"
        style={{ animationDelay: '260ms' }}
      >
        <Button variant="outline" onClick={onEdit}>
          Edit profile
        </Button>
        <Button href="/">Back to home</Button>
      </div>
    </div>
  );
}
