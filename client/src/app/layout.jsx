"use client";
import React, { useEffect, useState } from "react";
import Head from "next/head";
import NavBar from "./components/navbar";
import Footer from "./components/footer";
import "./globals.css";
import { getCookie } from "cookies-next";
import { Inter } from "next/font/google";
import { AuthProvider } from "./utils/authContext";

const inter = Inter({ subsets: ["latin"] });

export default function RootLayout({ children }) {
  const [user, setUser] = useState(null);

  useEffect(() => {
    // Assuming 'user' is the name of the cookie where user data is stored
    const userData = getCookie("user");
    if (userData) {
      setUser(JSON.parse(userData));
    }
  }, []);

  return (
    <>
      <Head>
        <meta charSet="UTF-8" />
        <meta httpEquiv="X-UA-Compatible" content="IE=edge" />
        <meta name="viewport" content="width=device-width, initial-scale=1.0" />
        <title>title</title>
      </Head>
      <html lang="en">
        <body className={inter.className}>
          <AuthProvider>
            <NavBar />
            <div className="container mt-4">{children}</div>
          </AuthProvider>
          <Footer />
        </body>
      </html>
    </>
  );
}
