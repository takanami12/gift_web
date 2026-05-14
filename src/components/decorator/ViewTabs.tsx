"use client";

import type { ViewMode } from "@/store/designStore";

interface ViewTabsProps {
  mode: ViewMode;
  onChange: (mode: ViewMode) => void;
}

const TABS: Array<{ id: ViewMode; label: string }> = [
  { id: "inside", label: "Trong hộp" },
  { id: "outside", label: "Nắp ngoài" },
];

export default function ViewTabs({ mode, onChange }: ViewTabsProps) {
  return (
    <div
      role="tablist"
      aria-label="Chế độ xem hộp quà"
      className="flex items-center gap-2"
    >
      {TABS.map((t) => {
        const active = mode === t.id;
        return (
          <button
            key={t.id}
            type="button"
            role="tab"
            aria-selected={active}
            onClick={() => onChange(t.id)}
            className={`rounded-full px-4 py-1.5 text-sm font-semibold transition focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-orange-500 ${
              active
                ? "bg-orange-500 text-white shadow-sm"
                : "bg-stone-100 text-stone-600 hover:bg-stone-200"
            }`}
          >
            {t.label}
          </button>
        );
      })}
    </div>
  );
}
