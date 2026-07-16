create extension if not exists pgcrypto;

create table if not exists public.club_admin_entries (
  id uuid primary key default gen_random_uuid(),
  slug text not null unique,
  content_type text not null,
  status text not null default 'draft',
  title text not null,
  collection_key text,
  year integer,
  sort_order integer not null default 0,
  cover_image_url text,
  scheduled_for timestamptz,
  published_at timestamptz,
  deleted_at timestamptz,
  deleted_by_email text,
  payload jsonb not null default '{}'::jsonb,
  created_at timestamptz not null default now(),
  updated_at timestamptz not null default now()
);

alter table public.club_admin_entries
  add column if not exists scheduled_for timestamptz,
  add column if not exists published_at timestamptz,
  add column if not exists deleted_at timestamptz,
  add column if not exists deleted_by_email text,
  add column if not exists payload jsonb not null default '{}'::jsonb,
  add column if not exists updated_at timestamptz not null default now();

do $$
begin
  if exists (
    select 1
    from pg_constraint
    where conname = 'club_admin_entries_content_type_check'
      and conrelid = 'public.club_admin_entries'::regclass
  ) then
    alter table public.club_admin_entries drop constraint club_admin_entries_content_type_check;
  end if;

  alter table public.club_admin_entries
    add constraint club_admin_entries_content_type_check
    check (content_type in ('gallery', 'itinerary', 'event'));
exception
  when duplicate_object then null;
end $$;

do $$
begin
  if exists (
    select 1
    from pg_constraint
    where conname = 'club_admin_entries_status_check'
      and conrelid = 'public.club_admin_entries'::regclass
  ) then
    alter table public.club_admin_entries drop constraint club_admin_entries_status_check;
  end if;

  alter table public.club_admin_entries
    add constraint club_admin_entries_status_check
    check (status in ('draft', 'published', 'scheduled', 'archived'));
exception
  when duplicate_object then null;
end $$;

create table if not exists public.club_admin_user_roles (
  user_id uuid primary key references auth.users (id) on delete cascade,
  role text not null check (role in ('admin', 'editor', 'viewer')),
  display_name text,
  created_at timestamptz not null default now(),
  updated_at timestamptz not null default now()
);

create table if not exists public.gallery_photo_feedback (
  id uuid primary key default gen_random_uuid(),
  photo_src text not null,
  author_name text not null default 'Anònim',
  rating integer not null check (rating between 1 and 5),
  comment text,
  created_at timestamptz not null default now()
);

create table if not exists public.club_page_views (
  id uuid primary key default gen_random_uuid(),
  pathname text not null,
  referrer text,
  locale text,
  page_title text,
  user_agent text,
  created_at timestamptz not null default now()
);

create index if not exists idx_club_admin_entries_content_status on public.club_admin_entries (content_type, status, sort_order);
create index if not exists idx_club_admin_entries_scheduled_for on public.club_admin_entries (scheduled_for);
create index if not exists idx_club_admin_entries_deleted_at on public.club_admin_entries (deleted_at);
create index if not exists idx_gallery_photo_feedback_photo_src on public.gallery_photo_feedback (photo_src, created_at desc);
create index if not exists idx_club_page_views_created_at on public.club_page_views (created_at desc);
create index if not exists idx_club_page_views_pathname on public.club_page_views (pathname);
create index if not exists idx_club_page_views_locale on public.club_page_views (locale);

create or replace function public.set_club_updated_at()
returns trigger
language plpgsql
as $$
begin
  new.updated_at = now();
  return new;
end;
$$;

create or replace function public.club_current_role()
returns text
language sql
stable
as $$
  select role
  from public.club_admin_user_roles
  where user_id = auth.uid()
  limit 1;
$$;

create or replace function public.club_has_role(required_role text)
returns boolean
language sql
stable
as $$
  select case required_role
    when 'viewer' then coalesce(public.club_current_role() in ('viewer', 'editor', 'admin'), false)
    when 'editor' then coalesce(public.club_current_role() in ('editor', 'admin'), false)
    when 'admin' then coalesce(public.club_current_role() = 'admin', false)
    else false
  end;
$$;

create or replace function public.club_roles_bootstrap_open()
returns boolean
language sql
stable
as $$
  select not exists (select 1 from public.club_admin_user_roles);
$$;

