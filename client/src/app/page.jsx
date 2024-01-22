"use client";

import React, { useEffect, useState } from "react";
import "./globals.css";

const API_URL = "http://localhost:3000/users/tokens";

let access_token;
let refresh_token = localStorage.getItem("refresh_token");
let resource_owner;

const nullOrUndefined = (itemToCheck) =>
  itemToCheck == null || itemToCheck === "undefined";

const Page = () => {
  return <div>Main page</div>;
};

export default Page;
