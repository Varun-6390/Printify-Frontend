import React, { useEffect, useState } from "react";
import axios from "axios";

export default function UserProfile() {
  const userId = localStorage.getItem("id");
  const [data, setData] = useState({});

  const handleFetch = async () => {
    const res = await axios.get(`${import.meta.env.VITE_API_URL}/api/user/${userId}`);
    setData(res.data);
  };

  useEffect(() => {
    handleFetch();
  }, []);

  return (
    <div className="relative min-h-screen text-white px-4 py-10 sm:px-8">

      {/* Background Spotlight */}
      <div className="absolute inset-0 bg-[radial-gradient(circle_at_center,rgba(0,255,180,0.18),transparent_70%)]"></div>
      <div className="absolute inset-0 bg-[radial-gradient(circle,transparent,rgba(0,0,0,0.85))]"></div>

      <div className="relative z-10 max-w-3xl mx-auto">

        {/* TITLE */}
        <h1 className="text-3xl sm:text-4xl font-light mb-8 tracking-wide text-center sm:text-left">
          My <span className="text-teal-300">Profile</span>
        </h1>

        {/* CARD */}
        <div className="
          p-6 sm:p-8 rounded-2xl 
          backdrop-blur-2xl bg-white/10 border border-white/20 shadow-xl
        ">

          {/* TOP SECTION */}
          <div className="
            flex flex-col sm:flex-row items-center sm:items-start gap-6 sm:gap-8
          ">

            {/* PROFILE IMAGE */}
            <img
              src={"https://ui-avatars.com/api/?name=" + data.name + "&size=128&background=0D8ABC&color=fff"}
              alt="Profile"
              className="w-24 h-24 sm:w-28 sm:h-28 rounded-full object-cover border border-white/20 shadow-md"
            />

            {/* INFO */}
            <div className="text-center sm:text-left">
              <h2 className="text-2xl sm:text-3xl font-semibold text-white break-words">
                {data.name}
              </h2>
              <p className="text-gray-300 text-sm sm:text-base break-all">
                {data.email}
              </p>
            </div>
          </div>

          {/* DETAILS */}
          <div className="mt-6 border-t border-white/10 pt-4 text-gray-300 text-center sm:text-left">

            <p className="text-sm sm:text-base">
              Account Created:{" "}
              <span className="text-white font-semibold">
                {data.createdAt && new Date(data.createdAt).toLocaleDateString()}
              </span>
            </p>

            {data.mobile && (
              <p className="mt-2 text-sm sm:text-base">
                Mobile:{" "}
                <span className="text-white font-semibold">
                  {data.mobile}
                </span>
              </p>
            )}
          </div>
        </div>
      </div>
    </div>
  );
}
