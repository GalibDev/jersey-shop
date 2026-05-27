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
        className="rounded-[28px]"
      >
        {sliders.map((slide) => (
          <SwiperSlide key={slide.id}>
            <div className="relative h-[390px] overflow-hidden rounded-[28px] bg-slate-950 sm:aspect-[16/9] sm:h-auto sm:min-h-[360px] lg:min-h-[430px]">
              <Image
                src={slide.image}
                alt=""
                fill
                aria-hidden="true"
                priority
                className="scale-110 object-cover opacity-70 blur-2xl"
              />

              <div className="absolute inset-0 bg-black/20" />

              <div className="absolute inset-x-4 top-4 bottom-[152px] z-10 sm:inset-6">
                <Image
                  src={slide.image}
                  alt={slide.title}
                  fill
                  priority
                  className="object-contain object-center drop-shadow-2xl sm:object-right"
                />
              </div>

              <div className="absolute inset-0 z-20 bg-gradient-to-t from-black/95 via-black/55 to-black/10 sm:bg-gradient-to-r sm:from-black/80 sm:via-black/35 sm:to-transparent" />

              <div className="absolute bottom-6 left-5 right-5 z-30 text-white sm:bottom-10 sm:left-10 sm:right-auto sm:max-w-md lg:max-w-lg">
                <p className="line-clamp-2 text-[10px] font-bold uppercase tracking-[3px] text-orange-300 sm:text-sm sm:tracking-[4px]">
                  {slide.subtitle}
                </p>

                <h1 className="mt-2 line-clamp-2 text-[28px] font-extrabold leading-[1.08] sm:mt-3 sm:text-5xl sm:leading-tight lg:text-6xl">
                  {slide.title}
                </h1>

                <Link href={slide.link || "/"}>
                  <button className="mt-4 rounded-2xl bg-orange-500 px-6 py-3 text-sm font-bold text-white shadow-lg transition hover:bg-orange-600 sm:mt-5 sm:px-8 sm:py-4 sm:text-base">
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
