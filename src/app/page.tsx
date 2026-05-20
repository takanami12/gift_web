"use client";

import Image from "next/image";
import Link from "next/link";
import ProductCard from "@/components/ProductCard";
import { bestsellers } from "@/lib/data";
import type { Product } from "@/lib/data";
import { useCart } from "@/lib/cart-context";
import { useEffect, useRef } from "react";
import { Analytics } from "@vercel/analytics/next"

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
      { threshold: 0.1, rootMargin: "0px 0px -50px 0px" }
    );
    targets.forEach((t) => observer.observe(t));
    return () => observer.disconnect();
  }, []);
  return ref;
}

export default function HomePage() {
  const rootRef = useScrollReveal();
  const { addProduct } = useCart();

  return (
    <main ref={rootRef} className="bg-[#fefbf4] text-stone-800">
      <Analytics />

      {/* ─── Hero Section (Split 60/40 – Family Day Edition) ─── */}
      <section className="hero-split">
        {/* Left - Family Day Image (text baked in) */}
        <div className="relative min-h-[420px] lg:min-h-0 overflow-hidden bg-[#fefbf4]">
          <Image
            src="/images/hero-family-day.png"
            alt="Mừng ngày Gia đình Việt Nam 28/6 — Tặng quà, Trao yêu thương"
            fill
            className="object-cover"
            priority
          />
        </div>

        {/* Right - Content */}
        <div className="hero-dark">
          <p
            style={{ fontFamily: "var(--font-barlow-condensed)", fontSize: "28px" }}
            className="uppercase tracking-[0.05em] font-semibold text-stone-700 mb-6 hero-stagger hero-stagger-1"
          >
            Trải nghiệm mới
          </p>
          <h1
            style={{ fontFamily: "var(--font-vollkorn)" }}
            className="text-4xl md:text-6xl lg:text-7xl leading-[1.05] mb-8 text-stone-900 hero-stagger hero-stagger-2"
          >
            Quà tặng <br />
            sáng tạo <br />
            độc bản
          </h1>
          <p
            style={{ fontFamily: "var(--font-nunito-sans)", color: "#1f1c17" }}
            className="text-base font-light leading-relaxed mb-10 max-w-md hero-stagger hero-stagger-3"
          >
            Gift Glamorous mở ra không gian sáng tạo tự do, nơi bạn tự tay lựa chọn
            và sắp xếp các vật phẩm để tạo ra món quà độc bản. Hãy để chúng tôi cùng
            bạn gửi gắm trọn vẹn tâm huyết và bản sắc riêng vào từng hộp quà nhé!
          </p>
          <div className="flex flex-nowrap items-center gap-4 hero-stagger hero-stagger-4">
            <Link
              href="/thiet-ke"
              style={{ fontFamily: "var(--font-barlow-condensed)", fontSize: "18px", lineHeight: 1, padding: "14px 22px", whiteSpace: "nowrap" }}
              className="cocoon-btn-dark"
            >
              KHÁM PHÁ NGAY
              <span className="material-symbols-outlined text-xl">arrow_forward</span>
            </Link>
            <Link
              href="/san-pham"
              style={{ fontFamily: "var(--font-barlow-condensed)", fontSize: "18px", lineHeight: 1, whiteSpace: "nowrap" }}
              className="cocoon-btn-link-dark"
            >
              XEM BỘ SƯU TẬP
              <span className="material-symbols-outlined text-xl">arrow_forward</span>
            </Link>
          </div>
        </div>
      </section>

      {/* ─── Featured Story (Family Day) – 3 columns ─── */}
      <section className="section-padding bg-[#fefbf4]">
        <div className="max-w-[1500px] mx-auto px-6 grid grid-cols-1 lg:grid-cols-[1fr_2fr_1fr] gap-0 items-center" data-reveal>
          {/* Left – big heading (pushed right toward image) */}
          <div className="reveal-up lg:justify-self-end lg:w-fit text-left lg:pr-4">
            <h2
              style={{ fontFamily: "var(--font-vollkorn)", color: "#000", fontSize: "clamp(28px, 2.4vw, 40px)", lineHeight: 1.15 }}
              className="whitespace-nowrap"
            >
              Giỏ hoa và quà <br />
              <span>Sum Vầy</span> <br />
              <span>Trọn Tình Yêu</span>
            </h2>
          </div>

          {/* Middle – image (container ratio matches image ratio so no letterbox) */}
          <div className="relative aspect-[636/538] reveal-scale">
            <Image
              src="/images/section2-sum-vay.png"
              alt="Giỏ hoa và quà Sum Vầy Trọn Tình Yêu"
              fill
              className="object-cover"
              sizes="(max-width: 1024px) 100vw, 60vw"
            />
          </div>

          {/* Right – para + CTA (pushed left toward image) */}
          <div className="reveal-up lg:justify-self-start lg:w-fit lg:max-w-[240px] lg:pl-4">
            <p
              style={{ fontFamily: "var(--font-nunito-sans)", color: "#71716e" }}
              className="text-base font-light leading-relaxed mb-10"
            >
              Ngày Gia đình Việt Nam 28/6 là dịp ý nghĩa để mỗi chúng ta bày tỏ
              lòng biết ơn, sự quan tâm và gửi gắm tình cảm đến những người thân
              yêu nhất. Một món quà tinh tế trong dịp này sẽ giúp tôn vinh các
              giá trị bền vững và đem lại niềm vui ấm áp, gắn kết mọi thành viên
              trong gia đình.
            </p>
            <Link
              href="/san-pham"
              style={{ fontFamily: "var(--font-barlow-condensed)", color: "#1f1c17" }}
              className="inline-flex items-center gap-3 text-base font-semibold uppercase tracking-[0.15em] hover:gap-5 transition-all"
            >
              MUA NGAY
              <span className="material-symbols-outlined text-xl">arrow_forward</span>
            </Link>
          </div>
        </div>
      </section>

      {/* ─── Marquee + Partners ─── */}
      <section className="bg-[#fefbf4] py-16">
        {/* Slider 1 – fast scrolling slogan */}
        <div
          className="marquee mb-14"
          style={{ ['--marquee-duration' as string]: '72s', ['--marquee-gap' as string]: '80px' }}
        >
          {[0, 1].map((i) => (
            <div className="marquee-track" key={i} aria-hidden={i === 1}>
              {Array.from({ length: 6 }).map((_, j) => (
                <span
                  key={j}
                  style={{ fontFamily: 'var(--font-anton)', color: '#1f1c17', lineHeight: 1.25 }}
                  className="text-[clamp(28px,4.5vw,72px)] uppercase tracking-tight"
                >
                  Thiết kế quà tặng sáng tạo cho trải nghiệm độc bản
                </span>
              ))}
            </div>
          ))}
        </div>

        {/* Section label */}
        <h3
          style={{ fontFamily: 'var(--font-barlow-condensed)', color: '#1f1c17' }}
          className="text-center uppercase tracking-[0.25em] text-2xl md:text-3xl font-semibold mb-10"
        >
          Đối tác của Gift Glamorous
        </h3>

        {/* Slider 2 – partner logos, slower */}
        <div
          className="marquee mt-16"
          style={{ ['--marquee-duration' as string]: '80s', ['--marquee-gap' as string]: '24px' }}
        >
          {[0, 1].map((i) => {
            const logos = [
              { src: '/images/logos/bavieco.png', alt: 'Ba Vì Eco' },
              { src: '/images/logos/nestle.png', alt: 'Nestlé' },
              { src: '/images/logos/nui-tan-ba-vi.png', alt: 'Núi Tản Ba Vì' },
              { src: '/images/logos/topcv.png', alt: 'TopCV' },
              { src: '/images/logos/vnu.png', alt: 'VNU' },
            ];
            const interleaved = Array.from({ length: 3 }).flatMap(() => logos);
            return (
              <div className="marquee-track" key={i} aria-hidden={i === 1}>
                {interleaved.map((logo, idx) => (
                  <div
                    key={`${i}-${idx}`}
                    style={{ width: '460px', height: '320px' }}
                    className="relative shrink-0"
                  >
                    <Image
                      src={logo.src}
                      alt={logo.alt}
                      fill
                      sizes="780px"
                      className="object-contain"
                    />
                  </div>
                ))}
              </div>
            );
          })}
        </div>
      </section>

      {/* ─── Bestsellers (4-column: title + 3 items) ─── */}
      <section className="section-padding bg-[#fefbf4]">
        <div className="max-w-[1500px] mx-auto px-8">
          <div className="grid grid-cols-1 lg:grid-cols-[1fr_1fr_1fr_1fr] gap-10 items-center">
            {/* Title column */}
            <div data-reveal className="reveal-left">
              <h2
                style={{ color: "#1f1c17", lineHeight: 1.05 }}
                className="text-5xl md:text-6xl"
              >
                <span style={{ fontFamily: "var(--font-vollkorn)" }} className="italic block">
                  Sản phẩm
                </span>
                <span
                  style={{ fontFamily: "var(--font-barlow-condensed)" }}
                  className="uppercase font-bold tracking-wide block mt-1"
                >
                  Bán chạy
                </span>
              </h2>
              <p
                style={{ fontFamily: "var(--font-nunito-sans)", color: "#71716e" }}
                className="mt-6 text-sm leading-relaxed max-w-[280px]"
              >
                Khám phá những giỏ quà tặng được yêu thích nhất tại Gift Glamorous
                – nơi chất lượng cao cấp hòa quyện cùng tâm huyết và lòng chân
                thành của người tặng.
              </p>
            </div>

            {[
              {
                src: "/images/bestseller-sum-vay.png",
                name: "Giỏ Quà Sum Vầy",
                desc: "Ngũ cốc óc chó, nấm sấy Úc, kẹo Đức và trà chanh mật ong Hàn.",
                price: "1.015.000 đ",
                priceNumber: 1_015_000,
                slug: "gio-qua-sum-vay",
              },
              {
                src: "/images/bestseller-tron-ven.png",
                name: "Hộp Quà Trọn Vẹn",
                desc: "Cà phê Starbucks, sô-cô-la hạnh nhân tiramisu và ly thủy tinh bọc da.",
                price: "300.000 đ",
                priceNumber: 300_000,
                slug: "hop-qua-tron-ven",
              },
              {
                src: "/images/bestseller-dong-day.png",
                name: "Giỏ Quà Đong Đầy",
                desc: "Nước ép táo hữu cơ Mỹ, bánh quy Nhật và mật ong Miele nguyên chất.",
                price: "762.000 đ",
                priceNumber: 762_000,
                slug: "gio-qua-dong-day",
              },
            ].map((item, i) => (
              <div
                key={item.slug}
                data-reveal
                style={{ transitionDelay: `${i * 80}ms` }}
                className="reveal-up"
              >
                <Link href={`/san-pham/${item.slug}`} className="block">
                  <div
                    style={{ backgroundColor: "#f2eee5" }}
                    className="relative aspect-square overflow-hidden"
                  >
                    <Image
                      src={item.src}
                      alt={item.name}
                      fill
                      className="object-contain p-6"
                      sizes="(max-width: 1024px) 100vw, 25vw"
                    />
                  </div>
                  <h3
                    style={{ fontFamily: "var(--font-nunito-sans)", color: "#1f1c17" }}
                    className="mt-5 text-lg font-semibold"
                  >
                    {item.name}
                  </h3>
                  <p
                    style={{ fontFamily: "var(--font-nunito-sans)", color: "#71716e" }}
                    className="mt-2 text-xs leading-relaxed"
                  >
                    {item.desc}
                  </p>
                </Link>
                <div className="mt-3 flex items-center justify-between">
                  <p
                    style={{ fontFamily: "var(--font-nunito-sans)", color: "#1f1c17" }}
                    className="text-base font-semibold"
                  >
                    {item.price}
                  </p>
                  <button
                    type="button"
                    aria-label={`Thêm ${item.name} vào giỏ`}
                    onClick={(e) => {
                      e.preventDefault();
                      e.stopPropagation();
                      const product: Product = {
                        slug: item.slug,
                        name: item.name,
                        description: item.desc,
                        price: item.price,
                        priceNumber: item.priceNumber,
                        image: item.src,
                      };
                      addProduct(product);
                    }}
                    style={{
                      border: "none",
                      backgroundColor: "#ede1cc",
                      color: "#1f1c17",
                      width: "44px",
                      height: "44px",
                    }}
                    className="bestseller-cart-btn inline-flex items-center justify-center cursor-pointer"
                  >
                    <span className="material-symbols-outlined text-lg">add_shopping_cart</span>
                  </button>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ─── Quote Section ─── */}
      <section className="quote-section">
        <div className="max-w-3xl mx-auto px-8 text-center" data-reveal>
          <div className="reveal-up">
            <p className="text-2xl md:text-3xl font-serif italic leading-relaxed text-[#b8a87a]">
              &ldquo;Gift Glamorous – Nghệ thuật quà tặng <br />
              cho nét đẹp thuần Việt&rdquo;
            </p>
          </div>
        </div>
      </section>


    </main>
  );
}
