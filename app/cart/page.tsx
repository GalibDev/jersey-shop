"use client";

import Image from "next/image";
import Link from "next/link";
import { Trash2, ArrowLeft } from "lucide-react";
import { useCartStore } from "@/store/cartStore";
import BottomNav from "@/components/BottomNav";

export default function CartPage() {
  const cart = useCartStore((state) => state.cart);
  const removeFromCart = useCartStore((state) => state.removeFromCart);

  const total = cart.reduce((acc, item) => acc + item.price, 0);

  return (
    <main className="min-h-screen bg-gray-100 p-4 pb-44">
      <Link
        href="/"
        className="mb-5 flex h-11 w-11 items-center justify-center rounded-full bg-white shadow"
      >
        <ArrowLeft size={24} />
      </Link>

      <h1 className="mb-5 text-3xl font-extrabold text-slate-900">
        Your Cart
      </h1>

      {cart.length === 0 && (
        <div className="rounded-3xl bg-white p-8 text-center shadow-sm">
          <p className="font-bold text-slate-500">Your cart is empty</p>
          <Link href="/">
            <button className="mt-5 rounded-2xl bg-orange-500 px-6 py-3 font-bold text-white">
              Continue Shopping
            </button>
          </Link>
        </div>
      )}

      <div className="space-y-4">
        {cart.map((item, index) => (
          <div
            key={`${item.id}-${index}`}
            className="flex items-center gap-4 rounded-3xl bg-white p-3 shadow-sm"
          >
            <div className="relative h-24 w-24 overflow-hidden rounded-2xl bg-gray-100">
              <Image
                src={item.image}
                alt={item.name}
                fill
                className="object-cover"
              />
            </div>

            <div className="flex-1">
              <h2 className="line-clamp-2 font-bold text-slate-800">
                {item.name}
              </h2>

              <p className="mt-2 text-xl font-extrabold text-orange-500">
                ৳{item.price}
              </p>
            </div>

            <button
              onClick={() => removeFromCart(item.id)}
              className="rounded-full bg-red-50 p-3 text-red-500"
            >
              <Trash2 size={20} />
            </button>
          </div>
        ))}
      </div>

      {cart.length > 0 && (
        <div className="fixed bottom-24 left-4 right-4 z-40 rounded-3xl bg-white p-4 shadow-xl">
          <div className="mb-4 flex items-center justify-between">
            <span className="text-lg font-bold text-slate-700">
              Total
            </span>

            <span className="text-3xl font-extrabold text-orange-500">
              ৳{total}
            </span>
          </div>

          <Link href="/checkout">
            <button className="w-full rounded-2xl bg-orange-500 py-4 font-bold text-white">
              Checkout
            </button>
          </Link>
        </div>
      )}

      <BottomNav />
    </main>
  );
}