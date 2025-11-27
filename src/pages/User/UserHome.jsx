import React, { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import { User, ShoppingBag, ClipboardList, Upload } from "lucide-react";

export default function UserHome() {
  const userName = localStorage.getItem("userName");
  const userId = localStorage.getItem("id");

  const [orders, setOrders] = useState([]);

  useEffect(() => {
    fetch(`${import.meta.env.VITE_API_URL}/api/order/order?user=${userId}`)
      .then((res) => res.json())
      .then((data) => setOrders(data))
      .catch(() => setOrders([]));
  }, []);

  return (
    <div className="relative min-h-screen text-white p-6 sm:p-10">

      {/* BACKGROUND GLOW */}
      <div className="absolute inset-0 bg-[radial-gradient(circle_at_center,rgba(0,255,180,0.15),transparent_70%)]"></div>
      <div className="absolute inset-0 bg-[radial-gradient(circle,transparent,rgba(0,0,0,0.85))]"></div>

      <div className="relative z-10">

        {/* GREETING */}
        <h1 className="text-3xl sm:text-4xl font-light mb-6 tracking-wide">
          Welcome, <span className="text-teal-300">{userName}</span> 👋
        </h1>
        <p className="text-gray-300 mb-10">
          Here’s a quick overview of your activity.
        </p>

        {/* DASHBOARD CARDS */}
        <div className="grid grid-cols-1 sm:grid-cols-3 gap-8">

          {/* Total Orders */}
          <div className="p-6 rounded-2xl backdrop-blur-2xl bg-white/10 border border-white/20 shadow-xl hover:bg-white/20 transition">
            <div className="flex items-center gap-4">
              <div className="p-3 rounded-xl bg-teal-300/20 text-teal-300">
                <ShoppingBag size={28} />
              </div>
              <div>
                <p className="text-gray-300">Total Orders</p>
                <h2 className="text-2xl font-semibold">{orders.length}</h2>
              </div>
            </div>
          </div>

          {/* Pending Orders */}
          <div className="p-6 rounded-2xl backdrop-blur-2xl bg-white/10 border border-white/20 shadow-xl hover:bg-white/20 transition">
            <div className="flex items-center gap-4">
              <div className="p-3 rounded-xl bg-yellow-300/20 text-yellow-300">
                <ClipboardList size={28} />
              </div>

              <div>
                <p className="text-gray-300">Pending Orders</p>
                <h2 className="text-2xl font-semibold">
                  {orders.filter((o) => o.printOptions.status === "pending").length}
                </h2>
              </div>
            </div>
          </div>

          {/* Completed */}
          <div className="p-6 rounded-2xl backdrop-blur-2xl bg-white/10 border border-white/20 shadow-xl hover:bg-white/20 transition">
            <div className="flex items-center gap-4">
              <div className="p-3 rounded-xl bg-green-300/20 text-green-300">
                <User size={28} />
              </div>

              <div>
                <p className="text-gray-300">Completed Orders</p>
                <h2 className="text-2xl font-semibold">
                  {orders.filter((o) => o.printOptions.status === "completed").length}
                </h2>
              </div>
            </div>
          </div>
        </div>

        {/* QUICK ACTIONS */}
        <h2 className="text-2xl font-light mt-14 mb-6 tracking-wide">
          Quick <span className="text-teal-300">Actions</span>
        </h2>

        <div className="grid grid-cols-1 sm:grid-cols-3 gap-6">

          <Link
            to="/UserDashboard/OrderPage"
            className="p-6 rounded-xl backdrop-blur-xl bg-white/10 border border-white/20 shadow-xl flex items-center gap-4 hover:bg-white/20 transition"
          >
            <Upload size={28} className="text-teal-300" />
            <div>
              <p className="text-white font-medium">New Order</p>
              <p className="text-gray-400 text-sm">Upload and print documents</p>
            </div>
          </Link>

          <Link
            to="/UserDashboard/OrderStatus"
            className="p-6 rounded-xl backdrop-blur-xl bg-white/10 border border-white/20 shadow-xl flex items-center gap-4 hover:bg-white/20 transition"
          >
            <ClipboardList size={28} className="text-teal-300" />
            <div>
              <p className="text-white font-medium">Track Orders</p>
              <p className="text-gray-400 text-sm">View your order history</p>
            </div>
          </Link>

          <Link
            to="/UserDashboard/UserProfile"
            className="p-6 rounded-xl backdrop-blur-xl bg-white/10 border border-white/20 shadow-xl flex items-center gap-4 hover:bg-white/20 transition"
          >
            <User size={28} className="text-teal-300" />
            <div>
              <p className="text-white font-medium">Profile</p>
              <p className="text-gray-400 text-sm">View your account details</p>
            </div>
          </Link>

        </div>

      </div>
    </div>
  );
}
