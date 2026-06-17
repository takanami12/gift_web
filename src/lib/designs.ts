import "server-only";
import type { DesignDraft } from "@/types/design";
import { getSupabaseServerClient } from "./supabase";
import { signQrToken } from "./qr";

// Persisted in Supabase so saved designs survive across serverless invocations
// (in-memory storage is lost between lambda cold starts, breaking QR replay).
// The whole DesignDraft is stored as a single JSONB column to match the type
// exactly without a brittle column-per-field schema.
const TABLE = "giftcraft_designs";

export async function saveDesign(
  draft: DesignDraft,
): Promise<{ id: string; token: string }> {
  const supabase = getSupabaseServerClient();
  const { error } = await supabase
    .from(TABLE)
    .upsert({ id: draft.id, draft }, { onConflict: "id" });
  if (error) {
    throw new Error(`Failed to save design: ${error.message}`);
  }
  const token = signQrToken({ designId: draft.id, ts: draft.createdAt });
  return { id: draft.id, token };
}

export async function getDesignById(id: string): Promise<DesignDraft | null> {
  const supabase = getSupabaseServerClient();
  const { data, error } = await supabase
    .from(TABLE)
    .select("draft")
    .eq("id", id)
    .maybeSingle();
  if (error || !data) return null;
  return data.draft as DesignDraft;
}

export async function listDemoDesignIds(): Promise<string[]> {
  const supabase = getSupabaseServerClient();
  const { data, error } = await supabase.from(TABLE).select("id").limit(50);
  if (error || !data) return [];
  return data.map((r) => r.id as string);
}
