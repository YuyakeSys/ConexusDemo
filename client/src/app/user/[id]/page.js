"use client";
import { useEffect, useState } from "react";
import Image from "next/image";

const UserProfile = ({ params }) => {
  const [user, setUser] = useState(null);

  const fetchUser = async (id) => {
    try {
      const response = await fetch(`http://127.0.0.1:3000/api/v1/users/${id}`);
      if (!response.ok) {
        throw new Error("Failed to fetch user");
      }
      const data = await response.json();
      console.log(data);
      setUser(data);
    } catch (error) {
      console.error("Error fetching project:", error);
    }
  };

  useEffect(() => {
    if (params.id) {
      fetchUser(params.id);
    }
  }, [params.id]);

  // If user data hasn't been fetched yet, you can show a loading spinner or return null
  if (!user) return <div>Loading...</div>;

  return (
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
          <button className="btn btn-primary mt-3">Edit profile</button>
        </div>
      </div>
      <div className="row mt-5">
        <div className="col-12">
          <h2>Featured projects</h2>
          {/* Render projects here */}
        </div>
      </div>
    </div>
  );
};

export default UserProfile;
