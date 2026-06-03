"use client";

import Image from "next/image";
import Link from "next/link";
import { useEffect, useRef } from "react";
import PromoSection, { type PromoSectionProps } from "@/components/PromoSection";

function useScrollReveal() {
  const ref = useRef<HTMLDivElement>(null);
  useEffect(() => {
    const el = ref.current;
    if (!el) return;
    const targets = el.querySelectorAll<HTMLElement>("[data-reveal]");
    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            entry.target.classList.add("revealed");
            observer.unobserve(entry.target);
          }
        });
      },
      { threshold: 0.12, rootMargin: "0px 0px -60px 0px" },
    );
    targets.forEach((t) => observer.observe(t));
    return () => observer.disconnect();
  }, []);
  return ref;
}

const heroImages = [
  { src: "/images/BST1.png", alt: "Giỏ hoa quả tặng cao cấp" },
  { src: "/images/BST2.png", alt: "Giỏ quà trái cây sum vầy" },
  { src: "/images/BST3.png", alt: "Hộp quà bánh kẹo tinh tế" },
];

// Trang 2 — Ngày Nhà giáo Việt Nam (20-11)
const nhaGiaoPromo: PromoSectionProps = {
  title: ["Ngày Nhà giáo", "Việt Nam"],
  body: "Hành trình vươn xa của học trò luôn có bóng dáng những người đưa đò thầm lặng. Thức quà trọn vị này thay lời cảm ơn sâu sắc, kính chúc Thầy Cô luôn bình an, hạnh phúc.",
  href: "/collection/20-11",
  bgImage: "/images/bg2.png",
  pageColor: "#ddb4c3",
  items: [
    {
      image: "/images/nha-giao-1.png",
      alt: "Giỏ quà trái cây Lê, Kiwi, Cam và hoa tươi",
      description: "Giỏ Quà Trái Cây - Lê, Kiwi, Cam, Hoa Tươi",
      discounted: 674000,
      savings: 68000,
    },
    {
      image: "/images/nha-giao-2.png",
      alt: "Hộp vali quà trái cây cam vàng, kiwi, táo đỏ",
      description: "Hộp Vali Quà Trái Cây Cam Vàng, Kiwi, Táo Đỏ Sang Trọng",
      discounted: 1370000,
      savings: 137000,
    },
    {
      image: "/images/nha-giao-3.png",
      alt: "Hộp quà tròn trái cây cherry đỏ, dâu Hàn",
      description: "Hộp Quà Tròn Trái Cây– Cherry đỏ, Dâu Hàn, Biếu Tặng Đa Dạng Các Dịp",
      discounted: 1176000,
      savings: 118000,
    },
    {
      image: "/images/nha-giao-4.png",
      alt: "Hộp quà trái cây dâu Hàn, kiwi vàng và sữa hạt dinh dưỡng",
      description: "Hộp Quà Trái Cây Dâu Hàn, Kiwi Vàng & Sữa Hạt Dinh Dưỡng",
      discounted: 919000,
      savings: 92000,
    },
  ],
};

// Trang 3 — Trung Thu
const trungThuPromo: PromoSectionProps = {
  title: ["Trung Thu"],
  body: "Dưới ánh trăng rằm, mọi khoảng cách đều nhường chỗ cho sự gắn kết tình thân. Những thức quà tinh chọn này thay lời chúc về một mùa đoàn viên ấm áp, bình dị bên những người thương yêu.",
  href: "/collection/trung-thu",
  bgImage: "/images/bg3.png",
  pageColor: "#d2bda2",
  items: [
    {
      image: "/images/trung-thu-1.png",
      alt: "Hộp quà bánh trung thu trái cây sang trọng Fusion Moon 1",
      description: "Hộp Quà Bánh Trung Thu Trái Cây Sang Trọng Fusion Moon 1",
      discounted: 793000,
      savings: 157000,
    },
    {
      image: "/images/trung-thu-2.png",
      alt: "Hộp quà bánh trung thu trái cây Fusion Moon 2",
      description: "Hộp Quà Bánh Trung Thu Trái Cây Fusion Moon 2",
      discounted: 1350000,
      savings: 109000,
    },
    {
      image: "/images/trung-thu-3.png",
      alt: "Hộp quà bánh trung thu trái cây truyền thống Fusion Moon 3",
      description: "Hộp Quà Bánh Trung Thu Trái Cây Truyền Thống Fusion Moon 3",
      discounted: 674000,
      savings: 68000,
    },
    {
      image: "/images/trung-thu-4.png",
      alt: "Hộp quà bánh trung thu trái cây cổ điển Fusion Moon 4",
      description: "Hộp Quà Bánh Trung Thu Trái Cây Cổ Điển Fusion Moon 4",
      discounted: 949000,
      savings: 150000,
    },
  ],
};

