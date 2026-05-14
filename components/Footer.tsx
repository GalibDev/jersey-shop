import Link from "next/link";

export default function Footer() {
  return (
    <footer className="mt-10 bg-slate-900 px-4 pb-32 pt-10 text-white">
      <div className="text-center">
        <h2 className="text-3xl font-extrabold">
          Jersey Shop
        </h2>

        <p className="mt-3 text-sm leading-7 text-slate-300">
          Premium football jersey collection in Bangladesh.
        </p>
      </div>

      <div className="mt-8 grid grid-cols-2 gap-4">
        <Link href="/">
          <div className="rounded-2xl bg-slate-800 p-4 text-center font-bold transition hover:bg-slate-700">
            Home
          </div>
        </Link>

        <Link href="/track-order">
          <div className="rounded-2xl bg-slate-800 p-4 text-center font-bold transition hover:bg-slate-700">
            Track Order
          </div>
        </Link>

        <Link href="/wishlist">
          <div className="rounded-2xl bg-slate-800 p-4 text-center font-bold transition hover:bg-slate-700">
            Wishlist
          </div>
        </Link>

        <Link href="/customer/profile">
          <div className="rounded-2xl bg-slate-800 p-4 text-center font-bold transition hover:bg-slate-700">
            Profile
          </div>
        </Link>

        <Link href="/customer/login">
          <div className="rounded-2xl bg-slate-800 p-4 text-center font-bold transition hover:bg-slate-700">
            Customer Login
          </div>
        </Link>

        <Link href="/admin/login">
          <div className="rounded-2xl bg-orange-500 p-4 text-center font-bold transition hover:bg-orange-600">
            Admin Login
          </div>
        </Link>
      </div>

      <div className="mt-8 border-t border-slate-700 pt-5 text-center">
        <p className="text-sm text-slate-400">
          © 2026 Jersey Shop. All rights reserved.
        </p>
      </div>
    </footer>
  );
}