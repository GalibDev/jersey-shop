"use client";

import { useEffect, useState } from "react";
import Link from "next/link";
import { ArrowLeft, Flame } from "lucide-react";
import toast from "react-hot-toast";

import AdminGuard from "@/components/AdminGuard";
import { supabase } from "@/lib/supabase";
import {
  OfferSettings,
  defaultOfferSettings,
  normalizeOfferSettings,
} from "@/lib/offerSettings";

export default function AdminOffersPage() {
  const [settings, setSettings] =
    useState<OfferSettings>(defaultOfferSettings);
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    const getSettings = async () => {
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

    getSettings();
  }, []);

  const updateField = (
    field: keyof OfferSettings,
    value: string | boolean
  ) => {
    setSettings((prev) => ({
      ...prev,
      [field]: value,
    }));
  };

  const handleSave = async (event: React.FormEvent) => {
    event.preventDefault();
    setLoading(true);

    const { error } = await supabase.from("site_settings").upsert(
      {
        key: "limited_offer",
        value: settings,
      },
      { onConflict: "key" }
    );

    setLoading(false);

    if (error) {
      toast.error(error.message);
      return;
    }

    toast.success("Limited offer updated");
  };

  return (
    <AdminGuard>
      <main className="min-h-screen bg-gray-100 p-4">
        <Link
          href="/admin"
          className="mb-5 flex h-11 w-11 items-center justify-center rounded-full bg-white shadow"
        >
          <ArrowLeft size={24} />
        </Link>

        <h1 className="mb-6 text-4xl font-extrabold text-slate-900">
          Limited Offer
        </h1>

        <form
          onSubmit={handleSave}
          className="space-y-4 rounded-3xl bg-white p-4 shadow-sm"
        >
          <label className="flex items-center justify-between rounded-2xl border p-4">
            <span className="font-bold text-slate-800">Show offer banner</span>
            <input
              type="checkbox"
              checked={settings.isActive}
              onChange={(e) => updateField("isActive", e.target.checked)}
              className="h-5 w-5 accent-orange-500"
            />
          </label>

          <input
            className="h-14 w-full rounded-2xl border px-4 font-semibold outline-none"
            placeholder="Label e.g. LIMITED OFFER"
            value={settings.label}
            onChange={(e) => updateField("label", e.target.value)}
          />

          <input
            className="h-14 w-full rounded-2xl border px-4 font-semibold outline-none"
            placeholder="Title e.g. Up To 40% OFF"
            value={settings.title}
            onChange={(e) => updateField("title", e.target.value)}
          />

          <input
            className="h-14 w-full rounded-2xl border px-4 font-semibold outline-none"
            placeholder="Subtitle e.g. Premium Football Jerseys"
            value={settings.subtitle}
            onChange={(e) => updateField("subtitle", e.target.value)}
          />

          <div className="flex items-center justify-between rounded-2xl bg-gradient-to-r from-orange-500 to-red-500 px-5 py-4 text-white shadow-lg">
            <div>
              <p className="text-xs font-bold uppercase tracking-[3px]">
                {settings.label}
              </p>
              <h2 className="mt-1 text-2xl font-extrabold">
                {settings.title}
              </h2>
              <p className="mt-1 text-sm text-white/85">
                {settings.subtitle}
              </p>
            </div>

            <div className="flex h-14 w-14 shrink-0 items-center justify-center rounded-full bg-white/20">
              <Flame className="h-8 w-8" />
            </div>
          </div>

          <button
            disabled={loading}
            className="w-full rounded-2xl bg-orange-500 py-4 font-bold text-white disabled:opacity-60"
          >
            {loading ? "Saving..." : "Save Offer"}
          </button>
        </form>
      </main>
    </AdminGuard>
  );
}
