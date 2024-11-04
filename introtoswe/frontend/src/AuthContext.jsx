import React, { createContext, useContext, useState, useEffect } from "react";

// Create the AuthContext
const AuthContext = createContext();

// AuthProvider component that wraps your app and manages authentication state
export function AuthProvider({ children }) {
  const [isAuthenticated, setIsAuthenticated] = useState(false);

  // Check for token in localStorage on initial load
  useEffect(() => {
    const token = localStorage.getItem("token");
    setIsAuthenticated(!!token); // Set authentication state based on token existence
  }, []);

  const login = (token) => {
    localStorage.setItem("token", token); // Save token to localStorage
    setIsAuthenticated(true); // Update authentication state
  };

  const logout = () => {
    localStorage.removeItem("token"); // Clear token from localStorage
    setIsAuthenticated(false); // Update authentication state
  };

  return (
    <AuthContext.Provider value={{ isAuthenticated, login, logout }}>
      {children}
    </AuthContext.Provider>
  );
}

// Custom hook to access auth context
export function useAuth() {
  return useContext(AuthContext);
}
