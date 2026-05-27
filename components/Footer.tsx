"use client";

import Link from "next/link";

import {
  MessageCircle,
  Mail,
  Phone,
  MapPin,
  Globe,
} from "lucide-react";

export default function Footer() {
  return (
    <footer className="mt-16 bg-slate-950 pb-24 text-white md:pb-0">
      <div className="mx-auto max-w-7xl px-5 py-12 md:py-14">
        <div className="grid gap-10 md:grid-cols-4">
          {/* LOGO + ABOUT */}
          <div>
            <Link href="/" className="inline-block">
              <h1 className="text-4xl font-extrabold tracking-wide">
                <span className="text-white">NOVA</span>
                <span className="text-orange-500">LO</span>
              </h1>
            </Link>

            <p className="mt-5 text-sm leading-7 text-gray-400">
              Premium football jerseys, fan edition kits,
              player edition kits and exclusive football
              collections at the best price in Bangladesh.
            </p>

            <div className="mt-6 flex items-center gap-4">
              {/* FACEBOOK */}
              <a
                href="https://facebook.com/"
                target="_blank"
                className="flex h-11 w-11 items-center justify-center rounded-full border border-white/10 bg-white/5 text-sm font-extrabold transition hover:scale-110 hover:bg-blue-600"
              >
                f
              </a>

              {/* INSTAGRAM */}
              <a
                href="https://instagram.com/"
                target="_blank"
                className="flex h-11 w-11 items-center justify-center rounded-full border border-white/10 bg-white/5 text-sm font-extrabold transition hover:scale-110 hover:bg-pink-500"
              >
                ig
              </a>

              {/* WHATSAPP */}
              <a
                href="https://wa.me/8801577088342"
                target="_blank"
                className="flex h-11 w-11 items-center justify-center rounded-full border border-white/10 bg-white/5 transition hover:scale-110 hover:bg-green-500"
              >
                <MessageCircle size={20} />
              </a>
            </div>
          </div>

          {/* QUICK LINKS */}
          <div>
            <h2 className="mb-5 text-xl font-extrabold">
              Quick Links
            </h2>

            <div className="space-y-4">
              <Link
                href="/"
                className="block text-gray-400 transition hover:text-orange-500"
              >
                Home
              </Link>

              <Link
                href="/cart"
                className="block text-gray-400 transition hover:text-orange-500"
              >
                Cart
              </Link>

              <Link
                href="/review"
                className="block text-gray-400 transition hover:text-orange-500"
              >
                Give Review
              </Link>

              <Link
                href="/customer/login"
                className="block text-gray-400 transition hover:text-orange-500"
              >
                Customer Login
              </Link>

              <Link
                href="/admin/login"
                className="block text-gray-400 transition hover:text-orange-500"
              >
                Admin Login
              </Link>
            </div>
          </div>

          {/* CATEGORIES */}
          <div>
            <h2 className="mb-5 text-xl font-extrabold">
              Categories
            </h2>

            <div className="space-y-4 text-gray-400">
              <p>Player Edition</p>

              <p>Fan Edition</p>

              <p>World Cup 2026</p>

              <p>Retro Jerseys</p>
            </div>
          </div>

          {/* CONTACT */}
          <div>
            <h2 className="mb-5 text-xl font-extrabold">
              Contact Us
            </h2>

            <div className="space-y-5">
              <div className="flex items-start gap-3">
                <Phone
                  size={20}
                  className="mt-1 text-orange-500"
                />

                <a
                  href="tel:+8801577088342"
                  className="font-semibold hover:text-orange-500"
                >
                  +8801577088342
                </a>
              </div>

              <div className="flex items-start gap-3">
                <Mail
                  size={20}
                  className="mt-1 text-orange-500"
                />

                <a
                  href="mailto:novalo@gmail.com"
                  className="font-semibold hover:text-orange-500"
                >
                  novalo@gmail.com
                </a>
              </div>

              <div className="flex items-start gap-3">
                <MapPin
                  size={20}
                  className="mt-1 text-orange-500"
                />

                <p className="font-semibold">
                  Dhaka, Bangladesh
                </p>
              </div>
            </div>
          </div>
        </div>

        {/* BOTTOM */}
        <div className="mt-14 border-t border-white/10 pt-6">
          <div className="flex flex-col items-center gap-5">
            {/* DEVELOPER NAME */}
            <p className="text-center text-sm font-bold tracking-[4px] text-orange-500">
              DEVELOPED BY MIRZA GALIB
            </p>

            {/* BUTTONS */}
            <div className="flex flex-wrap items-center justify-center gap-3">
              <a
                href="https://wa.me/8801577088342"
                target="_blank"
                className="rounded-full bg-green-500 px-5 py-3 text-sm font-bold text-white transition hover:scale-105"
              >
                Contact With Developer
              </a>

              <a
                href="https://www.facebook.com/share/1JNbdzkvwr/?mibextid=wwXIfr"
                target="_blank"
                className="rounded-full bg-blue-600 px-5 py-3 text-sm font-bold text-white transition hover:scale-105"
              >
                Developer Facebook
              </a>

              <a
                href="https://your-portfolio-link.com"
                target="_blank"
                className="flex items-center gap-2 rounded-full bg-orange-500 px-5 py-3 text-sm font-bold text-white transition hover:scale-105"
              >
                <Globe size={17} />
                Portfolio
              </a>
            </div>

            {/* COPYRIGHT */}
            <p className="text-xs text-gray-500">
              © {new Date().getFullYear()} NOVALO.
              All rights reserved.
            </p>
          </div>
        </div>
      </div>
    </footer>
  );
}
