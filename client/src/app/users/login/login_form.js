// components/LoginForm.js
import React, { useState } from "react";

const LoginForm = () => {
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

    // Clear form after submission
    setEmail("");
    setPassword("");
    setPasswordConfirm("");
  };

  const handleSignIn = async (e) => {
    e.preventDefault();

    // Implement your sign-in logic here
    console.log("Logging in with:", email, password);

    // Clear form after submission
    setEmail("");
    setPassword("");
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
      <h1>Login!</h1>
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

export default LoginForm;
