"use client";

import { useEffect, useState } from "react";
import Link from "next/link";
import { ArrowLeft, Trash2 } from "lucide-react";
import toast from "react-hot-toast";

import { supabase } from "@/lib/supabase";
import AdminGuard from "@/components/AdminGuard";

type Slider = {
  id: number;
  title: string;
  subtitle: string;
  image: string;
  button_text: string;
  link: string;
  is_active: boolean;
};

export default function AdminSlidersPage() {
  const [sliders, setSliders] = useState<Slider[]>([]);

  const [title, setTitle] = useState("");
  const [subtitle, setSubtitle] = useState("");
  const [buttonText, setButtonText] = useState("Order Now");
  const [link, setLink] = useState("/");
  const [imageFile, setImageFile] = useState<File | null>(null);

  const [editingId, setEditingId] = useState<number | null>(null);
  const [loading, setLoading] = useState(false);

  const getSliders = async () => {
    const { data, error } = await supabase
      .from("sliders")
      .select("*")
      .order("id", { ascending: false });

    if (error) {
      toast.error(error.message);
      return;
    }

    setSliders(data || []);
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
    setTitle("");
    setSubtitle("");
    setButtonText("Order Now");
    setLink("/");
    setImageFile(null);
    setEditingId(null);
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    if (!title.trim()) {
      toast.error("Title required");
      return;
    }

    setLoading(true);

    try {
      let imageUrl = "";

      if (imageFile) {
        imageUrl = await uploadImage(imageFile);
      }

      if (editingId) {
        const updateData: {
          title: string;
          subtitle: string;
          button_text: string;
          link: string;
          image?: string;
        } = {
          title,
          subtitle,
          button_text: buttonText,
          link,
        };

        if (imageUrl) updateData.image = imageUrl;

        const { error } = await supabase
          .from("sliders")
          .update(updateData)
          .eq("id", editingId);

        if (error) {
          toast.error(error.message);
          setLoading(false);
          return;
        }

        toast.success("Slider updated");
      } else {
        if (!imageUrl) {
          toast.error("Slider image required");
          setLoading(false);
          return;
        }

        const { error } = await supabase.from("sliders").insert([
          {
            title,
            subtitle,
            image: imageUrl,
            button_text: buttonText,
            link,
            is_active: true,
          },
        ]);

        if (error) {
          toast.error(error.message);
          setLoading(false);
          return;
        }

        toast.success("Slider added");
      }

      resetForm();
      getSliders();
    } catch (error: any) {
      toast.error(error.message || "Image upload failed");
    }

    setLoading(false);
  };

  const startEdit = (slider: Slider) => {
    setEditingId(slider.id);
    setTitle(slider.title || "");
    setSubtitle(slider.subtitle || "");
    setButtonText(slider.button_text || "Order Now");
    setLink(slider.link || "/");
    setImageFile(null);

    window.scrollTo({
      top: 0,
      behavior: "smooth",
    });
  };

  const toggleActive = async (slider: Slider) => {
    const { error } = await supabase
      .from("sliders")
      .update({
        is_active: !slider.is_active,
      })
      .eq("id", slider.id);

    if (error) {
      toast.error(error.message);
      return;
    }

    toast.success("Slider status updated");
    getSliders();
  };

  const deleteSlider = async (id: number) => {
    const { error } = await supabase.from("sliders").delete().eq("id", id);

    if (error) {
      toast.error(error.message);
      return;
    }

    setSliders((prev) => prev.filter((item) => item.id !== id));
    toast.success("Slider deleted");
  };

  useEffect(() => {
    getSliders();
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
          Sliders
        </h1>

        <form
          onSubmit={handleSubmit}
          className="mb-8 rounded-3xl bg-white p-4 shadow-sm"
        >
          <h2 className="mb-4 text-xl font-extrabold text-slate-900">
            {editingId ? "Edit Slider" : "Add Slider"}
          </h2>

          <input
            type="text"
            placeholder="Slider Title"
            value={title}
            onChange={(e) => setTitle(e.target.value)}
            className="mb-4 h-14 w-full rounded-2xl border px-4 outline-none"
            required
          />

          <textarea
            placeholder="Subtitle"
            value={subtitle}
            onChange={(e) => setSubtitle(e.target.value)}
            className="mb-4 min-h-[90px] w-full rounded-2xl border p-4 outline-none"
          />

          <input
            type="text"
            placeholder="Button Text"
            value={buttonText}
            onChange={(e) => setButtonText(e.target.value)}
            className="mb-4 h-14 w-full rounded-2xl border px-4 outline-none"
          />

          <input
            type="text"
            placeholder="Button Link e.g. /product/1"
            value={link}
            onChange={(e) => setLink(e.target.value)}
            className="mb-4 h-14 w-full rounded-2xl border px-4 outline-none"
          />

          <div className="rounded-2xl border bg-white p-4">
            <p className="mb-2 font-bold text-slate-800">
              Slider Image
            </p>

            <input
              type="file"
              accept="image/*"
              onChange={(e) => setImageFile(e.target.files?.[0] || null)}
            />

            <p className="mt-2 text-xs text-slate-500">
              Edit করলে image optional. New image দিলে replace হবে.
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
                ? "Update Slider"
                : "Add Slider"}
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
          {sliders.map((slider) => (
            <div
              key={slider.id}
              className="rounded-3xl bg-white p-4 shadow-sm"
            >
              <div className="overflow-hidden rounded-2xl bg-gray-100">
                <img
                  src={slider.image}
                  alt={slider.title}
                  className="h-44 w-full object-cover"
                />
              </div>

              <h2 className="mt-4 text-xl font-extrabold text-slate-900">
                {slider.title}
              </h2>

              <p className="mt-1 text-sm text-slate-500">
                {slider.subtitle}
              </p>

              <p className="mt-2 text-sm font-bold text-orange-500">
                Button: {slider.button_text} • Link: {slider.link}
              </p>

              <p
                className={`mt-2 text-sm font-bold ${
                  slider.is_active ? "text-green-600" : "text-slate-400"
                }`}
              >
                {slider.is_active ? "Active" : "Inactive"}
              </p>

              <div className="mt-4 grid grid-cols-3 gap-3">
                <button
                  type="button"
                  onClick={() => startEdit(slider)}
                  className="rounded-2xl bg-blue-500 py-3 font-bold text-white"
                >
                  Edit
                </button>

                <button
                  type="button"
                  onClick={() => toggleActive(slider)}
                  className={`rounded-2xl py-3 font-bold text-white ${
                    slider.is_active ? "bg-slate-500" : "bg-green-500"
                  }`}
                >
                  {slider.is_active ? "Hide" : "Show"}
                </button>

                <button
                  type="button"
                  onClick={() => deleteSlider(slider.id)}
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