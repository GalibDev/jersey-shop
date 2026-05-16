"use client";

import { useEffect } from "react";

import { supabase } from "@/lib/supabase";

export default function VisitorTracker() {
  useEffect(() => {
    const trackVisitor = async () => {
      try {
        await supabase.from("visitors").insert([
          {
            page: window.location.pathname,
            user_agent: navigator.userAgent,
          },
        ]);
      } catch (error) {
        console.log(error);
      }
    };

    trackVisitor();
  }, []);

  return null;
}