-- Voice messages for QR replay.
-- /api/voice uploads the recorded audio to the `voice-messages` storage bucket
-- (service-role key) and stores the public URL keyed by a client-generated token.
-- The QR points at /voice/<token>, which reads this table to play the audio back.

-- Public storage bucket so scanned QR links resolve the audio without auth.
insert into storage.buckets (id, name, public)
values ('voice-messages', 'voice-messages', true)
on conflict (id) do nothing;

create table if not exists public.voice_messages (
  token text primary key,
  audio_url text not null,
  created_at timestamptz not null default now()
);

alter table public.voice_messages enable row level security;
-- No policies on purpose: only the service-role key (server-only) writes/reads rows.
-- The service role bypasses RLS; anon/authenticated clients are denied direct access.
-- (The audio itself is served from the public bucket via its public URL.)
