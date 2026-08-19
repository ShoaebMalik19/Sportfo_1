import { getSupabaseBrowserClient, ACHIEVEMENTS_BUCKET, PHOTOS_BUCKET } from './client';
import type { AthleteRegistrationValues, AchievementEntry } from '@/types/athlete';

interface SaveProfileResult {
  ok: boolean;
  error?: string;
}

function resolvePrimarySport(values: AthleteRegistrationValues) {
  const { primarySport, primarySportOther } = values.sports;
  return primarySport === 'Other' ? primarySportOther?.trim() || 'Other' : primarySport;
}

/**
 * Upserts the athlete + sports rows for a given draft id.
 * status is 'draft' while the athlete is still filling the form, and
 * 'submitted' once they complete the review step.
 */
export async function saveAthleteProfile(
  athleteId: string,
  values: AthleteRegistrationValues,
  status: 'draft' | 'submitted'
): Promise<SaveProfileResult> {
  const supabase = getSupabaseBrowserClient();
  if (!supabase) {
    return { ok: false, error: 'Supabase is not configured in this environment.' };
  }

  const { personal, sports } = values;

  const { error: athleteError } = await supabase.from('athletes').upsert({
    id: athleteId,
    full_name: personal.fullName,
    gender: personal.gender || null,
    date_of_birth: personal.dateOfBirth,
    nationality: personal.nationality,
    address: personal.address,
    city: personal.city,
    state: personal.state,
    pincode: personal.pincode,
    contact_number: personal.contactNumber,
    email: personal.email,
    school_college: personal.schoolCollege || null,
    club_academy: personal.clubAcademy || null,
    coach_mentor: personal.coachMentor || null,
    photo_url: personal.photoUrl || null,
    skill_level: sports.skillLevel || null,
    awards: sports.awards || null,
    scholarship_recipient: sports.scholarshipRecipient === 'yes',
    status,
    updated_at: new Date().toISOString(),
  } as never);

  if (athleteError) {
    return { ok: false, error: athleteError.message };
  }

  const { error: sportsError } = await supabase.from('sports').upsert(
    {
      athlete_id: athleteId,
      primary_sport: resolvePrimarySport(values) || '',
      sub_category: sports.subCategory || null,
      position_role: sports.positionRole || null,
    } as never,
    { onConflict: 'athlete_id' }
  );

  if (sportsError) {
    return { ok: false, error: sportsError.message };
  }

  return { ok: true };
}

/**
 * Uploads the athlete's profile photo and returns its public URL.
 *
 * Uses a fixed path per athlete with `upsert: true` so replacing a photo
 * overwrites the old one rather than accumulating orphaned files in Storage.
 */
export async function uploadProfilePhoto(
  athleteId: string,
  file: File
): Promise<{ ok: true; url: string } | { ok: false; error: string }> {
  const supabase = getSupabaseBrowserClient();
  if (!supabase) {
    return { ok: false, error: 'Supabase is not configured in this environment.' };
  }

  const extension = (file.name.split('.').pop() || 'jpg').replace(/[^a-zA-Z0-9]/g, '').toLowerCase();
  const path = `${athleteId}/profile.${extension || 'jpg'}`;

  const { error } = await supabase.storage.from(PHOTOS_BUCKET).upload(path, file, {
    upsert: true,
    cacheControl: '3600',
  });

  if (error) {
    return { ok: false, error: error.message };
  }

  const { data } = supabase.storage.from(PHOTOS_BUCKET).getPublicUrl(path);
  // Bust any cached copy of the previous photo at this same path.
  return { ok: true, url: `${data.publicUrl}?v=${Date.now()}` };
}

/** Uploads a single achievement file to Storage and returns its public URL + path. */
export async function uploadAchievementFile(
  athleteId: string,
  file: File
): Promise<{ ok: true; path: string; url: string } | { ok: false; error: string }> {
  const supabase = getSupabaseBrowserClient();
  if (!supabase) {
    return { ok: false, error: 'Supabase is not configured in this environment.' };
  }

  const safeName = file.name.replace(/[^a-zA-Z0-9.\-_]/g, '_');
  const path = `${athleteId}/${Date.now()}-${safeName}`;

  const { error: uploadError } = await supabase.storage.from(ACHIEVEMENTS_BUCKET).upload(path, file, {
    upsert: false,
    cacheControl: '3600',
  });

  if (uploadError) {
    return { ok: false, error: uploadError.message };
  }

  const { data } = supabase.storage.from(ACHIEVEMENTS_BUCKET).getPublicUrl(path);
  return { ok: true, path, url: data.publicUrl };
}

/**
 * Uploads any achievement entries that still have a raw File attached
 * (i.e. not yet synced) and returns a copy of the list with fileUrl/fileName
 * filled in. Entries that fail to upload are left untouched so the caller
 * can decide how to surface the error.
 */
export async function uploadAllAchievementFiles(
  athleteId: string,
  achievements: AchievementEntry[]
): Promise<AchievementEntry[]> {
  const results: AchievementEntry[] = [];
  for (const achievement of achievements) {
    if (achievement.file && !achievement.fileUrl) {
      const uploadResult = await uploadAchievementFile(athleteId, achievement.file);
      if (uploadResult.ok) {
        results.push({ ...achievement, fileUrl: uploadResult.url, fileName: achievement.file.name });
        continue;
      }
    }
    results.push(achievement);
  }
  return results;
}

/** Replaces all achievement rows for an athlete with the given list. */
export async function saveAchievements(
  athleteId: string,
  achievements: AchievementEntry[]
): Promise<SaveProfileResult> {
  const supabase = getSupabaseBrowserClient();
  if (!supabase) {
    return { ok: false, error: 'Supabase is not configured in this environment.' };
  }

  const { error: deleteError } = await supabase.from('achievements').delete().eq('athlete_id', athleteId);
  if (deleteError) {
    return { ok: false, error: deleteError.message };
  }

  const withFiles = achievements.filter((a) => a.title.trim());
  if (withFiles.length === 0) return { ok: true };

  const rows = withFiles.map((a) => ({
    athlete_id: athleteId,
    title: a.title,
    file_url: a.fileUrl || null,
    file_path: null,
    status: 'pending' as const,
  }));

  const { error: insertError } = await supabase.from('achievements').insert(rows as never);
  if (insertError) {
    return { ok: false, error: insertError.message };
  }

  return { ok: true };
}
