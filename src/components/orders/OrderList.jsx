"use client";

import { useEffect, useState } from "react";

export default function OrderList() {
  const [orders, setOrders] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");

  const fetchOrders = async () => {
    setLoading(true);
    setError("");

    try {
      const res = await fetch("/api/orders/add");
      if (!res.ok) throw new Error("Failed to fetch orders");

      const data = await res.json();
      setOrders(data);
    } catch (err) {
      setError(err.message);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchOrders();
  }, []);

  if (loading) return <p>Loading orders...</p>;
  if (error) return <p className="text-red-500">{error}</p>;

  return (
    <div className="p-4 border rounded-lg shadow-md bg-white mt-6">
      <h2 className="text-xl font-semibold mb-4">Order List</h2>
      {orders.length === 0 ? (
        <p className="text-gray-500">No orders found.</p>
      ) : (
        <ul className="space-y-4">
          {orders.map((order) => (
            <li key={order._id} className="p-3 border rounded shadow">
              <h3 className="font-semibold">Order ID: {order._id}</h3>
              <p>Customer ID: {order.customerId}</p>
              <p>Total Amount: <span className="font-bold">${order.totalAmount}</span></p>
              <ul className="ml-4 mt-2 list-disc">
                {order.products.map((product, index) => (
                  <li key={index}>
                    {product.name} - {product.quantity} x ${product.rate} = ${product.amount}
                  </li>
                ))}
              </ul>
            </li>
          ))}
        </ul>
      )}
    </div>
  );
}
