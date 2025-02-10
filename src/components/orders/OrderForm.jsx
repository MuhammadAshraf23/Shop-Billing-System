"use client";

import { useState } from "react";

export default function OrderForm({ refreshOrders }) {
  const [customerId, setCustomerId] = useState("");
  const [products, setProducts] = useState([{ name: "", quantity: 1, rate: 0 }]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");

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
        body: JSON.stringify({ customerId, products }),
      });

      const data = await res.json();
      if (!res.ok) throw new Error(data.message);

      alert("Order placed successfully!");
      setCustomerId("");
      setProducts([{ name: "", quantity: 1, rate: 0 }]);
      refreshOrders();
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
        <input
          type="text"
          placeholder="Customer ID"
          value={customerId}
          onChange={(e) => setCustomerId(e.target.value)}
          className="border p-2 rounded w-full mb-2"
        />
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
              onChange={(e) => handleProductChange(index, "quantity", Number(e.target.value))}
              className="border p-2 rounded w-full mb-1"
            />
            <input
              type="number"
              placeholder="Rate"
              value={product.rate}
              onChange={(e) => handleProductChange(index, "rate", Number(e.target.value))}
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
