import { getSupabaseServerClient } from "@/lib/supabase";

export default async function QrPage({
  params,
}: {
  params: Promise<{ token: string }>;
}) {
  const { token } = await params;
  const supabase = getSupabaseServerClient();

  const { data } = await supabase
    .from("voice_messages")
    .select("audio_url")
    .eq("token", token)
    .single();

  if (!data) {
    return (
      <main className="flex min-h-screen items-center justify-center bg-[#faf8f3]">
        <p className="text-stone-500">Không tìm thấy lời chúc này.</p>
      </main>
    );
  }

  return (
    <main className="flex min-h-screen flex-col items-center justify-center gap-6 bg-[#faf8f3] px-4">
      <p className="text-[11px] font-semibold uppercase tracking-[0.35em] text-[#B1997E]">
        Gift Glamorous
      </p>
      <h1 className="font-headline text-3xl text-[#433B30]">Lời chúc dành cho bạn</h1>
      <audio controls src={data.audio_url} className="w-full max-w-sm" />
      <p className="text-sm text-stone-500">Quét mã QR này để nghe lại bất cứ lúc nào.</p>
    </main>
  );
}