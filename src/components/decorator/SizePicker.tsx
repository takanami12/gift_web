"use client";

import Image from "next/image";
import { useDesignStore } from "@/store/designStore";
import { type BoxSize, BOX_SIZE_OPTIONS, BOX_TYPE_OPTIONS } from "@/types/design";

export default function SizePicker() {
  const boxSize = useDesignStore((s) => s.boxSize);
  const boxType = useDesignStore((s) => s.boxType);
  const setBoxSize = useDesignStore((s) => s.setBoxSize);

  const handlePick = (id: BoxSize) => setBoxSize(id);

  const typeOpt = BOX_TYPE_OPTIONS.find((t) => t.id === boxType);
  const sharedPhoto = typeOpt?.photo ?? BOX_TYPE_OPTIONS[0].photo;

  const photoScale: Record<BoxSize, string> = {
    small: "scale-[0.5]",
    medium: "scale-[0.75]",
    large: "scale-[1.0]",
  };

  return (
    <section
      aria-labelledby="size-picker-heading"
      className="mx-auto w-full max-w-5xl"
    >
      <header className="mb-6 text-center">
        <p className="text-[11px] font-semibold uppercase tracking-[0.35em] text-orange-600">
          Bước 2
        </p>
        <h2
          id="size-picker-heading"
          className="mt-2 font-headline text-3xl text-on-surface serif-display"
        >
          Chọn kích thước hộp
        </h2>
        <p className="mt-2 text-sm text-stone-500">
          Số ngăn quyết định số sản phẩm tối đa bạn có thể bày trí bên trong.
        </p>
      </header>
      <div className="grid gap-4 sm:grid-cols-2 md:grid-cols-3">
        {BOX_SIZE_OPTIONS.map((opt) => {
          const active = boxSize === opt.id;
          return (
            <button
              key={opt.id}
              type="button"
              onClick={() => handlePick(opt.id)}
              aria-pressed={active}
              className={`group relative flex flex-col gap-2 overflow-hidden rounded-2xl border-2 bg-white p-3 text-center shadow-sm transition focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-[#B1997E] ${
                active
                  ? "border-[#B1997E] ring-4 ring-[#B1997E]/20"
                  : "border-stone-200 hover:border-[#B1997E]/60"
              }`}
            >
              <div
                className={`relative aspect-[4/3] w-full overflow-hidden rounded-xl ${
                  active ? "bg-[#fff5e6]" : "bg-stone-50"
                }`}
              >
                <Image
                  src={sharedPhoto}
                  alt={opt.label}
                  fill
                  unoptimized
                  className={`object-contain ${photoScale[opt.id]} transition-transform`}
                  draggable={false}
                />
              </div>
              <div className="pb-2 pt-1">
                <p className="font-headline text-lg font-bold text-on-surface serif-display">
                  {opt.label}
                </p>
                <p className="text-xs text-stone-500">{opt.hint}</p>
                {opt.popular && (
                  <span className="mt-2 inline-flex items-center rounded-full bg-amber-100 px-2.5 py-0.5 text-[10px] font-semibold uppercase tracking-wide text-amber-800">
                    Phổ biến
                  </span>
                )}
              </div>
              {active && (
                <span className="absolute right-3 top-3 flex h-7 w-7 items-center justify-center rounded-full bg-[#B1997E] text-white shadow">
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
