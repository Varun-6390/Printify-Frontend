import React, { useState } from 'react';
import axios from 'axios';
import AnimatedPage from '../../components/AnimatedPage';
import { Eye, EyeOff } from "lucide-react";   // <-- for eye icons

const Registration = () => {

  const [form, setForm] = useState({
    name: '',
    email: '',
    password: '',
    mobile: ''
  });

  const [loading, setLoading] = useState(false);

  // SHOW/HIDE PASSWORD STATES
  const [showPassword, setShowPassword] = useState(false);

  const handleChanges = (e) => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);

    try {
      const res = await axios.post(
        `${import.meta.env.VITE_API_URL}/api/user`,
        form
      );

      alert("Registered Successfully!");
      setForm({ name: "", email: "", password: "", mobile: "" });

    } catch (er) {
      alert("Something went wrong! Try again later");
    }

    setLoading(false);
  };

  return (
    <AnimatedPage>
      <div className="min-h-screen bg-black flex items-center justify-center px-6 relative overflow-hidden">

        {/* Background */}
        <div className="absolute inset-0 bg-[radial-gradient(circle_at_center,rgba(0,255,180,0.25),transparent_70%)]"></div>
        <div className="absolute inset-0 bg-[radial-gradient(circle,transparent,rgba(0,0,0,0.9))]"></div>

        <div className="relative z-10 w-full max-w-md p-8 backdrop-blur-xl bg-white/10 border border-white/20 shadow-2xl rounded-2xl">

          <div className="text-center mb-8">
            <h1 className="text-4xl font-light text-white">Create Account</h1>
            <p className="text-gray-300 mt-2">Join us and start your journey!</p>
          </div>

          <form onSubmit={handleSubmit}>
            
            {/* Name */}
            <div className="mb-5">
              <label className="text-gray-300 block mb-2">Full Name</label>
              <input
                type="text"
                name="name"
                value={form.name}
                onChange={handleChanges}
                placeholder="John Doe"
                className="w-full px-4 py-3 bg-white/10 border border-white/20 text-white rounded-lg
                placeholder-gray-400 focus:ring-2 focus:ring-teal-400 outline-none"
                required
              />
            </div>

            {/* Email */}
            <div className="mb-5">
              <label className="text-gray-300 block mb-2">Email Address</label>
              <input
                type="email"
                name="email"
                value={form.email}
                onChange={handleChanges}
                placeholder="you@example.com"
                className="w-full px-4 py-3 bg-white/10 border border-white/20 text-white rounded-lg
                placeholder-gray-400 focus:ring-2 focus:ring-teal-400 outline-none"
                required
              />
            </div>

            {/* Mobile */}
            <div className="mb-5">
              <label className="text-gray-300 block mb-2">Mobile Number</label>
              <input
                type="tel"
                name="mobile"
                value={form.mobile}
                onChange={handleChanges}
                placeholder="9876543210"
                className="w-full px-4 py-3 bg-white/10 border border-white/20 text-white rounded-lg
                placeholder-gray-400 focus:ring-2 focus:ring-teal-400 outline-none"
                required
              />
            </div>

            {/* Password with Toggle */}
            <div className="mb-8 relative">
              <label className="text-gray-300 block mb-2">Password</label>

              <input
                type={showPassword ? "text" : "password"}
                name="password"
                value={form.password}
                onChange={handleChanges}
                placeholder="••••••••"
                className="w-full px-4 py-3 bg-white/10 border border-white/20 text-white rounded-lg
                placeholder-gray-400 focus:ring-2 focus:ring-teal-400 outline-none pr-12"
                required
              />

              {/* Eye Toggle */}
              <button
                type="button"
                onClick={() => setShowPassword(!showPassword)}
                className="absolute right-4 top-11 text-gray-300 hover:text-white"
              >
                {showPassword ? <EyeOff size={20} /> : <Eye size={20} />}
              </button>
            </div>

            {/* Submit */}
            <button
              type="submit"
              disabled={loading}
              className={`w-full py-3 text-lg font-semibold rounded-lg transition shadow-lg
                ${loading ? "bg-teal-300 cursor-not-allowed" : "bg-teal-400 hover:bg-teal-300 text-black"}
              `}
            >
              {loading ? (
                <div className="flex items-center justify-center gap-2">
                  <span className="w-5 h-5 border-2 border-black border-t-transparent rounded-full animate-spin"></span>
                  Registering...
                </div>
              ) : (
                "Register"
              )}
            </button>

          </form>

          {/* Login Link */}
          <p className="text-center text-gray-400 mt-6">
            Already have an account?{" "}
            <a href="/UserLogin" className="text-teal-300 hover:text-teal-200 transition font-medium">
              Log in
            </a>
          </p>

        </div>
      </div>
    </AnimatedPage>
  );
};

export default Registration;
