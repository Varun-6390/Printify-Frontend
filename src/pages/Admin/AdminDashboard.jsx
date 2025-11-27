import { Outlet, useLocation } from "react-router-dom";
import React, { useState, useEffect } from "react";
import { motion } from "framer-motion";
import { Link } from "react-router-dom";
import axios from "axios";
import {
  Menu,
  X,
  Users,
  ShoppingBag,
  ClipboardList,
  KeyRound,
  LogOut,
  BarChart2,
  Eye
} from "lucide-react";

export default function AdminDashboard() {
  const [open, setOpen] = useState(false);
  const location = useLocation();
  const isHome = location.pathname === "/admin";

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


  const menuItems = [
    { title: "Overview", icon: <BarChart2 size={20} />, link: "/admin" },
    { title: "Users", icon: <Users size={20} />, link: "/admin/users" },
    { title: "Orders", icon: <ShoppingBag size={20} />, link: "/admin/orders" },
    { title: "Manage Price", icon: <ClipboardList size={20} />, link: "/admin/manageprice" },
    { title: "Change Password", icon: <KeyRound size={20} />, link: "/admin/settings" },
    { title: "View Site", icon: <Eye size={20} />, link: "/" },
  ];

  const handleLogout = () => {
    localStorage.clear();
    window.location.href = "/";
  };

  return (
    <div className="min-h-screen flex bg-gradient-to-b from-indigo-950 to-black relative text-slate-100">

      {/* Toggle Button */}
      <button
        onClick={() => setOpen(!open)}
        className="fixed top-4 left-4 z-[9999] p-2 rounded-full bg-indigo-700/60 border border-indigo-300/10 text-white shadow-lg"
      >
        {open ? <X size={20} /> : <Menu size={20} />}
      </button>

      {/* Sidebar */}
      <motion.aside
        animate={{ width: open ? 250 : 72 }}
        transition={{ duration: 0.25 }}
        className="fixed top-0 left-0 h-full z-40 bg-indigo-900/40 backdrop-blur-2xl border-r border-indigo-800/40 shadow-xl flex flex-col pt-20 pb-6"
      >
        {open && (
          <h2 className="text-2xl font-semibold text-amber-200 px-5 pb-3">
            Admin Panel
          </h2>
        )}

        <nav className="mt-4 flex flex-col gap-2 px-3">
          {menuItems.map((item, idx) => (
            <Link
              key={idx}
              to={item.link}
              className={`flex items-center rounded-lg text-slate-100 hover:bg-indigo-700/40 transition
                ${open ? "gap-4 px-4 py-3" : "justify-center py-3"}`}
            >
              {item.icon}
              {open && <span>{item.title}</span>}
            </Link>
          ))}

          <button
            onClick={handleLogout}
            className={`flex items-center rounded-lg text-red-300 hover:bg-red-700/30 transition mt-4
                ${open ? "gap-4 px-4 py-3" : "justify-center py-3"}`}
          >
            <LogOut size={20} />
            {open && <span>Logout</span>}
          </button>
        </nav>
      </motion.aside>

      {/* Main Content */}
      <main
        className={`flex-1 transition-all duration-300 p-6 lg:p-10 ${
          open ? "ml-[260px]" : "ml-[88px]"
        }`}
      >

        {isHome && (
          <>
            {/* Header */}
            <header className="flex items-center justify-between mb-8">
              <div>
                <h1 className="text-3xl lg:text-4xl font-light">
                  Admin <span className="text-amber-300 font-medium">Dashboard</span>
                </h1>
                <p className="text-sm text-slate-300 mt-1">
                  Welcome back — here’s a summary of activity.
                </p>
              </div>
            </header>

            <section className="grid grid-cols-1 md:grid-cols-4 gap-6 mb-8">
              <StatCard title="Total Users" value={stats.users} accent="from-indigo-500 to-indigo-700" icon={<Users />} />
              <StatCard title="Total Orders" value={stats.orders} accent="from-emerald-500 to-emerald-700" icon={<ShoppingBag />} />
              <StatCard title="Pending Orders" value={stats.pending} accent="from-amber-400 to-amber-600" icon={<ClipboardList />} />
              <StatCard title="Revenue" value={`₹${stats.revenue}`} accent="from-pink-500 to-pink-700" icon={<BarChart2 />} />
            </section>
          </>
        )}

        <Outlet />

      </main>
    </div>
  );
}

function StatCard({ title, value, accent, icon }) {
  return (
    <div className="rounded-2xl p-4 backdrop-blur-xl bg-indigo-900/25 border border-indigo-800/30 shadow">
      <div className="flex items-center justify-between">
        <div>
          <div className="text-sm text-slate-300">{title}</div>
          <div className="text-2xl font-semibold mt-2">{value}</div>
        </div>
        <div className={`p-3 rounded-full bg-gradient-to-br ${accent} text-white`}>
          {icon}
        </div>
      </div>
    </div>
  );
}
