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
        const bottleW = eff.cols * box.cellSize;
        const drawW = bottleW;
        const drawH = drawW * (img.height / img.width);
        const centerX = px + bottleW / 2;
        const neckCenterY = py + box.cellSize * 2.5;
        return (
          <KonvaImage
            key={item.id}
            image={img}
            x={centerX - drawW / 2}
            y={neckCenterY - drawH / 2}
            width={drawW}
            height={drawH}
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
