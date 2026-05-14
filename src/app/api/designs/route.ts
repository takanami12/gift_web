import { type NextRequest, NextResponse } from "next/server";
import { saveDesign } from "@/lib/designs";
import type { DesignDraft } from "@/types/design";

export const runtime = "nodejs";

function isDesignDraft(value: unknown): value is DesignDraft {
  if (!value || typeof value !== "object") return false;
  const v = value as Record<string, unknown>;
  return (
    typeof v.id === "string" &&
    typeof v.name === "string" &&
    typeof v.previewDataUrl === "string" &&
    Array.isArray(v.items) &&
    Array.isArray(v.frames) &&
    typeof v.basePrice === "number" &&
    typeof v.createdAt === "number"
  );
}

export async function POST(req: NextRequest) {
  let body: unknown;
  try {
    body = await req.json();
  } catch {
    return NextResponse.json({ error: "Invalid JSON" }, { status: 400 });
  }
  if (!isDesignDraft(body)) {
    return NextResponse.json({ error: "Invalid design payload" }, { status: 400 });
  }
  const { id, token } = await saveDesign(body);
  return NextResponse.json({ id, token, qrUrl: `/qr/${token}` });
}
