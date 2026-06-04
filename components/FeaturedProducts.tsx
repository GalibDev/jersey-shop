"use client";

import { useEffect, useRef, useState } from "react";

import gsap from "gsap";
import { SearchX } from "lucide-react";

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

  const getProducts = async () => {
    const serialOrderedProducts = await supabase
      .from("products")
      .select("*")
      .order("serial", { ascending: true, nullsFirst: false })
      .order("id", { ascending: false });

    const { data, error } = serialOrderedProducts.error
      ? await supabase
          .from("products")
          .select("*")
          .order("id", { ascending: false })
      : serialOrderedProducts;

    if (error) {
      console.log(error);
      setLoading(false);
      return;
    }

    setProducts(data || []);

    setLoading(false);
  };

  useEffect(() => {
    const loadProducts = setTimeout(() => {
      getProducts();
    }, 0);

    if (sectionRef.current) {
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
    }

    return () => {
      clearTimeout(loadProducts);
    };
  }, []);

  const filteredProducts = products.filter(
    (product) =>
      product.name
        .toLowerCase()
        .includes(search.toLowerCase())
  );

  return (
    <section className="mx-auto mt-6 max-w-7xl pb-20 md:pb-28">
      <SearchBar
        search={search}
        setSearch={setSearch}
      />

      <div className="mb-4 mt-6 flex items-center justify-between px-4 sm:px-6 lg:px-8">
        <h2 className="text-xl font-bold text-slate-900">
          Featured Products
        </h2>

        <button className="text-sm font-semibold text-orange-500">
          See All
        </button>
      </div>

      <div
        ref={sectionRef}
        className="grid grid-cols-2 gap-4 px-4 sm:grid-cols-3 sm:px-6 lg:grid-cols-4 lg:px-8"
      >
        {loading ? (
          Array.from({ length: 4 }).map(
            (_, index) => (
              <ProductSkeleton key={index} />
            )
          )
        ) : filteredProducts.length > 0 ? (
          filteredProducts.map((product) => (
                <ProductCard
                  key={product.id}
                  id={product.id}
                  name={product.name}
                  image={product.image}
                  oldPrice={product.old_price}
                  price={product.price}
                  discount={product.discount}
                  badge={product.badge}
                  onQuickView={() => {
                    setSelectedProduct(product);
                    setQuickViewOpen(true);
                  }}
                />
          ))
        ) : (
          <div className="col-span-2 flex flex-col items-center justify-center rounded-2xl bg-white px-4 py-12 text-center shadow-sm sm:col-span-3 lg:col-span-4">
            <SearchX className="text-slate-300" size={42} />
            <h3 className="mt-4 text-lg font-extrabold text-slate-900">
              No products found
            </h3>
            <p className="mt-2 max-w-sm text-sm leading-6 text-slate-500">
              Try another jersey name or clear the search.
            </p>
            <button
              type="button"
              onClick={() => setSearch("")}
              className="mt-5 rounded-xl bg-slate-900 px-5 py-2.5 text-sm font-bold text-white"
            >
              Clear Search
            </button>
          </div>
        )}
      </div>

      <QuickViewModal
        open={quickViewOpen}
        onClose={() =>
          setQuickViewOpen(false)
        }
        product={
          selectedProduct
            ? {
                id: selectedProduct.id,
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
