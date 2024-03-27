// pages/NewProject.js
"use client";
import { useState, useContext } from "react";
import axios from "axios";
import { API_URLS } from "@/app/utils/constant";
import RenderStep from "./renderStep";
import { AuthContext } from "@/app/utils/authContext";
import { useRouter } from "next/navigation";

const NewProject = () => {
  const [currentStep, setStep] = useState(1);
  const { user } = useContext(AuthContext);
  const [project, setProject] = useState({
    title: "",
    description: "",
    industry: "",
    requiredSkills: "",
    resourceLinks: "",
    state: "",
    date: "",
    teamMembers: "",
    imageURL: "",
    user_id: "",
  });

  const handleChange = (e) => {
    const { name, value } = e.target;
    setProject({ ...project, [name]: value });
  };
  const handleSelectChange = ({ name, value }) => {
    setProject({ ...project, [name]: value });
  };

  const handleUserSelect = (selectedUsers) => {
    const userList = selectedUsers.map((user) => user.name).join(", "); // Assuming each user object has a 'name' property
    setProject({ ...project, teamMembers: userList });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    // Add API call logic here to create a new project for the current user (company)
    console.log("Submitted project:", project);
    // Check if user is not logged in and redirect to login page
    if (!user) {
      const router = useRouter();
      router.push("/user/login");
    }
    console.log("Submitted user id :", user.id);
    const projectWithUserId = { ...project, user_id: String(user.id) };
    axios
      .post(`${API_URLS.BASIC_URL}/projects`, projectWithUserId, {
        headers: {
          "Content-Type": "multipart/form-data",
        },
      })
      .then((response) => {
        console.log("Project created successfully:", response.data);
        // Handle success response
      })
      .catch((error) => {
        console.error("Error creating project:", error);
        // Handle error
      });
  };

  const nextStep = () => {
    setStep(currentStep + 1);
  };

  const prevStep = () => {
    setStep(currentStep - 1);
  };

  return (
    <div className="container my-5">
      <div className="row">
        <div className="col-md-8 offset-md-2">
          <h1 className="text-center mb-5">New Project</h1>
          <form onSubmit={handleSubmit}>
            {RenderStep(
              currentStep,
              project,
              handleChange,
              handleUserSelect,
              handleSelectChange,
              prevStep,
              nextStep
            )}
            <div className="text-center mt-4">
              {currentStep == 3 && (
                <div>
                  <button
                    type="button"
                    className="btn btn-primary me-2"
                    onClick={prevStep}
                  >
                    Previous
                  </button>
                  <button type="submit" className="btn btn-success">
                    Submit Project
                  </button>
                </div>
              )}
            </div>
          </form>
        </div>
      </div>
    </div>
  );
};

export default NewProject;
