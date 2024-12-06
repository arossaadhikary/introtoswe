// src/components/Navbar.jsx
import { NavLink, useNavigate } from "react-router-dom";
import React, { useContext } from "react";
import { AuthContext } from "../context/AuthContext";

export default function Navbar() {
  const { currentUser, setCurrentUser } = useContext(AuthContext);
  const navigate = useNavigate();

  const handleLogout = () => {
    localStorage.removeItem("token"); // Clear token on logout
    setCurrentUser(null); // Update context
    navigate("/login"); // Redirect to login page
  };

  return (
    <nav className="flex justify-between items-center p-4 bg-gray-800 text-white">
      {/* Logo */}
      <NavLink to="/" className="text-xl font-bold flex items-center">
        <img alt="Logo" className="h-10 mr-2" src="/logo.svg" />
        EmployeesApp
      </NavLink>

      {/* Navigation Links */}
      <div className="flex space-x-4">
        <NavLink
          to="/"
          className={({ isActive }) =>
            `px-3 py-2 rounded-md text-sm font-medium ${
              isActive ? "bg-gray-700" : "hover:bg-gray-700"
            }`
          }
        >
          Home
        </NavLink>
        <NavLink
          to="/create"
          className={({ isActive }) =>
            `px-3 py-2 rounded-md text-sm font-medium ${
              isActive ? "bg-gray-700" : "hover:bg-gray-700"
            }`
          }
        >
          Create Listing
        </NavLink>

        {/* Conditional Links based on authentication */}
        {currentUser ? (
          <>
            <span className="px-3 py-2 rounded-md text-sm font-medium">
              Hello, {currentUser.username}
            </span>
            <button
              onClick={handleLogout}
              className="px-3 py-2 rounded-md text-sm font-medium hover:bg-gray-700"
            >
              Logout
            </button>
          </>
        ) : (
          <>
            <NavLink
              to="/login"
              className={({ isActive }) =>
                `px-3 py-2 rounded-md text-sm font-medium ${
                  isActive ? "bg-gray-700" : "hover:bg-gray-700"
                }`
              }
            >
              Login
            </NavLink>
            <NavLink
              to="/register"
              className={({ isActive }) =>
                `px-3 py-2 rounded-md text-sm font-medium ${
                  isActive ? "bg-gray-700" : "hover:bg-gray-700"
                }`
              }
            >
              Register
            </NavLink>
          </>
        )}
      </div>
    </nav>
  );
}
