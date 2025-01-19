import React from 'react';
import './LogIn.css';
import InputField from '../../components/InputField/InputField.jsx';

function LogIn() {
    return (
        <>
            <h2>Hier kun je inloggen</h2>
            <div className="login-container">
                <h1>Welke film wil je kijken? Eens iets buiten je comfortzone?</h1>
            <form>
                <InputField/>
                <InputField/>
            </form>
            </div>
        </>
    )
}

export default LogIn;