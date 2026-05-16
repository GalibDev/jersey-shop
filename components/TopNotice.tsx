"use client";

import { useEffect, useState } from "react";
import { supabase } from "@/lib/supabase";

type Notice = {
  id: number;
  text: string;
  is_active: boolean;
};

export default function TopNotice() {
  const [notice, setNotice] = useState<Notice | null>(null);

  useEffect(() => {
    const getNotice = async () => {
      const { data } = await supabase
        .from("notices")
        .select("*")
        .eq("is_active", true)
        .order("id", { ascending: false })
        .limit(1)
        .single();

      setNotice(data);
    };

    getNotice();
  }, []);

  if (!notice) return null;

  return (
    <div className="bg-slate-900 py-2 text-white">
      <div className="overflow-hidden whitespace-nowrap">
        <div className="animate-[marquee_15s_linear_infinite] text-sm font-bold">
          {notice.text}
        </div>
      </div>
    </div>
  );
}