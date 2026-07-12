-- BOH Shift Ops — Supabase schema
-- Run this once in: Supabase Dashboard → SQL Editor → New query → Run

create table if not exists public.boh_app_state (
  id text primary key default 'default',
  label text default 'Vestavia BOH',
  data jsonb not null default '{}'::jsonb,
  updated_at timestamptz not null default now()
);

-- Single shared store row (you can add more later: 'default', 'training', etc.)
insert into public.boh_app_state (id, label, data)
values ('default', 'Vestavia BOH', '{}'::jsonb)
on conflict (id) do nothing;

alter table public.boh_app_state enable row level security;

-- Open policies for the free single-store app (anon key in browser).
-- Tighten later if you add real logins.
drop policy if exists "boh_anon_select" on public.boh_app_state;
drop policy if exists "boh_anon_insert" on public.boh_app_state;
drop policy if exists "boh_anon_update" on public.boh_app_state;

create policy "boh_anon_select" on public.boh_app_state
  for select to anon, authenticated using (true);

create policy "boh_anon_insert" on public.boh_app_state
  for insert to anon, authenticated with check (true);

create policy "boh_anon_update" on public.boh_app_state
  for update to anon, authenticated using (true) with check (true);

-- Optional: auto-touch updated_at
create or replace function public.boh_touch_updated_at()
returns trigger language plpgsql as $$
begin
  new.updated_at = now();
  return new;
end;
$$;

drop trigger if exists boh_app_state_touch on public.boh_app_state;
create trigger boh_app_state_touch
  before update on public.boh_app_state
  for each row execute function public.boh_touch_updated_at();
