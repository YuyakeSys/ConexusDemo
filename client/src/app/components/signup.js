// components/Signup.js
import React, { useState } from "react";
import axios from "axios";
import config from "../config";

const Signup = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [passwordConfirmation, setPasswordConfirmation] = useState("");

  const handleSignup = async (e) => {
    e.preventDefault();
    if (password !== passwordConfirm) {
      alert("Passwords do not match");
      return;
    }
    try {
      const response = await axios.post(
        `${config.apiUrl}/users/tokens/sign_up`,
        {
          user: {
            email,
            password,
          },
        }
      );
      console.log("Signup Successful", response.data);
      // Handle response, store token, etc.
      console.log("signup response", )
      localStorage.setItem("authToken", response.data.token);
    } catch (error) {
      console.error("Signup Error", error);
    }
  };

  return (
    <form onSubmit={handleSignup}>
      <input
        type="email"
        value={email}
        onChange={(e) => setEmail(e.target.value)}
        placeholder="Email"
        required
      />
      <input
        type="password"
        value={password}
        onChange={(e) => setPassword(e.target.value)}
        placeholder="Password"
        required
      />
      <input
        type="password"
        value={passwordConfirmation}
        onChange={(e) => setPasswordConfirmation(e.target.value)}
        placeholder="Confirm Password"
        required
      />
      <button type="submit">Signup</button>
    </form>
  );
};

export default Signup;
