"use client";

import { useState } from "react";
import Sidebar from "@/components/Sidebar";
import Navbar from "@/components/Navbar";
import CustomerList from "@/components/customers/CustomerList";
import { FiUsers, FiFileText, FiDollarSign } from "react-icons/fi";
import { useCustomer } from "@/context/CustomerContext";
import OrderList from "@/components/orders/OrderList";

export default function Home() {
  const [activeSection, setActiveSection] = useState("dashboard");
  const [isSidebarOpen, setIsSidebarOpen] = useState(true); // ✅ Fix: Added sidebar state
  const { customers} = useCustomer();
  return (
    <div className="flex min-h-screen bg-gray-100">
      {/* Sidebar */}
      <Sidebar isOpen={isSidebarOpen} setActiveSection={setActiveSection} />

      {/* Main Content */}
      <div className="flex-1 flex flex-col">
        {/* Navbar */}
        <Navbar toggleSidebar={() => setIsSidebarOpen(!isSidebarOpen)} />

        {/* Content */}
        <div className="p-6">
          {activeSection === "dashboard" && (
            <>
              {/* Dashboard Stats */}
              <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mb-6">
                <div className="bg-white shadow-md p-4 rounded-lg flex items-center space-x-4">
                  <FiUsers className="text-blue-500 text-3xl" />
                  <div>
                    <h3 className="text-lg font-semibold">Total Customers</h3>
                    <p className="text-gray-600">{customers.length}</p>
                  </div>
                </div>
                <div className="bg-white shadow-md p-4 rounded-lg flex items-center space-x-4">
                  <FiDollarSign className="text-green-500 text-3xl" />
                  <div>
                    <h3 className="text-lg font-semibold">Total Revenue</h3>
                    <p className="text-gray-600">$15,230</p>
                  </div>
                </div>
                <div className="bg-white shadow-md p-4 rounded-lg flex items-center space-x-4">
                  <FiFileText className="text-red-500 text-3xl" />
                  <div>
                    <h3 className="text-lg font-semibold">Pending Bills</h3>
                    <p className="text-gray-600">5</p>
                  </div>
                </div>
              </div>
            </>
          )}

          {activeSection === "customers" && <CustomerList />}
          {activeSection === "orders" && <OrderList />}
        </div>
      </div>
    </div>
  );
}
