"use client";

import { MessageCircle, ArrowUp } from "lucide-react";

export default function FloatingActions() {
  const scrollTop = () => {
    window.scrollTo({
      top: 0,
      behavior: "smooth",
    });
  };

  return (
    <div className="fixed bottom-28 right-4 z-50 flex flex-col gap-3">
      <a
        href="https://wa.me/8801XXXXXXXXX"
        target="_blank"
        className="flex h-14 w-14 items-center justify-center rounded-full bg-green-500 text-white shadow-xl"
      >
        <MessageCircle size={28} />
      </a>

      <button
        onClick={scrollTop}
        className="flex h-12 w-12 items-center justify-center rounded-full bg-slate-900 text-white shadow-lg"
      >
        <ArrowUp size={22} />
      </button>
    </div>
  );
}