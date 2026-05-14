"use client";

import { useState } from "react";
import Link from "next/link";
import { ArrowLeft, MessageCircle } from "lucide-react";
import { useRouter } from "next/navigation";
import toast from "react-hot-toast";

import { useCartStore } from "@/store/cartStore";
import { supabase } from "@/lib/supabase";
import BottomNav from "@/components/BottomNav";

export default function CheckoutPage() {
  const router = useRouter();

  const cart = useCartStore((state) => state.cart);
  const clearCart = useCartStore((state) => state.clearCart);

  const total = cart.reduce((acc, item) => acc + item.price, 0);

  const [name, setName] = useState("");
  const [phone, setPhone] = useState("");
  const [address, setAddress] = useState("");
  const [area, setArea] = useState("Dhaka City");
  const [trxId, setTrxId] = useState("");
  const [paymentNote, setPaymentNote] = useState("");
  const [loading, setLoading] = useState(false);

  const whatsappNumber = "8801XXXXXXXXX";
  const bkashNumber = "01XXXXXXXXX";

  const handleOrder = async (e: React.FormEvent) => {
    e.preventDefault();

    if (cart.length === 0) {
      toast.error("Your cart is empty");
      return;
    }

    setLoading(true);

    const { error } = await supabase.from("orders").insert([
      {
        customer_name: name,
        phone,
        address,
        products: cart,
        total,
        status: "Pending",

        area,
        payment_method: "bKash",
        trx_id: trxId,
        payment_note: paymentNote,
        payment_status: trxId ? "Submitted" : "Pending",
      },
    ]);

    setLoading(false);

    if (error) {
      console.log(error);
      toast.error(error.message || "Order failed");
      return;
    }

    toast.success("Order placed successfully");

    clearCart();

    router.push("/");
  };

  const sendWhatsAppScreenshot = () => {
    const productList = cart
      .map((item, index) => `${index + 1}. ${item.name} - ৳${item.price}`)
      .join("%0A");

    const message = `Payment Screenshot Submit%0A%0AName: ${name}%0APhone: ${phone}%0AAddress: ${address}%0AArea: ${area}%0A%0AProducts:%0A${productList}%0A%0ATotal: ৳${total}%0A%0AbKash Number: ${bkashNumber}%0A%0APlease check my payment screenshot.`;

    window.open(`https://wa.me/${whatsappNumber}?text=${message}`, "_blank");
  };

  return (
    <main className="min-h-screen bg-gray-100 p-4 pb-32">
      <Link
        href="/cart"
        className="mb-5 flex h-11 w-11 items-center justify-center rounded-full bg-white shadow"
      >
        <ArrowLeft size={24} />
      </Link>

      <h1 className="mb-2 text-3xl font-extrabold text-slate-900">
        Checkout
      </h1>

      <p className="mb-6 text-sm font-semibold text-slate-500">
        Complete your billing details and payment information.
      </p>

      <form onSubmit={handleOrder} className="space-y-4">
        <div className="rounded-3xl bg-white p-4 shadow-sm">
          <h2 className="mb-4 text-xl font-extrabold text-slate-900">
            Billing Details
          </h2>

          <input
            type="text"
            placeholder="Your Name"
            required
            value={name}
            onChange={(e) => setName(e.target.value)}
            className="mb-3 h-14 w-full rounded-2xl border bg-white px-4 outline-none"
          />

          <input
            type="tel"
            placeholder="Phone Number"
            required
            value={phone}
            onChange={(e) => setPhone(e.target.value)}
            className="mb-3 h-14 w-full rounded-2xl border bg-white px-4 outline-none"
          />

          <textarea
            placeholder="Delivery Address"
            required
            value={address}
            onChange={(e) => setAddress(e.target.value)}
            className="min-h-[110px] w-full rounded-2xl border bg-white p-4 outline-none"
          />

          <div className="mt-4">
            <p className="mb-3 font-bold text-slate-800">Select Area</p>

            <div className="grid grid-cols-2 gap-3">
              {["Dhaka City", "Outside Dhaka"].map((item) => (
                <button
                  type="button"
                  key={item}
                  onClick={() => setArea(item)}
                  className={`h-14 rounded-2xl border font-bold ${
                    area === item
                      ? "border-orange-500 bg-orange-50 text-orange-500"
                      : "bg-white text-slate-700"
                  }`}
                >
                  {item}
                </button>
              ))}
            </div>
          </div>
        </div>

        <div className="rounded-3xl bg-white p-4 shadow-sm">
          <h2 className="mb-3 text-xl font-extrabold text-slate-900">
            Payment
          </h2>

          <div className="rounded-2xl bg-orange-50 p-4">
            <p className="font-bold text-slate-900">
              Send Money bKash Number
            </p>

            <p className="mt-2 text-2xl font-extrabold text-orange-500">
              {bkashNumber}
            </p>

            <p className="mt-2 text-sm leading-6 text-slate-600">
              Total ৳{total} Send Money kore Transaction ID নিচে বসাও.
              Screenshot দিলে WhatsApp option use করতে পারো.
            </p>
          </div>

          <input
            type="text"
            placeholder="bKash Transaction ID"
            value={trxId}
            onChange={(e) => setTrxId(e.target.value)}
            className="mt-4 h-14 w-full rounded-2xl border bg-white px-4 outline-none"
          />

          <textarea
            placeholder="Payment note optional"
            value={paymentNote}
            onChange={(e) => setPaymentNote(e.target.value)}
            className="mt-3 min-h-[90px] w-full rounded-2xl border bg-white p-4 outline-none"
          />

          <button
            type="button"
            onClick={sendWhatsAppScreenshot}
            className="mt-3 flex h-14 w-full items-center justify-center gap-2 rounded-2xl bg-green-500 font-bold text-white"
          >
            <MessageCircle size={22} />
            Send Screenshot on WhatsApp
          </button>
        </div>

        <div className="rounded-3xl bg-white p-5 shadow-sm">
          <div className="mb-3 flex items-center justify-between">
            <span className="font-bold text-slate-700">Total Products</span>
            <span className="font-extrabold">{cart.length}</span>
          </div>

          <div className="flex items-center justify-between">
            <span className="text-lg font-bold text-slate-700">
              Total Price
            </span>

            <span className="text-3xl font-extrabold text-orange-500">
              ৳{total}
            </span>
          </div>
        </div>

        <button
          disabled={loading}
          className="w-full rounded-2xl bg-orange-500 py-4 font-bold text-white disabled:opacity-60"
        >
          {loading ? "Placing Order..." : "Place Order"}
        </button>
      </form>

      <BottomNav />
    </main>
  );
}