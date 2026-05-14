"use client";

import Image from "next/image";
import Link from "next/link";
import QRCode from "qrcode";
import { useEffect, useState } from "react";

interface QrTokenBadgeProps {
  token: string;
  designName: string;
}

export default function QrTokenBadge({ token, designName }: QrTokenBadgeProps) {
  const [dataUrl, setDataUrl] = useState<string | null>(null);
  const [url, setUrl] = useState<string>("");

  useEffect(() => {
    const absolute = `${window.location.origin}/qr/${token}`;
    setUrl(absolute);
    let cancelled = false;
    QRCode.toDataURL(absolute, { margin: 1, scale: 6, color: { dark: "#1f2937" } })
      .then((d) => {
        if (!cancelled) setDataUrl(d);
      })
      .catch((err) => {
        console.error("[QrTokenBadge] generate failed", err);
        if (!cancelled) setDataUrl(null);
      });
    return () => {
      cancelled = true;
    };
  }, [token]);

  return (
    <div className="flex items-center gap-4 rounded-lg border border-stone-200 bg-white p-4 shadow-sm">
      {dataUrl ? (
        <Image
          src={dataUrl}
          alt={`Mã QR truy ngược cho ${designName}`}
          width={128}
          height={128}
          unoptimized
          className="rounded"
        />
      ) : (
        <div
          aria-hidden
          className="h-32 w-32 animate-pulse rounded bg-stone-100"
        />
      )}
      <div className="flex flex-col gap-2 text-sm">
        <span className="font-headline font-bold text-on-surface">{designName}</span>
        <p className="text-xs text-stone-500 leading-relaxed max-w-xs">
          Quét QR hoặc mở liên kết để xem hành trình thiết kế quà tặng theo từng frame.
        </p>
        {url && (
          <Link
            href={url}
            className="inline-flex w-fit items-center gap-1 text-xs font-semibold text-primary underline-offset-2 hover:underline"
          >
            Mở hành trình tặng quà →
          </Link>
        )}
      </div>
    </div>
  );
}
