import React, { useState } from 'react';
import FormTemplate from './form_template';
import { Country } from 'country-state-city';

function CountryInput(props) {
    const inputType = "Country";
    const countries = Country.getAllCountries();
    const [inputCountryValue, setInputCountryValue] = useState("");
    const [showCountryList, setShowCountryList] = useState(false);
    const [filteredCountries, setFilteredCountries] = useState([]);

    const handleCountryChange = (event) => {
        const value = event.target.value;
        setInputCountryValue(value);
        setFilteredCountries(countries.filter(country => country.name.toLowerCase().startsWith(value.toLowerCase())));
        setShowCountryList(true);

        if (value === ''){
            setShowCountryList(false);
        }
    };

    const handleCountrySelect = (countryName) => {
        setInputCountryValue(countryName);
        props.valueReceived(inputType.toLowerCase(), countryName);
        setShowCountryList(false);
    };

    return (
        <FormTemplate 
            inputValue={inputCountryValue}
            handleChange={handleCountryChange}
            inputType={inputType}
            showList={showCountryList}
            filteredItems={filteredCountries}
            handleSelect={handleCountrySelect}
        />
    );
}

export default CountryInput;
