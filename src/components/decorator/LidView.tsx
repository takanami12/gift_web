"use client";

import type Konva from "konva";
import { Group, Image as KonvaImage } from "react-konva";
import {
  type BoxSize,
  getRibbonColorOption,
  type LidStyle,
  type RibbonColorOption,
  type RibbonState,
} from "@/types/design";
import { computeBox, type ComputedBox } from "./slots";
import { useImageAsset } from "./useImageAsset";

const LID_WALL = 22;
const LID_RADIUS = 14;

interface LidViewProps {
  size: BoxSize;
  lidStyle: LidStyle;
  lidImage: string | null;
  ribbon: RibbonState;
  canvasWidth: number;
  canvasHeight: number;
}

interface LidRect {
  x: number;
  y: number;
  width: number;
  height: number;
}

const LID_IMAGE_SRC: Record<Exclude<LidStyle, "image">, string> = {
  plain: "/decorator/lids/lid-plain.png",
  transparent: "/decorator/lids/lid-transparent.png",
  shrink: "/decorator/lids/lid-shrink.png",
};

function lidRectFrom(box: ComputedBox): LidRect {
  return {
    x: box.x - LID_WALL,
    y: box.y - LID_WALL,
    width: box.width + LID_WALL * 2,
    height: box.height + LID_WALL * 2,
  };
}

function LidBaseImage({ rect, src }: { rect: LidRect; src: string }) {
  const image = useImageAsset(src);
  if (!image) return null;
  return (
    <KonvaImage
      image={image}
      x={rect.x}
      y={rect.y}
      width={rect.width}
      height={rect.height}
      listening={false}
      shadowColor="rgba(40, 24, 12, 0.32)"
      shadowBlur={18}
      shadowOffsetY={8}
      shadowOpacity={0.5}
    />
  );
}

function LidImagePatch({ rect, dataUrl }: { rect: LidRect; dataUrl: string }) {
  const image = useImageAsset(dataUrl);
  if (!image) return null;
  const inset = 24;
  const x = rect.x + inset;
  const y = rect.y + inset;
  const width = rect.width - inset * 2;
  const height = rect.height - inset * 2;
  const radius = LID_RADIUS - 6;
  const clipFunc = (ctx: Konva.Context) => {
    const r = radius;
    ctx.beginPath();
    ctx.moveTo(x + r, y);
    ctx.arcTo(x + width, y, x + width, y + height, r);
    ctx.arcTo(x + width, y + height, x, y + height, r);
    ctx.arcTo(x, y + height, x, y, r);
    ctx.arcTo(x, y, x + width, y, r);
    ctx.closePath();
  };
  const aspect = image.width / image.height;
  const targetAspect = width / height;
  let drawW = width;
  let drawH = height;
  let drawX = x;
  let drawY = y;
  if (aspect > targetAspect) {
    drawW = height * aspect;
    drawX = x - (drawW - width) / 2;
  } else {
    drawH = width / aspect;
    drawY = y - (drawH - height) / 2;
  }
  return (
    <Group clipFunc={clipFunc} listening={false}>
      <KonvaImage image={image} x={drawX} y={drawY} width={drawW} height={drawH} />
    </Group>
  );
}

function Ribbon({
  rect,
  color,
}: {
  rect: LidRect;
  color: RibbonColorOption;
}) {
  const bowImg = useImageAsset(color.photo);
  if (!bowImg) return null;

  const r = LID_RADIUS;
  const clipFunc = (ctx: Konva.Context) => {
    ctx.beginPath();
    ctx.moveTo(rect.x + r, rect.y);
    ctx.arcTo(rect.x + rect.width, rect.y, rect.x + rect.width, rect.y + rect.height, r);
    ctx.arcTo(
      rect.x + rect.width,
      rect.y + rect.height,
      rect.x,
      rect.y + rect.height,
      r,
    );
    ctx.arcTo(rect.x, rect.y + rect.height, rect.x, rect.y, r);
    ctx.arcTo(rect.x, rect.y, rect.x + rect.width, rect.y, r);
    ctx.closePath();
  };

  return (
    <Group listening={false} clipFunc={clipFunc}>
      <KonvaImage
        image={bowImg}
        x={rect.x}
        y={rect.y}
        width={rect.width}
        height={rect.height}
        shadowColor="rgba(0, 0, 0, 0.35)"
        shadowBlur={10}
        shadowOpacity={0.45}
        shadowOffsetY={3}
      />
    </Group>
  );
}

export default function LidView({
  size,
  lidStyle,
  lidImage,
  ribbon,
  canvasWidth,
  canvasHeight,
}: LidViewProps) {
  const box = computeBox(size, canvasWidth, canvasHeight);
  const rect = lidRectFrom(box);
  const ribbonOpt = getRibbonColorOption(ribbon.color);

  const baseSrc =
    lidStyle === "transparent"
      ? LID_IMAGE_SRC.transparent
      : lidStyle === "shrink"
        ? LID_IMAGE_SRC.shrink
        : LID_IMAGE_SRC.plain;

  return (
    <Group>
      <LidBaseImage rect={rect} src={baseSrc} />
      {lidStyle === "image" && lidImage && (
        <LidImagePatch rect={rect} dataUrl={lidImage} />
      )}
      {ribbon.enabled && <Ribbon rect={rect} color={ribbonOpt} />}
    </Group>
  );
}
