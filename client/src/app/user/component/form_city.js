import React, { useState } from 'react';
import FormTemplate from './form_template';
import { City } from 'country-state-city';

function CityInput(props) {
    const inputType = "City";
    const cities = City.getAllCities();
    const [inputCityValue, setInputCityValue] = useState("");
    const [showCityList, setShowCityList] = useState(false);
    const [filteredCities, setFilteredCities] = useState([]);

    const handleCityChange = (event) => {
        const value = event.target.value;
        setInputCityValue(value);
        setShowCityList(true);
        setFilteredCities(cities.filter(city => city.name.toLowerCase().startsWith(value.toLowerCase())));
    
        if (value === ''){
            setShowCityList(false);
        }
    };

    const handleCitySelect = (cityName) => {
        setInputCityValue(cityName);
        props.valueReceived(inputType.toLowerCase(), cityName);
        setShowCityList(false);
    };

    return (
        <FormTemplate 
            inputValue={inputCityValue}
            handleChange={handleCityChange}
            inputType={inputType} 
            showList={showCityList}
            filteredItems={filteredCities}
            handleSelect={handleCitySelect}
        />
    );
}

export default CityInput;
