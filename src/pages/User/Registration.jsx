import React, { useState } from 'react';
import axios from 'axios';
import AnimatedPage from '../../components/AnimatedPage';

const Registration = () => {
  const [form, setForm] = useState({
    name: '',
    email: '',
    password: '',
    mobile: ''
  });

  const handleChanges = (e) => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      const res = await axios.post(`${import.meta.env.VITE_API_URL}/api/user`, form);
      console.log(res.data);
      alert("Registered Successfully!");
    } catch (er) {
      console.log(er);
      alert("Something went wrong! Try again later");
    }
  };

  return (
    <AnimatedPage>
      {/* FULL PAGE BACKGROUND */}
      <div className="min-h-screen bg-black flex items-center justify-center px-6 relative overflow-hidden">

        {/* Spotlight Glow */}
        <div className="absolute inset-0 bg-[radial-gradient(circle_at_center,rgba(0,255,180,0.25),transparent_70%)]"></div>

        {/* Vignette */}
        <div className="absolute inset-0 bg-[radial-gradient(circle,transparent,rgba(0,0,0,0.9))]"></div>

        {/* REGISTRATION CARD */}
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
                placeholder="John Doe"
                onChange={handleChanges}
                className="w-full px-4 py-3 bg-white/10 border border-white/20 text-white
                           rounded-lg placeholder-gray-400 focus:ring-2 focus:ring-teal-400 outline-none"
              />
            </div>

            {/* Email */}
            <div className="mb-5">
              <label className="text-gray-300 block mb-2">Email Address</label>
              <input
                type="email"
                name="email"
                placeholder="you@example.com"
                onChange={handleChanges}
                className="w-full px-4 py-3 bg-white/10 border border-white/20 text-white
                           rounded-lg placeholder-gray-400 focus:ring-2 focus:ring-teal-400 outline-none"
              />
            </div>

            {/* Mobile */}
            <div className="mb-5">
              <label className="text-gray-300 block mb-2">Mobile Number</label>
              <input
                type="tel"
                name="mobile"
                placeholder="9876543210"
                onChange={handleChanges}
                className="w-full px-4 py-3 bg-white/10 border border-white/20 text-white
                           rounded-lg placeholder-gray-400 focus:ring-2 focus:ring-teal-400 outline-none"
              />
            </div>

            {/* Password */}
            <div className="mb-8">
              <label className="text-gray-300 block mb-2">Password</label>
              <input
                type="password"
                name="password"
                placeholder="••••••••"
                onChange={handleChanges}
                className="w-full px-4 py-3 bg-white/10 border border-white/20 text-white
                           rounded-lg placeholder-gray-400 focus:ring-2 focus:ring-teal-400 outline-none"
              />
            </div>

            {/* Submit */}
            <button
              type="submit"
              className="w-full py-3 px-4 text-black text-lg font-semibold 
                         bg-teal-400 rounded-lg hover:bg-teal-300 transition shadow-lg"
            >
              Register
            </button>
          </form>

          {/* Login Redirect */}
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
