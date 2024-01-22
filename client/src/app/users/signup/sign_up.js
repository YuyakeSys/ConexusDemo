// components/LoginForm.js
import React, { useState } from "react";
import {
  access_token,
  refresh_token,
  resource_owner,
  userSession,
} from "../const";

const API_URL = "http://localhost:3000/users/tokens";

const SignUpForm = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [passwordConfirm, setPasswordConfirm] = useState("");

  const handleSignUp = async (e) => {
    e.preventDefault();

    if (password !== passwordConfirm) {
      alert("Passwords do not match");
      return;
    }

    // Implement your sign-up logic here
    console.log("Signing up with:", email, password);
    try {
      console.log(API_URL);
      const response = await fetch(`${API_URL}/sign_up`, {
        method: "POST",
        body: JSON.stringify({
          email,
          password,
        }),
        headers: { "Content-Type": "application/json" },
      });

      await handleAuthResponse(response);
      //userSession();
      //router.push("/dashboard"); // Redirect to the dashboard or any other page after signup
    } catch (error) {
      console.error("Error signing up:", error);
      // Handle error, show user feedback, etc.
    }

    // Clear form after submission
    setEmail("");
    setPassword("");
    setPasswordConfirm("");
  };

  const handleAuthResponse = async (response) => {
    const data = await response.json();

    localStorage.setItem("resource_owner", JSON.stringify(data.resource_owner));
    localStorage.setItem("refresh_token", data.refresh_token);
    // Update state or global context with access_token, refresh_token, resource_owner if needed
  };

  const handleSignOut = async (e) => {
    e.preventDefault();

    // Implement your sign-out logic here
    console.log("Logging out");

    // Clear form after submission
    setEmail("");
    setPassword("");
    setPasswordConfirm("");
  };

  return (
    <div>
      <h1>Sign up!</h1>
      {/* Display user's email if logged in */}
      <h3 id="user"></h3>
      {/* Form to sign up */}
      <form onSubmit={handleSignUp}>
        <input
          type="text"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          placeholder="Email"
        />
        <input
          type="password"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
          placeholder="Password"
        />
        <input
          type="password"
          value={passwordConfirm}
          onChange={(e) => setPasswordConfirm(e.target.value)}
          placeholder="Confirm Password"
        />
        <button type="submit">Sign Up</button>
      </form>

      {/* Display logout if logged in */}
      <button onClick={handleSignOut}>Logout</button>
    </div>
  );
};

export default SignUpForm;
