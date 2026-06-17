import CartContent from "@/components/CartContent";
import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Giỏ Hàng | Gift Glamorous",
  description: "Xem giỏ hàng và tiến hành thanh toán quà Tết cao cấp.",
};

export default function CartPage() {
  return (
    <main className="pt-8 pb-20 min-h-screen tet-watermark">
      <div className="max-w-7xl mx-auto px-8">
        {/* Checkout Progress Bar */}
        <div className="mb-16 max-w-2xl mx-auto">
          <div className="relative flex items-start justify-between">
            {/* Background line — only between step 1 and step 3 centers */}
            <div className="absolute top-5 left-[calc(16.67%)] right-[calc(16.67%)] h-px bg-surface-variant -translate-y-1/2"></div>

            {/* Step 1 — Active */}
            <div className="flex flex-col items-center gap-2 flex-1">
              <div className="w-10 h-10 rounded-full flex items-center justify-center font-bold relative z-10" style={{ backgroundColor: "#433b30", color: "#fff" }}>
                1
              </div>
              <span style={{ fontFamily: "var(--font-barlow-condensed)", color: "#433b30" }} className="text-xs font-bold tracking-widest uppercase">
                Giỏ Hàng
              </span>
            </div>

            {/* Step 2 */}
            <div className="flex flex-col items-center gap-2 flex-1">
              <div className="w-10 h-10 rounded-full flex items-center justify-center font-bold relative z-10" style={{ backgroundColor: "#e8e0d5", color: "#433b30" }}>
                2
              </div>
              <span style={{ fontFamily: "var(--font-barlow-condensed)", color: "#877e75" }} className="text-xs font-medium tracking-widest uppercase">
                Giao Hàng
              </span>
            </div>

            {/* Step 3 */}
            <div className="flex flex-col items-center gap-2 flex-1">
              <div className="w-10 h-10 rounded-full flex items-center justify-center font-bold relative z-10" style={{ backgroundColor: "#e8e0d5", color: "#433b30" }}>
                3
              </div>
              <span style={{ fontFamily: "var(--font-barlow-condensed)", color: "#877e75" }} className="text-xs font-medium tracking-widest uppercase">
                Thanh Toán
              </span>
            </div>
          </div>
        </div>

        <CartContent />
      </div>
    </main>
  );
}
