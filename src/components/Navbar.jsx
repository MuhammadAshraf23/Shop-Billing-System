"use client";

import { FiMenu } from "react-icons/fi";

const Navbar = ({ toggleSidebar }) => {
  return (
    <header className="bg-white shadow-md p-4 flex justify-between items-center">
      <button className="md:hidden text-blue-900" onClick={toggleSidebar}>
        <FiMenu size={24} />
      </button>
      <h2 className="text-2xl font-semibold">Dashboard</h2>
    </header>
  );
};

export default Navbar;
