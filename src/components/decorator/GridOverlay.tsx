"use client";

import { Group, Line, Rect } from "react-konva";
import type { ComputedBox } from "./slots";

interface GridOverlayProps {
  box: ComputedBox;
  visible: boolean;
  strokeHex?: string;
}

export default function GridOverlay({
  box,
  visible,
  strokeHex = "#1c0f04",
}: GridOverlayProps) {
  if (!visible) return null;

  const { x, y, width, height, cellSize, cols, rows } = box;
  const verticals: Array<{ key: string; points: number[] }> = [];
  for (let c = 1; c < cols; c += 1) {
    const cx = x + cellSize * c;
    verticals.push({ key: `v-${c}`, points: [cx, y, cx, y + height] });
  }
  const horizontals: Array<{ key: string; points: number[] }> = [];
  for (let r = 1; r < rows; r += 1) {
    const ry = y + cellSize * r;
    horizontals.push({ key: `h-${r}`, points: [x, ry, x + width, ry] });
  }

  return (
    <Group listening={false} opacity={0.55}>
      <Rect
        x={x}
        y={y}
        width={width}
        height={height}
        stroke={strokeHex}
        strokeWidth={1.4}
        dash={[6, 4]}
      />
      {verticals.map((v) => (
        <Line key={v.key} points={v.points} stroke={strokeHex} strokeWidth={1} dash={[4, 4]} />
      ))}
      {horizontals.map((h) => (
        <Line key={h.key} points={h.points} stroke={strokeHex} strokeWidth={1} dash={[4, 4]} />
      ))}
    </Group>
  );
}
