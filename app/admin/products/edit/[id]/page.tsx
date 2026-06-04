"use client";

import { useEffect, useState } from "react";
import { useParams, useRouter } from "next/navigation";
import Link from "next/link";
import { ArrowLeft } from "lucide-react";
import toast from "react-hot-toast";

import { supabase } from "@/lib/supabase";
import AdminGuard from "@/components/AdminGuard";

export default function EditProductPage() {
  const params = useParams();
  const router = useRouter();

  const productId = Number(params.id);

  const [loading, setLoading] = useState(false);

  const [serial, setSerial] = useState("");
  const [name, setName] = useState("");
  const [image, setImage] = useState("");
  const [images, setImages] = useState<string[]>([]);

  const [newMainImage, setNewMainImage] = useState<File | null>(null);
  const [newExtraImages, setNewExtraImages] = useState<File[]>([]);

  const [price, setPrice] = useState("");
  const [oldPrice, setOldPrice] = useState("");
  const [discount, setDiscount] = useState("");
  const [badge, setBadge] = useState("");
  const [category, setCategory] = useState("");
  const [stock, setStock] = useState("");
  const [description, setDescription] = useState("");
  const [details, setDetails] = useState("");

  useEffect(() => {
    const fetchProduct = async () => {
      if (!productId || isNaN(productId)) {
        toast.error("Invalid product id");
        return;
      }

      const { data, error } = await supabase
        .from("products")
        .select("*")
        .eq("id", productId)
        .single();

      if (error) {
        toast.error("Product load failed");
        return;
      }

      setSerial(data.serial == null ? "" : String(data.serial));
      setName(data.name || "");
      setImage(data.image || "");
      setImages(data.images || []);
      setPrice(String(data.price || ""));
      setOldPrice(String(data.old_price || ""));
      setDiscount(data.discount || "");
      setBadge(data.badge || "");
      setCategory(data.category || "");
      setStock(String(data.stock || ""));
      setDescription(data.description || "");
      setDetails(data.details || "");
    };

    fetchProduct();
  }, [productId]);

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

  const removeOldImage = (url: string) => {
    setImages((prev) => prev.filter((item) => item !== url));
  };

  const handleUpdate = async (e: React.FormEvent) => {
    e.preventDefault();

    setLoading(true);

    try {
      let finalMainImage = image;
      let finalImages = [...images];

      if (newMainImage) {
        finalMainImage = await uploadImage(newMainImage);
      }

      if (newExtraImages.length > 0) {
        const uploadedExtraImages = await Promise.all(
          newExtraImages.map((file) => uploadImage(file))
        );

        finalImages = [...finalImages, ...uploadedExtraImages];
      }

      if (!finalImages.includes(finalMainImage)) {
        finalImages = [finalMainImage, ...finalImages];
      }

      const productData = {
        serial: serial.trim() ? Number(serial) : null,
        name,
        image: finalMainImage,
        images: finalImages,
        price: Number(price),
        old_price: Number(oldPrice),
        discount,
        badge,
        category,
        stock: Number(stock),
        description,
        details,
      };

      let { error } = await supabase
        .from("products")
        .update(productData)
        .eq("id", productId);

      if (error && error.code === "PGRST204") {
        const { serial: _serial, ...productDataWithoutSerial } = productData;
        const retry = await supabase
          .from("products")
          .update(productDataWithoutSerial)
          .eq("id", productId);

        error = retry.error;
      }

      if (error) {
        toast.error(error.message);
        setLoading(false);
        return;
      }

      toast.success("Product updated");
      router.push("/admin/products");
    } catch (error) {
      toast.error(error instanceof Error ? error.message : "Update failed");
    }

    setLoading(false);
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

        <h1 className="mb-6 text-4xl font-extrabold text-slate-900">
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
            min="1"
            placeholder="Serial e.g. 1"
            type="number"
            value={serial}
            onChange={(e) => setSerial(e.target.value)}
          />

          <div className="rounded-2xl border bg-white p-4">
            <p className="mb-3 font-bold text-slate-800">Current Main Image</p>

            {image && (
              <img
                src={image}
                alt="Main"
                className="mb-4 h-32 w-32 rounded-xl object-cover"
              />
            )}

            <input
              type="file"
              accept="image/*"
              onChange={(e) => setNewMainImage(e.target.files?.[0] || null)}
            />
          </div>

          <div className="rounded-2xl border bg-white p-4">
            <p className="mb-3 font-bold text-slate-800">Gallery Images</p>

            <div className="mb-4 flex flex-wrap gap-3">
              {images.map((img) => (
                <div key={img} className="relative">
                  <img
                    src={img}
                    alt="Gallery"
                    className="h-24 w-24 rounded-xl object-cover"
                  />

                  <button
                    type="button"
                    onClick={() => removeOldImage(img)}
                    className="absolute -right-2 -top-2 flex h-7 w-7 items-center justify-center rounded-full bg-red-500 text-sm font-bold text-white"
                  >
                    ×
                  </button>
                </div>
              ))}
            </div>

            <input
              type="file"
              accept="image/*"
              multiple
              onChange={(e) =>
                setNewExtraImages(Array.from(e.target.files || []))
              }
            />

            <p className="mt-2 text-xs text-slate-500">
              New images add করলে পুরোনো images এর সাথে add হবে.
            </p>
          </div>

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

          <textarea
            className="min-h-[110px] w-full rounded-2xl border p-4 outline-none"
            placeholder="Short product description"
            value={description}
            onChange={(e) => setDescription(e.target.value)}
          />

          <textarea
            className="min-h-[160px] w-full rounded-2xl border p-4 outline-none"
            placeholder="Product details"
            value={details}
            onChange={(e) => setDetails(e.target.value)}
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
