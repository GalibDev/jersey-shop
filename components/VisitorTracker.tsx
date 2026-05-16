"use client";

import { useEffect } from "react";
import { supabase } from "@/lib/supabase";

export default function VisitorTracker() {
  useEffect(() => {
    const trackVisit = async () => {
      const alreadyTracked = sessionStorage.getItem("visitor-tracked");

      if (alreadyTracked) return;

      await supabase.from("visitors").insert([
        {
          page: window.location.pathname,
          user_agent: navigator.userAgent,
        },
      ]);

      sessionStorage.setItem("visitor-tracked", "true");
    };

    trackVisit();
  }, []);

  return null;
}