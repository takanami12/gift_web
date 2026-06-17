import ProductFilters from "@/components/ProductFilters";
import { allProducts } from "@/lib/data";
import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Bộ Sưu Tập Quà Tặng Cao Cấp | Gift Glamorous",
  description:
    "Những tạo tác tâm huyết, chắt lọc tinh hoa từ các làng nghề truyền thống kết hợp cùng tư duy thẩm mỹ đương đại.",
};

export default function ProductListPage() {
  return (
    <main className="pt-5 pb-24 px-8 max-w-screen-2xl mx-auto seasonal-motif">
      {/* Header Section */}
      <header className="mb-20 text-center">
        <h1 style={{ fontFamily: "var(--font-playfair)", color: "#433b30", fontWeight: 700 }} className="text-4xl md:text-6xl mb-6">
          Tuyển Tập Quà Tặng
        </h1>
      </header>

      <ProductFilters products={allProducts} />
    </main>
  );
}
