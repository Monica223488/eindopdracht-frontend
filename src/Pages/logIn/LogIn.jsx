import React from 'react';
import styles from './LogIn.module.css';
import InputField from '../../components/InputField/InputField.jsx';
import Button from '../../components/Button/Button.jsx';
import { Link, useNavigate } from "react-router-dom";
import {AuthContext} from '../../context/AuthContext.jsx'
import {useContext, useState} from "react";
import axios from 'axios';
import AuthenticatePage from "../../components/AuthenticatePage/AuthenticatePage.jsx";

function LogIn() {
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [error, toggleError] = useState(false);
    const {login} = useContext(AuthContext);
    const navigate = useNavigate();

    async function handleSubmit(e){
        e.preventDefault();
        toggleError(false);

        try{
            const result = await axios.post("https://novi-backend-api-wgsgz.ondigitalocean.app/api/login",
                {email: email,
                password: password},
                {headers: {
                        "Content-Type": "application/json",
                        "novi-education-project-id": "35d6eeb3-c55f-4b14-a12a-9274341e30b1"
                    }});

            login(result.data.token);

            navigate("/", {
                state: {
                    message: "Je bent succesvol ingelogd."
                }
            });
        } catch (e) {
            toggleError(true);
        }
    }
    return (
        <>
            <AuthenticatePage title="Inloggen">
                <form className={styles["login-form"]} onSubmit={handleSubmit}>
                    <p>Log eerst in om gebruik te maken van MoovieMatcher</p>
                    <InputField name="email" label="e-mail:" inputType="text" value={email}
                                changeHandler={setEmail} placeholder="Vul hier je email in"/>
                    <InputField name="password" label="wachtwoord:" inputType="password" value={password}
                                changeHandler={setPassword} placeholder="Vul hier je wachtwoord in"/>
                    <Button text="inloggen" type="submit" />
                    {error && <p>Het inloggen is mislukt. Controleer je gegevens.</p>}
                    <p>Nog geen account? Klik dan{" "}<Link to={"/registreren"}><strong>hier</strong></Link> om naar de registratiepagina te gaan.</p>
                </form>
            </AuthenticatePage>
        </>
    )
}

export default LogIn;