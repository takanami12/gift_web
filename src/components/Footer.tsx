import Link from "next/link";

export default function Footer() {
  return (
    <footer className="w-full mt-auto bg-[#fefbf4]">
      {/* Main 3-column */}
      <div className="bg-[#fefbf4] px-6 lg:px-20 py-8">
        <div className="max-w-[1500px] mx-auto grid grid-cols-1 lg:grid-cols-3 gap-12 lg:gap-16">
          {/* Col 1 — Brand + Contact */}
          <div>
            <h3 style={{ fontFamily: "var(--font-barlow-condensed)" }} className="text-xl mb-5">
              <span style={{ color: "#433b30" }} className="font-bold">GIFT </span>
              <span style={{ color: "#b1997e" }} className="font-bold">Glamorous</span>
            </h3>
            <p
              style={{ fontFamily: "var(--font-barlow)", color: "#5c5852" }}
              className="text-sm leading-relaxed mb-6"
            >
              Nền tảng thương mại điện tử quà tặng tiên phong ứng dụng Trò chơi hoá tại Việt Nam. Chúng tôi mang đến không gian sáng tạo tự do để bạn tự tay chọn lựa, sắp xếp và gửi gắm trọn vẹn tâm huyết của mình vào từng hộp quà độc bản.
            </p>
            <div
              style={{ fontFamily: "var(--font-barlow)", color: "#b1997e" }}
              className="text-sm space-y-1.5"
            >
              <p>144 Xuân Thủy, Cầu Giấy, Hà Nội</p>
              <p>1900.7700</p>
              <p>contact@giftglamorous.com</p>
            </div>
          </div>

          {/* Col 2 — Khám phá */}
          <div className="lg:pl-8">
            <h3
              style={{ fontFamily: "var(--font-barlow-condensed)", color: "#433b30" }}
              className="text-xl font-bold mb-6"
            >
              Khám phá
            </h3>
            <ul
              style={{ fontFamily: "var(--font-barlow)", color: "#1f1c17" }}
              className="space-y-3 text-sm"
            >
              <li>
                <Link href="/san-pham" className="hover:text-[#b8860b] transition-colors">
                  Sản phẩm
                </Link>
              </li>
              <li>
                <Link href="/collection/doanh-nghiep" className="hover:text-[#b8860b] transition-colors">
                  Quà doanh nghiệp
                </Link>
              </li>
              <li>
                <Link href="/thiet-ke" className="hover:text-[#b8860b] transition-colors">
                  Tự thiết kế
                </Link>
              </li>
              <li>
                <Link href="/collection/tet" className="hover:text-[#b8860b] transition-colors">
                  Dịp quan trọng
                </Link>
              </li>
              <li>
                <Link href="/bo-suu-tap" className="hover:text-[#b8860b] transition-colors">
                  Bộ sưu tập
                </Link>
              </li>
            </ul>
          </div>

          {/* Col 3 — Newsletter */}
          <div>
            <h3
              style={{ fontFamily: "var(--font-barlow-condensed)", color: "#433b30" }}
              className="text-xl font-bold leading-relaxed mb-6"
            >
              Đăng ký để nhận thông tin khuyến mãi sớm nhất tại Gift Glamorous
            </h3>
            <div className="flex border-b border-stone-400 pb-2">
              <input
                style={{ fontFamily: "var(--font-barlow)", color: "#b1997e" }}
                className="flex-1 bg-transparent py-2 text-sm outline-none placeholder:text-[#b1997e]"
                placeholder="Nhập địa chỉ email..."
                type="email"
              />
              <button
                aria-label="Đăng ký nhận tin"
                className="text-stone-700 hover:text-[#b8860b] transition-colors"
              >
                <span className="material-symbols-outlined text-xl">arrow_forward</span>
              </button>
            </div>
            <p
              style={{ fontFamily: "var(--font-barlow)", color: "#b1997e" }}
              className="mt-4 text-xs italic leading-relaxed"
            >
              Đăng ký để nhận thông tin tin tức và các sản phẩm, dịch vụ, ưu đãi mới nhất và đặc quyền dành riêng từ Gift Glamorous.
            </p>
          </div>
        </div>
      </div>

      {/* Bottom — Copyright stripe */}
      <div className="bg-[#433b30] py-2 text-center">
        <p
          style={{ fontFamily: "var(--font-barlow)", color: "#fefbf4" }}
          className="text-xs uppercase tracking-[0.15em] font-semibold"
        >
          &copy; 2026 Gift Glamorous. All rights reserved.
        </p>
      </div>
    </footer>
  );
}
