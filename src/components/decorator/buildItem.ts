import type { DecorationItem } from "@/types/design";

export function makeId(): string {
  return (
    globalThis.crypto?.randomUUID?.() ?? `it_${Date.now()}_${Math.random().toString(36).slice(2)}`
  );
}

export function buildDecorationItem(
  productId: string,
  gridX: number,
  gridY: number,
  rotation: 0 | 90 = 0,
): DecorationItem {
  return {
    id: makeId(),
    productId,
    gridX,
    gridY,
    rotation,
    z: Date.now(),
  };
}
