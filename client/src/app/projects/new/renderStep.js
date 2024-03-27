// renderStep.js
import React from "react";
import { USER_TYPES } from "@/app/utils/constant";
import Select from "react-select";
import { INDUSTRY_AREAS } from "@/app/utils/constant";
import UserSuggestions from "@/app/utils/userSuggestions";

const RenderStep = (
  step,
  formData,
  handleChange,
  handleUserSelect,
  handleSelectChange,
  handlePrevious,
  handleNext
) => {
  const isStep1Valid = formData.title.trim() !== "";

  switch (step) {
    case 1:
      return (
        <div className="col">
          <div className="row mb-3">
            <label htmlFor="title" className="form-label">
              Project Title
            </label>
            <input
              type="text"
              className="form-control"
              id="title"
              name="title"
              value={formData.title}
              onChange={handleChange}
              required
            />
          </div>
          <div className="row mb-3">
            <label htmlFor="title" className="form-label">
              Related Links:
            </label>
            <input
              type="text"
              className="form-control"
              id="resourceLinks"
              name="resourceLinks"
              value={formData.resourceLinks}
              onChange={handleChange}
            />
          </div>
          <div className="row mb-3">
            <label htmlFor="industry" className="form-label">
              Industry
            </label>
            <div className="col-5">
              <Select
                options={INDUSTRY_AREAS}
                onChange={(selectedOption) =>
                  handleSelectChange("industry", selectedOption.value)
                }
                value={INDUSTRY_AREAS.find(
                  (option) => option.value === formData.industry
                )}
              />
            </div>
          </div>
          <div className="row">
            <div className="col">
              <button
                type="button"
                className="btn btn-primary"
                onClick={handleNext}
                disabled={!isStep1Valid}
              >
                Next
              </button>
            </div>
          </div>
        </div>
      );
    case 2:
      return (
        <div className="mb-3">
          <label htmlFor="description" className="form-label">
            Description
          </label>
          <textarea
            className="form-control"
            id="description"
            name="description"
            value={formData.description}
            onChange={handleChange}
            rows="3"
            required
          ></textarea>
          <label htmlFor="description" className="form-label">
            Team Members:
          </label>
          <UserSuggestions
            handleUserSelect={handleUserSelect}
            userType={USER_TYPES.CONSULTANT}
          />
          <div className="row">
            <div className="col">
              <button
                type="button"
                className="btn btn-secondary mr-2"
                onClick={handlePrevious}
              >
                Previous
              </button>
              <button
                type="button"
                className="btn btn-primary"
                onClick={handleNext}
              >
                Next
              </button>
            </div>
          </div>
        </div>
      );
    // Add more cases for additional steps as needed
    default:
      return null;
  }
};

export default RenderStep;
