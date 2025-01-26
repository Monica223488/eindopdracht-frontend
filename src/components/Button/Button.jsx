import React from 'react';
import './Button.module.css';

function Button({text, onClick, type, clickHandler}) {
    return (
        <>
            <button
            onClick={clickHandler}
            type={type}>
                {text}

            </button>
        </>
    )
}

export default Button;