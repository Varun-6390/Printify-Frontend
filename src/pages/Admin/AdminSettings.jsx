// src/pages/admin/AdminSettings.jsx
import React, { useState } from "react";
import axios from "axios";

export default function AdminSettings() {
  const adminId = localStorage.getItem("id");
  const [form, setForm] = useState({ op: "", np: "", cnp: "" });

  const handleSubmit = async (e) => {
    e.preventDefault();

    const res = await axios.put(
      `${import.meta.env.VITE_API_URL}/api/admin/change/${adminId}`,
      form
    );

    alert(res.data);
  };

  return (
    <div className="p-8 text-white">

      <div className="rounded-2xl max-w-lg p-8 backdrop-blur-xl bg-indigo-900/30 border border-indigo-800/40 shadow-xl">

        <h2 className="text-2xl font-semibold mb-6">Change Password</h2>

        <form onSubmit={handleSubmit} className="space-y-6">

          <input
            type="password"
            placeholder="Old Password"
            className="w-full px-4 py-3 rounded-lg bg-indigo-900/20 border border-indigo-800/40 outline-none"
            onChange={(e) => setForm({ ...form, op: e.target.value })}
          />

          <input
            type="password"
            placeholder="New Password"
            className="w-full px-4 py-3 rounded-lg bg-indigo-900/20 border border-indigo-800/40 outline-none"
            onChange={(e) => setForm({ ...form, np: e.target.value })}
          />

          <input
            type="password"
            placeholder="Confirm Password"
            className="w-full px-4 py-3 rounded-lg bg-indigo-900/20 border border-indigo-800/40 outline-none"
            onChange={(e) => setForm({ ...form, cnp: e.target.value })}
          />

          <button
            type="submit"
            className="w-full py-3 bg-emerald-600 hover:bg-emerald-700 transition rounded-lg"
          >
            Update Password
          </button>

        </form>

      </div>

    </div>
  );
}
