"use client";

import Image from "next/image";
import Link from "next/link";
import { useEffect, useState } from "react";

import { Search, ShoppingCart, User } from "lucide-react";

import { supabase } from "@/lib/supabase";

export default function Header() {
  const [profileLink, setProfileLink] =
    useState("/customer/login");

  useEffect(() => {
    const checkUser = async () => {
      const { data } = await supabase.auth.getUser();

      if (data.user) {
        setProfileLink("/customer/profile");
      }
    };

    checkUser();
  }, []);

  const navItems = [
    {
      href: "/",
      label: "Home",
    },
    {
      href: "/menu",
      label: "Categories",
    },
    {
      href: "/track-order",
      label: "Track Order",
    },
    {
      href: profileLink,
      label: "Profile",
    },
  ];

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

        <nav className="hidden items-center gap-1 lg:flex">
          {navItems.map((item) => (
            <Link
              key={item.label}
              href={item.href}
              className="rounded-full px-4 py-2 text-sm font-bold text-slate-700 transition hover:bg-orange-50 hover:text-orange-500"
            >
              {item.label}
            </Link>
          ))}
        </nav>

        {/* RIGHT */}
        <div className="flex items-center gap-3 text-slate-900 sm:gap-4">
          <Link href="/search" className="rounded-full p-2 transition hover:bg-slate-100">
            <Search className="h-7 w-7 sm:h-8 sm:w-8" />
          </Link>

          <Link href="/cart" className="rounded-full p-2 transition hover:bg-slate-100">
            <ShoppingCart className="h-7 w-7 sm:h-8 sm:w-8" />
          </Link>

          <Link
            href={profileLink}
            className="hidden rounded-full p-2 transition hover:bg-slate-100 sm:block lg:hidden"
          >
            <User className="h-7 w-7 sm:h-8 sm:w-8" />
          </Link>
        </div>
      </div>
    </header>
  );
}
