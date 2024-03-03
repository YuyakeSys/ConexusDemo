"use client";
import { API_URLS } from "@/app/utils/constant";
import React, { useState } from "react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faDeleteLeft } from "@fortawesome/free-solid-svg-icons";

function UserSuggestions({ handleUserSelect, removeUserSelect }) {
  const [inputValue, setInputValue] = useState("");
  const [suggestions, setSuggestions] = useState([]);
  const [showDropdown, setShowDropdown] = useState(false);
  const [selectedUserDetails, setSelectedUserDetails] = useState([]);
  // Component implementation remains the same...
  const fetchSuggestions = async (inputValue) => {
    // Use the constant for the URL
    const response = await fetch(
      `${API_URLS.BASIC_URL}member/suggestions?name=${inputValue}`
    );
    const data = await response.json();
    setSuggestions(data);
  };

  const handleInputChange = (event) => {
    const value = event.target.value;
    setInputValue(value);
    if (value.length > 2) {
      setShowDropdown(true);
      fetchSuggestions(value);
    } else {
      setShowDropdown(false);
      setSuggestions([]);
    }
  };

  const removeSelect = (userId) => {
    removeUserSelect(userId);
    // remove from selectedUserDetails
    setSelectedUserDetails(
      selectedUserDetails.filter((user) => user.id !== userId)
    );
  };

  //if user id is selected
  const isUserSelected = (userId) => {
    return selectedUserDetails.some((user) => user.id === userId);
  };

  const selectUser = (user) => {
    handleUserSelect(user.id); // Update parent state
    setSelectedUserDetails([...selectedUserDetails, user]); // Update local state
    setShowDropdown(false);
    setInputValue(""); // Clear the input value
  };

  return (
    <div className="position-relative">
      <div className="selected-users">
        {selectedUserDetails.map((user) => (
          <div key={user.id} className="selected-user">
            {user.fullname} {/* Display user name */}
            <button
              onClick={() => removeSelect(user.id)}
              className="remove-user-btn"
            >
              <FontAwesomeIcon icon={faDeleteLeft} />
            </button>
          </div>
        ))}
      </div>
      <input
        type="text"
        className="form-control"
        value={inputValue}
        onChange={handleInputChange}
        placeholder="Search users..."
      />
      {showDropdown && suggestions.length > 0 && (
        <ul className="list-group position-absolute w-100">
          {suggestions.map((user) => (
            <li
              key={user.id}
              className={`list-group-item list-group-item-action ${
                isUserSelected(user.id) ? "disabled" : ""
              }`}
              onClick={() => selectUser(user)} // Pass the whole user object
            >
              {user.fullname}
            </li>
          ))}
        </ul>
      )}
    </div>
  );
}

export default UserSuggestions;
