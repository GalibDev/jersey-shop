"use client";

import Link from "next/link";

import { usePathname } from "next/navigation";

import {
  Home,
  ShoppingCart,
  Menu,
  User,
} from "lucide-react";

import { useEffect, useState } from "react";

import { supabase } from "@/lib/supabase";

export default function BottomNav() {
  const pathname = usePathname();

  const [profileLink, setProfileLink] =
    useState("/customer/login");

  useEffect(() => {
    const checkUser = async () => {
      const { data } =
        await supabase.auth.getUser();

      if (data.user) {
        setProfileLink(
          "/customer/profile"
        );
      }
    };

    checkUser();
  }, []);

  const navItems = [
    {
      href: "/",
      icon: Home,
      label: "Home",
    },

    {
      href: "/cart",
      icon: ShoppingCart,
      label: "Cart",
    },

    {
      href: "/menu",
      icon: Menu,
      label: "Menu",
    },

    {
      href: profileLink,
      icon: User,
      label: "Profile",
    },
  ];

  return (
    <div className="fixed bottom-0 left-0 right-0 z-50 border-t bg-white">
      <div className="mx-auto flex max-w-md items-center justify-around py-3">
        {navItems.map((item) => {
          const Icon = item.icon;

          const active =
            pathname === item.href;

          return (
            <Link
              key={item.label}
              href={item.href}
              className={`flex flex-col items-center gap-1 ${
                active
                  ? "text-orange-500"
                  : "text-slate-500"
              }`}
            >
              <Icon size={24} />

              <span className="text-xs font-bold">
                {item.label}
              </span>
            </Link>
          );
        })}
      </div>
    </div>
  );
}