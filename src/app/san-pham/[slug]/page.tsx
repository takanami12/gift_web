import Image from "next/image";
import Link from "next/link";
import ProductCard from "@/components/ProductCard";
import AddToCartButton from "@/components/AddToCartButton";
import { featuredProduct, reviews, relatedProducts } from "@/lib/data";
import type { Metadata } from "next";
import { redirect } from 'next/navigation';

export const metadata: Metadata = {
  title: "Phượng Hoàng Cát Tường | Gift Glamorous",
  description:
    "Lấy cảm hứng từ hình tượng Phượng Hoàng quyền quý, hộp quà là sự kết tinh của nghệ thuật sơn mài truyền thống và các đặc sản thượng hạng.",
};

export default function ProductDetailPage() {
  redirect('/san-pham');
  const product = featuredProduct;

  return (
    <main className="pt-28 pb-24 bg-[#fdfdfb]">
      {/* Breadcrumbs */}
      <div className="max-w-7xl mx-auto px-8 mb-10">
        <nav className="flex items-center space-x-3 text-sm tracking-wide text-stone-500 uppercase font-medium">
          <Link href="/" className="hover:text-primary transition-colors">
            Trang chủ
          </Link>
          <span className="material-symbols-outlined text-[10px]">
            arrow_forward_ios
          </span>
          <Link
            href="/san-pham"
            className="hover:text-primary transition-colors"
          >
            Hộp Quà Cao Cấp
          </Link>
          <span className="material-symbols-outlined text-[10px]">
            arrow_forward_ios
          </span>
          <span className="text-stone-900 font-semibold">{product.name}</span>
        </nav>
      </div>

      {/* Product Hero Section */}
      <section className="max-w-7xl mx-auto px-8 grid grid-cols-1 lg:grid-cols-12 gap-16">
        {/* Image Gallery */}
        <div className="lg:col-span-7">
          <div className="sticky top-28 space-y-6">
            <div className="relative aspect-[4/5] rounded-sm overflow-hidden bg-stone-100 shadow-sm">
              <Image
                src={product.images.main}
                alt={product.name}
                fill
                className="object-cover"
                sizes="(max-width: 1024px) 100vw, 58vw"
                priority
              />
              <div className="absolute top-8 left-8 px-6 py-2 bg-white/95 backdrop-blur-sm border border-primary/10 text-[10px] font-bold tracking-[0.2em] text-primary uppercase shadow-sm">
                {product.badge}
              </div>
            </div>
            <div className="grid grid-cols-4 gap-4">
              {product.images.thumbnails.map((thumb, i) => (
                <div
                  key={i}
                  className={`aspect-square rounded-sm overflow-hidden cursor-pointer transition-opacity ${
                    i === 0
                      ? "border-2 border-primary"
                      : "opacity-60 hover:opacity-100"
                  }`}
                >
                  <Image
                    src={thumb}
                    alt={`${product.name} - hình ${i + 1}`}
                    width={200}
                    height={200}
                    className="w-full h-full object-cover"
                  />
                </div>
              ))}
            </div>
          </div>
        </div>

        {/* Product Details */}
        <div className="lg:col-span-5 flex flex-col">
          <div className="mb-6">
            <span className="text-primary font-bold tracking-[0.25em] text-[11px] uppercase block mb-3">
              {product.collection}
            </span>
            <h1 className="text-5xl md:text-6xl serif-display leading-[1.1] text-stone-900 mb-6">
              {product.name}
            </h1>
            <div className="flex items-center gap-6 py-4 border-y border-stone-200">
              <div className="flex text-secondary">
                {Array.from({ length: 5 }).map((_, i) => (
                  <span
                    key={i}
                    className="material-symbols-outlined text-sm"
                    style={{
                      fontVariationSettings: `'FILL' ${
                        i < product.rating ? 1 : 0
                      }`,
                    }}
                  >
                    star
                  </span>
                ))}
              </div>
              <span className="text-sm font-medium text-stone-500">
                ({product.reviewCount} nhận xét từ giới tinh hoa)
              </span>
            </div>
          </div>

          <div className="mb-10">
            <div className="flex items-baseline gap-3">
              <span className="text-4xl font-headline font-semibold text-primary">
                {product.price}
              </span>
              <span className="text-xl font-headline text-stone-400">
                {product.currency}
              </span>
            </div>
            <p className="text-xs text-stone-400 mt-2 italic">
              * Giá đã bao gồm thuế VAT và phí đóng gói thủ công
            </p>
          </div>

          <div className="space-y-10">
            {/* Description */}
            <div>
              <h3 className="text-xs font-bold uppercase tracking-widest text-stone-900 mb-4 flex items-center gap-2">
                <span className="w-8 h-[1px] bg-primary"></span>
                Tuyệt tác quà tặng
              </h3>
              <p className="text-stone-600 leading-relaxed font-light text-lg italic">
                {product.description}
              </p>
            </div>

            {/* Product Contents */}
            <div className="bg-stone-50 border border-stone-100 p-8">
              <h3 className="font-headline text-xl font-bold mb-6 text-stone-900">
                Chi Tiết Bên Trong
              </h3>
              <ul className="space-y-4 text-stone-700">
                {product.contents.map((item, i) => (
                  <li
                    key={i}
                    className={`flex justify-between items-end ${
                      i < product.contents.length - 1
                        ? "border-b border-stone-200 pb-2"
                        : ""
                    }`}
                  >
                    <span className="text-sm">{item.name}</span>
                    <span className="font-bold text-stone-900">
                      {item.amount}
                    </span>
                  </li>
                ))}
              </ul>
              <div className="mt-8 flex gap-8 text-[10px] text-stone-400 font-bold uppercase tracking-widest border-t border-stone-200 pt-6">
                <div className="flex items-center gap-2">
                  <span className="material-symbols-outlined text-sm">
                    square_foot
                  </span>
                  {product.dimensions}
                </div>
                <div className="flex items-center gap-2">
                  <span className="material-symbols-outlined text-sm">
                    weight
                  </span>
                  {product.weight}
                </div>
              </div>
            </div>

            {/* CTA Actions */}
            <AddToCartButton
              product={{
                slug: product.slug,
                name: product.name,
                description: product.description,
                price: `${product.price}${product.currency}`,
                priceNumber: parseInt(product.price.replace(/\./g, "")),
                image: product.images.main,
              }}
            />

            {/* Delivery Notice */}
            <div className="flex items-start gap-4 p-5 bg-primary/5 border border-primary/10">
              <span
                className="material-symbols-outlined text-primary"
                style={{ fontVariationSettings: "'FILL' 1" }}
              >
                calendar_today
              </span>
              <div>
                <h4 className="text-xs font-bold text-primary uppercase tracking-widest mb-1">
                  Thời gian vận chuyển Tết
                </h4>
                <p className="text-xs text-stone-600 leading-relaxed">
                  Đơn hàng đặt trước 20 tháng Chạp sẽ được cam kết giao đúng
                  hạn. Vui lòng liên hệ hotline để được hỗ trợ đặc biệt.
                </p>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Product Reviews Section */}
      <section className="max-w-7xl mx-auto px-8 mt-32 border-t border-stone-200 pt-24">
        <div className="flex flex-col md:flex-row md:items-end justify-between mb-16 gap-6">
          <div>
            <h2 className="text-4xl serif-display text-stone-900">
              Cảm Nhận Từ Khách Hàng
            </h2>
            <p className="text-stone-500 mt-3 font-light text-lg">
              Chia sẻ những câu chuyện về quà tặng và sự kết nối.
            </p>
          </div>
          <button className="inline-flex items-center gap-3 text-sm font-bold tracking-widest uppercase text-primary border-b-2 border-primary/20 pb-2 hover:border-primary transition-all cursor-pointer">
            Gửi Đánh Giá Của Bạn
            <span className="material-symbols-outlined text-base">edit</span>
          </button>
        </div>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-12">
          {reviews.map((review, idx) => (
            <div key={idx} className="group">
              <div className="text-secondary mb-6 flex">
                {Array.from({ length: 5 }).map((_, i) => (
                  <span
                    key={i}
                    className="material-symbols-outlined text-sm"
                    style={{
                      fontVariationSettings: `'FILL' ${
                        i < review.rating ? 1 : 0
                      }`,
                    }}
                  >
                    star
                  </span>
                ))}
              </div>
              <p className="text-stone-600 font-light italic text-lg leading-relaxed mb-8">
                {review.comment}
              </p>
              <div className="flex items-center gap-4">
                <Image
                  className="w-12 h-12 rounded-full object-cover ring-2 ring-stone-100"
                  src={review.avatar}
                  alt={review.name}
                  width={48}
                  height={48}
                />
                <div>
                  <p className="font-bold text-stone-900">{review.name}</p>
                  <p className="text-xs uppercase tracking-tighter text-stone-400">
                    {review.title}
                  </p>
                </div>
              </div>
            </div>
          ))}
        </div>
      </section>

      {/* Related Products */}
      <section className="max-w-7xl mx-auto px-8 mt-32">
        <div className="flex items-end justify-between mb-12">
          <h2 className="text-4xl serif-display text-stone-900">
            Dành Cho Bạn
          </h2>
          <Link
            href="/san-pham"
            className="text-sm font-bold tracking-widest uppercase text-stone-400 hover:text-primary transition-colors"
          >
            Xem Tất Cả
          </Link>
        </div>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-12">
          {relatedProducts.map((product) => (
            <ProductCard
              key={product.slug}
              product={product}
              variant="related"
            />
          ))}
        </div>
      </section>
    </main>
  );
}
