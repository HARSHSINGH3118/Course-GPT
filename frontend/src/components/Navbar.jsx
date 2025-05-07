// frontend/src/components/Navbar.jsx
import React from "react";
import { useContext } from "react";
import { AuthContext } from "../context/AuthContext.jsx";
import { Link } from "react-router-dom";

function Navbar() {
  const { token, logout } = useContext(AuthContext);
  return (
    <nav className="flex justify-between items-center p-4 bg-gray-800 text-white">
      <Link to="/" className="text-xl font-bold">
        CourseGPT
      </Link>
      <div className="space-x-4">
        {token ? (
          <button onClick={logout} className="bg-red-500 px-3 py-1 rounded">
            Logout
          </button>
        ) : (
          <>
            <Link to="/login" className="hover:underline">
              Login
            </Link>
            <Link to="/register" className="hover:underline">
              Register
            </Link>
          </>
        )}
      </div>
    </nav>
  );
}

// <-- this is required for `import Navbar from './components/Navbar'`
export default Navbar;
