// ./src/app/projects/page.jsx
"use client";
import Link from "next/link";
import Select from "react-select";

import { useState, useEffect, useContext } from "react";
import { PROJECT_OPTIONS } from "../utils/constant";
import { AuthContext } from "../utils/authContext";

const ProjectsPage = () => {
  const [projects, setProjects] = useState([]);
  const [currentPage, setCurrentPage] = useState(1);
  const [filter, setFilter] = useState("");
  const pageSize = 20; // Assuming 20 projects per page (5 columns x 4 rows)
  const { user, _ } = useContext(AuthContext);

  useEffect(() => {
    const fetchData = async () => {
      try {
        // Replace with the actual URL of your Rails API for the projects endpoint
        // Update the endpoint to accept pagination parameters if necessary
        const response = await fetch(
          `http://127.0.0.1:3000/api/v1/projects?page=${currentPage}&size=${pageSize}&filter=${filter}`
        );
        if (!response.ok) {
          throw new Error("Failed to fetch data");
        }

        const data = await response.json();
        setProjects(data);
      } catch (error) {
        console.error("Error fetching data:", error);
      }
    };

    fetchData();
  }, [currentPage, pageSize, filter]);

  // Function to handle page change
  const handlePageChange = (newPage) => {
    setCurrentPage(newPage);
  };

  return (
    <div className="container mt-4 mb-4">
      <div className="row mb-3">
        <h1 className="col-2 ml-1">Projects</h1>
        <div className="col-2 mt-2">
          <Select
            options={PROJECT_OPTIONS}
            defaultValue={PROJECT_OPTIONS[0]}
            onChange={(selectedOption) => setFilter(selectedOption.value)}
          />
        </div>
      </div>

      <div className="container mt-10">
        <div className="row row-cols-1 row-cols-md-5 g-4">
          {projects.map((project) => (
            <div className="col" key={project.id}>
              <Link href={`projects/${project.id}`} passHref>
                <div
                  className="card h-100"
                  style={{
                    backgroundImage: `url(${
                      project.image_url || "/placeholder-image.jpg"
                    })`,
                    backgroundSize: "cover",
                    backgroundPosition: "center",
                  }}
                >
                  <div className="card-body">
                    <h5 className="card-title">{project.title}</h5>
                    <p className="card-text">{project.description}</p>
                  </div>
                  <div className="card-footer">
                    <small className="text-muted">
                      Last updated {project.updated_at}
                    </small>
                  </div>
                </div>
              </Link>
            </div>
          ))}
        </div>
      </div>
      <br />
      {/* Bootstrap Pagination */}
      <nav>
        <ul className="pagination justify-content-center">
          <li className={`page-item ${currentPage === 1 ? "disabled" : ""}`}>
            <a
              className="page-link"
              onClick={() => handlePageChange(currentPage - 1)}
            >
              &laquo;
            </a>
          </li>
          {/* Add page numbers dynamically based on the data */}
          {[...Array(5)].map((_, idx) => (
            <li
              key={idx}
              className={`page-item ${currentPage === idx + 1 ? "active" : ""}`}
            >
              <a
                className="page-link"
                onClick={() => handlePageChange(idx + 1)}
              >
                {idx + 1}
              </a>
            </li>
          ))}
          <li className={`page-item ${currentPage === 5 ? "disabled" : ""}`}>
            <a
              className="page-link"
              onClick={() => handlePageChange(currentPage + 1)}
            >
              &raquo;
            </a>
          </li>
        </ul>
      </nav>
    </div>
  );
};

export default function ClientProjectsPage() {
  return <ProjectsPage />;
}
