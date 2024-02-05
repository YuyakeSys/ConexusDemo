// components/NavBar.js
"use client";

import { useRouter } from "next/navigation";

import { React, createContext, useContext } from "react";
import { handleLogout } from "../utils/auth"; // adjust the path as necessary
import { AuthContext } from "../utils/authContext";

const NavUserContext = createContext();

export default function NavBar() {
  const router = useRouter();

  const { user, setUser } = useContext(AuthContext);
  const handleUserLogout = () => {
    handleLogout();
    setUser(null); // Update state to reflect logged out status
    router.push("/"); // Redirect to the home page
  };

  return (
    <nav className="navbar navbar-expand-lg bg-light">
      <div className="container-fluid">
        <a className="navbar-brand" href="/">
          <img
            src="https://images.squarespace-cdn.com/content/v1/6387732c01792d359b954e6f/e3933726-5fd7-43bf-9cfe-7b508d128121/Senpage+Consulting.png?format=1500w"
            alt="Senpage Consulting"
            style={{ height: "50px" }}
          />{" "}
          {/* Adjust the height as needed */}
        </a>

        <button
          className="navbar-toggler"
          type="button"
          data-bs-toggle="collapse"
          data-bs-target="#navbarNavDropdown"
          aria-controls="navbarNavDropdown"
          aria-expanded="false"
          aria-label="Toggle navigation"
        >
          <span className="navbar-toggler-icon"></span>
        </button>
        <div className="collapse navbar-collapse" id="navbarNavDropdown">
          <ul className="navbar-nav navbar-expand ms-auto">
            <li className="nav-item">
              <a className="nav-link active" aria-current="page" href="/">
                Home
              </a>
            </li>
            <li className="nav-item">
              <a className="nav-link" href="/about">
                About
              </a>
            </li>
            <li className="nav-item">
              <a className="nav-link" href="/projects">
                Projects
              </a>
            </li>
            <li className="nav-item">
              <a className="nav-link" href="#">
                Pricing
              </a>
            </li>
            <li className="nav-item">
              <a className="nav-link" href="#">
                Contact
              </a>
            </li>
            <li className="nav-item">
              <a className="nav-link" href="#">
                Find us
              </a>
            </li>
          </ul>
          <ul className="navbar-nav ms-auto">
            {user ? (
              <>
                <li className="nav-item">
                  <a className="nav-link" href={`/user/${user.id}`}>
                    {user.email}
                  </a>
                </li>
                <li className="nav-item">
                  <button
                    className="btn btn-link nav-link"
                    onClick={handleUserLogout}
                  >
                    Logout
                  </button>
                </li>
              </>
            ) : (
              <li className="nav-item">
                <a className="btn btn-success" href="/user/login">
                  Login
                </a>
              </li>
            )}
          </ul>
        </div>
      </div>
    </nav>
  );
}
