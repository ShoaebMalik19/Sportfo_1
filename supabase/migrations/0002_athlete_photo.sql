-- Adds the athlete profile photo, introduced with the profile-photo upload
-- in the registration flow.
--
-- The image itself lives in Storage (bucket: athlete-photos, one object per
-- athlete at `<athlete_id>/profile.<ext>`); only its public URL is stored on
-- the row. Keeping photos in their own bucket means they can be public-read
-- for profile display while achievement files — which are evidence documents,
-- often containing personal detail — stay locked down separately.

alter table public.athletes
  add column if not exists photo_url text;

comment on column public.athletes.photo_url is
  'Public URL of the athlete profile photo in the athlete-photos storage bucket.';

-- ---------------------------------------------------------------------------
-- Storage bucket for profile photos
-- ---------------------------------------------------------------------------
insert into storage.buckets (id, name, public)
values ('athlete-photos', 'athlete-photos', true)
on conflict (id) do nothing;

-- Pre-auth policies, matching the model described in supabase/README.md:
-- writes are open while athletes are identified only by an unguessable
-- client-generated id. Tighten these to `auth.uid()::text = (storage.foldername(name))[1]`
-- once mobile OTP login ships.
drop policy if exists "athlete photos are publicly readable" on storage.objects;
create policy "athlete photos are publicly readable"
  on storage.objects for select
  using (bucket_id = 'athlete-photos');

drop policy if exists "anyone can upload an athlete photo (pre-auth)" on storage.objects;
create policy "anyone can upload an athlete photo (pre-auth)"
  on storage.objects for insert
  with check (bucket_id = 'athlete-photos');

drop policy if exists "anyone can replace an athlete photo (pre-auth)" on storage.objects;
create policy "anyone can replace an athlete photo (pre-auth)"
  on storage.objects for update
  using (bucket_id = 'athlete-photos');
