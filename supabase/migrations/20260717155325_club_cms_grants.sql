grant usage on schema public to anon, authenticated;

grant select on public.club_admin_entries to anon;
grant select, insert, update, delete on public.club_admin_entries to authenticated;

grant select on public.club_admin_user_roles to authenticated;
grant insert, update, delete on public.club_admin_user_roles to authenticated;

grant select on public.gallery_photo_feedback to anon, authenticated;
grant insert on public.gallery_photo_feedback to anon, authenticated;

grant insert on public.club_page_views to anon, authenticated;
grant select on public.club_page_views to authenticated;
