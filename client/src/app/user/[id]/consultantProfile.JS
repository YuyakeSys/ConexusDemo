"use client";

import React from "react";
import { useRouter } from "next/navigation";
import { Avatar } from "../component/Avatar";

const ConsultantProfile = ({ user }) => {
  // Assuming you might have consultant-specific functionalities, you can add them here
  const router = useRouter();

  const handleClick = () => {
    console.log(`/user/${user.id}/edit_profile_form`);
    router.push(`/user/${user.id}/edit_profile_form`);
  };

  return (
    <div className="container py-5">
      <p> Consultant page</p>
      <div className="row">
        <div className="col-md-4">
          <Avatar user={user} />
        </div>
        <div className="col-md-8">
          <h1>{user.full_name || "Consultant Name"}</h1>
          <p>{user.education || "Consultant's Education Details"}</p>
          {/* Add or modify sections here for consultant-specific data */}
          {user.skills && user.skills.length > 0 ? (
            <div className="mb-3">
              <h5>Skills</h5>
              <div className="d-flex flex-wrap">
                {user.skills.map((skill, index) => (
                  <span key={index} className="badge bg-primary me-2 mb-2">
                    {skill}
                  </span>
                ))}
              </div>
            </div>
          ) : (
            <div className="mb-3">
              <h5>Skills</h5>
              <p className="text-muted">No skills listed</p>
            </div>
          )}
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
        </div>
      </div>
      {/* Any additional sections or functionalities specific to consultants can be added here */}
    </div>
  );
};

export default ConsultantProfile;
