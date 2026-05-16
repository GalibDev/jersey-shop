"use client";

import { useEffect, useState } from "react";
import Link from "next/link";
import { ArrowLeft, Trash2 } from "lucide-react";
import toast from "react-hot-toast";

import { supabase } from "@/lib/supabase";
import AdminGuard from "@/components/AdminGuard";

type Category = {
  id: number;
  name: string;
  image: string | null;
  is_active: boolean;
};

export default function AdminCategoriesPage() {
  const [categories, setCategories] = useState<Category[]>([]);
  const [name, setName] = useState("");
  const [imageFile, setImageFile] = useState<File | null>(null);
  const [editingId, setEditingId] = useState<number | null>(null);
  const [loading, setLoading] = useState(false);

  const getCategories = async () => {
    const { data, error } = await supabase
      .from("categories")
      .select("*")
      .order("id", { ascending: false });

    if (error) {
      toast.error(error.message);
      return;
    }

    setCategories(data || []);
  };

  const uploadImage = async (file: File) => {
    const fileName = `${Date.now()}-${file.name}`;

    const { error } = await supabase.storage
      .from("products")
      .upload(fileName, file);

    if (error) throw error;

    const {
      data: { publicUrl },
    } = supabase.storage.from("products").getPublicUrl(fileName);

    return publicUrl;
  };

  const resetForm = () => {
    setName("");
    setImageFile(null);
    setEditingId(null);
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    if (!name.trim()) {
      toast.error("Category name required");
      return;
    }

    setLoading(true);

    try {
      let imageUrl: string | null = null;

      if (imageFile) {
        imageUrl = await uploadImage(imageFile);
      }

      if (editingId) {
        const updateData: {
          name: string;
          image?: string;
        } = {
          name,
        };

        if (imageUrl) updateData.image = imageUrl;

        const { error } = await supabase
          .from("categories")
          .update(updateData)
          .eq("id", editingId);

        if (error) {
          toast.error(error.message);
          setLoading(false);
          return;
        }

        toast.success("Category updated");
      } else {
        const { error } = await supabase.from("categories").insert([
          {
            name,
            image: imageUrl,
            is_active: true,
          },
        ]);

        if (error) {
          toast.error(error.message);
          setLoading(false);
          return;
        }

        toast.success("Category added");
      }

      resetForm();
      getCategories();
    } catch (error: any) {
      toast.error(error.message || "Image upload failed");
    }

    setLoading(false);
  };

  const startEdit = (category: Category) => {
    setEditingId(category.id);
    setName(category.name);
    setImageFile(null);
    window.scrollTo({ top: 0, behavior: "smooth" });
  };

  const toggleActive = async (category: Category) => {
    const { error } = await supabase
      .from("categories")
      .update({
        is_active: !category.is_active,
      })
      .eq("id", category.id);

    if (error) {
      toast.error(error.message);
      return;
    }

    toast.success("Category status updated");
    getCategories();
  };

  const deleteCategory = async (id: number) => {
    const { error } = await supabase.from("categories").delete().eq("id", id);

    if (error) {
      toast.error(error.message);
      return;
    }

    setCategories((prev) => prev.filter((item) => item.id !== id));
    toast.success("Category deleted");
  };

  useEffect(() => {
    getCategories();
  }, []);

  return (
    <AdminGuard>
      <main className="min-h-screen bg-gray-100 p-4">
        <Link
          href="/admin"
          className="mb-5 flex h-11 w-11 items-center justify-center rounded-full bg-white shadow"
        >
          <ArrowLeft size={24} />
        </Link>

        <h1 className="mb-6 text-4xl font-extrabold text-slate-900">
          Categories
        </h1>

        <form
          onSubmit={handleSubmit}
          className="mb-8 rounded-3xl bg-white p-4 shadow-sm"
        >
          <h2 className="mb-4 text-xl font-extrabold text-slate-900">
            {editingId ? "Edit Category" : "Add Category"}
          </h2>

          <input
            type="text"
            placeholder="Category Name"
            value={name}
            onChange={(e) => setName(e.target.value)}
            className="mb-4 h-14 w-full rounded-2xl border px-4 outline-none"
          />

          <div className="rounded-2xl border bg-white p-4">
            <p className="mb-2 font-bold text-slate-800">
              Category Image
            </p>

            <input
              type="file"
              accept="image/*"
              onChange={(e) => setImageFile(e.target.files?.[0] || null)}
            />

            <p className="mt-2 text-xs text-slate-500">
              Edit করলে image optional. New image select করলে replace হবে.
            </p>
          </div>

          <div className="mt-4 flex gap-3">
            <button
              disabled={loading}
              className="flex-1 rounded-2xl bg-orange-500 py-4 font-bold text-white disabled:opacity-60"
            >
              {loading
                ? "Saving..."
                : editingId
                ? "Update Category"
                : "Add Category"}
            </button>

            {editingId && (
              <button
                type="button"
                onClick={resetForm}
                className="rounded-2xl bg-slate-900 px-5 py-4 font-bold text-white"
              >
                Cancel
              </button>
            )}
          </div>
        </form>

        <div className="space-y-4">
          {categories.map((category) => (
            <div
              key={category.id}
              className="rounded-3xl bg-white p-4 shadow-sm"
            >
              <div className="flex items-center gap-4">
                <div className="h-24 w-24 overflow-hidden rounded-2xl bg-gray-100">
                  {category.image ? (
                    <img
                      src={category.image}
                      alt={category.name}
                      className="h-full w-full object-cover"
                    />
                  ) : (
                    <div className="flex h-full w-full items-center justify-center text-xs font-bold text-slate-400">
                      No Image
                    </div>
                  )}
                </div>

                <div className="flex-1">
                  <h2 className="text-xl font-extrabold text-slate-900">
                    {category.name}
                  </h2>

                  <p
                    className={`mt-1 text-sm font-bold ${
                      category.is_active
                        ? "text-green-600"
                        : "text-slate-400"
                    }`}
                  >
                    {category.is_active ? "Active" : "Inactive"}
                  </p>
                </div>
              </div>

              <div className="mt-4 grid grid-cols-3 gap-3">
                <button
                  type="button"
                  onClick={() => startEdit(category)}
                  className="rounded-2xl bg-blue-500 py-3 font-bold text-white"
                >
                  Edit
                </button>

                <button
                  type="button"
                  onClick={() => toggleActive(category)}
                  className={`rounded-2xl py-3 font-bold text-white ${
                    category.is_active ? "bg-slate-500" : "bg-green-500"
                  }`}
                >
                  {category.is_active ? "Hide" : "Show"}
                </button>

                <button
                  type="button"
                  onClick={() => deleteCategory(category.id)}
                  className="flex items-center justify-center gap-2 rounded-2xl bg-red-500 py-3 font-bold text-white"
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