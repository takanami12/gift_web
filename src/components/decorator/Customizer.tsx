"use client";

import Image from "next/image";
import { useEffect, useId, useRef, useState } from "react";
import { useDesignStore } from "@/store/designStore";
import {
  BOX_COLOR_OPTIONS,
  computeTotalPrice,
  DESIGN_BASE_PRICE,
  EXTRA_PRICES,
  getBoxSizeOption,
  LID_IMAGE_PRICE,
  LID_SHRINK_PRICE,
  LID_TRANSPARENT_PRICE,
  type LidStyle,
  RIBBON_COLOR_OPTIONS,
  RIBBON_PRICE,
  WRAP_COLOR_OPTIONS,
} from "@/types/design";
import { isBottle } from "./BottleAccessories";

const MAX_LID_IMAGE_BYTES = 2 * 1024 * 1024;

export default function Customizer() {
  const viewMode = useDesignStore((s) => s.viewMode);
  const boxSize = useDesignStore((s) => s.boxSize);
  const boxColor = useDesignStore((s) => s.boxColor);
  const wrapColor = useDesignStore((s) => s.wrapColor);
  const lidStyle = useDesignStore((s) => s.lidStyle);
  const lidImage = useDesignStore((s) => s.lidImage);
  const ribbon = useDesignStore((s) => s.ribbon);
  const extras = useDesignStore((s) => s.extras);
  const items = useDesignStore((s) => s.items);
  const setBoxColor = useDesignStore((s) => s.setBoxColor);
  const setWrapColor = useDesignStore((s) => s.setWrapColor);
  const setLidStyle = useDesignStore((s) => s.setLidStyle);
  const setLidImage = useDesignStore((s) => s.setLidImage);
  const setRibbonEnabled = useDesignStore((s) => s.setRibbonEnabled);
  const setRibbonColor = useDesignStore((s) => s.setRibbonColor);
  const setExtra = useDesignStore((s) => s.setExtra);

  const sizeOpt = boxSize ? getBoxSizeOption(boxSize) : null;
  const total = computeTotalPrice(items, extras, DESIGN_BASE_PRICE, ribbon, lidStyle);
  const bottleCount = items.filter((it) => isBottle(it.productId)).length;
  const accessoryCount = extras.flower + extras.ribbon;
  const canAddAccessory = accessoryCount < bottleCount;
  const [accessoryAlert, setAccessoryAlert] = useState<string | null>(null);

  useEffect(() => {
    if (!accessoryAlert) return;
    const t = setTimeout(() => setAccessoryAlert(null), 2400);
    return () => clearTimeout(t);
  }, [accessoryAlert]);

  const tryAddAccessory = (key: "flower" | "ribbon") => {
    if (!canAddAccessory) {
      setAccessoryAlert(
        bottleCount === 0
          ? "Hãy thêm chai rượu trước khi gắn phụ kiện."
          : `Đã đạt tối đa ${bottleCount} phụ kiện (1 cho mỗi chai).`,
      );
      return;
    }
    setExtra(key, extras[key] + 1);
  };

  useEffect(() => {
    if (accessoryCount <= bottleCount) return;
    let overflow = accessoryCount - bottleCount;
    let nextRibbon = extras.ribbon;
    let nextFlower = extras.flower;
    const dropRibbon = Math.min(nextRibbon, overflow);
    nextRibbon -= dropRibbon;
    overflow -= dropRibbon;
    if (overflow > 0) nextFlower = Math.max(0, nextFlower - overflow);
    if (nextRibbon !== extras.ribbon) setExtra("ribbon", nextRibbon);
    if (nextFlower !== extras.flower) setExtra("flower", nextFlower);
  }, [bottleCount, accessoryCount, extras.flower, extras.ribbon, setExtra]);

  return (
    <aside
      aria-label="Tuỳ chỉnh hộp quà"
      className="flex w-72 shrink-0 flex-col gap-5 overflow-y-auto border-l border-stone-200 bg-white px-4 py-5"
    >
      <h2 className="text-sm font-bold tracking-wide text-stone-700">Tuỳ chỉnh</h2>

      {viewMode === "inside" ? <InsidePanel /> : <OutsidePanel />}

      <section className="mt-auto rounded-xl border border-stone-200 bg-stone-50 p-3">
        <div className="flex items-center justify-between text-xs text-stone-500">
          <span>Tóm tắt</span>
          {sizeOpt && (
            <span className="font-mono text-[11px] text-stone-700">
              {items.length}/{sizeOpt.maxItems} món
            </span>
          )}
        </div>
        <div className="mt-1 h-1.5 w-full overflow-hidden rounded-full bg-stone-200">
          <div
            className="h-full bg-gradient-to-r from-orange-400 to-orange-600 transition-all"
            style={{
              width: sizeOpt
                ? `${Math.min(100, (items.length / sizeOpt.maxItems) * 100)}%`
                : "0%",
            }}
          />
        </div>
        <div className="mt-2 flex items-baseline justify-between">
          <span className="text-[11px] text-stone-500">Tổng tạm tính</span>
          <span className="font-headline text-base font-bold text-stone-900 serif-display">
            {total.toLocaleString("vi-VN")}đ
          </span>
        </div>
      </section>
    </aside>
  );

  function InsidePanel() {
    return (
      <>
        <section>
          <p className="text-xs font-semibold text-stone-700">Màu hộp</p>
          <div className="mt-2 flex flex-wrap gap-2">
            {BOX_COLOR_OPTIONS.map((c) => {
              const active = boxColor === c.id;
              return (
                <button
                  key={c.id}
                  type="button"
                  onClick={() => setBoxColor(c.id)}
                  aria-label={c.label}
                  aria-pressed={active}
                  className={`h-7 w-7 rounded-full transition focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-orange-500 ${
                    active
                      ? "ring-4 ring-orange-300 ring-offset-2 ring-offset-white"
                      : "ring-1 ring-stone-300 hover:ring-orange-300"
                  }`}
                  style={{ background: c.swatch }}
                />
              );
            })}
          </div>
        </section>

        <section>
          <p className="text-xs font-semibold text-stone-700">Giấy rơm</p>
          <div className="mt-2 flex flex-col gap-1.5">
            {WRAP_COLOR_OPTIONS.map((w) => {
              const active = wrapColor === w.id;
              return (
                <button
                  key={w.id}
                  type="button"
                  onClick={() => setWrapColor(active ? null : w.id)}
                  aria-pressed={active}
                  className={`flex items-center justify-center gap-2 rounded-full px-3 py-1.5 text-xs font-semibold transition ${
                    active ? "ring-2 ring-orange-400" : "ring-1 ring-stone-200 hover:ring-orange-300"
                  }`}
                  style={{ background: w.pillBg, color: w.pillText }}
                >
                  <span
                    aria-hidden
                    className="h-3 w-3 rounded-full ring-1 ring-white/60"
                    style={{ background: w.hex }}
                  />
                  {w.label}
                </button>
              );
            })}
          </div>
        </section>

        <section>
          <p className="text-xs font-semibold text-stone-700">Phụ kiện</p>
          <div className="mt-2 flex flex-col gap-2">
            <div className="flex items-center justify-between gap-2 rounded-lg border border-stone-200 bg-stone-50 px-2.5 py-1.5">
              <span className="flex items-center gap-2">
                <Image
                  src="/decorator/photos/accessories/flower.png"
                  alt=""
                  width={22}
                  height={22}
                  unoptimized
                  className="object-contain"
                />
                <span className="flex flex-col leading-tight">
                  <span className="text-[11px] font-semibold text-stone-700">Hoa trang trí</span>
                  <span className="text-[10px] text-stone-500">
                    {EXTRA_PRICES.flower.toLocaleString("vi-VN")}đ · gắn cổ chai
                  </span>
                </span>
              </span>
              <Counter
                count={extras.flower}
                onDec={() => setExtra("flower", extras.flower - 1)}
                onInc={() => tryAddAccessory("flower")}
              />
            </div>
            <div className="flex items-center justify-between gap-2 rounded-lg border border-stone-200 bg-stone-50 px-2.5 py-1.5">
              <span className="flex items-center gap-2">
                <Image
                  src="/decorator/photos/accessories/ribbon.png"
                  alt=""
                  width={22}
                  height={22}
                  unoptimized
                  className="object-contain"
                />
                <span className="flex flex-col leading-tight">
                  <span className="text-[11px] font-semibold text-stone-700">Nơ trang trí</span>
                  <span className="text-[10px] text-stone-500">
                    {EXTRA_PRICES.ribbon.toLocaleString("vi-VN")}đ · gắn cổ chai
                  </span>
                </span>
              </span>
              <Counter
                count={extras.ribbon}
                onDec={() => setExtra("ribbon", extras.ribbon - 1)}
                onInc={() => tryAddAccessory("ribbon")}
              />
            </div>
            {accessoryAlert && (
              <p
                role="status"
                className="rounded-md border border-amber-300 bg-amber-50 px-2.5 py-1.5 text-[11px] text-amber-800"
              >
                {accessoryAlert}
              </p>
            )}
            {!accessoryAlert && bottleCount > 0 && (
              <p className="text-[10px] text-stone-500">
                Đã dùng {accessoryCount}/{bottleCount} phụ kiện.
              </p>
            )}
          </div>
        </section>
      </>
    );
  }

  function OutsidePanel() {
    return (
      <>
        <LidStyleSection
          current={lidStyle}
          onChange={setLidStyle}
          lidImage={lidImage}
          onUploadImage={setLidImage}
        />

        <section className="border-t border-stone-200 pt-4">
          <p className="text-xs font-semibold tracking-wide text-stone-700">Phụ kiện</p>
          <div className="mt-2 flex flex-col gap-2">
            <div
              className={`flex flex-col gap-2 rounded-xl border px-3 py-2.5 transition ${
                ribbon.enabled
                  ? "border-orange-300 bg-orange-50/70 shadow-[inset_0_0_0_1px_rgba(201,165,92,0.18)]"
                  : "border-stone-200 bg-white"
              }`}
            >
              <div className="flex items-center justify-between gap-2">
                <span className="flex items-center gap-2">
                  <ToggleSwitch
                    checked={ribbon.enabled}
                    onChange={setRibbonEnabled}
                    label="Bật/tắt nơ ruy băng"
                  />
                  <span className="flex flex-col leading-tight">
                    <span className="text-[12px] font-semibold text-stone-800">Nơ ruy băng</span>
                    <span className="text-[10px] text-stone-500">Satin cao cấp</span>
                  </span>
                </span>
                <span className="rounded-full bg-white px-2 py-0.5 text-[10px] font-semibold text-orange-700 ring-1 ring-orange-200">
                  +{RIBBON_PRICE.toLocaleString("vi-VN")}đ
                </span>
              </div>
              {ribbon.enabled && (
                <div className="flex flex-wrap items-center gap-1.5 pl-11">
                  {RIBBON_COLOR_OPTIONS.map((c) => {
                    const active = ribbon.color === c.id;
                    return (
                      <button
                        key={c.id}
                        type="button"
                        onClick={() => setRibbonColor(c.id)}
                        aria-label={c.label}
                        aria-pressed={active}
                        title={c.label}
                        className={`relative h-9 w-9 overflow-hidden rounded-md bg-white transition focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-orange-500 ${
                          active
                            ? "ring-[3px] ring-orange-400 ring-offset-1 ring-offset-white"
                            : "ring-1 ring-stone-300 hover:ring-orange-300"
                        }`}
                      >
                        <Image
                          src={c.photo}
                          alt=""
                          fill
                          unoptimized
                          className="object-contain p-0.5"
                          draggable={false}
                        />
                      </button>
                    );
                  })}
                </div>
              )}
            </div>
          </div>
        </section>
      </>
    );
  }
}

