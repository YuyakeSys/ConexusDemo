import React, { useState, useEffect } from "react";
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
    <div className="container py-5">
      <h2>Company Profile</h2>
      <div className="mb-3">
        <label htmlFor="full_name" className="form-label">
          Full Name
        </label>
        <p className="form-control-plaintext">{user.full_name}</p>
      </div>
      <div className="mb-3">
        <label htmlFor="image_url" className="form-label">
          Image URL
        </label>
        <img
          src={user.image_url || "https://i.imgur.com/vL5Y7y1.jpeg"}
          alt={user.full_name}
          className="img-fluid small-thumbnail"
        />
      </div>

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
    </div>
  );
};

export default CompanyProfile;
