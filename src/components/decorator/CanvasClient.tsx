"use client";

import dynamic from "next/dynamic";

const CanvasClient = dynamic(() => import("./Canvas"), {
  ssr: false,
  loading: () => (
    <div className="h-[500px] w-full animate-pulse rounded-xl border border-stone-200 bg-stone-100" />
  ),
});

export default CanvasClient;
