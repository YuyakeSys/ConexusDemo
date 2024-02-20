import React from "react";

function RoleSpecificForm({ userType, userDetails, handleChange }) {
  return (
    <>
      {userType === "company" && (
        <div className="mb-3">
          <label htmlFor="companyStatus" className="form-label">
            Company Status
          </label>
          <select
            className="form-select"
            id="companyStatus"
            name="companyStatus"
            value={userDetails.companyStatus || ""}
            onChange={handleChange}
          >
            <option value="">Select Company Status</option>
            <option value="Preparing">Preparing</option>
            <option value="Bootstrap">Bootstrap</option>
            <option value="Failed">Failed</option>
          </select>
        </div>
      )}

      {userType === "consultant" && (
        <div className="mb-3">
          <label htmlFor="consultantLocation" className="form-label">
            Consultant Location
          </label>
          <input
            type="text"
            className="form-control"
            id="consultantLocation"
            name="consultantLocation"
            value={userDetails.consultantLocation || ""}
            onChange={handleChange}
          />
          
        </div>
      )}

      {userType === "entrepreneur" && (
        <div className="mb-3">
          <label htmlFor="entrepreneurVision" className="form-label">
            Entrepreneur Vision
          </label>
          <textarea
            className="form-control"
            id="entrepreneurVision"
            name="entrepreneurVision"
            value={userDetails.entrepreneurVision || ""}
            onChange={handleChange}
          ></textarea>
        </div>
      )}
    </>
  );
}

export default RoleSpecificForm;
