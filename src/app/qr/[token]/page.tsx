import type { Metadata } from "next";
import Link from "next/link";
import { notFound } from "next/navigation";
import QrReplayCanvasClient from "@/components/decorator/QrReplayCanvasClient";
import { getDesignById } from "@/lib/designs";
import { verifyQrToken } from "@/lib/qr";
import { BOX_SIZE_OPTIONS, BOX_TYPE_OPTIONS } from "@/types/design";

export const dynamic = "force-dynamic";

export const metadata: Metadata = {
  title: "Hành trình tặng quà | Gift Glamorous",
  description: "Xem timeline thiết kế hộp quà được lưu qua QR truy ngược.",
};

export default async function QrPage({
  params,
}: {
  params: Promise<{ token: string }>;
}) {
  const { token } = await params;
  const payload = verifyQrToken(token);
  if (!payload) notFound();
  const design = await getDesignById(payload.designId);
  if (!design) notFound();

  const issuedAt = new Date(payload.ts).toLocaleString("vi-VN");
  const itemCount = design.items.length;
  const frameCount = design.frames.length;
  const typeLabel = BOX_TYPE_OPTIONS.find((t) => t.id === design.boxType)?.label ?? "";
  const sizeOpt = BOX_SIZE_OPTIONS.find((s) => s.id === design.boxSize);

  return (
    <main className="pt-32 pb-24 px-6 md:px-8 max-w-screen-lg mx-auto">
      <header className="mb-10 text-center">
        <p className="text-[11px] uppercase tracking-[0.35em] font-semibold text-[#6b5c2e] mb-4">
          GiftCraft · QR Replay
        </p>
        <h1 className="font-headline text-4xl md:text-5xl text-on-surface mb-3 serif-display">
          {design.name}
        </h1>
        <p className="font-body text-stone-500">
          Hành trình tặng quà gồm{" "}
          <strong className="text-stone-800">{itemCount}</strong> sản phẩm qua{" "}
          <strong className="text-stone-800">{frameCount}</strong> frame thiết kế · phát hành{" "}
          {issuedAt}.
        </p>
        {sizeOpt && (
          <p className="mt-2 text-xs text-stone-400">
            Hộp <strong>{typeLabel}</strong> · {sizeOpt.label} ({sizeOpt.hint})
          </p>
        )}
      </header>

      <section className="mx-auto w-full max-w-3xl">
        <QrReplayCanvasClient
          width={720}
          height={520}
          frames={design.frames}
          boxType={design.boxType}
          boxSize={design.boxSize}
          boxColor={design.boxColor}
          wrapColor={design.wrapColor}
          intervalMs={1500}
        />
      </section>

      <footer className="mt-12 flex flex-wrap items-center justify-center gap-4 text-sm">
        <Link
          href="/thiet-ke"
          className="rounded-md border border-stone-300 px-5 py-2 text-stone-700 hover:bg-stone-100"
        >
          Tự thiết kế hộp quà
        </Link>
        <Link
          href="/san-pham"
          className="rounded-md bg-[#2d4a3e] px-5 py-2 font-semibold uppercase tracking-wider text-white hover:bg-[#1e3329]"
        >
          Khám phá bộ sưu tập
        </Link>
      </footer>
    </main>
  );
}
