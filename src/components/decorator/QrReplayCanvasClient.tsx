"use client";

import dynamic from "next/dynamic";

const QrReplayCanvasClient = dynamic(() => import("./QrReplayCanvas"), {
  ssr: false,
  loading: () => (
    <div className="h-[400px] w-full animate-pulse rounded-xl border border-stone-200 bg-stone-100" />
  ),
});

export default QrReplayCanvasClient;
