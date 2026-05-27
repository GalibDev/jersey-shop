"use client";

import Image from "next/image";
import Link from "next/link";

import { Search, ShoppingCart } from "lucide-react";

export default function Header() {
  return (
    <header className="sticky top-0 z-40 bg-white shadow-sm">
      <div className="mx-auto flex h-16 max-w-7xl items-center justify-between px-4 sm:h-20 sm:px-6 lg:px-8">
        {/* LEFT */}
        <Link
          href="/"
          className="flex items-center gap-2"
        >
          {/* LOGO */}
          <Image
            src="/logo.png"
            alt="NOVALO"
            width={45}
            height={45}
            priority
            className="h-9 w-9 object-contain sm:h-11 sm:w-11"
          />

          {/* BRAND NAME */}
          <h1 className="text-2xl font-extrabold tracking-wide sm:text-3xl">
            <span className="text-slate-900">
              NOVA
            </span>

            <span className="text-orange-500">
              LO
            </span>
          </h1>
        </Link>

        {/* RIGHT */}
        <div className="flex items-center gap-4 text-slate-900 sm:gap-5">
          <Link href="/search" className="rounded-full p-2 transition hover:bg-slate-100">
            <Search className="h-7 w-7 sm:h-8 sm:w-8" />
          </Link>

          <Link href="/cart" className="rounded-full p-2 transition hover:bg-slate-100">
            <ShoppingCart className="h-7 w-7 sm:h-8 sm:w-8" />
          </Link>
        </div>
      </div>
    </header>
  );
}
