"use client";
import React, { useEffect, useState, useContext } from "react";
import ConsultantProfile from "./consultantProfile";
import SkillInput from "../component/form_skill";
import CityInput from "../component/form_city";
import CountryInput from "../component/form_country";
import EntrepreneurProfile from "./entrepreneurProfile";
import CompanyProfile from "./companyProfile";
import { AuthContext } from "@/app/utils/authContext";
import { API_URLS } from "@/app/utils/constant";

const UserProfile = ({ params }) => {
  const [user, setUser] = useState(null);
  const [showEditModal, setShowEditModal] = useState(false);
  const { user: currentUser } = useContext(AuthContext);
  const [editFormData, setEditFormData] = useState({
    full_name: "",
    education: "",
    country: "",
    city: "",
  });
  let ChildRef = React.createRef();

  const fetchUser = async (id) => {
    try {
      const response = await fetch(`${API_URLS.BASIC_URL}/users/${id}`);
      if (!response.ok) {
        throw new Error("Failed to fetch user");
      }
      const data = await response.json();
      setUser(data);
      console.log(data);
      // Initialize edit form data with user data
      setEditFormData({ full_name: data.full_name, education: data.education });
    } catch (error) {
      console.error("Error fetching user:", error);
    }
  };

  useEffect(() => {
    if (params.id) {
      fetchUser(params.id);
    }
  }, [params.id]);

  const handleEditClick = () => {
    setShowEditModal(true);
  };

  const handleCancelClick = () => {
    setShowEditModal(false);
  };

  const handleFormChange = (e) => {
    setEditFormData({
      ...editFormData,
      [e.target.name]: e.target.value,
    });
  };

  const handleChildData = (name, value) => {
    setEditFormData({
      ...editFormData,
      [name]: value,
    });
  };

  const handleConfirmClick = async () => {
    ChildRef.current.userSkillUpdate();

    // API call to update user information
    const response = await fetch(`${API_URLS.BASIC_URL}/users/${params.id}`, {
      method: "PUT",
      headers: {
        "Content-Type": "application/json",
        // Include authentication headers if needed
      },
      body: JSON.stringify({ user: editFormData }),
    });
    if (response.ok) {
      setUser({ ...user, ...editFormData }); // Update local state
      setShowEditModal(false); // Close modal
    } else {
      // Handle error
      console.error("Failed to update user");
    }
  };

  //render proper user file
  const renderProfileByType = () => {
    console.log(user);
    switch (user.user_type) {
      case "consultant":
        return <ConsultantProfile user={user} />;
      case "company":
        return <CompanyProfile user={user} />;
      case "entrepreneur":
        return <EntrepreneurProfile user={user} />;
      default:
        return <div>Invalid user type</div>;
    }
  };
  // If user data hasn't been fetched yet, show a loading spinner or return null
  if (!user) return <div>Loading...</div>;

  return (
    <div className="container py-5">
      {renderProfileByType()}
      {currentUser && String(currentUser.id) === String(params.id) && (
        <button className="btn btn-primary mt-3" onClick={handleEditClick}>
          Edit
        </button>
      )}
      {/* Edit Modal */}
      {showEditModal && (
        <div
          className="modal d-block"
          tabIndex="-1"
          style={{ backgroundColor: "rgba(0,0,0,0.5)" }}
        >
          <div className="modal-dialog">
            <div className="modal-content">
              <div className="modal-header">
                <h5 className="modal-title">Edit Profile</h5>
                <button
                  type="button"
                  className="btn-close"
                  onClick={handleCancelClick}
                ></button>
              </div>
              <div className="modal-body">
                <form>
                  {/* Common field */}
                  <div className="mb-3">
                    <label htmlFor="full_name" className="form-label">
                      Full Name
                    </label>
                    <input
                      type="text"
                      className="form-control"
                      id="full_name"
                      name="full_name"
                      value={editFormData.full_name}
                      onChange={handleFormChange}
                    />
                    <SkillInput onRef={ChildRef} />
                    <CountryInput valueReceived={handleChildData} />
                    <CityInput valueReceived={handleChildData} />
                  </div>

                  {/* Conditional fields based on user type */}
                  {user.user_type === "consultant" && (
                    <div className="mb-3">
                      <label htmlFor="education" className="form-label">
                        Education
                      </label>
                      <input
                        type="text"
                        className="form-control"
                        id="education"
                        name="education"
                        value={editFormData.education}
                        onChange={handleFormChange}
                      />
                    </div>
                  )}

                  {user.user_type === "entrepreneur" && (
                    <div className="mb-3">
                      <label htmlFor="startupExperience" className="form-label">
                        Startup Experience
                      </label>
                      <input
                        type="text"
                        className="form-control"
                        id="startupExperience"
                        name="startupExperience"
                        value={editFormData.startupExperience || ""}
                        onChange={handleFormChange}
                      />
                    </div>
                  )}

                  {user.user_type === "company" && (
                    <div className="mb-3">
                      <label htmlFor="industry" className="form-label">
                        Industry
                      </label>
                      <input
                        type="text"
                        className="form-control"
                        id="industry"
                        name="industry"
                        value={editFormData.industry || ""}
                        onChange={handleFormChange}
                      />
                    </div>
                  )}
                </form>
              </div>
              <div className="modal-footer">
                <button
                  type="button"
                  className="btn btn-secondary"
                  onClick={handleCancelClick}
                >
                  Cancel
                </button>
                <button
                  type="button"
                  className="btn btn-primary"
                  onClick={handleConfirmClick}
                >
                  Confirm
                </button>
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default UserProfile;
