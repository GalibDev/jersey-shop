"use client";

import { useState } from "react";
import Link from "next/link";
import { ArrowLeft } from "lucide-react";
import { useRouter } from "next/navigation";
import toast from "react-hot-toast";

import { useCartStore } from "@/store/cartStore";
import { supabase } from "@/lib/supabase";
import BottomNav from "@/components/BottomNav";

export default function CheckoutPage() {
  const router = useRouter();

  const cart = useCartStore((state) => state.cart);
  const clearCart = useCartStore((state) => state.clearCart);

  const total = cart.reduce((acc, item) => acc + item.price, 0);

  const [name, setName] = useState("");
  const [phone, setPhone] = useState("");
  const [address, setAddress] = useState("");
  const [loading, setLoading] = useState(false);

  const handleOrder = async (e: React.FormEvent) => {
    e.preventDefault();

    if (cart.length === 0) {
      toast.error("Your cart is empty");
      return;
    }

    setLoading(true);

    const { error } = await supabase.from("orders").insert([
      {
        customer_name: name,
        phone,
        address,
        products: cart,
        total,
        status: "Pending",
      },
    ]);

    setLoading(false);

    if (error) {
      console.log(error);
      toast.error(error.message || "Order failed");
      return;
    }

    toast.success("Order placed successfully");

    clearCart();

    router.push("/");
  };

  return (
    <main className="min-h-screen bg-gray-100 p-4 pb-32">
      <Link
        href="/cart"
        className="mb-5 flex h-11 w-11 items-center justify-center rounded-full bg-white shadow"
      >
        <ArrowLeft size={24} />
      </Link>

      <h1 className="mb-6 text-3xl font-extrabold text-slate-900">
        Checkout
      </h1>

      <form onSubmit={handleOrder} className="space-y-4">
        <input
          type="text"
          placeholder="Your Name"
          required
          value={name}
          onChange={(e) => setName(e.target.value)}
          className="h-14 w-full rounded-2xl border bg-white px-4 outline-none"
        />

        <input
          type="tel"
          placeholder="Phone Number"
          required
          value={phone}
          onChange={(e) => setPhone(e.target.value)}
          className="h-14 w-full rounded-2xl border bg-white px-4 outline-none"
        />

        <textarea
          placeholder="Delivery Address"
          required
          value={address}
          onChange={(e) => setAddress(e.target.value)}
          className="min-h-[120px] w-full rounded-2xl border bg-white p-4 outline-none"
        />

        <div className="rounded-3xl bg-white p-5 shadow-sm">
          <div className="mb-3 flex items-center justify-between">
            <span className="font-bold text-slate-700">
              Total Products
            </span>

            <span className="font-extrabold">
              {cart.length}
            </span>
          </div>

          <div className="flex items-center justify-between">
            <span className="text-lg font-bold text-slate-700">
              Total Price
            </span>

            <span className="text-3xl font-extrabold text-orange-500">
              ৳{total}
            </span>
          </div>
        </div>

        <button
          disabled={loading}
          className="w-full rounded-2xl bg-orange-500 py-4 font-bold text-white disabled:opacity-60"
        >
          {loading ? "Placing Order..." : "Place Order"}
        </button>
      </form>

      <BottomNav />
    </main>
  );
}