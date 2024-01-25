// pages/_app.js
"use client";
import React from "react";
import { AuthProvider } from "../app/utils/authContext";

function MyApp({ Component, pageProps }) {
  return (
    <AuthProvider>
      <Component {...pageProps} />
    </AuthProvider>
  );
}

export default MyApp;
