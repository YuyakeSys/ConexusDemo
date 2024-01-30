"use client";
import { loginUser } from "../../utils/auth";
import { useContext, useState } from "react";
import { useRouter } from "next/navigation";
import { AuthContext } from "@/app/utils/authContext";

export default function Login() {
  const router = useRouter();
  const { setUser } = useContext(AuthContext);
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");

  const handleSignUp = () => {
    router.push("signup");
  };
  const handleLogin = async () => {
    try {
      const response = await loginUser(email, password);
      // Display a success message
      if (response.status == 200) {
        setUser(response.data.resource_owner);
        router.push("/");
      }
      // Handle successful login, e.g., store tokens in local storage
    } catch ({ error, error_description }) {
      if (error_description != null) {
        // If error_description exists in the response, set it as the error message
        setError(error_description[0]);
      } else {
        setError("Unknown error");
      }
    }
  };

  return (
    <div className="container mt-5">
      <div className="row justify-content-center">
        <div className="col-md-6">
          <h1 className="mb-3">Login</h1>
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
              <div className="form-buttons">
                <button className="btn btn-primary me-2" onClick={handleLogin}>
                  Login
                </button>
                <button className="btn btn-success" onClick={handleSignUp}>
                  Sign Up
                </button>
              </div>
            </div>
          </div>
          {error && <p className="text-danger mt-3">{error}</p>}
        </div>
      </div>
    </div>
  );
}
