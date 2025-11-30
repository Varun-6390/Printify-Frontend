import axios from "axios";
import React, { useState } from "react";

const ChangepassUser = () => {
  const userId = localStorage.getItem("id");
  const [form, setForm] = useState({ op: "", np: "", cnp: "" });

  const handleChange = (e) => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };

  const submitChange = async (e) => {
    e.preventDefault();

    try {
      const res = await axios.put(
        `${import.meta.env.VITE_API_URL}/api/user/change/${userId}`,
        form
      );
      alert("Password Updated Successfully!");
      setForm({ op: "", np: "", cnp: "" });
    } catch (err) {
      alert("Unable to update password. Try again.");
    }
  };

  return (
    <div className="relative min-h-screen flex items-center justify-center 
                    px-4 sm:px-6 md:px-8 py-10 text-white">

      {/* Background Glow */}
      <div className="absolute inset-0 bg-[radial-gradient(circle_at_center,rgba(0,255,180,0.15),transparent_70%)]"></div>
      <div className="absolute inset-0 bg-[radial-gradient(circle,transparent,rgba(0,0,0,0.88))]"></div>

      {/* CARD */}
      <div
        className="relative z-10 w-full max-w-lg 
                   p-6 sm:p-8 md:p-10
                   rounded-2xl backdrop-blur-2xl bg-white/10 
                   border border-white/20 shadow-2xl"
      >
        <h2
          className="text-3xl sm:text-4xl font-light text-center mb-6 sm:mb-8 tracking-wide"
        >
          Change <span className="text-teal-300">Password</span>
        </h2>

        <form onSubmit={submitChange} className="space-y-6">

          {/* OLD PASSWORD */}
          <div>
            <label className="text-gray-300 font-light text-sm sm:text-base">
              Old Password
            </label>
            <input
              type="password"
              name="op"
              value={form.op}
              onChange={handleChange}
              required
              className="mt-2 w-full px-3 sm:px-4 py-2.5 sm:py-3 rounded-lg 
                         bg-white/5 border border-white/20 text-white 
                         placeholder-gray-400 outline-none 
                         focus:ring-2 focus:ring-teal-300 focus:border-teal-300 transition"
            />
          </div>

          {/* NEW PASSWORD */}
          <div>
            <label className="text-gray-300 font-light text-sm sm:text-base">
              New Password
            </label>
            <input
              type="password"
              name="np"
              value={form.np}
              onChange={handleChange}
              required
              className="mt-2 w-full px-3 sm:px-4 py-2.5 sm:py-3 rounded-lg 
                         bg-white/5 border border-white/20 text-white 
                         placeholder-gray-400 outline-none 
                         focus:ring-2 focus:ring-teal-300 focus:border-teal-300 transition"
            />
          </div>

          {/* CONFIRM PASSWORD */}
          <div>
            <label className="text-gray-300 font-light text-sm sm:text-base">
              Confirm Password
            </label>
            <input
              type="password"
              name="cnp"
              value={form.cnp}
              onChange={handleChange}
              required
              className="mt-2 w-full px-3 sm:px-4 py-2.5 sm:py-3 rounded-lg 
                         bg-white/5 border border-white/20 text-white 
                         placeholder-gray-400 outline-none 
                         focus:ring-2 focus:ring-teal-300 focus:border-teal-300 transition"
            />
          </div>

          {/* BUTTON */}
          <button
            type="submit"
            className="w-full py-3 sm:py-3.5 text-base sm:text-lg 
                       rounded-lg font-semibold bg-teal-400 text-black 
                       hover:bg-teal-300 transition-all shadow-lg mt-4"
          >
            Update Password
          </button>
        </form>
      </div>
    </div>
  );
};

export default ChangepassUser;