drop trigger if exists set_club_admin_entries_updated_at on public.club_admin_entries;
create trigger set_club_admin_entries_updated_at
before update on public.club_admin_entries
for each row
execute function public.set_club_updated_at();

drop trigger if exists set_club_admin_user_roles_updated_at on public.club_admin_user_roles;
create trigger set_club_admin_user_roles_updated_at
before update on public.club_admin_user_roles
for each row
execute function public.set_club_updated_at();

alter table public.club_admin_entries enable row level security;
alter table public.club_admin_user_roles enable row level security;
alter table public.gallery_photo_feedback enable row level security;
alter table public.club_page_views enable row level security;

drop policy if exists "club cms published rows are public" on public.club_admin_entries;
create policy "club cms published rows are public"
on public.club_admin_entries
for select
using (
  deleted_at is null
  and (
    status = 'published'
    or (status = 'scheduled' and scheduled_for is not null and scheduled_for <= now())
  )
);

drop policy if exists "club cms privileged read all" on public.club_admin_entries;
create policy "club cms privileged read all"
on public.club_admin_entries
for select
to authenticated
using (public.club_roles_bootstrap_open() or public.club_has_role('viewer'));

drop policy if exists "club cms editors insert" on public.club_admin_entries;
create policy "club cms editors insert"
on public.club_admin_entries
for insert
to authenticated
with check (public.club_roles_bootstrap_open() or public.club_has_role('editor'));

drop policy if exists "club cms editors update" on public.club_admin_entries;
create policy "club cms editors update"
on public.club_admin_entries
for update
to authenticated
using (public.club_roles_bootstrap_open() or public.club_has_role('editor'))
with check (public.club_roles_bootstrap_open() or public.club_has_role('editor'));

drop policy if exists "club cms admins delete" on public.club_admin_entries;
create policy "club cms admins delete"
on public.club_admin_entries
for delete
to authenticated
using (public.club_roles_bootstrap_open() or public.club_has_role('admin'));

drop policy if exists "club roles self or admin read" on public.club_admin_user_roles;
create policy "club roles self or admin read"
on public.club_admin_user_roles
for select
to authenticated
using (user_id = auth.uid() or public.club_roles_bootstrap_open() or public.club_has_role('admin'));

drop policy if exists "club roles admin manage" on public.club_admin_user_roles;
create policy "club roles admin manage"
on public.club_admin_user_roles
for all
to authenticated
using (public.club_roles_bootstrap_open() or public.club_has_role('admin'))
with check (public.club_roles_bootstrap_open() or public.club_has_role('admin'));

drop policy if exists "gallery feedback public read" on public.gallery_photo_feedback;
create policy "gallery feedback public read"
on public.gallery_photo_feedback
for select
using (true);

drop policy if exists "gallery feedback public insert" on public.gallery_photo_feedback;
create policy "gallery feedback public insert"
on public.gallery_photo_feedback
for insert
to anon, authenticated
with check (
  length(trim(photo_src)) > 0
  and length(trim(author_name)) > 0
  and rating between 1 and 5
);

drop policy if exists "club page views public insert" on public.club_page_views;
create policy "club page views public insert"
on public.club_page_views
for insert
to anon, authenticated
with check (
  length(trim(pathname)) > 0
  and length(trim(pathname)) <= 240
);

drop policy if exists "club page views authenticated read" on public.club_page_views;
create policy "club page views authenticated read"
on public.club_page_views
for select
to authenticated
using (public.club_roles_bootstrap_open() or public.club_has_role('viewer'));

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
with check (
  bucket_id = 'club-media'
  and (public.club_roles_bootstrap_open() or public.club_has_role('editor'))
);

drop policy if exists "club media authenticated update" on storage.objects;
create policy "club media authenticated update"
on storage.objects
for update
to authenticated
using (
  bucket_id = 'club-media'
  and (public.club_roles_bootstrap_open() or public.club_has_role('editor'))
)
with check (
  bucket_id = 'club-media'
  and (public.club_roles_bootstrap_open() or public.club_has_role('editor'))
);

drop policy if exists "club media authenticated delete" on storage.objects;
create policy "club media authenticated delete"
on storage.objects
for delete
to authenticated
using (
  bucket_id = 'club-media'
  and (public.club_roles_bootstrap_open() or public.club_has_role('admin'))
);