function LidStyleSection({
  current,
  onChange,
  lidImage,
  onUploadImage,
}: {
  current: LidStyle;
  onChange: (s: LidStyle) => void;
  lidImage: string | null;
  onUploadImage: (dataUrl: string | null) => void;
}) {
  const fileInputId = useId();
  const fileRef = useRef<HTMLInputElement>(null);
  const [error, setError] = useState<string | null>(null);

  const handleFile = async (file: File | null) => {
    setError(null);
    if (!file) return;
    if (!file.type.startsWith("image/")) {
      setError("Tệp phải là hình ảnh.");
      return;
    }
    if (file.size > MAX_LID_IMAGE_BYTES) {
      setError("Ảnh tối đa 2 MB.");
      return;
    }
    try {
      const dataUrl = await readAsDataURL(file);
      onUploadImage(dataUrl);
      onChange("image");
    } catch {
      setError("Không đọc được tệp.");
    }
  };

  const styles: Array<{
    id: LidStyle;
    label: string;
    hint: string;
    badge?: string;
  }> = [
    { id: "plain", label: "Nắp trơn", hint: "Giấy mỹ thuật, đơn sắc" },
    {
      id: "image",
      label: "Nắp in hình",
      hint: "In ảnh cá nhân",
      badge: `+${LID_IMAGE_PRICE.toLocaleString("vi-VN")}đ`,
    },
    {
      id: "transparent",
      label: "Nắp trong suốt",
      hint: "Acrylic nhìn xuyên",
      badge: `+${LID_TRANSPARENT_PRICE.toLocaleString("vi-VN")}đ`,
    },
    {
      id: "shrink",
      label: "Màng co",
      hint: "Bóng kính phủ ngoài",
      badge: `+${LID_SHRINK_PRICE.toLocaleString("vi-VN")}đ`,
    },
  ];

  return (
    <section>
      <p className="text-xs font-semibold tracking-wide text-stone-700">Mặt nắp</p>
      <div
        role="radiogroup"
        aria-label="Kiểu mặt nắp"
        className="mt-2 flex flex-col gap-1"
      >
        {styles.map((s) => {
          const active = current === s.id;
          return (
            <button
              key={s.id}
              type="button"
              role="radio"
              aria-checked={active}
              onClick={() => onChange(s.id)}
              className={`group flex items-center gap-2.5 rounded-lg px-2 py-2 text-left transition focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-orange-500 ${
                active
                  ? "bg-orange-50/80 ring-1 ring-orange-200"
                  : "hover:bg-stone-50"
              }`}
            >
              <span
                aria-hidden
                className={`relative h-5 w-9 shrink-0 rounded-full transition ${
                  active ? "bg-emerald-500" : "bg-stone-300"
                }`}
              >
                <span
                  className={`absolute top-0.5 h-4 w-4 rounded-full bg-white shadow transition-all ${
                    active ? "left-[18px]" : "left-0.5"
                  }`}
                />
              </span>
              <span className="flex flex-1 flex-col leading-tight">
                <span
                  className={`text-[12px] font-semibold transition ${
                    active ? "text-stone-900" : "text-stone-700"
                  }`}
                >
                  {s.label}
                </span>
                <span className="text-[10px] text-stone-500">{s.hint}</span>
              </span>
              {s.badge && (
                <span
                  className={`rounded-full px-1.5 py-0.5 text-[10px] font-semibold ring-1 transition ${
                    active
                      ? "bg-white text-orange-700 ring-orange-200"
                      : "bg-stone-50 text-stone-500 ring-stone-200"
                  }`}
                >
                  {s.badge}
                </span>
              )}
            </button>
          );
        })}
      </div>

      {current === "image" && (
        <div className="mt-3 flex flex-col gap-1.5 rounded-lg bg-stone-50 px-3 py-2.5 ring-1 ring-stone-200">
          <label
            htmlFor={fileInputId}
            className="cursor-pointer rounded-md border border-dashed border-orange-300 bg-white px-3 py-2 text-center text-[11px] font-semibold text-orange-700 hover:bg-orange-50"
          >
            {lidImage ? "Đổi ảnh khác" : "Chọn ảnh từ máy"}
          </label>
          <input
            ref={fileRef}
            id={fileInputId}
            type="file"
            accept="image/*"
            className="sr-only"
            onChange={(e) => handleFile(e.target.files?.[0] ?? null)}
          />
          {lidImage && (
            <button
              type="button"
              onClick={() => onUploadImage(null)}
              className="rounded-md border border-stone-200 bg-white px-3 py-1 text-[11px] text-stone-600 hover:bg-stone-100"
            >
              Xoá ảnh
            </button>
          )}
          {error && (
            <p role="status" className="text-[11px] text-red-600">
              {error}
            </p>
          )}
          <p className="text-[10px] text-stone-500">JPG/PNG, tối đa 2 MB.</p>
        </div>
      )}

      {current === "transparent" && (
        <p className="mt-3 rounded-lg bg-sky-50/70 px-3 py-2 text-[11px] text-sky-800 ring-1 ring-sky-100">
          Nắp acrylic mờ — nhìn xuyên thấy món quà bên trong.
        </p>
      )}

      {current === "shrink" && (
        <p className="mt-3 rounded-lg bg-stone-50 px-3 py-2 text-[11px] text-stone-600 ring-1 ring-stone-200">
          Màng co bóng kính, ôm sát hộp khi giao hàng.
        </p>
      )}
    </section>
  );
}

