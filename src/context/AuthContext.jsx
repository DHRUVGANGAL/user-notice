// src/context/AuthContext.js
import React, { createContext, useState, useEffect } from 'react';

export const AuthContext = createContext();

export const AuthProvider = ({ children }) => {
  const [currentUser, setCurrentUser] = useState(null);
  const [loading, setLoading] = useState(true);
  const [token, setToken] = useState(localStorage.getItem('token') || '');

  // Check if user is logged in on initial load
  useEffect(() => {
    const storedToken = localStorage.getItem('token');
    if (storedToken) {
      setToken(storedToken);
      setLoading(false);
    } else {
      setLoading(false);
    }
  }, []);

  // Login function
  const login = (userData, authToken) => {
    setCurrentUser(userData);
    setToken(authToken);
    localStorage.setItem('token', authToken);
  };

  // Logout function
  const logout = () => {
    setCurrentUser(null);
    setToken('');
    localStorage.removeItem('token');
  };

  // Auth context value
  const value = {
    currentUser,
    token,
    loading,
    login,
    logout,
    isAuthenticated: !!token,
  };

  return <AuthContext.Provider value={value}>{children}</AuthContext.Provider>;
};