import type { AthleteRegistrationValues } from '@/types/athlete';

const REQUIRED_PERSONAL_FIELDS = [
  'fullName',
  'gender',
  'dateOfBirth',
  'nationality',
  'address',
  'city',
  'state',
  'pincode',
  'contactNumber',
  'email',
] as const;

const OPTIONAL_PERSONAL_FIELDS = ['schoolCollege', 'clubAcademy', 'coachMentor'] as const;

/** A profile photo is optional but meaningfully lifts how complete a profile looks. */
const PHOTO_WEIGHT = 8;

/**
 * Simple, transparent completeness score (0-100) used for the profile
 * strength indicator. Weighted so the required core fields matter most,
 * with sports info and achievements adding the rest.
 */
export function calculateProfileStrength(values: AthleteRegistrationValues): number {
  const totalWeight = 100;
  const personalWeight = 45 - PHOTO_WEIGHT;
  const sportsWeight = 30;
  const achievementsWeight = 25;

  const requiredFilled = REQUIRED_PERSONAL_FIELDS.filter((f) => Boolean(values.personal[f])).length;
  const optionalFilled = OPTIONAL_PERSONAL_FIELDS.filter((f) => Boolean(values.personal[f])).length;
  const personalScore =
    (requiredFilled / REQUIRED_PERSONAL_FIELDS.length) * 0.8 +
    (optionalFilled / OPTIONAL_PERSONAL_FIELDS.length) * 0.2;

  const sportsFields = [
    values.sports.primarySport,
    values.sports.skillLevel,
    values.sports.subCategory,
    values.sports.positionRole,
  ];
  const sportsScore = sportsFields.filter(Boolean).length / sportsFields.length;

  const achievementsScore = Math.min(values.achievements.filter((a) => a.title && (a.file || a.fileUrl)).length / 2, 1);

  const photoScore = values.personal.photo || values.personal.photoUrl ? 1 : 0;

  const score =
    personalScore * personalWeight +
    sportsScore * sportsWeight +
    achievementsScore * achievementsWeight +
    photoScore * PHOTO_WEIGHT;

  return Math.round(Math.min(score, totalWeight));
}
