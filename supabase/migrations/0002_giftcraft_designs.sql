-- GiftCraft design persistence for QR replay.
-- Stores the full DesignDraft as a single JSONB blob keyed by client-generated id.
-- Server (service-role key) reads/writes after HMAC token verification; RLS is on
-- with no policies, so anonymous clients cannot read designs directly.

create table if not exists public.giftcraft_designs (
  id text primary key,
  draft jsonb not null,
  created_at timestamptz not null default now()
);

alter table public.giftcraft_designs enable row level security;
-- No policies on purpose: only the service-role key (server-only) may access rows.
-- The service role bypasses RLS; anon/authenticated clients are denied.
