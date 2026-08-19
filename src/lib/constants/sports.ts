export const PRIMARY_SPORTS = [
  'Athletics (Track & Field)',
  'Badminton',
  'Basketball',
  'Boxing',
  'Chess',
  'Cricket',
  'Cycling',
  'Football',
  'Golf',
  'Hockey',
  'Judo',
  'Kabaddi',
  'Kho Kho',
  'Shooting',
  'Swimming',
  'Table Tennis',
  'Tennis',
  'Volleyball',
  'Weightlifting',
  'Wrestling',
  'Other',
] as const;

export const SKILL_LEVELS: { value: string; label: string }[] = [
  { value: 'beginner', label: 'Beginner' },
  { value: 'intermediate', label: 'Intermediate' },
  { value: 'advanced', label: 'Advanced' },
  { value: 'district', label: 'District Level' },
  { value: 'state', label: 'State Level' },
  { value: 'national', label: 'National Level' },
  { value: 'international', label: 'International Level' },
];

export const GENDER_OPTIONS: { value: string; label: string }[] = [
  { value: 'male', label: 'Male' },
  { value: 'female', label: 'Female' },
  { value: 'other', label: 'Other' },
  { value: 'prefer_not_to_say', label: 'Prefer not to say' },
];
