// context/AuthContext.js
"use client";
import React, { createContext, useContext, useState, useEffect } from "react";
import { getCookie } from "cookies-next";
import { useRouter } from "next/navigation";

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

export const withAuth = (Component) => {
  const AuthenticatedComponent = (props) => {
    const { user } = useContext(AuthContext);
    console.log("user:", { user });
    const router = useRouter();

    // Check if user is not logged in and redirect to login page
    if (!user) {
      router.push("/user/login");
    }

    // Render the component if user is logged in
    return user ? <Component {...props} /> : null;
  };

  return AuthenticatedComponent;
};
