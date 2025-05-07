import React from "react";
import Navbar from "./Navbar.jsx";
import { FiBook, FiPlusCircle, FiHome } from "react-icons/fi";

export default function Layout({ children }) {
  return (
    <div className="min-h-screen flex bg-gray-100">
      <aside className="w-64 bg-white shadow-lg">
        <div className="p-6 text-2xl font-bold text-indigo-600">CourseGPT</div>
        <nav className="mt-10">
          <a
            href="/"
            className="flex items-center px-6 py-3 text-gray-700 hover:bg-indigo-50"
          >
            <FiHome className="mr-3 text-lg" /> Dashboard
          </a>
          <a
            href="#"
            className="flex items-center px-6 py-3 text-gray-700 hover:bg-indigo-50"
          >
            <FiBook className="mr-3 text-lg" /> My Courses
          </a>
          <a
            href="#"
            className="flex items-center px-6 py-3 text-gray-700 hover:bg-indigo-50"
          >
            <FiPlusCircle className="mr-3 text-lg" /> New Course
          </a>
        </nav>
      </aside>
      <div className="flex-1 flex flex-col">
        <Navbar />
        <main className="p-8 overflow-auto">{children}</main>
      </div>
    </div>
  );
}
