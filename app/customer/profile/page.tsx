"use client";

import { ChangeEvent, useEffect, useState } from "react";
import Image from "next/image";
import { useRouter } from "next/navigation";
import toast from "react-hot-toast";
import {
  Camera,
  LogOut,
  Mail,
  ShieldCheck,
  Upload,
} from "lucide-react";

import { supabase } from "@/lib/supabase";
import BottomNav from "@/components/BottomNav";

type UserProfile = {
  email: string;
  role: string;
  avatar_url?: string | null;
};

export default function CustomerProfilePage() {
  const router = useRouter();

  const [profile, setProfile] = useState<UserProfile | null>(null);
  const [userId, setUserId] = useState("");
  const [avatarUrl, setAvatarUrl] = useState<string | null>(null);
  const [loading, setLoading] = useState(true);
  const [uploading, setUploading] = useState(false);

  useEffect(() => {
    const getProfile = async () => {
      const { data: userData } = await supabase.auth.getUser();

      const user = userData.user;

      if (!user) {
        router.replace("/customer/login");
        return;
      }

      setUserId(user.id);

      const { data } = await supabase
        .from("profiles")
        .select("*")
        .eq("id", user.id)
        .single();

      setProfile(data);
      setAvatarUrl(
        data?.avatar_url ||
          (user.user_metadata?.avatar_url as string) ||
          null
      );
      setLoading(false);
    };

    getProfile();
  }, [router]);

  const handleAvatarUpload = async (
    event: ChangeEvent<HTMLInputElement>
  ) => {
    const file = event.target.files?.[0];

    if (!file || !userId) return;

    if (!file.type.startsWith("image/")) {
      toast.error("Please upload an image file");
      return;
    }

    if (file.size > 2 * 1024 * 1024) {
      toast.error("Image must be under 2MB");
      return;
    }

    setUploading(true);

    const extension = file.name.split(".").pop() || "jpg";
    const fileName = `profiles/${userId}-${Date.now()}.${extension}`;

    const { error: uploadError } = await supabase.storage
      .from("products")
      .upload(fileName, file, {
        upsert: true,
        cacheControl: "3600",
      });

    if (uploadError) {
      setUploading(false);
      toast.error(uploadError.message || "Photo upload failed");
      return;
    }

    const {
      data: { publicUrl },
    } = supabase.storage.from("products").getPublicUrl(fileName);

    const { error: authError } = await supabase.auth.updateUser({
      data: {
        avatar_url: publicUrl,
      },
    });

    const { error: profileError } = await supabase
      .from("profiles")
      .update({
        avatar_url: publicUrl,
      })
      .eq("id", userId);

    setUploading(false);

    if (authError) {
      toast.error(authError.message || "Profile update failed");
      return;
    }

    if (profileError) {
      toast.success("Photo uploaded");
    } else {
      toast.success("Profile photo updated");
    }

    setAvatarUrl(publicUrl);
    setProfile((current) =>
      current
        ? {
            ...current,
            avatar_url: publicUrl,
          }
        : current
    );
  };

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
      <div className="mx-auto max-w-xl rounded-3xl bg-white p-6 shadow-sm">
        <div className="flex flex-col items-center">
          <div className="relative">
            <div className="flex h-28 w-28 items-center justify-center overflow-hidden rounded-full bg-orange-100 text-4xl font-extrabold text-orange-500 ring-4 ring-orange-50">
              {avatarUrl ? (
                <Image
                  src={avatarUrl}
                  alt="Profile photo"
                  width={112}
                  height={112}
                  className="h-full w-full object-cover"
                />
              ) : (
                profile?.email?.charAt(0).toUpperCase()
              )}
            </div>

            <label className="absolute bottom-0 right-0 flex h-10 w-10 cursor-pointer items-center justify-center rounded-full bg-orange-500 text-white shadow-lg transition hover:bg-orange-600">
              <Camera size={18} />
              <input
                type="file"
                accept="image/*"
                onChange={handleAvatarUpload}
                className="hidden"
              />
            </label>
          </div>

          <h1 className="mt-4 text-2xl font-extrabold text-slate-900">
            Customer Profile
          </h1>

          <p className="mt-1 text-sm font-semibold text-slate-500">
            Upload your profile photo and manage account info.
          </p>

          <label className="mt-5 flex h-12 cursor-pointer items-center justify-center gap-2 rounded-2xl border border-orange-200 bg-orange-50 px-5 text-sm font-extrabold text-orange-500 transition hover:bg-orange-100">
            <Upload size={18} />
            {uploading ? "Uploading..." : "Upload Photo"}
            <input
              type="file"
              accept="image/*"
              disabled={uploading}
              onChange={handleAvatarUpload}
              className="hidden"
            />
          </label>

          <div className="mt-6 w-full space-y-4">
            <div className="flex items-center gap-3 rounded-2xl bg-gray-100 p-4">
              <Mail size={22} className="text-orange-500" />

              <div className="min-w-0">
                <p className="text-xs text-slate-500">Email</p>
                <p className="truncate font-bold text-slate-900">
                  {profile?.email}
                </p>
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
            type="button"
            onClick={handleLogout}
            className="mt-8 flex h-14 w-full items-center justify-center gap-3 rounded-2xl bg-red-500 font-bold text-white transition hover:bg-red-600"
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
