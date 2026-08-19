/**
 * Hand-written types matching the SQL in supabase/migrations/.
 *
 * Once a real Supabase project is connected, prefer regenerating this file
 * with the Supabase CLI so it stays in sync with the live schema:
 *
 *   supabase gen types typescript --project-id <project-ref> > src/lib/supabase/types.ts
 */

export type AthleteStatusDb = 'draft' | 'submitted';
export type AchievementStatusDb = 'pending' | 'verified' | 'rejected';

export interface Database {
  public: {
    Tables: {
      athletes: {
        Row: {
          id: string;
          auth_user_id: string | null;
          full_name: string;
          gender: string;
          date_of_birth: string;
          nationality: string;
          address: string;
          city: string;
          state: string;
          pincode: string;
          contact_number: string;
          email: string;
          school_college: string | null;
          club_academy: string | null;
          coach_mentor: string | null;
          photo_url: string | null;
          skill_level: string | null;
          awards: string | null;
          scholarship_recipient: boolean | null;
          profile_strength: number;
          status: AthleteStatusDb;
          created_at: string;
          updated_at: string;
        };
        Insert: Partial<Database['public']['Tables']['athletes']['Row']> & { id: string };
        Update: Partial<Database['public']['Tables']['athletes']['Row']>;
      };
      sports: {
        Row: {
          id: string;
          athlete_id: string;
          primary_sport: string;
          sub_category: string | null;
          position_role: string | null;
          created_at: string;
        };
        Insert: Partial<Database['public']['Tables']['sports']['Row']> & {
          athlete_id: string;
          primary_sport: string;
        };
        Update: Partial<Database['public']['Tables']['sports']['Row']>;
      };
      achievements: {
        Row: {
          id: string;
          athlete_id: string;
          title: string;
          file_url: string | null;
          file_path: string | null;
          status: AchievementStatusDb;
          created_at: string;
        };
        Insert: Partial<Database['public']['Tables']['achievements']['Row']> & {
          athlete_id: string;
          title: string;
        };
        Update: Partial<Database['public']['Tables']['achievements']['Row']>;
      };
    };
  };
}
