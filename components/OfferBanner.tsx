"use client";

import { useEffect, useState } from "react";
import { Flame } from "lucide-react";

import { supabase } from "@/lib/supabase";
import {
  OfferSettings,
  defaultOfferSettings,
  normalizeOfferSettings,
} from "@/lib/offerSettings";

export default function OfferBanner() {
  const [settings, setSettings] =
    useState<OfferSettings>(defaultOfferSettings);

  useEffect(() => {
    const getOfferSettings = async () => {
      const { data, error } = await supabase
        .from("site_settings")
        .select("value")
        .eq("key", "limited_offer")
        .single();

      if (error) {
        return;
      }

      setSettings(normalizeOfferSettings(data?.value));
    };

    getOfferSettings();
  }, []);

  if (!settings.isActive) {
    return null;
  }

  return (
    <section className="mx-auto max-w-7xl px-4 pt-4 sm:px-6 lg:px-8">
      <div className="flex items-center justify-between rounded-2xl bg-gradient-to-r from-orange-500 to-red-500 px-5 py-4 text-white shadow-lg sm:px-8 sm:py-6">
        <div>
          <p className="text-xs font-bold uppercase tracking-[3px] sm:text-sm">
            {settings.label}
          </p>

          <h2 className="mt-1 text-xl font-extrabold sm:text-3xl">
            {settings.title}
          </h2>

          <p className="mt-1 text-sm text-white/85 sm:text-base">
            {settings.subtitle}
          </p>
        </div>

        <div className="flex h-14 w-14 shrink-0 items-center justify-center rounded-full bg-white/20 sm:h-16 sm:w-16">
          <Flame className="h-8 w-8 sm:h-9 sm:w-9" />
        </div>
      </div>
    </section>
  );
}
