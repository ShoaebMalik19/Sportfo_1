'use client';

import type { AthleteRegistrationValues } from '@/types/athlete';

const DRAFT_ID_KEY = 'sportfo_draft_athlete_id';
const DRAFT_VALUES_KEY = 'sportfo_draft_athlete_values';

/**
 * Athletes aren't authenticated yet in this iteration (OTP login is a
 * future feature), so drafts are keyed by an unguessable id kept in
 * localStorage. Once auth ships, this id will be replaced by the
 * authenticated user's id.
 */
export function getOrCreateDraftId(): string {
  if (typeof window === 'undefined') return '';
  let id = window.localStorage.getItem(DRAFT_ID_KEY);
  if (!id) {
    id = crypto.randomUUID();
    window.localStorage.setItem(DRAFT_ID_KEY, id);
  }
  return id;
}

/** Local fallback so "Save Draft" always works, even without Supabase configured. */
export function saveLocalDraft(values: AthleteRegistrationValues) {
  if (typeof window === 'undefined') return;
  // `photo` is a File. JSON.stringify turns a File into `{}`, which would then
  // be restored as a bogus non-File value and break the preview, so drop it
  // and keep only the uploaded URL/name that survive a round trip.
  const { photo: _photo, ...personalWithoutFile } = values.personal;
  const serializable = {
    personal: personalWithoutFile,
    sports: values.sports,
    achievements: values.achievements.map((a) => ({
      clientId: a.clientId,
      title: a.title,
      fileName: a.file?.name || a.fileName,
    })),
  };
  window.localStorage.setItem(DRAFT_VALUES_KEY, JSON.stringify(serializable));
}

export function loadLocalDraft(): {
  personal: Omit<AthleteRegistrationValues['personal'], 'photo'>;
  sports: AthleteRegistrationValues['sports'];
  achievements: { clientId: string; title: string; fileName?: string }[];
} | null {
  if (typeof window === 'undefined') return null;
  const raw = window.localStorage.getItem(DRAFT_VALUES_KEY);
  if (!raw) return null;
  try {
    return JSON.parse(raw);
  } catch {
    return null;
  }
}

export function clearLocalDraft() {
  if (typeof window === 'undefined') return;
  window.localStorage.removeItem(DRAFT_VALUES_KEY);
  window.localStorage.removeItem(DRAFT_ID_KEY);
}