function readAsDataURL(file: File): Promise<string> {
  return new Promise((resolve, reject) => {
    const reader = new FileReader();
    reader.onload = () => resolve(String(reader.result ?? ""));
    reader.onerror = () => reject(reader.error);
    reader.readAsDataURL(file);
  });
}

function ToggleSwitch({
  checked,
  onChange,
  label,
}: {
  checked: boolean;
  onChange: (v: boolean) => void;
  label: string;
}) {
  return (
    <button
      type="button"
      role="switch"
      aria-checked={checked}
      aria-label={label}
      onClick={() => onChange(!checked)}
      className={`relative h-5 w-9 shrink-0 rounded-full transition focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-orange-500 ${
        checked ? "bg-orange-500" : "bg-stone-300"
      }`}
    >
      <span
        aria-hidden
        className={`absolute left-0.5 top-0.5 h-4 w-4 rounded-full bg-white shadow transition-transform ${
          checked ? "translate-x-4" : "translate-x-0"
        }`}
      />
    </button>
  );
}

function Counter({
  count,
  canInc = true,
  onDec,
  onInc,
}: {
  count: number;
  canInc?: boolean;
  onDec: () => void;
  onInc: () => void;
}) {
  return (
    <span className="flex items-center gap-1.5">
      <button
        type="button"
        onClick={onDec}
        disabled={count <= 0}
        aria-label="Giảm số lượng"
        className="flex h-6 w-6 items-center justify-center rounded-full border border-stone-200 bg-white text-stone-700 transition hover:border-orange-300 disabled:cursor-not-allowed disabled:opacity-40"
      >
        −
      </button>
      <span className="w-5 text-center text-xs font-bold text-stone-800">{count}</span>
      <button
        type="button"
        onClick={onInc}
        disabled={!canInc}
        aria-label="Tăng số lượng"
        className="flex h-6 w-6 items-center justify-center rounded-full border border-orange-500 bg-orange-500 text-white transition hover:bg-orange-600 hover:border-orange-600 disabled:cursor-not-allowed disabled:opacity-40 disabled:hover:bg-orange-500 disabled:hover:border-orange-500"
      >
        +
      </button>
    </span>
  );
}
