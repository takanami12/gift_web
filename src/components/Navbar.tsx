'use client';

import Link from 'next/link';
import { useCart } from '@/lib/cart-context';

const productMenu = [
  { name: 'Hộp Quà Cao Cấp', slug: 'hop-qua' },
  { name: 'Giỏ Quà Mây Tre', slug: 'gio-qua' },
  { name: 'Bộ Trà & Rượu', slug: 'tra-ruou' },
  { name: 'Quà Tặng Đặc Sản', slug: 'dac-san' },
];

const occasionMenu = [
  { name: 'Tết Nguyên Đán', slug: 'tet' },
  { name: 'Valentine 14-2', slug: 'valentine' },
  { name: 'Ngày Phụ nữ 8-3', slug: '8-3' },
  { name: 'Trung Thu', slug: 'trung-thu' },
  { name: 'Phụ nữ VN 20-10', slug: '20-10' },
  { name: 'Nhà giáo VN 20-11', slug: '20-11' },
  { name: 'Giáng Sinh', slug: 'giang-sinh' },
];

export default function Navbar() {
  const { totalItems, cartBounce } = useCart();
  const barlow = { fontFamily: 'var(--font-barlow)' };

  return (
    <div className="sticky top-0 z-50">
      {/* Announcement Bar */}
      <div className="announcement-bar" style={barlow}>
        Giao hàng miễn phí toàn quốc với hoá đơn từ 500.000đ
      </div>

      {/* Main Navigation */}
      <nav className="cocoon-nav">
        <div className="max-w-[1400px] mx-auto px-6">
          {/* Row 1: search · logo · right cluster */}
          <div className="flex items-center justify-between gap-4 py-4">
            {/* Left — Search bar */}
            <div className="flex-1 flex items-center">
              <form
                role="search"
                className="nav-search hidden lg:flex"
                onSubmit={(e) => e.preventDefault()}
                style={barlow}
              >
                <span className="material-symbols-outlined text-lg">search</span>
                <input type="text" placeholder="Tìm kiếm sản phẩm" aria-label="Tìm kiếm sản phẩm" />
              </form>
            </div>

            {/* Center — Logo */}
            <div className="flex-shrink-0">
              <Link href="/" className="flex flex-col items-center gap-0">
                <span className="text-[10px] tracking-[0.3em] text-stone-400 uppercase">the</span>
                <span
                  className="text-3xl font-serif font-bold tracking-wide text-[#b8860b]"
                  style={{ fontVariant: 'small-caps' }}
                >
                  GIFT GLAMOROUS
                </span>
                <span className="text-[9px] tracking-[0.45em] text-stone-400 uppercase">
                  original vietnam
                </span>
              </Link>
            </div>

            {/* Right — Đăng nhập · Liên hệ · Giỏ hàng */}
            <div className="flex-1 flex items-center justify-end gap-5" style={barlow}>
              <Link href="#" className="nav-pill-dark hidden lg:inline-flex">
                <span className="material-symbols-outlined text-base">person</span>
                Đăng nhập
              </Link>
              <Link href="#" className="nav-icon-link hidden lg:inline-flex">
                <span className="material-symbols-outlined text-base">call</span>
                Liên hệ
              </Link>
              <Link
                href="/gio-hang"
                className={`nav-icon-link relative ${cartBounce ? 'animate-cart-bounce' : ''}`}
              >
                <span className="material-symbols-outlined text-base">shopping_bag</span>
                <span className="hidden lg:inline">Giỏ hàng</span>
                {totalItems > 0 && (
                  <span className="cart-badge">{totalItems > 9 ? '9+' : totalItems}</span>
                )}
              </Link>
              <button className="lg:hidden text-stone-700" aria-label="Mở menu">
                <span className="material-symbols-outlined">menu</span>
              </button>
            </div>
          </div>

          {/* Row 2: 5 menu links (centered) */}
          <div
            className="nav-menu-row hidden lg:flex items-center justify-center gap-10 py-3"
            style={barlow}
          >
            {/* Sản phẩm — dropdown */}
            <div className="nav-item group">
              <Link href="/san-pham" className="cocoon-nav-link nav-menu-link">
                Sản phẩm
              </Link>
              <span className="material-symbols-outlined text-xs text-stone-400 group-hover:rotate-180 transition-transform duration-300">
                expand_more
              </span>
              <div className="nav-dropdown">
                {productMenu.map((item) => (
                  <Link key={item.slug} href={`/collection/${item.slug}`} className="nav-dropdown-item">
                    {item.name}
                    <span className="material-symbols-outlined icon">arrow_forward</span>
                  </Link>
                ))}
              </div>
            </div>

            {/* Quà doanh nghiệp */}
            <Link href="/collection/doanh-nghiep" className="cocoon-nav-link nav-menu-link">
              Quà doanh nghiệp
            </Link>

            {/* Tự thiết kế */}
            <Link href="/thiet-ke" className="cocoon-nav-link nav-menu-link">
              Tự thiết kế
            </Link>

            {/* Dịp quan trọng — dropdown */}
            <div className="nav-item group">
              <span className="cocoon-nav-link nav-menu-link">Dịp quan trọng</span>
              <span className="material-symbols-outlined text-xs text-stone-400 group-hover:rotate-180 transition-transform duration-300">
                expand_more
              </span>
              <div className="nav-dropdown">
                {occasionMenu.map((item) => (
                  <Link key={item.slug} href={`/collection/${item.slug}`} className="nav-dropdown-item !pt-0">
                    {item.name}
                    <span className="material-symbols-outlined icon">arrow_forward</span>
                  </Link>
                ))}
              </div>
            </div>

            {/* Bộ sưu tập */}
            <Link href="/bo-suu-tap" className="cocoon-nav-link nav-menu-link">
              Bộ sưu tập
            </Link>
          </div>
        </div>
      </nav>
    </div>
  );
}
