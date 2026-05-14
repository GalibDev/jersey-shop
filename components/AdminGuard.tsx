"use client";

import { useEffect, useState } from "react";

import { useRouter } from "next/navigation";

import { supabase } from "@/lib/supabase";

export default function AdminGuard({
  children,
}: {
  children: React.ReactNode;
}) {
  const router = useRouter();

  const [allowed, setAllowed] = useState(false);

  useEffect(() => {
    const checkAdmin = async () => {
      const { data: userData } =
        await supabase.auth.getUser();

      const user = userData.user;

      if (!user) {
        router.replace("/admin/login");
        return;
      }

      const { data: profile } =
        await supabase
          .from("profiles")
          .select("role")
          .eq("id", user.id)
          .single();

      if (profile?.role !== "admin") {
        router.replace("/");
        return;
      }

      setAllowed(true);
    };

    checkAdmin();
  }, [router]);

  if (!allowed) {
    return (
      <main className="flex min-h-screen items-center justify-center bg-gray-100">
        <p className="font-bold text-slate-500">
          Checking admin access...
        </p>
      </main>
    );
  }

  return <>{children}</>;
}