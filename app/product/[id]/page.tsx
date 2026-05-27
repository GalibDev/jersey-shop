"use client";

import { useEffect, useState } from "react";
import Image from "next/image";
import Link from "next/link";
import {
  ArrowLeft,
  Heart,
  ShoppingCart,
  Minus,
  Plus,
} from "lucide-react";
import toast from "react-hot-toast";
import { useRouter, useParams } from "next/navigation";

import { supabase } from "@/lib/supabase";
import BottomNav from "@/components/BottomNav";
import { useCartStore } from "@/store/cartStore";

type Product = {
  id: number;
  name: string;
  image: string;
  images?: string[];
  price: number;
  old_price: number;
  category: string;
  stock: number;
  description?: string;
  details?: string;
};

export default function ProductDetailsPage() {
  const router = useRouter();
  const params = useParams();

  const id = Number(params.id);

  const [product, setProduct] = useState<Product | null>(null);
  const [mainImage, setMainImage] = useState("");
  const [loading, setLoading] = useState(true);

  const [size, setSize] = useState("M");
  const [quantity, setQuantity] = useState(1);

  const addToCartStore = useCartStore((state) => state.addToCart);

  useEffect(() => {
    const getProduct = async () => {
      if (!id || isNaN(id)) {
        toast.error("Invalid product id");
        setLoading(false);
        return;
      }

      const { data, error } = await supabase
        .from("products")
        .select("*")
        .eq("id", id)
        .single();

      if (error) {
        toast.error(error.message);
        setLoading(false);
        return;
      }

      setProduct(data);

      const firstImage =
        data.images && data.images.length > 0
          ? data.images[0]
          : data.image;

      setMainImage(firstImage);
      setLoading(false);
    };

    getProduct();
  }, [id]);

  const addToCart = () => {
    if (!product) return;

    for (let i = 0; i < quantity; i++) {
      addToCartStore({
        id: product.id,
        name: `${product.name} (${size})`,
        image: mainImage || product.image,
        price: product.price,
      });
    }

    toast.success(`${quantity} item added to cart`);
  };

  const orderNow = () => {
    addToCart();
    router.push("/checkout");
  };

  const galleryImages =
    product?.images && product.images.length > 0
      ? product.images
      : product?.image
      ? [product.image]
      : [];

  if (loading) {
    return (
      <main className="flex min-h-screen items-center justify-center bg-gray-100">
        <p className="text-lg font-bold text-slate-600">Loading...</p>
      </main>
    );
  }

  if (!product) {
    return (
      <main className="flex min-h-screen flex-col items-center justify-center bg-gray-100">
        <h1 className="text-3xl font-extrabold text-slate-900">
          Product not found
        </h1>

        <Link href="/">
          <button className="mt-5 rounded-xl bg-orange-500 px-6 py-3 font-bold text-white">
            Go Home
          </button>
        </Link>
      </main>
    );
  }

  return (
    <main className="min-h-screen bg-gray-100 px-4 py-4 pb-36 md:pb-12">
      <div className="mx-auto max-w-6xl">
      <div className="relative rounded-3xl bg-white p-3 shadow-sm sm:p-4">
        <div className="relative h-[300px] w-full overflow-hidden rounded-2xl bg-slate-50 sm:h-[420px]">
          <Image
            src={mainImage}
            alt={product.name}
            fill
            className="object-contain p-3"
          />
        </div>

        <div className="mt-3 flex gap-3 overflow-x-auto pb-2">
          {galleryImages.map((img, index) => (
            <button
              key={index}
              onClick={() => setMainImage(img)}
              className={`relative h-16 w-16 shrink-0 overflow-hidden rounded-2xl border bg-white shadow-sm sm:h-20 sm:w-20 ${
                mainImage === img
                  ? "border-2 border-orange-500 ring-2 ring-orange-100"
                  : "border-slate-200"
              }`}
            >
              <Image
                src={img}
                alt={`Product image ${index + 1}`}
                fill
                className="object-contain p-1"
              />
            </button>
          ))}
        </div>

        <Link
          href="/"
          className="absolute left-4 top-4 flex h-10 w-10 items-center justify-center rounded-full bg-white shadow"
        >
          <ArrowLeft size={20} />
        </Link>

        <button className="absolute right-4 top-4 flex h-10 w-10 items-center justify-center rounded-full bg-white shadow">
          <Heart size={18} />
        </button>
      </div>

      <section className="mt-4 rounded-3xl bg-white p-5 shadow-sm">
        <h1 className="text-2xl font-extrabold leading-tight text-slate-900 sm:text-3xl">
          {product.name}
        </h1>

        <p className="mt-2 font-semibold text-slate-500">
          Category: {product.category}
        </p>

        <div className="mt-4 flex flex-wrap items-center gap-3">
          <span className="text-3xl font-extrabold text-orange-500 sm:text-4xl">
            ৳{product.price}
          </span>

          {product.old_price > product.price && (
            <span className="text-lg text-slate-400 line-through sm:text-xl">
              ৳{product.old_price}
            </span>
          )}
        </div>

        <p className="mt-3 text-xl font-extrabold text-slate-900 sm:text-2xl">
          Total: ৳{product.price * quantity}
        </p>

        <div className="mt-6">
          <p className="mb-3 text-lg font-bold">Size:</p>

          <div className="flex flex-wrap gap-3">
            {["M", "L", "XL", "XXL"].map((item) => (
              <button
                key={item}
                type="button"
                onClick={() => setSize(item)}
                className={`h-14 min-w-16 rounded-2xl border px-5 text-lg font-extrabold shadow-sm transition hover:-translate-y-0.5 hover:shadow-md ${
                  size === item
                    ? "border-orange-500 bg-orange-500 text-white shadow-orange-500/25"
                    : "border-slate-200 bg-white text-slate-700 hover:border-orange-300 hover:text-orange-500"
                }`}
              >
                {item}
              </button>
            ))}
          </div>
        </div>

        <div className="mt-6">
          <p className="mb-3 text-lg font-bold">Quantity:</p>

          <div className="flex w-44 items-center overflow-hidden rounded-2xl border border-slate-200 bg-white shadow-sm">
            <button
              type="button"
              onClick={() => setQuantity((q) => Math.max(1, q - 1))}
              className="flex h-12 w-12 items-center justify-center border-r border-slate-200 text-slate-700 transition hover:bg-slate-100"
            >
              <Minus size={18} />
            </button>

            <div className="flex h-12 flex-1 items-center justify-center text-lg font-bold">
              {quantity}
            </div>

            <button
              type="button"
              onClick={() => setQuantity((q) => q + 1)}
              className="flex h-12 w-12 items-center justify-center border-l border-slate-200 text-slate-700 transition hover:bg-slate-100"
            >
              <Plus size={18} />
            </button>
          </div>
        </div>

        <div className="mt-8 grid grid-cols-1 gap-3 sm:grid-cols-2 sm:gap-4">
          <button
            type="button"
            onClick={orderNow}
            className="h-14 rounded-2xl border-2 border-orange-500 bg-white text-lg font-extrabold text-orange-500 shadow-sm transition hover:bg-orange-50 hover:shadow-md"
          >
            Order Now
          </button>

          <button
            type="button"
            onClick={addToCart}
            className="flex h-14 items-center justify-center gap-2 rounded-2xl bg-orange-500 text-lg font-extrabold text-white shadow-lg shadow-orange-500/25 transition hover:bg-orange-600 hover:shadow-xl"
          >
            <ShoppingCart size={22} />
            Add to cart
          </button>
        </div>

        <div className="mt-8 rounded-2xl bg-gray-100 p-4 sm:p-5">
          <h2 className="mb-4 text-2xl font-extrabold">
            Product Description
          </h2>

          <p className="leading-7 text-slate-700">
            {product.description || "No description added."}
          </p>
        </div>

        <div className="mt-5 rounded-2xl bg-gray-100 p-4 sm:p-5">
          <h2 className="mb-4 text-2xl font-extrabold">
            Product Details
          </h2>

          <div className="space-y-2 whitespace-pre-line text-[16px] leading-7 text-slate-700">
            {product.details || "No details added."}
          </div>
        </div>
      </section>
      </div>

      <BottomNav />
    </main>
  );
}
