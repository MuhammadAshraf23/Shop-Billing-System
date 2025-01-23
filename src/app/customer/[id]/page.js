"use client";
import React, { useState } from "react";
import { useParams } from "next/navigation"; // For dynamic route
import axios from "axios";

export default function CustomerDetails() {
  const { id } = useParams(); // Extract customer ID from URL
  const [customer, setCustomer] = useState({});
  const [formRows, setFormRows] = useState(
    Array.from({ length: 10 }, (_, index) => ({
      sNo: index + 1,
      quantity: "",
      product: "",
      rate: "",
      amount: "",
    }))
  );

  // Fetch specific customer details
  React.useEffect(() => {
    const fetchCustomerDetails = async () => {
      try {
        const response = await axios.get(`/customer/${id}`);
        setCustomer(response.data);
      } catch (error) {
        console.error("Error fetching customer details", error);
      }
    };
    fetchCustomerDetails();
  }, [id]);

  const handleInputChange = (index, field, value) => {
    const updatedRows = [...formRows];
    updatedRows[index][field] = value;

    // Automatically calculate amount
    if (field === "quantity" || field === "rate") {
      updatedRows[index].amount =
        updatedRows[index].quantity * updatedRows[index].rate || "";
    }

    setFormRows(updatedRows);
  };

  const handleSubmit = async () => {
    try {
      await axios.post(`/api/customers/add`, {
        customerId: id,
        products: formRows,
      });
      alert("Products added successfully!");
    } catch (error) {
      console.error("Error adding products", error);
      alert("Failed to add products.");
    }
  };

  // Calculate total amount
  const calculateTotalAmount = () => {
    return formRows.reduce((total, row) => {
      return total + (parseFloat(row.amount) || 0);
    }, 0);
  };

  return (
    <div className="min-h-screen bg-gray-100 p-5">
      <h1 className="text-3xl font-semibold mb-5">Customer: {customer.name}</h1>
      <div className="bg-white p-5 rounded-lg shadow-md">
        <p>
          <strong>Contact:</strong> {customer.contact}
        </p>
        <p>
          <strong>Balance:</strong> ₹{customer.balance}
        </p>
      </div>

      <button
        className="mt-5 px-4 py-2 bg-blue-500 text-white rounded shadow hover:bg-blue-600"
        onClick={() => setFormRows(formRows)}
      >
        Add Products
      </button>

      <div className="mt-5 overflow-x-auto">
        <table className="table-auto w-full bg-white rounded-lg shadow-md">
          <thead>
            <tr className="bg-gray-200">
              <th className="px-2 py-2 w-8 text-center ">S.No</th>
              <th className="px-2 py-2 w-16 text-center">Quantity</th>
              <th className="px-2 py-2 w-64 text-center">Product</th>
              <th className="px-2 py-2 w-24 text-center">Rate</th>
              <th className="px-2 py-2 w-24 text-center">Amount</th>
            </tr>
          </thead>
          <tbody>
            {formRows.map((row, index) => (
              <tr key={index}>
                <td className="px-4 py-2 text-center">{row.sNo}</td>
                <td className="px-4 max-sm:px-0 w-24 py-2">
                  <input
                    type="number"
                    value={row.quantity}
                    onChange={(e) =>
                      handleInputChange(index, "quantity", e.target.value)
                    }
                    className="border border-gray-300 p-2 w-full rounded"
                  />
                </td>
                <td className="px-4 py-2 max-sm:px-0">
                  <input
                    type="text"
                    value={row.product}
                    onChange={(e) =>
                      handleInputChange(index, "product", e.target.value)
                    }
                    className="border border-gray-300 p-2 w-full rounded"
                  />
                </td>
                <td className="px-4 py-2 max-sm:px-0">
                  <input
                    type="number"
                    value={row.rate}
                    onChange={(e) =>
                      handleInputChange(index, "rate", e.target.value)
                    }
                    className="border border-gray-300 p-2 w-full rounded"
                  />
                </td>
                <td className="px-4 py-2 text-center">{row.amount || "-"}</td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>

      {/* Total Amount */}
      <div className="mt-5 text-right">
        <strong>Total Amount: ₹{calculateTotalAmount()}</strong>
      </div>

      <button
        className="mt-5 px-4 py-2 bg-green-500 text-white rounded shadow hover:bg-green-600"
        onClick={handleSubmit}
      >
        Submit
      </button>
    </div>
  );
}
