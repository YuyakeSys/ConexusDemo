import React, { useState } from 'react';
import axios from 'axios';

const SkillSuggest = () => {
  const [inputValue, setInputValue] = useState('');
  const [suggestions, setSuggestions] = useState([]);
  
  const handleChange = async (event) => {
    const { value } = event.target;
    setInputValue(value);
    if (value !== '') {
      // Fetch suggestions from backend based on input value
      try {
        const response = await axios.get(`http://localhost:3000/api/v1/suggestions?query=${value}`);
        setSuggestions(response.data);
      } catch (error) {
        console.error("Didn't get response from back-end, the error information is: ", error);
      }
    } else {
      setSuggestions([]);
    }
  };

  const handleSelect = (suggestion) => {
    setInputValue(suggestion);

    const allCookies = document.cookie;
    const decodedCookies = decodeURIComponent(allCookies);
    const cookieArray = decodedCookies.split(';').map(cookie => cookie.trim());
    const userCookie = cookieArray.find(cookie => cookie.startsWith('user='));

    if (userCookie) {
      const userID = JSON.parse(userCookie.split('=')[1]).id;
      axios.post('http://localhost:3000/api/v1/saveUserSkill', { value: suggestion, user_id: userID })
      .then(response => {
        console.log('Saved successfully to user_skills!');
      })
      .catch(error => {
        console.error('Failed to save to user_skills:', error);
      });
    } else {
      console.log('ERROR ERROR ERROR: no user_id founded!');
    }

    setSuggestions([]);
  };

  const handleKeyDown = (event) => {
    if (event.key === 'Enter') {
      console.log("I am pressing enter key")
      axios.post('http://localhost:3000/api/v1/saveSkill', { value: inputValue })
      .then(response => {
        console.log('Saved successfully to skills!');
      })
      .catch(error => {
        console.error('Failed to save to skills:', error);
      });

      const allCookies = document.cookie;
      const decodedCookies = decodeURIComponent(allCookies);
      const cookieArray = decodedCookies.split(';').map(cookie => cookie.trim());
      const userCookie = cookieArray.find(cookie => cookie.startsWith('user='));

      const userID = JSON.parse(userCookie.split('=')[1]).id;
      axios.post('http://localhost:3000/api/v1/saveUserSkill', { value: inputValue, user_id: userID })
      .then(response => {
        console.log('Saved successfully to user_skills!');
      })
      .catch(error => {
        console.error('Failed to save to user_skills:', error);
      });
   }
  };

  return (
    <div>
      <div>
        <input 
          type="text" 
          value={inputValue} 
          onChange={handleChange} 
          onKeyDown={handleKeyDown} 
          placeholder="Type your skills..." 
        />
      </div>
      <div>
        <ul>
          {suggestions.map((suggestion, index) => (
            <li key={index} onClick={() => handleSelect(suggestion)}>
              {suggestion}
            </li>
          ))}
        </ul>
      </div>
    </div>
  );
};

export default SkillSuggest;