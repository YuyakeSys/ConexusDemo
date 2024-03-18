"use client";

import React from "react";
import { useRouter } from "next/navigation";
import { Avatar } from "../component/Avatar";
const EntrepreneurProfile = ({ user }) => {
  return (
    <div className="container py-5">
      <p> Entrepreneur page</p>
      <div className="row">
        <div className="col-md-4">
          <Avatar user={user} />
        </div>
        <div className="col-md-8">
          <h1>{user.full_name || "Entrepreneur Name"}</h1>
          <p>{user.education || "Entrepreneur's Education Details"}</p>
          {/* Add or modify sections here for Entrepreneur-specific data */}
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
        </div>
      </div>
      {/* Any additional sections or functionalities specific to consultants can be added here */}
    </div>
  );
};

export default EntrepreneurProfile;
