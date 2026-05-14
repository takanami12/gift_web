import type { BoxColor, BoxSize, WrapColor } from "@/types/design";

export interface InnerRatio {
  x0: number;
  y0: number;
  x1: number;
  y1: number;
}

export const INSIDE_INNER_RATIO: Record<BoxSize, InnerRatio> = {
  small: { x0: 0.06, y0: 0.11, x1: 0.932, y1: 0.947 },
  medium: { x0: 0.085, y0: 0.115, x1: 0.922, y1: 0.932 },
  large: { x0: 0.079, y0: 0.098, x1: 0.928, y1: 0.93 },
};

export const WRAP_INNER_RATIO: InnerRatio = {
  x0: 0,
  y0: 0,
  x1: 1,
  y1: 1,
};

export const INSIDE_SOURCE_W = 1366;
export const INSIDE_SOURCE_H = 768;

export function boxImageSrc(size: BoxSize, color: BoxColor): string {
  return `/decorator/inside/box-${size}-${color}.png`;
}

export function wrapImageSrc(wrap: NonNullable<WrapColor>): string {
  return `/decorator/inside/wrap-${wrap}.png`;
}

export interface ImagePlacement {
  x: number;
  y: number;
  width: number;
  height: number;
}

export function placeForInnerBorder(
  innerBoxX: number,
  innerBoxY: number,
  innerBoxW: number,
  innerBoxH: number,
  ratio: InnerRatio,
): ImagePlacement {
  const innerSpanX = ratio.x1 - ratio.x0;
  const innerSpanY = ratio.y1 - ratio.y0;
  const fullW = innerBoxW / innerSpanX;
  const fullH = innerBoxH / innerSpanY;
  const x = innerBoxX - ratio.x0 * fullW;
  const y = innerBoxY - ratio.y0 * fullH;
  return { x, y, width: fullW, height: fullH };
}
