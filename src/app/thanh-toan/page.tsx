import CheckoutContent from "@/components/CheckoutContent";
import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Thanh Toán | Gift Glamorous",
  description: "Hoàn tất đơn hàng của bạn.",
};

export default function CheckoutPage() {
  return (
    <main className="pt-8 pb-24 px-6 md:px-12 lg:px-24 max-w-7xl mx-auto seasonal-motif min-h-screen">
      {/* Header */}
      <div className="mb-12">
        <h1 style={{ fontFamily: "var(--font-playfair)", color: "#433b30", fontWeight: 700 }} className="text-4xl md:text-5xl mb-2">
          Thanh Toán An Toàn
        </h1>
        <p style={{ fontFamily: "var(--font-barlow)", color: "#433b30" }}>
          Hoàn tất các lựa chọn.
        </p>
      </div>

      <CheckoutContent />
    </main>
  );
}
