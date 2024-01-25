"use server";

import { signIn } from "./utils/auth";
import { cookies } from "next/headers";

export async function handleLogin(sessionData) {
  console.log("set cookie");
  console.log(sessionData);
  const encryptedSessionData = sessionData; // Encrypt your session data
  cookies().delete("session");
  cookies().set("session", encryptedSessionData, {
    //secure: process.env.NODE_ENV === "production",
    maxAge: 60 * 60, // One week
    path: "/",
  });
  // Redirect or handle the response after setting the cookie
}
