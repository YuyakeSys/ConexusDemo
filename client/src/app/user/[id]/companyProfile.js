import React, { useState, useEffect } from "react";
import Link from "next/link";

import { API_URLS } from "@/app/utils/constant";

const CompanyProfile = ({ user }) => {
  // State to manage edit form data
  const [editFormData, setEditFormData] = useState({
    email: user.email,
    full_name: user.full_name,
    image_url: user.image_url,
    mission: user.mission,
    status: user.status,
    team_member: user.team_member.toString(),
  });
  const [teamMembers, setTeamMembers] = useState([]);

  useEffect(() => {
    const fetchTeamMembers = async () => {
      const memberIds = JSON.parse(user.team_member);
      const membersData = await Promise.all(
        memberIds.slice(0, 5).map(async (memberId) => {
          const response = await fetch(
            `${API_URLS.BASIC_URL}/users/${memberId}/get_user_brief`
          );
          if (!response.ok) {
            throw new Error(
              `Error fetching member data: ${response.statusText}`
            );
          }
          return response.json();
        })
      );

      setTeamMembers(membersData);
    };

    fetchTeamMembers().catch(console.error);
  }, [user.team_member]);

  // Handler to detect changes in form and update state
  const handleChange = (e) => {
    setEditFormData({
      ...editFormData,
      [e.target.name]: e.target.value,
    });
  };

  // Handler to submit changes for a particular field
  const handleSubmit = async (fieldName) => {
    const response = await fetch(
      `http://127.0.0.1:3000/api/v1/users/${user.id}`,
      {
        method: "PUT",
        headers: {
          "Content-Type": "application/json",
          // Include authentication headers if needed
        },
        body: JSON.stringify({
          user: { [fieldName]: editFormData[fieldName] },
        }),
      }
    );

    if (!response.ok) {
      // Handle response errors here
      console.error("Error updating user data");
    }
  };

  return (
    <div className="vw-100">
      <div
        className="d-flex flex-column justify-content-center align-items-center"
        style={{
          position: "relative",
          height: "80vh", // Adjust the height as necessary
          width: "100%",
          backgroundImage: `url(${
            user.image_url || "https://i.imgur.com/vL5Y7y1.jpeg"
          })`,
          backgroundSize: "cover",
          backgroundPosition: "center",
          zIndex: 1,
        }}
      >
        {/* Overlay with opacity */}
        <div
          style={{
            position: "absolute",
            top: 0,
            left: 0,
            right: 0,
            bottom: 0,
            backgroundColor: "rgba(0, 0, 0, 0.5)", // Adjust color and opacity as needed
            zIndex: -1,
          }}
        ></div>

        {/* Central content area with user's name and additional details */}
        <div className="p-4 text-center" style={{ zIndex: 2 }}>
          <h2 className="fs-1 fw-bolder text-white mb-3">{user.full_name}</h2>
          {/* Any additional details can go here, styled similarly */}
        </div>

        {/* Bottom area for extra details or navigation */}
        <div
          className="w-100 position-absolute bottom-0 mb-3 d-flex justify-content-around"
          style={{ zIndex: 2 }}
        >
          {/* Place elements here as in the uploaded layout, such as date and other info */}
        </div>
      </div>
      <div className="container py-5">
        <h3>Company Members</h3>
        <div className="d-flex flex-wrap">
          {teamMembers.map((member) => (
            <a
              href={`/user/${member.id}`}
              key={member.id}
              className="p-2"
              title={`View profile for ${member.full_name}`} // This sets the title dynamically
            >
              <img
                src={member.image_url || "https://i.imgur.com/vL5Y7y1.jpeg"}
                alt={`View profile for ${member.full_name}`}
                className="img-thumbnail small-thumbnail"
              />
            </a>
          ))}
        </div>
        <h3>Company owners</h3>
        <div className="row mb-4">
          <h3 className="col-4">Company's Projects</h3>
          <div className="col">
            <Link href="/projects/new" passHref>
              <button className="btn btn-primary">New Project</button>
            </Link>
          </div>
        </div>
        <div className="row">
          {user.projects &&
            user.projects.map((project) => (
              <div key={project.id} className="col-sm-6 col-md-4 col-lg-3 mb-4">
                <div className="card">
                  <img
                    src={project.image_url || "https://via.placeholder.com/150"}
                    alt={project.title}
                    className="card-img-top"
                  />
                  <div className="card-body">
                    <h5 className="card-title">{project.title}</h5>
                    <a
                      href={`/projects/${project.id}`}
                      className="btn btn-primary"
                    >
                      View Project
                    </a>
                  </div>
                </div>
              </div>
            ))}
        </div>
      </div>
    </div>
  );
};

export default CompanyProfile;
