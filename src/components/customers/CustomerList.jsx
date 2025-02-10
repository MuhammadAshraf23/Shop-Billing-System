"use client";

import { useCustomer } from "@/context/CustomerContext";
import { useRouter } from "next/navigation";

const CustomerList = () => {
  const { customers, loading, error } = useCustomer();
  const router = useRouter();

  if (loading) {
    return (
      <div className="flex justify-center items-center h-40">
        <div className="animate-spin rounded-full h-10 w-10 border-t-4 border-blue-500"></div>
      </div>
    );
  }

  if (error) {
    return (
      <div className="flex items-center justify-center text-red-500 bg-red-100 p-4 rounded-md">
        ❌ Error: {error}
      </div>
    );
  }

  return (
    <div className="max-w-3xl mx-auto p-6">
      {/* Heading and Add Customer Button */}
      <div className="flex justify-between items-center mb-6">
        <h2 className="text-2xl font-semibold">Customer List</h2>
        <button
          onClick={() => router.push("/customers/add")}
          className="px-4 py-2 bg-blue-600 text-white rounded-lg shadow-md hover:bg-blue-700 transition duration-300"
        >
          + Add Customer
        </button>
      </div>

      {/* Customer List */}
      {customers.length === 0 ? (
        <p className="text-center text-gray-500">No customers found.</p>
      ) : (
        <div className="grid gap-4">
          {customers.map((customer) => (
            <div
              key={customer._id}
              className="p-4 bg-white shadow-md rounded-lg border flex justify-between items-center cursor-pointer hover:shadow-lg hover:scale-105 transition-transform duration-300"
            >
              <div>
                <h3 className="text-lg font-semibold">{customer.name}</h3>
                <p className="text-sm text-gray-500">📞 {customer.phone}</p>
                <p className="text-sm font-semibold text-green-600">
                  💰 Balance: ${customer.balance}
                </p>
              </div>
              <button
                onClick={() => router.push(`/customers/${customer._id}`)}
                className="px-3 py-1 bg-gray-200 rounded-md hover:bg-gray-300 transition"
              >
                View Details
              </button>
            </div>
          ))}
        </div>
      )}
    </div>
  );
};

export default CustomerList;
