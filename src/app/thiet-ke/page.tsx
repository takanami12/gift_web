import Editor from "@/components/decorator/Editor";
import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Tự Thiết Kế Hộp Quà | Gift Glamorous",
  description:
    "Sáng tạo hộp quà của riêng bạn: chọn loại hộp, kích thước, kéo-thả sản phẩm vào hộp, tuỳ chỉnh màu sắc và phụ kiện trước khi đặt hàng.",
};

export default function ThietKePage() {
  return (
    <main className="pt-6 pb-16 px-4 md:px-8 max-w-screen-2xl mx-auto">
      <Editor />
    </main>
  );
}
