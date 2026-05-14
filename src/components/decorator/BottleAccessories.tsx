"use client";

import { Group, Image as KonvaImage } from "react-konva";
import {
  type DecorationItem,
  effectiveFootprint,
  PRODUCT_BY_ID,
} from "@/types/design";
import type { ComputedBox } from "./slots";
import { gridToPixel } from "./slots";
import { useImageAsset } from "./useImageAsset";

interface BottleAccessoriesProps {
  items: DecorationItem[];
  box: ComputedBox;
  flowerCount: number;
  ribbonCount: number;
}

export function isBottle(productId: string): boolean {
  const p = PRODUCT_BY_ID[productId];
  return !!p && p.category === "ruou-tra" && p.id.startsWith("ruou-");
}

export default function BottleAccessories({
  items,
  box,
  flowerCount,
  ribbonCount,
}: BottleAccessoriesProps) {
  const flowerImg = useImageAsset("/decorator/photos/accessories/flower.png");
  const ribbonImg = useImageAsset("/decorator/photos/accessories/ribbon.png");

  const bottles = items
    .filter((it) => isBottle(it.productId))
    .sort((a, b) => a.z - b.z);

  return (
    <Group listening={false}>
      {bottles.map((item, idx) => {
        const accessory =
          idx < flowerCount
            ? "flower"
            : idx < flowerCount + ribbonCount
              ? "ribbon"
              : null;
        if (!accessory) return null;
        const img = accessory === "flower" ? flowerImg : ribbonImg;
        if (!img) return null;
        const product = PRODUCT_BY_ID[item.productId];
        if (!product) return null;
        const eff = effectiveFootprint(product, item.rotation);
        const { x: px, y: py } = gridToPixel(item.gridX, item.gridY, box);
        const effW = eff.cols * box.cellSize;
        const effH = eff.rows * box.cellSize;
        const bottleShortAxis =
          item.rotation === 90 ? effH : effW;
        const drawW = bottleShortAxis;
        const drawH = drawW * (img.height / img.width);
        const neckOffset = box.cellSize * 2.5;
        const neckX =
          item.rotation === 90 ? px + effW - neckOffset : px + effW / 2;
        const neckY =
          item.rotation === 90 ? py + effH / 2 : py + neckOffset;
        return (
          <KonvaImage
            key={item.id}
            image={img}
            x={neckX}
            y={neckY}
            width={drawW}
            height={drawH}
            offsetX={drawW / 2}
            offsetY={drawH / 2}
            rotation={item.rotation}
            shadowColor="rgba(0,0,0,0.35)"
            shadowBlur={6}
            shadowOpacity={0.5}
            shadowOffsetY={2}
          />
        );
      })}
    </Group>
  );
}
