"use client";

import { useState } from "react";
import Link from "next/link";
import {
  ArrowLeft,
  CreditCard,
  MapPin,
  MessageCircle,
  Phone,
  ShieldCheck,
  Truck,
} from "lucide-react";
import { useRouter } from "next/navigation";
import toast from "react-hot-toast";

import { useCartStore } from "@/store/cartStore";
import { supabase } from "@/lib/supabase";
import Header from "@/components/Header";
import BottomNav from "@/components/BottomNav";

type PaymentMethod = "bKash" | "Nagad";

export default function CheckoutPage() {
  const router = useRouter();

  const cart = useCartStore((state) => state.cart);
  const clearCart = useCartStore((state) => state.clearCart);

  const subtotal = cart.reduce((acc, item) => acc + item.price, 0);

  const [name, setName] = useState("");
  const [phone, setPhone] = useState("");
  const [address, setAddress] = useState("");
  const [area, setArea] = useState("Dhaka City");
  const [paymentMethod, setPaymentMethod] = useState<PaymentMethod>("bKash");
  const [trxId, setTrxId] = useState("");
  const [paymentNote, setPaymentNote] = useState("");
  const [loading, setLoading] = useState(false);

  const deliveryCharge = area === "Dhaka City" ? 60 : 120;
  const total = subtotal + deliveryCharge;
  const whatsappNumber = "8801876882474";
  const bkashNumber = "01876882474";
  const nagadNumber = "01876882474";
  const paymentNumber =
    paymentMethod === "bKash" ? bkashNumber : nagadNumber;

  const handleOrder = async (e: React.FormEvent) => {
    e.preventDefault();

    const cleanPhone = phone.replace(/\D/g, "");
    const isValidPhone =
      /^01[3-9]\d{8}$/.test(cleanPhone) ||
      /^8801[3-9]\d{8}$/.test(cleanPhone);

    if (cart.length === 0) {
      toast.error("Your cart is empty");
      return;
    }

    if (!isValidPhone) {
      toast.error("Enter a valid Bangladesh phone number");
      return;
    }

    if (address.trim().length < 10) {
      toast.error("Enter a complete delivery address");
      return;
    }

    setLoading(true);

    const orderData = {
      customer_name: name.trim(),
      phone: cleanPhone,
      address: address.trim(),
      products: cart,
      total,
      status: "Pending",

      area,
      delivery_charge: deliveryCharge,
      payment_method: paymentMethod,
      trx_id: trxId.trim(),
      payment_note: paymentNote.trim(),
      payment_status: trxId ? "Submitted" : "Pending",
    };

    let { error } = await supabase.from("orders").insert([orderData]);

    if (error && error.code === "PGRST204") {
      const { delivery_charge: _deliveryCharge, ...orderDataWithoutCharge } =
        orderData;
      const retry = await supabase.from("orders").insert([
        orderDataWithoutCharge,
      ]);

      error = retry.error;
    }

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

    const message = `Payment Screenshot Submit%0A%0AName: ${name}%0APhone: ${phone}%0AAddress: ${address}%0AArea: ${area}%0APayment Method: ${paymentMethod}%0A%0AProducts:%0A${productList}%0A%0ATotal: ৳${total}%0A%0A${paymentMethod} Number: ${paymentNumber}%0ATransaction ID: ${trxId}%0A%0APlease check my payment screenshot.`;

    window.open(`https://wa.me/${whatsappNumber}?text=${message}`, "_blank");
  };

  return (
    <>
      <Header />
      <main className="min-h-screen bg-gray-100 px-4 py-5 pb-32 md:pb-12">
      <div className="mx-auto max-w-7xl">
        <Link
          href="/cart"
          className="mb-5 flex h-11 w-11 items-center justify-center rounded-full bg-white shadow"
        >
          <ArrowLeft size={24} />
        </Link>

        <div className="mb-6">
          <h1 className="text-3xl font-extrabold text-slate-900">
            Checkout
          </h1>

          <p className="mt-2 text-sm font-semibold text-slate-500">
            Complete your delivery details and payment information.
          </p>
        </div>

        <form
          onSubmit={handleOrder}
          className="grid gap-5 lg:grid-cols-[minmax(0,1fr)_420px] lg:items-start"
        >
          <div className="space-y-5">
            <section className="rounded-3xl bg-white p-4 shadow-sm sm:p-6">
              <div className="mb-4 flex items-center gap-3">
                <div className="flex h-11 w-11 items-center justify-center rounded-2xl bg-orange-50 text-orange-500">
                  <MapPin size={22} />
                </div>

                <h2 className="text-xl font-extrabold text-slate-900">
                  Delivery Details
                </h2>
              </div>

              <div className="grid gap-3 sm:grid-cols-2">
                <input
                  type="text"
                  placeholder="Your Name"
                  required
                  value={name}
                  onChange={(e) => setName(e.target.value)}
                  className="h-14 w-full rounded-2xl border border-slate-200 bg-white px-4 font-semibold outline-none transition focus:border-orange-500 focus:ring-4 focus:ring-orange-100"
                />

                <div className="relative">
                  <Phone
                    size={18}
                    className="absolute left-4 top-1/2 -translate-y-1/2 text-slate-400"
                  />
                  <input
                    type="tel"
                    inputMode="tel"
                    placeholder="Phone Number"
                    required
                    value={phone}
                    onChange={(e) => setPhone(e.target.value)}
                    className="h-14 w-full rounded-2xl border border-slate-200 bg-white pl-11 pr-4 font-semibold outline-none transition focus:border-orange-500 focus:ring-4 focus:ring-orange-100"
                  />
                </div>
              </div>

              <textarea
                placeholder="Delivery Address"
                required
                value={address}
                onChange={(e) => setAddress(e.target.value)}
                className="mt-3 min-h-[120px] w-full rounded-2xl border border-slate-200 bg-white p-4 font-semibold outline-none transition focus:border-orange-500 focus:ring-4 focus:ring-orange-100"
              />

              <div className="mt-4">
                <p className="mb-3 font-bold text-slate-800">
                  Delivery Area
                </p>

                <div className="grid grid-cols-2 gap-3">
                  {["Dhaka City", "Outside Dhaka"].map((item) => (
                    <button
                      type="button"
                      key={item}
                      onClick={() => setArea(item)}
                      className={`h-14 rounded-2xl border font-bold shadow-sm transition hover:-translate-y-0.5 ${
                        area === item
                          ? "border-orange-500 bg-orange-500 text-white shadow-orange-500/25"
                          : "border-slate-200 bg-white text-slate-700 hover:border-orange-300 hover:text-orange-500"
                      }`}
                    >
                      {item}
                    </button>
                  ))}
                </div>

                <p className="mt-3 rounded-2xl bg-orange-50 px-4 py-3 text-sm font-bold text-orange-600">
                  {area === "Dhaka City"
                    ? "ঢাকার ভিতরে ডেলিভারি চার্জ ৬০/-"
                    : "ঢাকার বাইরে ডেলিভারি চার্জ ১২০/-"}
                </p>
              </div>
            </section>

            <section className="rounded-3xl bg-white p-4 shadow-sm sm:p-6">
              <div className="mb-4 flex items-center gap-3">
                <div className="flex h-11 w-11 items-center justify-center rounded-2xl bg-orange-50 text-orange-500">
                  <CreditCard size={22} />
                </div>

                <h2 className="text-xl font-extrabold text-slate-900">
                  Payment
                </h2>
              </div>

              <div className="mb-4 grid grid-cols-2 gap-3">
                {(["bKash", "Nagad"] as PaymentMethod[]).map((method) => (
                  <button
                    type="button"
                    key={method}
                    onClick={() => {
                      setPaymentMethod(method);
                      setTrxId("");
                      setPaymentNote("");
                    }}
                    className={`h-14 rounded-2xl border font-extrabold shadow-sm transition hover:-translate-y-0.5 ${
                      paymentMethod === method
                        ? "border-orange-500 bg-orange-500 text-white shadow-orange-500/25"
                        : "border-slate-200 bg-white text-slate-700 hover:border-orange-300 hover:text-orange-500"
                    }`}
                  >
                    {method}
                  </button>
                ))}
              </div>

              <div className="rounded-2xl border border-orange-100 bg-orange-50 p-4">
                <p className="font-bold text-slate-900">
                  Send Money {paymentMethod} Number
                </p>

                <p className="mt-2 text-2xl font-extrabold text-orange-500">
                  {paymentNumber}
                </p>

                <p className="mt-2 text-sm leading-6 text-slate-600">
                  Send total ৳{total} by {paymentMethod}, then enter the
                  transaction ID below. You can also send the payment screenshot
                  on WhatsApp.
                </p>
              </div>

              <input
                type="text"
                placeholder={`${paymentMethod} Transaction ID`}
                value={trxId}
                onChange={(e) => setTrxId(e.target.value)}
                className="mt-4 h-14 w-full rounded-2xl border border-slate-200 bg-white px-4 font-semibold outline-none transition focus:border-orange-500 focus:ring-4 focus:ring-orange-100"
              />

              <textarea
                placeholder={`${paymentMethod} payment note optional`}
                value={paymentNote}
                onChange={(e) => setPaymentNote(e.target.value)}
                className="mt-3 min-h-[90px] w-full rounded-2xl border border-slate-200 bg-white p-4 font-semibold outline-none transition focus:border-orange-500 focus:ring-4 focus:ring-orange-100"
              />

              <button
                type="button"
                onClick={sendWhatsAppScreenshot}
                className="mt-3 flex h-14 w-full items-center justify-center gap-2 rounded-2xl bg-green-500 font-bold text-white shadow-lg shadow-green-500/20 transition hover:bg-green-600"
              >
                <MessageCircle size={22} />
                Send Screenshot on WhatsApp
              </button>
            </section>
          </div>

          <aside className="rounded-3xl bg-white p-5 shadow-sm lg:sticky lg:top-24">
            <h2 className="text-xl font-extrabold text-slate-900">
              Order Summary
            </h2>

            <div className="mt-4 max-h-72 space-y-3 overflow-auto pr-1">
              {cart.length === 0 ? (
                <p className="rounded-2xl bg-slate-50 p-4 text-sm font-semibold text-slate-500">
                  Your cart is empty.
                </p>
              ) : (
                cart.map((item, index) => (
                  <div
                    key={`${item.id}-${index}`}
                    className="flex items-start justify-between gap-3 rounded-2xl bg-slate-50 p-3"
                  >
                    <div>
                      <p className="line-clamp-2 text-sm font-bold text-slate-800">
                        {item.name}
                      </p>
                      <p className="mt-1 text-xs font-semibold text-slate-500">
                        Item {index + 1}
                      </p>
                    </div>

                    <span className="shrink-0 font-extrabold text-orange-500">
                      ৳{item.price}
                    </span>
                  </div>
                ))
              )}
            </div>

            <div className="mt-5 space-y-3 border-t border-slate-100 pt-5">
              <div className="flex items-center justify-between">
                <span className="font-bold text-slate-600">
                  Total Products
                </span>
                <span className="font-extrabold">{cart.length}</span>
              </div>

              <div className="flex items-center justify-between">
                <span className="font-bold text-slate-600">
                  Delivery Area
                </span>
                <span className="font-extrabold text-slate-900">
                  {area}
                </span>
              </div>

              <div className="flex items-center justify-between">
                <span className="font-bold text-slate-600">
                  Product Price
                </span>
                <span className="font-extrabold text-slate-900">
                  ৳{subtotal}
                </span>
              </div>

              <div className="flex items-center justify-between">
                <span className="font-bold text-slate-600">
                  Delivery Charge
                </span>
                <span className="font-extrabold text-slate-900">
                  ৳{deliveryCharge}
                </span>
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

            <div className="mt-5 grid gap-3 text-sm font-bold text-slate-600">
              <div className="flex items-center gap-2">
                <Truck size={18} className="text-orange-500" />
                Fast delivery after confirmation
              </div>
              <div className="flex items-center gap-2">
                <ShieldCheck size={18} className="text-orange-500" />
                Payment checked before dispatch
              </div>
            </div>

            <button
              disabled={loading}
              className="mt-6 w-full rounded-2xl bg-orange-500 py-4 font-extrabold text-white shadow-lg shadow-orange-500/25 transition hover:bg-orange-600 disabled:opacity-60"
            >
              {loading ? "Placing Order..." : "Place Order"}
            </button>
          </aside>
        </form>
      </div>

      <BottomNav />
      </main>
    </>
  );
}
