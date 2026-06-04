"use client";

import { useState } from "react";
import Link from "next/link";
import { ArrowLeft } from "lucide-react";
import { useRouter } from "next/navigation";
import toast from "react-hot-toast";

import { supabase } from "@/lib/supabase";
import { reorderProductSerial } from "@/lib/productSerial";
import AdminGuard from "@/components/AdminGuard";

export default function AddProductPage() {
  const router = useRouter();

  const [loading, setLoading] = useState(false);

  const [serial, setSerial] = useState("");
  const [name, setName] = useState("");
  const [price, setPrice] = useState("");
  const [oldPrice, setOldPrice] = useState("");
  const [discount, setDiscount] = useState("");
  const [badge, setBadge] = useState("NEW");
  const [category, setCategory] = useState("");
  const [stock, setStock] = useState("");

  const [description, setDescription] = useState("");
  const [details, setDetails] = useState("");

  const [mainImageFile, setMainImageFile] = useState<File | null>(null);
  const [extraImageFiles, setExtraImageFiles] = useState<File[]>([]);

  const uploadImage = async (file: File) => {
    const fileName = `${Date.now()}-${file.name}`;

    const { error } = await supabase.storage
      .from("products")
      .upload(fileName, file);

    if (error) {
      throw error;
    }

    return `${process.env.NEXT_PUBLIC_SUPABASE_URL}/storage/v1/object/public/products/${fileName}`;
  };

  const handleAdd = async (e: React.FormEvent) => {
    e.preventDefault();

    if (!mainImageFile) {
      toast.error("Select main image");
      return;
    }

    setLoading(true);

    try {
      const mainImageUrl = await uploadImage(mainImageFile);

      const extraImageUrls = await Promise.all(
        extraImageFiles.map((file) => uploadImage(file))
      );

      const allImages = [mainImageUrl, ...extraImageUrls];

      const productData = {
        serial: serial.trim() ? Number(serial) : null,
        name,
        image: mainImageUrl,
        images: allImages,
        price: Number(price),
        old_price: Number(oldPrice),
        discount,
        badge,
        category,
        stock: Number(stock),
        description,
        details,
      };

      const addResult = await supabase
        .from("products")
        .insert([productData])
        .select("id")
        .single();

      let error = addResult.error;
      let addedProductId = addResult.data?.id as number | undefined;

      if (error && error.code === "PGRST204") {
        const { serial: _serial, ...productDataWithoutSerial } = productData;
        const retry = await supabase
          .from("products")
          .insert([productDataWithoutSerial])
          .select("id")
          .single();

        error = retry.error;
        addedProductId = retry.data?.id as number | undefined;
      }

      if (error) {
        toast.error(error.message);
        setLoading(false);
        return;
      }

      if (addedProductId && productData.serial) {
        const serialError = await reorderProductSerial(
          addedProductId,
          productData.serial
        );

        if (serialError) {
          toast.error(serialError.message);
          setLoading(false);
          return;
        }
      }

      toast.success("Product added");
      router.push("/admin/products");
    } catch (error) {
      console.log(error);
      toast.error("Image upload failed");
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

        <h1 className="mb-6 text-3xl font-extrabold text-slate-900">
          Add Product
        </h1>

        <form onSubmit={handleAdd} className="space-y-4">
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
            <p className="mb-2 font-bold text-slate-800">Main Image</p>

            <input
              type="file"
              accept="image/*"
              onChange={(e) => setMainImageFile(e.target.files?.[0] || null)}
              required
            />
          </div>

          <div className="rounded-2xl border bg-white p-4">
            <p className="mb-2 font-bold text-slate-800">
              Extra Images
            </p>

            <input
              type="file"
              accept="image/*"
              multiple
              onChange={(e) =>
                setExtraImageFiles(Array.from(e.target.files || []))
              }
            />

            <p className="mt-2 text-xs text-slate-500">
              Multiple image select korte parba.
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
            className="min-h-[100px] w-full rounded-2xl border p-4 outline-none"
            placeholder="Short product description"
            value={description}
            onChange={(e) => setDescription(e.target.value)}
          />

          <textarea
            className="min-h-[150px] w-full rounded-2xl border p-4 outline-none"
            placeholder="Product details. Example: ✓ Premium Fabric&#10;✓ 170 GSM&#10;✓ Size M, L, XL"
            value={details}
            onChange={(e) => setDetails(e.target.value)}
          />

          <button
            disabled={loading}
            className="w-full rounded-2xl bg-orange-500 py-4 font-bold text-white disabled:opacity-60"
          >
            {loading ? "Uploading..." : "Add Product"}
          </button>
        </form>
      </main>
    </AdminGuard>
  );
}
