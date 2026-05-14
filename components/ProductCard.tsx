"use client";

import Image from "next/image";
import Link from "next/link";
import { Heart } from "lucide-react";

type ProductCardProps = {
  id: number;
  name: string;
  image: string;
  price: number;
  oldPrice: number;
  discount: string;
  badge: string;
};

export default function ProductCard({
  id,
  name,
  image,
  price,
  oldPrice,
  discount,
  badge,
}: ProductCardProps) {
  return (
    <div className="overflow-hidden rounded-xl border bg-white shadow-sm">
      <div className="relative h-44 w-full overflow-hidden bg-white p-1">
        <Link href={`/product/${id}`}>
          <Image
            src={image}
            alt={name}
            fill
            className="object-contain transition duration-300 hover:scale-105"
          />
        </Link>

        <div className="absolute left-2 top-2 rounded bg-slate-900 px-2 py-1 text-[11px] font-bold text-white">
          {discount} OFF
        </div>

        <button className="absolute right-2 top-2 flex h-8 w-8 items-center justify-center rounded-full bg-white text-slate-700 shadow">
          <Heart size={16} />
        </button>

        <div className="absolute bottom-2 right-2 rounded bg-orange-500 px-2 py-1 text-[10px] font-bold text-white">
          {badge}
        </div>
      </div>

      <div className="p-3">
        <h2 className="line-clamp-2 min-h-[42px] text-sm font-bold text-slate-800">
          {name}
        </h2>

        <div className="mt-2 flex items-center gap-2">
          <span className="text-lg font-extrabold text-orange-500">
            ৳{price}
          </span>

          <span className="text-sm text-slate-400 line-through">
            ৳{oldPrice}
          </span>
        </div>

        <Link href={`/product/${id}`}>
          <button className="mt-3 w-full bg-orange-500 py-2.5 text-sm font-bold text-white transition hover:bg-orange-600">
            ORDER NOW
          </button>
        </Link>
      </div>
    </div>
  );
}