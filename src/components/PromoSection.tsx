"use client";
import { useCart } from '@/lib/cart-context';
import Image from "next/image";
import Link from "next/link";
import { useState } from "react";

export interface PromoItem {
  image: string;
  alt: string;
  description: string;
  discounted: number;
  savings: number;
}

export interface PromoSectionProps {
  title: string[];
  body: string;
  href?: string;
  bgImage: string;
  pageColor: string;
  /** Optional bottom-layer color behind the item grid (middle + right). */
  gridBg?: string;
  items: PromoItem[];
  /** Prefix for auto-generated item title: e.g. "Gratitude Grace" → "Gratitude Grace 1" */
  itemTitlePrefix?: string;
}

function formatVnd(n: number): string {
  return `${n.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ".")}đ`;
}

function PromoItemCard({
  item,
  index,
  titlePrefix,
}: {
  item: PromoItem;
  index: number;
  titlePrefix?: string;
}) {
  const [added, setAdded] = useState(false);
  const original = item.discounted + item.savings;
  const { addProduct } = useCart();

  const handleAdd = (e: React.MouseEvent) => {
    e.preventDefault();
    e.stopPropagation();
    if (added) return;
    setAdded(true);
    addProduct({
      slug: item.image, // dùng image làm slug tạm
      name: item.description,
      description: item.description,
      price: `${item.discounted.toLocaleString('vi-VN')}đ`,
      priceNumber: item.discounted,
      image: item.image,
    });
    setTimeout(() => setAdded(false), 1200);
  };

  return (
    <article className="group flex flex-col rounded-[16px] bg-white shadow-[0_18px_40px_-26px_rgba(67,59,48,0.5)]">
      {/* ── Image ── */}
      <div className="px-3 pt-3">
      <div className="relative aspect-square overflow-hidden rounded-[10px]">
        <Image
          src={item.image}
          alt={item.alt}
          fill
          quality={85}
          sizes="(max-width: 1024px) 50vw, 22vw"
          className="object-cover object-center transition-transform duration-[900ms] ease-out group-hover:scale-105"
        />

        {/* Savings badge */}
        <span
          className="absolute left-3 top-3 inline-flex items-center rounded-md bg-[#d8232a] px-2.5 py-1 text-white"
          style={{
            fontFamily: "var(--font-barlow)",
            fontWeight: 600,
            fontSize: "11px",
          }}
        >
          Tiết kiệm {formatVnd(item.savings)}
        </span>

        {/* Added-to-cart overlay */}
        <div
          className={`absolute inset-0 flex items-center justify-center transition-opacity duration-300 ${
            added ? "opacity-100" : "pointer-events-none opacity-0"
          }`}
          style={{ backgroundColor: "rgba(67, 59, 48, 0.8)" }}
        >
          <div className="text-center text-white">
            <span
              className="material-symbols-outlined mb-1 block text-4xl"
              style={{ fontVariationSettings: "'FILL' 1" }}
            >
              check_circle
            </span>
            <p style={{ fontFamily: "var(--font-barlow-condensed)", fontSize: "14px", letterSpacing: "0.15em", fontWeight: 700 }} className="uppercase">
              Đã thêm vào giỏ
            </p>
          </div>
        </div>
      </div>
      </div>

      {/* ── Content ── */}
      <div className="flex flex-1 flex-col px-4 pb-4 pt-3 lg:px-5 lg:pb-5">
        {/* Product line title */}
        {titlePrefix && (
          <p
            className="mb-1.5"
            style={{
              fontFamily: "var(--font-barlow-condensed)",
              color: "#433b30",
              fontSize: "15px",
              fontWeight: 700,
              letterSpacing: "0.06em",
              textTransform: "uppercase",
            }}
          >
            {titlePrefix} {index + 1}
          </p>
        )}

        {/* Description */}
        <p
          className="line-clamp-2 flex-1"
          style={{
            fontFamily: "var(--font-barlow)",
            color: "#433b30",
            fontSize: "14px",
            lineHeight: 1.45,
            fontWeight: 500,
          }}
        >
          {item.description}
        </p>

        {/* ── Bottom row: prices left · cart right ── */}
        <div className="mt-3 flex items-end justify-between gap-2">
          {/* Prices stacked, left-aligned */}
          <div className="flex flex-col">
            <span
              style={{
                fontFamily: "var(--font-barlow)",
                color: "#d8232a",
                fontWeight: 700,
                fontSize: "17px",
                lineHeight: 1.15,
              }}
            >
              Từ {formatVnd(item.discounted)}
            </span>
            <span
              className="line-through"
              style={{
                fontFamily: "var(--font-barlow)",
                color: "#433b30",
                opacity: 0.45,
                fontSize: "13px",
                lineHeight: 1.4,
              }}
            >
              {formatVnd(original)}
            </span>
          </div>

          {/* Cart button, right-aligned — matches ProductCard listing variant */}
          <button
            onClick={handleAdd}
            aria-label="Thêm vào giỏ hàng"
            className={`flex h-9 w-9 flex-shrink-0 cursor-pointer items-center justify-center gap-[1px] transition-all duration-300 ${
              added
                ? "bg-[#433b30] text-white"
                : "bg-[#ede1cc] text-[#433b30] hover:bg-[#d8c9a8]"
            }`}
          >
            {added ? (
              <span className="material-symbols-outlined" style={{ fontSize: "18px" }}>check</span>
            ) : (
              <span className="relative inline-flex items-center justify-center">
                <span className="material-symbols-outlined" style={{ fontSize: "22px" }}>shopping_bag</span>
                <span
                  className="absolute"
                  style={{
                    fontSize: "10px",
                    fontWeight: 900,
                    lineHeight: 1,
                    top: "54%",
                    left: "50%",
                    transform: "translate(-50%, -50%)",
                  }}
                >
                  +
                </span>
              </span>
            )}
          </button>
        </div>
      </div>
    </article>
  );
}

