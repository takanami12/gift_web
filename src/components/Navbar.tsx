'use client';

import Link from 'next/link';
import { useCart } from '@/lib/cart-context';
import { useState } from 'react';

const productMenu = [
  { name: 'Hộp Quà Cao Cấp', slug: 'hop-qua' },
  { name: 'Giỏ Quà Mây Tre', slug: 'gio-qua' },
  { name: 'Bộ Trà & Rượu', slug: 'tra-ruou' },
  { name: 'Quà Tặng Đặc Sản', slug: 'dac-san' },
];

const occasionMenu = [
  { name: 'Tết Nguyên Đán', slug: 'tet' },
  { name: 'Lễ Tình Nhân 14-2', slug: 'valentine' },
  { name: 'Ngày Quốc tế Phụ nữ 8-3', slug: '8-3' },
  { name: 'Tết Trung Thu', slug: 'trung-thu' },
  { name: 'Ngày Phụ nữ Việt Nam 20-10', slug: '20-10' },
  { name: 'Ngày Nhà giáo Việt Nam 20-11', slug: '20-11' },
  { name: 'Lễ Giáng Sinh', slug: 'giang-sinh' },
];

export default function Navbar() {
  const { totalItems, cartBounce } = useCart();
  const barlow = { fontFamily: 'var(--font-barlow)' };
  const [showContact, setShowContact] = useState(false);
  const [showAuth, setShowAuth] = useState(false);
  const [authMode, setAuthMode] = useState<'login' | 'register'>('login');

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
          <div className="flex items-center justify-between gap-3 py-2">
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
                  className="text-3xl font-bold tracking-wide"
                  style={{ fontFamily: 'var(--font-bodoni)', color: '#433B30', fontVariant: 'small-caps' }}
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
              <button onClick={() => { setShowAuth(true); setAuthMode('login'); }} className="nav-pill-dark hidden lg:inline-flex cursor-pointer">
                <span className="material-symbols-outlined text-base">person</span>
                Đăng nhập
              </button>   
              <button onClick={() => setShowContact(true)} className="nav-icon-link hidden lg:inline-flex cursor-pointer">
                <span className="material-symbols-outlined text-base">call</span>
                Liên hệ
              </button>
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
            className="nav-menu-row hidden lg:flex items-center justify-center gap-5 py-0"
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
                  <Link key={item.slug} href={`/collection/${item.slug}`} className="nav-dropdown-item !pt-0" style={{ color: "#433b30" }}>
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
      {/* Modal Liên hệ */}
{showContact && (
  <div className="fixed inset-0 z-[999] flex items-center justify-center bg-black/50" onClick={() => setShowContact(false)}>
    <div className="relative w-full max-w-2xl bg-[#faf8f3] mx-4" onClick={(e) => e.stopPropagation()}>
      {/* Header */}
      <div className="bg-[#f0ebe0] px-10 py-8 text-center">
        <h2 style={{ fontFamily: "var(--font-playfair)", color: "#433b30", fontSize: "32px", fontStyle: "italic", fontWeight: 400 }}>
          Liên hệ với Gift Glamorous
        </h2>
        <button onClick={() => setShowContact(false)} className="absolute top-6 right-6 text-[#433b30] hover:opacity-60 cursor-pointer">
          <span className="material-symbols-outlined text-2xl">close</span>
        </button>
      </div>

      {/* Form */}
      <div className="px-10 py-8 space-y-6">
        <div className="grid grid-cols-2 gap-6">
          <div>
            <label style={{ fontFamily: "var(--font-barlow)", color: "#433b30", fontSize: "14px" }}>
              Nhập tên của bạn<span className="text-red-600">*</span>
            </label>
            <div className="border-b border-[#433b30] mt-2 pb-1">
              <input type="text" className="w-full bg-transparent outline-none text-[#433b30]" style={{ fontFamily: "var(--font-barlow)" }} />
            </div>
          </div>
          <div>
            <label style={{ fontFamily: "var(--font-barlow)", color: "#433b30", fontSize: "14px" }}>
              Nhập số điện thoại<span className="text-red-600">*</span>
            </label>
            <div className="border-b border-[#433b30] mt-2 pb-1">
              <input type="tel" className="w-full bg-transparent outline-none text-[#433b30]" style={{ fontFamily: "var(--font-barlow)" }} />
            </div>
          </div>
        </div>

        <div>
          <label style={{ fontFamily: "var(--font-barlow)", color: "#433b30", fontSize: "14px" }}>
            Nhập địa chỉ email<span className="text-red-600">*</span>
          </label>
          <div className="border-b border-[#433b30] mt-2 pb-1">
            <input type="email" className="w-full bg-transparent outline-none text-[#433b30]" style={{ fontFamily: "var(--font-barlow)" }} />
          </div>
        </div>

        <div>
          <label style={{ fontFamily: "var(--font-barlow)", color: "#433b30", fontSize: "14px" }}>
            Nhập câu hỏi của bạn ở đây:<span className="text-red-600">*</span>
          </label>
          <div className="border-b border-[#433b30] mt-2">
            <textarea rows={4} className="w-full bg-transparent outline-none text-[#433b30] resize-y" style={{ fontFamily: "var(--font-barlow)" }} />
          </div>
        </div>
      </div>

      {/* Buttons */}
      <div className="grid grid-cols-2">
        <button
          style={{ fontFamily: "var(--font-barlow-condensed)", backgroundColor: "#433b30", color: "#fff", fontSize: "16px", fontWeight: 700, letterSpacing: "0.1em" }}
          className="py-5 uppercase hover:opacity-90 transition cursor-pointer"
        >
          Gửi Yêu Cầu
        </button>
        <button
          style={{ fontFamily: "var(--font-barlow-condensed)", color: "#433b30", fontSize: "16px", fontWeight: 700, letterSpacing: "0.1em", border: "1px solid #433b30" }}
          className="py-5 uppercase flex items-center justify-center gap-3 hover:bg-[#f0ebe0] transition cursor-pointer"
        >
          <span className="material-symbols-outlined">wifi_calling_3</span>
          Gọi Hotline
        </button>
      </div>
    </div>
  </div>
)}
{/* Modal Đăng nhập / Đăng ký */}
{showAuth && (
  <div className="fixed inset-0 z-[999] flex items-center justify-center bg-black/70" onClick={() => setShowAuth(false)}>
    <div className="relative w-full max-w-3xl bg-[#faf8f3] mx-4 grid grid-cols-2" onClick={(e) => e.stopPropagation()}>
      
      {/* Nút đóng */}
      <button onClick={() => setShowAuth(false)} className="absolute top-5 right-5 text-[#433b30] hover:opacity-60 cursor-pointer z-10">
        <span className="material-symbols-outlined text-2xl">close</span>
      </button>

      {/* Cột trái */}
      <div className="bg-[#f0ebe0] p-10 flex flex-col justify-between">
        <div>
          <h2 style={{ fontFamily: "var(--font-playfair)", color: "#433b30", fontSize: "28px", lineHeight: 1.3 }}>
            <span className="italic font-normal">Mở khóa </span>
            <span className="font-bold not-italic uppercase">Đặc Quyền</span>
            <br />
            <span className="italic font-normal">Thành viên Glamorous</span>
          </h2>
          <ul className="mt-8 space-y-3">
            {["Thanh toán nhanh chóng", "Trở thành thành viên Glamorous Club – tích điểm đổi quà tức thì!", "Trải nghiệm sớm các bộ sưu tập mới & ưu đãi độc quyền"].map((item) => (
              <li key={item} style={{ fontFamily: "var(--font-barlow)", color: "#433b30", fontSize: "14px" }} className="flex items-start gap-2">
                <span className="material-symbols-outlined text-sm mt-0.5" style={{ color: "#433b30" }}>check</span>
                {item}
              </li>
            ))}
          </ul>
        </div>
        <button
          onClick={() => setAuthMode(authMode === 'login' ? 'register' : 'login')}
          style={{ fontFamily: "var(--font-playfair)", color: "#433b30", fontSize: "18px", borderColor: "#433b30" }}
          className="mt-10 border py-4 px-6 hover:bg-[#433b30] hover:text-white transition cursor-pointer"
        >
          {authMode === 'login' ? 'Tạo tài khoản mới' : 'Đăng nhập'}
        </button>
      </div>

      {/* Cột phải */}
      <div className="bg-[#faf8f3] p-10">
        {authMode === 'login' ? (
          <>
            <h3 style={{ fontFamily: "var(--font-playfair)", color: "#433b30", fontSize: "32px" }} className="mb-6">Đăng nhập</h3>
            <div className="space-y-5">
              <div>
                <label style={{ fontFamily: "var(--font-barlow)", color: "#433b30", fontSize: "14px", fontWeight: 600 }}>Email<span className="text-red-600">*</span></label>
                <input type="email" className="w-full mt-2 border border-[#d0c9be] bg-white px-3 py-3 outline-none text-[#433b30]" style={{ fontFamily: "var(--font-barlow)" }} />
              </div>
              <div>
                <div className="flex justify-between">
                  <label style={{ fontFamily: "var(--font-barlow)", color: "#433b30", fontSize: "14px", fontWeight: 600 }}>Mật khẩu<span className="text-red-600">*</span></label>
                  <button style={{ fontFamily: "var(--font-barlow)", color: "#433b30", fontSize: "13px" }} className="underline cursor-pointer">Hiển thị mật khẩu</button>
                </div>
                <input type="password" className="w-full mt-2 border border-[#d0c9be] bg-white px-3 py-3 outline-none text-[#433b30]" style={{ fontFamily: "var(--font-barlow)" }} />
              </div>
              <button style={{ fontFamily: "var(--font-barlow)", color: "#433b30", fontSize: "13px" }} className="underline cursor-pointer">Quên mật khẩu?</button>
              <button style={{ fontFamily: "var(--font-playfair)", backgroundColor: "#433b30", color: "#fff", fontSize: "18px" }} className="w-full py-4 hover:opacity-90 transition cursor-pointer">
                Đăng nhập
              </button>
              <div className="flex items-center gap-3">
                <div className="flex-1 h-px bg-[#d0c9be]" />
                <span style={{ fontFamily: "var(--font-barlow)", color: "#877e75", fontSize: "11px", letterSpacing: "0.1em" }}>HOẶC ĐĂNG NHẬP BẰNG</span>
                <div className="flex-1 h-px bg-[#d0c9be]" />
              </div>
              <div className="grid grid-cols-2 gap-3">
                <button className="flex items-center justify-center gap-2 border border-[#d0c9be] py-3 hover:bg-stone-50 cursor-pointer" style={{ fontFamily: "var(--font-barlow)", color: "#433b30", fontSize: "14px" }}>
                  <img src="https://www.google.com/favicon.ico" className="w-4 h-4" /> Google
                </button>
                <button className="flex items-center justify-center gap-2 border border-[#d0c9be] py-3 hover:bg-stone-50 cursor-pointer" style={{ fontFamily: "var(--font-barlow)", color: "#433b30", fontSize: "14px" }}>
                  <span className="material-symbols-outlined text-base">apple</span> Apple
                </button>
              </div>
            </div>
          </>
        ) : (
          <>
            <h3 style={{ fontFamily: "var(--font-playfair)", color: "#433b30", fontSize: "28px" }} className="mb-2">Tạo tài khoản mới</h3>
            <div className="flex items-center gap-3 mb-4">
              <div className="flex-1 h-px bg-[#d0c9be]" />
              <span style={{ fontFamily: "var(--font-barlow)", color: "#877e75", fontSize: "11px", letterSpacing: "0.1em" }}>ĐĂNG KÝ NHANH</span>
              <div className="flex-1 h-px bg-[#d0c9be]" />
            </div>
            <div className="grid grid-cols-2 gap-3 mb-4">
              <button className="flex items-center justify-center gap-2 border border-[#d0c9be] py-3 hover:bg-stone-50 cursor-pointer" style={{ fontFamily: "var(--font-barlow)", color: "#433b30", fontSize: "14px" }}>
                <img src="https://www.google.com/favicon.ico" className="w-4 h-4" /> Google
              </button>
              <button className="flex items-center justify-center gap-2 border border-[#d0c9be] py-3 hover:bg-stone-50 cursor-pointer" style={{ fontFamily: "var(--font-barlow)", color: "#433b30", fontSize: "14px" }}>
                <span className="material-symbols-outlined text-base">apple</span> Apple
              </button>
            </div>
            <div className="flex items-center gap-3 mb-4">
              <div className="flex-1 h-px bg-[#d0c9be]" />
              <span style={{ fontFamily: "var(--font-barlow)", color: "#877e75", fontSize: "11px", letterSpacing: "0.1em" }}>ĐĂNG KÝ BẰNG EMAIL</span>
              <div className="flex-1 h-px bg-[#d0c9be]" />
            </div>
            <div className="space-y-4">
              <div className="grid grid-cols-2 gap-3">
                <div>
                  <label style={{ fontFamily: "var(--font-barlow)", color: "#433b30", fontSize: "14px", fontWeight: 600 }}>Họ<span className="text-red-600">*</span></label>
                  <input type="text" className="w-full mt-1 border border-[#d0c9be] bg-white px-3 py-2 outline-none" style={{ fontFamily: "var(--font-barlow)" }} />
                </div>
                <div>
                  <label style={{ fontFamily: "var(--font-barlow)", color: "#433b30", fontSize: "14px", fontWeight: 600 }}>Tên<span className="text-red-600">*</span></label>
                  <input type="text" className="w-full mt-1 border border-[#d0c9be] bg-white px-3 py-2 outline-none" style={{ fontFamily: "var(--font-barlow)" }} />
                </div>
              </div>
              <div>
                <label style={{ fontFamily: "var(--font-barlow)", color: "#433b30", fontSize: "14px", fontWeight: 600 }}>Ngày sinh</label>
                <div className="grid grid-cols-3 gap-2 mt-1">
                  <input placeholder="DD" className="border border-[#d0c9be] bg-white px-3 py-2 outline-none text-center" style={{ fontFamily: "var(--font-barlow)" }} />
                  <input placeholder="MM" className="border border-[#d0c9be] bg-white px-3 py-2 outline-none text-center" style={{ fontFamily: "var(--font-barlow)" }} />
                  <input placeholder="YYYY" className="border border-[#d0c9be] bg-white px-3 py-2 outline-none text-center" style={{ fontFamily: "var(--font-barlow)" }} />
                </div>
              </div>
              <div>
                <label style={{ fontFamily: "var(--font-barlow)", color: "#433b30", fontSize: "14px", fontWeight: 600 }}>Email<span className="text-red-600">*</span></label>
                <input type="email" className="w-full mt-1 border border-[#d0c9be] bg-white px-3 py-2 outline-none" style={{ fontFamily: "var(--font-barlow)" }} />
              </div>
              <div>
                <div className="flex justify-between">
                  <label style={{ fontFamily: "var(--font-barlow)", color: "#433b30", fontSize: "14px", fontWeight: 600 }}>Mật khẩu<span className="text-red-600">*</span></label>
                  <button style={{ fontFamily: "var(--font-barlow)", color: "#433b30", fontSize: "13px" }} className="underline cursor-pointer">Hiển thị mật khẩu</button>
                </div>
                <input type="password" className="w-full mt-1 border border-[#d0c9be] bg-white px-3 py-2 outline-none" style={{ fontFamily: "var(--font-barlow)" }} />
              </div>
              <button style={{ fontFamily: "var(--font-playfair)", backgroundColor: "#433b30", color: "#fff", fontSize: "18px" }} className="w-full py-4 hover:opacity-90 transition cursor-pointer">
                Đăng ký ngay
              </button>
            </div>
          </>
        )}
      </div>
    </div>
  </div>
)}
    </div>
  );
}
