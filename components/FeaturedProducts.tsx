"use client";

import { useEffect, useRef, useState } from "react";

import gsap from "gsap";

import ProductCard from "./ProductCard";
import ProductSkeleton from "./ProductSkeleton";
import SearchBar from "./SearchBar";
import QuickViewModal from "./QuickViewModal";

import { supabase } from "@/lib/supabase";

import { Product } from "@/types/product";

export default function FeaturedProducts() {
  const sectionRef = useRef<HTMLDivElement>(null);

  const [search, setSearch] = useState("");

  const [loading, setLoading] = useState(true);

  const [products, setProducts] = useState<Product[]>([]);

  const [quickViewOpen, setQuickViewOpen] =
    useState(false);

  const [selectedProduct, setSelectedProduct] =
    useState<Product | null>(null);

  useEffect(() => {
    getProducts();

    if (!sectionRef.current) return;

    gsap.fromTo(
      sectionRef.current.children,
      {
        opacity: 0,
        y: 40,
      },
      {
        opacity: 1,
        y: 0,
        duration: 0.8,
        stagger: 0.15,
      }
    );
  }, []);

  const getProducts = async () => {
    const { data, error } = await supabase
      .from("products")
      .select("*")
      .order("id", { ascending: false });

    if (error) {
      console.log(error);
      return;
    }

    setProducts(data || []);

    setLoading(false);
  };

  const filteredProducts = products.filter(
    (product) =>
      product.name
        .toLowerCase()
        .includes(search.toLowerCase())
  );

  return (
    <section className="mt-6 pb-32">
      <SearchBar
        search={search}
        setSearch={setSearch}
      />

      <div className="mb-4 mt-6 flex items-center justify-between px-4">
        <h2 className="text-xl font-bold text-slate-900">
          Featured Products
        </h2>

        <button className="text-sm font-semibold text-orange-500">
          See All
        </button>
      </div>

      <div
        ref={sectionRef}
        className="grid grid-cols-2 gap-4 px-4"
      >
        {loading
          ? Array.from({ length: 4 }).map(
              (_, index) => (
                <ProductSkeleton key={index} />
              )
            )
          : filteredProducts.map((product) => (
              <div
                key={product.id}
                className="space-y-2"
              >
                <ProductCard
                  id={product.id}
                  name={product.name}
                  image={product.image}
                  oldPrice={product.old_price}
                  price={product.price}
                  discount={product.discount}
                  badge={product.badge}
                />

                <button
                  onClick={() => {
                    setSelectedProduct(product);

                    setQuickViewOpen(true);
                  }}
                  className="w-full rounded-xl bg-slate-900 py-2 text-xs font-bold text-white"
                >
                  QUICK VIEW
                </button>
              </div>
            ))}
      </div>

      <QuickViewModal
        open={quickViewOpen}
        onClose={() =>
          setQuickViewOpen(false)
        }
        product={
          selectedProduct
            ? {
                name: selectedProduct.name,
                image: selectedProduct.image,
                price: selectedProduct.price,
                oldPrice:
                  selectedProduct.old_price,
              }
            : null
        }
      />
    </section>
  );
}