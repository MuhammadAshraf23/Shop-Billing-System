"use client";

import { createContext, useContext, useEffect, useState } from "react";

const CustomerContext = createContext();
export const CustomerProvider = ({ children }) => {
  const [customers, setCustomers] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");
  console.table("cutomers",customers)
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

  return (
    <CustomerContext.Provider value={{ customers, loading, error,setLoading,setError }}>
      {children}
    </CustomerContext.Provider>
  );
};

// Create a custom hook to use the context
export const useCustomer = () => {
  return useContext(CustomerContext);
};
