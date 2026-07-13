create extension if not exists pgcrypto;

create table if not exists public.club_admin_entries (
  id uuid primary key default gen_random_uuid(),
  slug text not null unique,
  content_type text not null check (content_type in ('gallery', 'itinerary', 'event')),
  status text not null default 'draft' check (status in ('draft', 'published')),
  title text not null,
  collection_key text,
  year integer,
  sort_order integer not null default 0,
  cover_image_url text,
  payload jsonb not null default '{}'::jsonb,
  created_at timestamptz not null default now(),
  updated_at timestamptz not null default now()
);

create or replace function public.set_club_admin_entries_updated_at()
returns trigger
language plpgsql
as $$
begin
  new.updated_at = now();
  return new;
end;
$$;

drop trigger if exists set_club_admin_entries_updated_at on public.club_admin_entries;
create trigger set_club_admin_entries_updated_at
before update on public.club_admin_entries
for each row
execute function public.set_club_admin_entries_updated_at();

alter table public.club_admin_entries enable row level security;

drop policy if exists "club cms published rows are public" on public.club_admin_entries;
create policy "club cms published rows are public"
on public.club_admin_entries
for select
using (status = 'published');

drop policy if exists "club cms authenticated users can read all" on public.club_admin_entries;
create policy "club cms authenticated users can read all"
on public.club_admin_entries
for select
to authenticated
using (true);

drop policy if exists "club cms authenticated users can insert" on public.club_admin_entries;
create policy "club cms authenticated users can insert"
on public.club_admin_entries
for insert
to authenticated
with check (true);

drop policy if exists "club cms authenticated users can update" on public.club_admin_entries;
create policy "club cms authenticated users can update"
on public.club_admin_entries
for update
to authenticated
using (true)
with check (true);

drop policy if exists "club cms authenticated users can delete" on public.club_admin_entries;
create policy "club cms authenticated users can delete"
on public.club_admin_entries
for delete
to authenticated
using (true);

insert into storage.buckets (id, name, public)
values ('club-media', 'club-media', true)
on conflict (id) do update set public = excluded.public;

drop policy if exists "club media public read" on storage.objects;
create policy "club media public read"
on storage.objects
for select
using (bucket_id = 'club-media');

drop policy if exists "club media authenticated upload" on storage.objects;
create policy "club media authenticated upload"
on storage.objects
for insert
to authenticated
with check (bucket_id = 'club-media');

drop policy if exists "club media authenticated update" on storage.objects;
create policy "club media authenticated update"
on storage.objects
for update
to authenticated
using (bucket_id = 'club-media')
with check (bucket_id = 'club-media');

drop policy if exists "club media authenticated delete" on storage.objects;
create policy "club media authenticated delete"
on storage.objects
for delete
to authenticated
using (bucket_id = 'club-media');
