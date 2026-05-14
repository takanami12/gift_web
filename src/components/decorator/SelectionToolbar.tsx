"use client";

import { useDesignStore } from "@/store/designStore";
import { effectiveFootprint, PRODUCT_BY_ID } from "@/types/design";

export default function SelectionToolbar() {
  const selectedId = useDesignStore((s) => s.selectedId);
  const item = useDesignStore((s) => s.items.find((i) => i.id === s.selectedId) ?? null);
  const removeItem = useDesignStore((s) => s.removeItem);
  const selectItem = useDesignStore((s) => s.selectItem);

  if (!selectedId || !item) {
    return (
      <p className="rounded-xl border border-dashed border-stone-200 bg-white px-4 py-2 text-xs text-stone-400">
        Chọn một sản phẩm trên canvas để xem thông tin hoặc xoá.
      </p>
    );
  }

  const product = PRODUCT_BY_ID[item.productId];
  const eff = product ? effectiveFootprint(product, item.rotation) : null;
  const handleDelete = () => {
    removeItem(item.id);
    selectItem(null);
  };

  return (
    <section
      aria-label="Sản phẩm đã chọn"
      className="flex flex-wrap items-center gap-3 rounded-xl border border-stone-200 bg-white px-4 py-2 shadow-sm"
    >
      <div className="flex items-center gap-2 text-sm">
        <span className="font-semibold text-stone-700">{product?.shortName ?? item.productId}</span>
        {eff && (
          <span className="rounded-sm bg-stone-100 px-1.5 py-px font-mono text-[10px] text-stone-500">
            {eff.cols}×{eff.rows}
          </span>
        )}
        <span className="text-[11px] text-stone-400">
          ô ({item.gridX}, {item.gridY})
          {item.rotation !== 0 && ` · xoay ${item.rotation}°`}
        </span>
      </div>
      <button
        type="button"
        onClick={handleDelete}
        className="ml-auto rounded-md border border-red-300 px-3 py-1.5 text-xs font-semibold text-red-700 hover:bg-red-50"
      >
        Xoá
      </button>
    </section>
  );
}
