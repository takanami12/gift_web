"use client";

import Image from "next/image";
import { useDesignStore } from "@/store/designStore";
import { type BoxType, BOX_TYPE_OPTIONS } from "@/types/design";

export default function TypePicker() {
  const boxType = useDesignStore((s) => s.boxType);
  const setBoxType = useDesignStore((s) => s.setBoxType);

  const handlePick = (id: BoxType) => setBoxType(id);

  return (
    <section
      aria-labelledby="type-picker-heading"
      className="mx-auto w-full max-w-5xl"
    >
      <header className="mb-6 text-center">
        <p className="text-[11px] font-semibold uppercase tracking-[0.35em] text-orange-600">
          Bước 1
        </p>
        <h2
          id="type-picker-heading"
          className="mt-2 font-headline text-3xl text-on-surface serif-display"
        >
          Chọn loại hộp
        </h2>
        <p className="mt-2 text-sm text-stone-500">
          Hộp cơ bản dùng nắp rời / màng co. Hộp cao cấp có nam châm hít chắc chắn.
        </p>
      </header>
      <div className="grid gap-5 md:grid-cols-2">
        {BOX_TYPE_OPTIONS.map((opt) => {
          const active = boxType === opt.id;
          return (
            <button
              key={opt.id}
              type="button"
              onClick={() => handlePick(opt.id)}
              aria-pressed={active}
              className={`group relative flex flex-col gap-3 overflow-hidden rounded-2xl border-2 bg-white p-3 text-left shadow-sm transition focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-orange-500 ${
                active
                  ? "border-orange-500 ring-4 ring-orange-100"
                  : "border-stone-200 hover:border-orange-300"
              }`}
            >
              <div
                className={`relative aspect-[16/9] w-full overflow-hidden rounded-xl ${
                  active ? "bg-[#fff5e6]" : "bg-stone-50"
                }`}
              >
                <Image
                  src={opt.photo}
                  alt={opt.label}
                  fill
                  unoptimized
                  className="object-contain p-3"
                  draggable={false}
                />
              </div>
              <div className="px-2 pb-2 pt-1">
                <p className="font-headline text-2xl font-bold text-on-surface serif-display">
                  {opt.label}
                </p>
                <p className="mt-1 text-sm text-stone-500">{opt.hint}</p>
              </div>
              {active && (
                <span className="absolute right-3 top-3 flex h-7 w-7 items-center justify-center rounded-full bg-orange-500 text-white shadow">
                  <svg width="14" height="14" viewBox="0 0 16 16" fill="none" aria-hidden>
                    <path
                      d="M3 8.5L6.5 12L13 4.5"
                      stroke="currentColor"
                      strokeWidth="2.4"
                      strokeLinecap="round"
                      strokeLinejoin="round"
                    />
                  </svg>
                </span>
              )}
            </button>
          );
        })}
      </div>
    </section>
  );
}
