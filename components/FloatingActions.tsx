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
    <div className="fixed bottom-36 right-3 z-40 flex flex-col gap-3 md:bottom-6 md:right-6 md:z-50">
      <a
        href="https://wa.me/8801876882474"
        target="_blank"
        className="flex h-12 w-12 items-center justify-center rounded-full bg-green-500 text-white shadow-xl md:h-14 md:w-14"
      >
        <MessageCircle className="h-6 w-6 md:h-7 md:w-7" />
      </a>

      <button
        onClick={scrollTop}
        className="flex h-11 w-11 items-center justify-center rounded-full bg-slate-900 text-white shadow-lg md:h-12 md:w-12"
      >
        <ArrowUp size={22} />
      </button>
    </div>
  );
}
