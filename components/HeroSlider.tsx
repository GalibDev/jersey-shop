"use client";

import { useEffect, useState } from "react";
import Image from "next/image";
import Link from "next/link";
import { Search } from "lucide-react";

import { Swiper, SwiperSlide } from "swiper/react";
import { Autoplay, EffectFade, Pagination } from "swiper/modules";

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
    <section className="relative w-full overflow-hidden bg-slate-950">
      <Swiper
        modules={[Autoplay, Pagination, EffectFade]}
        autoplay={{
          delay: 3800,
          disableOnInteraction: false,
        }}
        pagination={{
          clickable: true,
        }}
        effect="fade"
        speed={1000}
        loop
        className="hero-splayd-slider"
      >
        {sliders.map((slide) => (
          <SwiperSlide key={slide.id}>
            <div className="relative h-[520px] overflow-hidden bg-slate-950 sm:h-[calc(100svh-150px)] sm:min-h-[560px] sm:max-h-[860px]">
              <Image
                src={slide.image}
                alt={slide.title || "NOVALO slider"}
                fill
                priority
                sizes="100vw"
                className="object-cover object-center"
              />

              <div className="absolute inset-0 bg-gradient-to-b from-black/35 via-black/5 to-black/20" />

              <Link
                href={slide.link || "/"}
                aria-label={slide.title || "Open slider"}
                className="absolute inset-0 z-[5]"
              />

              <div className="pointer-events-none absolute inset-x-4 top-7 z-20 sm:inset-x-12 sm:top-12 lg:inset-x-16">
                <Link
                  href="/search"
                  className="pointer-events-auto flex h-14 max-w-full items-center gap-4 border border-white/80 bg-black/25 px-4 text-white shadow-2xl backdrop-blur-sm transition hover:bg-black/35 sm:h-16"
                >
                  <Search className="h-7 w-7 shrink-0 sm:h-8 sm:w-8" />
                  <span className="text-base font-medium sm:text-lg">
                    Search &quot;Argentina Jersey&quot;
                  </span>
                </Link>
              </div>
            </div>
          </SwiperSlide>
        ))}
      </Swiper>

      <style jsx global>{`
        .hero-splayd-slider .swiper-pagination {
          bottom: 18px !important;
        }

        .hero-splayd-slider .swiper-pagination-bullet {
          width: 34px;
          height: 4px;
          border-radius: 999px;
          background: rgba(255, 255, 255, 0.55);
          opacity: 1;
        }

        .hero-splayd-slider .swiper-pagination-bullet-active {
          background: #ff5f05;
        }
      `}</style>
    </section>
  );
}
