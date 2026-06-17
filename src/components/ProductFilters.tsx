"use client";

import { useState, useMemo } from "react";
import ProductCard from "@/components/ProductCard";
import type { Product } from "@/lib/data";

const getCategoriesAndRecipients = (slug?: string) => {
  if (slug === "doanh-nghiep") {
    return {
      categories: ["Đỏ Thịnh Vượng", "Xanh Lục Bảo", "Xanh Dương Thượng Hạng"],
      recipients: ["Đối tác chiến lược & VIP", "Cán bộ & Nhân viên", "Đại lý & Nhà phân phối"],
      categoryLabel: "Màu Sắc",
    };
  }
  if (slug === "tet") {
    return {
      categories: ["Đỏ Thịnh Vượng", "Xanh Lục Bảo", "Xanh Dương Thượng Hạng"],
      recipients: ["Đối tác chiến lược & VIP", "Cán bộ & Nhân viên", "Đại lý & Nhà phân phối"],
      categoryLabel: "Màu Sắc",
    };
  }
  if (slug === "trung-thu") {
    return {
      categories: ["Hộp Quà Tặng", "Giỏ Quà Tặng"],
      recipients: ["Bạn Bè & Đồng Nghiệp", "Đối Tác Kinh Doanh"],
      categoryLabel: "Loại Quà Tặng",
    };
  }
  if (slug === "valentine") {
    return {
      categories: ["Hộp Quà Tặng", "Giỏ Quà Tặng"],
      recipients: ["Người Yêu", "Bạn Bè"],
      categoryLabel: "Loại Quà Tặng",
    };
  }
  if (slug === "8-3") {
    return {
      categories: ["Hộp Quà Tặng", "Giỏ Quà Tặng"],
      recipients: ["Mẹ & Bà", "Bạn Gái", "Đồng Nghiệp Nữ"],
      categoryLabel: "Loại Quà Tặng",
    };
  }
  if (slug === "20-10") {
    return {
      categories: ["Hộp Quà Tặng", "Giỏ Quà Tặng"],
      recipients: ["Mẹ & Bà", "Bạn Gái", "Đồng Nghiệp Nữ"],
      categoryLabel: "Loại Quà Tặng",
    };
  }
  if (slug === "giang-sinh") {
    return {
      categories: ["Hộp Quà Tặng", "Giỏ Quà Tặng"],
      recipients: ["Người Yêu", "Gia Đình", "Bạn Bè"],
      categoryLabel: "Loại Quà Tặng",
    };
  }
  if (slug === "20-11") {
    return {
      categories: ["Hộp Quà Tặng", "Giỏ Quà Tặng"],
      recipients: ["Thầy giáo", "Cô giáo"],
      categoryLabel: "Loại Quà Tặng",
    };
  }
  return {
    categories: ["Hộp Quà Tặng", "Giỏ Quà Tặng"],
    recipients: ["Người Yêu",
      "Gia Đình",
      "Bạn Bè & Đồng Nghiệp",
      "Đối Tác Kinh Doanh"],
    categoryLabel: "Loại Quà Tặng",
  };
};

const PRICE_RANGES = [
  { label: "Dưới 500.000₫", min: 0, max: 500000 },
  { label: "500.000₫ - 1.000.000₫", min: 500000, max: 1000000 },
  { label: "Trên 1.000.000₫", min: 1000000, max: Infinity },
];
type SortOption = "popular" | "price-asc" | "price-desc" | "newest";

interface Props {
  products: Product[];
  slug?: string;
}

