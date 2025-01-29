import React from 'react';
import './InputField.module.css';


function InputField({ name, inputType, label, value, changeHandler, placeholder}) {
    return (
        <>
            <label htmlFor={`${name}-field`}>{label}</label>
            <input
                name={`${name}-field`}
                id={`${name}-field`}
                type={inputType}
                value={value}
                placeholder={placeholder}
                onChange={(e) => changeHandler(e.target.value)}
            />
        </>
    );
}

export default InputField;