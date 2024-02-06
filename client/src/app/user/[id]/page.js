"use client";
import { useEffect, useState } from "react";
import Image from "next/image";

const UserProfile = ({ params }) => {
  const [user, setUser] = useState(null);
  const [showEditModal, setShowEditModal] = useState(false);
  const [editFormData, setEditFormData] = useState({
    fullname: "",
    education: "",
  });

  const fetchUser = async (id) => {
    try {
      const response = await fetch(`http://127.0.0.1:3000/api/v1/users/${id}`);
      if (!response.ok) {
        throw new Error("Failed to fetch user");
      }
      const data = await response.json();
      setUser(data);
      // Initialize edit form data with user data
      setEditFormData({ fullname: data.fullname, education: data.education });
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

  const handleConfirmClick = async () => {
    // API call to update user information
    const response = await fetch(
      `http://127.0.0.1:3000/api/v1/users/${params.id}`,
      {
        method: "PUT",
        headers: {
          "Content-Type": "application/json",
          // Include authentication headers if needed
        },
        body: JSON.stringify({ user: editFormData }),
      }
    );
    if (response.ok) {
      setUser({ ...user, ...editFormData }); // Update local state
      setShowEditModal(false); // Close modal
    } else {
      // Handle error
      console.error("Failed to update user");
    }
  };

  // If user data hasn't been fetched yet, show a loading spinner or return null
  if (!user) return <div>Loading...</div>;

  return (
    <div className="container py-5">
      <div className="container py-5">
        <div className="row">
          <div className="col-md-4">
            <div className="text-center">
              <img
                src={user.image_url || "https://i.imgur.com/ZqBwLzL.jpeg"} // Replace with your direct image link
                alt={`${user.fullname || "User"}'s Avatar`}
                className="rounded-circle"
                style={{ width: "100px", height: "100px" }}
              />
            </div>
          </div>
          <div className="col-md-8">
            <h1>{user.fullname || "Full Name"}</h1>
            <p>{user.education || "Education Details"}</p>
            <div className="progress">
              <div
                className="progress-bar"
                role="progressbar"
                style={{ width: "88%" }}
                aria-valuenow="88"
                aria-valuemin="0"
                aria-valuemax="100"
              >
                Profile 88% complete
              </div>
            </div>
            <button className="btn btn-primary mt-3" onClick={handleEditClick}>
              Edit Profile
            </button>
          </div>
        </div>
        <div className="row mt-5">
          <div className="col-12">
            <h2>Featured projects</h2>
          </div>
        </div>
      </div>

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
                  <div className="mb-3">
                    <label htmlFor="fullname" className="form-label">
                      Full Name
                    </label>
                    <input
                      type="text"
                      className="form-control"
                      id="fullname"
                      name="fullname"
                      value={editFormData.fullname}
                      onChange={handleFormChange}
                    />
                  </div>
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
