import React, { useState } from 'react';
import axios from 'axios';
import AnimatedPage from '../../components/AnimatedPage';

const UserLogin = () => {

  const [form, setForm] = useState({
    email: "",
    password: ""
  });

  const [loading, setLoading] = useState(false); // NEW STATE

  const handleChange = (e) => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true); // START LOADING

    try {
      const res = await axios.post(
        `${import.meta.env.VITE_API_URL}/api/user/login`,
        form
      );

      if (res.data.message === "Login Success") {
        alert("Login successfully");

        localStorage.setItem("role", res.data.user.role);
        localStorage.setItem("email", res.data.user.email);
        localStorage.setItem("id", res.data.user.id);
        localStorage.setItem("userName", res.data.user.name);

        window.location.href = '/UserDashboard';
      } else {
        alert("Enter correct details");
      }

    } catch (err) {
      alert("Login failed. Please try again.");
    }

    setLoading(false); // STOP LOADING
  };

  return (
    <AnimatedPage>
      <div className="min-h-screen bg-black flex items-center justify-center px-6 relative overflow-hidden">

        <div className="absolute inset-0 bg-[radial-gradient(circle_at_center,rgba(0,255,180,0.25),transparent_70%)]"></div>
        <div className="absolute inset-0 bg-[radial-gradient(circle,transparent,rgba(0,0,0,0.9))]"></div>

        <div className="relative z-10 w-full max-w-md backdrop-blur-xl bg-white/10 border border-white/20 shadow-2xl rounded-2xl p-8">

          <div className="text-center mb-8">
            <h1 className="text-4xl font-light text-white">Welcome Back</h1>
            <p className="text-gray-300 mt-2">Login to continue your printing journey.</p>
          </div>

          <form onSubmit={handleSubmit}>
            {/* Email */}
            <div className="mb-6">
              <label className="text-gray-300 block mb-2">Email Address</label>
              <input
                type="email"
                name="email"
                placeholder="you@example.com"
                onChange={handleChange}
                className="w-full px-4 py-3 bg-white/10 border border-white/20 text-white rounded-lg
                           placeholder-gray-400 focus:ring-2 focus:ring-teal-400 outline-none"
                required
              />
            </div>

            {/* Password */}
            <div className="mb-8">
              <label className="text-gray-300 block mb-2">Password</label>
              <input
                type="password"
                name="password"
                placeholder="••••••••"
                onChange={handleChange}
                className="w-full px-4 py-3 bg-white/10 border border-white/20 text-white rounded-lg
                           placeholder-gray-400 focus:ring-2 focus:ring-teal-400 outline-none"
                required
              />
            </div>

            {/* LOGIN BUTTON WITH LOADER */}
            <button
              type="submit"
              disabled={loading}
              className={`w-full py-3 rounded-lg text-lg font-semibold transition shadow-lg
                ${loading ? "bg-teal-300 cursor-not-allowed" : "bg-teal-400 hover:bg-teal-300 text-black"}
              `}
            >
              {loading ? (
                <div className="flex justify-center items-center gap-2">
                  <span className="w-5 h-5 border-2 border-black border-t-transparent rounded-full animate-spin"></span>
                  Logging in...
                </div>
              ) : (
                "Login"
              )}
            </button>
          </form>

          <p className="text-center text-gray-400 mt-6">
            Don't have an account?{" "}
            <a href="/Registration" className="text-teal-300 hover:text-teal-200 transition font-medium">
              Register
            </a>
          </p>

        </div>
      </div>
    </AnimatedPage>
  );
};

export default UserLogin;
