import Image from "next/image";
import Link from "next/link";

export default function Footer() {
  return (
    <footer className="w-full mt-auto bg-[#fefbf4]">
      {/* Banner — wavy gold line + brand tagline (asset, top-cropped) */}
      <div className="relative w-full overflow-hidden h-[clamp(60px,8vw,140px)]">
        <Image
          src="/images/footer-banner.png"
          alt="Hành trình thiết kế quà tặng"
          fill
          sizes="100vw"
          className="object-cover object-top"
          priority={false}
        />
      </div>

      {/* Main 3-column */}
      <div className="bg-[#fefbf4] px-6 lg:px-20 py-16">
        <div className="max-w-[1500px] mx-auto grid grid-cols-1 lg:grid-cols-3 gap-12 lg:gap-16">
          {/* Col 1 — Brand + Contact */}
          <div>
            <h3 style={{ fontFamily: "var(--font-vollkorn)" }} className="text-3xl mb-5">
              <span style={{ color: "#1f1c17" }} className="font-bold">GIFT </span>
              <span style={{ color: "#b8860b" }} className="italic">Glamorous</span>
            </h3>
            <p
              style={{ fontFamily: "var(--font-nunito-sans)", color: "#5c5852" }}
              className="text-sm leading-relaxed mb-6"
            >
              Nền tảng thương mại điện tử quà tặng tiên phong ứng dụng Trò chơi hoá tại Việt Nam. Chúng tôi mang đến không gian sáng tạo tự do để bạn tự tay chọn lựa, sắp xếp và gửi gắm trọn vẹn tâm huyết của mình vào từng hộp quà độc bản.
            </p>
            <div
              style={{ fontFamily: "var(--font-nunito-sans)", color: "#1f1c17" }}
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
              style={{ fontFamily: "var(--font-barlow-condensed)", color: "#1f1c17" }}
              className="text-xl font-bold uppercase tracking-[0.08em] mb-6"
            >
              Khám phá
            </h3>
            <ul
              style={{ fontFamily: "var(--font-nunito-sans)", color: "#1f1c17" }}
              className="space-y-3 text-sm"
            >
              <li>
                <Link href="/" className="hover:text-[#b8860b] transition-colors">
                  Trang chủ
                </Link>
              </li>
              <li>
                <Link href="/san-pham" className="hover:text-[#b8860b] transition-colors">
                  Sản phẩm quà tặng
                </Link>
              </li>
              <li>
                <Link href="/thiet-ke" className="hover:text-[#b8860b] transition-colors">
                  Phòng tự thiết kế
                </Link>
              </li>
            </ul>
          </div>

          {/* Col 3 — Newsletter */}
          <div>
            <h3
              style={{ fontFamily: "var(--font-nunito-sans)", color: "#1f1c17" }}
              className="text-base leading-relaxed mb-6"
            >
              Đăng ký để nhận thông tin khuyến mãi sớm nhất tại Gift Glamorous
            </h3>
            <div className="flex border-b border-stone-400 pb-2">
              <input
                className="flex-1 bg-transparent py-2 text-sm outline-none placeholder:text-stone-400"
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
              style={{ fontFamily: "var(--font-nunito-sans)", color: "#7c7670" }}
              className="mt-4 text-xs italic leading-relaxed"
            >
              Đăng ký để nhận thông tin tin tức và các sản phẩm, dịch vụ, ưu đãi mới nhất và đặc quyền dành riêng từ Gift Glamorous.
            </p>
          </div>
        </div>
      </div>

      {/* Bottom — Copyright stripe */}
      <div className="bg-black py-4 text-center">
        <p
          style={{ fontFamily: "var(--font-barlow-condensed)", color: "#c9a55c" }}
          className="text-xs uppercase tracking-[0.3em] font-semibold"
        >
          &copy; 2026 Gift Glamorous. All rights reserved.
        </p>
      </div>
    </footer>
  );
}
