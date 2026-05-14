"use client";

import Image from "next/image";
import { useEffect, useId, useMemo, useState } from "react";
import { useDesignStore } from "@/store/designStore";
import {
  findFirstFreeSlot,
  PRODUCT_CATALOG,
  PRODUCT_FILTER_PILLS,
  type ProductCategory,
  type ProductDef,
} from "@/types/design";
import { buildDecorationItem } from "./buildItem";

export default function ProductPanel() {
  const headingId = useId();
  const [filter, setFilter] = useState<ProductCategory>("tat-ca");
  const [feedback, setFeedback] = useState<string | null>(null);
  const items = useDesignStore((s) => s.items);
  const addItem = useDesignStore((s) => s.addItem);
  const boxSize = useDesignStore((s) => s.boxSize);

  const visible = useMemo(
    () =>
      filter === "tat-ca"
        ? PRODUCT_CATALOG
        : PRODUCT_CATALOG.filter((p) => p.category === filter),
    [filter],
  );

  useEffect(() => {
    if (!feedback) return;
    const t = setTimeout(() => setFeedback(null), 2200);
    return () => clearTimeout(t);
  }, [feedback]);

  const handleAdd = (product: ProductDef) => {
    if (!boxSize) {
      setFeedback("Hãy chọn kích thước hộp trước.");
      return;
    }
    let rotation: 0 | 90 = 0;
    let slot = findFirstFreeSlot(items, boxSize, product, 0);
    if (!slot && product.footprint.cols !== product.footprint.rows) {
      slot = findFirstFreeSlot(items, boxSize, product, 90);
      if (slot) rotation = 90;
    }
    if (!slot) {
      setFeedback(`Không còn ô trống cho ${product.shortName} (${product.footprint.cols}×${product.footprint.rows}).`);
      return;
    }
    addItem(buildDecorationItem(product.id, slot.gridX, slot.gridY, rotation));
  };

  const handleDragStart = (e: React.DragEvent<HTMLButtonElement>, productId: string) => {
    e.dataTransfer.setData("application/x-gift-product", productId);
    e.dataTransfer.effectAllowed = "copy";
  };

  return (
    <aside
      aria-labelledby={headingId}
      className="flex w-72 shrink-0 flex-col gap-3 overflow-y-auto border-r border-stone-200 bg-white px-4 py-5"
    >
      <h2 id={headingId} className="text-sm font-bold tracking-wide text-stone-700">
        Sản phẩm
      </h2>
      <div className="flex flex-wrap gap-1.5">
        {PRODUCT_FILTER_PILLS.map((pill) => {
          const active = filter === pill.id;
          return (
            <button
              key={pill.id}
              type="button"
              onClick={() => setFilter(pill.id)}
              aria-pressed={active}
              className={`rounded-full border px-3 py-1 text-xs font-semibold transition ${
                active
                  ? "border-orange-500 bg-orange-500 text-white"
                  : "border-stone-200 bg-white text-stone-600 hover:border-orange-300 hover:text-orange-600"
              }`}
            >
              {pill.label}
            </button>
          );
        })}
      </div>
      {feedback && (
        <p
          className="rounded-md border border-amber-300 bg-amber-50 px-2.5 py-1.5 text-[11px] text-amber-800"
          role="status"
        >
          {feedback}
        </p>
      )}
      <ul className="flex flex-col gap-2">
        {visible.map((product) => {
          const inCanvasCount = items.filter((it) => it.productId === product.id).length;
          return (
            <li key={product.id}>
              <button
                type="button"
                draggable
                onDragStart={(e) => handleDragStart(e, product.id)}
                onClick={() => handleAdd(product)}
                aria-label={`Thêm ${product.name} vào canvas`}
                className="group flex w-full items-center gap-3 rounded-xl border border-stone-200 bg-white px-2.5 py-2 text-left shadow-sm transition hover:border-orange-300 hover:bg-orange-50/40 focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-orange-500 cursor-grab active:cursor-grabbing"
              >
                <span className="relative flex h-12 w-12 shrink-0 overflow-hidden rounded-md ring-1 ring-stone-200 bg-stone-50">
                  <Image
                    src={product.photo}
                    alt=""
                    fill
                    unoptimized
                    className="object-contain p-0.5"
                    draggable={false}
                  />
                </span>
                <span className="flex-1 min-w-0">
                  <span className="block truncate text-[13px] font-semibold text-stone-800">
                    {product.shortName}
                  </span>
                  <span className="flex items-center gap-1.5 text-[11px]">
                    <span className="font-bold text-stone-700">
                      {product.price.toLocaleString("vi-VN")}đ
                    </span>
                    <span className="rounded-sm bg-stone-100 px-1 py-px font-mono text-[9px] text-stone-500">
                      {product.footprint.cols}×{product.footprint.rows}
                    </span>
                  </span>
                </span>
                <span
                  aria-hidden
                  className="flex h-7 w-7 shrink-0 items-center justify-center rounded-full bg-orange-500 text-base font-bold text-white transition group-hover:bg-orange-600"
                >
                  {inCanvasCount > 0 ? inCanvasCount : "+"}
                </span>
              </button>
            </li>
          );
        })}
      </ul>
      <p className="mt-1 text-[11px] leading-relaxed text-stone-500">
        Click để tự động xếp vào ô trống, hoặc kéo thả vào ô bạn muốn.
      </p>
    </aside>
  );
}
