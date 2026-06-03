import type { Metadata } from "next";
import CollectionShowcase from "@/components/CollectionShowcase";

export const metadata: Metadata = {
  title: "Bộ Sưu Tập | Gift Glamorous",
  description:
    "Khám phá những bộ sưu tập quà tặng được tuyển chọn theo từng dịp đặc biệt — Nhà giáo, Trung Thu, Tết và Giáng Sinh. Mỗi tuyệt tác là một lời gửi gắm yêu thương.",
};

export default function BoSuuTapPage() {
  return <CollectionShowcase />;
}
