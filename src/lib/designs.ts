import "server-only";
import type { DesignDraft } from "@/types/design";
import { signQrToken } from "./qr";

interface StoredDesign {
  draft: DesignDraft;
  savedAt: number;
}

// Demo storage: process-wide in-memory map shared across hot reloads via globalThis.
// Replace with Supabase persistence (designs + design_frames tables) for production.
const memoryStore: Map<string, StoredDesign> = (() => {
  const g = globalThis as unknown as {
    __giftcraftDesigns?: Map<string, StoredDesign>;
  };
  if (!g.__giftcraftDesigns) g.__giftcraftDesigns = new Map();
  return g.__giftcraftDesigns;
})();

export async function saveDesign(
  draft: DesignDraft,
): Promise<{ id: string; token: string }> {
  memoryStore.set(draft.id, { draft, savedAt: Date.now() });
  const token = signQrToken({ designId: draft.id, ts: draft.createdAt });
  return { id: draft.id, token };
}

export async function getDesignById(id: string): Promise<DesignDraft | null> {
  const stored = memoryStore.get(id);
  return stored ? stored.draft : null;
}

export async function listDemoDesignIds(): Promise<string[]> {
  return Array.from(memoryStore.keys());
}
