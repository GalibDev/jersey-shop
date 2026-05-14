"use client";

import { useEffect, useState } from "react";
import Link from "next/link";
import { ArrowLeft, Pencil, Trash2 } from "lucide-react";
import toast from "react-hot-toast";

import { supabase } from "@/lib/supabase";
import AdminGuard from "@/components/AdminGuard";

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

export default function AdminProductsPage() {
  const [products, setProducts] = useState<Product[]>([]);
  const [search, setSearch] = useState("");

  const getProducts = async () => {
    const { data, error } = await supabase
      .from("products")
      .select("*")
      .order("id", { ascending: false });

    if (error) {
      toast.error("Products load failed");
      return;
    }

    setProducts(data || []);
  };

  const deleteProduct = async (id: number) => {
    const confirmDelete = confirm("Delete this product?");
    if (!confirmDelete) return;

    const { error } = await supabase
      .from("products")
      .delete()
      .eq("id", id);

    if (error) {
      toast.error("Delete failed");
      return;
    }

    toast.success("Product deleted");
    getProducts();
  };

  useEffect(() => {
    getProducts();
  }, []);

  const filteredProducts = products.filter((product) =>
    product.name.toLowerCase().includes(search.toLowerCase())
  );

  return (
    <AdminGuard>
      <main className="min-h-screen bg-gray-100 p-4">
        <Link
          href="/admin"
          className="mb-5 flex h-11 w-11 items-center justify-center rounded-full bg-white shadow"
        >
          <ArrowLeft size={24} />
        </Link>

        <h1 className="mb-6 text-3xl font-extrabold text-slate-900">
          Products
        </h1>

        <input
          type="text"
          placeholder="Search product..."
          value={search}
          onChange={(e) => setSearch(e.target.value)}
          className="mb-5 h-14 w-full rounded-2xl border bg-white px-4 outline-none"
        />

        <Link href="/admin/products/add">
          <button className="mb-5 w-full rounded-2xl bg-orange-500 py-4 font-bold text-white">
            Add New Product
          </button>
        </Link>

        <div className="space-y-4">
          {filteredProducts.map((product) => (
            <div
              key={product.id}
              className="rounded-3xl bg-white p-4 shadow-sm"
            >
              <h2 className="font-extrabold text-slate-900">
                {product.name}
              </h2>

              <p className="mt-1 text-sm text-slate-500">
                ৳{product.price} • Stock: {product.stock}
              </p>

              <div className="mt-4 flex gap-3">
                <Link href={`/admin/products/edit/${product.id}`}>
                  <button className="flex items-center gap-2 rounded-xl bg-blue-500 px-4 py-2 font-bold text-white">
                    <Pencil size={18} />
                    Edit
                  </button>
                </Link>

                <button
                  onClick={() => deleteProduct(product.id)}
                  className="flex items-center gap-2 rounded-xl bg-red-500 px-4 py-2 font-bold text-white"
                >
                  <Trash2 size={18} />
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