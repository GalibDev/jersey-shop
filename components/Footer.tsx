"use client";

import Link from "next/link";
import {
  MessageCircle,
  Mail,
  Phone,
  MapPin,
} from "lucide-react";

export default function Footer() {
  return (
    <footer className="mt-10 bg-slate-950 text-white">
      <div className="mx-auto max-w-7xl px-5 py-10">
        <div className="grid gap-10 md:grid-cols-4">
          <div>
            <h2 className="text-3xl font-extrabold text-orange-500">
              NOVALO
            </h2>

            <p className="mt-4 text-sm leading-7 text-slate-300">
              Premium football jerseys, polo shirts, combo offers and
              sports fashion collections with top quality fabric and
              modern designs.
            </p>

            <div className="mt-5 flex gap-3">
              <a
                href="https://www.facebook.com/share/1GwtYpupEE/"
                target="_blank"
                className="flex h-11 w-11 items-center justify-center rounded-full bg-slate-800 text-sm font-extrabold transition hover:bg-blue-600"
              >
                f
              </a>

              <a
                href="https://instagram.com/"
                target="_blank"
                className="flex h-11 w-11 items-center justify-center rounded-full bg-slate-800 text-sm font-extrabold transition hover:bg-pink-500"
              >
                ig
              </a>

              <a
                href="https://wa.me/8801843313291"
                target="_blank"
                className="flex h-11 w-11 items-center justify-center rounded-full bg-slate-800 transition hover:bg-green-500"
              >
                <MessageCircle size={20} />
              </a>
            </div>
          </div>

          <div>
            <h3 className="text-xl font-bold">Quick Links</h3>

            <div className="mt-5 flex flex-col gap-3 text-slate-300">
              <Link href="/" className="hover:text-orange-500">
                Home
              </Link>

              <Link href="/cart" className="hover:text-orange-500">
                Cart
              </Link>

              <Link
                href="/customer/profile"
                className="hover:text-orange-500"
              >
                Profile
              </Link>

              <Link
                href="/customer/login"
                className="hover:text-orange-500"
              >
                Customer Login
              </Link>

              <Link
                href="/admin/login"
                className="hover:text-orange-500"
              >
                Admin Login
              </Link>
              <Link href="/review" className="hover:text-orange-500">
  Give Review
</Link>
            </div>
          </div>

          <div>
            <h3 className="text-xl font-bold">About Us</h3>

            <div className="mt-5 space-y-4 text-slate-300">
              <p className="leading-7">
                We provide premium quality football jerseys and fashion
                collections all over Bangladesh.
              </p>

              <p className="leading-7">
                Fast delivery, trusted quality and stylish collections
                are our priority.
              </p>
            </div>
          </div>

          <div>
            <h3 className="text-xl font-bold">Contact</h3>

            <div className="mt-5 space-y-4 text-slate-300">
              <div className="flex items-start gap-3">
                <Phone size={18} className="mt-1 text-orange-500" />
                <span>01843313291</span>
              </div>

              <div className="flex items-start gap-3">
                <Mail size={18} className="mt-1 text-orange-500" />
                <span>support@apoonpoint.com</span>
              </div>

              <div className="flex items-start gap-3">
                <MapPin size={18} className="mt-1 text-orange-500" />
                <span>Mohammadpur, Dhaka, Bangladesh</span>
              </div>
            </div>
          </div>
        </div>

        <div className="mt-10 border-t border-slate-800 pt-5 text-center text-sm text-slate-400">
          © {new Date().getFullYear()} APOONPOINT. All rights reserved.
        </div>
      </div>
    </footer>
  );
}