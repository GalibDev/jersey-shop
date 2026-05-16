"use client";

import { useEffect, useState } from "react";
import Link from "next/link";
import { ArrowLeft, Pencil, Trash2 } from "lucide-react";
import toast from "react-hot-toast";

import { supabase } from "@/lib/supabase";
import AdminGuard from "@/components/AdminGuard";

interface Product {
  id: number;
  name: string;
  image: string;
  price: number;
  stock: number;
}

export default function AdminProductsPage() {
  const [products, setProducts] = useState<Product[]>([]);
  const [search, setSearch] = useState("");
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    fetchProducts();
  }, []);

  const fetchProducts = async () => {
    setLoading(true);

    const { data, error } = await supabase
      .from("products")
      .select("*")
      .order("id", { ascending: false });

    if (error) {
      toast.error("Failed to load products");
      setLoading(false);
      return;
    }

    setProducts(data || []);
    setLoading(false);
  };

  const handleDelete = async (id: number) => {
    const confirmDelete = confirm(
      "Are you sure you want to delete this product?"
    );

    if (!confirmDelete) return;

    try {
      const { error } = await supabase
        .from("products")
        .delete()
        .eq("id", id);

      if (error) {
        toast.error(error.message);
        return;
      }

      setProducts((prev) =>
        prev.filter((product) => product.id !== id)
      );

      toast.success("Product deleted successfully");
    } catch (error: any) {
      toast.error(error.message);
    }
  };

  const filteredProducts = products.filter((product) =>
    product.name
      ?.toLowerCase()
      .includes(search.toLowerCase())
  );

  return (
    <AdminGuard>
      <main className="min-h-screen bg-gray-100 p-4">
        <Link
          href="/admin"
          className="mb-5 flex h-12 w-12 items-center justify-center rounded-full bg-white shadow-md"
        >
          <ArrowLeft size={24} />
        </Link>

        <h1 className="mb-6 text-5xl font-black text-slate-950">
          Products
        </h1>

        {/* SEARCH */}
        <input
          type="text"
          placeholder="Search product..."
          value={search}
          onChange={(e) => setSearch(e.target.value)}
          className="mb-5 h-16 w-full rounded-[30px] border-2 border-slate-900 bg-white px-5 text-lg outline-none"
        />

        {/* ADD BUTTON */}
        <Link
          href="/admin/products/add"
          className="mb-8 flex h-16 w-full items-center justify-center rounded-[30px] bg-orange-500 text-2xl font-black text-white transition hover:bg-orange-600"
        >
          Add New Product
        </Link>

        {/* LOADING */}
        {loading && (
          <div className="py-20 text-center text-2xl font-bold text-slate-700">
            Loading...
          </div>
        )}

        {/* EMPTY */}
        {!loading && filteredProducts.length === 0 && (
          <div className="rounded-3xl bg-white p-10 text-center text-xl font-bold text-slate-600 shadow">
            No products found
          </div>
        )}

        {/* PRODUCTS */}
        <div className="space-y-5">
          {filteredProducts.map((product) => (
            <div
              key={product.id}
              className="rounded-[30px] bg-white p-5 shadow"
            >
              <div className="flex gap-4">
                {/* IMAGE */}
                <img
                  src={
                    product.image ||
                    "https://via.placeholder.com/150"
                  }
                  alt={product.name}
                  className="h-28 w-28 rounded-2xl object-cover"
                />

                {/* INFO */}
                <div className="flex-1">
                  <h2 className="line-clamp-2 text-2xl font-black text-slate-900">
                    {product.name}
                  </h2>

                  <p className="mt-2 text-lg text-slate-600">
                    ৳{product.price} • Stock: {product.stock}
                  </p>
                </div>
              </div>

              {/* BUTTONS */}
              <div className="mt-5 flex gap-3">
                <Link
                  href={`/admin/products/edit/${product.id}`}
                  className="flex flex-1 items-center justify-center gap-2 rounded-2xl bg-blue-500 px-4 py-4 text-xl font-bold text-white transition hover:bg-blue-600"
                >
                  <Pencil size={22} />
                  Edit
                </Link>

                <button
                  onClick={() =>
                    handleDelete(product.id)
                  }
                  className="flex flex-1 items-center justify-center gap-2 rounded-2xl bg-red-500 px-4 py-4 text-xl font-bold text-white transition hover:bg-red-600"
                >
                  <Trash2 size={22} />
                  Delete
                </button>
              </div>
            </div>
          ))}
        </div>
      </main>
    </AdminGuard>
  );
}