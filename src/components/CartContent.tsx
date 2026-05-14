"use client";

import Image from "next/image";
import Link from "next/link";
import { useCart } from "@/lib/cart-context";
import {
  getCartItemDescription,
  getCartItemImage,
  getCartItemKey,
  getCartItemName,
  getCartItemTotal,
} from "@/lib/data";

export default function CartContent() {
  const { items, removeItem, updateQuantity, subtotal, totalItems } = useCart();
  const formattedSubtotal = subtotal.toLocaleString("vi-VN") + "₫";

  if (items.length === 0) {
    return (
      <div className="text-center py-32 animate-fade-in">
        <span className="material-symbols-outlined text-7xl text-stone-200 mb-6 block">
          shopping_bag
        </span>
        <h2 className="font-headline text-3xl text-stone-500 mb-4">
          Giỏ hàng trống
        </h2>
        <p className="text-stone-400 mb-10 max-w-md mx-auto leading-relaxed">
          Hãy khám phá bộ sưu tập quà Tết cao cấp và thêm những tuyệt tác vào giỏ hàng.
        </p>
        <Link
          href="/san-pham"
          className="inline-flex items-center gap-3 bg-primary text-white px-10 py-4 font-bold text-sm tracking-widest uppercase hover:bg-primary-container transition-colors"
        >
          <span className="material-symbols-outlined text-xl">storefront</span>
          Khám Phá Bộ Sưu Tập
        </Link>
      </div>
    );
  }

  return (
    <div className="grid grid-cols-1 lg:grid-cols-12 gap-16 items-start">
      {/* Items List */}
      <div className="lg:col-span-8 space-y-12">
        <header className="border-b border-outline-variant/30 pb-8">
          <h1 className="text-4xl font-headline font-bold text-on-surface tracking-tight">
            Giỏ hàng của bạn
          </h1>
          <p className="text-on-surface-variant mt-2 font-body italic">
            Nâng tầm quà tặng với bộ sưu tập di sản hiện đại.
          </p>
        </header>

        <div className="space-y-10">
          {items.map((item) => {
            const key = getCartItemKey(item);
            const name = getCartItemName(item);
            const image = getCartItemImage(item);
            const description = getCartItemDescription(item);
            const total = getCartItemTotal(item);
            const isDesign = item.kind === "design";

            return (
              <div
                key={key}
                className="group flex flex-col md:flex-row gap-8 items-start pb-10 border-b border-surface-container last:border-0 animate-fade-in"
              >
                <div className="relative overflow-hidden rounded-sm bg-surface-container-low aspect-[4/5] w-full md:w-48 flex-shrink-0 shadow-sm">
                  <Image
                    alt={name}
                    className="object-cover w-full h-full group-hover:scale-105 transition-transform duration-700"
                    src={image}
                    fill
                    sizes="192px"
                    unoptimized={isDesign}
                  />
                  {isDesign && (
                    <span className="absolute top-2 left-2 bg-[#2d4a3e] text-white text-[9px] font-bold uppercase tracking-widest px-2 py-1 rounded-sm">
                      Tự thiết kế
                    </span>
                  )}
                </div>
                <div className="flex-grow flex flex-col justify-between self-stretch py-2">
                  <div className="flex justify-between items-start">
                    <div>
                      <h3 className="text-xl font-headline font-bold text-on-surface">
                        {name}
                      </h3>
                      <p className="text-sm text-on-surface-variant mt-2 max-w-md leading-relaxed">
                        {description}
                      </p>
                      {isDesign && (
                        <p className="text-xs text-stone-400 mt-1 italic">
                          QR truy ngược hành trình tặng quà sẽ được sinh khi đặt hàng.
                        </p>
                      )}
                    </div>
                    <button
                      onClick={() => removeItem(key)}
                      className="text-stone-400 hover:text-primary transition-colors p-1 cursor-pointer"
                    >
                      <span className="material-symbols-outlined">close</span>
                    </button>
                  </div>
                  <div className="flex flex-wrap items-center justify-between mt-8 gap-4">
                    <div className="flex items-center border border-outline-variant/30 rounded-sm overflow-hidden bg-white">
                      <button
                        onClick={() => updateQuantity(key, item.quantity - 1)}
                        className="px-3 py-2 text-stone-500 hover:bg-surface-container transition-colors flex items-center cursor-pointer"
                      >
                        <span className="material-symbols-outlined text-lg">
                          remove
                        </span>
                      </button>
                      <span className="px-6 font-bold text-on-surface min-w-[3rem] text-center border-x border-outline-variant/30">
                        {item.quantity}
                      </span>
                      <button
                        onClick={() => updateQuantity(key, item.quantity + 1)}
                        className="px-3 py-2 text-stone-500 hover:bg-surface-container transition-colors flex items-center cursor-pointer"
                      >
                        <span className="material-symbols-outlined text-lg">
                          add
                        </span>
                      </button>
                    </div>
                    <div className="text-2xl font-headline font-bold text-primary">
                      {total.toLocaleString("vi-VN")}₫
                    </div>
                  </div>
                </div>
              </div>
            );
          })}
        </div>

        {/* Personal Message Section */}
        <div className="mt-16 bg-white p-8 rounded-sm border border-outline-variant/20 shadow-sm">
          <div className="flex items-center gap-3 mb-6">
            <span className="material-symbols-outlined text-secondary">
              edit_note
            </span>
            <h2 className="text-xl font-headline font-bold">
              Lời chúc Tết riêng tư
            </h2>
          </div>
          <p className="text-sm text-on-surface-variant mb-6 font-body leading-relaxed">
            Chúng tôi sẽ in những lời chúc ý nghĩa của bạn trên thiệp giấy
            mỹ thuật cao cấp đính kèm trong mỗi hộp quà.
          </p>
          <textarea
            className="w-full bg-surface-container-lowest border border-outline-variant/30 focus:border-primary focus:ring-0 transition-all p-5 min-h-[160px] resize-none font-body placeholder:text-outline-variant/60 rounded-sm text-on-surface"
            placeholder="Ví dụ: Kính chúc Gia đình năm mới An khang Thịnh vượng, Vạn sự như ý..."
          ></textarea>
        </div>
      </div>

      {/* Order Summary */}
      <div className="lg:col-span-4 lg:sticky lg:top-32">
        <div className="bg-stone-50 p-8 rounded-sm border border-outline-variant/20 shadow-[0_4px_24px_rgba(0,0,0,0.03)]">
          <h2 className="text-2xl font-headline font-bold mb-8 text-on-surface border-b border-outline-variant/30 pb-4">
            Tổng kết đơn hàng
          </h2>
          <div className="space-y-6 text-on-surface-variant">
            <div className="flex justify-between items-center">
              <span className="text-sm">
                Tạm tính ({totalItems} sản phẩm)
              </span>
              <span className="font-semibold text-on-surface">
                {formattedSubtotal}
              </span>
            </div>
            <div className="flex justify-between items-center">
              <div className="flex items-center gap-2">
                <span className="text-sm">Phí vận chuyển</span>
                <span className="px-2 py-0.5 bg-secondary text-primary text-[10px] font-bold uppercase rounded-full">
                  Ưu đãi Tết
                </span>
              </div>
              <span className="font-semibold text-primary">Miễn phí</span>
            </div>
            <div className="flex justify-between items-center border-t border-outline-variant/30 pt-6">
              <span className="text-on-surface font-headline font-bold">
                Tổng cộng
              </span>
              <span className="text-3xl font-headline font-bold text-primary">
                {formattedSubtotal}
              </span>
            </div>
          </div>
          <div className="mt-10 space-y-4">
            <Link
              href="/thanh-toan"
              className="block w-full py-4 bg-primary text-white text-center font-bold tracking-widest uppercase rounded-sm shadow-md hover:bg-primary-container hover:scale-[1.01] active:scale-95 transition-all duration-300 cursor-pointer"
            >
              Tiến hành thanh toán
            </Link>
            <Link
              href="/san-pham"
              className="w-full py-4 text-stone-600 font-semibold hover:text-primary transition-colors flex items-center justify-center gap-2 group"
            >
              <span className="material-symbols-outlined text-sm group-hover:-translate-x-1 transition-transform">
                arrow_back
              </span>
              Tiếp tục mua sắm
            </Link>
          </div>
          <div className="mt-8 p-4 bg-white rounded-sm border border-outline-variant/10">
            <div className="flex gap-3">
              <span className="material-symbols-outlined text-primary text-xl">
                verified
              </span>
              <div>
                <p className="text-xs font-bold text-on-surface uppercase tracking-wider">
                  Cam kết Di sản
                </p>
                <p className="text-[11px] text-on-surface-variant mt-1 leading-relaxed">
                  Sản phẩm thủ công, đóng gói nghệ thuật và vận chuyển
                  chuyên dụng trong 24h.
                </p>
              </div>
            </div>
          </div>
        </div>

        {/* Promo Code */}
        <div className="mt-8 flex gap-2">
          <input
            className="flex-grow bg-white border border-outline-variant/30 focus:border-primary focus:ring-0 py-3 px-4 text-sm font-body rounded-sm"
            placeholder="Mã giảm giá (ví dụ: TET2024)"
            type="text"
          />
          <button className="px-6 py-3 bg-on-surface text-white font-bold text-xs uppercase tracking-widest rounded-sm hover:bg-primary transition-colors cursor-pointer">
            Áp dụng
          </button>
        </div>
      </div>
    </div>
  );
}
