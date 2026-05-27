"use client";

import Link from "next/link";

import {
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
              <a
                href="https://facebook.com/"
                target="_blank"
                aria-label="Facebook"
                className="flex h-11 w-11 items-center justify-center rounded-full bg-[#1877F2] text-white shadow-lg shadow-blue-950/20 transition hover:scale-110"
              >
                <svg
                  viewBox="0 0 24 24"
                  aria-hidden="true"
                  className="h-5 w-5 fill-current"
                >
                  <path d="M24 12.073C24 5.405 18.627 0 12 0S0 5.405 0 12.073C0 18.1 4.388 23.094 10.125 24v-8.437H7.078v-3.49h3.047V9.414c0-3.025 1.792-4.697 4.533-4.697 1.313 0 2.686.236 2.686.236v2.97H15.83c-1.491 0-1.955.93-1.955 1.886v2.264h3.328l-.532 3.49h-2.796V24C19.612 23.094 24 18.1 24 12.073Z" />
                </svg>
              </a>

              <a
                href="https://instagram.com/"
                target="_blank"
                aria-label="Instagram"
                className="flex h-11 w-11 items-center justify-center rounded-full bg-[radial-gradient(circle_at_30%_107%,#fdf497_0%,#fdf497_5%,#fd5949_45%,#d6249f_60%,#285AEB_90%)] text-white shadow-lg shadow-pink-950/20 transition hover:scale-110"
              >
                <svg
                  viewBox="0 0 24 24"
                  aria-hidden="true"
                  className="h-5 w-5 fill-current"
                >
                  <path d="M7.8 2h8.4A5.8 5.8 0 0 1 22 7.8v8.4a5.8 5.8 0 0 1-5.8 5.8H7.8A5.8 5.8 0 0 1 2 16.2V7.8A5.8 5.8 0 0 1 7.8 2Zm-.2 2A3.6 3.6 0 0 0 4 7.6v8.8A3.6 3.6 0 0 0 7.6 20h8.8a3.6 3.6 0 0 0 3.6-3.6V7.6A3.6 3.6 0 0 0 16.4 4H7.6Zm9.65 1.5a1.25 1.25 0 1 1 0 2.5 1.25 1.25 0 0 1 0-2.5ZM12 7a5 5 0 1 1 0 10 5 5 0 0 1 0-10Zm0 2a3 3 0 1 0 0 6 3 3 0 0 0 0-6Z" />
                </svg>
              </a>

              <a
                href="https://wa.me/8801577088342"
                target="_blank"
                aria-label="WhatsApp"
                className="flex h-11 w-11 items-center justify-center rounded-full bg-[#25D366] text-white shadow-lg shadow-green-950/20 transition hover:scale-110"
              >
                <svg
                  viewBox="0 0 24 24"
                  aria-hidden="true"
                  className="h-5 w-5 fill-current"
                >
                  <path d="M20.52 3.48A11.86 11.86 0 0 0 12.08 0C5.5 0 .14 5.35.14 11.93c0 2.1.55 4.16 1.6 5.97L.04 24l6.24-1.64a11.91 11.91 0 0 0 5.8 1.48h.01c6.58 0 11.93-5.35 11.93-11.93 0-3.19-1.24-6.18-3.5-8.43ZM12.09 21.82h-.01a9.9 9.9 0 0 1-5.04-1.38l-.36-.21-3.7.97.99-3.61-.24-.37a9.87 9.87 0 0 1-1.51-5.29c0-5.47 4.45-9.91 9.93-9.91a9.87 9.87 0 0 1 7.02 2.91 9.85 9.85 0 0 1 2.9 7.01c0 5.47-4.45 9.9-9.98 9.9Zm5.44-7.42c-.3-.15-1.76-.87-2.03-.97-.27-.1-.47-.15-.67.15-.2.3-.77.97-.95 1.17-.17.2-.35.22-.65.07-.3-.15-1.26-.46-2.4-1.48a8.98 8.98 0 0 1-1.66-2.06c-.17-.3-.02-.46.13-.61.13-.13.3-.35.45-.52.15-.17.2-.3.3-.5.1-.2.05-.37-.02-.52-.08-.15-.67-1.62-.92-2.22-.24-.58-.49-.5-.67-.51h-.57c-.2 0-.52.07-.8.37-.27.3-1.05 1.02-1.05 2.5s1.07 2.9 1.22 3.1c.15.2 2.1 3.2 5.08 4.49.71.31 1.26.49 1.69.63.71.23 1.36.2 1.87.12.57-.08 1.76-.72 2-1.42.25-.7.25-1.3.17-1.42-.07-.13-.27-.2-.57-.35Z" />
                </svg>
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
                className="developer-contact-cta rounded-full bg-green-500 px-5 py-3 text-sm font-bold text-white shadow-lg shadow-green-950/20 transition hover:-translate-y-1 hover:bg-green-600"
              >
                Contact With Developer
              </a>

              <a
                href="https://www.facebook.com/share/1JNbdzkvwr/?mibextid=wwXIfr"
                target="_blank"
                className="developer-facebook-cta rounded-full bg-blue-600 px-5 py-3 text-sm font-bold text-white shadow-lg shadow-blue-950/20 transition hover:-translate-y-1 hover:bg-blue-500"
              >
                Developer Facebook
              </a>

              <a
                href="https://mirzagalib.xyz/"
                target="_blank"
                className="developer-portfolio-cta flex items-center gap-2 overflow-hidden rounded-full bg-orange-500 px-5 py-3 text-sm font-bold text-white shadow-lg shadow-orange-950/20 transition hover:-translate-y-1 hover:bg-orange-600"
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
