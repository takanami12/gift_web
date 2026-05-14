"use client";

import QRCode from "qrcode";
import { useEffect, useId, useRef, useState } from "react";
import { useDesignStore } from "@/store/designStore";

interface ConfirmStepProps {
  previewDataUrl: string | null;
  onAddToCart: () => void;
  onBack: () => void;
}

const MAX_SECONDS = 60;
const SAMPLE_BAR_COUNT = 28;

function genToken(): string {
  return Math.random().toString(36).slice(2, 10);
}

export default function ConfirmStep({ previewDataUrl, onAddToCart, onBack }: ConfirmStepProps) {
  const recipientName = useDesignStore((s) => s.recipientName);
  const message = useDesignStore((s) => s.message);
  const voiceDataUrl = useDesignStore((s) => s.voiceDataUrl);
  const qrToken = useDesignStore((s) => s.qrToken);
  const setRecipientName = useDesignStore((s) => s.setRecipientName);
  const setMessage = useDesignStore((s) => s.setMessage);
  const setVoiceDataUrl = useDesignStore((s) => s.setVoiceDataUrl);
  const setQrToken = useDesignStore((s) => s.setQrToken);

  const recipientId = useId();
  const messageId = useId();

  return (
    <section aria-labelledby="confirm-heading" className="mx-auto max-w-6xl">
      <header className="mb-6 text-center">
        <p className="text-[11px] font-semibold uppercase tracking-[0.35em] text-orange-600">
          Bước 4
        </p>
        <h2
          id="confirm-heading"
          className="mt-2 font-headline text-3xl text-stone-900 serif-display"
        >
          Lời nhắn & Mã QR giọng nói
        </h2>
        <p className="mt-2 text-sm text-stone-500">
          Soạn nội dung thiệp, ghi âm lời chúc — mã QR sẽ in trên thiệp vật lý.
        </p>
      </header>

      <div className="grid gap-5 md:grid-cols-2">
        <CardContent
          recipientId={recipientId}
          messageId={messageId}
          recipientName={recipientName}
          message={message}
          onRecipientChange={setRecipientName}
          onMessageChange={setMessage}
          previewDataUrl={previewDataUrl}
        />
        <VoiceAndQr
          voiceDataUrl={voiceDataUrl}
          qrToken={qrToken}
          onVoiceChange={(url) => {
            setVoiceDataUrl(url);
            if (url && !qrToken) setQrToken(genToken());
            if (!url) setQrToken(null);
          }}
        />
      </div>

      <div className="mt-6 flex flex-col gap-2 sm:flex-row">
        <button
          type="button"
          onClick={onBack}
          className="flex-1 rounded-full border border-stone-300 px-5 py-2.5 text-sm font-semibold text-stone-700 hover:bg-stone-100"
        >
          ← Quay lại chỉnh sửa
        </button>
        <button
          type="button"
          onClick={onAddToCart}
          className="flex-1 rounded-full bg-orange-500 px-5 py-2.5 text-sm font-semibold uppercase tracking-wider text-white shadow-sm transition hover:bg-orange-600"
        >
          Xác nhận & đặt hàng →
        </button>
      </div>
    </section>
  );
}

function CardContent({
  recipientId,
  messageId,
  recipientName,
  message,
  onRecipientChange,
  onMessageChange,
  previewDataUrl,
}: {
  recipientId: string;
  messageId: string;
  recipientName: string;
  message: string;
  onRecipientChange: (v: string) => void;
  onMessageChange: (v: string) => void;
  previewDataUrl: string | null;
}) {
  return (
    <div className="flex flex-col gap-4 rounded-2xl border border-stone-200 bg-white p-5 shadow-sm">
      <div className="flex items-center gap-2">
        <span aria-hidden className="text-amber-700">
          <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
            <rect x="3" y="5" width="18" height="14" rx="2" />
            <path d="M3 7l9 6 9-6" />
          </svg>
        </span>
        <h3 className="text-sm font-semibold text-stone-800">Nội dung thiệp</h3>
      </div>

      <div className="flex flex-col gap-1">
        <label htmlFor={recipientId} className="text-xs font-semibold text-stone-600">
          Người nhận
        </label>
        <input
          id={recipientId}
          type="text"
          value={recipientName}
          onChange={(e) => onRecipientChange(e.target.value)}
          placeholder="VD: Lan Anh"
          maxLength={64}
          className="rounded-md border border-stone-300 bg-white px-3 py-2 text-sm text-stone-800 placeholder-stone-400 focus-visible:border-orange-400 focus-visible:outline-2 focus-visible:outline-offset-1 focus-visible:outline-orange-300"
        />
      </div>

      <div className="flex flex-col gap-1">
        <label htmlFor={messageId} className="text-xs font-semibold text-stone-600">
          Lời chúc
        </label>
        <textarea
          id={messageId}
          value={message}
          onChange={(e) => onMessageChange(e.target.value)}
          placeholder="VD: Gửi đến Lan Anh, chúc bạn sinh nhật vui vẻ…"
          rows={4}
          maxLength={400}
          className="resize-none rounded-md border border-stone-300 bg-white px-3 py-2 text-sm text-stone-800 placeholder-stone-400 focus-visible:border-orange-400 focus-visible:outline-2 focus-visible:outline-offset-1 focus-visible:outline-orange-300"
        />
      </div>

      <CardPreview recipientName={recipientName} message={message} preview={previewDataUrl} />
    </div>
  );
}

