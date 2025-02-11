"use client";

import Link from "next/link";
import { useEffect, useState } from "react";
import { useCustomer } from "@/context/CustomerContext"; // Import Global State

export default function OrderList() {
  const [orders, setOrders] = useState([]);
  const { customers, loading, error, setError, setLoading } = useCustomer();
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
            // Find the matching customer using `order.CusmtomerName`
            const customer = customers.find((c) => c._id === order.customerName);

            console.log("Matching Customer:", customer);

            return (
              <li key={order._id} className="p-4 border rounded-lg shadow-md bg-gray-50">
                <h3 className="text-lg font-semibold">🆔 Order ID: {order._id}</h3>
                <p className="text-gray-700">
                  👤 Customer ID:{" "}
                  <span className="font-medium">{customer ? customer._id : "Unknown"}</span>
                </p>
                <p className="text-gray-700">
                  👤 Customer Name:{" "}
                  <span className="font-medium">{customer ? customer.name : "Unknown"}</span>
                </p>
                <p className="text-gray-700">
                  📞 Contact: <span className="font-medium">{customer ? customer.phone : "N/A"}</span>
                </p>
                <p className="text-gray-900 font-semibold mt-2">
                  💰 Total Amount: <span className="text-green-600">${order.totalAmount}</span>
                </p>

                <h4 className="mt-3 font-semibold">📦 Ordered Products:</h4>
                <ul className="ml-5 mt-2 list-disc text-gray-800">
                  {order.products.map((product, index) => (
                    <li key={index} className="text-sm">
                      <span className="font-medium">{product.productName}</span> - {product.quantity} x 
                      <span className="font-semibold"> Rs{product.rate}</span> = 
                      <span className="text-green-600"> ${product.amount}</span>
                    </li>
                  ))}
                </ul>
              </li>
            );
          })}
        </ul>
      )}
    </div>
  );
}
