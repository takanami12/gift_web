'use client';

import Link from 'next/link';
import Image from 'next/image';
import { useCart } from '@/lib/cart-context';

export default function Navbar() {
  const { totalItems, cartBounce } = useCart();

  return (
    <div className="sticky top-0 z-50">
      {/* Announcement Bar */}
      <div className="announcement-bar">
        Tận hưởng giao hàng miễn phí toàn quốc với hoá đơn từ 99.000₫ &nbsp;+
      </div>

      {/* Main Navigation */}
      <nav className="cocoon-nav">
        <div className="max-w-[1400px] mx-auto px-6">
          {/* Top row: Left menu - Logo center - Right menu */}
          <div className="flex items-center justify-between py-4">
            {/* Left Menu */}
            <div className="hidden lg:flex items-center gap-8 flex-1">
              <button className="cocoon-nav-link flex items-center gap-1">
                <span className="material-symbols-outlined text-lg">search</span>
              </button>

              {/* San Pham with dropdown */}
              <div className="nav-item group">
                <Link href="/san-pham" className="cocoon-nav-link">
                  Sản phẩm
                </Link>
                <span className="material-symbols-outlined text-xs text-stone-400 group-hover:rotate-180 transition-transform duration-300">
                  expand_more
                </span>
                <div className="nav-dropdown">
                  {[
                    { name: 'Hộp Quà Cao Cấp', slug: 'hop-qua' },
                    { name: 'Giỏ Quà Mây Tre', slug: 'gio-qua' },
                    { name: 'Bộ Trà & Rượu', slug: 'tra-ruou' },
                    { name: 'Quà Tặng Đặc Sản', slug: 'dac-san' },
                  ].map((item) => (
                    <Link
                      key={item.slug}
                      href={`/collection/${item.slug}`}
                      className="nav-dropdown-item"
                    >
                      {item.name}
                      <span className="material-symbols-outlined icon">arrow_forward</span>
                    </Link>
                  ))}
                </div>
              </div>

              {/* Tu thiet ke - GiftCraft Designer */}
              <Link href="/thiet-ke" className="cocoon-nav-link">
                Tự thiết kế
              </Link>

              {/* Dip quan trong */}
              <div className="nav-item group">
                <span className="cocoon-nav-link">Dịp quan trọng</span>
                <span className="material-symbols-outlined text-xs text-stone-400 group-hover:rotate-180 transition-transform duration-300">
                  expand_more
                </span>
                <div className="nav-dropdown">
                  {[
                    { name: 'Tết Nguyên Đán', slug: 'tet' },
                    { name: 'Valentine 14-2', slug: 'valentine' },
                    { name: 'Ngày Phụ nữ 8-3', slug: '8-3' },
                    { name: 'Trung Thu', slug: 'trung-thu' },
                    { name: 'Phụ nữ VN 20-10', slug: '20-10' },
                    { name: 'Nhà giáo VN 20-11', slug: '20-11' },
                    { name: 'Giáng Sinh', slug: 'giang-sinh' },
                  ].map((item) => (
                    <Link
                      key={item.slug}
                      href={`/collection/${item.slug}`}
                      className="nav-dropdown-item !pt-0"
                    >
                      {item.name}
                      <span className="material-symbols-outlined icon">arrow_forward</span>
                    </Link>
                  ))}
                </div>
              </div>
            </div>

            {/* Center Logo */}
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

            {/* Right Menu */}
            <div className="hidden lg:flex items-center gap-8 flex-1 justify-end">
              <Link href="#" className="cocoon-nav-link">
                Đăng nhập
              </Link>
              <Link href="#" className="cocoon-nav-link">
                Liên hệ
              </Link>
              <Link
                href="/gio-hang"
                className={`cocoon-nav-link flex items-center gap-1 relative ${
                  cartBounce ? 'animate-cart-bounce' : ''
                }`}
              >
                Giỏ hàng
                {totalItems > 0 && (
                  <span className="absolute -top-1 -right-3 w-4 h-4 bg-[#2d4a3e] text-white text-[9px] font-bold rounded-full flex items-center justify-center animate-badge-pop">
                    {totalItems > 9 ? '9+' : totalItems}
                  </span>
                )}
              </Link>
              <button className="cocoon-nav-link text-xs border border-stone-300 rounded-full px-3 py-1">
                VI
              </button>
            </div>

            {/* Mobile menu button */}
            <div className="flex lg:hidden items-center gap-4">
              <Link
                href="/gio-hang"
                className={`relative ${cartBounce ? 'animate-cart-bounce' : ''}`}
              >
                <span className="material-symbols-outlined text-stone-700">shopping_bag</span>
                {totalItems > 0 && (
                  <span className="absolute -top-2 -right-2 w-4 h-4 bg-[#2d4a3e] text-white text-[9px] font-bold rounded-full flex items-center justify-center">
                    {totalItems > 9 ? '9+' : totalItems}
                  </span>
                )}
              </Link>
              <button className="text-stone-700">
                <span className="material-symbols-outlined">menu</span>
              </button>
            </div>
          </div>
        </div>
      </nav>
    </div>
  );
}
