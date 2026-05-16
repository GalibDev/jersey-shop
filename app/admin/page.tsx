"use client";

import { useEffect, useState } from "react";

import Link from "next/link";

import {
  Package,
  ShoppingCart,
  Users,
  LogOut,
  DollarSign,
  Megaphone,
  Star,
  LayoutGrid,
  ImageIcon,
  Eye,
} from "lucide-react";

import { useRouter } from "next/navigation";

import { supabase } from "@/lib/supabase";

import AdminGuard from "@/components/AdminGuard";

type Order = {
  total: number;
  status: string;
};

export default function AdminDashboard() {
  const router = useRouter();

  const [productsCount, setProductsCount] =
    useState(0);

  const [ordersCount, setOrdersCount] =
    useState(0);

  const [revenue, setRevenue] = useState(0);

  const [pendingOrders, setPendingOrders] =
    useState(0);

  const [visitorCount, setVisitorCount] =
    useState(0);

  const [recentOrders, setRecentOrders] =
    useState<any[]>([]);

  useEffect(() => {
    loadStats();
  }, []);

  const loadStats = async () => {
    const { data: products } =
      await supabase
        .from("products")
        .select("*");

    const { data: orders } = await supabase
      .from("orders")
      .select("*");

    const { data: visitors } =
      await supabase
        .from("visitors")
        .select("*");

    const { data: latestOrders } =
      await supabase
        .from("orders")
        .select("*")
        .order("id", { ascending: false })
        .limit(5);

    setRecentOrders(latestOrders || []);

    setProductsCount(products?.length || 0);

    setOrdersCount(orders?.length || 0);

    setVisitorCount(visitors?.length || 0);

    const totalRevenue =
      orders?.reduce(
        (acc: number, item: Order) =>
          acc + item.total,
        0
      ) || 0;

    setRevenue(totalRevenue);

    const pending =
      orders?.filter(
        (item: Order) =>
          item.status === "Pending"
      ).length || 0;

    setPendingOrders(pending);
  };

  const handleLogout = async () => {
    await supabase.auth.signOut();

    router.replace("/admin/login");
  };

  return (
    <AdminGuard>
      <main className="min-h-screen bg-gray-100 p-4">
        {/* HEADER */}
        <div className="mb-8 flex items-center justify-between">
          <div>
            <p className="text-sm font-bold text-orange-500">
              ADMIN PANEL
            </p>

            <h1 className="text-3xl font-extrabold text-slate-900">
              Dashboard
            </h1>
          </div>

          <button
            onClick={handleLogout}
            className="flex h-11 w-11 items-center justify-center rounded-full bg-red-500 text-white"
          >
            <LogOut size={22} />
          </button>
        </div>

        {/* STATS */}
        <div className="mb-6 grid grid-cols-2 gap-4">
          <div className="rounded-3xl bg-white p-5 shadow-sm">
            <Package
              size={30}
              className="text-orange-500"
            />

            <h2 className="mt-4 text-2xl font-extrabold">
              {productsCount}
            </h2>

            <p className="text-sm text-slate-500">
              Products
            </p>
          </div>

          <div className="rounded-3xl bg-white p-5 shadow-sm">
            <ShoppingCart
              size={30}
              className="text-green-500"
            />

            <h2 className="mt-4 text-2xl font-extrabold">
              {ordersCount}
            </h2>

            <p className="text-sm text-slate-500">
              Orders
            </p>
          </div>

          <div className="rounded-3xl bg-white p-5 shadow-sm">
            <DollarSign
              size={30}
              className="text-blue-500"
            />

            <h2 className="mt-4 text-2xl font-extrabold">
              ৳{revenue}
            </h2>

            <p className="text-sm text-slate-500">
              Revenue
            </p>
          </div>

          <div className="rounded-3xl bg-white p-5 shadow-sm">
            <Users
              size={30}
              className="text-red-500"
            />

            <h2 className="mt-4 text-2xl font-extrabold">
              {pendingOrders}
            </h2>

            <p className="text-sm text-slate-500">
              Pending
            </p>
          </div>

          <div className="rounded-3xl bg-white p-5 shadow-sm">
            <Eye
              size={30}
              className="text-cyan-500"
            />

            <h2 className="mt-4 text-2xl font-extrabold">
              {visitorCount}
            </h2>

            <p className="text-sm text-slate-500">
              Visitors
            </p>
          </div>
        </div>

        {/* ADMIN OPTIONS */}
        <div className="grid grid-cols-2 gap-4">
          <Link href="/admin/products">
            <div className="rounded-3xl bg-white p-5 shadow-sm">
              <Package
                size={34}
                className="text-orange-500"
              />

              <h2 className="mt-4 text-lg font-extrabold text-slate-900">
                Products
              </h2>

              <p className="mt-1 text-sm text-slate-500">
                Manage products
              </p>
            </div>
          </Link>

          <Link href="/admin/orders">
            <div className="rounded-3xl bg-white p-5 shadow-sm">
              <ShoppingCart
                size={34}
                className="text-green-500"
              />

              <h2 className="mt-4 text-lg font-extrabold text-slate-900">
                Orders
              </h2>

              <p className="mt-1 text-sm text-slate-500">
                Customer orders
              </p>
            </div>
          </Link>

          <Link href="/admin/notices">
            <div className="rounded-3xl bg-white p-5 shadow-sm">
              <Megaphone
                size={34}
                className="text-purple-500"
              />

              <h2 className="mt-4 text-lg font-extrabold text-slate-900">
                Notice Bar
              </h2>

              <p className="mt-1 text-sm text-slate-500">
                Manage top notice
              </p>
            </div>
          </Link>

          <Link href="/admin/reviews">
            <div className="rounded-3xl bg-white p-5 shadow-sm">
              <Star
                size={34}
                className="text-yellow-500"
              />

              <h2 className="mt-4 text-lg font-extrabold text-slate-900">
                Reviews
              </h2>

              <p className="mt-1 text-sm text-slate-500">
                Customer ratings
              </p>
            </div>
          </Link>

          <Link href="/admin/categories">
            <div className="rounded-3xl bg-white p-5 shadow-sm">
              <LayoutGrid
                size={34}
                className="text-pink-500"
              />

              <h2 className="mt-4 text-lg font-extrabold text-slate-900">
                Categories
              </h2>

              <p className="mt-1 text-sm text-slate-500">
                Manage categories
              </p>
            </div>
          </Link>

          <Link href="/admin/sliders">
            <div className="rounded-3xl bg-white p-5 shadow-sm">
              <ImageIcon
                size={34}
                className="text-cyan-500"
              />

              <h2 className="mt-4 text-lg font-extrabold text-slate-900">
                Sliders
              </h2>

              <p className="mt-1 text-sm text-slate-500">
                Homepage sliders
              </p>
            </div>
          </Link>
        </div>

        {/* RECENT ORDERS */}
        <div className="mt-8">
          <div className="mb-4 flex items-center justify-between">
            <h2 className="text-2xl font-extrabold text-slate-900">
              Recent Orders
            </h2>

            <Link
              href="/admin/orders"
              className="text-sm font-bold text-orange-500"
            >
              View All
            </Link>
          </div>

          <div className="space-y-4">
            {recentOrders.map((order) => (
              <div
                key={order.id}
                className="rounded-3xl bg-white p-4 shadow-sm"
              >
                <div className="flex items-center justify-between">
                  <h3 className="font-extrabold text-slate-900">
                    #{order.id}
                  </h3>

                  <span className="rounded-full bg-orange-100 px-3 py-1 text-xs font-bold text-orange-600">
                    {order.status}
                  </span>
                </div>

                <p className="mt-2 font-bold">
                  {order.customer_name}
                </p>

                <p className="text-sm text-slate-500">
                  {order.phone}
                </p>

                <p className="mt-3 text-xl font-extrabold text-orange-500">
                  ৳{order.total}
                </p>
              </div>
            ))}
          </div>
        </div>
      </main>
    </AdminGuard>
  );
}