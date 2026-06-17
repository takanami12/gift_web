'use client';
import { getSupabaseBrowserClient } from '@/lib/supabase';
import emailjs from '@emailjs/browser';
import Link from 'next/link';
import { useCart } from '@/lib/cart-context';
import { useState } from 'react';
import { useEffect } from 'react';

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
  const [hoverSwitch, setHoverSwitch] = useState(false);
  const [contactName, setContactName] = useState('');
  const [contactPhone, setContactPhone] = useState('');
  const [contactEmail, setContactEmail] = useState('');
  const [contactMessage, setContactMessage] = useState('');
  const [sending, setSending] = useState(false);
  const [sent, setSent] = useState(false);
  const [errors, setErrors] = useState<{name?: string; phone?: string; email?: string; message?: string}>({});
  const [authErrors, setAuthErrors] = useState<{email?: string; password?: string; firstName?: string; lastName?: string}>({});
  const [user, setUser] = useState<{email: string} | null>(null);
  const [showUserMenu, setShowUserMenu] = useState(false);

  useEffect(() => {
    const supabase = getSupabaseBrowserClient();
    supabase.auth.getSession().then(({ data }) => {
      if (data.session?.user?.email) {
        setUser({ email: data.session.user.email });
      }
    });
  }, []);


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
          <div className="flex items-center justify-between gap-3 py-1">
            {/* Left — Search bar */}
            <div className="flex-1 flex items-center">
              <form
                role="search"
                className="nav-search hidden lg:flex"
                onSubmit={(e) => {
                  e.preventDefault();
                  const query = (e.currentTarget.querySelector('input') as HTMLInputElement).value.trim();
                  if (query) window.location.href = `/san-pham?q=${encodeURIComponent(query)}`;
                }}
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
              {user ? (
                <div className="relative">
                  <button
                    onClick={() => setShowUserMenu(!showUserMenu)}
                    className="nav-pill-dark hidden lg:inline-flex cursor-pointer"
                  >
                    <span className="material-symbols-outlined text-base">person</span>
                    <span>{user.email.split('@')[0]}</span>
                  </button>
                  {showUserMenu && (
                    <div className="absolute right-0 top-full mt-1 bg-white border border-stone-200 shadow-md rounded-lg py-1 min-w-[160px] z-50">
                      <Link
                        href="/lich-su-mua-hang"
                        onClick={() => setShowUserMenu(false)}
                        className="block px-4 py-2 text-sm text-[#433b30] hover:bg-stone-50"
                        style={{ fontFamily: "var(--font-barlow)" }}
                      >
                        Lịch sử mua hàng
                      </Link>
                      <button
                        onClick={async () => {
                          const supabase = getSupabaseBrowserClient();
                          await supabase.auth.signOut();
                          setUser(null);
                          setShowUserMenu(false);
                        }}
                        className="w-full text-left px-4 py-2 text-sm text-[#433b30] hover:bg-stone-50 cursor-pointer"
                        style={{ fontFamily: "var(--font-barlow)" }}
                      >
                        Đăng xuất
                      </button>
                    </div>
                  )}
                </div>
              ) : (
                <button
                  onClick={() => { setShowAuth(true); setAuthMode('login'); }}
                  className="nav-pill-dark hidden lg:inline-flex cursor-pointer"
                >
                  <span className="material-symbols-outlined text-base">person</span>
                  <span>Đăng nhập</span>
                </button>
              )}   
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
            <Link href="/san-pham" className="cocoon-nav-link nav-menu-link">
              Sản phẩm
            </Link>

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
              <input type="text" value={contactName} onChange={(e) => setContactName(e.target.value)} className="w-full bg-transparent outline-none text-[#433b30]" style={{ fontFamily: "var(--font-barlow)" }} />
            </div>
            {errors.name && <p style={{ fontFamily: "var(--font-barlow)", color: "#c0392b", fontSize: "13px", fontStyle: "italic" }}>{errors.name}</p>}
          </div>
          <div>
            <label style={{ fontFamily: "var(--font-barlow)", color: "#433b30", fontSize: "14px" }}>
              Nhập số điện thoại<span className="text-red-600">*</span>
            </label>
            <div className="border-b border-[#433b30] mt-2 pb-1">
              <input type="tel" value={contactPhone} onChange={(e) => setContactPhone(e.target.value)} className="w-full bg-transparent outline-none text-[#433b30]" style={{ fontFamily: "var(--font-barlow)" }} />
            </div>
            {errors.phone && <p style={{ fontFamily: "var(--font-barlow)", color: "#c0392b", fontSize: "13px", fontStyle: "italic" }}>{errors.phone}</p>}
          </div>
        </div>

        <div>
          <label style={{ fontFamily: "var(--font-barlow)", color: "#433b30", fontSize: "14px" }}>
            Nhập địa chỉ email<span className="text-red-600">*</span>
          </label>
          <div className="border-b border-[#433b30] mt-2 pb-1">
            <input type="email" value={contactEmail} onChange={(e) => setContactEmail(e.target.value)} className="w-full bg-transparent outline-none text-[#433b30]" style={{ fontFamily: "var(--font-barlow)" }} />
          </div>
          {errors.email && <p style={{ fontFamily: "var(--font-barlow)", color: "#c0392b", fontSize: "13px", fontStyle: "italic" }}>{errors.email}</p>}
        </div>

        <div>
          <label style={{ fontFamily: "var(--font-barlow)", color: "#433b30", fontSize: "14px" }}>
            Nhập câu hỏi của bạn ở đây:<span className="text-red-600">*</span>
          </label>
          <div className="border-b border-[#433b30] mt-2">
            <textarea value={contactMessage} onChange={(e) => setContactMessage(e.target.value)} rows={4} className="w-full bg-transparent outline-none text-[#433b30] resize-y" style={{ fontFamily: "var(--font-barlow)" }} />
          </div>
          {errors.message && <p style={{ fontFamily: "var(--font-barlow)", color: "#c0392b", fontSize: "13px", fontStyle: "italic" }}>{errors.message}</p>}
        </div>
      </div>

      {/* Buttons */}
      <div className="grid grid-cols-2">
        <button
          onClick={async () => {
          const newErrors: {name?: string; phone?: string; email?: string; message?: string} = {};
          if (!contactName.trim()) newErrors.name = 'Vui lòng nhập tên của bạn!';
          if (!contactPhone.trim() || !/^[0-9]{10,11}$/.test(contactPhone.replace(/\s/g, ''))) newErrors.phone = 'Vui lòng nhập số điện thoại hợp lệ!';
          if (!contactEmail.trim() || !/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(contactEmail)) newErrors.email = 'Vui lòng nhập email hợp lệ!';
          if (!contactMessage.trim()) newErrors.message = 'Vui lòng nhập câu hỏi!';
          if (Object.keys(newErrors).length > 0) { setErrors(newErrors); return; }
          setErrors({});
          setSending(true);
          try {
            await emailjs.send('service_8y48qii', 'template_z963ex7', { name: contactName, phone: contactPhone, email: contactEmail, message: contactMessage }, '9UajsB-6W4ABOvWar');
            setSent(true);
            setContactName(''); setContactPhone(''); setContactEmail(''); setContactMessage('');
            setTimeout(() => { setSent(false); setShowContact(false); }, 2000);
          } catch (err) { console.error(err); }
          setSending(false);
        }}
          style={{ fontFamily: "var(--font-barlow-condensed)", backgroundColor: "#433b30", color: "#fff", fontSize: "16px", fontWeight: 700, letterSpacing: "0.1em" }}
          className="py-5 uppercase hover:opacity-90 transition cursor-pointer"
        >
          {sending ? "Đang gửi..." : sent ? "Đã gửi! ✓" : "Gửi Yêu Cầu"}
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
          onMouseEnter={() => setHoverSwitch(true)}
          onMouseLeave={() => setHoverSwitch(false)}
          style={{ 
            fontFamily: "var(--font-playfair)", 
            fontSize: "18px", 
            borderColor: "#433b30",
            backgroundColor: hoverSwitch ? "#433b30" : "transparent",
            color: hoverSwitch ? "#fffefa" : "#433b30"
          }}
          className="mt-10 border py-4 px-6 transition cursor-pointer w-full"
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
                <input id="login-email" type="email" className="w-full mt-2 border border-[#d0c9be] bg-white px-3 py-3 outline-none text-[#433b30]" style={{ fontFamily: "var(--font-barlow)" }} />
              </div>
              {authErrors.email && <p style={{ fontFamily: "var(--font-barlow)", color: "#c0392b", fontSize: "13px", fontStyle: "italic" }}>{authErrors.email}</p>}
              <div>
                <div className="flex justify-between">
                  <label style={{ fontFamily: "var(--font-barlow)", color: "#433b30", fontSize: "14px", fontWeight: 600 }}>Mật khẩu<span className="text-red-600">*</span></label>
                  <button
                    type="button"
                    onClick={() => {
                      const input = document.querySelector('#login-password') as HTMLInputElement;
                      if (input) input.type = input.type === 'password' ? 'text' : 'password';
                    }}
                    style={{ fontFamily: "var(--font-barlow)", color: "#433b30", fontSize: "13px" }}
                    className="underline cursor-pointer"
                  >
                    Hiển thị mật khẩu
                  </button>
                </div>
                <input id="login-password" type="password" className="w-full mt-2 border border-[#d0c9be] bg-white px-3 py-3 outline-none text-[#433b30]" style={{ fontFamily: "var(--font-barlow)" }} />
              </div>
              {authErrors.password && <p style={{ fontFamily: "var(--font-barlow)", color: "#c0392b", fontSize: "13px", fontStyle: "italic" }}>{authErrors.password}</p>}
              <button
                type="button"
                onClick={async () => {
                  const emailInput = document.querySelector('#login-email') as HTMLInputElement;
                  if (!emailInput?.value.trim()) {
                    setAuthErrors({ email: 'Vui lòng nhập email để lấy lại mật khẩu!' });
                    return;
                  }
                  const supabase = getSupabaseBrowserClient();
                  const { error } = await supabase.auth.resetPasswordForEmail(emailInput.value, {
                    redirectTo: 'https://gift-web-ivory.vercel.app/reset-password',
                  });
                  if (error) {
                    setAuthErrors({ email: 'Không gửi được email. Vui lòng thử lại!' });
                  } else {
                    alert('Đã gửi email đặt lại mật khẩu! Vui lòng kiểm tra hộp thư.');
                  }
                }}
                style={{ fontFamily: "var(--font-barlow)", color: "#433b30", fontSize: "13px" }}
                className="underline cursor-pointer"
              >
                Quên mật khẩu?
              </button>
              <button
                onClick={async () => {
                  const newErrors: {email?: string; password?: string} = {};
                  const emailInput = document.querySelector('#login-email') as HTMLInputElement;
                  const passwordInput = document.querySelector('#login-password') as HTMLInputElement;
                  if (!emailInput?.value.trim() || !/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(emailInput.value)) newErrors.email = 'Vui lòng nhập email hợp lệ!';
                  if (!passwordInput?.value.trim()) newErrors.password = 'Vui lòng nhập mật khẩu!';
                  if (Object.keys(newErrors).length > 0) { setAuthErrors(newErrors); return; }
                  setAuthErrors({});
                  const supabase = getSupabaseBrowserClient();
                  const { data, error } = await supabase.auth.signInWithPassword({
                    email: emailInput.value,
                    password: passwordInput.value,
                  });
                  if (error) { setAuthErrors({ password: 'Email hoặc mật khẩu không đúng!' }); return; }
                  setUser({ email: data.user.email! });
                  setShowAuth(false);
                }}
                style={{ fontFamily: "var(--font-playfair)", backgroundColor: "#433b30", color: "#fff", fontSize: "18px" }}
                className="w-full py-4 hover:opacity-90 transition cursor-pointer"
              >
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
                  <svg viewBox="0 0 24 24" className="w-4 h-4" fill="currentColor">
                    <path d="M18.71 19.5c-.83 1.24-1.71 2.45-3.05 2.47-1.34.03-1.77-.79-3.29-.79-1.53 0-2 .77-3.27.82-1.31.05-2.3-1.32-3.14-2.53C4.25 17 2.94 12.45 4.7 9.39c.87-1.52 2.43-2.48 4.12-2.51 1.28-.02 2.5.87 3.29.87.78 0 2.26-1.07 3.8-.91.65.03 2.47.26 3.64 1.98-.09.06-2.17 1.28-2.15 3.81.03 3.02 2.65 4.03 2.68 4.04-.03.07-.42 1.44-1.38 2.83M13 3.5c.73-.83 1.94-1.46 2.94-1.5.13 1.17-.34 2.35-1.04 3.19-.69.85-1.83 1.51-2.95 1.42-.15-1.15.41-2.35 1.05-3.11z"/>
                  </svg> Apple
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
                <svg viewBox="0 0 24 24" className="w-4 h-4" fill="currentColor">
                  <path d="M18.71 19.5c-.83 1.24-1.71 2.45-3.05 2.47-1.34.03-1.77-.79-3.29-.79-1.53 0-2 .77-3.27.82-1.31.05-2.3-1.32-3.14-2.53C4.25 17 2.94 12.45 4.7 9.39c.87-1.52 2.43-2.48 4.12-2.51 1.28-.02 2.5.87 3.29.87.78 0 2.26-1.07 3.8-.91.65.03 2.47.26 3.64 1.98-.09.06-2.17 1.28-2.15 3.81.03 3.02 2.65 4.03 2.68 4.04-.03.07-.42 1.44-1.38 2.83M13 3.5c.73-.83 1.94-1.46 2.94-1.5.13 1.17-.34 2.35-1.04 3.19-.69.85-1.83 1.51-2.95 1.42-.15-1.15.41-2.35 1.05-3.11z"/>
                </svg> Apple
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
                  <input id="reg-firstname" type="text" className="w-full mt-1 border border-[#d0c9be] bg-white px-3 py-2 outline-none" style={{ fontFamily: "var(--font-barlow)" }} />
                </div>
                {authErrors.firstName && <p style={{ fontFamily: "var(--font-barlow)", color: "#c0392b", fontSize: "13px", fontStyle: "italic" }}>{authErrors.firstName}</p>}
                <div>
                  <label style={{ fontFamily: "var(--font-barlow)", color: "#433b30", fontSize: "14px", fontWeight: 600 }}>Tên<span className="text-red-600">*</span></label>
                  <input id="reg-lastname" type="text" className="w-full mt-1 border border-[#d0c9be] bg-white px-3 py-2 outline-none" style={{ fontFamily: "var(--font-barlow)" }} />
                </div>
                {authErrors.lastName && <p style={{ fontFamily: "var(--font-barlow)", color: "#c0392b", fontSize: "13px", fontStyle: "italic" }}>{authErrors.lastName}</p>}
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
                <input id="reg-email" type="email" className="w-full mt-1 border border-[#d0c9be] bg-white px-3 py-2 outline-none" style={{ fontFamily: "var(--font-barlow)" }} />
              </div>
              {authErrors.email && <p style={{ fontFamily: "var(--font-barlow)", color: "#c0392b", fontSize: "13px", fontStyle: "italic" }}>{authErrors.email}</p>}
              <div>
                <div className="flex justify-between">
                  <label style={{ fontFamily: "var(--font-barlow)", color: "#433b30", fontSize: "14px", fontWeight: 600 }}>Mật khẩu<span className="text-red-600">*</span></label>
                  <button
                    type="button"
                    onClick={() => {
                      const input = document.querySelector('#reg-password') as HTMLInputElement;
                      if (input) input.type = input.type === 'password' ? 'text' : 'password';
                    }}
                    style={{ fontFamily: "var(--font-barlow)", color: "#433b30", fontSize: "13px" }}
                    className="underline cursor-pointer"
                  >
                    Hiển thị mật khẩu
                  </button>
                </div>
                <input id="reg-password" type="password" className="w-full mt-1 border border-[#d0c9be] bg-white px-3 py-2 outline-none" style={{ fontFamily: "var(--font-barlow)" }} />
              </div>
              {authErrors.password && <p style={{ fontFamily: "var(--font-barlow)", color: "#c0392b", fontSize: "13px", fontStyle: "italic" }}>{authErrors.password}</p>}
              <button
                onClick={async () => {
                  const newErrors: {email?: string; password?: string; firstName?: string; lastName?: string} = {};
                  const firstNameInput = document.querySelector('#reg-firstname') as HTMLInputElement;
                  const lastNameInput = document.querySelector('#reg-lastname') as HTMLInputElement;
                  const emailInput = document.querySelector('#reg-email') as HTMLInputElement;
                  const passwordInput = document.querySelector('#reg-password') as HTMLInputElement;
                  if (!firstNameInput?.value.trim()) newErrors.firstName = 'Vui lòng nhập họ!';
                  if (!lastNameInput?.value.trim()) newErrors.lastName = 'Vui lòng nhập tên!';
                  if (!emailInput?.value.trim() || !/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(emailInput.value)) newErrors.email = 'Vui lòng nhập email hợp lệ!';
                  if (!passwordInput?.value.trim() || passwordInput.value.length < 6) newErrors.password = 'Mật khẩu tối thiểu 6 ký tự!';
                  if (Object.keys(newErrors).length > 0) { setAuthErrors(newErrors); return; }
                  setAuthErrors({});
                  const supabase = getSupabaseBrowserClient();
                  const { error } = await supabase.auth.signUp({
                    email: emailInput.value,
                    password: passwordInput.value,
                    options: { data: { first_name: firstNameInput.value, last_name: lastNameInput.value } }
                  });
                  if (error) { setAuthErrors({ email: error.message }); return; }
                  alert('Đăng ký thành công! Vui lòng kiểm tra email để xác nhận.');
                  setShowAuth(false);
                }}
                style={{ fontFamily: "var(--font-playfair)", backgroundColor: "#433b30", color: "#fff", fontSize: "18px" }}
                className="w-full py-4 hover:opacity-90 transition cursor-pointer"
              >
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
