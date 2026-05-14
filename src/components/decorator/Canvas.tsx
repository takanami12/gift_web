"use client";

import type Konva from "konva";
import { useEffect, useRef, useState } from "react";
import { Layer, Rect, Stage } from "react-konva";
import { useDesignStore } from "@/store/designStore";
import BottleAccessories from "./BottleAccessories";
import BoxTemplate, { computeBox } from "./BoxTemplate";
import GridOverlay from "./GridOverlay";
import InsideBoxImage from "./InsideBoxImage";
import Item from "./Item";
import LidView from "./LidView";

interface CanvasProps {
  width: number;
  height: number;
  onStageReady?: (stage: Konva.Stage | null) => void;
}

export default function Canvas({ width, height, onStageReady }: CanvasProps) {
  const stageRef = useRef<Konva.Stage>(null);
  const items = useDesignStore((s) => s.items);
  const selectedId = useDesignStore((s) => s.selectedId);
  const viewMode = useDesignStore((s) => s.viewMode);
  const boxType = useDesignStore((s) => s.boxType);
  const boxSize = useDesignStore((s) => s.boxSize);
  const boxColor = useDesignStore((s) => s.boxColor);
  const wrapColor = useDesignStore((s) => s.wrapColor);
  const lidStyle = useDesignStore((s) => s.lidStyle);
  const lidImage = useDesignStore((s) => s.lidImage);
  const ribbon = useDesignStore((s) => s.ribbon);
  const extras = useDesignStore((s) => s.extras);
  const updateItem = useDesignStore((s) => s.updateItem);
  const selectItem = useDesignStore((s) => s.selectItem);
  const recordFrame = useDesignStore((s) => s.recordFrame);

  const [hovering, setHovering] = useState(false);
  const [dragging, setDragging] = useState(false);

  useEffect(() => {
    if (!onStageReady) return;
    onStageReady(stageRef.current);
    return () => onStageReady(null);
  }, [onStageReady]);

  useEffect(() => {
    if (items.length === 0) return;
    const t = setTimeout(recordFrame, 400);
    return () => clearTimeout(t);
  }, [items, recordFrame]);

  const handleMouseDown = (e: Konva.KonvaEventObject<MouseEvent>) => {
    if (e.target === e.target.getStage()) selectItem(null);
  };
  const handleTouchStart = (e: Konva.KonvaEventObject<TouchEvent>) => {
    if (e.target === e.target.getStage()) selectItem(null);
  };
  const handleStageDragStart = () => setDragging(true);
  const handleStageDragEnd = () => setDragging(false);

  const sortedItems = [...items].sort((a, b) => a.z - b.z);
  const box = boxSize ? computeBox(boxSize, width, height) : null;
  const isOutside = viewMode === "outside";
  const seeThrough = isOutside && (lidStyle === "transparent" || lidStyle === "shrink");
  const showBoxAndItems = !isOutside || seeThrough;
  const useImageBox = showBoxAndItems && !isOutside;
  const gridVisible = !isOutside && (hovering || dragging);

  return (
    <Stage
      ref={stageRef}
      width={width}
      height={height}
      onMouseDown={handleMouseDown}
      onTouchStart={handleTouchStart}
      onMouseEnter={() => setHovering(true)}
      onMouseLeave={() => setHovering(false)}
      onDragStart={handleStageDragStart}
      onDragEnd={handleStageDragEnd}
      className="rounded-xl border border-stone-200 bg-white shadow-inner"
    >
      <Layer>
        <Rect x={0} y={0} width={width} height={height} fill="#fafaf9" listening={false} />
        {boxSize && boxType && useImageBox && box && (
          <InsideBoxImage
            box={box}
            size={boxSize}
            color={boxColor}
            wrap={wrapColor}
          />
        )}
        {boxSize && boxType && showBoxAndItems && isOutside && (
          <BoxTemplate
            size={boxSize}
            color={boxColor}
            type={boxType}
            wrapColor={wrapColor}
            canvasWidth={width}
            canvasHeight={height}
          />
        )}
        {showBoxAndItems &&
          box &&
          boxSize &&
          sortedItems.map((item) => (
            <Item
              key={item.id}
              item={item}
              selected={selectedId === item.id && !isOutside}
              box={box}
              boxSize={boxSize}
              allItems={items}
              onSelect={selectItem}
              onMove={(id, gridX, gridY) => updateItem(id, { gridX, gridY })}
              interactive={!isOutside}
            />
          ))}
        {showBoxAndItems && box && (
          <BottleAccessories
            items={items}
            box={box}
            flowerCount={extras.flower}
            ribbonCount={extras.ribbon}
          />
        )}
        {box && <GridOverlay box={box} visible={gridVisible} />}
        {boxSize && isOutside && (
          <LidView
            size={boxSize}
            lidStyle={lidStyle}
            lidImage={lidImage}
            ribbon={ribbon}
            canvasWidth={width}
            canvasHeight={height}
          />
        )}
      </Layer>
    </Stage>
  );
}
