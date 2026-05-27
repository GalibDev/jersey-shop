"use client";

import Image from "next/image";
import Link from "next/link";
import { X } from "lucide-react";

type Props = {
  open: boolean;
  onClose: () => void;
  product: {
    id: number;
    name: string;
    image: string;
    price: number;
    oldPrice: number;
  } | null;
};

export default function QuickViewModal({
  open,
  onClose,
  product,
}: Props) {
  if (!open || !product) return null;

  return (
    <div className="fixed inset-0 z-[100] flex items-end justify-center bg-black/60 p-4 sm:items-center">
      <div className="w-full max-w-md rounded-[30px] bg-white p-4 shadow-2xl">
        <div className="mb-4 flex items-center justify-between">
          <h2 className="text-xl font-extrabold">
            Quick View
          </h2>

          <button
            type="button"
            onClick={onClose}
            className="flex h-10 w-10 items-center justify-center rounded-full bg-gray-100"
          >
            <X size={22} />
          </button>
        </div>

        <div className="relative h-64 overflow-hidden rounded-2xl bg-slate-50">
          <Image
            src={product.image}
            alt={product.name}
            fill
            className="object-contain p-4"
          />
        </div>

        <h3 className="mt-4 text-lg font-bold">
          {product.name}
        </h3>

        <div className="mt-2 flex items-center gap-2">
          <span className="text-2xl font-extrabold text-orange-500">
            ৳{product.price}
          </span>

          {product.oldPrice > product.price && (
            <span className="text-slate-400 line-through">
              ৳{product.oldPrice}
            </span>
          )}
        </div>

        <Link href={`/product/${product.id}`}>
          <button className="mt-5 w-full rounded-2xl bg-orange-500 py-4 font-bold text-white">
            View Details
          </button>
        </Link>
      </div>
    </div>
  );
}
