import React from "react";
import Navbar from "../components/Navbar";
import Footer from "../components/Footer";
import { Link } from "react-router-dom";

const UserHome = () => {
  return (
    <>
      <Navbar />

      {/* HERO SECTION */}
      <div className="relative w-full min-h-screen bg-black flex items-center justify-center overflow-hidden px-6">

        {/* Spotlight Glow */}
        <div className="absolute inset-0 bg-[radial-gradient(circle_at_center,rgba(0,255,200,0.25),transparent_70%)]"></div>

        {/* Vignette */}
        <div className="absolute inset-0 bg-[radial-gradient(circle,transparent,rgba(0,0,0,0.75))]"></div>

        {/* CONTENT */}
        <div className="relative z-10 text-center max-w-5xl">
          <h1 className="text-white text-4xl md:text-6xl lg:text-7xl font-light leading-tight">
            We Make <span className="text-teal-300 font-normal">Printing</span><br />
            Fast, Easy & Delivered<br />
            <span className="italic font-semibold">Right to You.</span>
          </h1>

          <p className="text-gray-300 mt-6 text-base md:text-xl max-w-xl mx-auto">
            Upload your documents and get high-quality prints delivered to your doorstep in no time.
            Simple, instant and affordable.
          </p>

          <div className="mt-10 flex justify-center">
            <Link to="/UserLogin">
              <button
                className="backdrop-blur-xl bg-white/10 border border-white/20 
                         px-10 py-4 rounded-xl text-white text-xl hover:bg-white/20 
                         transition shadow-lg"
              >
                Get Started – Upload Your File
              </button>
            </Link>
          </div>
        </div>
      </div>

      {/* FEATURES SECTION */}
      <section className="bg-black py-20 px-6 md:px-20 text-white">
        <h2 className="text-3xl md:text-5xl font-semibold text-center mb-12">
          Why Choose Us?
        </h2>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-10 text-center">
          <div className="p-6 bg-white/10 border border-white/10 rounded-xl backdrop-blur-xl hover:bg-white/20 transition">
            <h3 className="text-2xl mb-3 text-teal-300">Fast Delivery</h3>
            <p className="text-gray-300">
              Get your documents printed & delivered within hours.
            </p>
          </div>

          <div className="p-6 bg-white/10 border border-white/10 rounded-xl backdrop-blur-xl hover:bg-white/20 transition">
            <h3 className="text-2xl mb-3 text-teal-300">Premium Quality</h3>
            <p className="text-gray-300">
              Crystal clear prints using high-resolution machines.
            </p>
          </div>

          <div className="p-6 bg-white/10 border border-white/10 rounded-xl backdrop-blur-xl hover:bg-white/20 transition">
            <h3 className="text-2xl mb-3 text-teal-300">Affordable Rates</h3>
            <p className="text-gray-300">
              Prints starting at budget-friendly prices for everyone.
            </p>
          </div>
        </div>
      </section>

      {/* CALL TO ACTION */}
      <section className="bg-gradient-to-r from-black via-gray-900 to-black py-20 text-center">
        <h2 className="text-white text-3xl md:text-5xl mb-6 font-light">
          Ready to Print Something?
        </h2>
        <Link to="/UserLogin">
          <button
            className="backdrop-blur-xl bg-white/10 border border-white/20 
                     px-12 py-4 rounded-xl text-white text-xl hover:bg-white/20 
                     transition shadow-lg"
          >
            Upload Document
          </button>
        </Link>
      </section >

      <Footer />
    </>
  );
};

export default UserHome;
