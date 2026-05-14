"use client";

import { use, useEffect, useState } from "react";
import Link from "next/link";
import { ArrowLeft } from "lucide-react";
import { useRouter } from "next/navigation";
import toast from "react-hot-toast";

import { supabase } from "@/lib/supabase";
import AdminGuard from "@/components/AdminGuard";

export default function EditProductPage({
  params,
}: {
  params: Promise<{ id: string }>;
}) {
  const { id } = use(params);
  const router = useRouter();

  const [loading, setLoading] = useState(false);

  const [name, setName] = useState("");
  const [image, setImage] = useState("");
  const [price, setPrice] = useState("");
  const [oldPrice, setOldPrice] = useState("");
  const [discount, setDiscount] = useState("");
  const [badge, setBadge] = useState("");
  const [category, setCategory] = useState("");
  const [stock, setStock] = useState("");

  const [newImageFile, setNewImageFile] = useState<File | null>(null);

  useEffect(() => {
    const getProduct = async () => {
      const { data, error } = await supabase
        .from("products")
        .select("*")
        .eq("id", Number(id))
        .single();

      if (error) {
        toast.error("Product load failed");
        return;
      }

      setName(data.name || "");
      setImage(data.image || "");
      setPrice(String(data.price || ""));
      setOldPrice(String(data.old_price || ""));
      setDiscount(data.discount || "");
      setBadge(data.badge || "");
      setCategory(data.category || "");
      setStock(String(data.stock || ""));
    };

    getProduct();
  }, [id]);

  const handleUpdate = async (e: React.FormEvent) => {
    e.preventDefault();

    setLoading(true);

    let finalImageUrl = image;

    if (newImageFile) {
      const fileName = `${Date.now()}-${newImageFile.name}`;

      const { error: uploadError } = await supabase.storage
        .from("products")
        .upload(fileName, newImageFile);

      if (uploadError) {
        setLoading(false);
        toast.error("Image upload failed");
        return;
      }

      finalImageUrl = `${process.env.NEXT_PUBLIC_SUPABASE_URL}/storage/v1/object/public/products/${fileName}`;
    }

    const { error } = await supabase
      .from("products")
      .update({
        name,
        image: finalImageUrl,
        price: Number(price),
        old_price: Number(oldPrice),
        discount,
        badge,
        category,
        stock: Number(stock),
      })
      .eq("id", Number(id));

    setLoading(false);

    if (error) {
      toast.error("Update failed");
      return;
    }

    toast.success("Product updated");
    router.push("/admin/products");
  };

  return (
    <AdminGuard>
      <main className="min-h-screen bg-gray-100 p-4">
        <Link
          href="/admin/products"
          className="mb-5 flex h-11 w-11 items-center justify-center rounded-full bg-white shadow"
        >
          <ArrowLeft size={24} />
        </Link>

        <h1 className="mb-6 text-3xl font-extrabold text-slate-900">
          Edit Product
        </h1>

        <form onSubmit={handleUpdate} className="space-y-4">
          <input
            className="h-14 w-full rounded-2xl border px-4 outline-none"
            placeholder="Product Name"
            value={name}
            onChange={(e) => setName(e.target.value)}
            required
          />

          <input
            className="h-14 w-full rounded-2xl border px-4 outline-none"
            placeholder="Current Image URL"
            value={image}
            onChange={(e) => setImage(e.target.value)}
            required
          />

          <input
            type="file"
            accept="image/*"
            className="w-full rounded-2xl border bg-white p-4"
            onChange={(e) => setNewImageFile(e.target.files?.[0] || null)}
          />

          <input
            className="h-14 w-full rounded-2xl border px-4 outline-none"
            placeholder="Price"
            value={price}
            onChange={(e) => setPrice(e.target.value)}
            required
          />

          <input
            className="h-14 w-full rounded-2xl border px-4 outline-none"
            placeholder="Old Price"
            value={oldPrice}
            onChange={(e) => setOldPrice(e.target.value)}
          />

          <input
            className="h-14 w-full rounded-2xl border px-4 outline-none"
            placeholder="Discount e.g. 30%"
            value={discount}
            onChange={(e) => setDiscount(e.target.value)}
          />

          <input
            className="h-14 w-full rounded-2xl border px-4 outline-none"
            placeholder="Badge e.g. HOT / NEW / SALE"
            value={badge}
            onChange={(e) => setBadge(e.target.value)}
          />

          <input
            className="h-14 w-full rounded-2xl border px-4 outline-none"
            placeholder="Category"
            value={category}
            onChange={(e) => setCategory(e.target.value)}
          />

          <input
            className="h-14 w-full rounded-2xl border px-4 outline-none"
            placeholder="Stock"
            value={stock}
            onChange={(e) => setStock(e.target.value)}
          />

          <button
            disabled={loading}
            className="w-full rounded-2xl bg-orange-500 py-4 font-bold text-white disabled:opacity-60"
          >
            {loading ? "Updating..." : "Update Product"}
          </button>
        </form>
      </main>
    </AdminGuard>
  );
}