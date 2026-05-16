"use client";

import { useEffect, useState } from "react";
import { useParams, useRouter } from "next/navigation";
import { supabase } from "@/lib/supabase";
import toast from "react-hot-toast";

export default function EditProductPage() {
  const params = useParams();
  const router = useRouter();

  const [loading, setLoading] = useState(false);

  const [name, setName] = useState("");
  const [image, setImage] = useState("");
  const [extraImages, setExtraImages] = useState<string[]>([]);
  const [newExtraImages, setNewExtraImages] = useState<FileList | null>(null);

  const [price, setPrice] = useState("");
  const [oldPrice, setOldPrice] = useState("");
  const [discount, setDiscount] = useState("");
  const [badge, setBadge] = useState("");
  const [category, setCategory] = useState("");
  const [stock, setStock] = useState("");
  const [description, setDescription] = useState("");
  const [details, setDetails] = useState("");

  const [newMainImage, setNewMainImage] = useState<File | null>(null);

  useEffect(() => {
    fetchProduct();
  }, []);

  const fetchProduct = async () => {
    const { data, error } = await supabase
      .from("products")
      .select("*")
      .eq("id", params.id)
      .single();

    if (error) {
      toast.error("Product load failed");
      return;
    }

    setName(data.name || "");
    setImage(data.image || "");
    setExtraImages(data.extra_images || []);
    setPrice(data.price?.toString() || "");
    setOldPrice(data.old_price?.toString() || "");
    setDiscount(data.discount || "");
    setBadge(data.badge || "");
    setCategory(data.category || "");
    setStock(data.stock?.toString() || "");
    setDescription(data.description || "");
    setDetails(data.details || "");
  };

  const uploadImage = async (file: File) => {
    const fileName = `${Date.now()}-${file.name}`;

    const { error } = await supabase.storage
      .from("products")
      .upload(fileName, file);

    if (error) {
      throw error;
    }

    const {
      data: { publicUrl },
    } = supabase.storage
      .from("products")
      .getPublicUrl(fileName);

    return publicUrl;
  };

  const handleUpdate = async () => {
    try {
      setLoading(true);

      let mainImage = image;

      if (newMainImage) {
        mainImage = await uploadImage(newMainImage);
      }

      let uploadedExtraImages = extraImages;

      if (newExtraImages && newExtraImages.length > 0) {
        uploadedExtraImages = [];

        for (const file of Array.from(newExtraImages)) {
          const url = await uploadImage(file);
          uploadedExtraImages.push(url);
        }
      }

      const { error } = await supabase
        .from("products")
        .update({
          name,
          image: mainImage,
          extra_images: uploadedExtraImages,
          price: Number(price),
          old_price: Number(oldPrice),
          discount,
          badge,
          category,
          stock: Number(stock),
          description,
          details,
        })
        .eq("id", params.id);

      if (error) {
        toast.error(error.message);
        return;
      }

      toast.success("Product updated");

      router.push("/admin/products");
    } catch (err: any) {
      toast.error(err.message);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen bg-gray-100 p-5">
      <div className="mx-auto max-w-2xl">
        <h1 className="mb-8 text-5xl font-black text-slate-950">
          Edit Product
        </h1>

        <div className="space-y-5">
          <input
            type="text"
            placeholder="Product Name"
            value={name}
            onChange={(e) => setName(e.target.value)}
            className="w-full rounded-[30px] border-2 border-slate-900 bg-white p-5 text-xl outline-none"
          />

          {/* MAIN IMAGE */}
          <div className="rounded-[30px] border-2 border-slate-900 bg-white p-5">
            <p className="mb-3 text-2xl font-bold">
              Main Image
            </p>

            {image && (
              <img
                src={image}
                alt=""
                className="mb-4 h-40 w-40 rounded-xl object-cover"
              />
            )}

            <input
              type="file"
              onChange={(e) =>
                setNewMainImage(e.target.files?.[0] || null)
              }
            />
          </div>

          {/* EXTRA IMAGES */}
          <div className="rounded-[30px] border-2 border-slate-900 bg-white p-5">
            <p className="mb-3 text-2xl font-bold">
              Extra Images
            </p>

            <div className="mb-4 flex flex-wrap gap-3">
              {extraImages?.map((img, i) => (
                <img
                  key={i}
                  src={img}
                  alt=""
                  className="h-24 w-24 rounded-xl object-cover"
                />
              ))}
            </div>

            <input
              type="file"
              multiple
              onChange={(e) =>
                setNewExtraImages(e.target.files)
              }
            />
          </div>

          <input
            type="number"
            placeholder="Price"
            value={price}
            onChange={(e) => setPrice(e.target.value)}
            className="w-full rounded-[30px] border-2 border-slate-900 bg-white p-5 text-xl outline-none"
          />

          <input
            type="number"
            placeholder="Old Price"
            value={oldPrice}
            onChange={(e) => setOldPrice(e.target.value)}
            className="w-full rounded-[30px] border-2 border-slate-900 bg-white p-5 text-xl outline-none"
          />

          <input
            type="text"
            placeholder="Discount"
            value={discount}
            onChange={(e) => setDiscount(e.target.value)}
            className="w-full rounded-[30px] border-2 border-slate-900 bg-white p-5 text-xl outline-none"
          />

          <input
            type="text"
            placeholder="Badge"
            value={badge}
            onChange={(e) => setBadge(e.target.value)}
            className="w-full rounded-[30px] border-2 border-slate-900 bg-white p-5 text-xl outline-none"
          />

          <input
            type="text"
            placeholder="Category"
            value={category}
            onChange={(e) => setCategory(e.target.value)}
            className="w-full rounded-[30px] border-2 border-slate-900 bg-white p-5 text-xl outline-none"
          />

          <input
            type="number"
            placeholder="Stock"
            value={stock}
            onChange={(e) => setStock(e.target.value)}
            className="w-full rounded-[30px] border-2 border-slate-900 bg-white p-5 text-xl outline-none"
          />

          <textarea
            placeholder="Short Description"
            value={description}
            onChange={(e) => setDescription(e.target.value)}
            className="h-40 w-full rounded-[30px] border-2 border-slate-900 bg-white p-5 text-xl outline-none"
          />

          <textarea
            placeholder="Product Details"
            value={details}
            onChange={(e) => setDetails(e.target.value)}
            className="h-52 w-full rounded-[30px] border-2 border-slate-900 bg-white p-5 text-xl outline-none"
          />

          <button
            onClick={handleUpdate}
            disabled={loading}
            className="w-full rounded-[30px] bg-orange-500 p-5 text-2xl font-black text-white transition hover:bg-orange-600"
          >
            {loading ? "Updating..." : "Update Product"}
          </button>
        </div>
      </div>
    </div>
  );
}