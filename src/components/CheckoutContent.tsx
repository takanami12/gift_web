"use client";

import Image from "next/image";
import Link from "next/link";
import { useState, useEffect } from "react";
import { useRouter } from "next/navigation";
import { useCart } from "@/lib/cart-context";
import {
  getCartItemImage,
  getCartItemKey,
  getCartItemName,
  getCartItemTotal,
} from "@/lib/data";

type PaymentMethod = "bank" | "momo" | "card" | "cod";

interface Province {
  name: string;
  code: number;
}
interface District {
  name: string;
  code: number;
}
interface Ward {
  name: string;
  code: number;
}

const PAYMENT_OPTIONS: {
  value: PaymentMethod;
  icon: string;
  label: string;
  desc: string;
}[] = [
  { value: "bank", icon: "account_balance", label: "Chuyển Khoản", desc: "Thanh toán qua ngân hàng" },
  { value: "momo", icon: "account_balance_wallet", label: "Ví MoMo", desc: "Thanh toán tức thì" },
  { value: "card", icon: "credit_card", label: "Thẻ Tín Dụng", desc: "Visa, Mastercard" },
  { value: "cod", icon: "payments", label: "Thanh Toán Khi Nhận", desc: "COD - Trả tiền khi nhận hàng" },
];

export default function CheckoutContent() {
  const { items, subtotal, totalItems, clearCart } = useCart();
  const router = useRouter();

  // Form state
  const [fullName, setFullName] = useState("");
  const [phone, setPhone] = useState("");
  const [email, setEmail] = useState("");
  const [address, setAddress] = useState("");
  const [paymentMethod, setPaymentMethod] = useState<PaymentMethod>("bank");
  const [isSubmitting, setIsSubmitting] = useState(false);

  // Provinces API state
  const [provinces, setProvinces] = useState<Province[]>([]);
  const [districts, setDistricts] = useState<District[]>([]);
  const [wards, setWards] = useState<Ward[]>([]);
  const [selectedProvince, setSelectedProvince] = useState<number | "">("");
  const [selectedDistrict, setSelectedDistrict] = useState<number | "">("");
  const [selectedWard, setSelectedWard] = useState<number | "">("");
  const [loadingDistricts, setLoadingDistricts] = useState(false);
  const [loadingWards, setLoadingWards] = useState(false);

  // Load provinces on mount
  useEffect(() => {
    fetch("https://provinces.open-api.vn/api/?depth=1")
      .then((res) => res.json())
      .then((data: Province[]) => setProvinces(data))
      .catch(() => {});
  }, []);

  // Load districts when province changes
  useEffect(() => {
    if (!selectedProvince) {
      setDistricts([]);
      setSelectedDistrict("");
      setWards([]);
      setSelectedWard("");
      return;
    }
    setLoadingDistricts(true);
    setSelectedDistrict("");
    setWards([]);
    setSelectedWard("");
    fetch(`https://provinces.open-api.vn/api/p/${selectedProvince}?depth=2`)
      .then((res) => res.json())
      .then((data: { districts: District[] }) => {
        setDistricts(data.districts || []);
      })
      .catch(() => {})
      .finally(() => setLoadingDistricts(false));
  }, [selectedProvince]);

  // Load wards when district changes
  useEffect(() => {
    if (!selectedDistrict) {
      setWards([]);
      setSelectedWard("");
      return;
    }
    setLoadingWards(true);
    setSelectedWard("");
    fetch(`https://provinces.open-api.vn/api/d/${selectedDistrict}?depth=2`)
      .then((res) => res.json())
      .then((data: { wards: Ward[] }) => {
        setWards(data.wards || []);
      })
      .catch(() => {})
      .finally(() => setLoadingWards(false));
  }, [selectedDistrict]);

  const shippingFee = subtotal >= 1000000 ? 0 : 35000;
  const total = subtotal + shippingFee;
  const formattedSubtotal = subtotal.toLocaleString("vi-VN") + "₫";
  const formattedShipping =
    shippingFee === 0 ? "Miễn phí" : shippingFee.toLocaleString("vi-VN") + "₫";
  const formattedTotal = total.toLocaleString("vi-VN") + "₫";

  const getSelectedName = (list: { name: string; code: number }[], code: number | "") =>
    list.find((i) => i.code === code)?.name || "";

  const handleSubmit = async () => {
    setIsSubmitting(true);

    // Build full address string
    const wardName = getSelectedName(wards, selectedWard);
    const districtName = getSelectedName(districts, selectedDistrict);
    const provinceName = getSelectedName(provinces, selectedProvince);
    const fullAddress = [address, wardName, districtName, provinceName]
      .filter(Boolean)
      .join(", ");

    // Generate order number
    const orderNumber = `#LT-2024-${Math.floor(1000 + Math.random() * 9000)}`;
    const deliveryDate = new Date(Date.now() + 5 * 24 * 60 * 60 * 1000).toLocaleDateString("vi-VN", {
      day: "2-digit",
      month: "long",
      year: "numeric",
    });

    try {
      const orderItems = await Promise.all(
        items.map(async (i) => {
          const base = {
            name: getCartItemName(i),
            image: getCartItemImage(i),
            quantity: i.quantity,
            price: getCartItemTotal(i),
            kind: i.kind,
          };
          if (i.kind !== "design") return base;
          const res = await fetch("/api/designs", {
            method: "POST",
            headers: { "Content-Type": "application/json" },
            body: JSON.stringify(i.design),
          });
          if (!res.ok) {
            console.error("[Checkout] saveDesign failed", await res.text());
            return base;
          }
          const data = (await res.json()) as { token?: string };
          return data.token ? { ...base, qrToken: data.token } : base;
        }),
      );

      const orderInfo = {
        orderNumber,
        deliveryDate,
        fullName: fullName || "Khách hàng",
        phone: phone || "N/A",
        email: email || "N/A",
        fullAddress: fullAddress || "Chưa cung cấp",
        paymentMethod,
        paymentLabel: PAYMENT_OPTIONS.find((p) => p.value === paymentMethod)?.label || "",
        items: orderItems,
        subtotal,
        shippingFee,
        total,
      };
      localStorage.setItem("luminous_order", JSON.stringify(orderInfo));
      clearCart();
      router.push("/xac-nhan");
    } catch (err) {
      console.error("[Checkout] submit failed", err);
      setIsSubmitting(false);
    }
  };

  if (items.length === 0) {
    return (
      <div className="text-center py-32 animate-fade-in">
        <span className="material-symbols-outlined text-7xl text-stone-200 mb-6 block">
          shopping_cart
        </span>
        <h2 className="font-headline text-3xl text-stone-500 mb-4">
          Giỏ hàng trống
        </h2>
        <p className="text-stone-400 mb-10">
          Vui lòng thêm sản phẩm trước khi thanh toán.
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

  return (
    <div className="grid grid-cols-1 lg:grid-cols-12 gap-16 items-start">
      {/* Left Column: Forms */}
      <div className="lg:col-span-7 space-y-12">
        {/* Section 1: Customer Information */}
        <section className="space-y-6 animate-fade-in-up">
          <div className="flex items-center space-x-4">
            <span className="w-8 h-8 rounded-full bg-secondary-container text-on-secondary-container flex items-center justify-center font-serif text-sm">
              1
            </span>
            <h2 className="text-2xl font-serif">Thông Tin Khách Hàng</h2>
          </div>
          <div className="bg-white p-8 rounded-lg space-y-4 shadow-sm">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div className="space-y-1">
                <label className="text-xs uppercase tracking-widest text-on-surface-variant font-medium">
                  Họ và tên
                </label>
                <input
                  className="w-full bg-surface-container-high border-none rounded-md px-4 py-3 focus:ring-2 focus:ring-secondary transition-all outline-none"
                  placeholder="Nguyễn Văn A"
                  type="text"
                  value={fullName}
                  onChange={(e) => setFullName(e.target.value)}
                />
              </div>
              <div className="space-y-1">
                <label className="text-xs uppercase tracking-widest text-on-surface-variant font-medium">
                  Số điện thoại
                </label>
                <input
                  className="w-full bg-surface-container-high border-none rounded-md px-4 py-3 focus:ring-2 focus:ring-secondary transition-all outline-none"
                  placeholder="090 123 4567"
                  type="tel"
                  value={phone}
                  onChange={(e) => setPhone(e.target.value)}
                />
              </div>
            </div>
            <div className="space-y-1">
              <label className="text-xs uppercase tracking-widest text-on-surface-variant font-medium">
                Email
              </label>
              <input
                className="w-full bg-surface-container-high border-none rounded-md px-4 py-3 focus:ring-2 focus:ring-secondary transition-all outline-none"
                placeholder="nguyen.a@example.com"
                type="email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
              />
            </div>
          </div>
        </section>

        {/* Section 2: Shipping Address */}
        <section className="space-y-6 animate-fade-in-up" style={{ animationDelay: "100ms" }}>
          <div className="flex items-center space-x-4">
            <span className="w-8 h-8 rounded-full bg-secondary-container text-on-secondary-container flex items-center justify-center font-serif text-sm">
              2
            </span>
            <h2 className="text-2xl font-serif">Địa Chỉ Giao Hàng</h2>
          </div>
          <div className="bg-white p-8 rounded-lg space-y-4 shadow-sm">
            <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
              {/* Province */}
              <div className="space-y-1">
                <label className="text-xs uppercase tracking-widest text-on-surface-variant font-medium">
                  Tỉnh / Thành phố
                </label>
                <select
                  className="w-full bg-surface-container-high border-none rounded-md px-4 py-3 focus:ring-2 focus:ring-secondary transition-all outline-none cursor-pointer"
                  value={selectedProvince}
                  onChange={(e) => setSelectedProvince(e.target.value ? Number(e.target.value) : "")}
                >
                  <option value="">-- Chọn tỉnh/thành --</option>
                  {provinces.map((p) => (
                    <option key={p.code} value={p.code}>
                      {p.name}
                    </option>
                  ))}
                </select>
              </div>
              {/* District */}
              <div className="space-y-1">
                <label className="text-xs uppercase tracking-widest text-on-surface-variant font-medium">
                  Quận / Huyện
                </label>
                <select
                  className="w-full bg-surface-container-high border-none rounded-md px-4 py-3 focus:ring-2 focus:ring-secondary transition-all outline-none cursor-pointer disabled:opacity-50"
                  value={selectedDistrict}
                  onChange={(e) => setSelectedDistrict(e.target.value ? Number(e.target.value) : "")}
                  disabled={!selectedProvince || loadingDistricts}
                >
                  <option value="">
                    {loadingDistricts ? "Đang tải..." : "-- Chọn quận/huyện --"}
                  </option>
                  {districts.map((d) => (
                    <option key={d.code} value={d.code}>
                      {d.name}
                    </option>
                  ))}
                </select>
              </div>
              {/* Ward */}
              <div className="space-y-1">
                <label className="text-xs uppercase tracking-widest text-on-surface-variant font-medium">
                  Phường / Xã
                </label>
                <select
                  className="w-full bg-surface-container-high border-none rounded-md px-4 py-3 focus:ring-2 focus:ring-secondary transition-all outline-none cursor-pointer disabled:opacity-50"
                  value={selectedWard}
                  onChange={(e) => setSelectedWard(e.target.value ? Number(e.target.value) : "")}
                  disabled={!selectedDistrict || loadingWards}
                >
                  <option value="">
                    {loadingWards ? "Đang tải..." : "-- Chọn phường/xã --"}
                  </option>
                  {wards.map((w) => (
                    <option key={w.code} value={w.code}>
                      {w.name}
                    </option>
                  ))}
                </select>
              </div>
            </div>
            <div className="space-y-1">
              <label className="text-xs uppercase tracking-widest text-on-surface-variant font-medium">
                Địa chỉ cụ thể
              </label>
              <input
                className="w-full bg-surface-container-high border-none rounded-md px-4 py-3 focus:ring-2 focus:ring-secondary transition-all outline-none"
                placeholder="Số nhà, tên đường..."
                type="text"
                value={address}
                onChange={(e) => setAddress(e.target.value)}
              />
            </div>
          </div>
        </section>

        {/* Section 3: Payment Methods */}
        <section className="space-y-6 animate-fade-in-up" style={{ animationDelay: "200ms" }}>
          <div className="flex items-center space-x-4">
            <span className="w-8 h-8 rounded-full bg-secondary-container text-on-secondary-container flex items-center justify-center font-serif text-sm">
              3
            </span>
            <h2 className="text-2xl font-serif">Phương Thức Thanh Toán</h2>
          </div>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            {PAYMENT_OPTIONS.map((option) => (
              <label
                key={option.value}
                className={`relative flex flex-col p-6 bg-white rounded-lg cursor-pointer hover:shadow-lg transition-all border-2 ${
                  paymentMethod === option.value
                    ? "border-secondary shadow-md"
                    : "border-transparent"
                }`}
              >
                <input
                  className="sr-only"
                  name="payment"
                  type="radio"
                  value={option.value}
                  checked={paymentMethod === option.value}
                  onChange={() => setPaymentMethod(option.value)}
                />
                <span className="material-symbols-outlined text-primary mb-2">
                  {option.icon}
                </span>
                <span className="font-medium text-on-surface">{option.label}</span>
                <span className="text-xs text-on-surface-variant">{option.desc}</span>
              </label>
            ))}
          </div>
        </section>
      </div>

      {/* Right Column: Order Summary */}
      <aside className="lg:col-span-5">
        <div className="bg-surface-container-low p-8 rounded-xl sticky top-32 shadow-sm">
          <h2 className="text-2xl font-serif mb-8 pb-4 border-b border-outline-variant/30 text-primary">
            Tóm Tắt Đơn Hàng
          </h2>

          {/* Product List */}
          <div className="space-y-6 mb-8">
            {items.map((item) => {
              const key = getCartItemKey(item);
              const name = getCartItemName(item);
              const image = getCartItemImage(item);
              const total = getCartItemTotal(item);
              const isDesign = item.kind === "design";
              return (
                <div key={key} className="flex items-center space-x-4">
                  <div className="w-20 h-20 bg-surface-container-highest rounded-lg overflow-hidden flex-shrink-0 relative">
                    <Image
                      src={image}
                      alt={name}
                      fill
                      className="object-cover"
                      sizes="80px"
                      unoptimized={isDesign}
                    />
                  </div>
                  <div className="flex-grow">
                    <h3 className="font-medium text-on-surface text-sm">
                      {name}
                      {isDesign && (
                        <span className="ml-2 text-[10px] uppercase tracking-widest text-secondary">
                          Tự thiết kế
                        </span>
                      )}
                    </h3>
                    <p className="text-xs text-on-surface-variant">
                      Số lượng: {item.quantity}
                    </p>
                    <p className="text-sm font-semibold mt-1">
                      {total.toLocaleString("vi-VN")}₫
                    </p>
                  </div>
                </div>
              );
            })}
          </div>

          {/* Price Breakdown */}
          <div className="space-y-3 pt-6 border-t border-outline-variant/30 mb-8">
            <div className="flex justify-between text-on-surface-variant text-sm">
              <span>Tạm tính ({totalItems} sản phẩm)</span>
              <span>{formattedSubtotal}</span>
            </div>
            <div className="flex justify-between text-on-surface-variant text-sm">
              <span>Phí vận chuyển</span>
              <span className={shippingFee === 0 ? "text-primary font-semibold" : ""}>
                {formattedShipping}
              </span>
            </div>
            <div className="flex justify-between text-xl font-serif text-on-surface pt-4 border-t border-outline-variant/30">
              <span>Tổng cộng</span>
              <span className="text-primary font-bold">{formattedTotal}</span>
            </div>
          </div>

          {/* CTA Button */}
          <button
            onClick={handleSubmit}
            disabled={isSubmitting}
            className={`w-full py-5 rounded-sm font-bold tracking-widest uppercase text-sm transition-all shadow-xl shadow-primary/20 cursor-pointer flex items-center justify-center gap-3 ${
              isSubmitting
                ? "bg-stone-400 text-white cursor-wait"
                : "bg-primary text-white hover:bg-primary-container active:scale-[0.98]"
            }`}
          >
            {isSubmitting ? (
              <>
                <span className="material-symbols-outlined text-xl animate-spin">
                  progress_activity
                </span>
                Đang xử lý...
              </>
            ) : (
              <>
                <span className="material-symbols-outlined text-xl">lock</span>
                Đặt Hàng
              </>
            )}
          </button>
          <div className="mt-6 flex items-center justify-center space-x-2 text-xs text-on-surface-variant uppercase tracking-widest">
            <span className="material-symbols-outlined text-sm">lock</span>
            <span>Thanh toán bảo mật SSL</span>
          </div>
        </div>
      </aside>
    </div>
  );
}
