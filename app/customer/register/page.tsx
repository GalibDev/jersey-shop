"use client";

import { useState } from "react";
import Link from "next/link";
import { useRouter } from "next/navigation";
import toast from "react-hot-toast";

import { supabase } from "@/lib/supabase";

export default function CustomerRegisterPage() {
  const router = useRouter();

  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  const [loading, setLoading] = useState(false);

  const handleRegister = async (e: React.FormEvent) => {
    e.preventDefault();

    setLoading(true);

    const { data, error } = await supabase.auth.signUp({
      email,
      password,
      options: {
        data: {
          name,
        },
      },
    });

    if (error || !data.user) {
      setLoading(false);
      toast.error(error?.message || "Register failed");
      return;
    }

    const { error: profileError } = await supabase
      .from("profiles")
      .upsert([
        {
          id: data.user.id,
          email,
          role: "user",
        },
      ]);

    setLoading(false);

    if (profileError) {
      toast.error("Profile create failed");
      return;
    }

    toast.success("Account created successfully");

    router.push("/customer/login");
  };

  return (
    <main className="flex min-h-screen items-center justify-center bg-gray-100 p-4">
      <form
        onSubmit={handleRegister}
        className="w-full max-w-md rounded-3xl bg-white p-6 shadow-lg"
      >
        <h1 className="mb-6 text-center text-3xl font-extrabold text-slate-900">
          Create Account
        </h1>

        <input
          type="text"
          placeholder="Full Name"
          required
          value={name}
          onChange={(e) => setName(e.target.value)}
          className="mb-4 h-14 w-full rounded-2xl border px-4 outline-none"
        />

        <input
          type="email"
          placeholder="Email"
          required
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          className="mb-4 h-14 w-full rounded-2xl border px-4 outline-none"
        />

        <input
          type="password"
          placeholder="Password"
          required
          minLength={6}
          value={password}
          onChange={(e) => setPassword(e.target.value)}
          className="mb-5 h-14 w-full rounded-2xl border px-4 outline-none"
        />

        <button
          disabled={loading}
          className="w-full rounded-2xl bg-orange-500 py-4 font-bold text-white disabled:opacity-60"
        >
          {loading ? "Creating..." : "Create Account"}
        </button>

        <p className="mt-5 text-center text-sm text-slate-500">
          Already have an account?{" "}
          <Link
            href="/customer/login"
            className="font-bold text-orange-500"
          >
            Login
          </Link>
        </p>
      </form>
    </main>
  );
}