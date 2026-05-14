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
import { useRouter } from "next/navigation";

import { supabase } from "@/lib/supabase";
import BottomNav from "@/components/BottomNav";
import { useCartStore } from "@/store/cartStore";

type Product = {
  id: number;
  name: string;
  image: string;
  price: number;
  old_price: number;
  discount: string;
  badge: string;
  category: string;
  stock: number;
};

export default function ProductDetailsPage({
  params,
}: {
  params: { id: string };
}) {
  const id = params.id;
  const router = useRouter();

  const [product, setProduct] = useState<Product | null>(null);
  const [size, setSize] = useState("M");
  const [quantity, setQuantity] = useState(1);

  const addToCartStore = useCartStore((state) => state.addToCart);

  useEffect(() => {
    const getProduct = async () => {
      const { data, error } = await supabase
        .from("products")
        .select("*")
        .eq("id", Number(id))
        .single();

      if (error) {
        console.log(error);
        toast.error("Product load failed");
        return;
      }

      setProduct(data);
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

    const message = `New Order%0A%0AProduct: ${product.name}%0ASize: ${size}%0AQuantity: ${quantity}%0APrice: ৳${product.price}%0ATotal: ৳${
      product.price * quantity
    }`;

    window.open(`https://wa.me/8801XXXXXXXXX?text=${message}`, "_blank");
  };

  if (!product) {
    return (
      <main className="flex min-h-screen items-center justify-center bg-gray-100">
        <p className="font-bold text-slate-500">Loading...</p>
      </main>
    );
  }

  return (
    <main className="min-h-screen bg-gray-100 pb-32">
      <div className="relative">
        <div className="relative h-[330px] w-full bg-white">
          <Image
            src={product.image}
            alt={product.name}
            fill
            className="object-contain p-4"
          />
        </div>

        <Link
          href="/"
          className="absolute left-4 top-4 flex h-11 w-11 items-center justify-center rounded-full bg-white shadow"
        >
          <ArrowLeft size={22} />
        </Link>

        <button
          type="button"
          className="absolute right-4 top-4 flex h-11 w-11 items-center justify-center rounded-full bg-white shadow"
        >
          <Heart size={20} />
        </button>
      </div>

      <section className="bg-white p-5">
        <h1 className="text-2xl font-extrabold text-slate-900">
          {product.name}
        </h1>

        <p className="mt-2 text-sm font-bold text-slate-500">
          Category: {product.category}
        </p>

        <div className="mt-4 flex items-center gap-3">
          <span className="text-3xl font-extrabold text-orange-500">
            ৳{product.price}
          </span>

          <span className="text-lg text-slate-400 line-through">
            ৳{product.old_price}
          </span>
        </div>

        <p className="mt-3 text-xl font-extrabold text-slate-900">
          Total: ৳{product.price * quantity}
        </p>

        <div className="mt-5">
          <p className="mb-2 font-bold">Size:</p>

          <div className="flex gap-3">
            {["M", "L", "XL", "XXL"].map((item) => (
              <button
                type="button"
                key={item}
                onClick={() => setSize(item)}
                className={`h-10 w-12 border font-bold ${
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

        <div className="mt-5">
          <p className="mb-2 font-bold">Quantity:</p>

          <div className="flex w-36 items-center border">
            <button
              type="button"
              onClick={() => setQuantity((q) => Math.max(1, q - 1))}
              className="flex h-11 w-11 items-center justify-center border-r"
            >
              <Minus size={16} />
            </button>

            <div className="flex h-11 flex-1 items-center justify-center font-bold">
              {quantity}
            </div>

            <button
              type="button"
              onClick={() => setQuantity((q) => q + 1)}
              className="flex h-11 w-11 items-center justify-center border-l"
            >
              <Plus size={16} />
            </button>
          </div>
        </div>

        <div className="mt-6 grid grid-cols-2 gap-3">
          <button
            type="button"
            onClick={orderNow}
            className="h-14 rounded-xl border border-orange-500 font-bold text-orange-500"
          >
            Order Now
          </button>

          <button
            type="button"
            onClick={addToCart}
            className="flex h-14 items-center justify-center gap-2 rounded-xl bg-orange-500 font-bold text-white"
          >
            <ShoppingCart size={20} />
            Add to cart
          </button>
        </div>

        <button
          type="button"
          onClick={whatsappOrder}
          className="mt-3 h-14 w-full rounded-xl bg-green-500 font-bold text-white"
        >
          WhatsApp Order
        </button>

        <div className="mt-8 rounded-2xl bg-gray-100 p-4">
          <h2 className="mb-3 text-xl font-extrabold">Product Details</h2>

          <p className="leading-7 text-slate-700">
            ✓ High-Quality Sublimation Print <br />
            ✓ Premium Micro Fabric <br />
            ✓ 170 GSM <br />
            ✓ Polo shirt <br />
            ✓ Top-Notch Stitching Finish <br />
            ✓ Size: M, L, XL, XXL
          </p>
        </div>
      </section>

      <BottomNav />
    </main>
  );
}