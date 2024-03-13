// components/Avatar.js
import React, { useState, useRef } from "react";
import { FaEdit } from "react-icons/fa"; // Make sure to install react-icons using npm or yarn
import { API_URLS } from "@/app/utils/constant";

export const Avatar = ({ user }) => {
  const [hover, setHover] = useState(false);
  const fileInputRef = useRef(null);

  const handleFileInput = (e) => {
    const file = e.target.files[0];
    if (file) {
      handleAvatarUpload(user.id, file); // This function should be passed from the parent component and handle the upload logic
    }
  };

  return (
    <div
      className="text-center"
      onMouseEnter={() => setHover(true)}
      onMouseLeave={() => setHover(false)}
    >
      <div className="column">
        <div className="col-12">
          <img
            src={
              `${API_URLS.SERVER_URL}${user.image_url}` ||
              "https://i.imgur.com/ZqBwLzL.jpeg"
            }
            alt={`${user.full_name}'s Avatar`}
            className="rounded-circle avatar-img"
            style={{ width: "100px", height: "100px", position: "relative" }}
          />
        </div>
        <div className="col-12">
          <button
            className="btn btn-success mt-3"
            onClick={() => fileInputRef.current.click()}
          >
            <FaEdit color="#000" size="1em" />
            <span className="ms-2">Edit Avatar</span>
          </button>
          <input
            type="file"
            ref={fileInputRef}
            style={{ display: "none" }}
            accept="image/*"
            onChange={handleFileInput}
          />
        </div>
      </div>
    </div>
  );
};

const handleAvatarUpload = async (userId, file) => {
  const formData = new FormData();
  formData.append("avatar", file);
  // Implement the logic to upload the file to the server
  try {
    const response = await fetch(
      `${API_URLS.BASIC_URL}/users/${userId}/update_avatar`,
      {
        method: "PUT",
        headers: {
          // 'Authorization': 'Bearer <token>' // If using token-based authentication
        },
        body: formData,
      }
    );

    if (response.ok) {
      // Handle success
      console.log("Avatar uploaded successfully");
    } else {
      // Handle error
      console.error("Failed to upload avatar");
    }
  } catch (error) {
    console.error("Error uploading avatar:", error);
  }
  console.log("File for upload:", file);
};
