"use client";

export default function SplashScreen() {
  return (
    <div className="fixed inset-0 z-[999] flex flex-col items-center justify-center bg-slate-950 text-white">
      <div className="h-20 w-20 animate-spin rounded-full border-4 border-orange-500 border-t-transparent" />

      <h1 className="mt-6 text-3xl font-extrabold">
        Jersey Shop
      </h1>

      <p className="mt-2 text-sm text-slate-400">
        Loading premium jerseys...
      </p>
    </div>
  );
}