import React, { useState } from 'react';
import axios from 'axios';

const SkillSuggest = () => {
  const [inputValue, setInputValue] = useState('');
  const [suggestions, setSuggestions] = useState([]);

  const handleChange = async (event) => {
    const { value } = event.target;
    setInputValue(value);

    // Fetch suggestions from backend based on input value
    try {
      const response = await axios.get(`http://localhost:3000/api/v1/suggestions?query=${value}`);
      setSuggestions(response.data);
    } catch (error) {
      console.error("Didn't get response from back-end, the error information is: ", error);
    }
  };

  const handleSelect = (suggestion) => {
    setInputValue(suggestion);
    setSuggestions([]);
  };

  return (
    <div>
      <input 
        type="text" 
        value={inputValue} 
        onChange={handleChange} 
        placeholder="Type your skills..." 
      />
      <ul>
        {suggestions.map((suggestion, index) => (
          <li key={index} onClick={() => handleSelect(suggestion)}>
            {suggestion}
          </li>
        ))}
      </ul>
    </div>
  );
};

export default SkillSuggest;