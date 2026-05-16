"use client";

import { useState } from "react";

import { Star } from "lucide-react";

import toast from "react-hot-toast";

import { useRouter } from "next/navigation";

import { supabase } from "@/lib/supabase";

import BottomNav from "@/components/BottomNav";

export default function ReviewPage() {
  const router = useRouter();

  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [comment, setComment] = useState("");

  const [rating, setRating] = useState(5);

  const [loading, setLoading] =
    useState(false);

  const handleSubmit = async (
    e: React.FormEvent
  ) => {
    e.preventDefault();

    setLoading(true);

    const { error } = await supabase
      .from("reviews")
      .insert([
        {
          customer_name: name,
          email,
          rating,
          comment,
          status: "Pending",
        },
      ]);

    setLoading(false);

    if (error) {
      toast.error(error.message);

      return;
    }

    toast.success(
      "Review submitted for approval"
    );

    router.push("/");
  };

  return (
    <main className="min-h-screen bg-gray-100 p-4 pb-32">
      <div className="rounded-3xl bg-white p-6 shadow-sm">
        <h1 className="text-3xl font-extrabold text-slate-900">
          Customer Review
        </h1>

        <p className="mt-2 text-sm text-slate-500">
          Share your experience with us
        </p>

        <form
          onSubmit={handleSubmit}
          className="mt-6 space-y-4"
        >
          <input
            type="text"
            placeholder="Your Name"
            required
            value={name}
            onChange={(e) =>
              setName(e.target.value)
            }
            className="h-14 w-full rounded-2xl border px-4 outline-none"
          />

          <input
            type="email"
            placeholder="Your Email"
            required
            value={email}
            onChange={(e) =>
              setEmail(e.target.value)
            }
            className="h-14 w-full rounded-2xl border px-4 outline-none"
          />

          <div>
            <p className="mb-3 font-bold">
              Select Rating
            </p>

            <div className="flex gap-2">
              {[1, 2, 3, 4, 5].map(
                (star) => (
                  <button
                    type="button"
                    key={star}
                    onClick={() =>
                      setRating(star)
                    }
                    className="transition"
                  >
                    <Star
                      size={34}
                      className={
                        star <= rating
                          ? "fill-yellow-400 text-yellow-400"
                          : "text-slate-300"
                      }
                    />
                  </button>
                )
              )}
            </div>
          </div>

          <textarea
            placeholder="Write your review..."
            required
            value={comment}
            onChange={(e) =>
              setComment(e.target.value)
            }
            className="min-h-[140px] w-full rounded-2xl border p-4 outline-none"
          />

          <button
            disabled={loading}
            className="w-full rounded-2xl bg-orange-500 py-4 font-bold text-white disabled:opacity-60"
          >
            {loading
              ? "Submitting..."
              : "Submit Review"}
          </button>
        </form>
      </div>

      <BottomNav />
    </main>
  );
}