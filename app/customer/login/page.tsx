"use client";

import { useState } from "react";

import Link from "next/link";

import { useRouter } from "next/navigation";

import toast from "react-hot-toast";

import { supabase } from "@/lib/supabase";

export default function CustomerLoginPage() {
  const router = useRouter();

  const [email, setEmail] = useState("");

  const [password, setPassword] =
    useState("");

  const [loading, setLoading] =
    useState(false);

  const handleLogin = async (
    e: React.FormEvent
  ) => {
    e.preventDefault();

    setLoading(true);

    const { data, error } =
      await supabase.auth.signInWithPassword(
        {
          email,
          password,
        }
      );

    if (error || !data.user) {
      setLoading(false);

      toast.error("Invalid login");

      return;
    }

    const { data: profile } =
      await supabase
        .from("profiles")
        .select("role")
        .eq("id", data.user.id)
        .single();

    setLoading(false);

    if (profile?.role === "admin") {
      router.push("/admin");

      toast.success("Admin login success");

      return;
    }

    toast.success("Login success");

    router.push("/customer/profile");
  };

  return (
    <main className="flex min-h-screen items-center justify-center bg-gray-100 p-4">
      <form
        onSubmit={handleLogin}
        className="w-full max-w-md rounded-3xl bg-white p-6 shadow-lg"
      >
        <h1 className="mb-6 text-center text-3xl font-extrabold text-slate-900">
          Customer Login
        </h1>

        <input
          type="email"
          placeholder="Email"
          required
          value={email}
          onChange={(e) =>
            setEmail(e.target.value)
          }
          className="mb-4 h-14 w-full rounded-2xl border px-4 outline-none"
        />

        <input
          type="password"
          placeholder="Password"
          required
          value={password}
          onChange={(e) =>
            setPassword(e.target.value)
          }
          className="mb-5 h-14 w-full rounded-2xl border px-4 outline-none"
        />

        <button
          disabled={loading}
          className="w-full rounded-2xl bg-orange-500 py-4 font-bold text-white disabled:opacity-60"
        >
          {loading
            ? "Logging in..."
            : "Login"}
        </button>

        <p className="mt-5 text-center text-sm text-slate-500">
          Don't have an account?{" "}
          <Link
            href="/customer/register"
            className="font-bold text-orange-500"
          >
            Register
          </Link>
        </p>
      </form>
    </main>
  );
}