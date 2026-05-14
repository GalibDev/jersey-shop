import Link from "next/link";

import { ArrowLeft } from "lucide-react";

import BottomNav from "@/components/BottomNav";

const menuItems = [
  {
    title: "Brazil Jersey",
    link: "/",
  },

  {
    title: "Argentina Jersey",
    link: "/",
  },

  {
    title: "Track Order",
    link: "/track-order",
  },

  {
    title: "Wishlist",
    link: "/wishlist",
  },

  {
    title: "Profile",
    link: "/profile",
  },

{
  title: "Admin Login",
  link: "/admin/login",
},



];

export default function MenuPage() {
  return (
    <main className="min-h-screen bg-gray-100 p-4 pb-32">
      <Link
        href="/"
        className="mb-5 flex h-11 w-11 items-center justify-center rounded-full bg-white shadow"
      >
        <ArrowLeft size={24} />
      </Link>

      <h1 className="mb-6 text-3xl font-extrabold text-slate-900">
        Menu
      </h1>

      <div className="space-y-3">
        {menuItems.map((item) => (
          <Link
            href={item.link}
            key={item.title}
          >
            <button className="w-full rounded-2xl bg-white p-5 text-left font-bold text-slate-800 shadow-sm transition hover:bg-orange-50">
              {item.title}
            </button>
          </Link>
        ))}
      </div>

      <BottomNav />
    </main>
  );
}