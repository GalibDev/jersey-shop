"use client";

import { useEffect, useState } from "react";
import { useRouter } from "next/navigation";
import toast from "react-hot-toast";
import { LogOut, Mail, ShieldCheck } from "lucide-react";

import { supabase } from "@/lib/supabase";
import BottomNav from "@/components/BottomNav";

type UserProfile = {
  email: string;
  role: string;
};

export default function CustomerProfilePage() {
  const router = useRouter();

  const [profile, setProfile] = useState<UserProfile | null>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const getProfile = async () => {
      const { data: userData } = await supabase.auth.getUser();

      const user = userData.user;

      if (!user) {
        router.replace("/customer/login");
        return;
      }

      const { data } = await supabase
        .from("profiles")
        .select("*")
        .eq("id", user.id)
        .single();

      setProfile(data);
      setLoading(false);
    };

    getProfile();
  }, [router]);

  const handleLogout = async () => {
    await supabase.auth.signOut();

    toast.success("Logged out");
    router.replace("/");
  };

  if (loading) {
    return (
      <main className="flex min-h-screen items-center justify-center bg-gray-100">
        <p className="font-bold text-slate-500">Loading profile...</p>
      </main>
    );
  }

  return (
    <main className="min-h-screen bg-gray-100 p-4 pb-32">
      <div className="rounded-3xl bg-white p-6 shadow-sm">
        <div className="flex flex-col items-center">
          <div className="flex h-24 w-24 items-center justify-center rounded-full bg-orange-100 text-4xl font-extrabold text-orange-500">
            {profile?.email?.charAt(0).toUpperCase()}
          </div>

          <h1 className="mt-4 text-2xl font-extrabold text-slate-900">
            Customer Profile
          </h1>

          <div className="mt-6 w-full space-y-4">
            <div className="flex items-center gap-3 rounded-2xl bg-gray-100 p-4">
              <Mail size={22} className="text-orange-500" />

              <div>
                <p className="text-xs text-slate-500">Email</p>
                <p className="font-bold text-slate-900">{profile?.email}</p>
              </div>
            </div>

            <div className="flex items-center gap-3 rounded-2xl bg-gray-100 p-4">
              <ShieldCheck size={22} className="text-green-500" />

              <div>
                <p className="text-xs text-slate-500">Role</p>
                <p className="font-bold capitalize text-slate-900">
                  {profile?.role}
                </p>
              </div>
            </div>
          </div>

          <button
            onClick={handleLogout}
            className="mt-8 flex h-14 w-full items-center justify-center gap-3 rounded-2xl bg-red-500 font-bold text-white"
          >
            <LogOut size={20} />
            Logout
          </button>
        </div>
      </div>

      <BottomNav />
    </main>
  );
}