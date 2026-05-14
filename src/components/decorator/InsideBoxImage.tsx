"use client";

import { Group, Image as KonvaImage, Rect } from "react-konva";
import type { BoxColor, BoxSize, WrapColor } from "@/types/design";
import {
  boxImageSrc,
  INSIDE_INNER_RATIO,
  placeForInnerBorder,
  wrapImageSrc,
  WRAP_INNER_RATIO,
} from "./insideBox";
import type { ComputedBox } from "./slots";
import { useImageAsset } from "./useImageAsset";

interface InsideBoxImageProps {
  box: ComputedBox;
  size: BoxSize;
  color: BoxColor;
  wrap: WrapColor;
}

export default function InsideBoxImage({ box, size, color, wrap }: InsideBoxImageProps) {
  const boxImg = useImageAsset(boxImageSrc(size, color));
  const wrapImg = useImageAsset(wrap ? wrapImageSrc(wrap) : undefined);

  const boxPlacement = placeForInnerBorder(
    box.x,
    box.y,
    box.width,
    box.height,
    INSIDE_INNER_RATIO[size],
  );
  const wrapPlacement = placeForInnerBorder(
    box.x,
    box.y,
    box.width,
    box.height,
    WRAP_INNER_RATIO,
  );

  return (
    <Group listening={false}>
      {!boxImg && (
        <Rect
          x={box.x - 18}
          y={box.y - 18}
          width={box.width + 36}
          height={box.height + 36}
          cornerRadius={12}
          fill="#e7e5e4"
        />
      )}
      {boxImg && (
        <KonvaImage
          image={boxImg}
          x={boxPlacement.x}
          y={boxPlacement.y}
          width={boxPlacement.width}
          height={boxPlacement.height}
        />
      )}
      {wrap && wrapImg && (() => {
        const scale = 1.1;
        const w = wrapPlacement.width * scale;
        const h = wrapPlacement.height * scale;
        const cx = wrapPlacement.x + wrapPlacement.width / 2;
        const cy = wrapPlacement.y + wrapPlacement.height / 2;
        return (
          <KonvaImage
            image={wrapImg}
            x={cx - w / 2}
            y={cy - h / 2}
            width={w}
            height={h}
          />
        );
      })()}
    </Group>
  );
}
