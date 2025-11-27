import React, { useEffect, useState } from "react";

// Status Colors Matching Premium Theme
const getStatusClasses = (status) => {
  switch (status) {
    case "completed":
      return { text: "text-teal-300", dot: "bg-teal-400" };
    case "pending":
      return { text: "text-yellow-300", dot: "bg-yellow-400" };
    case "cancelled":
      return { text: "text-red-400", dot: "bg-red-500" };
    default:
      return { text: "text-gray-300", dot: "bg-gray-500" };
  }
};

const OrderStatus = () => {
  const [orders, setOrders] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const userId = localStorage.getItem("id");
    if (!userId) {
      setLoading(false);
      return;
    }

    fetch(`${import.meta.env.VITE_API_URL}/api/order/order?user=${userId}`)
      .then((res) => (res.ok ? res.json() : Promise.reject("Failed to fetch")))
      .then((data) => {
        setOrders(data);
        setLoading(false);
      })
      .catch((err) => {
        console.error(err);
        setOrders([]);
        setLoading(false);
      });
  }, []);

  return (
    <div className="relative min-h-screen p-8 text-white">

      {/* Background Glow */}
      <div className="absolute inset-0 bg-[radial-gradient(circle_at_center,rgba(0,255,180,0.18),transparent_70%)]"></div>
      <div className="absolute inset-0 bg-[radial-gradient(circle,transparent,rgba(0,0,0,0.88))]"></div>

      <div className="relative z-10 max-w-4xl mx-auto">
        
        <h1 className="text-4xl font-light mb-10 tracking-wide">
          My <span className="text-teal-300">Orders</span>
        </h1>

        {loading ? (
          <div className="text-center text-gray-300 text-lg">
            Loading your orders…
          </div>
        ) : orders.length === 0 ? (
          <div className="text-center text-gray-300 text-lg">
            No orders found.
          </div>
        ) : (
          <div className="space-y-8">
            {orders.map((order) => {
              const statusClasses = getStatusClasses(order.printOptions.status);

              return (
                <div
                  key={order._id}
                  className="p-6 rounded-xl backdrop-blur-xl bg-white/10 border border-white/20 shadow-xl"
                >
                  {/* TOP ROW */}
                  <div className="flex flex-col sm:flex-row justify-between sm:items-center border-b border-white/10 pb-4 mb-4">
                    
                    <div>
                      <p className="font-light text-xl text-white">
                        Order{" "}
                        <span className="text-teal-300">
                          #{order._id.slice(-6)}
                        </span>
                      </p>

                      <p className="text-sm text-gray-400 mt-1">
                        Placed on:{" "}
                        {new Date(order.createdAt).toLocaleDateString()}
                      </p>
                    </div>

                    <p className="text-2xl font-semibold text-teal-300 mt-3 sm:mt-0">
                      ₹{order.printOptions.price}
                    </p>
                  </div>

                  {/* STATUS + DETAILS */}
                  <div className="mb-4">
                    <div className="flex items-center gap-2 mb-2">
                      <span
                        className={`h-3 w-3 rounded-full ${statusClasses.dot}`}
                      ></span>
                      <span
                        className={`font-semibold capitalize ${statusClasses.text}`}
                      >
                        {order.printOptions.status}
                      </span>
                    </div>

                    <p className="text-gray-300 text-sm">
                      {order.printOptions.copies} copies ·{" "}
                      {order.printOptions.color === "bw" ? "B&W" : "Color"} ·{" "}
                      {order.printOptions.sides}-sided
                    </p>
                  </div>

                  {/* FILE LINK */}
                  <a
                    href={order.fileURL}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="text-teal-300 text-sm hover:text-teal-200 underline underline-offset-2 transition"
                  >
                    View Uploaded File
                  </a>
                </div>
              );
            })}
          </div>
        )}
      </div>
    </div>
  );
};

export default OrderStatus;
