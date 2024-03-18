import React from 'react';

function FormTemplate({ inputValue, handleChange, inputType, showList, filteredItems, handleSelect }) {
    return (
        <div>
            <div className="form-group row">
                <label className="col-sm-2 col-form-label" htmlFor={inputType}>{inputType}</label>
                <div className="col-sm-10">
                    <input 
                        className="form-control" 
                        type="text" 
                        required
                        id={inputType} 
                        value={inputValue} 
                        onChange={handleChange}
                    />
                </div>
            </div>

            <div className="form-group row">
                <label className="col-sm-2 col-form-label"></label>
                <div className="col-sm-10">
                    {showList && (
                        <ul className="form-control">
                            {filteredItems.map((item, index) => (
                                // TODO: need to consider the situation where the total number of items is less than 5."
                                index < 5 && (
                                    <li className="py-2 pl-2 pr-2"
                                        style={{ listStyleType: 'none'}}
                                        key={index}
                                        onClick={() => handleSelect(item.name)}>
                                        {item.name}
                                    </li>
                                )
                            ))}
                        </ul>
                    )}
                </div>
            </div>
        </div>
    );
}

export default FormTemplate;
