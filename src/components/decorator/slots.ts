import { type BoxSize, getBoxSizeOption } from "@/types/design";

export interface ComputedBox {
  x: number;
  y: number;
  width: number;
  height: number;
  cellSize: number;
  cols: number;
  rows: number;
}

const PAD = 36;
const TARGET_CELL = 64;
const MAX_CELL = 84;
const MIN_CELL = 36;

export function computeBox(
  size: BoxSize,
  canvasWidth: number,
  canvasHeight: number,
): ComputedBox {
  const opt = getBoxSizeOption(size);
  const availW = Math.max(280, canvasWidth - PAD * 2);
  const availH = Math.max(260, canvasHeight - PAD * 2);

  const cellByW = Math.floor(availW / opt.cols);
  const cellByH = Math.floor(availH / opt.rows);
  let cellSize = Math.min(cellByW, cellByH);
  cellSize = Math.min(MAX_CELL, Math.max(MIN_CELL, Math.min(cellSize, TARGET_CELL + 12)));

  const width = cellSize * opt.cols;
  const height = cellSize * opt.rows;
  const x = (canvasWidth - width) / 2;
  const y = (canvasHeight - height) / 2;
  return { x, y, width, height, cellSize, cols: opt.cols, rows: opt.rows };
}

export function pointerToGrid(
  pointer: { x: number; y: number },
  box: ComputedBox,
): { gridX: number; gridY: number } {
  const localX = pointer.x - box.x;
  const localY = pointer.y - box.y;
  return {
    gridX: Math.round(localX / box.cellSize),
    gridY: Math.round(localY / box.cellSize),
  };
}

export function gridToPixel(
  gridX: number,
  gridY: number,
  box: ComputedBox,
): { x: number; y: number } {
  return {
    x: box.x + gridX * box.cellSize,
    y: box.y + gridY * box.cellSize,
  };
}
