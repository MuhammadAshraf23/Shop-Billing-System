"use client";

import { 
  FiUsers, 
  FiFileText, 
  FiDollarSign, 
  FiCreditCard, 
  FiBox, 
  FiBarChart2, 
  FiLogOut 
} from "react-icons/fi";

const Sidebar = ({ isOpen, setActiveSection }) => {
  return (
    <aside
      className={`bg-blue-900 text-white w-64 space-y-6 py-6 px-4  h-full transition-transform duration-300 ${
        isOpen ? "translate-x-0" : "-translate-x-64"
      }`}
    >
      <h1 className="text-2xl font-bold text-center">Billing System</h1>
      <nav className="space-y-4">
        <button
          onClick={() => setActiveSection("dashboard")}
          className="flex items-center space-x-3 p-3 hover:bg-blue-800 rounded-lg w-full"
        >
          <FiFileText />
          <span>Dashboard</span>
        </button>
        <button
          onClick={() => setActiveSection("customers")}
          className="flex items-center space-x-3 p-3 hover:bg-blue-800 rounded-lg w-full"
        >
          <FiUsers />
          <span>Customers</span>
        </button>
        <button
          onClick={() => setActiveSection("billing")}
          className="flex items-center space-x-3 p-3 hover:bg-blue-800 rounded-lg w-full"
        >
          <FiDollarSign />
          <span>Billing</span>
        </button>
        <button
          onClick={() => setActiveSection("invoices")}
          className="flex items-center space-x-3 p-3 hover:bg-blue-800 rounded-lg w-full"
        >
          <FiFileText />
          <span>Invoices</span>
        </button>
        <button
          onClick={() => setActiveSection("payments")}
          className="flex items-center space-x-3 p-3 hover:bg-blue-800 rounded-lg w-full"
        >
          <FiCreditCard />
          <span>Payments</span>
        </button>
        <button
          onClick={() => setActiveSection("products")}
          className="flex items-center space-x-3 p-3 hover:bg-blue-800 rounded-lg w-full"
        >
          <FiBox />
          <span>Products</span>
        </button>
        <button
          onClick={() => setActiveSection("reports")}
          className="flex items-center space-x-3 p-3 hover:bg-blue-800 rounded-lg w-full"
        >
          <FiBarChart2 />
          <span>Reports</span>
        </button>
        
        <button
          onClick={() => alert("Logging out...")}
          className="flex items-center space-x-3 p-3 hover:bg-red-700 rounded-lg w-full"
        >
          <FiLogOut />
          <span>Logout</span>
        </button>
      </nav>
    </aside>
  );
};

export default Sidebar;
