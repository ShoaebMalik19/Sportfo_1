import { z } from 'zod';

const PINCODE_REGEX = /^[A-Za-z0-9][A-Za-z0-9\- ]{2,9}$/;
const PHONE_REGEX = /^[+]?[0-9\s-]{7,15}$/;

export const personalInfoSchema = z.object({
  fullName: z
    .string()
    .trim()
    .min(2, 'Enter your full name')
    .max(100, 'Full name looks too long'),
  gender: z.enum(['male', 'female', 'other', 'prefer_not_to_say'], {
    errorMap: () => ({ message: 'Select a gender' }),
  }),
  dateOfBirth: z
    .string()
    .min(1, 'Date of birth is required')
    .refine((val) => !Number.isNaN(Date.parse(val)), 'Enter a valid date')
    .refine((val) => {
      const dob = new Date(val);
      const age = (Date.now() - dob.getTime()) / (365.25 * 24 * 60 * 60 * 1000);
      return age >= 5 && age <= 80;
    }, 'Enter a realistic date of birth'),
  nationality: z.string().trim().min(2, 'Nationality is required').max(60),
  address: z.string().trim().min(5, 'Address is required').max(240),
  city: z.string().trim().min(2, 'City is required').max(80),
  state: z.string().trim().min(2, 'State is required').max(80),
  pincode: z
    .string()
    .trim()
    .regex(PINCODE_REGEX, 'Enter a valid pincode'),
  contactNumber: z
    .string()
    .trim()
    .regex(PHONE_REGEX, 'Enter a valid contact number'),
  email: z.string().trim().email('Enter a valid email address'),
  schoolCollege: z.string().trim().max(120).optional().or(z.literal('')),
  clubAcademy: z.string().trim().max(120).optional().or(z.literal('')),
  coachMentor: z.string().trim().max(120).optional().or(z.literal('')),
});

export const sportsInfoSchema = z
  .object({
    primarySport: z.string().min(1, 'Select your primary sport'),
    primarySportOther: z.string().trim().max(60).optional().or(z.literal('')),
    subCategory: z.string().trim().max(100).optional().or(z.literal('')),
    positionRole: z.string().trim().max(100).optional().or(z.literal('')),
    skillLevel: z.enum(
      ['beginner', 'intermediate', 'advanced', 'district', 'state', 'national', 'international'],
      { errorMap: () => ({ message: 'Select your skill level' }) }
    ),
    awards: z.string().trim().max(500).optional().or(z.literal('')),
    scholarshipRecipient: z.enum(['yes', 'no'], {
      errorMap: () => ({ message: 'Let us know if you receive a scholarship' }),
    }),
  })
  .superRefine((data, ctx) => {
    if (data.primarySport === 'Other' && !data.primarySportOther?.trim()) {
      ctx.addIssue({
        code: z.ZodIssueCode.custom,
        path: ['primarySportOther'],
        message: 'Tell us which sport',
      });
    }
  });

export const achievementSchema = z.object({
  clientId: z.string(),
  title: z.string().trim().min(2, 'Give this achievement a title').max(150),
  file: z.custom<File | null>((v) => v instanceof File, 'Attach a supporting file'),
  fileUrl: z.string().optional(),
  fileName: z.string().optional(),
});

export const achievementsStepSchema = z.array(achievementSchema).max(10, 'You can add up to 10 achievements for now');

export type PersonalInfoSchema = z.infer<typeof personalInfoSchema>;
export type SportsInfoSchema = z.infer<typeof sportsInfoSchema>;
export type AchievementSchema = z.infer<typeof achievementSchema>;
