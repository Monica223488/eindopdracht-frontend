import React from 'react';
import styles from './LogIn.module.css';
import InputField from '../../components/InputField/InputField.jsx';
import Button from '../../components/Button/Button.jsx';
import { Link, useNavigate } from "react-router-dom";
import {AuthContext} from '../../context/AuthContext.jsx'
import {useContext, useState} from "react";
import {jwtDecode} from "jwt-decode";
import axios from 'axios';
import AuthenticatePage from "../../components/AuthenticatePage/AuthenticatePage.jsx";

const noviApiUrl = import.meta.env.VITE_NOVI_API_URL;
const projectId = import.meta.env.VITE_NOVI_PROJECT_ID;

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
            const result = await axios.post(`${noviApiUrl}/login`,
                {email: email,
                password: password},
                {headers: {
                        "Content-Type": "application/json",
                        "novi-education-project-id": projectId
                    }});

            const decodedToken = jwtDecode(result.data.token);

            const loggedInUser = {
                ...result.data.user,
                id: decodedToken.userId,
            };

            console.log("Opgeslagen gebruiker:", loggedInUser);

            localStorage.setItem("token", result.data.token);
            localStorage.setItem("user", JSON.stringify(loggedInUser));

            console.log("Loginresponse:", result.data);

            login(result.data.token, loggedInUser);

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