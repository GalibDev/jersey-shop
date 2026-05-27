"use client";

import { useEffect, useMemo, useState } from "react";
import Link from "next/link";
import {
  ArrowLeft,
  Loader2,
  Search,
  SearchX,
} from "lucide-react";

import BottomNav from "@/components/BottomNav";
import ProductCard from "@/components/ProductCard";
import QuickViewModal from "@/components/QuickViewModal";
import { supabase } from "@/lib/supabase";
import { Product } from "@/types/product";

export default function SearchPage() {
  const [query, setQuery] = useState("");
  const [category, setCategory] = useState("All");
  const [products, setProducts] = useState<Product[]>([]);
  const [loading, setLoading] = useState(true);
  const [selectedProduct, setSelectedProduct] =
    useState<Product | null>(null);

  const getProducts = async () => {
    const { data, error } = await supabase
      .from("products")
      .select("*")
      .order("id", { ascending: false });

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

    return () => {
      clearTimeout(loadProducts);
    };
  }, []);

  const categories = useMemo(() => {
    const names = products
      .map((product) => product.category)
      .filter(Boolean);

    return ["All", ...Array.from(new Set(names))];
  }, [products]);

  const filteredProducts = products.filter((product) => {
    const searchText = `${product.name} ${product.category}`.toLowerCase();
    const matchesQuery = searchText.includes(query.toLowerCase());
    const matchesCategory =
      category === "All" || product.category === category;

    return matchesQuery && matchesCategory;
  });

  return (
    <main className="min-h-screen bg-gray-100 px-4 py-5 pb-32 md:pb-12">
      <div className="mx-auto max-w-7xl">
        <Link
          href="/"
          className="mb-5 flex h-11 w-11 items-center justify-center rounded-full bg-white shadow"
        >
          <ArrowLeft size={24} />
        </Link>

        <div className="mb-5">
          <h1 className="text-3xl font-extrabold text-slate-900">
            Search Jerseys
          </h1>

          <p className="mt-2 text-sm font-semibold text-slate-500">
            Find your favorite team jersey quickly.
          </p>
        </div>

        <div className="sticky top-20 z-20 rounded-3xl bg-white p-3 shadow-sm">
          <div className="flex h-14 items-center gap-3 rounded-2xl border border-slate-200 bg-white px-4 transition focus-within:border-orange-500 focus-within:ring-4 focus-within:ring-orange-100">
            <Search className="text-slate-400" size={22} />

            <input
              type="search"
              placeholder="Search by jersey or category..."
              value={query}
              autoFocus
              onChange={(event) => setQuery(event.target.value)}
              className="h-full w-full bg-transparent font-semibold outline-none"
            />
          </div>

          {categories.length > 1 && (
            <div className="mt-3 flex gap-2 overflow-x-auto pb-1">
              {categories.map((item) => (
                <button
                  key={item}
                  type="button"
                  onClick={() => setCategory(item)}
                  className={`shrink-0 rounded-full border px-4 py-2 text-sm font-bold transition ${
                    category === item
                      ? "border-orange-500 bg-orange-500 text-white"
                      : "border-slate-200 bg-white text-slate-600 hover:border-orange-300 hover:text-orange-500"
                  }`}
                >
                  {item}
                </button>
              ))}
            </div>
          )}
        </div>

        <div className="mt-6 flex items-center justify-between">
          <h2 className="text-xl font-extrabold text-slate-900">
            Results
          </h2>

          <span className="text-sm font-bold text-orange-500">
            {filteredProducts.length} found
          </span>
        </div>

        {loading ? (
          <div className="mt-16 flex items-center justify-center gap-3 text-slate-500">
            <Loader2 className="animate-spin" size={24} />
            <span className="font-bold">Loading products...</span>
          </div>
        ) : filteredProducts.length > 0 ? (
          <div className="mt-4 grid grid-cols-2 gap-4 sm:grid-cols-3 lg:grid-cols-4">
            {filteredProducts.map((product) => (
              <ProductCard
                key={product.id}
                id={product.id}
                name={product.name}
                image={product.image}
                oldPrice={product.old_price}
                price={product.price}
                discount={product.discount}
                badge={product.badge}
                onQuickView={() => setSelectedProduct(product)}
              />
            ))}
          </div>
        ) : (
          <div className="mt-8 rounded-3xl bg-white px-5 py-14 text-center shadow-sm">
            <SearchX className="mx-auto text-slate-300" size={46} />

            <h2 className="mt-4 text-xl font-extrabold text-slate-900">
              No products found
            </h2>

            <p className="mx-auto mt-2 max-w-sm text-sm leading-6 text-slate-500">
              Try another keyword or choose a different category.
            </p>

            <button
              type="button"
              onClick={() => {
                setQuery("");
                setCategory("All");
              }}
              className="mt-5 rounded-2xl bg-slate-900 px-6 py-3 text-sm font-bold text-white"
            >
              Clear Search
            </button>
          </div>
        )}
      </div>

      <QuickViewModal
        open={Boolean(selectedProduct)}
        onClose={() => setSelectedProduct(null)}
        product={
          selectedProduct
            ? {
                id: selectedProduct.id,
                name: selectedProduct.name,
                image: selectedProduct.image,
                price: selectedProduct.price,
                oldPrice: selectedProduct.old_price,
              }
            : null
        }
      />

      <BottomNav />
    </main>
  );
}
