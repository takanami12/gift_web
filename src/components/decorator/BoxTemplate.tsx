"use client";

import { Group, Image as KonvaImage, Line, Rect } from "react-konva";
import {
  type BoxColor,
  type BoxSize,
  type BoxType,
  getBoxColorOption,
  type WrapColor,
  WRAP_COLOR_OPTIONS,
  type WrapColorOption,
} from "@/types/design";
import { placeForInnerBorder, WRAP_INNER_RATIO, wrapImageSrc } from "./insideBox";
import { computeBox, type ComputedBox } from "./slots";
import { useImageAsset } from "./useImageAsset";

interface BoxTemplateProps {
  size: BoxSize;
  color: BoxColor;
  type: BoxType;
  wrapColor?: WrapColor;
  canvasWidth: number;
  canvasHeight: number;
}

const WALL = 18;
const SHADOW_OFFSET = 22;

function StrawLayer({ box, wrap }: { box: ComputedBox; wrap: WrapColorOption }) {
  const wrapImg = useImageAsset(wrapImageSrc(wrap.id));
  const placement = placeForInnerBorder(box.x, box.y, box.width, box.height, WRAP_INNER_RATIO);
  const scale = 1.1;
  const w = placement.width * scale;
  const h = placement.height * scale;
  const cx = placement.x + placement.width / 2;
  const cy = placement.y + placement.height / 2;
  if (!wrapImg) {
    return (
      <Rect
        x={box.x}
        y={box.y}
        width={box.width}
        height={box.height}
        fill={wrap.bedHex}
        opacity={0.92}
        listening={false}
      />
    );
  }
  return (
    <Group listening={false}>
      <KonvaImage
        image={wrapImg}
        x={cx - w / 2}
        y={cy - h / 2}
        width={w}
        height={h}
      />
    </Group>
  );
}

function GridFloor({
  box,
  outerHex,
  innerHex,
  gridLineHex,
  showHandle,
  wrap,
}: {
  box: ComputedBox;
  outerHex: string;
  innerHex: string;
  gridLineHex: string;
  showHandle: boolean;
  wrap: WrapColorOption | null;
}) {
  const { x, y, width, height, cellSize, cols, rows } = box;

  const outerX = x - WALL;
  const outerY = y - WALL;
  const outerW = width + WALL * 2;
  const outerH = height + WALL * 2;

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
    <Group listening={false}>
      <Rect
        x={outerX + 6}
        y={outerY + SHADOW_OFFSET}
        width={outerW}
        height={outerH}
        cornerRadius={14}
        fill="rgba(40, 24, 12, 0.32)"
      />
      <Rect
        x={outerX}
        y={outerY}
        width={outerW}
        height={outerH}
        cornerRadius={12}
        fill={outerHex}
        stroke="#1c0f04"
        strokeWidth={2}
        shadowColor="rgba(40, 24, 12, 0.55)"
        shadowBlur={20}
        shadowOffsetY={8}
      />
      <Rect
        x={outerX + 6}
        y={outerY + 6}
        width={outerW - 12}
        height={outerH - 12}
        cornerRadius={10}
        stroke="rgba(255, 255, 255, 0.32)"
        strokeWidth={1.4}
        opacity={0.85}
      />
      <Rect
        x={x - 4}
        y={y - 4}
        width={width + 8}
        height={height + 8}
        cornerRadius={8}
        fill="#1c0f04"
        opacity={0.55}
      />
      <Rect
        x={x}
        y={y}
        width={width}
        height={height}
        fill={innerHex}
        stroke={gridLineHex}
        strokeWidth={1.5}
        shadowColor="rgba(60, 30, 10, 0.6)"
        shadowBlur={14}
        shadowOffsetY={5}
        shadowOpacity={0.85}
      />
      {verticals.map((v) => (
        <Line
          key={v.key}
          points={v.points}
          stroke={gridLineHex}
          strokeWidth={1.2}
          opacity={wrap ? 0.25 : 0.55}
        />
      ))}
      {horizontals.map((h) => (
        <Line
          key={h.key}
          points={h.points}
          stroke={gridLineHex}
          strokeWidth={1.2}
          opacity={wrap ? 0.25 : 0.55}
        />
      ))}
      {wrap && <StrawLayer box={box} wrap={wrap} />}
      {showHandle && (
        <Group listening={false}>
          <Rect
            x={outerX + outerW / 2 - 36}
            y={outerY - 22}
            width={72}
            height={24}
            cornerRadius={[12, 12, 0, 0]}
            fill={outerHex}
            stroke="#1c0f04"
            strokeWidth={1.5}
          />
          <Rect
            x={outerX + outerW / 2 - 28}
            y={outerY - 14}
            width={56}
            height={10}
            cornerRadius={5}
            fill="rgba(0, 0, 0, 0.55)"
          />
        </Group>
      )}
    </Group>
  );
}

export default function BoxTemplate({
  size,
  color,
  type,
  wrapColor,
  canvasWidth,
  canvasHeight,
}: BoxTemplateProps) {
  const colorOpt = getBoxColorOption(color);
  const box = computeBox(size, canvasWidth, canvasHeight);
  const wrapOpt = wrapColor
    ? WRAP_COLOR_OPTIONS.find((w) => w.id === wrapColor) ?? null
    : null;
  return (
    <GridFloor
      box={box}
      outerHex={colorOpt.outerHex}
      innerHex={colorOpt.innerHex}
      gridLineHex={colorOpt.gridLineHex}
      showHandle={type === "premium"}
      wrap={wrapOpt}
    />
  );
}

export { computeBox };
