# SportFo — Supabase setup

This folder holds the SQL migration for the Athlete Registration MVP. It is
intentionally small: three tables (`athletes`, `sports`, `achievements`) plus
one Storage bucket (`achievements`).

## 1. Create a Supabase project

Create a project at https://supabase.com if you don't have one yet.

## 2. Apply the migration

Easiest path — paste `migrations/0001_init.sql` into the Supabase Dashboard's
SQL Editor and run it.

If you use the Supabase CLI instead:

```bash
supabase link --project-ref <your-project-ref>
supabase db push
```

## 3. Set environment variables

Copy `.env.example` to `.env.local` in the project root and fill in the
values from Supabase Dashboard → Settings → API:

```
NEXT_PUBLIC_SUPABASE_URL=
NEXT_PUBLIC_SUPABASE_ANON_KEY=
SUPABASE_SERVICE_ROLE_KEY=
NEXT_PUBLIC_SUPABASE_ACHIEVEMENTS_BUCKET=achievements
```

`.env.local` is gitignored — never commit real credentials.

## 4. What's actually wired up right now

- Saving a draft and submitting the athlete registration form both write to
  `athletes` + `sports`, and achievement files upload to the `achievements`
  Storage bucket with rows written to `achievements`.
- If these env vars are missing, the registration form falls back to a
  local-only draft (saved in the browser's `localStorage`) and says so in
  the UI — it never pretends to save data it didn't.

## 5. Security model (temporary, pre-auth)

There is no login yet (mobile OTP auth is a separate, not-yet-built
feature). Until it ships, a draft is identified by an unguessable UUID
generated in the browser, and RLS allows read/write to any row where
`auth_user_id is null`. This is fine for an early MVP but is **not**
real per-user isolation.

Once OTP auth is added:

1. Start setting `auth_user_id` on new athlete rows at signup.
2. Backfill `auth_user_id` for any existing draft rows you want to keep.
3. Tighten the RLS policies in `0001_init.sql` (or a follow-up migration) to
   require `auth_user_id = auth.uid()` unconditionally.

## 6. Extending the schema later

Keep new features in new tables/migrations rather than widening these three.
Likely next additions, based on the product doc: `academies`, `csr_sponsors`,
`employers`, `job_postings`, and a proper `verifications` table once profile
verification is built.
