import React from "react";
import { Users, ShoppingBag, ClipboardList, BarChart2, ArrowRight } from "lucide-react";
import { Link } from "react-router-dom";
import axios from "axios";
import { useState, useEffect } from "react";
export default function AdminHome() {

    const [stats, setStats] = useState({
      users: 0,
      orders: 0,
      pending: 0,
      revenue: 0,
    });

useEffect(() => {
  axios.get(`${import.meta.env.VITE_API_URL}/api/admin/stats`)
    .then((res) => setStats(res.data))
    .catch((err) => console.log("Stats Error:", err));
}, []);

  return (
    <div className="relative min-h-screen p-10 text-white overflow-hidden">

      <div className="absolute inset-0 bg-[radial-gradient(circle_at_center,rgba(99,102,241,0.18),transparent_70%)]"></div>
      <div className="absolute inset-0 bg-[radial-gradient(circle,transparent,rgba(0,0,0,0.85))]"></div>

      <div className="relative z-10 max-w-6xl mx-auto">

        <h1 className="text-5xl md:text-6xl font-light mb-6">
          Welcome Back, <span className="text-amber-300 font-medium">Admin</span>
        </h1>

        <p className="text-gray-300 text-lg max-w-xl mb-12">
          Manage users, orders, system settings, and analytics — all from one powerful dashboard.
        </p>

        <div className="grid grid-cols-1 md:grid-cols-4 gap-6 mb-12">

          <StatCard title="Users" value={stats.users} icon={<Users />} />
          <StatCard title="Orders" value={stats.orders} icon={<ShoppingBag />} />
          <StatCard title="Pending" value={stats.pending} icon={<ClipboardList />} />
          <StatCard title="Revenue" value={stats.revenue} icon={<BarChart2 />} />

        </div>

        <h2 className="text-3xl font-light mb-4">Quick Actions</h2>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">

          <ActionCard
            title="Manage Users"
            desc="View, edit, and delete platform users"
            link="/admin/users"
            icon={<Users className="text-amber-300" />}
          />

          <ActionCard
            title="Manage Orders"
            desc="Update order status & view documents"
            link="/admin/orders"
            icon={<ShoppingBag className="text-amber-300" />}
          />

          <ActionCard
            title="Admin Settings"
            desc="Change password and update credentials"
            link="/admin/settings"
            icon={<ClipboardList className="text-amber-300" />}
          />

        </div>

      </div>
    </div>
  );
}

function StatCard({ title, value, icon }) {
  return (
    <div className="rounded-2xl backdrop-blur-xl bg-indigo-900/25 border border-indigo-800/40 p-5 flex justify-between items-center shadow-xl">
      <div>
        <p className="text-gray-300 text-sm">{title}</p>
        <p className="text-3xl font-semibold mt-1">{value}</p>
      </div>
      <div className="p-3 rounded-full bg-indigo-700/40 text-white">
        {icon}
      </div>
    </div>
  );
}

function ActionCard({ title, desc, link, icon }) {
  return (
    <Link to={link}>
      <div className="rounded-2xl backdrop-blur-xl bg-indigo-900/30 border border-indigo-800/40 p-6 shadow-lg hover:bg-indigo-800/40 transition group cursor-pointer">

        <div className="flex items-center gap-4 mb-4">
          <div className="p-3 rounded-full bg-indigo-700/30">
            {icon}
          </div>
          <h3 className="text-xl font-medium">{title}</h3>
        </div>

        <p className="text-gray-300 mb-4">{desc}</p>

        <span className="flex items-center gap-2 text-amber-300 group-hover:gap-3 transition-all">
          Go to page <ArrowRight size={18} />
        </span>
      </div>
    </Link>
  );
}