export default function CollectionShowcase() {
  const rootRef = useScrollReveal();

  return (
    <main
      ref={rootRef}
      className="bg-[#fefbf4] text-[#433b30] overflow-hidden"
    >
      {/* ─── Hero ─── */}
      <section className="relative isolate bg-[#3d3930]">
        {/* background — object-cover always fills, scaled up */}
        <div className="absolute inset-0 -z-10 overflow-hidden">
          <Image
            src="/images/bg1.png"
            alt=""
            aria-hidden
            fill
            priority
            sizes="100vw"
            className="object-cover scale-125"
          />
        </div>

        <div className="max-w-[1500px] mx-auto grid grid-cols-1 lg:grid-cols-2 gap-10 lg:gap-16 items-stretch min-h-[clamp(560px,72vh,820px)]">
          {/* Left — centered copy */}
          <div className="flex flex-col items-center justify-center text-center px-6 md:px-8 py-16 lg:py-24">
            <span
              className="hero-stagger hero-stagger-1 inline-flex items-center rounded-full border border-white/45 px-5 py-2 text-white"
              style={{
                fontFamily: "var(--font-barlow-condensed)",
                fontWeight: 600,
                letterSpacing: "0.26em",
                fontSize: "13px",
                textTransform: "uppercase",
              }}
            >
              Bộ Sưu Tập Mới
            </span>

            <h1
              className="hero-stagger hero-stagger-2 mt-7"
              style={{
                fontFamily: "var(--font-playfair)",
                fontWeight: 600,
                color: "#f8e376",
                lineHeight: 1.08,
                fontSize: "clamp(40px, 4.6vw, 72px)",
              }}
            >
              Những Tuyệt Tác
              <br />
              Quà Tặng Mới Nhất
            </h1>

            <p
              className="hero-stagger hero-stagger-3 mt-5 text-white"
              style={{
                fontFamily: "var(--font-luxurious-script)",
                fontSize: "clamp(26px, 2.6vw, 40px)",
                lineHeight: 1.2,
              }}
            >
              Tinh tế trong từng chi tiết - Hoàn hảo cho mọi sự kiện
            </p>

            <Link
              href="/san-pham"
              className="hero-stagger hero-stagger-4 group mt-10 inline-flex items-center gap-3 rounded-full px-9 py-4 transition-all hover:gap-5"
              style={{
                backgroundColor: "#f8e376",
                color: "#433b30",
                fontFamily: "var(--font-barlow-condensed)",
                fontWeight: 700,
                letterSpacing: "0.14em",
                fontSize: "17px",
                textTransform: "uppercase",
              }}
            >
              Khám Phá Ngay
              <span className="material-symbols-outlined text-xl transition-transform group-hover:translate-x-1">
                arrow_forward
              </span>
            </Link>
          </div>

          {/* Right — 3 gift frames in a row, ~10px top/bottom inset */}
          <div className="hero-stagger hero-stagger-3 grid grid-cols-3 gap-3 sm:gap-4 items-stretch h-full py-[10px] pr-6 md:pr-8">
            {heroImages.map((img) => (
              <div
                key={img.src}
                className="group relative h-full min-h-[320px] overflow-hidden rounded-2xl shadow-[0_26px_60px_-28px_rgba(0,0,0,0.65)]"
              >
                <Image
                  src={img.src}
                  alt={img.alt}
                  fill
                  priority
                  quality={90}
                  sizes="(max-width: 1024px) 50vw, 33vw"
                  className="object-cover object-center transition-transform duration-[1200ms] ease-out group-hover:scale-105"
                />
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ─── Trang 2 — Ngày Nhà giáo Việt Nam ─── */}
      <PromoSection {...nhaGiaoPromo} />

      {/* ─── Trang 3 — Trung Thu ─── */}
      <PromoSection {...trungThuPromo} />

    </main>
  );
}
