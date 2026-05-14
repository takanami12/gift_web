"use client";

import { useEffect, useState } from "react";
import { useDesignStore } from "@/store/designStore";

interface CanvasToolbarProps {
  onPreview?: () => void;
}

export default function CanvasToolbar({ onPreview }: CanvasToolbarProps) {
  const selectedId = useDesignStore((s) => s.selectedId);
  const removeItem = useDesignStore((s) => s.removeItem);
  const selectItem = useDesignStore((s) => s.selectItem);
  const resetItems = useDesignStore((s) => s.resetItems);
  const rotateItem = useDesignStore((s) => s.rotateItem);
  const [hint, setHint] = useState<string | null>(null);

  useEffect(() => {
    if (!hint) return;
    const t = setTimeout(() => setHint(null), 1600);
    return () => clearTimeout(t);
  }, [hint]);

  const hasSelection = !!selectedId;

  const handleRotate = () => {
    if (!selectedId) return;
    const ok = rotateItem(selectedId);
    if (!ok) setHint("Không xoay được — không đủ chỗ trống.");
  };
  const handleDelete = () => {
    if (selectedId) {
      removeItem(selectedId);
      selectItem(null);
    }
  };
  const handleReset = () => {
    if (window.confirm("Xoá toàn bộ sản phẩm trên canvas?")) {
      resetItems();
    }
  };

  return (
    <div className="flex flex-col items-center gap-1">
      <div className="flex items-center justify-center gap-6 rounded-xl border border-stone-200 bg-white px-4 py-2 shadow-sm">
        <ToolButton icon="↻" label="Xoay" onClick={handleRotate} disabled={!hasSelection} />
        <ToolButton icon="🗑" label="Xoá" onClick={handleDelete} disabled={!hasSelection} />
        <ToolButton icon="👁" label="Xem trước" onClick={onPreview} highlight />
        <ToolButton icon="↺" label="Đặt lại" onClick={handleReset} />
      </div>
      {hint && (
        <p className="text-[11px] text-amber-700" role="status">
          {hint}
        </p>
      )}
    </div>
  );
}

function ToolButton({
  icon,
  label,
  onClick,
  disabled,
  highlight,
}: {
  icon: string;
  label: string;
  onClick?: () => void;
  disabled?: boolean;
  highlight?: boolean;
}) {
  return (
    <button
      type="button"
      onClick={onClick}
      disabled={disabled}
      className={`flex flex-col items-center gap-0.5 px-3 py-0.5 text-[10px] font-medium transition disabled:cursor-not-allowed disabled:opacity-40 ${
        highlight ? "text-orange-700" : "text-stone-600 hover:text-orange-700"
      }`}
    >
      <span aria-hidden className={`text-base ${highlight ? "text-orange-600" : ""}`}>
        {icon}
      </span>
      {label}
    </button>
  );
}
