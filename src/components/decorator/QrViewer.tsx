"use client";

import { useEffect, useState } from "react";
import type { DesignDraft, DesignFrame } from "@/types/design";
import { PRODUCT_BY_ID } from "@/types/design";

interface QrViewerProps {
  design: Pick<DesignDraft, "id" | "frames" | "createdAt">;
}

export default function QrViewer({ design }: QrViewerProps) {
  const [frameIndex, setFrameIndex] = useState(0);
  const total = design.frames.length;
  const current: DesignFrame | undefined = design.frames[frameIndex];

  useEffect(() => {
    if (total <= 1) return;
    const id = setInterval(() => {
      setFrameIndex((i) => (i + 1) % total);
    }, 1500);
    return () => clearInterval(id);
  }, [total]);

  if (total === 0 || !current) {
    return <p className="text-sm text-stone-500">Thiết kế chưa có frame để replay.</p>;
  }

  return (
    <section aria-label="Replay thiết kế">
      <header className="flex items-center justify-between text-sm text-stone-600">
        <span>
          Frame {frameIndex + 1} / {total}
        </span>
        <time dateTime={new Date(current.ts).toISOString()}>
          {new Date(current.ts).toLocaleTimeString()}
        </time>
      </header>
      <ol className="mt-2 grid gap-1 text-xs text-stone-600">
        {current.items.map((it) => {
          const product = PRODUCT_BY_ID[it.productId];
          const label = product?.shortName ?? it.productId;
          return (
            <li key={it.id}>
              {label} @ ô ({it.gridX}, {it.gridY}) · xoay {it.rotation}°
            </li>
          );
        })}
      </ol>
    </section>
  );
}
