import Link from "next/link";
import { ArrowLeft, User, Phone, MapPin } from "lucide-react";
import BottomNav from "@/components/BottomNav";

export default function ProfilePage() {
  return (
    <main className="min-h-screen bg-gray-100 p-4 pb-32">
      <Link
        href="/"
        className="mb-5 flex h-11 w-11 items-center justify-center rounded-full bg-white shadow"
      >
        <ArrowLeft size={24} />
      </Link>

      <div className="rounded-3xl bg-white p-6 text-center shadow-sm">
        <div className="mx-auto flex h-24 w-24 items-center justify-center rounded-full bg-orange-100 text-orange-500">
          <User size={46} />
        </div>

        <h1 className="mt-4 text-2xl font-extrabold text-slate-900">
          My Profile
        </h1>

        <p className="mt-1 text-sm text-slate-500">
          Login kore order details save korte parba
        </p>
      </div>
       <Link href="/wishlist">
  <button className="mt-6 w-full rounded-2xl bg-red-500 py-4 font-bold text-white">
    My Wishlist ❤️
  </button>
</Link>
      <form className="mt-6 space-y-4">
        <div className="flex items-center gap-3 rounded-2xl bg-white px-4 py-4 shadow-sm">
          <User size={22} className="text-orange-500" />
          <input
            type="text"
            placeholder="Your Name"
            className="w-full bg-transparent outline-none"
          />
        </div>

        <div className="flex items-center gap-3 rounded-2xl bg-white px-4 py-4 shadow-sm">
          <Phone size={22} className="text-orange-500" />
          <input
            type="tel"
            placeholder="Phone Number"
            className="w-full bg-transparent outline-none"
          />
        </div>

        <div className="flex items-center gap-3 rounded-2xl bg-white px-4 py-4 shadow-sm">
          <MapPin size={22} className="text-orange-500" />
          <input
            type="text"
            placeholder="Address"
            className="w-full bg-transparent outline-none"
          />
        </div>

        <button className="w-full rounded-2xl bg-orange-500 py-4 font-bold text-white">
          Save Profile
        </button>
      </form>

      <BottomNav />
    </main>
  );
}