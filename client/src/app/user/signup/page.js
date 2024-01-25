// pages/login.js
"use client";
import { useState } from "react";
import { signUpUser } from "../../utils/auth";

export default function Login() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [repeatPassword, setRepeatPassword] = useState("");
  const [error, setError] = useState("");

  const handleSignUpUser = async () => {
    if (password != repeatPassword) {
      alert("Not the same password");
      return;
    }
    try {
      const response = await signUpUser(email, password);
      // Handle successful login, e.g., store tokens in local storage
    } catch (error) {
      setError(error);
    }
  };

  return (
    <div className="container mt-5">
      <div className="row justify-content-center">
        <div className="col-md-6">
          <h1 className="mb-3">Sign Up</h1>
          <div className="card p-4">
            <div className="card-body">
              <div className="mb-3">
                <label htmlFor="email" className="form-label">
                  Email
                </label>
                <input
                  type="email"
                  className="form-control"
                  id="email"
                  placeholder="Enter your email"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                />
              </div>
              <div className="mb-3">
                <label htmlFor="password" className="form-label">
                  Password
                </label>
                <input
                  type="password"
                  className="form-control"
                  id="password"
                  placeholder="Enter your password"
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                />
              </div>
              <div className="mb-3">
                <label htmlFor="repeatPassword" className="form-label">
                  Repeat Password
                </label>
                <input
                  type="password"
                  className="form-control"
                  id="repeatPassword"
                  placeholder="Repeat your password"
                  value={repeatPassword}
                  onChange={(e) => setRepeatPassword(e.target.value)}
                />
              </div>
              <button className="btn btn-primary" onClick={handleSignUpUser}>
                Sign Up
              </button>
            </div>
          </div>
          {error && <p className="text-danger mt-3">{error}</p>}
        </div>
      </div>
    </div>
  );
}
