"use client";

import { useRouter } from "next/navigation";
import { useState, useEffect, useContext } from "react";
import { useCustomer } from "@/context/CustomerContext";
export default function OrderForm() {
  const [customerName, setCustomerName] = useState("");
  const [products, setProducts] = useState([{ name: "", quantity: 1, rate: 0 }]);
  const [customers, setCustomers] = useState([]); // Store customers fetched from DB
  const [fetchingCustomers, setFetchingCustomers] = useState(true); // Loading state for customers
  const router = useRouter();
  const {error,loading ,setLoading,setError}=useCustomer();
  // Fetch customers from the backend
  useEffect(() => {
    async function fetchCustomers() {
      try {
        const res = await fetch("/api/customers");
        if (!res.ok) throw new Error("Failed to fetch customers");

        const data = await res.json();
        setCustomers(data);
      } catch (err) {
        setError(err.message);
      } finally {
        setFetchingCustomers(false);
      }
    }
    fetchCustomers();
  }, []);

  const handleProductChange = (index, field, value) => {
    const updatedProducts = [...products];
    updatedProducts[index][field] = value;
    setProducts(updatedProducts);
  };

  const addProduct = () => {
    setProducts([...products, { name: "", quantity: 1, rate: 0 }]);
  };

  const removeProduct = (index) => {
    setProducts(products.filter((_, i) => i !== index));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    setError("");

    try {
      const res = await fetch("/api/orders/add", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          customerName, 
          products: products.map((item) => ({
            ...item,
            rate: parseFloat(item.rate),
            quantity: parseInt(item.quantity, 10),
          })),
        }),
      });

      const data = await res.json();
      if (!res.ok) throw new Error(data.message);

      alert("Order placed successfully!");
      setCustomerName("");
      setProducts([{ name: "", quantity: 1, rate: 0 }]);
      router.push("/");
    } catch (err) {
      setError(err.message);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="p-4 border rounded-lg shadow-md bg-white">
      <h2 className="text-xl font-semibold mb-4">Create Order</h2>
      {error && <p className="text-red-500">{error}</p>}
      
      <form onSubmit={handleSubmit}>
        {/* Customer Name Dropdown */}
        {fetchingCustomers ? (
          <p>Loading customers...</p>
        ) : (
          <select
            value={customerName}
            onChange={(e) => setCustomerName(e.target.value)}
            className="border p-2 rounded w-full mb-2"
          >
            <option value="">Select Customer</option>
            {customers.map((customer) => (
              <option key={customer._id} value={customer.name}>
                {customer.name}
              </option>
            ))}
          </select>
        )}

        {/* Products Input Fields */}
        {products.map((product, index) => (
          <div key={index} className="mb-3">
            <input
              type="text"
              placeholder="Product Name"
              value={product.name}
              onChange={(e) => handleProductChange(index, "name", e.target.value)}
              className="border p-2 rounded w-full mb-1"
            />
            <input
              type="number"
              placeholder="Quantity"
              value={product.quantity}
              onChange={(e) => handleProductChange(index, "quantity", e.target.value)}
              className="border p-2 rounded w-full mb-1"
            />
            <input
              type="number"
              placeholder="Rate"
              value={product.rate}
              onChange={(e) => handleProductChange(index, "rate", e.target.value)}
              className="border p-2 rounded w-full mb-1"
            />
            <button type="button" onClick={() => removeProduct(index)} className="text-red-500">
              Remove
            </button>
          </div>
        ))}

        <button type="button" onClick={addProduct} className="text-blue-500 mb-3">
          + Add Product
        </button>

        <button type="submit" className="bg-blue-600 text-white px-4 py-2 rounded-lg">
          {loading ? "Placing..." : "Place Order"}
        </button>
      </form>
    </div>
  );
}
