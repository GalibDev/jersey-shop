"use client";

import { useEffect, useState } from "react";
import Link from "next/link";
import { ArrowLeft, Trash2 } from "lucide-react";
import toast from "react-hot-toast";

import { supabase } from "@/lib/supabase";
import AdminGuard from "@/components/AdminGuard";

type Order = {
  id: number;
  customer_name: string;
  phone: string;
  address: string;
  products: {
    name: string;
    price: number;
  }[];
  total: number;
  status: string;
  created_at: string;
};

export default function AdminOrdersPage() {
  const [orders, setOrders] = useState<Order[]>([]);
  const [search, setSearch] = useState("");
  const [statusFilter, setStatusFilter] = useState("All");

  const getOrders = async () => {
    const { data, error } = await supabase
      .from("orders")
      .select("*")
      .order("id", { ascending: false });

    if (error) {
      toast.error("Orders load failed");
      return;
    }

    setOrders(data || []);
  };

  const updateStatus = async (id: number, status: string) => {
    const { error } = await supabase
      .from("orders")
      .update({ status })
      .eq("id", id);

    if (error) {
      toast.error("Status update failed");
      return;
    }

    toast.success("Order status updated");
    getOrders();
  };

  const deleteOrder = async (id: number) => {
    const confirmDelete = confirm("Delete this order?");
    if (!confirmDelete) return;

    const { error } = await supabase
      .from("orders")
      .delete()
      .eq("id", id);

    if (error) {
      toast.error("Delete failed");
      return;
    }

    toast.success("Order deleted");
    getOrders();
  };

  useEffect(() => {
    getOrders();
  }, []);

  const filteredOrders = orders.filter((order) => {
    const matchesSearch =
      order.customer_name?.toLowerCase().includes(search.toLowerCase()) ||
      order.phone?.includes(search);

    const matchesStatus =
      statusFilter === "All" || order.status === statusFilter;

    return matchesSearch && matchesStatus;
  });

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
          Orders
        </h1>

        <input
          type="text"
          placeholder="Search by name or phone..."
          value={search}
          onChange={(e) => setSearch(e.target.value)}
          className="mb-4 h-14 w-full rounded-2xl border bg-white px-4 outline-none"
        />

        <select
          value={statusFilter}
          onChange={(e) => setStatusFilter(e.target.value)}
          className="mb-5 h-14 w-full rounded-2xl border bg-white px-4 font-bold outline-none"
        >
          <option value="All">All Orders</option>
          <option value="Pending">Pending</option>
          <option value="Confirmed">Confirmed</option>
          <option value="Delivered">Delivered</option>
          <option value="Cancelled">Cancelled</option>
        </select>

        <div className="space-y-4">
          {filteredOrders.map((order) => (
            <div
              key={order.id}
              className="rounded-3xl bg-white p-4 shadow-sm"
            >
              <div className="flex items-center justify-between">
                <h2 className="text-xl font-extrabold text-slate-900">
                  Order #{order.id}
                </h2>

                <span className="rounded-full bg-orange-100 px-3 py-1 text-xs font-bold text-orange-600">
                  {order.status || "Pending"}
                </span>
              </div>

              <p className="mt-3 font-bold">Name: {order.customer_name}</p>
              <p>Phone: {order.phone}</p>
              <p>Address: {order.address}</p>

              <div className="mt-4 rounded-2xl bg-gray-100 p-3">
                <p className="mb-2 font-bold">Products:</p>

                {order.products?.map((item, index) => (
                  <p key={index} className="text-sm text-slate-700">
                    {index + 1}. {item.name} - ৳{item.price}
                  </p>
                ))}
              </div>

              <p className="mt-4 text-2xl font-extrabold text-orange-500">
                Total: ৳{order.total}
              </p>

              <select
                value={order.status || "Pending"}
                onChange={(e) => updateStatus(order.id, e.target.value)}
                className="mt-4 h-12 w-full rounded-2xl border bg-white px-4 font-bold outline-none"
              >
                <option value="Pending">Pending</option>
                <option value="Confirmed">Confirmed</option>
                <option value="Delivered">Delivered</option>
                <option value="Cancelled">Cancelled</option>
              </select>

              <button
                onClick={() => deleteOrder(order.id)}
                className="mt-3 flex w-full items-center justify-center gap-2 rounded-2xl bg-red-500 py-3 font-bold text-white"
              >
                <Trash2 size={18} />
                Delete Order
              </button>
            </div>
          ))}
        </div>
      </main>
    </AdminGuard>
  );
}