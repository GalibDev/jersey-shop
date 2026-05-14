"use client";

import Image from "next/image";

const categories = [
  {
    id: 1,
    name: "Brazil",
    image: "/products/brazil-yellow.jpg",
  },
  {
    id: 2,
    name: "Argentina",
    image: "/products/argentina.jpg",
  },
  {
    id: 3,
    name: "Portugal",
    image: "/products/brazil-black.jpg",
  },
  {
    id: 4,
    name: "World Cup",
    image: "/products/brazil-yellow.jpg",
  },
];

export default function CategorySlider() {
  return (
    <section className="mt-6">
      <div className="mb-4 flex items-center justify-between px-4">
        <h2 className="text-xl font-extrabold text-slate-900">
          Categories
        </h2>

        <button className="text-sm font-bold text-orange-500">
          See All
        </button>
      </div>

      <div className="flex gap-4 overflow-x-auto px-4 pb-2">
        {categories.map((category) => (
          <div
            key={category.id}
            className="relative min-w-[160px] overflow-hidden rounded-3xl"
          >
            <div className="relative h-[180px] w-full">
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