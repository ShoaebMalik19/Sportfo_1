export type Gender = 'male' | 'female' | 'other' | 'prefer_not_to_say';

export type SkillLevel =
  | 'beginner'
  | 'intermediate'
  | 'advanced'
  | 'district'
  | 'state'
  | 'national'
  | 'international';

export type AthleteStatus = 'draft' | 'submitted';

export interface PersonalInfoValues {
  /** Chosen in the browser; uploaded to Storage on save/submit. */
  photo?: File | null;
  /** Public URL, set once the photo has been uploaded. */
  photoUrl?: string;
  photoName?: string;
  fullName: string;
  gender: Gender | '';
  dateOfBirth: string;
  nationality: string;
  address: string;
  city: string;
  state: string;
  pincode: string;
  contactNumber: string;
  email: string;
  schoolCollege?: string;
  clubAcademy?: string;
  coachMentor?: string;
}

export interface SportsInfoValues {
  primarySport: string;
  primarySportOther?: string;
  subCategory?: string;
  positionRole?: string;
  skillLevel: SkillLevel | '';
  awards?: string;
  scholarshipRecipient: 'yes' | 'no' | '';
}

export interface AchievementEntry {
  clientId: string;
  title: string;
  file: File | null;
  /** Populated once a file has been uploaded to Supabase Storage. */
  fileUrl?: string;
  fileName?: string;
}

export interface AthleteRegistrationValues {
  personal: PersonalInfoValues;
  sports: SportsInfoValues;
  achievements: AchievementEntry[];
}

export const EMPTY_PERSONAL_INFO: PersonalInfoValues = {
  photo: null,
  photoUrl: '',
  photoName: '',
  fullName: '',
  gender: '',
  dateOfBirth: '',
  nationality: '',
  address: '',
  city: '',
  state: '',
  pincode: '',
  contactNumber: '',
  email: '',
  schoolCollege: '',
  clubAcademy: '',
  coachMentor: '',
};

export const EMPTY_SPORTS_INFO: SportsInfoValues = {
  primarySport: '',
  primarySportOther: '',
  subCategory: '',
  positionRole: '',
  skillLevel: '',
  awards: '',
  scholarshipRecipient: '',
};

export const EMPTY_REGISTRATION: AthleteRegistrationValues = {
  personal: EMPTY_PERSONAL_INFO,
  sports: EMPTY_SPORTS_INFO,
  achievements: [],
};
