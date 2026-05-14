import "server-only";
import { createHmac, timingSafeEqual } from "node:crypto";
import type { QrPayload } from "@/types/design";

const DEMO_SECRET = "giftcraft-demo-secret-DO-NOT-USE-IN-PRODUCTION";
let warnedFallback = false;

function getSecret(): string {
  const env = process.env.GIFTCRAFT_QR_SECRET;
  if (env && env.length > 0) return env;
  if (!warnedFallback) {
    console.warn(
      "[GiftCraft] GIFTCRAFT_QR_SECRET not set — using demo fallback secret. " +
        "Set the env var before deploying to production.",
    );
    warnedFallback = true;
  }
  return DEMO_SECRET;
}

function b64urlEncode(buf: Buffer): string {
  return buf.toString("base64").replace(/=+$/, "").replace(/\+/g, "-").replace(/\//g, "_");
}

function b64urlDecode(str: string): Buffer {
  const pad = str.length % 4 === 0 ? "" : "=".repeat(4 - (str.length % 4));
  return Buffer.from(str.replace(/-/g, "+").replace(/_/g, "/") + pad, "base64");
}

export function signQrToken(payload: QrPayload): string {
  const body = b64urlEncode(Buffer.from(JSON.stringify(payload), "utf8"));
  const sig = b64urlEncode(createHmac("sha256", getSecret()).update(body).digest());
  return `${body}.${sig}`;
}

export function verifyQrToken(token: string): QrPayload | null {
  const parts = token.split(".");
  if (parts.length !== 2) return null;
  const [body, sig] = parts as [string, string];
  const expected = b64urlEncode(createHmac("sha256", getSecret()).update(body).digest());
  const a = Buffer.from(sig);
  const b = Buffer.from(expected);
  if (a.length !== b.length || !timingSafeEqual(a, b)) return null;
  try {
    const payload = JSON.parse(b64urlDecode(body).toString("utf8")) as QrPayload;
    if (typeof payload.designId !== "string" || typeof payload.ts !== "number") {
      return null;
    }
    return payload;
  } catch {
    return null;
  }
}