export default function PromoSection({
  title,
  body,
  href,
  bgImage,
  pageColor,
  gridBg,
  items,
  itemTitlePrefix,
}: PromoSectionProps) {
  return (
    <section style={{ backgroundColor: pageColor }} className="py-12 lg:py-16">
      <div
        data-reveal
        className="reveal-up max-w-[1500px] mx-auto px-6 md:px-8 grid grid-cols-1 lg:grid-cols-[1fr_2fr] gap-6 lg:gap-8 items-stretch"
      >
        {/* Left — text panel over bg image */}
        <div className="relative overflow-hidden rounded-[20px] min-h-[340px]">
          <div className="absolute inset-0 overflow-hidden">
            <Image
              src={bgImage}
              alt=""
              aria-hidden
              fill
              sizes="(max-width: 1024px) 100vw, 33vw"
              className="object-cover object-center scale-230"
            />
          </div>
          <div className="relative z-10 flex h-full flex-col justify-center p-8 lg:p-10">
            <h2
              style={{
                fontFamily: "var(--font-playfair)",
                color: "#433b30",
                fontWeight: 600,
                lineHeight: 1.1,
                fontSize: "clamp(30px, 2.8vw, 46px)",
              }}
            >
              {title.map((line, i) => (
                <span key={line}>
                  {i > 0 && <br />}
                  {line}
                </span>
              ))}
            </h2>
            <p
              className="mt-5 max-w-md"
              style={{
                fontFamily: "var(--font-barlow)",
                color: "#433b30",
                fontSize: "16px",
                lineHeight: 1.6,
              }}
            >
              {body}
            </p>
            {href && (
              <Link
                href={href}
                className="group mt-8 inline-flex w-fit items-center gap-2.5 border border-[#433b30] bg-transparent px-7 py-3 text-[#433b30] transition-all hover:gap-4"
                style={{
                  fontFamily: "var(--font-barlow)",
                  fontWeight: 600,
                  letterSpacing: "0.12em",
                  fontSize: "15px",
                  textTransform: "uppercase",
                }}
              >
                XEM TẤT CẢ
                <span className="material-symbols-outlined text-lg transition-transform group-hover:translate-x-1">
                  arrow_forward
                </span>
              </Link>
            )}
          </div>
        </div>

        {/* Right — 4 item cards */}
        <div
          className={`grid grid-cols-2 lg:grid-cols-4 gap-[2px] ${
            gridBg ? "rounded-[16px] p-[10px]" : ""
          }`}
          style={gridBg ? { backgroundColor: gridBg } : undefined}
        >
          {items.map((item, index) => (
            <PromoItemCard
              key={item.image}
              item={item}
              index={index}
              titlePrefix={itemTitlePrefix}
            />
          ))}
        </div>
      </div>
    </section>
  );
}
