import React, { useState, useRef } from 'react';
import axios from 'axios';

function FormProfile(props) {
    const nameInputRef = useRef();
    const locationInputRef = useRef();
    const skillsInputRef = useRef();
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
    
    function submitHandler(event) {
        event.preventDefault();
        const enteredName = nameInputRef.current.value;
        const enteredLocation = locationInputRef.current.value;
        const enteredSkills = skillsInputRef.current.value;

        const profileData = {
            name: enteredName,
            location: enteredLocation,
            location: enteredSkills,
        };

        props.onEditProfile(profileData);
    }
    return (
        <form onSubmit={submitHandler}>
            <div className="form-group row">
                <label className="col-sm-2 col-form-label" htmlFor="name">Name</label>
                <div className="col-sm-10">
                    <input className="form-control" type="text" required id="name" ref={nameInputRef} />
                </div>
            </div>
            <div className="form-group row">
                <label className="col-sm-2 col-form-label" htmlFor="location">Location</label>
                <div className="col-sm-10">
                    <input className="form-control" type="text" required id="location" ref={locationInputRef} />
                </div>
            </div>
            <div className="form-group row">
                <label className="col-sm-2 col-form-label" htmlFor="skills">Skills</label>
                <div className="col-sm-10">
                    <input 
                        className="form-control" 
                        type="text" 
                        required
                        id="skills" 
                        ref={skillsInputRef}
                        value={inputValue} 
                        onChange={handleChange} 
                        onKeyDown={handleKeyDown} 
                    />
                </div>
            </div>
            <div className="form-group row">
                <label className="col-sm-2 col-form-label" htmlFor="skills"></label>
                <div className="col-sm-10">
                    {suggestions.map((suggestion, index) => (
                    <a className="dropdown-item" key={index} onClick={() => handleSelect(suggestion)}>
                    {suggestion}
                    </a>
                    ))}
                </div>
            </div>
            {/* <div>
                <button className="btn btn-primary">Save</button>
            </div> */}
        </form>
    );
}

export default FormProfile;