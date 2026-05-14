"use client";

import { useEffect, useState } from "react";
import { Group, Image as KonvaImage, Layer, Rect, Stage } from "react-konva";
import {
  type BoxColor,
  type BoxSize,
  type BoxType,
  type DecorationItem,
  type DesignFrame,
  effectiveFootprint,
  PRODUCT_BY_ID,
  type WrapColor,
} from "@/types/design";
import BoxTemplate, { computeBox } from "./BoxTemplate";
import { type ComputedBox, gridToPixel } from "./slots";
import { useImageAsset } from "./useImageAsset";

interface QrReplayCanvasProps {
  width: number;
  height: number;
  frames: DesignFrame[];
  boxType: BoxType;
  boxSize: BoxSize;
  boxColor: BoxColor;
  wrapColor?: WrapColor;
  intervalMs?: number;
}

function ReplayShape({ item, box }: { item: DecorationItem; box: ComputedBox }) {
  const product = PRODUCT_BY_ID[item.productId];
  const image = useImageAsset(product?.photo);
  if (!product) return null;
  const eff = effectiveFootprint(product, item.rotation);
  const effW = eff.cols * box.cellSize;
  const effH = eff.rows * box.cellSize;
  const origW = product.footprint.cols * box.cellSize;
  const origH = product.footprint.rows * box.cellSize;
  const { x, y } = gridToPixel(item.gridX, item.gridY, box);
  const padding = Math.max(4, box.cellSize * 0.08);
  return (
    <Group x={x} y={y} listening={false}>
      <Group x={effW / 2} y={effH / 2} rotation={item.rotation}>
        {image ? (
          <KonvaImage
            image={image}
            x={-origW / 2 + padding}
            y={-origH / 2 + padding}
            width={origW - padding * 2}
            height={origH - padding * 2}
            shadowColor="rgba(0, 0, 0, 0.3)"
            shadowBlur={6}
            shadowOpacity={0.5}
            shadowOffsetY={3}
            cornerRadius={5}
          />
        ) : (
          <Rect
            x={-origW / 2}
            y={-origH / 2}
            width={origW}
            height={origH}
            fill="#f5f5f4"
            cornerRadius={5}
          />
        )}
      </Group>
    </Group>
  );
}

export default function QrReplayCanvas({
  width,
  height,
  frames,
  boxType,
  boxSize,
  boxColor,
  wrapColor,
  intervalMs = 1500,
}: QrReplayCanvasProps) {
  const [idx, setIdx] = useState(0);
  const total = frames.length;

  useEffect(() => {
    if (total <= 1) return;
    const t = setInterval(() => setIdx((i) => (i + 1) % total), intervalMs);
    return () => clearInterval(t);
  }, [total, intervalMs]);

  if (total === 0) {
    return (
      <div className="flex h-[400px] w-full items-center justify-center rounded-xl border border-dashed border-stone-200 bg-white text-sm text-stone-400">
        Thiết kế này chưa có frame replay.
      </div>
    );
  }

  const current = frames[Math.min(idx, total - 1)];
  if (!current) return null;
  const box = computeBox(boxSize, width, height);

  return (
    <div className="space-y-2">
      <Stage
        width={width}
        height={height}
        className="rounded-xl border border-stone-200 bg-white shadow-sm"
      >
        <Layer>
          <Rect x={0} y={0} width={width} height={height} fill="#fafaf9" listening={false} />
          <BoxTemplate
            size={boxSize}
            color={boxColor}
            type={boxType}
            wrapColor={wrapColor}
            canvasWidth={width}
            canvasHeight={height}
          />
          {[...current.items]
            .sort((a, b) => a.z - b.z)
            .map((it) => (
              <ReplayShape key={it.id} item={it} box={box} />
            ))}
        </Layer>
      </Stage>
      <div className="flex items-center justify-between text-xs text-stone-500">
        <span>
          Frame {Math.min(idx, total - 1) + 1} / {total}
        </span>
        <time dateTime={new Date(current.ts).toISOString()}>
          {new Date(current.ts).toLocaleTimeString("vi-VN")}
        </time>
      </div>
    </div>
  );
}
