import { getSupabaseServerClient } from "@/lib/supabase";
import { NextRequest, NextResponse } from "next/server";

export async function POST(req: NextRequest) {
  try {
    const formData = await req.formData();
    const file = formData.get("audio") as File;
    const token = formData.get("token") as string;

    if (!file || !token) {
      return NextResponse.json({ error: "Missing audio or token" }, { status: 400 });
    }

    const supabase = getSupabaseServerClient();

    const { error: uploadError } = await supabase.storage
      .from("voice-messages")
      .upload(`${token}.webm`, file, { contentType: file.type, upsert: true });

    if (uploadError) {
      return NextResponse.json({ error: uploadError.message }, { status: 500 });
    }

    const { data: urlData } = supabase.storage
      .from("voice-messages")
      .getPublicUrl(`${token}.webm`);

    const { error: dbError } = await supabase
      .from("voice_messages")
      .upsert({ token, audio_url: urlData.publicUrl });

    if (dbError) {
      return NextResponse.json({ error: dbError.message }, { status: 500 });
    }

    return NextResponse.json({ url: urlData.publicUrl });
  } catch {
    return NextResponse.json({ error: "Server error" }, { status: 500 });
  }
}