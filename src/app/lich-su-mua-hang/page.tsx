'use client';

import { useEffect, useState } from 'react';
import { getSupabaseBrowserClient } from '@/lib/supabase';
import Link from 'next/link';

interface Order {
  id: string;
  order_number: string;
  full_name: string;
  address: string;
  payment_method: string;
  total: number;
  created_at: string;
  items: Array<{ name: string; quantity: number; price: number }>;
}

export default function OrderHistoryPage() {
  const [orders, setOrders] = useState<Order[]>([]);
  const [loading, setLoading] = useState(true);
  const [email, setEmail] = useState<string | null>(null);

  useEffect(() => {
    const supabase = getSupabaseBrowserClient();
    supabase.auth.getSession().then(async ({ data }) => {
      const userEmail = data.session?.user?.email;
      if (!userEmail) { setLoading(false); return; }
      setEmail(userEmail);
      const res = await fetch(`/api/orders?email=${encodeURIComponent(userEmail)}`);
      const json = await res.json();
      setOrders(json.orders || []);
      setLoading(false);
    });
  }, []);

  if (loading) {
    return (
      <main className="min-h-screen flex items-center justify-center bg-[#faf8f3]">
        <p style={{ fontFamily: "var(--font-barlow)", color: "#877e75" }}>Đang tải...</p>
      </main>
    );
  }

  if (!email) {
    return (
      <main className="min-h-screen flex flex-col items-center justify-center gap-4 bg-[#faf8f3]">
        <p style={{ fontFamily: "var(--font-barlow)", color: "#433b30" }}>Vui lòng đăng nhập để xem lịch sử mua hàng.</p>
        <Link href="/" style={{ fontFamily: "var(--font-barlow)", backgroundColor: "#433b30", color: "#fff" }} className="px-6 py-3">
          Về trang chủ
        </Link>
      </main>
    );
  }

  return (
    <main className="min-h-screen bg-[#faf8f3] pt-32 pb-16 px-4 md:px-8 max-w-4xl mx-auto">
      <h1 style={{ fontFamily: "var(--font-playfair)", color: "#433b30" }} className="text-3xl mb-8">
        Lịch sử mua hàng
      </h1>

      {orders.length === 0 ? (
        <p style={{ fontFamily: "var(--font-barlow)", color: "#877e75" }}>Bạn chưa có đơn hàng nào.</p>
      ) : (
        <div className="flex flex-col gap-6">
          {orders.map((order) => (
            <div key={order.id} className="bg-white rounded-xl border border-stone-200 p-6 shadow-sm">
              <div className="flex justify-between items-start mb-4">
                <div>
                  <p style={{ fontFamily: "var(--font-barlow-condensed)", color: "#B1997E", fontSize: "13px", letterSpacing: "0.1em" }} className="uppercase">
                    {order.order_number}
                  </p>
                  <p style={{ fontFamily: "var(--font-barlow)", color: "#877e75", fontSize: "13px" }}>
                    {new Date(order.created_at).toLocaleDateString("vi-VN", { day: "2-digit", month: "long", year: "numeric" })}
                  </p>
                </div>
                <p style={{ fontFamily: "var(--font-barlow)", color: "#433b30", fontWeight: 700, fontSize: "18px" }}>
                  {order.total.toLocaleString("vi-VN")}₫
                </p>
              </div>
              <div className="flex flex-col gap-1">
                {order.items?.map((item, i) => (
                  <p key={i} style={{ fontFamily: "var(--font-barlow)", color: "#433b30", fontSize: "14px" }}>
                    {item.name} × {item.quantity}
                  </p>
                ))}
              </div>
              <p style={{ fontFamily: "var(--font-barlow)", color: "#877e75", fontSize: "13px" }} className="mt-3">
                {order.address}
              </p>
            </div>
          ))}
        </div>
      )}
    </main>
  );
}