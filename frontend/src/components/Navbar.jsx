import React from "react";
import { Link } from "react-router-dom";
import { useContext } from "react";
import { AuthContext } from "../context/AuthContext.jsx";
import { FiLogOut } from "react-icons/fi";

export default function Navbar() {
  const { token, logout } = useContext(AuthContext);
  return (
    <header className="h-16 bg-white shadow flex items-center justify-between px-8">
      <div className="text-xl font-semibold text-gray-800">
        Welcome, {token ? "Educator" : "Guest"}
      </div>
      {token && (
        <button
          onClick={logout}
          className="flex items-center text-red-500 hover:text-red-600"
        >
          <FiLogOut className="mr-1" /> Logout
        </button>
      )}
    </header>
  );
}
