-- LIMBO Consulting client portal schema
-- Run this once in your Supabase project's SQL Editor (Dashboard -> SQL Editor -> New query).
-- Safe to re-run: guards with "if not exists" / "or replace" where possible.

create extension if not exists "uuid-ossp";

-- One row per authenticated user (client or admin), extends auth.users
create table if not exists public.profiles (
  id uuid primary key references auth.users (id) on delete cascade,
  email text not null,
  full_name text,
  company text,
  is_admin boolean not null default false,
  created_at timestamptz not null default now()
);

-- One room per client, where messages and delivered files live
create table if not exists public.rooms (
  id uuid primary key default uuid_generate_v4(),
  client_id uuid not null references public.profiles (id) on delete cascade,
  name text not null default 'Project Room',
  created_at timestamptz not null default now()
);

create table if not exists public.messages (
  id uuid primary key default uuid_generate_v4(),
  room_id uuid not null references public.rooms (id) on delete cascade,
  sender_id uuid not null references public.profiles (id),
  body text not null,
  created_at timestamptz not null default now()
);

-- File metadata; the actual bytes live in the "deliverables" storage bucket
-- under the path {room_id}/{filename}.
create table if not exists public.files (
  id uuid primary key default uuid_generate_v4(),
  room_id uuid not null references public.rooms (id) on delete cascade,
  storage_path text not null,
  file_name text not null,
  size_bytes bigint,
  uploaded_by uuid not null references public.profiles (id),
  created_at timestamptz not null default now()
);

alter table public.profiles enable row level security;
alter table public.rooms enable row level security;
alter table public.messages enable row level security;
alter table public.files enable row level security;

create or replace function public.is_admin()
returns boolean
language sql
security definer
stable
as $$
  select coalesce((select is_admin from public.profiles where id = auth.uid()), false);
$$;

drop policy if exists "profiles_select_own_or_admin" on public.profiles;
create policy "profiles_select_own_or_admin" on public.profiles
  for select using (id = auth.uid() or public.is_admin());

drop policy if exists "profiles_update_own" on public.profiles;
create policy "profiles_update_own" on public.profiles
  for update using (id = auth.uid());

drop policy if exists "rooms_select_own_or_admin" on public.rooms;
create policy "rooms_select_own_or_admin" on public.rooms
  for select using (client_id = auth.uid() or public.is_admin());

drop policy if exists "rooms_insert_admin_only" on public.rooms;
create policy "rooms_insert_admin_only" on public.rooms
  for insert with check (public.is_admin());

drop policy if exists "messages_select_participants" on public.messages;
create policy "messages_select_participants" on public.messages
  for select using (
    exists (
      select 1 from public.rooms r
      where r.id = room_id and (r.client_id = auth.uid() or public.is_admin())
    )
  );

drop policy if exists "messages_insert_participants" on public.messages;
create policy "messages_insert_participants" on public.messages
  for insert with check (
    sender_id = auth.uid()
    and exists (
      select 1 from public.rooms r
      where r.id = room_id and (r.client_id = auth.uid() or public.is_admin())
    )
  );

drop policy if exists "files_select_participants" on public.files;
create policy "files_select_participants" on public.files
  for select using (
    exists (
      select 1 from public.rooms r
      where r.id = room_id and (r.client_id = auth.uid() or public.is_admin())
    )
  );

drop policy if exists "files_insert_participants" on public.files;
create policy "files_insert_participants" on public.files
  for insert with check (
    uploaded_by = auth.uid()
    and exists (
      select 1 from public.rooms r
      where r.id = room_id and (r.client_id = auth.uid() or public.is_admin())
    )
  );

-- Auto-provision a profile + room whenever a new auth user is created.
-- Pass full_name / company via signUp's options.data so they land here.
create or replace function public.handle_new_user()
returns trigger
language plpgsql
security definer
as $$
begin
  insert into public.profiles (id, email, full_name, company)
  values (
    new.id,
    new.email,
    new.raw_user_meta_data ->> 'full_name',
    new.raw_user_meta_data ->> 'company'
  );

  insert into public.rooms (client_id, name)
  values (new.id, 'Project Room');

  return new;
end;
$$;

drop trigger if exists on_auth_user_created on auth.users;
create trigger on_auth_user_created
  after insert on auth.users
  for each row execute procedure public.handle_new_user();

-- Storage bucket for delivered project files (private; access enforced by policy below).
insert into storage.buckets (id, name, public)
values ('deliverables', 'deliverables', false)
on conflict (id) do nothing;

drop policy if exists "deliverables_select_participants" on storage.objects;
create policy "deliverables_select_participants" on storage.objects
  for select using (
    bucket_id = 'deliverables'
    and exists (
      select 1 from public.rooms r
      where storage.objects.name like (r.id::text || '/%')
        and (r.client_id = auth.uid() or public.is_admin())
    )
  );

drop policy if exists "deliverables_insert_participants" on storage.objects;
create policy "deliverables_insert_participants" on storage.objects
  for insert with check (
    bucket_id = 'deliverables'
    and exists (
      select 1 from public.rooms r
      where storage.objects.name like (r.id::text || '/%')
        and (r.client_id = auth.uid() or public.is_admin())
    )
  );

-- After running this once, make your own account an admin:
--   update public.profiles set is_admin = true where email = 'you@example.com';
