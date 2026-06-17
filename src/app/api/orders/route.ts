import { getSupabaseServerClient } from "@/lib/supabase";
import { NextRequest, NextResponse } from "next/server";

export async function POST(req: NextRequest) {
  try {
    const body = await req.json();
    const supabase = getSupabaseServerClient();

    const { error } = await supabase.from("orders").insert({
      user_email: body.user_email || null,
      order_number: body.orderNumber,
      full_name: body.fullName,
      phone: body.phone,
      email: body.email,
      address: body.fullAddress,
      payment_method: body.paymentMethod,
      items: body.items,
      subtotal: body.subtotal,
      shipping_fee: body.shippingFee,
      total: body.total,
    });

    if (error) return NextResponse.json({ error: error.message }, { status: 500 });
    return NextResponse.json({ success: true });
  } catch {
    return NextResponse.json({ error: "Server error" }, { status: 500 });
  }
}

export async function GET(req: NextRequest) {
  try {
    const { searchParams } = new URL(req.url);
    const email = searchParams.get("email");
    const supabase = getSupabaseServerClient();

    const query = supabase.from("orders").select("*").order("created_at", { ascending: false });
    if (email) query.eq("user_email", email);

    const { data, error } = await query;
    if (error) return NextResponse.json({ error: error.message }, { status: 500 });
    return NextResponse.json({ orders: data });
  } catch {
    return NextResponse.json({ error: "Server error" }, { status: 500 });
  }
}