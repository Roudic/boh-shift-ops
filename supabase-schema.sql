-- BOH Shift Ops — Supabase schema (simple, copy ALL, then Run once)
-- Supabase Dashboard → SQL Editor → New query → paste → Run

-- 1) Table
create table if not exists public.boh_app_state (
  id text primary key default 'default',
  label text default 'Vestavia BOH',
  data jsonb not null default '{}'::jsonb,
  updated_at timestamptz not null default now()
);

-- 2) Starter row
insert into public.boh_app_state (id, label, data)
values ('default', 'Vestavia BOH', '{}'::jsonb)
on conflict (id) do nothing;

-- 3) Let the website (anon key) read/write this table
grant usage on schema public to anon, authenticated;
grant select, insert, update on table public.boh_app_state to anon, authenticated;

alter table public.boh_app_state enable row level security;

drop policy if exists "boh_anon_select" on public.boh_app_state;
drop policy if exists "boh_anon_insert" on public.boh_app_state;
drop policy if exists "boh_anon_update" on public.boh_app_state;
drop policy if exists "boh_anon_all" on public.boh_app_state;

create policy "boh_anon_all" on public.boh_app_state
  for all
  to anon, authenticated
  using (true)
  with check (true);
