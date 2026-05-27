"use client";

import { useEffect, useState } from "react";

import Image from "next/image";

import { supabase } from "@/lib/supabase";

type Category = {
  id: number;
  name: string;
  image: string;
  is_active: boolean;
};

export default function CategorySlider() {
  const [categories, setCategories] = useState<Category[]>([]);

  useEffect(() => {
    const getCategories = async () => {
      const { data } = await supabase
        .from("categories")
        .select("*")
        .eq("is_active", true)
        .order("id", { ascending: false });

      setCategories(data || []);
    };

    getCategories();
  }, []);

  if (categories.length === 0) {
    return null;
  }

  return (
    <section className="mx-auto mt-6 max-w-7xl">
      <div className="mb-4 flex items-center justify-between px-4 sm:px-6 lg:px-8">
        <h2 className="text-xl font-extrabold text-slate-900">
          Categories
        </h2>

        <button className="text-sm font-bold text-orange-500">
          See All
        </button>
      </div>

      <div className="flex gap-4 overflow-x-auto px-4 pb-2 sm:px-6 lg:px-8">
        {categories.map((category) => (
          <div
            key={category.id}
            className="relative min-w-[160px] overflow-hidden rounded-3xl sm:min-w-[210px]"
          >
            <div className="relative h-[180px] w-full sm:h-[220px]">
              <Image
                src={category.image}
                alt={category.name}
                fill
                className="object-cover"
              />
            </div>

            <div className="absolute inset-0 bg-black/35" />

            <div className="absolute bottom-4 left-4 z-10">
              <h3 className="text-xl font-extrabold text-white">
                {category.name}
              </h3>
            </div>
          </div>
        ))}
      </div>
    </section>
  );
}
