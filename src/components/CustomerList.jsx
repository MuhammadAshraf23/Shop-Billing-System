"use client";

import { useEffect, useState } from "react";
import { useRouter } from "next/navigation";

const CustomerList = () => {
  const [customers, setCustomers] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");
  const router = useRouter();

  useEffect(() => {
    const fetchCustomers = async () => {
      try {
        const res = await fetch("/api/customers");
        if (!res.ok) throw new Error("Failed to fetch customers");

        const data = await res.json();
        setCustomers(data);
      } catch (err) {
        setError(err.message);
      } finally {
        setLoading(false);
      }
    };

    fetchCustomers();
  }, []);

  if (loading) return <p>Loading customers...</p>;
  if (error) return <p className="text-red-500">Error: {error}</p>;

  return (
    <div className="p-4">
      <h2 className="text-xl font-semibold mb-4">Customer List</h2>
      {customers.length === 0 ? (
        <p>No customers found.</p>
      ) : (
        <ul className="space-y-3">
          {customers.map((customer) => (
            <li
              key={customer._id}
              className="p-3 bg-gray-100 rounded-lg cursor-pointer hover:bg-gray-200 transition"
              onClick={() => router.push(`/customers/${customer._id}`)}
            >
              <p><strong>Name:</strong> {customer.name}</p>
              <p><strong>Phone:</strong> {customer.phone}</p>
              <p><strong>Balance:</strong> ${customer.balance}</p>
            </li>
          ))}
        </ul>
      )}
    </div>
  );
};

export default CustomerList;
