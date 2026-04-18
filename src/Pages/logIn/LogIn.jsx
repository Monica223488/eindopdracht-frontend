import React from 'react';
import styles from './LogIn.module.css';
import InputField from '../../components/InputField/InputField.jsx';
import Button from '../../components/Button/Button.jsx';
import { Link } from "react-router-dom";
import {AuthContext} from '../../context/AuthContext.jsx'
import {useContext, useEffect, useState} from "react";
import axios from 'axios';
import AuthenticatePage from "../../components/AuthenticatePage/AuthenticatePage.jsx";

function LogIn() {
    const [username, setUsername] = useState('');
    const [password, setPassword] = useState('');
    const [error, toggleError] = useState(false);
    const {login} = useContext(AuthContext);

    useEffect(()=> {
        const source = axios.CancelToken.source();
        return function cleanup(){
            source.cancel();
        }
    }, []);

    async function handleSubmit(e){
        e.preventDefault();
        toggleError(false);

        try{
            const result = await axios.post("/api/usersauthenticate",
                {username: username,
                password: password});

            console.log(result.data);

            login(result.data.jwt);
        } catch (e) {
            console.error(e);
            toggleError(true);
        }
    }
    return (
        <>
            <AuthenticatePage title="Inloggen">
                <form className={styles["login-form"]} onSubmit={handleSubmit}>
                    <p>Log eerst in om gebruik te maken van MoovieMatcher</p>
                    <InputField name="username" label="gebruikersnaam:" inputType="text" value={username}
                                changeHandler={setUsername} placeholder="Vul hier je gebruikersnaam in"/>
                    <InputField name="password" label="wachtwoord:" inputType="password" value={password}
                                changeHandler={setPassword} placeholder="Vul hier je wachtwoord in"/>
                    <Button text="inloggen" type="submit" />
                    {error && <p>Inloggen mislukt. Controleer je gegevens.</p>}
                    <p>Nog geen account? Klik dan{" "}<Link to={"/registreren"}><strong>hier</strong></Link> om naar de registratiepagina te gaan.</p>
                </form>
            </AuthenticatePage>
        </>
    )
}

export default LogIn;