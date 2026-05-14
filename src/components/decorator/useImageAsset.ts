"use client";

import { useEffect, useState } from "react";

export function useImageAsset(src: string | undefined): HTMLImageElement | null {
  const [image, setImage] = useState<HTMLImageElement | null>(null);

  useEffect(() => {
    if (!src) return;
    const next = new window.Image();
    next.src = src;
    let cancelled = false;
    next.onload = () => {
      if (!cancelled) setImage(next);
    };
    next.onerror = () => {
      if (!cancelled) setImage(null);
    };
    return () => {
      cancelled = true;
    };
  }, [src]);

  return image;
}
