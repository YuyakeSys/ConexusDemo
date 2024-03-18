"use client";
import React, { useState, useEffect } from "react";
import Select from "react-select";
import { API_URLS } from "@/app/utils/constant";

function UserSuggestions({ handleUserSelect, userType }) {
  const [inputValue, setInputValue] = useState("");
  const [suggestions, setSuggestions] = useState([]);
  const [selectedOptions, setSelectedOptions] = useState([]);

  // Fetch suggestions
  const fetchSuggestions = async (inputValue) => {
    const response = await fetch(
      `${API_URLS.BASIC_URL}member/suggestions?name=${inputValue}&user_type=${userType}`
    );
    const data = await response.json();
    const formattedSuggestions = data.map((user) => ({
      value: user.id,
      label: user.full_name,
    }));
    setSuggestions(formattedSuggestions);
  };

  // Handle input change and fetch suggestions
  useEffect(() => {
    if (inputValue.length > 1) {
      fetchSuggestions(inputValue);
    }
  }, [inputValue, userType]);

  // Handle selection
  const handleChange = (selectedOptions) => {
    setSelectedOptions(selectedOptions);
    handleUserSelect(selectedOptions.map((option) => option.value));
  };

  // Create custom option renderer if needed
  const formatOptionLabel = ({ value, label }) => (
    <div>
      {label} {/* Customize option rendering */}
    </div>
  );

  // Load options on input change
  const handleInputChange = (newValue) => {
    setInputValue(newValue);
    return newValue;
  };

  return (
    <Select
      isMulti 
      value={selectedOptions}
      onChange={handleChange}
      options={suggestions}
      onInputChange={handleInputChange}
      formatOptionLabel={formatOptionLabel}
      placeholder="Search users..."
    />
  );
}

export default UserSuggestions;
