// pages/NewProject.js
"use client";
import { useState } from "react";
import axios from "axios";
import { API_URLS } from "@/app/utils/constant";

const NewProject = ({ currentUser }) => {
  const [project, setProject] = useState({
    title: "",
    description: "",
    industry: "",
    requiredSkills: "",
    resourceLinks: "",
    state: "",
    date: "",
    teamMembers: "",
  });

  const handleChange = (e) => {
    const { name, value } = e.target;
    setProject({ ...project, [name]: value });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    // Add API call logic here to create a new project for the current user (company)
    console.log("Submitted project:", project);
  };

  // Convert to array for easier rendering
  const formFields = [
    { id: "title", label: "Project Title", type: "text" },
    { id: "description", label: "Description", type: "textarea" },
    { id: "industry", label: "Industry", type: "text" },
    { id: "requiredSkills", label: "Required Skills", type: "text" },
    { id: "resourceLinks", label: "Resource Links", type: "text" },
    { id: "state", label: "State", type: "text" },
    { id: "date", label: "Date", type: "date" },
    { id: "teamMembers", label: "Team Members", type: "text" },
  ];

  const renderInput = ({ id, label, type }) => {
    return (
      <div className="mb-3" key={id}>
        <label htmlFor={id} className="form-label">
          {label}
        </label>
        {type === "textarea" ? (
          <textarea
            className="form-control"
            id={id}
            name={id}
            value={project[id]}
            onChange={handleChange}
            rows="3"
            required
          ></textarea>
        ) : (
          <input
            type={type}
            className="form-control"
            id={id}
            name={id}
            value={project[id]}
            onChange={handleChange}
            required
          />
        )}
      </div>
    );
  };

  return (
    <div className="container my-5">
      <div className="row">
        <div className="col-md-8 offset-md-2">
          <h1 className="text-center mb-5">Create New Project</h1>
          <form onSubmit={handleSubmit}>
            {formFields.map((field) => renderInput(field))}
            <div className="text-center mt-4">
              <button type="submit" className="btn btn-success btn-lg">
                Submit Project
              </button>
            </div>
          </form>
        </div>
      </div>
    </div>
  );
};

export default NewProject;
