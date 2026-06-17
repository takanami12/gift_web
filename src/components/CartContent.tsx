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
  const shippingFee = subtotal >= 500000 ? 0 : 35000;
  const total = subtotal + shippingFee;
  const formattedShipping = shippingFee === 0 ? "Miễn phí" : shippingFee.toLocaleString("vi-VN") + "₫";
  const formattedTotal = total.toLocaleString("vi-VN") + "₫";

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
          <h1 style={{ fontFamily: "var(--font-playfair)", color: "#433b30" }} className="text-4xl font-bold tracking-tight">
            Giỏ hàng của bạn
          </h1>
          <p style={{ fontFamily: "var(--font-barlow)", color: "#433b30" }} className="mt-2 italic">
            Nâng tầm với quà tặng sáng tạo độc bản.
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
                      <h3 style={{ fontFamily: "var(--font-playfair)", color: "#433b30" }} className="text-xl font-bold">
                        {name}
                      </h3>
                      <p style={{ fontFamily: "var(--font-barlow)", color: "#433b30" }} className="text-sm mt-2 max-w-md leading-relaxed">
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
                    <div className="flex items-center border overflow-hidden bg-white" style={{ borderColor: "#d0c9be" }}>
                      <button
                        onClick={() => updateQuantity(key, item.quantity - 1)}
                        className="px-3 py-2 text-stone-500 hover:bg-surface-container transition-colors flex items-center cursor-pointer"
                      >
                        <span className="material-symbols-outlined text-lg">
                          remove
                        </span>
                      </button>
                      <span style={{ fontFamily: "var(--font-barlow)", color: "#433b30" }} className="px-6 font-bold min-w-[3rem] text-center border-x" >
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
                    <div style={{ fontFamily: "var(--font-barlow)", color: "#433b30" }} className="text-2xl font-bold">
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
            <span className="material-symbols-outlined" style={{ color: "#b1997e" }}>
              edit_note
            </span>
            <h2 style={{ fontFamily: "var(--font-playfair)", color: "#433b30" }} className="text-xl font-bold">
              Lời chúc nhắn gửi
            </h2>
          </div>
          <p style={{ fontFamily: "var(--font-barlow)", color: "#433b30", fontSize: "15px" }} className="text-sm mb-6 leading-relaxed">
            Chúng tôi sẽ in những lời chúc ý nghĩa của bạn trên thiệp giấy
            mỹ thuật cao cấp đính kèm trong mỗi hộp quà.
          </p>
          <textarea
            style={{ fontFamily: "var(--font-barlow)", color: "#877e75", borderColor: "#d0c9be" }}
            className="w-full bg-white border p-5 min-h-[160px] resize-none outline-none placeholder:text-[#c0b8ae]"
            placeholder="Ví dụ: Kính chúc Gia đình năm mới An khang Thịnh vượng, Vạn sự như ý..."
          ></textarea>
        </div>
      </div>

      {/* Order Summary */}
      <div className="lg:col-span-4 lg:sticky lg:top-32">
        <div className="bg-stone-50 p-8 rounded-sm border border-outline-variant/20 shadow-[0_4px_24px_rgba(0,0,0,0.03)]">
          <h2 style={{ fontFamily: "var(--font-playfair)", color: "#433b30" }} className="text-2xl font-bold mb-8 border-b border-outline-variant/30 pb-4">
            Tổng kết đơn hàng
          </h2>
          <div className="space-y-6 text-on-surface-variant">
            <div className="flex justify-between items-center">
              <span style={{ fontFamily: "var(--font-barlow)", color: "#433b30" }} className="text-sm">
                Tạm tính ({totalItems} sản phẩm)
              </span>
              <span style={{ fontFamily: "var(--font-barlow)", color: "#433b30" }} className="font-semibold">
                {formattedSubtotal}
              </span>
            </div>
            <div className="flex justify-between items-center">
              <div className="flex items-center gap-2">
                <span style={{ fontFamily: "var(--font-barlow)", color: "#433b30" }} className="text-sm">
                  Phí vận chuyển
                </span>
                {shippingFee === 0 && (
                  <span style={{ backgroundColor: "transparent", color: "#b1997e", fontFamily: "var(--font-barlow-condensed)", border: "1px solid #b1997e", fontSize: "15px" }} className="px-2 py-0.5 font-bold uppercase rounded-full">
                    Ưu đãi
                  </span>
                )}
              </div>
              <span style={{ fontFamily: "var(--font-barlow)", color: "#433b30", fontWeight: shippingFee === 0 ? 600 : 400 }}>
                {formattedShipping}
              </span>
            </div>
            <div className="flex justify-between items-center border-t border-outline-variant/30 pt-6">
              <span style={{ fontFamily: "var(--font-playfair)", color: "#433b30", fontSize: "20px" }} className="font-bold">
                Tổng cộng
              </span>
              <span style={{ fontFamily: "var(--font-barlow)", color: "#433b30" }} className="text-3xl font-bold">
                {formattedTotal}
              </span>
            </div>
          </div>
          <div className="mt-10 space-y-4">
            <Link
              href="/thanh-toan"
              style={{ backgroundColor: "#433b30", fontFamily: "var(--font-barlow-condensed)", fontSize: "20px", letterSpacing: "0.1em" }}
              className="block w-full py-4 text-white text-center font-bold uppercase shadow-md hover:opacity-90 active:scale-95 transition-all duration-300 cursor-pointer"
            >
              Tiến hành thanh toán
            </Link>
            <Link
              href="/san-pham"
              style={{ fontFamily: "var(--font-barlow)", color: "#877e75" }}
              className="w-full py-4 font-semibold hover:opacity-70 transition-colors flex items-center justify-center gap-2 group"
            >
              <span className="material-symbols-outlined text-sm group-hover:-translate-x-1 transition-transform">
                arrow_back
              </span>
              Tiếp tục mua sắm
            </Link>
          </div>
          <div className="mt-8 p-4 bg-white rounded-sm border border-outline-variant/10">
            <div className="flex gap-3">
              <span className="material-symbols-outlined text-xl" style={{ color: "#433b30" }}>
                verified
              </span>
              <div>
                <p style={{ fontFamily: "var(--font-barlow-condensed)", color: "#433b30", fontSize: "15px" }} className="text-xs font-bold uppercase tracking-wider">
                  Cam kết 
                </p>
                <p style={{ fontFamily: "var(--font-barlow)", color: "#877e75", fontSize: "12px" }} className="text-[11px] mt-1 leading-relaxed">
                  Sản phẩm thủ công, đóng gói nghệ thuật và vận chuyển
                  chuyên dụng, nhanh chóng.
                </p>
              </div>
            </div>
          </div>
        </div>

        {/* Promo Code */}
        <div className="mt-8 flex gap-2">
          <input
            style={{ fontFamily: "var(--font-barlow)", color: "#433b30" }}
            className="flex-grow bg-white border py-3 px-4 text-sm outline-none"
            placeholder="Mã giảm giá (ví dụ: TET2024)"
            type="text"
          />
          <button style={{ backgroundColor: "#433b30", fontFamily: "var(--font-barlow-condensed)", fontSize: "15px", letterSpacing: "0.1em" }} className="px-6 py-3 text-white font-bold text-xs uppercase hover:opacity-90 transition-colors cursor-pointer">
            Áp dụng
          </button>
        </div>
      </div>
    </div>
  );
}
