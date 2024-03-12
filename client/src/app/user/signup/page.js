// pages/signup.js
"use client";
import { useState, useContext } from "react";
import { signUpUser } from "../../utils/auth";
import { useRouter } from "next/navigation";
import FormField from "./formField";
import RoleSpecificForm from "./roleSpecificForm";
import { AuthContext } from "@/app/utils/authContext";
import useUserDetails from "./useUserDetails";

export default function Signup() {
  const { setUser } = useContext(AuthContext);
  const {
    userDetails,
    handleChange,
    handleUserSelect,
    removeUserSelect,
    setUserDetails,
  } = useUserDetails();
  // const [userDetails, setUserDetails] = useState({
  //   email: "",
  //   password: "",
  //   repeatPassword: "",
  //   fullName: "",
  //   education: "",
  //   companyStatus: "",
  //   consultantLocation: "",
  //   entrepreneurMission: "",
  //   status: "",
  //   mission: "",
  //   teamMember: [], // Now array for multiple ids
  //   userType: "",
  // });
  const [error, setError] = useState("");
  const router = useRouter();

  // const handleChange = (e) => {
  //   const { name, value } = e.target;
  //   setUserDetails({ ...userDetails, [name]: value });
  // };

  // const handleUserSelect = (selectedUserId) => {
  //   // Prevent adding duplicate user IDs
  //   if (!userDetails.teamMember.includes(selectedUserId)) {
  //     console.log(userDetails.teamMember);
  //     console.log("selecting users");
  //     console.log("user:" + selectedUserId);
  //     setUserDetails((prevDetails) => ({
  //       ...prevDetails,
  //       teamMember: [...prevDetails.teamMember, selectedUserId],
  //     }));
  //   }
  // };

  // const removeUserSelect = (selectedUserId) => {
  //   setUserDetails((prevDetails) => ({
  //     ...prevDetails,
  //     teamMember: prevDetails.teamMember.filter((id) => id !== selectedUserId),
  //   }));
  // };

  const handleSignUpUser = async () => {
    const {
      email,
      password,
      repeatPassword,
      fullName,
      education,
      status,
      mission,
      teamMember,
      privacy,
      userType,
      belong_to_ids,
      industry,
    } = userDetails;
    if (password != repeatPassword) {
      alert("Not the same password");
      return;
    }

    try {
      const response = await signUpUser(
        email,
        password,
        fullName,
        education,
        status,
        mission,
        JSON.stringify(teamMember),
        privacy,
        userType,
        belong_to_ids,
        JSON.stringify(industry)
      );
      // Handle successful login, e.g., store tokens in local storage
      setUser(response);
      router.push("/");
    } catch (error) {
      // Inspect the error object and handle it accordingly
      if (error && error.error_description) {
        // If error_description exists in the response, set it as the error message
        setError(error.error_description[0]);
      } else if (error && error.message) {
        // If the error object has a message property, use it
        setError(error.message);
      } else if (typeof error === "string") {
        // If the error is a string, use it directly
        setError(error);
      } else {
        // Fallback error message
        setError("An unknown error occurred");
        console.error(error); // Log the error for debugging purposes
      }
    }
  };

  return (
    <div className="container mt-5">
      <div className="row justify-content-center">
        <div className="col-md-6">
          <h1 className="mb-3">Sign Up</h1>
          <div className="card p-4">
            <div className="card-body">
              <div className="card-title">
                <FormField
                  label="I am a..."
                  name="userType"
                  type="select"
                  options={["entrepreneur", "consultant", "company"]}
                  value={userDetails.userType}
                  onChange={handleChange}
                />
              </div>
              {userDetails.userType && (
                <>
                  <div className="row">
                    <div className="col-md-6">
                      {userDetails.userType === "company" ? (
                        <FormField
                          label="Company Name"
                          name="fullName"
                          type="text"
                          value={userDetails.fullName}
                          onChange={handleChange}
                        />
                      ) : (
                        <FormField
                          label="Full Name"
                          name="fullName"
                          type="text"
                          value={userDetails.fullName}
                          onChange={handleChange}
                        />
                      )}
                      <FormField
                        label="Email"
                        name="email"
                        type="email"
                        value={userDetails.email}
                        onChange={handleChange}
                      />
                    </div>
                    <div className="col-md-6">
                      <FormField
                        label="Password"
                        name="password"
                        type="password"
                        value={userDetails.password}
                        onChange={handleChange}
                      />
                      <FormField
                        label="Repeat Password"
                        name="repeatPassword"
                        type="password"
                        value={userDetails.repeatPassword}
                        onChange={handleChange}
                      />
                    </div>
                  </div>
                  <RoleSpecificForm
                    userType={userDetails.userType}
                    userDetails={userDetails}
                    handleChange={handleChange}
                    handleUserSelect={handleUserSelect}
                    removeUserSelect={removeUserSelect}
                  />
                  <button
                    className="btn btn-primary"
                    onClick={handleSignUpUser}
                  >
                    Sign Up
                  </button>
                  {error && <p className="text-danger mt-3">{error}</p>}
                </>
              )}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