function CardPreview({
  recipientName,
  message,
  preview,
}: {
  recipientName: string;
  message: string;
  preview: string | null;
}) {
  const lines = message
    .split("\n")
    .map((line) => line.trim())
    .filter(Boolean);
  const hasContent = lines.length > 0;
  return (
    <div className="rounded-xl border border-amber-300/70 bg-amber-50/70 p-4 ring-1 ring-amber-200/40">
      <p className="text-[10px] font-bold uppercase tracking-[0.3em] text-amber-700">
        Gift Glamorous
      </p>
      <div className="mt-2 min-h-[58px] text-sm italic leading-relaxed text-stone-700">
        {hasContent ? (
          lines.map((line, i) => (
            <p key={`${i}-${line.slice(0, 6)}`}>{line}</p>
          ))
        ) : recipientName ? (
          <p className="text-stone-400">Gửi đến {recipientName}, lời chúc sẽ hiển thị ở đây…</p>
        ) : (
          <p className="text-stone-400">Lời chúc sẽ hiển thị ở đây…</p>
        )}
      </div>
      <hr className="my-3 border-dashed border-amber-300" />
      <div className="flex items-center gap-2 text-[11px] font-semibold text-amber-800">
        <span
          aria-hidden
          className="flex h-7 w-7 items-center justify-center rounded-md bg-white ring-1 ring-amber-300"
        >
          <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
            <rect x="3" y="3" width="7" height="7" />
            <rect x="14" y="3" width="7" height="7" />
            <rect x="3" y="14" width="7" height="7" />
            <rect x="14" y="14" width="3" height="3" />
            <rect x="18" y="18" width="3" height="3" />
          </svg>
        </span>
        Quét để nghe giọng nói
      </div>
      {preview && (
        // eslint-disable-next-line @next/next/no-img-element -- canvas data URL
        <img
          src={preview}
          alt="Preview thiết kế hộp"
          className="mt-3 h-24 w-full rounded-md border border-amber-200 bg-white object-contain"
        />
      )}
    </div>
  );
}

function VoiceAndQr({
  voiceDataUrl,
  qrToken,
  onVoiceChange,
}: {
  voiceDataUrl: string | null;
  qrToken: string | null;
  onVoiceChange: (url: string | null) => void;
}) {
  return (
    <div className="flex flex-col gap-4">
      <VoiceRecorder voiceDataUrl={voiceDataUrl} onVoiceChange={onVoiceChange} />
      <QrCard qrToken={qrToken} hasVoice={!!voiceDataUrl} />
    </div>
  );
}

