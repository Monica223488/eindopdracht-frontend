import React from 'react';
import './InputField.module.css';

function InputField({ name, inputType, label, value, changeHandler}) {
    return (
        <>
            <label htmlFor={`${name}-field`}>{label}</label>
            <input
                name={`${name}-field`}
                id={`${name}-field`}
                type={inputType}
                value={value}
                onChange={(e) => changeHandler(e.target.value)}
            />
        </>
    );
}

export default InputField;