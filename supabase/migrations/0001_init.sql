-- SportFo — initial schema for the Athlete Registration MVP.
-- Scope: athletes + their sports info + achievements only.
-- Everything else in the long-term PRD (academies, CSR, jobs, discovery,
-- verification workflows) is intentionally left out until those features
-- are actually built.

create extension if not exists "pgcrypto";

-- ---------------------------------------------------------------------------
-- athletes
-- ---------------------------------------------------------------------------
create table if not exists public.athletes (
  id                     uuid primary key default gen_random_uuid(),
  -- Nullable for now: athletes aren't authenticated yet in this iteration.
  -- Once mobile OTP login ships, new rows will be created with this set,
  -- and RLS below will be tightened to require it.
  auth_user_id           uuid references auth.users (id) on delete set null,

  full_name              text not null,
  gender                 text not null check (gender in ('male', 'female', 'other', 'prefer_not_to_say')),
  date_of_birth          date not null,
  nationality            text not null,
  address                text not null,
  city                   text not null,
  state                  text not null,
  pincode                text not null,
  contact_number         text not null,
  email                  text not null,
  school_college         text,
  club_academy           text,
  coach_mentor           text,

  -- Denormalized onto athletes (rather than `sports`) to mirror the MVP
  -- product doc. Revisit if an athlete ever needs more than one sport.
  skill_level            text check (skill_level in ('beginner','intermediate','advanced','district','state','national','international')),
  awards                 text,
  scholarship_recipient  boolean default false,

  profile_strength       int not null default 0,
  status                 text not null default 'draft' check (status in ('draft', 'submitted')),

  created_at             timestamptz not null default now(),
  updated_at             timestamptz not null default now()
);

comment on table public.athletes is 'One row per athlete profile (personal + sports summary). MVP scope only.';

-- ---------------------------------------------------------------------------
-- sports
-- ---------------------------------------------------------------------------
create table if not exists public.sports (
  id             uuid primary key default gen_random_uuid(),
  athlete_id     uuid not null references public.athletes (id) on delete cascade,
  primary_sport  text not null,
  sub_category   text,
  position_role  text,
  created_at     timestamptz not null default now(),

  -- One primary-sport row per athlete for now; the table is still
  -- separate from `athletes` so an athlete can have more than one in future.
  unique (athlete_id)
);

-- ---------------------------------------------------------------------------
-- achievements
-- ---------------------------------------------------------------------------
create table if not exists public.achievements (
  id           uuid primary key default gen_random_uuid(),
  athlete_id   uuid not null references public.athletes (id) on delete cascade,
  title        text not null,
  file_url     text,
  file_path    text,
  -- 'pending' is the only status this MVP ever sets. 'verified'/'rejected'
  -- exist so a future verification workflow doesn't need a migration.
  status       text not null default 'pending' check (status in ('pending', 'verified', 'rejected')),
  created_at   timestamptz not null default now()
);

create index if not exists achievements_athlete_id_idx on public.achievements (athlete_id);

-- ---------------------------------------------------------------------------
-- updated_at trigger for athletes
-- ---------------------------------------------------------------------------
create or replace function public.set_updated_at()
returns trigger
language plpgsql
as $$
begin
  new.updated_at = now();
  return new;
end;
$$;

drop trigger if exists athletes_set_updated_at on public.athletes;
create trigger athletes_set_updated_at
  before update on public.athletes
  for each row
  execute function public.set_updated_at();

-- ---------------------------------------------------------------------------
-- Row Level Security
--
-- Pre-auth security model (temporary): there is no login yet, so a draft is
-- only as private as its UUID. Anyone holding an athlete's id can read/write
-- that one row. Once mobile OTP auth ships, replace these policies with
-- auth_user_id = auth.uid() checks and backfill auth_user_id on existing rows.
-- ---------------------------------------------------------------------------
alter table public.athletes enable row level security;
alter table public.sports enable row level security;
alter table public.achievements enable row level security;

drop policy if exists "athletes_pre_auth_all" on public.athletes;
create policy "athletes_pre_auth_all"
  on public.athletes
  for all
  using (auth_user_id is null or auth_user_id = auth.uid())
  with check (auth_user_id is null or auth_user_id = auth.uid());

drop policy if exists "sports_pre_auth_all" on public.sports;
create policy "sports_pre_auth_all"
  on public.sports
  for all
  using (
    exists (
      select 1 from public.athletes a
      where a.id = sports.athlete_id
        and (a.auth_user_id is null or a.auth_user_id = auth.uid())
    )
  )
  with check (
    exists (
      select 1 from public.athletes a
      where a.id = sports.athlete_id
        and (a.auth_user_id is null or a.auth_user_id = auth.uid())
    )
  );

drop policy if exists "achievements_pre_auth_all" on public.achievements;
create policy "achievements_pre_auth_all"
  on public.achievements
  for all
  using (
    exists (
      select 1 from public.athletes a
      where a.id = achievements.athlete_id
        and (a.auth_user_id is null or a.auth_user_id = auth.uid())
    )
  )
  with check (
    exists (
      select 1 from public.athletes a
      where a.id = achievements.athlete_id
        and (a.auth_user_id is null or a.auth_user_id = auth.uid())
    )
  );

-- ---------------------------------------------------------------------------
-- Storage bucket for achievement files
-- ---------------------------------------------------------------------------
insert into storage.buckets (id, name, public)
values ('achievements', 'achievements', true)
on conflict (id) do nothing;

drop policy if exists "achievements_bucket_read" on storage.objects;
create policy "achievements_bucket_read"
  on storage.objects for select
  using (bucket_id = 'achievements');

drop policy if exists "achievements_bucket_write" on storage.objects;
create policy "achievements_bucket_write"
  on storage.objects for insert
  with check (bucket_id = 'achievements');
