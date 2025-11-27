// src/pages/admin/AdminOrderDetails.jsx
import React, { useEffect, useState } from "react";
import axios from "axios";
import { useParams } from "react-router-dom";

export default function AdminOrderDetails() {
  const { id } = useParams();
  const [order, setOrder] = useState(null);

useEffect(() => {
  axios
    .get(`${import.meta.env.VITE_API_URL}/api/order/order/${id}`)
    .then((res) => setOrder(res.data))
    .catch((err) => console.log("Error fetching order:", err));
}, [id]);


const updateStatus = async (newStatus) => {
  await axios.put(`${import.meta.env.VITE_API_URL}/api/order/status/${id}`, {
    status: newStatus,
  });
  alert("Status updated!");

  // refresh order instantly
  const res = await axios.get(`${import.meta.env.VITE_API_URL}/api/order/order/${id}`);
  setOrder(res.data);
};


  if (!order) return <p className="text-white p-6">Loading...</p>; 

  return (
    <div className="p-6 text-white">

      <div className="rounded-2xl p-8 backdrop-blur-xl bg-indigo-900/30 border border-indigo-800/40 shadow-lg max-w-2xl">

        <h2 className="text-2xl font-semibold mb-4">
          Order #{order._id.slice(-6)}
        </h2>

        <p className="text-slate-300 text-sm mb-4">
          Placed on: {new Date(order.createdAt).toLocaleDateString()}
        </p>

        <h3 className="font-semibold text-lg mb-2">User Info</h3>
        <p className="text-slate-300">{order.user?.name}</p>
        <p className="text-slate-300">{order.user?.email}</p>

        <h3 className="font-semibold text-lg mt-6 mb-2">Print Options</h3>
        <ul className="text-slate-300 text-sm space-y-1">
          <li>Copies: {order.printOptions.copies}</li>
          <li>Color: {order.printOptions.color}</li>
          <li>Sides: {order.printOptions.sides}</li>
          <li>Status: {order.printOptions.status}</li>
          <li>Price: ₹{order.printOptions.price}</li>
        </ul>

        <a
          href={order.fileURL}
          className="block mt-4 text-indigo-300 hover:underline"
          target="_blank"
        >
          View Uploaded File
        </a>

        {/* Status Update */}
        <select
          className="mt-6 p-3 rounded-lg bg-indigo-900/40 border border-indigo-800/40"
          onChange={(e) => updateStatus(e.target.value)}
          defaultValue={order.printOptions.status}
        >
          <option value="pending">Pending</option>
          <option value="completed">Completed</option>
          <option value="cancelled">Cancelled</option>
        </select>

      </div>
    </div>
  );
}
