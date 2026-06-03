"use client";

import Image from "next/image";
import Link from "next/link";

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
}

function formatVnd(n: number): string {
  return `${n.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ".")}đ`;
}

export default function PromoSection({
  title,
  body,
  href,
  bgImage,
  pageColor,
  gridBg,
  items,
}: PromoSectionProps) {
  return (
    <section style={{ backgroundColor: pageColor }} className="py-12 lg:py-16">
      <div
        data-reveal
        className="reveal-up max-w-[1500px] mx-auto px-6 md:px-8 grid grid-cols-1 lg:grid-cols-[1fr_2fr] gap-6 lg:gap-8 items-stretch"
      >
        {/* Left — text panel over bg image (inset 10px top/bottom, scaled up) */}
        <div className="relative overflow-hidden rounded-[20px] min-h-[340px]">
          <div className="absolute inset-x-0 top-[10px] bottom-[10px] overflow-hidden">
            <Image
              src={bgImage}
              alt=""
              aria-hidden
              fill
              sizes="(max-width: 1024px) 100vw, 33vw"
              className="object-cover scale-150"
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

        {/* Middle + Right — 4 items in a single row */}
        <div
          className={`grid grid-cols-2 lg:grid-cols-4 gap-[2px] ${
            gridBg ? "rounded-[16px] p-[10px]" : ""
          }`}
          style={gridBg ? { backgroundColor: gridBg } : undefined}
        >
          {items.map((item) => {
            const original = item.discounted + item.savings;
            return (
              <article
                key={item.image}
                className="group flex flex-col overflow-hidden rounded-[16px] bg-white pt-[15px] shadow-[0_18px_40px_-26px_rgba(67,59,48,0.5)]"
              >
                <div className="relative aspect-[16/9] overflow-hidden">
                  <Image
                    src={item.image}
                    alt={item.alt}
                    fill
                    quality={85}
                    sizes="(max-width: 1024px) 50vw, 22vw"
                    className="object-cover transition-transform duration-[900ms] ease-out group-hover:scale-105"
                  />
                  <span
                    className="absolute left-3 top-3 inline-flex items-center rounded-md bg-[#d8232a] px-2.5 py-1 text-white"
                    style={{
                      fontFamily: "var(--font-barlow)",
                      fontWeight: 600,
                      fontSize: "12px",
                    }}
                  >
                    Tiết kiệm {formatVnd(item.savings)}
                  </span>
                </div>

                <div className="flex flex-1 flex-col p-4 lg:p-5">
                  <p
                    className="line-clamp-2"
                    style={{
                      fontFamily: "var(--font-barlow)",
                      color: "#433b30",
                      fontSize: "15px",
                      lineHeight: 1.45,
                      fontWeight: 500,
                    }}
                  >
                    {item.description}
                  </p>
                  <div className="mt-auto flex flex-wrap items-baseline gap-x-2.5 gap-y-1 pt-4">
                    <span
                      style={{
                        fontFamily: "var(--font-barlow)",
                        color: "#d8232a",
                        fontWeight: 700,
                        fontSize: "18px",
                      }}
                    >
                      Từ {formatVnd(item.discounted)}
                    </span>
                    <span
                      className="line-through"
                      style={{
                        fontFamily: "var(--font-barlow)",
                        color: "#433b30",
                        opacity: 0.5,
                        fontSize: "14px",
                      }}
                    >
                      {formatVnd(original)}
                    </span>
                  </div>
                </div>
              </article>
            );
          })}
        </div>
      </div>
    </section>
  );
}
