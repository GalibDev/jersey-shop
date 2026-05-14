"use client";

import Image from "next/image";
import Link from "next/link";

import { ArrowLeft, Heart } from "lucide-react";

import BottomNav from "@/components/BottomNav";

import { useWishlistStore } from "@/store/wishlistStore";
import { products } from "@/data/products";

export default function WishlistPage() {
  const wishlist = useWishlistStore(
    (state) => state.wishlist
  );

  const wishlistProducts = products.filter((product) =>
    wishlist.includes(product.id)
  );

  return (
    <main className="min-h-screen bg-gray-100 p-4 pb-32">
      <Link
        href="/"
        className="mb-5 flex h-11 w-11 items-center justify-center rounded-full bg-white shadow"
      >
        <ArrowLeft size={24} />
      </Link>

      <div className="mb-6 flex items-center gap-3">
        <Heart className="text-red-500" fill="red" />

        <h1 className="text-3xl font-extrabold text-slate-900">
          Wishlist
        </h1>
      </div>

      {wishlistProducts.length === 0 && (
        <div className="rounded-3xl bg-white p-8 text-center shadow-sm">
          <p className="font-bold text-slate-500">
            No favorite products yet
          </p>
        </div>
      )}

      <div className="space-y-4">
        {wishlistProducts.map((product) => (
          <Link
            href={`/product/${product.id}`}
            key={product.id}
          >
            <div className="flex items-center gap-4 rounded-3xl bg-white p-3 shadow-sm">
              <div className="relative h-24 w-24 overflow-hidden rounded-2xl">
                <Image
                  src={product.image}
                  alt={product.name}
                  fill
                  className="object-cover"
                />
              </div>

              <div className="flex-1">
                <h2 className="line-clamp-2 font-bold text-slate-800">
                  {product.name}
                </h2>

                <p className="mt-2 text-xl font-extrabold text-orange-500">
                  ৳{product.price}
                </p>
              </div>
            </div>
          </Link>
        ))}
      </div>

      <BottomNav />
    </main>
  );
}