function VoiceRecorder({
  voiceDataUrl,
  onVoiceChange,
}: {
  voiceDataUrl: string | null;
  onVoiceChange: (url: string | null) => void;
}) {
  const [phase, setPhase] = useState<"idle" | "recording" | "recorded">(
    voiceDataUrl ? "recorded" : "idle",
  );
  const [seconds, setSeconds] = useState(0);
  const [duration, setDuration] = useState(0);
  const [playing, setPlaying] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const recorderRef = useRef<MediaRecorder | null>(null);
  const chunksRef = useRef<BlobPart[]>([]);
  const tickRef = useRef<number | null>(null);
  const audioRef = useRef<HTMLAudioElement | null>(null);

  useEffect(() => {
    return () => {
      if (tickRef.current) window.clearInterval(tickRef.current);
      const r = recorderRef.current;
      if (r && r.state !== "inactive") r.stop();
      r?.stream.getTracks().forEach((t) => t.stop());
    };
  }, []);

  useEffect(() => {
    if (!voiceDataUrl) return;
    const audio = new Audio(voiceDataUrl);
    audioRef.current = audio;
    audio.onloadedmetadata = () => {
      const d = Number.isFinite(audio.duration) ? audio.duration : 0;
      setDuration(d);
    };
    audio.onended = () => setPlaying(false);
    return () => {
      audio.pause();
      audio.src = "";
      audioRef.current = null;
    };
  }, [voiceDataUrl]);

  const startRecord = async () => {
    setError(null);
    try {
      const stream = await navigator.mediaDevices.getUserMedia({ audio: true });
      const mr = new MediaRecorder(stream);
      recorderRef.current = mr;
      chunksRef.current = [];
      mr.ondataavailable = (e) => {
        if (e.data.size > 0) chunksRef.current.push(e.data);
      };
      mr.onstop = () => {
        const blob = new Blob(chunksRef.current, { type: mr.mimeType || "audio/webm" });
        const reader = new FileReader();
        reader.onload = () => {
          onVoiceChange(String(reader.result ?? ""));
          setPhase("recorded");
        };
        reader.readAsDataURL(blob);
        stream.getTracks().forEach((t) => t.stop());
      };
      mr.start();
      setPhase("recording");
      setSeconds(0);
      tickRef.current = window.setInterval(() => {
        setSeconds((s) => {
          if (s + 1 >= MAX_SECONDS) {
            stopRecord();
            return MAX_SECONDS;
          }
          return s + 1;
        });
      }, 1000);
    } catch {
      setError("Không truy cập được microphone. Cho phép quyền và thử lại.");
    }
  };

  const stopRecord = () => {
    if (tickRef.current) {
      window.clearInterval(tickRef.current);
      tickRef.current = null;
    }
    const r = recorderRef.current;
    if (r && r.state !== "inactive") r.stop();
    setDuration(seconds);
  };

  const togglePlay = () => {
    const a = audioRef.current;
    if (!a) return;
    if (playing) {
      a.pause();
      setPlaying(false);
    } else {
      a.currentTime = 0;
      a.play().then(() => setPlaying(true)).catch(() => setPlaying(false));
    }
  };

  const reset = () => {
    audioRef.current?.pause();
    setPlaying(false);
    setSeconds(0);
    setDuration(0);
    onVoiceChange(null);
    setPhase("idle");
  };

  return (
    <section
      aria-label="Ghi âm giọng nói"
      className="rounded-2xl border border-stone-200 bg-white p-5 shadow-sm"
    >
      <header className="mb-3 flex items-center justify-between">
        <div className="flex items-center gap-2">
          <span aria-hidden className="text-violet-700">
            <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
              <rect x="9" y="3" width="6" height="12" rx="3" />
              <path d="M5 11a7 7 0 0 0 14 0" />
              <path d="M12 19v3" />
            </svg>
          </span>
          <h3 className="text-sm font-semibold text-stone-800">Ghi âm giọng nói</h3>
        </div>
        <span className="rounded-full bg-violet-100 px-2 py-0.5 text-[10px] font-semibold tracking-wide text-violet-700">
          Độc quyền
        </span>
      </header>

      <div className="rounded-xl bg-violet-50 p-4 ring-1 ring-violet-100">
        {phase === "idle" && (
          <div className="flex flex-col items-center gap-3 py-2">
            <Waveform bars={SAMPLE_BAR_COUNT} animated={false} />
            <p className="text-[12px] text-violet-700">Tối đa {MAX_SECONDS} giây</p>
            <button
              type="button"
              onClick={startRecord}
              className="flex items-center gap-2 rounded-full bg-violet-600 px-4 py-2 text-sm font-semibold text-white shadow-sm transition hover:bg-violet-700"
            >
              <span aria-hidden className="h-2 w-2 rounded-full bg-red-400" />
              Bắt đầu ghi âm
            </button>
          </div>
        )}

        {phase === "recording" && (
          <div className="flex flex-col items-center gap-3 py-2">
            <Waveform bars={SAMPLE_BAR_COUNT} animated />
            <p className="font-mono text-sm text-violet-800">
              {formatTime(seconds)} / {formatTime(MAX_SECONDS)} giây
            </p>
            <button
              type="button"
              onClick={stopRecord}
              className="rounded-full bg-violet-700 px-4 py-2 text-sm font-semibold text-white shadow-sm transition hover:bg-violet-800"
            >
              ⏹ Dừng ghi
            </button>
          </div>
        )}

        {phase === "recorded" && (
          <div className="flex items-center gap-3">
            <button
              type="button"
              onClick={togglePlay}
              aria-label={playing ? "Tạm dừng" : "Phát"}
              className="flex h-12 w-12 shrink-0 items-center justify-center rounded-full bg-violet-700 text-white shadow-sm transition hover:bg-violet-800"
            >
              {playing ? (
                <svg width="14" height="14" viewBox="0 0 24 24" fill="currentColor">
                  <rect x="6" y="5" width="4" height="14" rx="1" />
                  <rect x="14" y="5" width="4" height="14" rx="1" />
                </svg>
              ) : (
                <svg width="14" height="14" viewBox="0 0 24 24" fill="currentColor">
                  <path d="M8 5v14l11-7z" />
                </svg>
              )}
            </button>
            <div className="flex flex-1 flex-col gap-1">
              <Waveform bars={SAMPLE_BAR_COUNT} animated={playing} />
              <p className="font-mono text-[11px] text-violet-800">
                {formatTime(playing ? Math.min(seconds, duration || MAX_SECONDS) : duration)} / {formatTime(MAX_SECONDS)} giây
              </p>
            </div>
          </div>
        )}

        {phase === "recorded" && (
          <div className="mt-3 flex gap-2">
            <button
              type="button"
              onClick={reset}
              className="flex-1 rounded-full border border-violet-300 bg-white px-3 py-2 text-xs font-semibold text-violet-700 hover:bg-violet-100"
            >
              Ghi lại
            </button>
            <button
              type="button"
              disabled
              className="flex-1 rounded-full bg-violet-700 px-3 py-2 text-xs font-semibold text-white opacity-90"
            >
              Dùng đoạn này
            </button>
          </div>
        )}

        {error && (
          <p role="status" className="mt-2 text-[11px] text-red-600">
            {error}
          </p>
        )}
      </div>
    </section>
  );
}

