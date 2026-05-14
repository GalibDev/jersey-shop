"use client";

import { Flame } from "lucide-react";

export default function OfferBanner() {
  return (
    <section className="px-4 pt-4">
      <div className="flex items-center justify-between rounded-2xl bg-gradient-to-r from-orange-500 to-red-500 px-4 py-4 text-white shadow-lg">
        <div>
          <p className="text-xs font-bold uppercase tracking-[3px]">
            Limited Offer
          </p>

          <h2 className="mt-1 text-lg font-extrabold">
            Up To 40% OFF 🔥
          </h2>

          <p className="mt-1 text-xs text-white/80">
            Premium Football Jerseys
          </p>
        </div>

        <div className="flex h-14 w-14 items-center justify-center rounded-full bg-white/20">
          <Flame size={30} />
        </div>
      </div>
    </section>
  );
}