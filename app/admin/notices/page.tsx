"use client";

import { useEffect, useState } from "react";
import Link from "next/link";
import { ArrowLeft, Trash2 } from "lucide-react";
import toast from "react-hot-toast";

import { supabase } from "@/lib/supabase";
import AdminGuard from "@/components/AdminGuard";

type Notice = {
  id: number;
  text: string;
  is_active: boolean;
};

export default function AdminNoticesPage() {
  const [notices, setNotices] = useState<Notice[]>([]);
  const [text, setText] = useState("");
  const [loading, setLoading] = useState(false);

  const getNotices = async () => {
    const { data, error } = await supabase
      .from("notices")
      .select("*")
      .order("id", { ascending: false });

    if (error) {
      toast.error("Notice load failed");
      return;
    }

    setNotices(data || []);
  };

  const addNotice = async (e: React.FormEvent) => {
    e.preventDefault();

    if (!text.trim()) return;

    setLoading(true);

    const { error } = await supabase.from("notices").insert([
      {
        text,
        is_active: true,
      },
    ]);

    setLoading(false);

    if (error) {
      toast.error(error.message);
      return;
    }

    toast.success("Notice added");
    setText("");
    getNotices();
  };

  const toggleNotice = async (id: number, isActive: boolean) => {
    const { error } = await supabase
      .from("notices")
      .update({ is_active: !isActive })
      .eq("id", id);

    if (error) {
      toast.error("Update failed");
      return;
    }

    toast.success("Notice updated");
    getNotices();
  };

  const updateNotice = async (id: number, newText: string) => {
    const { error } = await supabase
      .from("notices")
      .update({ text: newText })
      .eq("id", id);

    if (error) {
      toast.error("Edit failed");
      return;
    }

    toast.success("Notice edited");
    getNotices();
  };

  const deleteNotice = async (id: number) => {
    const confirmDelete = confirm("Delete this notice?");
    if (!confirmDelete) return;

    const { error } = await supabase.from("notices").delete().eq("id", id);

    if (error) {
      toast.error("Delete failed");
      return;
    }

    toast.success("Notice deleted");
    getNotices();
  };

  useEffect(() => {
    getNotices();
  }, []);

  return (
    <AdminGuard>
      <main className="min-h-screen bg-gray-100 p-4">
        <Link
          href="/admin"
          className="mb-5 flex h-11 w-11 items-center justify-center rounded-full bg-white shadow"
        >
          <ArrowLeft size={24} />
        </Link>

        <h1 className="mb-6 text-3xl font-extrabold text-slate-900">
          Notice Bar
        </h1>

        <form onSubmit={addNotice} className="mb-6 rounded-3xl bg-white p-4 shadow-sm">
          <textarea
            placeholder="Write notice text..."
            value={text}
            onChange={(e) => setText(e.target.value)}
            className="min-h-[110px] w-full rounded-2xl border p-4 outline-none"
          />

          <button
            disabled={loading}
            className="mt-4 w-full rounded-2xl bg-orange-500 py-4 font-bold text-white disabled:opacity-60"
          >
            {loading ? "Adding..." : "Add Notice"}
          </button>
        </form>

        <div className="space-y-4">
          {notices.map((notice) => (
            <div key={notice.id} className="rounded-3xl bg-white p-4 shadow-sm">
              <textarea
                defaultValue={notice.text}
                onBlur={(e) => updateNotice(notice.id, e.target.value)}
                className="min-h-[90px] w-full rounded-2xl border p-3 outline-none"
              />

              <div className="mt-4 flex gap-3">
                <button
                  onClick={() => toggleNotice(notice.id, notice.is_active)}
                  className={`flex-1 rounded-2xl py-3 font-bold text-white ${
                    notice.is_active ? "bg-green-500" : "bg-slate-500"
                  }`}
                >
                  {notice.is_active ? "Active" : "Inactive"}
                </button>

                <button
                  onClick={() => deleteNotice(notice.id)}
                  className="flex items-center justify-center gap-2 rounded-2xl bg-red-500 px-5 py-3 font-bold text-white"
                >
                  <Trash2 size={18} />
                  Delete
                </button>
              </div>
            </div>
          ))}
        </div>
      </main>
    </AdminGuard>
  );
}