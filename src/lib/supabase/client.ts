'use client';

import { createClient, type SupabaseClient } from '@supabase/supabase-js';
import type { Database } from './types';

const supabaseUrl = process.env.NEXT_PUBLIC_SUPABASE_URL;
const supabaseAnonKey = process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY;

/**
 * True once NEXT_PUBLIC_SUPABASE_URL / NEXT_PUBLIC_SUPABASE_ANON_KEY are set.
 * The registration flow uses this to fall back to a local-only draft mode
 * during development, instead of silently failing or faking success.
 */
export const isSupabaseConfigured = Boolean(supabaseUrl && supabaseAnonKey);

let browserClient: SupabaseClient<Database> | null = null;

/** Lazily-created singleton Supabase client for use in Client Components. */
export function getSupabaseBrowserClient(): SupabaseClient<Database> | null {
  if (!isSupabaseConfigured) return null;
  if (!browserClient) {
    browserClient = createClient<Database>(supabaseUrl as string, supabaseAnonKey as string, {
      auth: {
        persistSession: true,
        autoRefreshToken: true,
      },
    });
  }
  return browserClient;
}

export const ACHIEVEMENTS_BUCKET =
  process.env.NEXT_PUBLIC_SUPABASE_ACHIEVEMENTS_BUCKET || 'achievements';

/** Profile photos live in their own bucket so they can be public-read while
 *  achievement files stay locked down. See supabase/README.md. */
export const PHOTOS_BUCKET = process.env.NEXT_PUBLIC_SUPABASE_PHOTOS_BUCKET || 'athlete-photos';
