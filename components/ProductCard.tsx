"use client";

import Image from "next/image";
import Link from "next/link";
import toast from "react-hot-toast";
import { Eye, Heart, ShoppingCart } from "lucide-react";

import { useCartStore } from "@/store/cartStore";
import { useWishlistStore } from "@/store/wishlistStore";

type ProductCardProps = {
  id: number;
  name: string;
  image: string;
  price: number;
  oldPrice: number;
  discount: string;
  badge: string;
  onQuickView?: () => void;
};

export default function ProductCard({
  id,
  name,
  image,
  price,
  oldPrice,
  discount,
  badge,
  onQuickView,
}: ProductCardProps) {
  const { addToCart } = useCartStore();
  const { wishlist, toggleWishlist } = useWishlistStore();

  const isWishlisted = wishlist.includes(id);
  const hasDiscount = Boolean(discount?.trim());
  const hasBadge = Boolean(badge?.trim());
  const hasOldPrice = oldPrice > price;

  const handleWishlist = () => {
    toggleWishlist(id);
    toast.success(
      isWishlisted
        ? "Removed from wishlist"
        : "Added to wishlist"
    );
  };

  const handleAddToCart = () => {
    addToCart({
      id,
      name,
      image,
      price,
    });

    toast.success("Added to cart");
  };

  return (
    <div className="group flex h-full flex-col overflow-hidden rounded-2xl border border-slate-200 bg-white shadow-sm transition duration-300 hover:-translate-y-1 hover:shadow-xl">
      <div className="relative h-44 w-full overflow-hidden bg-slate-50 p-3 sm:h-52">
        <Link href={`/product/${id}`}>
          <Image
            src={image}
            alt={name}
            fill
            className="object-contain p-2 transition duration-300 group-hover:scale-105"
          />
        </Link>

        {hasDiscount && (
          <div className="absolute left-2 top-2 rounded bg-slate-900 px-2 py-1 text-[11px] font-bold text-white">
            {discount} OFF
          </div>
        )}

        <button
          type="button"
          onClick={handleWishlist}
          aria-label="Toggle wishlist"
          className={`absolute right-2 top-2 flex h-9 w-9 items-center justify-center rounded-full bg-white shadow transition ${
            isWishlisted
              ? "text-red-500"
              : "text-slate-600 hover:text-red-500"
          }`}
        >
          <Heart
            size={17}
            fill={isWishlisted ? "currentColor" : "none"}
          />
        </button>

        {onQuickView && (
          <button
            type="button"
            onClick={onQuickView}
            className="absolute bottom-2 left-2 flex items-center gap-1 rounded-full bg-white/95 px-3 py-2 text-[11px] font-bold text-slate-800 shadow transition hover:bg-slate-900 hover:text-white"
          >
            <Eye size={14} />
            Quick View
          </button>
        )}

        {hasBadge && (
          <div className="absolute bottom-2 right-2 rounded bg-orange-500 px-2 py-1 text-[10px] font-bold text-white">
            {badge}
          </div>
        )}
      </div>

      <div className="flex flex-1 flex-col p-3">
        <h2 className="line-clamp-2 min-h-[42px] text-sm font-bold text-slate-800">
          {name}
        </h2>

        <div className="mt-2 flex flex-wrap items-center gap-2">
          <span className="text-lg font-extrabold text-orange-500">
            ৳{price}
          </span>

          {hasOldPrice && (
            <span className="text-sm text-slate-400 line-through">
              ৳{oldPrice}
            </span>
          )}
        </div>

        <div className="mt-auto flex gap-2 pt-3">
          <Link href={`/product/${id}`} className="min-w-0 flex-1">
            <button className="w-full rounded-xl bg-orange-500 py-2.5 text-sm font-bold text-white transition hover:bg-orange-600">
              ORDER NOW
            </button>
          </Link>

          <button
            type="button"
            onClick={handleAddToCart}
            aria-label="Add to cart"
            className="flex h-10 w-10 shrink-0 items-center justify-center rounded-xl bg-slate-900 text-white transition hover:bg-slate-700"
          >
            <ShoppingCart size={18} />
          </button>
        </div>
      </div>
    </div>
  );
}
