import React from 'react';
import styles from './LogIn.module.css';
import InputField from '../../components/InputField/InputField.jsx';
import Button from '../../components/Button/Button.jsx';
import Movietheater from '../../assets/jake-hills-23LET4Hxj_U-unsplash.jpg'

function LogIn() {
    return (
        <>
            <div className={styles["login-container"]}>
                <div className={styles["login-image"]}>
                <h1>Welke film wil je kijken? Eens iets buiten je comfortzone?</h1>
                <img src={Movietheater} alt="bioscoop"/>
                </div>
                <form className={styles["login-form"]}>
                    <h2>Inloggen</h2>
                    <p>Log eerst in om gebruik te maken van MoovieMatcher</p>
                    <InputField name="username" label="gebruikersnaam:" inputType="text" placeholder="Vul hier je gebruikersnaam in"/>
                    <InputField name="password" label="wachtwoord:" inputType="password" placeholder="Vul hier je wachtwoord in"/>
                    <Button text="inloggen" />
                    <p>Nog geen account? Klik dan hier om naar de registratiepagina te gaan.</p>
                </form>
            </div>
        </>
    )
}

export default LogIn;