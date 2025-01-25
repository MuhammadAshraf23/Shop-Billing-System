'use client'
import React, { useEffect, useState } from "react";
import axios from "axios";
import { useRouter } from "next/navigation"; // For navigation
import { FaUser, FaPhoneAlt, FaBalanceScale } from "react-icons/fa";

export default function Home() {
  const [customers, setCustomers] = useState([]);
  const router = useRouter(); // For navigation

  useEffect(() => {
    const fetchCustomers = async () => {
      try {
        const response = await axios.get("/api/customers");
        setCustomers(response.data);
      } catch (error) {
        console.error("Error fetching customer data--->", error);
      }
    };
    fetchCustomers();
  }, []);

  return (
    <div className="min-h-screen bg-gray-100 p-5">
      <h1 className="text-3xl font-semibold mb-5">Customer Details</h1>
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-5">
        {customers.map((customer) => (
          <div
            key={customer.id}
            className="bg-white p-5 rounded-lg shadow-md hover:shadow-xl cursor-pointer"
            onClick={() => router.push(`/customer/${customer.id}`)} // Navigate to details page
          >
            <div className="flex items-center mb-3">
              <FaUser className="text-blue-500 mr-2" />
              <h2 className="text-xl font-bold">{customer.name}</h2>
            </div>
            <div className="flex items-center mb-3">
              <FaPhoneAlt className="text-green-500 mr-2" />
              <p>{customer.contact}</p>
            </div>
            <div className="flex items-center">
              <FaBalanceScale className="text-red-500 mr-2" />
              <p>Balance: Rs {customer.balance}</p>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}
