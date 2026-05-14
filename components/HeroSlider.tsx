"use client";

import Image from "next/image";

import { Swiper, SwiperSlide } from "swiper/react";

import {
  Autoplay,
  Pagination,
  EffectFade,
} from "swiper/modules";

import "swiper/css";
import "swiper/css/pagination";
import "swiper/css/effect-fade";

const slides = [
  {
    id: 1,
    image: "/products/brazil-yellow.jpg",
    title: "Official Brazil Jerseys",
  },
  {
    id: 2,
    image: "/products/argentina.jpg",
    title: "Argentina Home Kit",
  },
  {
    id: 3,
    image: "/products/brazil-black.jpg",
    title: "Premium Football Collection",
  },
];

export default function HeroSlider() {
  return (
    <section className="px-4 pt-4">
      <Swiper
        modules={[
          Autoplay,
          Pagination,
          EffectFade,
        ]}
        autoplay={{
          delay: 3000,
          disableOnInteraction: false,
        }}
        pagination={{
          clickable: true,
        }}
        effect="fade"
        speed={1000}
        loop
        className="rounded-[30px]"
      >
        {slides.map((slide) => (
          <SwiperSlide key={slide.id}>
            <div className="relative h-[280px] overflow-hidden rounded-[30px]">
              <Image
                src={slide.image}
                alt={slide.title}
                fill
                priority
                className="animate-[zoom_6s_linear_infinite] object-cover"
              />

              <div className="absolute inset-0 bg-gradient-to-t from-black/70 via-black/20 to-transparent" />

              <div className="absolute bottom-6 left-6 z-10 max-w-[260px] text-white">
                <p className="text-xs font-bold uppercase tracking-[4px] text-orange-300">
                  FIFA WORLD CUP 2026
                </p>

                <h1 className="mt-3 text-3xl font-extrabold leading-tight">
                  {slide.title}
                </h1>

                <button className="mt-5 rounded-2xl bg-orange-500 px-6 py-3 text-sm font-bold text-white shadow-lg">
                  Order Now
                </button>
              </div>
            </div>
          </SwiperSlide>
        ))}
      </Swiper>
    </section>
  );
}