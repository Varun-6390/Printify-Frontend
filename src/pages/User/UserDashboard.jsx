import React, { useState } from "react";
import { motion } from "framer-motion";
import { Link, Outlet } from "react-router-dom";

import {
  Menu,
  X,
  User,
  ShoppingBag,
  ClipboardList,
  KeyRound,
  LogOut,
} from "lucide-react";

export default function Dashboard() {
  const [open, setOpen] = useState(false);

  const handleLogout = () => {
    localStorage.clear();
    window.location.href = "/";
  };

  const menuItems = [
    { title: "User Profile", icon: <User size={22} />, link: "/UserDashboard/UserProfile" },
    { title: "Orders", icon: <ShoppingBag size={22} />, link: "/UserDashboard/OrderPage" },
    { title: "Order Status", icon: <ClipboardList size={22} />, link: "/UserDashboard/OrderStatus" },
    { title: "Change Password", icon: <KeyRound size={22} />, link: "/UserDashboard/ChangePassword" },
    { title: "Logout", icon: <LogOut size={22} />, logout: true },
  ];

  return (
    <div className="min-h-screen flex bg-black relative overflow-hidden">

      {/* Background */}
      <div className="absolute inset-0 bg-[radial-gradient(circle_at_center,rgba(0,255,200,0.15),transparent_70%)]"></div>
      <div className="absolute inset-0 bg-[radial-gradient(circle,transparent,rgba(0,0,0,0.85))]"></div>

      {/* TOGGLE BUTTON */}
      <button
        onClick={() => setOpen(!open)}
        className="fixed top-4 left-4 z-[9999] p-3 backdrop-blur-xl 
                   bg-white/10 text-white rounded-full border border-white/20 shadow-lg
                   sm:p-2"
      >
        {open ? <X size={26} /> : <Menu size={26} />}
      </button>

      {/* SIDEBAR */}
      <motion.aside
        animate={{ width: open ? 250 : 70 }}  // Mobile-friendly width
        transition={{ duration: 0.25 }}
        className="h-screen fixed left-0 top-0 pt-20 p-4 z-40 flex flex-col 
                   backdrop-blur-xl bg-white/10 border-r border-white/20 shadow-xl"
      >
        {/* Title */}
        {open && (
          <h2 className="text-xl font-light text-white mb-8 ml-2 hidden sm:block">
            Dashboard
          </h2>
        )}

        {/* MENU */}
        <nav className="flex flex-col gap-3">
          {menuItems.map((item, index) =>
            item.logout ? (
              <button
                key={index}
                onClick={handleLogout}
                className={`flex items-center p-3 rounded-lg text-white 
                hover:bg-white/10 transition backdrop-blur-sm border border-transparent
                ${open ? "gap-3" : "justify-center"}`}
              >
                <span className="text-teal-300">{item.icon}</span>
                {open && <span className="text-lg font-light">{item.title}</span>}
              </button>
            ) : (
              <Link
                key={index}
                to={item.link}
                className={`flex items-center p-3 rounded-lg text-white 
                hover:bg-white/10 transition backdrop-blur-sm border border-transparent
                ${open ? "gap-3" : "justify-center"}`}
              >
                <span className="text-teal-300">{item.icon}</span>
                {open && <span className="text-lg font-light">{item.title}</span>}
              </Link>
            )
          )}
        </nav>
      </motion.aside>

      {/* MAIN CONTENT */}
      <main
        className={`flex-1 p-0 sm:p-10 transition-all duration-300 text-white z-10 
        ${open ? "ml-[260px]" : "ml-[80px]"} 
        sm:${open ? "ml-[260px]" : "ml-[90px]"}
        `}
      >
        <Outlet />
      </main>

    </div>
  );
}
