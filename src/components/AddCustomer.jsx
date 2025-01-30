'use client'
import React, { useState } from "react";
import axios from "axios";
import Swal from "sweetalert2"; // Import SweetAlert2

export default function AddCustomer() {
  const [name, setName] = useState("");
  const [phone, setPhone] = useState("");
  const [balance, setBalance] = useState(0);
  const [loading, setLoading] = useState(false);

  // Handle form submission
  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);

    // Input validation
    if (!name || !phone) {
      Swal.fire({
        icon: "error",
        title: "Input Error",
        text: "Name and phone are required",
      });
      setLoading(false);
      return;
    }

    try {
      const response = await axios.post("/api/customers", {
        name,
        phone,
        balance,
      });

      // Success alert
      Swal.fire({
        icon: "success",
        title: "Customer Added!",
        text: response.data.message,
      });

      // Clear the form after success
      setName("");
      setPhone("");
      setBalance(0);
    } catch (error) {
      Swal.fire({
        icon: "error",
        title: "Server Error",
        text: error.response?.data.message || "Error adding customer",
      });
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen bg-gray-100 flex justify-center items-center p-5">
      <div className="bg-white p-8 rounded-lg shadow-md w-full max-w-md">
        <h2 className="text-2xl font-semibold mb-5">Add New Customer</h2>
        <form onSubmit={handleSubmit}>
          <div className="mb-4">
            <label htmlFor="name" className="block text-sm font-medium text-gray-700">Name</label>
            <input
              type="text"
              id="name"
              value={name}
              onChange={(e) => setName(e.target.value)}
              className="mt-2 block w-full p-2 border border-gray-300 rounded-md"
              required
            />
          </div>

          <div className="mb-4">
            <label htmlFor="phone" className="block text-sm font-medium text-gray-700">Phone</label>
            <input
              type="text"
              id="phone"
              value={phone}
              onChange={(e) => setPhone(e.target.value)}
              className="mt-2 block w-full p-2 border border-gray-300 rounded-md"
              required
            />
          </div>

          <div className="mb-4">
            <label htmlFor="balance" className="block text-sm font-medium text-gray-700">Balance</label>
            <input
              type="number"
              id="balance"
              value={balance}
              onChange={(e) => setBalance(Number(e.target.value))}
              className="mt-2 block w-full p-2 border border-gray-300 rounded-md"
            />
          </div>

          <button
            type="submit"
            disabled={loading}
            className={`w-full p-2 mt-4 text-white font-semibold rounded-md ${loading ? 'bg-gray-400' : 'bg-blue-500 hover:bg-blue-600'}`}
          >
            {loading ? "Adding..." : "Add Customer"}
          </button>
        </form>
      </div>
    </div>
  );
}