function Waveform({ bars, animated }: { bars: number; animated: boolean }) {
  return (
    <div className="flex h-8 items-end justify-center gap-[2px]">
      {Array.from({ length: bars }).map((_, i) => {
        const h = 30 + Math.sin(i * 0.7) * 22 + (i % 5) * 4;
        return (
          <span
            key={i}
            aria-hidden
            className={`w-[3px] rounded-sm bg-violet-500 ${animated ? "animate-pulse" : "opacity-70"}`}
            style={{ height: `${Math.max(8, Math.min(36, h))}%`, animationDelay: `${i * 30}ms` }}
          />
        );
      })}
    </div>
  );
}

function QrCard({ qrToken, hasVoice }: { qrToken: string | null; hasVoice: boolean }) {
  const [qrSrc, setQrSrc] = useState<string | null>(null);
  const url = qrToken ? `giftglamorous.vn/qr/${qrToken}` : null;

  useEffect(() => {
    if (!url) return;
    let cancelled = false;
    QRCode.toDataURL(`https://${url}`, {
      margin: 1,
      scale: 6,
      color: { dark: "#15803d", light: "#ffffff" },
    }).then((d) => {
      if (!cancelled) setQrSrc(d);
    });
    return () => {
      cancelled = true;
      setQrSrc(null);
    };
  }, [url]);

  if (!hasVoice) {
    return (
      <section
        aria-label="Mã QR"
        className="rounded-2xl border border-dashed border-stone-300 bg-stone-50 p-5 text-center text-xs text-stone-500"
      >
        Mã QR sẽ tạo sau khi bạn ghi âm xong.
      </section>
    );
  }

  return (
    <section
      aria-label="Mã QR đã tạo"
      className="rounded-2xl border border-emerald-200 bg-emerald-50/80 p-4 ring-1 ring-emerald-100"
    >
      <div className="flex items-center gap-3">
        <div className="flex h-16 w-16 shrink-0 items-center justify-center rounded-md bg-white ring-1 ring-emerald-200">
          {qrSrc ? (
            // eslint-disable-next-line @next/next/no-img-element -- generated dataURL
            <img src={qrSrc} alt="QR code" className="h-full w-full object-contain p-1" />
          ) : (
            <span className="text-[10px] text-stone-400">Đang tạo…</span>
          )}
        </div>
        <div className="flex flex-col gap-0.5">
          <p className="text-sm font-bold text-emerald-800">Mã QR đã tạo thành công</p>
          <p className="font-mono text-[11px] text-emerald-700">{url}</p>
          <p className="text-[11px] text-emerald-700">
            In lên thiệp vật lý · Quét để nghe giọng nói
          </p>
        </div>
      </div>
    </section>
  );
}

function formatTime(s: number): string {
  const total = Math.max(0, Math.floor(s));
  const mm = Math.floor(total / 60);
  const ss = total % 60;
  return `${String(mm).padStart(1, "0")}:${String(ss).padStart(2, "0")}`;
}