export default function ProductFilters({ products, slug }: Props) {
  const { categories: CATEGORIES, recipients: RECIPIENTS, categoryLabel } = getCategoriesAndRecipients(slug);
  const [selectedCategories, setSelectedCategories] = useState<string[]>([]);
  const [selectedRecipients, setSelectedRecipients] = useState<string[]>([]);
  const [selectedPriceRange, setSelectedPriceRange] = useState<number | null>(null);
  const [sortBy, setSortBy] = useState<SortOption>("popular");
  const [animKey, setAnimKey] = useState(0);

  const [searchQuery, setSearchQuery] = useState(() => {
    if (typeof window === 'undefined') return '';
    return new URLSearchParams(window.location.search).get('q') || '';
  });

  const toggleCategory = (cat: string) => {
    setSelectedCategories((prev) =>
      prev.includes(cat) ? prev.filter((c) => c !== cat) : [...prev, cat]
    );
    setAnimKey((k) => k + 1);
  };

  const toggleRecipient = (rec: string) => {
    setSelectedRecipients((prev) =>
      prev.includes(rec) ? prev.filter((r) => r !== rec) : [...prev, rec]
    );
    setAnimKey((k) => k + 1);
  };

  const togglePriceRange = (idx: number) => {
    setSelectedPriceRange((prev) => (prev === idx ? null : idx));
    setAnimKey((k) => k + 1);
  };

  const filteredProducts = useMemo(() => {
    let result = [...products];

    // Filter by search query
    if (searchQuery) {
      result = result.filter(
        (p) =>
          p.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
          p.description.toLowerCase().includes(searchQuery.toLowerCase())
      );
    }

    // Filter by category
    if (selectedCategories.length > 0) {
      result = result.filter(
        (p) => p.category && selectedCategories.includes(p.category)
      );
    }

    // Filter by recipient
    if (selectedRecipients.length > 0) {
      result = result.filter(
        (p) =>
          p.recipient &&
          p.recipient.some((r) => selectedRecipients.includes(r))
      );
    }

    // Filter by price range
    if (selectedPriceRange !== null) {
      const range = PRICE_RANGES[selectedPriceRange];
      result = result.filter(
        (p) => p.priceNumber >= range.min && p.priceNumber < range.max
      );
    }

    // Sort
    switch (sortBy) {
      case "price-asc":
        result.sort((a, b) => a.priceNumber - b.priceNumber);
        break;
      case "price-desc":
        result.sort((a, b) => b.priceNumber - a.priceNumber);
        break;
      case "newest":
        result.reverse();
        break;
      default:
        break;
    }

    return result;
  }, [products, selectedCategories, selectedRecipients, selectedPriceRange, sortBy, searchQuery]);

  const activeFilterCount =
    selectedCategories.length +
    selectedRecipients.length +
    (selectedPriceRange !== null ? 1 : 0) +
    (searchQuery ? 1 : 0);

  const clearAll = () => {
    setSelectedCategories([]);
    setSelectedRecipients([]);
    setSelectedPriceRange(null);
    setSortBy("popular");
    setSearchQuery("");
  };

  return (
    <div className="flex flex-col lg:flex-row gap-16">
      {/* Sidebar Filters */}
      <aside className="w-full lg:w-64 flex-shrink-0 space-y-12">
        
        {/* Gift Type */}
        <section>
          <h3 className="text-xl mb-6 flex items-center gap-3">
          <span className="w-1 h-5 rounded-full" style={{ backgroundColor: "#433b30" }}></span>
          <span style={{ fontFamily: "var(--font-playfair)", color: "#433b30", fontWeight: 700 }}>{categoryLabel}</span>
        </h3>
          <div className="space-y-4">
            {CATEGORIES.map((label) => (
              <label
                key={label}
                className="flex items-center group cursor-pointer"
              >
                <input
                  className="w-4 h-4 rounded-sm cursor-pointer"
                  style={{ borderColor: "#433b30", backgroundColor: "#fffefa", accentColor: "#433b30" }}
                  type="checkbox"
                  checked={selectedCategories.includes(label)}
                  onChange={() => toggleCategory(label)}
                />
                <span
                  style={{ fontFamily: "var(--font-barlow)", color: "#433b30" }}
                  className="ml-3 transition-colors"
                >
                  {label}
                </span>
              </label>
            ))}
          </div>
        </section>

        {/* Recipient */}
        <section>
          <h3 className="text-xl mb-6 flex items-center gap-3">
            <span className="w-1 h-5 rounded-full" style={{ backgroundColor: "#433b30" }}></span>
            <span style={{ fontFamily: "var(--font-playfair)", color: "#433b30", fontWeight: 700 }}>Đối Tượng</span>
          </h3>
          <div className="space-y-4">
            {RECIPIENTS.map((label) => (
              <label
                key={label}
                className="flex items-center group cursor-pointer"
              >
                <input
                  className="w-4 h-4 rounded-sm cursor-pointer"
                  style={{ borderColor: "#433b30", backgroundColor: "#fffefa", accentColor: "#433b30" }}
                  type="checkbox"
                  checked={selectedRecipients.includes(label)}
                  onChange={() => toggleRecipient(label)}
                />
                <span
                  style={{ fontFamily: "var(--font-barlow)", color: "#433b30" }}
                  className="ml-3 transition-colors"
                >
                  {label}
                </span>
              </label>
            ))}
          </div>
        </section>

        {/* Price Range */}
        <section>
          <h3 className="text-xl mb-6 flex items-center gap-3">
            <span className="w-1 h-5 rounded-full" style={{ backgroundColor: "#433b30" }}></span>
            <span style={{ fontFamily: "var(--font-playfair)", color: "#433b30", fontWeight: 700 }}>Khoảng Giá</span>
          </h3>
          <div className="space-y-4">
            {PRICE_RANGES.map((range, idx) => (
              <label
                key={range.label}
                className="flex items-center group cursor-pointer"
              >
                <input
                  className="w-4 h-4 cursor-pointer"
                  style={{ accentColor: "#433b30" }}
                  name="price"
                  type="radio"
                  checked={selectedPriceRange === idx}
                  onChange={() => togglePriceRange(idx)}
                />
                <span
                  style={{ fontFamily: "var(--font-barlow)", color: "#433b30" }}
                  className="ml-3 transition-colors"
                >
                  {range.label}
                </span>
              </label>
            ))}
          </div>
        </section>
      </aside>

      {/* Main Listing */}
      <section className="flex-1">
        {/* Sorting & View Info */}
        <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center mb-12 gap-6 border-b border-stone-200 pb-6">
          <div className="flex items-center gap-4 flex-wrap">
            <p style={{ fontFamily: "var(--font-barlow-condensed)", color: "#433b30", fontSize: "18px" }}>
              Hiển thị{" "}
              <span style={{ color: "#433b30" }} className="font-bold">
                {filteredProducts.length}
              </span>{" "}
              {filteredProducts.length < products.length && (
                <span className="text-stone-400">/ {products.length} </span>
              )}
              sản phẩm 
            </p>
            <button
              onClick={clearAll}
              style={{ fontFamily: "var(--font-barlow-condensed)", color: "#433b30", borderColor: "#d0c9be", fontSize: "15px" }}
              className={`flex items-center gap-1.5 text-xs font-semibold hover:underline transition-all cursor-pointer border rounded-full px-3 py-1 ${activeFilterCount > 0 ? "opacity-100" : "opacity-0 pointer-events-none"}`}
            >
              <span className="material-symbols-outlined text-sm">filter_alt_off</span>
              Xóa bộ lọc ({activeFilterCount})
            </button>
          </div>
          <div className="flex items-center gap-4">
            <span style={{ fontFamily: "var(--font-barlow-condensed)", color: "#877e75", fontSize: "18px" }} className="text-sm uppercase tracking-[0.1em]">
              Sắp xếp:
            </span>
            <select
              style={{ fontFamily: "var(--font-barlow-condensed)", color: "#433b30", fontSize: "18px" }}
              className="bg-transparent border-none py-1 pr-10 focus:ring-0 font-semibold cursor-pointer" 
              value={sortBy}
              onChange={(e) => { setSortBy(e.target.value as SortOption); setAnimKey((k) => k + 1); }}
            >
              <option value="popular">Phổ Biến Nhất</option>
              <option value="price-asc">Giá: Thấp đến Cao</option>
              <option value="price-desc">Giá: Cao đến Thấp</option>
              <option value="newest">Mới Nhất</option>
            </select>
          </div>
        </div>

        {/* Product Grid */}
        {filteredProducts.length > 0 ? (
          <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-3 gap-x-10 gap-y-20">
            {filteredProducts.map((product, idx) => (
              <div
                key={`${animKey}-${product.slug}`}
                className="animate-fade-in-up"
                style={{ animationDelay: `${idx * 80}ms` }}
              >
                <ProductCard
                  product={product}
                  variant="listing"
                />
              </div>
            ))}
          </div>
        ) : (
          <div className="text-center py-32 animate-fade-in">
            <span className="material-symbols-outlined text-6xl text-stone-300 mb-6 block">
              search_off
            </span>
            <h3 style={{ fontFamily: "var(--font-playfair)", color: "#433b30" }} className="text-2xl mb-3">
              Không tìm thấy sản phẩm
            </h3>
            <p style={{ fontFamily: "var(--font-barlow)", color: "#877e75" }} className="mb-8 max-w-md mx-auto">
              Không có sản phẩm nào phù hợp với bộ lọc hiện tại. Hãy thử điều chỉnh tiêu chí tìm kiếm.
            </p>
            <button
              onClick={clearAll}
              style={{ backgroundColor: "#433b30", fontFamily: "var(--font-barlow-condensed)", letterSpacing: "0.1em" }}
              className="text-white px-8 py-3 font-bold text-sm uppercase hover:opacity-90 transition-colors cursor-pointer"
            >
              Xóa bộ lọc
            </button>
          </div>
        )}
      </section>
    </div>
  );
} 
