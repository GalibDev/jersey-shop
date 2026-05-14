"use client";

import Image from "next/image";
import { X } from "lucide-react";

type Props = {
  open: boolean;
  onClose: () => void;
  product: {
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
    <div className="fixed inset-0 z-[100] flex items-end justify-center bg-black/60 p-4">
      <div className="w-full max-w-md rounded-[30px] bg-white p-4">
        <div className="mb-4 flex items-center justify-between">
          <h2 className="text-xl font-extrabold">
            Quick View
          </h2>

          <button
            onClick={onClose}
            className="flex h-10 w-10 items-center justify-center rounded-full bg-gray-100"
          >
            <X size={22} />
          </button>
        </div>

        <div className="relative h-64 overflow-hidden rounded-2xl">
          <Image
            src={product.image}
            alt={product.name}
            fill
            className="object-cover"
          />
        </div>

        <h3 className="mt-4 text-lg font-bold">
          {product.name}
        </h3>

        <div className="mt-2 flex items-center gap-2">
          <span className="text-2xl font-extrabold text-orange-500">
            ৳{product.price}
          </span>

          <span className="text-slate-400 line-through">
            ৳{product.oldPrice}
          </span>
        </div>

        <button className="mt-5 w-full rounded-2xl bg-orange-500 py-4 font-bold text-white">
          View Details
        </button>
      </div>
    </div>
  );
}