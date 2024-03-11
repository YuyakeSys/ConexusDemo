import React, { useState, useRef, useEffect } from 'react';
import axios from 'axios';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faDeleteLeft } from '@fortawesome/free-solid-svg-icons';


function FormProfile(props) {
    const skillsInputRef = useRef();
    const [inputValue, setInputValue] = useState('');
    const [selectedItem, setSelectedItem] = useState([]);
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
        setInputValue('');
        setSuggestions([]);
        setShowList(false);

        setSelectedItem(selectedItem => {
            if (!selectedItem.includes(suggestion)) {
                return [...selectedItem, suggestion];
            }
            return selectedItem;
        });
    };

    const handleDelete = (deletedItem) => {
        console.log(`before selectitem: ${selectedItem}`);
        setSelectedItem(prevSelectedItem => {
            const updatedSelectedItem = selectedItem.filter(selectedItem => selectedItem !== deletedItem);
            console.log(`after selectitem: ${updatedSelectedItem}`);
            return updatedSelectedItem;
        });
    };

    function userSkillUpdate(prevProbs) {
            console.log("confirmed!")
            const allCookies = document.cookie;
            const decodedCookies = decodeURIComponent(allCookies);
            const cookieArray = decodedCookies.split(';').map(cookie => cookie.trim());
            const userCookie = cookieArray.find(cookie => cookie.startsWith('user='));

            if (userCookie) {
                const userID = JSON.parse(userCookie.split('=')[1]).id;
                axios.post('http://localhost:3000/api/v1/saveUserSkill', { user_id: userID, skills: selectedItem })
                .then(response => {
                    console.log('Saved successfully to user_skills!');
                })
                .catch(error => {
                    console.error('Failed to save to user_skills:', error);
                });
            } else {
                console.log('Error: no user_id founded!');
            }
    }
    
    return (
        <form>
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
                        // onKeyDown={handleKeyDown} 
                        // onBlur={() => setShowList(false)} 
                    />
                </div>
            </div>

            <div className="form-group row">
                {selectedItem.map((label, index) => (
                    <div className="col" style={{ flex: '0 0 30%' }} key={index} >
                        <span>{label}</span>
                        <button onClick={() => handleDelete(label)} 
                                style={{background: 'none', border: 'none', padding: 2, cursor: 'pointer', width: '30px'}}>
                            <FontAwesomeIcon icon={faDeleteLeft} />
                          </button>
                    </div>
                ))}
            </div>

            <div className="form-group row">
                <label className="col-sm-2 col-form-label" htmlFor="skills"></label>
                <div className="col-sm-10">
                    {showList && (
                        <ul className="form-control" >
                        <li className="py-2 pl-2 pr-2" 
                                style={{ listStyleType: 'none' }}
                                onClick={() => handleSelect(inputValue)}>
                                {inputValue}
                        </li>
                        {suggestions.map((suggestion, index) => (
                            <li className="py-2 pl-2 pr-2" 
                                style={{ listStyleType: 'none' }}
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
