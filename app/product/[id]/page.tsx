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
  price: number;
  old_price: number;
  category: string;
  stock: number;
};

export default function ProductDetailsPage() {
  const router = useRouter();
  const params = useParams();

  const id = Number(params.id);

  const [product, setProduct] = useState<Product | null>(null);
  const [loading, setLoading] = useState(true);

  const [size, setSize] = useState("M");
  const [quantity, setQuantity] = useState(1);

  const addToCartStore = useCartStore((state) => state.addToCart);

  useEffect(() => {
    if (!id || isNaN(id)) {
      toast.error("Invalid product id");
      setLoading(false);
      return;
    }

    const getProduct = async () => {
      setLoading(true);

      const { data, error } = await supabase
        .from("products")
        .select("*")
        .eq("id", id)
        .single();

      if (error) {
        console.log(error);
        toast.error(error.message);
        setLoading(false);
        return;
      }

      setProduct(data);
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
        image: product.image,
        price: product.price,
      });
    }

    toast.success(`${quantity} item added to cart`);
  };

  const orderNow = () => {
    addToCart();
    router.push("/checkout");
  };

  const whatsappOrder = () => {
    if (!product) return;

    const message = `
New Order

Product: ${product.name}
Size: ${size}
Quantity: ${quantity}
Price: ৳${product.price}
Total: ৳${product.price * quantity}
`;

    window.open(
      `https://wa.me/8801843313291?text=${encodeURIComponent(message)}`,
      "_blank"
    );
  };

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
    <main className="min-h-screen bg-gray-100 pb-32">
      <div className="relative bg-white">
        <div className="relative h-[350px] w-full">
          <Image
            src={product.image}
            alt={product.name}
            fill
            className="object-contain p-4"
          />
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

      <section className="bg-white p-5">
        <h1 className="text-3xl font-extrabold text-slate-900">
          {product.name}
        </h1>

        <p className="mt-2 font-semibold text-slate-500">
          Category: {product.category}
        </p>

        <div className="mt-4 flex items-center gap-3">
          <span className="text-4xl font-extrabold text-orange-500">
            ৳{product.price}
          </span>

          <span className="text-xl text-slate-400 line-through">
            ৳{product.old_price}
          </span>
        </div>

        <p className="mt-3 text-2xl font-extrabold text-slate-900">
          Total: ৳{product.price * quantity}
        </p>

        <div className="mt-6">
          <p className="mb-3 text-lg font-bold">Size:</p>

          <div className="flex gap-3">
            {["M", "L", "XL", "XXL"].map((item) => (
              <button
                key={item}
                onClick={() => setSize(item)}
                className={`h-12 w-14 border text-lg font-bold ${
                  size === item
                    ? "border-orange-500 bg-orange-500 text-white"
                    : "bg-white text-slate-700"
                }`}
              >
                {item}
              </button>
            ))}
          </div>
        </div>

        <div className="mt-6">
          <p className="mb-3 text-lg font-bold">Quantity:</p>

          <div className="flex w-40 items-center border">
            <button
              onClick={() => setQuantity((q) => Math.max(1, q - 1))}
              className="flex h-12 w-12 items-center justify-center border-r"
            >
              <Minus size={18} />
            </button>

            <div className="flex h-12 flex-1 items-center justify-center text-lg font-bold">
              {quantity}
            </div>

            <button
              onClick={() => setQuantity((q) => q + 1)}
              className="flex h-12 w-12 items-center justify-center border-l"
            >
              <Plus size={18} />
            </button>
          </div>
        </div>

        <div className="mt-8 grid grid-cols-2 gap-4">
          <button
            onClick={orderNow}
            className="h-14 rounded-xl border-2 border-orange-500 text-lg font-bold text-orange-500"
          >
            Order Now
          </button>

          <button
            onClick={addToCart}
            className="flex h-14 items-center justify-center gap-2 rounded-xl bg-orange-500 text-lg font-bold text-white"
          >
            <ShoppingCart size={22} />
            Add to cart
          </button>
        </div>

        <button
          onClick={whatsappOrder}
          className="mt-4 h-14 w-full rounded-xl bg-green-500 text-lg font-bold text-white"
        >
          WhatsApp Order
        </button>

        <div className="mt-8 rounded-2xl bg-gray-100 p-5">
          <h2 className="mb-4 text-2xl font-extrabold">
            Product Details
          </h2>

          <div className="space-y-2 text-[16px] leading-7 text-slate-700">
            <p>✓ High-Quality Sublimation Print</p>
            <p>✓ Premium Micro Fabric</p>
            <p>✓ 170 GSM</p>
            <p>✓ Polo shirt</p>
            <p>✓ Top-Notch Stitching Finish</p>
            <p>✓ Size: M, L, XL, XXL</p>
          </div>
        </div>
      </section>

      <BottomNav />
    </main>
  );
}