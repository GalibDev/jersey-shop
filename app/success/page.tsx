import Link from "next/link";
import { CheckCircle2 } from "lucide-react";

export default function SuccessPage() {
  return (
    <main className="flex min-h-screen flex-col items-center justify-center bg-gray-100 p-6 text-center">
      <div className="rounded-3xl bg-white p-8 shadow-lg">
        <div className="mb-4 flex justify-center">
          <CheckCircle2
            size={90}
            className="text-green-500"
          />
        </div>

        <h1 className="text-3xl font-extrabold text-slate-900">
          Order Successful 🎉
        </h1>

        <p className="mt-3 max-w-sm text-slate-500">
          Thank you for your order. We will contact
          you soon for confirmation.
        </p>

        <Link href="/">
          <button className="mt-6 rounded-2xl bg-orange-500 px-6 py-3 font-bold text-white">
            Back To Home
          </button>
        </Link>
      </div>
    </main>
  );
}