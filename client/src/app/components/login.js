// components/Login.js
import React, { useState } from "react";
import axios from "axios";

const Login = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  const handleLogin = async (e) => {
    e.preventDefault();
    try {
      const response = await axios.post(
        `${config.apiUrl}/users/tokens/sign_in`,
        {
          user: {
            email,
            password,
          },
        }
      );
      console.log("Login Successful", response.data);
      // Handle response, store token, etc.
      // In handleLogin function of components/Login.js
      localStorage.setItem("authToken", response.data.token); // Assuming the token is in response.data.token
    } catch (error) {
      console.error("Login Error", error);
    }
  };

  return (
    <form onSubmit={handleLogin}>
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
      <button type="submit">Login</button>
    </form>
  );
};

export default Login;
