// components/NavBar.js
"use client";

import { React, createContext, useContext } from "react";

import { useRouter } from "next/navigation";
import Container from "react-bootstrap/Container";
import Nav from "react-bootstrap/Nav";
import Navbar from "react-bootstrap/Navbar";
import NavDropdown from "react-bootstrap/NavDropdown";
import Image from "react-bootstrap/Image";

import { handleLogout } from "../utils/auth"; // adjust the path as necessary
import { AuthContext } from "../utils/authContext";

export default function NavBar() {
  const router = useRouter();

  const { user, setUser } = useContext(AuthContext);

  const title = (
    <div style={{ display: "flex", alignItems: "center" }}>
      {user && user.image_url ? (
        <Image
          src={user.image_url}
          alt="User Profile"
          style={{ width: "30px", height: "30px", marginRight: "5px" }}
          roundedCircle // Add this prop if you want the image to be circular
        />
      ) : (
        <Image
          src="https://i.imgur.com/e8buxpa.jpeg"
          alt="Default Image"
          style={{ width: "30px", height: "30px", marginRight: "5px" }}
          roundedCircle // Add this prop if you want the image to be circular
        />
      )}
      {user && <p className="fw-bold align-bottom">{user.full_name}</p>}
    </div>
  );

  const handleUserLogout = () => {
    handleLogout();
    setUser(null); // Update state to reflect logged out status
    router.push("/"); // Redirect to the home page
  };

  return (
    <Navbar expand="lg" className="bg-body-tertiary">
      <Container fluid>
        <Navbar.Brand href="/">
          <Image
            className="ms-3"
            src="https://images.squarespace-cdn.com/content/v1/6387732c01792d359b954e6f/e3933726-5fd7-43bf-9cfe-7b508d128121/Senpage+Consulting.png?format=1500w"
            alt="Senpage Consulting"
            style={{ height: "50px" }}
          />
        </Navbar.Brand>
        <Navbar.Toggle aria-controls="responsive-navbar-nav" />
        <Navbar.Collapse id="responsive-navbar-nav">
          <Nav className="me-auto fs-4">
            <Nav.Link href="/">Home</Nav.Link>
            <Nav.Link href="/about">About</Nav.Link>
            <Nav.Link href="/projects">Projects</Nav.Link>
            <Nav.Link href="/price">Pricing</Nav.Link>
            <Nav.Link href="/contact">Contact</Nav.Link>
            <Nav.Link href="#">Find us </Nav.Link>
          </Nav>
          <Nav placement="end" className="me-5">
            {user ? (
              <NavDropdown
                title={title}
                id="dropdown-menu-align-responsive-1s"
                className="me-5"
              >
                <NavDropdown.Item href={`/user/${user.id}`}>
                  Profile
                </NavDropdown.Item>
                <NavDropdown.Item href="#action/3.2">Settings</NavDropdown.Item>
                <NavDropdown.Divider />
                <NavDropdown.Item>
                  <button
                    className="btn btn-link nav-link"
                    onClick={handleUserLogout}
                  >
                    Logout
                  </button>
                </NavDropdown.Item>
              </NavDropdown>
            ) : (
              <Nav.Link href="/user/login" className="fs-4">
                Login
              </Nav.Link>
            )}
          </Nav>
        </Navbar.Collapse>
      </Container>
    </Navbar>
  );
}
