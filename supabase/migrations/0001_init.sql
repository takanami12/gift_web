-- GiftCraft Supabase schema scaffold
-- Apply via Supabase dashboard SQL editor or `supabase db push`.

create extension if not exists pgcrypto;

-- profiles: maps Supabase auth user to display info (optional; extend as needed)
create table if not exists public.profiles (
  user_id uuid primary key references auth.users (id) on delete cascade,
  display_name text,
  created_at timestamptz not null default now()
);

-- designs: a saved GiftCraft design
create table if not exists public.designs (
  id uuid primary key default gen_random_uuid(),
  owner_id uuid references auth.users (id) on delete set null,
  box_id text not null default 'free-form',
  name text not null,
  preview_data_url text,
  base_price integer not null default 350000,
  items_snapshot jsonb not null,
  created_at timestamptz not null default now(),
  updated_at timestamptz not null default now()
);

create index if not exists designs_owner_id_idx on public.designs (owner_id);

-- design_frames: ordered timeline used for QR replay
create table if not exists public.design_frames (
  id bigserial primary key,
  design_id uuid not null references public.designs (id) on delete cascade,
  ts bigint not null,
  items jsonb not null
);

create index if not exists design_frames_design_id_idx on public.design_frames (design_id, id);

-- ── RLS ────────────────────────────────────────────────
alter table public.profiles enable row level security;
alter table public.designs enable row level security;
alter table public.design_frames enable row level security;

-- profiles: user can read/update their own profile
create policy "profiles_self_read" on public.profiles
  for select using (auth.uid() = user_id);
create policy "profiles_self_write" on public.profiles
  for insert with check (auth.uid() = user_id);
create policy "profiles_self_update" on public.profiles
  for update using (auth.uid() = user_id);

-- designs: owners can CRUD their own; anonymous can read by id (QR uses signed token + service role)
create policy "designs_owner_all" on public.designs
  for all using (auth.uid() = owner_id) with check (auth.uid() = owner_id);

-- design_frames: same scope as parent design
create policy "design_frames_owner_all" on public.design_frames
  for all using (
    exists (select 1 from public.designs d where d.id = design_id and d.owner_id = auth.uid())
  ) with check (
    exists (select 1 from public.designs d where d.id = design_id and d.owner_id = auth.uid())
  );

-- ── Notes ──────────────────────────────────────────────
-- 1. The QR replay endpoint should run with the Supabase service-role key
--    (server-only) and verify the HMAC token before returning rows. RLS on
--    public.designs blocks anonymous reads — service role bypasses RLS.
-- 2. base_price stored as integer (VND smallest unit ─ no fractional currency).
-- 3. items_snapshot keeps the latest layout; design_frames is the append-only
--    history used for the replay timeline.
