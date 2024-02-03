// utils/auth.js
import axios from "axios";
import { getCookie, setCookie, deleteCookie } from "cookies-next";
const API_BASE_URL = "http://127.0.0.1:3000"; // Replace with your API URL

export const loginUser = async (email, password, rememberMe, req, res) => {
  try {
    const response = await axios.post(`${API_BASE_URL}/users/tokens/sign_in`, {
      email,
      password,
    });

    const maxAge = rememberMe ? 2592000 : 60 * 60; // 30 days or 1 hour

    const { token, refresh_token, resource_owner } = response.data;

    // Set cookies - both access token and refresh token
    setCookie("token", token, {
      req,
      res,
      httpOnly: true,
      secure: process.env.NODE_ENV === "development",
      maxAge: maxAge,
    });
    setCookie("refresh_token", refresh_token, {
      req,
      res,
      httpOnly: true,
      secure: process.env.NODE_ENV === "development",
      maxAge: maxAge,
    });
    setCookie("user", JSON.stringify(resource_owner), {
      req,
      res,
      maxAge: maxAge,
    });

    return response;
  } catch (error) {
    throw error.response?.data || "An error occurred";
  }
};

export const signUpUser = async (
  email,
  password,
  fullname,
  education,
  user_type
) => {
  try {
    const response = await axios.post(`${API_BASE_URL}/users/tokens/sign_up`, {
      email,
      password,
      fullname,
      education,
      user_type,
    });

    const { token, refresh_token, resource_owner } = response.data;

    // Set the session cookie on successful sign-up
    setCookie("token", token, {
      req,
      res,
      httpOnly: true,
      secure: process.env.NODE_ENV === "development",
      maxAge: 60 * 60,
    }); // 1 week
    setCookie("refresh_token", refresh_token, {
      req,
      res,
      httpOnly: true,
      secure: process.env.NODE_ENV === "development",
      maxAge: 60 * 60,
    }); // 1 month
    setCookie("user", JSON.stringify(resource_owner), {
      req,
      res,
      maxAge: 60 * 60,
    }); // 1 week

    const router = useRouter();
    router.push("/");
  } catch (error) {
    throw error.response?.data || "An error occurred";
  }
};

export const refreshToken = async (refreshToken) => {
  try {
    const response = await axios.post(
      `${API_BASE_URL}/users/tokens/refresh`,
      null,
      {
        headers: { Authorization: `Bearer ${refreshToken}` },
      }
    );

    return response.data;
  } catch (error) {
    throw error.response?.data || "An error occurred";
  }
};

export const revokeToken = async (accessToken) => {
  try {
    const response = await axios.post(
      `${API_BASE_URL}/users/tokens/revoke`,
      null,
      {
        headers: { Authorization: `Bearer ${accessToken}` },
      }
    );

    return response.data;
  } catch (error) {
    throw error.response?.data || "An error occurred";
  }
};

export const handleLogout = async (req, res) => {
  try {
    // Optionally, revoke the token using an API call if necessary
    // const token = getCookie('token', { req, res });
    // await revokeToken(token);
    if (getCookie("token") != null) {
      token = getCookie("token");
      revokeToken(token);
      deleteCookie("token", { req, res });
    }
    // Remove the cookies set during login
    deleteCookie("refresh_token", { req, res });
    deleteCookie("user", { req, res });

    // Redirect or perform other actions as necessary after logout
  } catch (error) {
    {
      console.error("Error during logout", error);
    }
  }
};
