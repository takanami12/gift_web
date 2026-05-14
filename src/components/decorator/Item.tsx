"use client";

import type Konva from "konva";
import { Group, Image as KonvaImage, Rect } from "react-konva";
import {
  canPlaceItem,
  type BoxSize,
  type DecorationItem,
  effectiveFootprint,
  PRODUCT_BY_ID,
} from "@/types/design";
import { type ComputedBox, gridToPixel } from "./slots";
import { useImageAsset } from "./useImageAsset";

interface ItemProps {
  item: DecorationItem;
  selected: boolean;
  box: ComputedBox;
  boxSize: BoxSize;
  allItems: DecorationItem[];
  onSelect: (id: string) => void;
  onMove: (id: string, gridX: number, gridY: number) => void;
  interactive?: boolean;
}

export default function Item({
  item,
  selected,
  box,
  boxSize,
  allItems,
  onSelect,
  onMove,
  interactive = true,
}: ItemProps) {
  const product = PRODUCT_BY_ID[item.productId];
  const image = useImageAsset(product?.photo);

  if (!product) return null;

  const eff = effectiveFootprint(product, item.rotation);
  const effW = eff.cols * box.cellSize;
  const effH = eff.rows * box.cellSize;
  const { x: pixelX, y: pixelY } = gridToPixel(item.gridX, item.gridY, box);

  const origCellW = product.footprint.cols * box.cellSize;
  const origCellH = product.footprint.rows * box.cellSize;
  const sidePad = Math.max(2, box.cellSize * 0.04);
  const maxW = origCellW - sidePad * 2;
  const maxH = origCellH - sidePad * 2;
  let drawW = maxW;
  let drawH = maxH;
  if (image) {
    const scale = Math.min(maxW / image.width, maxH / image.height);
    drawW = image.width * scale;
    drawH = image.height * scale;
  }
  const drawX = -drawW / 2;
  const drawY = -drawH / 2;

  const handleDragMove = (e: Konva.KonvaEventObject<DragEvent>) => {
    const node = e.target;
    const localX = node.x() - box.x;
    const localY = node.y() - box.y;
    const gridX = Math.round(localX / box.cellSize);
    const gridY = Math.round(localY / box.cellSize);
    node.x(box.x + gridX * box.cellSize);
    node.y(box.y + gridY * box.cellSize);
  };

  const handleDragEnd = (e: Konva.KonvaEventObject<DragEvent>) => {
    const node = e.target;
    const localX = node.x() - box.x;
    const localY = node.y() - box.y;
    const gridX = Math.round(localX / box.cellSize);
    const gridY = Math.round(localY / box.cellSize);
    const check = canPlaceItem(
      allItems,
      boxSize,
      product,
      gridX,
      gridY,
      item.id,
      item.rotation,
    );
    if (check.ok) {
      onMove(item.id, gridX, gridY);
    } else {
      const original = gridToPixel(item.gridX, item.gridY, box);
      node.x(original.x);
      node.y(original.y);
    }
  };

  const handleSelect = () => onSelect(item.id);

  return (
    <Group
      x={pixelX}
      y={pixelY}
      draggable={interactive}
      listening={interactive}
      onDragMove={interactive ? handleDragMove : undefined}
      onDragEnd={interactive ? handleDragEnd : undefined}
      onClick={interactive ? handleSelect : undefined}
      onTap={interactive ? handleSelect : undefined}
    >
      <Group x={effW / 2} y={effH / 2} rotation={item.rotation}>
        {image ? (
          <KonvaImage
            image={image}
            x={drawX}
            y={drawY}
            width={drawW}
            height={drawH}
            shadowColor={selected ? "#c9a55c" : "rgba(0, 0, 0, 0.4)"}
            shadowBlur={selected ? 16 : 8}
            shadowOpacity={selected ? 0.7 : 0.55}
            shadowOffsetY={selected ? 0 : 3}
          />
        ) : (
          <Rect
            x={drawX}
            y={drawY}
            width={drawW}
            height={drawH}
            fill="#f5f5f4"
            stroke="#d6d3d1"
            strokeWidth={1}
            cornerRadius={5}
            listening={false}
          />
        )}
      </Group>
      {selected && (
        <Rect
          width={effW}
          height={effH}
          stroke="#c9a55c"
          strokeWidth={3}
          dash={[6, 4]}
          cornerRadius={6}
          listening={false}
        />
      )}
    </Group>
  );
}
