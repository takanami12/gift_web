import { type NextRequest, NextResponse } from "next/server";
import { getDesignById } from "@/lib/designs";
import { verifyQrToken } from "@/lib/qr";

export const runtime = "nodejs";

export async function GET(
  _req: NextRequest,
  ctx: { params: Promise<{ token: string }> },
) {
  const { token } = await ctx.params;
  const payload = verifyQrToken(token);
  if (!payload) {
    return NextResponse.json({ error: "Invalid or tampered token" }, { status: 400 });
  }
  const design = await getDesignById(payload.designId);
  if (!design) {
    return NextResponse.json({ error: "Design not found" }, { status: 404 });
  }
  return NextResponse.json({
    id: design.id,
    name: design.name,
    previewDataUrl: design.previewDataUrl,
    boxTemplate: design.boxTemplate,
    wrappingPattern: design.wrappingPattern,
    items: design.items,
    frames: design.frames,
    createdAt: design.createdAt,
    issuedAt: payload.ts,
  });
}
