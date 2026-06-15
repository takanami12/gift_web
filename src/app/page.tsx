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
    <main ref={rootRef} className="bg-[#fefbf4] text-[#433b30]">
      <Analytics />

      {/* ─── Hero (Trang 1) — full-bleed background + left overlay ─── */}
      <section className="hero-bg">
        <Image
          src="/images/hero-trang1.png"
          alt="Gift Glamorous — Quà tặng sáng tạo độc bản"
          fill
          priority
          sizes="100vw"
          className="object-cover object-top"
        />
        <div className="hero-scrim" />

        <div className="hero-content">
          <p
            className="hero-eyebrow hero-stagger hero-stagger-1"
            style={{ fontFamily: "var(--font-barlow)" }}
          >
            Trải nghiệm mới
          </p>
          <h1
            className="hero-title hero-stagger hero-stagger-2"
            style={{ fontFamily: "var(--font-playfair)" }}
          >
            Quà tặng <br />
            sáng tạo <br />
            độc bản
          </h1>
          <p
            className="hero-desc hero-stagger hero-stagger-3"
            style={{ fontFamily: "var(--font-barlow)" }}
          >
            Gift Glamorous mở ra không gian sáng tạo<br />
            độc bản, nơi bạn tự tay lựa chọn và sắp xếp<br />
            các sản phẩm để tạo nên món quà ý nghĩa<br />
            và tinh tế nhất dành tặng người thương
          </p>
          <div className="hero-cta hero-stagger hero-stagger-4">
            <Link
              href="/thiet-ke"
              style={{ fontFamily: "var(--font-barlow)", fontSize: "16px", lineHeight: 1, padding: "15px 26px", whiteSpace: "nowrap" }}
              className="cocoon-btn-dark"
            >
              KHÁM PHÁ NGAY
              <span className="material-symbols-outlined text-xl">arrow_forward</span>
            </Link>
            <Link
              href="/san-pham"
              style={{ fontFamily: "var(--font-barlow)", fontSize: "16px", lineHeight: 1, whiteSpace: "nowrap" }}
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
        {/* Slogan slider (moved from Marquee+Partners section) */}
        <div
          className="marquee mb-14"
          style={{ ['--marquee-duration' as string]: '72s', ['--marquee-gap' as string]: '80px' }}
        >
          {[0, 1].map((i) => (
            <div className="marquee-track" key={i} aria-hidden={i === 1}>
              {Array.from({ length: 6 }).map((_, j) => (
                <span
                  key={j}
                  style={{ fontFamily: 'var(--font-luxurious-script)', color: '#b1997e', lineHeight: 1.3 }}
                  className="text-[clamp(34px,10vw,128px)]"
                >
                  Hãy mang bản sắc riêng vào từng hộp quà độc bản
                </span>
              ))}
            </div>
          ))}
        </div>

        <div className="max-w-[1500px] mx-auto px-6 grid grid-cols-1 lg:grid-cols-[1fr_2fr_1fr] gap-0 items-center" data-reveal>
          {/* Left – big heading (pushed right toward image) */}
          <div className="reveal-up lg:justify-self-end lg:w-fit text-left lg:pr-4">
            <h2
              style={{ fontFamily: "var(--font-playfair)", color: "#433b30", fontSize: "clamp(36px, 3.4vw, 58px)", lineHeight: 1.12, fontWeight: 400, fontStyle: "italic" }}
              className="whitespace-nowrap"
            >
              Giỏ quà <br />
              Sum Vầy <br />
              Đoàn Viên
            </h2>
            <div className="mt-6 h-px w-1/2 bg-[#433b30]" />
          </div>

          {/* Middle – image (container ratio matches image ratio so no letterbox) */}
          <div className="relative aspect-[636/538] reveal-scale">
            <Image
              src="/images/section2-anh-nen-2.png"
              alt="Giỏ hoa và quà Sum Vầy Trọn Tình Yêu"
              fill
              className="object-cover"
              sizes="(max-width: 1024px) 100vw, 60vw"
            />
          </div>

          {/* Right – para + CTA (pushed left toward image) */}
          <div className="reveal-up lg:justify-self-start lg:w-fit lg:max-w-[300px] lg:pl-4">
            <p
              style={{ fontFamily: "var(--font-barlow)", color: "#433b30", fontSize: "clamp(17px, 1.25vw, 20px)" }}
              className="font-light leading-relaxed mb-10"
            >
              Ngày Gia đình Việt Nam 28/6 là dịp ý nghĩa để mỗi chúng ta bày tỏ
              lòng biết ơn, sự quan tâm và gửi gắm tình cảm đến những người thân
              yêu nhất. Một món quà tinh tế trong dịp này sẽ giúp tôn vinh các
              giá trị bền vững và đem lại niềm vui ấm áp, gắn kết mọi thành viên
              trong gia đình.
            </p>
            <Link
              href="/san-pham"
              style={{ fontFamily: "var(--font-barlow-condensed)", color: "#433b30", fontSize: "18px", fontWeight: 700 }}
              className="inline-flex items-center gap-3 uppercase tracking-[0.15em] hover:gap-5 transition-all"
            >
              MUA NGAY
              <span className="material-symbols-outlined text-xl">arrow_forward</span>
            </Link>
          </div>
        </div>
      </section>

      {/* ─── Partners ─── */}
      <section className="bg-[#fefbf4] py-16">
        {/* Section label */}
        <h3
          style={{ fontFamily: 'var(--font-barlow-condensed)', color: '#433b30', fontSize: 'clamp(28px, 2.6vw, 44px)', fontWeight: 700 }}
          className="flex items-center justify-center gap-5 uppercase tracking-[0.1em] mb-10"
        >
          <span className="h-px w-16 bg-[#433b30]" />
          <span>KHÁCH HÀNG &amp; ĐỐI TÁC</span>
          <span className="h-px w-16 bg-[#433b30]" />
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
                    style={{ width: '246px', height: '170px' }}
                    className="relative shrink-0"
                  >
                    <Image
                      src={logo.src}
                      alt={logo.alt}
                      fill
                      sizes="520px"
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
                style={{ color: "#433b30", lineHeight: 1.05 }}
                className="text-5xl md:text-6xl"
              >
                <span style={{ fontFamily: "var(--font-playfair)" }} className="italic block">
                  Sản phẩm
                </span>
                <span
                  style={{ fontFamily: "var(--font-barlow-condensed)", fontWeight: 700 }}
                  className="uppercase tracking-wide block mt-1"
                >
                  Bán chạy
                </span>
              </h2>
              <div className="mt-5 h-px w-2/3 bg-[#433b30]" />
              <p
                style={{ fontFamily: "var(--font-nunito-sans)", color: "#433b30" }}
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
                    style={{ fontFamily: "var(--font-nunito-sans)", color: "#433b30", fontWeight: 700 }}
                    className="mt-5 text-lg"
                  >
                    {item.name}
                  </h3>
                  <p
                    style={{ fontFamily: "var(--font-nunito-sans)", color: "#433b30" }}
                    className="mt-2 text-xs leading-relaxed uppercase"
                  >
                    {item.desc}
                  </p>
                </Link>
                <div className="mt-3 flex items-center justify-between">
                  <p
                    style={{ fontFamily: "var(--font-nunito-sans)", color: "#433b30", fontWeight: 700 }}
                    className="text-base"
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
                      color: "#433b30",
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
            <p style={{ fontFamily: "var(--font-playfair)" }} className="text-2xl md:text-3xl italic leading-relaxed text-[#b1997e]">
              &ldquo;Thiết kế quà tặng sáng tạo <br />
              cho trải nghiệm độc bản&rdquo;
            </p>
            <p
              style={{ fontFamily: "var(--font-barlow-condensed)", color: "#433b30", fontWeight: 700 }}
              className="mt-8 flex items-center justify-center gap-5 text-base md:text-lg uppercase tracking-[0.05em]"
            >
              <span className="h-px w-12 bg-[#433b30]" />
              <span>Gift Glamorous</span>
              <span className="h-px w-12 bg-[#433b30]" />
            </p>
          </div>
        </div>
      </section>


    </main>
  );
}
