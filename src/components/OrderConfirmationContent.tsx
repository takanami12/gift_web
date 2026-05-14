"use client";

import { useEffect, useState } from "react";
import Link from "next/link";
import Image from "next/image";
import QrTokenBadge from "./QrTokenBadge";

interface OrderItem {
  name: string;
  image: string;
  quantity: number;
  price: number;
  kind?: "product" | "design";
  qrToken?: string;
}

interface OrderInfo {
  orderNumber: string;
  deliveryDate: string;
  fullName: string;
  phone: string;
  email: string;
  fullAddress: string;
  paymentMethod: string;
  paymentLabel: string;
  items: OrderItem[];
  subtotal: number;
  shippingFee: number;
  total: number;
}

export default function OrderConfirmationContent() {
  const [order, setOrder] = useState<OrderInfo | null>(null);
  const [loaded, setLoaded] = useState(false);

  useEffect(() => {
    const saved = localStorage.getItem("luminous_order");
    if (saved) {
      try {
        setOrder(JSON.parse(saved));
      } catch {
        /* empty */
      }
    }
    setLoaded(true);
  }, []);

  // Still reading localStorage — render nothing to avoid flash
  if (!loaded) return null;

  if (!order) {
    return (
      <div className="max-w-4xl mx-auto px-6 text-center py-32 animate-fade-in">
        <span className="material-symbols-outlined text-7xl text-stone-200 mb-6 block">
          receipt_long
        </span>
        <h2 className="font-headline text-3xl text-stone-500 mb-4">
          Không tìm thấy đơn hàng
        </h2>
        <p className="text-stone-400 mb-10">
          Bạn chưa có đơn hàng nào hoặc thông tin đã hết hạn.
        </p>
        <Link
          href="/san-pham"
          className="inline-flex items-center gap-3 bg-primary text-white px-10 py-4 font-bold text-sm tracking-widest uppercase hover:bg-primary-container transition-colors"
        >
          Khám Phá Bộ Sưu Tập
        </Link>
      </div>
    );
  }

  const featuredItem = order.items[0];

  return (
    <div className="max-w-4xl mx-auto px-6 relative z-10">
      {/* Success Header */}
      <div className="text-center mb-16 animate-fade-in-up">
        <div className="inline-flex items-center justify-center w-24 h-24 rounded-full bg-secondary-container/20 mb-8 relative">
          <div className="absolute inset-0 rounded-full border border-secondary/20 scale-125 animate-pulse"></div>
          <span
            className="material-symbols-outlined text-5xl text-secondary"
            style={{ fontVariationSettings: "'FILL' 1" }}
          >
            workspace_premium
          </span>
        </div>
        <h1 className="text-4xl md:text-5xl font-serif font-bold text-primary mb-4 tracking-tight">
          Đặt Hàng Thành Công!
        </h1>
        <p className="text-on-surface-variant max-w-lg mx-auto leading-relaxed">
          Cảm ơn <strong>{order.fullName}</strong> đã tin tưởng lựa chọn
          Gift Glamorous để gửi gắm những lời chúc trân quý nhất.
        </p>
      </div>

      {/* Bento Grid Layout */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-12">
        {/* Order Number & Status */}
        <div
          className="md:col-span-2 bg-white p-8 rounded-xl shadow-[0px_4px_20px_rgba(0,0,0,0.03)] flex flex-col justify-between animate-fade-in-up"
          style={{ animationDelay: "100ms" }}
        >
          <div>
            <span className="text-xs font-bold tracking-[0.2em] text-secondary uppercase mb-2 block">
              Mã đơn hàng
            </span>
            <h2 className="text-2xl font-serif font-bold text-on-surface">
              {order.orderNumber}
            </h2>
          </div>
          <div className="mt-8 flex flex-wrap items-center gap-4 text-sm text-on-surface-variant">
            <div className="flex items-center gap-2">
              <span className="material-symbols-outlined text-primary text-lg">
                local_shipping
              </span>
              <span>
                Dự kiến giao: <strong>{order.deliveryDate}</strong>
              </span>
            </div>
            <div className="w-1 h-1 rounded-full bg-outline-variant hidden sm:block"></div>
            <div className="flex items-center gap-2">
              <span className="material-symbols-outlined text-primary text-lg">
                schedule
              </span>
              <span>
                Trạng thái:{" "}
                <strong className="text-primary">Đang xử lý</strong>
              </span>
            </div>
          </div>
        </div>

        {/* Summary Visual */}
        {featuredItem && (
          <div
            className="bg-primary-container relative rounded-xl overflow-hidden shadow-xl min-h-[200px] animate-fade-in-up"
            style={{ animationDelay: "150ms" }}
          >
            <Image
              src={featuredItem.image}
              alt={featuredItem.name}
              fill
              className="object-cover opacity-60 mix-blend-overlay"
              sizes="300px"
              unoptimized={featuredItem.kind === "design"}
            />
            <div className="absolute inset-0 bg-gradient-to-t from-primary/80 to-transparent"></div>
            <div className="absolute bottom-6 left-6 right-6 text-on-primary">
              <p className="text-sm opacity-90">
                {featuredItem.kind === "design" ? "Thiết kế tự do" : "Sản phẩm tiêu biểu"}
              </p>
              <p className="font-serif italic text-lg leading-tight">
                {featuredItem.name}
              </p>
            </div>
          </div>
        )}

        {/* Shipping Details */}
        <div
          className="bg-surface-container-low p-8 rounded-xl animate-fade-in-up"
          style={{ animationDelay: "200ms" }}
        >
          <span
            className="material-symbols-outlined text-secondary mb-4 block"
            style={{ fontVariationSettings: "'FILL' 1" }}
          >
            location_on
          </span>
          <h3 className="font-serif font-bold text-lg mb-3">
            Địa chỉ nhận hàng
          </h3>
          <div className="text-sm text-on-surface-variant space-y-1">
            <p className="font-bold text-on-surface">{order.fullName}</p>
            <p>{order.phone}</p>
            <p>{order.fullAddress}</p>
          </div>
        </div>

        {/* Order Items & Total */}
        <div
          className="bg-white p-8 rounded-xl border border-outline-variant/10 animate-fade-in-up"
          style={{ animationDelay: "250ms" }}
        >
          <h3 className="font-serif font-bold text-lg mb-4">
            Chi tiết đơn hàng
          </h3>
          <div className="space-y-3 mb-4">
            {order.items.map((item, idx) => (
              <div
                key={idx}
                className="flex justify-between text-sm text-on-surface-variant"
              >
                <span>
                  {item.name}
                  {item.kind === "design" && (
                    <span className="ml-2 text-[10px] uppercase tracking-widest text-secondary">
                      Tự thiết kế
                    </span>
                  )}{" "}
                  <span className="text-stone-400">×{item.quantity}</span>
                </span>
                <span className="font-semibold text-on-surface">
                  {item.price.toLocaleString("vi-VN")}₫
                </span>
              </div>
            ))}
          </div>
          <div className="border-t border-outline-variant/20 pt-3 flex justify-between">
            <span className="font-serif font-bold">Tổng cộng</span>
            <span className="font-serif font-bold text-primary text-lg">
              {order.total.toLocaleString("vi-VN")}₫
            </span>
          </div>
        </div>

        {/* Payment & Support */}
        <div
          className="bg-white p-8 rounded-xl border border-outline-variant/10 animate-fade-in-up"
          style={{ animationDelay: "300ms" }}
        >
          <h3 className="font-serif font-bold text-lg mb-4">
            Thanh toán & Hỗ trợ
          </h3>
          <div className="space-y-4">
            <div className="flex items-center gap-3 text-sm text-on-surface-variant">
              <span className="material-symbols-outlined text-lg text-primary">
                credit_card
              </span>
              <span>
                Phương thức: <strong>{order.paymentLabel}</strong>
              </span>
            </div>
            <a
              className="flex items-center gap-3 text-sm text-on-surface-variant hover:text-primary transition-colors"
              href="tel:19008888"
            >
              <span className="material-symbols-outlined text-lg">call</span>
              <span>1900 8888 (Hotline)</span>
            </a>
            <a
              className="flex items-center gap-3 text-sm text-on-surface-variant hover:text-primary transition-colors"
              href="mailto:support@giftglamorous.vn"
            >
              <span className="material-symbols-outlined text-lg">mail</span>
              <span>support@giftglamorous.vn</span>
            </a>
          </div>
        </div>
      </div>

      {/* QR Replay Section */}
      {order.items.some((i) => i.kind === "design" && i.qrToken) && (
        <section
          className="mb-12 animate-fade-in-up"
          style={{ animationDelay: "320ms" }}
          aria-labelledby="qr-section-heading"
        >
          <header className="mb-6 text-center">
            <span className="material-symbols-outlined text-secondary mb-2 block">
              qr_code_2
            </span>
            <h3 id="qr-section-heading" className="font-serif text-2xl text-on-surface">
              Hành trình tặng quà
            </h3>
            <p className="text-sm text-on-surface-variant mt-1">
              QR sẽ được in kèm hộp; người nhận quét để xem timeline thiết kế.
            </p>
          </header>
          <div className="grid gap-4 md:grid-cols-2">
            {order.items
              .filter((i) => i.kind === "design" && i.qrToken)
              .map((i, idx) => (
                <QrTokenBadge
                  key={`${idx}-${i.qrToken}`}
                  token={i.qrToken as string}
                  designName={i.name}
                />
              ))}
          </div>
        </section>
      )}

      {/* CTAs */}
      <div
        className="flex flex-col sm:flex-row items-center justify-center gap-4 animate-fade-in-up"
        style={{ animationDelay: "350ms" }}
      >
        <Link
          href="/san-pham"
          className="w-full sm:w-auto px-10 py-4 bg-primary text-white font-bold rounded-sm shadow-lg hover:bg-primary-container transition-all active:scale-95 flex items-center justify-center gap-2 tracking-widest uppercase text-sm"
        >
          <span className="material-symbols-outlined text-xl">storefront</span>
          Tiếp Tục Mua Sắm
        </Link>
        <Link
          href="/"
          className="w-full sm:w-auto px-10 py-4 border-2 border-primary text-primary font-bold rounded-sm hover:bg-primary/5 transition-all flex items-center justify-center gap-2 tracking-widest uppercase text-sm"
        >
          Về Trang Chủ
          <span className="material-symbols-outlined text-xl">
            arrow_forward
          </span>
        </Link>
      </div>

      {/* Gratitude Note */}
      <div className="mt-20 text-center border-t border-outline-variant/20 pt-12">
        <p className="font-serif italic text-on-surface-variant text-lg">
          &ldquo;Gói trọn chân tình, khai xuân như ý.&rdquo;
        </p>
      </div>
    </div>
  );
}
