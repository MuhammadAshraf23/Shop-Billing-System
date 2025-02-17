"use client";

import Link from "next/link";
import { useEffect, useState } from "react";
import { useCustomer } from "@/context/CustomerContext"; // Import Global State

export default function OrderList() {
 
  const { customers,orders,setOrders, loading, error, setError, setLoading } = useCustomer();

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
    <div className="p-6 border rounded-lg shadow-md bg-white mt-6">
      <h2 className="text-2xl font-bold mb-4">Order List</h2>

      <Link href="/orders">
        <button className="px-4 py-2 bg-blue-600 text-white rounded-lg shadow-md hover:bg-blue-700 transition duration-300">
          Add New Order
        </button>
      </Link>

      {orders.length === 0 ? (
        <p className="text-gray-500 mt-4">No orders found.</p>
      ) : (
        <ul className="mt-4 space-y-6">
          {orders.map((order) => {
            const customer = customers.find(
              (c) => c.name === order.customerName
            );

            return (
              <li key={order._id} className="p-4 border rounded-lg shadow-md bg-gray-50">
                <h3 className="text-lg font-semibold">🆔 Order ID: {order._id}</h3>
                <p className="text-gray-700">
                  👤 Customer ID:{" "}
                  <span className="font-medium">
                    {customer ? customer._id : "Unknown"}
                  </span>
                </p>
                <p className="text-gray-700">
                  👤 Customer Name:{" "}
                  <span className="font-medium">
                    {order.customerName || "Unknown"}
                  </span>
                </p>
                <p className="text-gray-700">
                  📞 Contact:{" "}
                  <span className="font-medium">
                    {customer?.phone || "N/A"}
                  </span>
                </p>
                <p className="text-gray-900 font-semibold mt-2">
                  💰 Total Amount:{" "}
                  <span className="text-green-600">Rs {order.totalAmount}</span>
                </p>
                <p className="text-gray-900 font-semibold mt-2">
                  📅 Date:{" "}
                  <span className="text-green-600">
                    {new Date(order.createdAt).toLocaleString("en-US", {
                      year: "2-digit",
                      month: "short",
                      day: "2-digit",
                      hour: "2-digit",
                      minute: "2-digit",
                      hour12: true,
                    })}
                  </span>
                </p>

                <h4 className="mt-3 font-semibold">📦 Ordered Products:</h4>
                <table className="mt-3 w-full border-collapse border border-gray-300">
                  <thead>
                    <tr className="bg-gray-100">
                      <th className="border border-gray-300 px-4 py-2 text-left">Product</th>
                      <th className="border border-gray-300 px-4 py-2 text-center">Qty</th>
                      <th className="border border-gray-300 px-4 py-2 text-center">Rate (Rs )</th>
                      <th className="border border-gray-300 px-4 py-2 text-center">Amount (Rs )</th>
                    </tr>
                  </thead>
                  <tbody>
                    {order.products.map((product, index) => (
                      <tr key={index} className="border border-gray-300">
                        <td className="border border-gray-300 px-4 py-2">{product.productName}</td>
                        <td className="border border-gray-300 px-4 py-2 text-center">{product.quantity}</td>
                        <td className="border border-gray-300 px-4 py-2 text-center font-semibold">Rs {product.rate}</td>
                        <td className="border border-gray-300 px-4 py-2 text-center text-green-600">Rs {product.amount}</td>
                      </tr>
                    ))}
                  </tbody>
                </table>
                 {/* Total Order Amount in Table */}
                 <p className="text-gray-900 font-semibold mt-3 text-right">
                  🏷️  Total Amount:
                  <span className="text-green-600">
                    Rs {order.totalAmount || "N/A"}
                  </span>
                </p>
              </li>
            );
          })}
        </ul>
      )}
    </div>
  );
}
