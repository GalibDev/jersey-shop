"use client";

import Image from "next/image";
import Link from "next/link";

import { Search, ShoppingCart } from "lucide-react";

export default function Header() {
  return (
    <header className="sticky top-0 z-40 bg-white shadow-sm">
      <div className="flex h-20 items-center justify-between px-4">
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
            className="object-contain"
          />

          {/* BRAND NAME */}
          <h1 className="text-3xl font-extrabold tracking-wide">
            <span className="text-slate-900">
              NOVA
            </span>

            <span className="text-orange-500">
              LO
            </span>
          </h1>
        </Link>

        {/* RIGHT */}
        <div className="flex items-center gap-5 text-slate-900">
          <Link href="/search">
            <Search size={30} />
          </Link>

          <Link href="/cart">
            <ShoppingCart size={30} />
          </Link>
        </div>
      </div>
    </header>
  );
}