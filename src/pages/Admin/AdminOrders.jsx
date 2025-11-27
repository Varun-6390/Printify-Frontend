// src/pages/admin/AdminOrders.jsx
import React, { useEffect, useState } from "react";
import { Eye, ChevronDown } from "lucide-react";
import axios from "axios";
import { Link } from "react-router-dom";

export default function AdminOrders() {
  const [orders, setOrders] = useState([]);
  const [filteredOrders, setFilteredOrders] = useState([]);

  const [sortStatus, setSortStatus] = useState("all");
  const [filterType, setFilterType] = useState(""); 

  const [openFilter, setOpenFilter] = useState(false);

  useEffect(() => {
    axios.get(`${import.meta.env.VITE_API_URL}/api/order`)  
      .then((res) => {
        setOrders(res.data);
        setFilteredOrders(res.data);
      });
  }, []);

  // SORT BY STATUS

  const handleSortChange = (value) => {
    setSortStatus(value);

    if (value === "all") {
      setFilteredOrders(orders);
    } else {
      setFilteredOrders(orders.filter(o => o.printOptions.status === value));
    }
  };

  // FILTER (cost/date)

  const applyFilter = (type) => {
    setFilterType(type);
    let sorted = [...filteredOrders];

    if (type === "cost_low") {
      sorted.sort((a, b) => a.printOptions.price - b.printOptions.price);
    }
    if (type === "cost_high") {
      sorted.sort((a, b) => b.printOptions.price - a.printOptions.price);
    }
    if (type === "date_new") {
      sorted.sort((a, b) => new Date(b.createdAt) - new Date(a.createdAt));
    }
    if (type === "date_old") {
      sorted.sort((a, b) => new Date(a.createdAt) - new Date(b.createdAt));
    }

    setFilteredOrders(sorted);
    setOpenFilter(false);
  };

  const getColor = (status) => {
    if (status === "completed") return "text-green-400";
    if (status === "pending") return "text-yellow-400";
    return "text-red-400";
  };

  return (
    <div className="p-6 text-white">

      <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center mb-8 gap-4">

        {/* SORT DROPDOWN */}
        <div>
          <label className="text-sm text-slate-300 mb-1 block">Sort by Status</label>
          <select
            value={sortStatus}
            onChange={(e) => handleSortChange(e.target.value)}
            className="bg-indigo-900/30 border border-indigo-700/50 p-2 rounded-lg text-white"
          >
            <option value="all">All</option>
            <option value="completed">Completed</option>
            <option value="pending">Pending</option>
            <option value="cancelled">Cancelled</option>
          </select>
        </div>

        {/* FILTER BUTTON */}
        <button
          onClick={() => setOpenFilter(!openFilter)}
          className="flex items-center gap-2 bg-indigo-900/30 border border-indigo-700/50 px-4 py-2 rounded-lg hover:bg-indigo-800/40 transition"
        >
          Filters <ChevronDown size={18} />
        </button>
      </div>


      {openFilter && (
        <div className="bg-indigo-900/30 border border-indigo-700/50 p-4 rounded-xl mb-6 space-y-4 backdrop-blur-xl">

          <h3 className="text-lg font-semibold mb-2">Filter Options</h3>

          <div className="space-y-2">

            <h4 className="text-slate-300 text-sm">Cost</h4>
            <div className="flex gap-3">
              <button
                onClick={() => applyFilter("cost_low")}
                className="px-3 py-1 bg-indigo-800/40 rounded-lg hover:bg-indigo-700/40 transition"
              >
                Low → High
              </button>
              <button
                onClick={() => applyFilter("cost_high")}
                className="px-3 py-1 bg-indigo-800/40 rounded-lg hover:bg-indigo-700/40 transition"
              >
                High → Low
              </button>
            </div>

            <h4 className="text-slate-300 text-sm mt-3">Date</h4>
            <div className="flex gap-3">
              <button
                onClick={() => applyFilter("date_new")}
                className="px-3 py-1 bg-indigo-800/40 rounded-lg hover:bg-indigo-700/40 transition"
              >
                Newest
              </button>
              <button
                onClick={() => applyFilter("date_old")}
                className="px-3 py-1 bg-indigo-800/40 rounded-lg hover:bg-indigo-700/40 transition"
              >
                Oldest
              </button>
            </div>
          </div>
        </div>
      )}


      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        {filteredOrders.map((o) => (
          <div
            key={o._id}
            className="rounded-2xl p-6 backdrop-blur-xl bg-indigo-900/20 border border-indigo-800/40 shadow-lg"
          >
            <div className="flex justify-between">
              <div>
                <h3 className="text-lg font-semibold">Order #{o._id.slice(-6)}</h3>
                <p className="text-sm text-slate-300">
                  {new Date(o.createdAt).toLocaleDateString()}
                </p>
              </div>

              <span className={`font-semibold ${getColor(o.printOptions.status)}`}>
                {o.printOptions.status}
              </span>
            </div>

            <p className="mt-2 text-slate-300 text-sm">
              {o.printOptions.copies} copies • {o.printOptions.color}
            </p>

            <div className="flex justify-between items-center mt-4">
              <div className="text-xl font-semibold">₹{o.printOptions.price}</div>

              <Link
                to={`/admin/orders/${o._id}`}
                className="p-2 rounded-lg hover:bg-indigo-800/40 transition"
              >
                <Eye size={20} className="text-indigo-200" />
              </Link>
            </div>
          </div>
        ))}
      </div>

    </div>
  );
}
