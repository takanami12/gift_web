"use client";

import type Konva from "konva";
import { useRouter } from "next/navigation";
import { useCallback, useEffect, useMemo, useRef, useState } from "react";
import { useCart } from "@/lib/cart-context";
import { useDesignStore, type WizardStep } from "@/store/designStore";
import {
  canPlaceItem,
  computeTotalPrice,
  DESIGN_BASE_PRICE,
  type DesignDraft,
  PRODUCT_BY_ID,
  getBoxSizeOption,
} from "@/types/design";
import { buildDecorationItem } from "./buildItem";
import CanvasClient from "./CanvasClient";
import CanvasToolbar from "./CanvasToolbar";
import ConfirmStep from "./ConfirmStep";
import Customizer from "./Customizer";
import ProductPanel from "./ProductPanel";
import { computeBox } from "./slots";
import SizePicker from "./SizePicker";
import Stepper from "./Stepper";
import TypePicker from "./TypePicker";
import ViewTabs from "./ViewTabs";

function makeDraftId(): string {
  return (
    globalThis.crypto?.randomUUID?.() ??
    `dr_${Date.now()}_${Math.random().toString(36).slice(2)}`
  );
}

export default function Editor() {
  const containerRef = useRef<HTMLDivElement>(null);
  const stageRef = useRef<Konva.Stage | null>(null);
  const [size, setSize] = useState({ width: 800, height: 560 });
  const [feedback, setFeedback] = useState<string | null>(null);
  const [previewUrl, setPreviewUrl] = useState<string | null>(null);

  const step = useDesignStore((s) => s.step);
  const viewMode = useDesignStore((s) => s.viewMode);
  const boxType = useDesignStore((s) => s.boxType);
  const boxSize = useDesignStore((s) => s.boxSize);
  const boxColor = useDesignStore((s) => s.boxColor);
  const wrapColor = useDesignStore((s) => s.wrapColor);
  const lidStyle = useDesignStore((s) => s.lidStyle);
  const lidImage = useDesignStore((s) => s.lidImage);
  const ribbon = useDesignStore((s) => s.ribbon);
  const extras = useDesignStore((s) => s.extras);
  const items = useDesignStore((s) => s.items);
  const frames = useDesignStore((s) => s.frames);
  const setStep = useDesignStore((s) => s.setStep);
  const setViewMode = useDesignStore((s) => s.setViewMode);
  const addItem = useDesignStore((s) => s.addItem);
  const setCanvasSize = useDesignStore((s) => s.setCanvasSize);
  const reset = useDesignStore((s) => s.reset);
  const recordFrame = useDesignStore((s) => s.recordFrame);
  const selectItem = useDesignStore((s) => s.selectItem);

  const { addDesign } = useCart();
  const router = useRouter();

  const sizeOpt = boxSize ? getBoxSizeOption(boxSize) : null;
  const total = useMemo(
    () => computeTotalPrice(items, extras, DESIGN_BASE_PRICE, ribbon, lidStyle),
    [items, extras, ribbon, lidStyle],
  );

  const canAdvance: Record<WizardStep, boolean> = {
    1: !!boxType,
    2: !!boxSize,
    3: items.length > 0,
    4: false,
  };
  const reachable: WizardStep = boxType
    ? boxSize
      ? items.length > 0
        ? 4
        : 3
      : 2
    : 1;

  useEffect(() => {
    if (step !== 3) return;
    const el = containerRef.current;
    if (!el) return;
    const rect = el.getBoundingClientRect();
    const initial = {
      width: Math.max(360, rect.width),
      height: Math.max(420, rect.height),
    };
    setSize(initial);
    setCanvasSize({ width: initial.width - 32, height: initial.height - 32 });
    const observer = new ResizeObserver((entries) => {
      const entry = entries[0];
      if (!entry) return;
      const { width, height } = entry.contentRect;
      const next = {
        width: Math.max(360, width),
        height: Math.max(420, height),
      };
      setSize(next);
      setCanvasSize({ width: next.width - 32, height: next.height - 32 });
    });
    observer.observe(el);
    return () => observer.disconnect();
  }, [step, setCanvasSize, boxSize]);

  const handleStageReady = useCallback((stage: Konva.Stage | null) => {
    stageRef.current = stage;
  }, []);

  const generatePreview = useCallback(() => {
    const stage = stageRef.current;
    if (!stage) return null;
    return stage.toDataURL({
      mimeType: "image/jpeg",
      quality: 0.8,
      pixelRatio: 0.55,
    });
  }, []);

  const handleNext = () => {
    if (step === 4) return;
    if (!canAdvance[step]) {
      const reasons: Record<WizardStep, string> = {
        1: "Hãy chọn loại hộp.",
        2: "Hãy chọn kích thước hộp.",
        3: "Hãy thêm ít nhất 1 sản phẩm.",
        4: "",
      };
      setFeedback(reasons[step]);
      setTimeout(() => setFeedback(null), 1800);
      return;
    }
    if (step === 3) {
      const url = generatePreview();
      if (url) setPreviewUrl(url);
      recordFrame();
    }
    setStep((step + 1) as WizardStep);
  };

  const handleBack = () => {
    if (step <= 1) return;
    setStep((step - 1) as WizardStep);
  };

  const handleJump = (target: WizardStep) => {
    if (target > reachable) return;
    setStep(target);
  };

  const handleViewChange = (mode: "inside" | "outside") => {
    if (mode === viewMode) return;
    selectItem(null);
    setViewMode(mode);
  };

  const handleDrop = (e: React.DragEvent<HTMLDivElement>) => {
    e.preventDefault();
    if (viewMode === "outside") return;
    if (!boxSize) return;
    const productId = e.dataTransfer.getData("application/x-gift-product");
    const product = productId ? PRODUCT_BY_ID[productId] : null;
    if (!product) return;
    const stage = stageRef.current;
    if (!stage) return;
    if (sizeOpt && items.length >= sizeOpt.maxItems) {
      setFeedback(`Hộp tối đa ${sizeOpt.maxItems} món.`);
      setTimeout(() => setFeedback(null), 1800);
      return;
    }
    stage.setPointersPositions(e.nativeEvent);
    const pointer = stage.getPointerPosition();
    if (!pointer) return;
    const box = computeBox(boxSize, size.width - 32, size.height - 32);
    const pointerCellX = (pointer.x - box.x) / box.cellSize;
    const pointerCellY = (pointer.y - box.y) / box.cellSize;
    const desiredX = Math.round(pointerCellX - product.footprint.cols / 2);
    const desiredY = Math.round(pointerCellY - product.footprint.rows / 2);
    const clampedX = Math.max(0, Math.min(box.cols - product.footprint.cols, desiredX));
    const clampedY = Math.max(0, Math.min(box.rows - product.footprint.rows, desiredY));
    const check = canPlaceItem(items, boxSize, product, clampedX, clampedY);
    if (!check.ok) {
      setFeedback(
        check.reason === "overlap"
          ? "Ô đó đã có sản phẩm khác. Thả vào ô trống."
          : `Không đặt được ${product.shortName} ở vị trí này.`,
      );
      setTimeout(() => setFeedback(null), 1800);
      return;
    }
    addItem(buildDecorationItem(productId, clampedX, clampedY));
  };

  const handleKeyDown = (e: React.KeyboardEvent<HTMLDivElement>) => {
    if (viewMode === "outside") return;
    const target = e.target as HTMLElement;
    if (target.tagName === "INPUT" || target.tagName === "TEXTAREA") return;
    const state = useDesignStore.getState();
    const selectedId = state.selectedId;
    if (!selectedId || !boxSize) return;
    const item = state.items.find((i) => i.id === selectedId);
    if (!item) return;
    const product = PRODUCT_BY_ID[item.productId];
    if (!product) return;
    let dx = 0;
    let dy = 0;
    switch (e.key) {
      case "ArrowLeft":
        dx = -1;
        break;
      case "ArrowRight":
        dx = 1;
        break;
      case "ArrowUp":
        dy = -1;
        break;
      case "ArrowDown":
        dy = 1;
        break;
      case "Delete":
      case "Backspace":
        e.preventDefault();
        state.removeItem(item.id);
        return;
      case "Escape":
        e.preventDefault();
        state.selectItem(null);
        return;
      case "r":
      case "R":
        e.preventDefault();
        state.rotateItem(item.id);
        return;
      default:
        return;
    }
    e.preventDefault();
    const nextX = item.gridX + dx;
    const nextY = item.gridY + dy;
    const check = canPlaceItem(state.items, boxSize, product, nextX, nextY, item.id, item.rotation);
    if (check.ok) state.updateItem(item.id, { gridX: nextX, gridY: nextY });
  };

  const handlePreviewClick = () => {
    const url = generatePreview();
    if (url) {
      setPreviewUrl(url);
      window.open(url, "_blank");
    }
  };

  const handleAddToCart = () => {
    if (!boxType || !boxSize || items.length === 0) {
      setFeedback("Thiết kế chưa đủ điều kiện thêm vào giỏ.");
      return;
    }
    const url = previewUrl ?? generatePreview() ?? "";
    recordFrame();
    const latestFrames = useDesignStore.getState().frames;
    const draft: DesignDraft = {
      id: makeDraftId(),
      name: `Hộp tự thiết kế · ${new Date().toLocaleString("vi-VN", {
        hour: "2-digit",
        minute: "2-digit",
        day: "2-digit",
        month: "2-digit",
      })}`,
      previewDataUrl: url,
      boxType,
      boxSize,
      boxColor,
      wrapColor,
      lidStyle,
      lidImage,
      ribbon: { ...ribbon },
      extras,
      items: items.map((it) => ({ ...it })),
      frames: latestFrames.map((f) => ({
        ts: f.ts,
        items: f.items.map((it) => ({ ...it })),
      })),
      basePrice: DESIGN_BASE_PRICE,
      totalPrice: total,
      createdAt: Date.now(),
    };
    addDesign(draft);
    reset();
    router.push("/gio-hang");
  };

  return (
    <div className="flex flex-col gap-5">
      <header className="grid grid-cols-[1fr_auto_1fr] items-center gap-3 rounded-2xl border border-stone-200 bg-white px-4 py-3 shadow-sm">
        <div />
        <Stepper current={step} reachable={reachable} onJump={handleJump} />
        <div className="flex items-center justify-end gap-3">
          {step >= 3 && (
            <span className="hidden text-sm md:inline">
              <span className="text-stone-500">Tổng:</span>{" "}
              <strong className="text-stone-900">{total.toLocaleString("vi-VN")}đ</strong>
            </span>
          )}
          {step < 4 ? (
            <button
              type="button"
              onClick={handleNext}
              className="rounded-full bg-orange-500 px-5 py-2 text-sm font-semibold text-white shadow-sm transition hover:bg-orange-600 disabled:cursor-not-allowed disabled:opacity-60"
            >
              Tiếp theo →
            </button>
          ) : (
            <button
              type="button"
              onClick={handleAddToCart}
              className="rounded-full bg-orange-500 px-5 py-2 text-sm font-semibold text-white shadow-sm transition hover:bg-orange-600"
            >
              Thêm vào giỏ →
            </button>
          )}
        </div>
      </header>

      {feedback && (
        <p
          className="rounded-md border border-amber-300 bg-amber-50 px-3 py-2 text-sm text-amber-800"
          role="status"
        >
          {feedback}
        </p>
      )}

      {step > 1 && step < 4 && (
        <div className="flex">
          <button
            type="button"
            onClick={handleBack}
            className="rounded-full border border-stone-300 px-4 py-1.5 text-xs font-semibold text-stone-600 hover:bg-stone-100"
          >
            ← Quay lại
          </button>
        </div>
      )}

      {step === 1 && <TypePicker />}
      {step === 2 && <SizePicker />}
      {step === 3 && (
        <div className="flex flex-col gap-3">
          <p className="text-center font-headline text-xl text-stone-700 serif-display">
            {viewMode === "inside"
              ? "Kéo thả sản phẩm vào hộp"
              : "Trang trí mặt ngoài hộp"}
          </p>
          <div className="flex h-[calc(100vh-220px)] max-h-[820px] min-h-[600px] w-full overflow-hidden rounded-2xl border border-stone-200 bg-stone-50 shadow-sm">
            <ProductPanel />
            <div className="flex flex-1 flex-col gap-2 p-3">
              <ViewTabs mode={viewMode} onChange={handleViewChange} />
              <div
                ref={containerRef}
                tabIndex={0}
                role="application"
                aria-label="Khu vực canvas thiết kế hộp quà"
                onDragOver={(e) => {
                  if (viewMode === "outside") return;
                  e.preventDefault();
                  e.dataTransfer.dropEffect = "copy";
                }}
                onDrop={handleDrop}
                onKeyDown={handleKeyDown}
                className="flex-1 outline-none focus-visible:ring-2 focus-visible:ring-orange-400/60"
              >
                <CanvasClient
                  width={size.width - 32}
                  height={size.height - 32}
                  onStageReady={handleStageReady}
                />
              </div>
              <CanvasToolbar onPreview={handlePreviewClick} />
            </div>
            <Customizer />
          </div>
          <p className="text-center text-xs text-stone-400">
            {viewMode === "inside"
              ? `${frames.length} frame replay · Mũi tên di chuyển ô / R xoay 90° / Delete xoá / Esc bỏ chọn.`
              : "Tuỳ chọn nắp hộp, ruy băng và màng co bên phải."}
          </p>
        </div>
      )}
      {step === 4 && (
        <ConfirmStep
          previewDataUrl={previewUrl}
          onAddToCart={handleAddToCart}
          onBack={() => setStep(3)}
        />
      )}
    </div>
  );
}
