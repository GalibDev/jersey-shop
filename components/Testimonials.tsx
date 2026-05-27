"use client";

import { Star } from "lucide-react";

const reviews = [
  {
    id: 1,
    name: "Rahim",
    comment:
      "Jersey quality onek premium. Delivery fast chilo 🔥",
  },

  {
    id: 2,
    name: "Karim",
    comment:
      "Print quality amazing. Again order dibo ❤️",
  },

  {
    id: 3,
    name: "Sabbir",
    comment:
      "Best football jersey shop in Bangladesh.",
  },
];

export default function Testimonials() {
  return (
    <section className="mx-auto mt-8 max-w-7xl px-4 sm:px-6 lg:px-8">
      <div className="mb-5 flex items-center justify-between">
        <h2 className="text-2xl font-extrabold text-slate-900">
          Customer Reviews
        </h2>

        <span className="text-sm font-bold text-orange-500">
          4.9/5 Rating
        </span>
      </div>

      <div className="grid gap-4 md:grid-cols-3">
        {reviews.map((review) => (
          <div
            key={review.id}
            className="rounded-3xl bg-white p-5 shadow-sm"
          >
            <div className="mb-3 flex items-center gap-1 text-orange-500">
              <Star size={18} fill="orange" />
              <Star size={18} fill="orange" />
              <Star size={18} fill="orange" />
              <Star size={18} fill="orange" />
              <Star size={18} fill="orange" />
            </div>

            <p className="text-sm leading-7 text-slate-600">
              &quot;{review.comment}&quot;
            </p>

            <h3 className="mt-4 text-lg font-extrabold text-slate-900">
              {review.name}
            </h3>
          </div>
        ))}
      </div>
    </section>
  );
}
