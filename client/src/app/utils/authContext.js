// context/AuthContext.js
"use client";
import React, { createContext, useContext, useState, useEffect } from "react";
import { getCookie } from "cookies-next";

export const AuthContext = createContext();

export const AuthProvider = ({ children }) => {
  const [user, setUser] = useState(null);

  useEffect(() => {
    // Load user from cookie at startup
    const userData = getCookie("user");
    if (userData) {
      setUser(JSON.parse(userData));
    }
  }, []);

  return (
    <AuthContext.Provider value={{ user, setUser }}>
      {children}
    </AuthContext.Provider>
  );
};
