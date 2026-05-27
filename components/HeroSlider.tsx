"use client";

import { useEffect, useState } from "react";
import Image from "next/image";
import Link from "next/link";

import { Swiper, SwiperSlide } from "swiper/react";
import { Autoplay, Pagination, EffectFade } from "swiper/modules";

import "swiper/css";
import "swiper/css/pagination";
import "swiper/css/effect-fade";

import { supabase } from "@/lib/supabase";

type Slider = {
  id: number;
  title: string;
  subtitle: string;
  image: string;
  button_text: string;
  link: string;
  is_active: boolean;
};

export default function HeroSlider() {
  const [sliders, setSliders] = useState<Slider[]>([]);

  useEffect(() => {
    const getSliders = async () => {
      const { data } = await supabase
        .from("sliders")
        .select("*")
        .eq("is_active", true)
        .order("id", { ascending: false });

      setSliders(data || []);
    };

    getSliders();
  }, []);

  if (sliders.length === 0) {
    return null;
  }

  return (
    <section className="mx-auto max-w-7xl px-4 pt-4 sm:px-6 lg:px-8">
      <Swiper
        modules={[Autoplay, Pagination, EffectFade]}
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
        className="rounded-3xl"
      >
        {sliders.map((slide) => (
          <SwiperSlide key={slide.id}>
            <div className="relative aspect-[16/9] min-h-[220px] overflow-hidden rounded-3xl bg-slate-900 sm:min-h-[360px] lg:min-h-[430px]">
              <Image
                src={slide.image}
                alt={slide.title}
                fill
                priority
                className="object-contain"
              />

              <div className="absolute inset-0 bg-gradient-to-r from-black/75 via-black/35 to-black/10" />

              <div className="absolute bottom-6 left-6 z-10 max-w-[280px] text-white sm:bottom-10 sm:left-10 sm:max-w-md lg:max-w-lg">
                <p className="text-xs font-bold uppercase tracking-[4px] text-orange-300 sm:text-sm">
                  {slide.subtitle}
                </p>

                <h1 className="mt-3 text-3xl font-extrabold leading-tight sm:text-5xl lg:text-6xl">
                  {slide.title}
                </h1>

                <Link href={slide.link || "/"}>
                  <button className="mt-5 rounded-2xl bg-orange-500 px-6 py-3 text-sm font-bold text-white shadow-lg transition hover:bg-orange-600 sm:px-8 sm:py-4 sm:text-base">
                    {slide.button_text || "Order Now"}
                  </button>
                </Link>
              </div>
            </div>
          </SwiperSlide>
        ))}
      </Swiper>
    </section>
  );
}
