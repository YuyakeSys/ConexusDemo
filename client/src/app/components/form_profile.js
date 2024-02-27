import React, { useState, useRef, useEffect } from 'react';
import axios from 'axios';

function FormProfile(props) {
    const nameInputRef = useRef();
    const locationInputRef = useRef();
    const skillsInputRef = useRef();
    const [inputValue, setInputValue] = useState('');
    const [suggestions, setSuggestions] = useState([]);
    const [isFirstInput, setIsFirstInput] = useState(false);
    const [showList, setShowList] = useState(false);

    useEffect(() => {
        const fetchData = async(value) => {
            try{
                const skill_list = await axios.get(`http://localhost:3000/api/v1/suggestions?query=${value}`);
                setSuggestions(skill_list.data);
            } catch (error) {
                console.error("No response:", error);
            }
        };
    
        if (isFirstInput) {
            fetchData(inputValue);
        }
    }, [isFirstInput, inputValue]);
    
    const handleChange = async (event) => {
        const { value } = event.target;
        setInputValue(value);

        if (value.length === 1) {
            setIsFirstInput(true);
            setShowList(true);
        } else if (value === '') {
            setSuggestions([])
            setIsFirstInput(false);
            setShowList(false);
        } else {
            setSuggestions(suggestions.filter(skill => skill.startsWith(value)))
            setIsFirstInput(false);
            setShowList(true);
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
        setShowList(false);
    };

    const handleKeyDown = (event) => {
        if (event.key === 'Enter') {
            console.log("I am pressing enter key")
            // axios.post('http://localhost:3000/api/v1/saveSkill', { value: inputValue })
            
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
                        // onBlur={() => setShowList(false)} 
                    />
                </div>
            </div>
            <div className="form-group row">
                <label className="col-sm-2 col-form-label" htmlFor="skills"></label>
                <div className="col-sm-10">
                    {showList && (
                        <ul className="form-control" >
                            {suggestions.map((suggestion, index) => (
                                <li className="py-2 pl-4 pr-9 truncate text-navy1" 
                                    key={index} 
                                    onClick={() => handleSelect(suggestion)}>
                                    {suggestion}
                                </li>
                            ))}
                        </ul>
                    )}
                </div>
            </div>
        </form>
    );
}

export default FormProfile;
