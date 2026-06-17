"use client";

import Image from "next/image";
import Link from "next/link";
import { useState } from "react";
import type { Product } from "@/lib/data";
import { useCart } from "@/lib/cart-context";

interface ProductCardProps {
  product: Product;
  variant?: "default" | "listing" | "related";
}

export default function ProductCard({
  product,
  variant = "default",
}: ProductCardProps) {
  const { addProduct } = useCart();
  const [added, setAdded] = useState(false);

  const handleAdd = (e: React.MouseEvent) => {
    e.preventDefault();
    e.stopPropagation();
    addProduct(product);
    setAdded(true);
    setTimeout(() => setAdded(false), 1200);
  };

  if (variant === "listing") {
    return (
      <div className="group cursor-default">
        <div className="aspect-[1/1.2] overflow-hidden bg-[#f5f3ed] mb-5 relative">
          {product.savings && (
            <div className="absolute top-3 left-3 z-10 bg-[#d8232a] text-white px-3 py-1 text-xs font-bold">
              Tiết kiệm {product.savings.toLocaleString("vi-VN")}đ
            </div>
          )}
          <Image
            src={product.image}
            alt={product.name}
            fill
            className={`${product.imageContain ? 'object-contain p-4' : 'object-cover'} transition-transform duration-1000 group-hover:scale-105`}
            sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
          />
          {product.badge && (
            <div className="absolute top-0 left-0">
              <span className="bg-[#2d4a3e] text-white px-3 py-1.5 text-[9px] font-bold tracking-[0.2em] uppercase">
                {product.badge}
              </span>
            </div>
          )}

          {/* Added feedback overlay */}
          <div
            className={`absolute inset-0 flex items-center justify-center transition-opacity duration-300 ${
              added ? "opacity-100" : "opacity-0 pointer-events-none"
            }`}
            style={{ backgroundColor: "rgba(67, 59, 48, 0.8)" }}
          >
            <div className="text-white text-center animate-fade-in">
              <span
                className="material-symbols-outlined text-4xl mb-2 block"
                style={{ fontVariationSettings: "'FILL' 1" }}
              >
                check_circle
              </span>
              <p style={{ fontFamily: "var(--font-barlow-condensed)", fontSize: "16px", letterSpacing: "0.15em" }} className="font-bold uppercase">
                Đã thêm vào giỏ
              </p>
            </div>
          </div>
        </div>
        <h3 style={{ fontFamily: "var(--font-barlow)", color: "#433b30", fontWeight: 700 }} className="text-lg mb-1 transition-colors duration-300">
          {product.name}
        </h3>
        <p style={{ fontFamily: "var(--font-barlow)", color: "#433b30" }} className="text-sm mb-3 line-clamp-1 font-light">
          {product.description}
        </p>
        <div className="flex items-center justify-between">
          <div className="flex flex-col">
            <span style={{ fontFamily: "var(--font-barlow)", color: "#d8232a" }} className="font-bold">
              Từ {product.price}
            </span>
            {product.originalPrice && (
              <span style={{ fontFamily: "var(--font-barlow)", color: "#433b30", opacity: 0.45, fontSize: "13px", textDecoration: "line-through" }}>
                {product.originalPrice.toLocaleString("vi-VN")}đ
              </span>
            )}
          </div>
          <button
            onClick={handleAdd}
            className={`w-9 h-9 flex items-center justify-center transition-all duration-300 cursor-pointer ${
              added
                ? "bg-[#433b30] text-white"
                : "text-white hover:opacity-80"
            }`}
            style={{ backgroundColor: added ? "#433b30" : "#eedecd" }}
          >
            <span className="material-symbols-outlined text-lg" style={{ color: "#433b30" }}>
              {added ? "check" : "shopping_bag"}
            </span>
          </button>
        </div>
      </div>
    );
  }

  if (variant === "related") {
    return (
      <Link href={`/san-pham/${product.slug}`} className="group cursor-pointer">
        <div className="aspect-[3/4] overflow-hidden bg-[#f5f3ed] relative">
          <Image
            src={product.image}
            alt={product.name}
            fill
            className="object-cover group-hover:scale-105 transition-transform duration-1000"
            sizes="(max-width: 768px) 100vw, 33vw"
          />
          <div className="absolute inset-x-0 bottom-0 p-6 bg-gradient-to-t from-black/50 to-transparent translate-y-full group-hover:translate-y-0 transition-transform duration-500">
            <button className="w-full bg-white text-stone-900 py-3 text-xs font-bold tracking-widest uppercase cursor-pointer">
              Xem chi tiết
            </button>
          </div>
        </div>
        <div className="mt-4 flex justify-between items-start">
          <div>
            <h3 className="font-serif text-lg text-stone-900">
              {product.name}
            </h3>
            <p className="text-stone-400 text-sm mt-1 font-light">
              {product.description}
            </p>
          </div>
          <span className="text-[#2d4a3e] font-bold text-sm">{product.price}</span>
        </div>
      </Link>
    );
  }

  // Default - homepage bestseller card (Cocoon style)
  return (
    <Link href={`/san-pham/${product.slug}`} className="group">
      <div className="cocoon-product-card p-4 transition-colors duration-500 group-hover:bg-stone-900">
        <div className="aspect-[4/5] overflow-hidden bg-[#edeae3] mb-4 relative">
          <Image
            src={product.image}
            alt={product.name}
            fill
            className="object-cover transition-transform duration-1000 group-hover:scale-105"
            sizes="(max-width: 640px) 100vw, (max-width: 768px) 50vw, 25vw"
          />
          {product.badge && (
            <div className="absolute top-0 left-0">
              <span
                className={`text-[9px] font-bold px-3 py-1.5 uppercase tracking-[0.15em] ${
                  product.badgeType === "new"
                    ? "bg-[#f0d96b] text-stone-800"
                    : "bg-[#2d4a3e] text-white"
                }`}
              >
                {product.badge}
              </span>
            </div>
          )}
          {/* Added feedback overlay */}
          <div
            className={`absolute inset-0 bg-[#2d4a3e]/80 flex items-center justify-center transition-opacity duration-300 z-10 ${
              added ? "opacity-100" : "opacity-0 pointer-events-none"
            }`}
          >
            <div className="text-white text-center animate-fade-in">
              <span
                className="material-symbols-outlined text-3xl mb-1 block"
                style={{ fontVariationSettings: "'FILL' 1" }}
              >
                check_circle
              </span>
              <p className="text-[10px] font-bold tracking-widest uppercase">
                Đã thêm
              </p>
            </div>
          </div>
        </div>
        <h4 className="font-serif text-base mb-1 text-stone-800 transition-colors duration-500 group-hover:text-white">
          {product.name}
        </h4>
        <p className="text-stone-400 text-[11px] mb-3 font-light tracking-wide transition-colors duration-500 group-hover:text-stone-300">
          {product.description}
        </p>
        <div className="flex items-center justify-between">
          <span className="font-bold text-[#2d4a3e] transition-colors duration-500 group-hover:text-[#f0d96b]">
            {product.price}
          </span>
          <button
            onClick={handleAdd}
            className="cart-btn cursor-pointer transition-colors duration-500 group-hover:bg-white group-hover:text-stone-900"
            aria-label="Add to cart"
          >
            <span className="material-symbols-outlined text-sm">
              {added ? "check" : "shopping_bag"}
            </span>
          </button>
        </div>
      </div>
    </Link>
  );
}
