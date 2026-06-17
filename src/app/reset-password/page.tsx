'use client';

import { useState } from 'react';
import { getSupabaseBrowserClient } from '@/lib/supabase';
import { useRouter } from 'next/navigation';

export default function ResetPasswordPage() {
  const [password, setPassword] = useState('');
  const [confirm, setConfirm] = useState('');
  const [error, setError] = useState('');
  const [success, setSuccess] = useState(false);
  const router = useRouter();

  return (
    <main className="min-h-screen flex items-center justify-center bg-[#faf8f3] px-4">
      <div className="w-full max-w-md bg-white p-10 shadow-sm">
        <h1 style={{ fontFamily: "var(--font-playfair)", color: "#433b30", fontSize: "28px" }} className="mb-6">
          Đặt lại mật khẩu
        </h1>
        {success ? (
          <p style={{ fontFamily: "var(--font-barlow)", color: "#433b30" }}>
            Đổi mật khẩu thành công! Đang chuyển hướng...
          </p>
        ) : (
          <div className="space-y-4">
            <div>
              <label style={{ fontFamily: "var(--font-barlow)", color: "#433b30", fontSize: "14px", fontWeight: 600 }}>Mật khẩu mới</label>
              <input
                type="password"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                className="w-full mt-1 border border-[#d0c9be] bg-white px-3 py-3 outline-none text-[#433b30]"
                style={{ fontFamily: "var(--font-barlow)" }}
              />
            </div>
            <div>
              <label style={{ fontFamily: "var(--font-barlow)", color: "#433b30", fontSize: "14px", fontWeight: 600 }}>Xác nhận mật khẩu</label>
              <input
                type="password"
                value={confirm}
                onChange={(e) => setConfirm(e.target.value)}
                className="w-full mt-1 border border-[#d0c9be] bg-white px-3 py-3 outline-none text-[#433b30]"
                style={{ fontFamily: "var(--font-barlow)" }}
              />
            </div>
            {error && <p style={{ color: "#c0392b", fontSize: "13px", fontStyle: "italic" }}>{error}</p>}
            <button
              onClick={async () => {
                if (password.length < 6) { setError('Mật khẩu tối thiểu 6 ký tự!'); return; }
                if (password !== confirm) { setError('Mật khẩu không khớp!'); return; }
                const supabase = getSupabaseBrowserClient();
                const { error } = await supabase.auth.updateUser({ password });
                if (error) { setError('Không đổi được mật khẩu. Vui lòng thử lại!'); return; }
                setSuccess(true);
                setTimeout(() => router.push('/'), 2000);
              }}
              style={{ fontFamily: "var(--font-playfair)", backgroundColor: "#433b30", color: "#fff", fontSize: "18px" }}
              className="w-full py-4 hover:opacity-90 transition cursor-pointer"
            >
              Xác nhận
            </button>
          </div>
        )}
      </div>
    </main>
  );
}