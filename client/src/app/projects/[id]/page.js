"use client";
import { useEffect, useState } from "react";

const ProjectDetailsPage = ({ params }) => {
  const [project, setProject] = useState(null);

  const fetchProject = async (id) => {
    try {
      const response = await fetch(
        `http://127.0.0.1:3000/api/v1/projects/${id}`
      );
      if (!response.ok) {
        throw new Error("Failed to fetch project");
      }
      const data = await response.json();
      setProject(data);
    } catch (error) {
      console.error("Error fetching project:", error);
    }
  };

  // Fetch project details when component mounts
  useEffect(() => {
    if (params.id) {
      fetchProject(params.id);
    }
  }, [params.id]);

  if (!project) {
    return <div>Loading...</div>;
  }

  return (
    <div className="container mt-4">
      <h1>{project.title}</h1>
      <p>{project.description}</p>
      {/* Add more project details here */}
    </div>
  );
};

export default ProjectDetailsPage;
