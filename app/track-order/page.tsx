"use client";

import { useState } from "react";

import Link from "next/link";

import { ArrowLeft, Search } from "lucide-react";

import { supabase } from "@/lib/supabase";

type Order = {
  id: number;
  customer_name: string;
  phone: string;
  total: number;
  status: string;
};

export default function TrackOrderPage() {
  const [phone, setPhone] = useState("");

  const [orders, setOrders] = useState<Order[]>(
    []
  );

  const [loading, setLoading] =
    useState(false);

  const searchOrders = async () => {
    if (!phone) return;

    setLoading(true);

    const { data } = await supabase
      .from("orders")
      .select("*")
      .eq("phone", phone)
      .order("id", { ascending: false });

    setOrders(data || []);

    setLoading(false);
  };

  return (
    <main className="min-h-screen bg-gray-100 p-4">
      <Link
        href="/"
        className="mb-5 flex h-11 w-11 items-center justify-center rounded-full bg-white shadow"
      >
        <ArrowLeft size={24} />
      </Link>

      <h1 className="mb-6 text-3xl font-extrabold text-slate-900">
        Track Order
      </h1>

      <div className="rounded-3xl bg-white p-4 shadow-sm">
        <div className="flex gap-3">
          <input
            type="text"
            placeholder="Enter phone number"
            value={phone}
            onChange={(e) =>
              setPhone(e.target.value)
            }
            className="h-14 flex-1 rounded-2xl border px-4 outline-none"
          />

          <button
            onClick={searchOrders}
            className="flex h-14 w-14 items-center justify-center rounded-2xl bg-orange-500 text-white"
          >
            <Search size={22} />
          </button>
        </div>
      </div>

      <div className="mt-6 space-y-4">
        {loading && (
          <p className="font-bold text-slate-500">
            Loading...
          </p>
        )}

        {!loading &&
          orders.map((order) => (
            <div
              key={order.id}
              className="rounded-3xl bg-white p-4 shadow-sm"
            >
              <div className="flex items-center justify-between">
                <h2 className="text-xl font-extrabold">
                  Order #{order.id}
                </h2>

                <span className="rounded-full bg-orange-100 px-3 py-1 text-xs font-bold text-orange-600">
                  {order.status}
                </span>
              </div>

              <p className="mt-3 font-bold">
                {order.customer_name}
              </p>

              <p className="text-slate-500">
                {order.phone}
              </p>

              <p className="mt-4 text-2xl font-extrabold text-orange-500">
                ৳{order.total}
              </p>
            </div>
          ))}
      </div>
    </main>
  );
}