import {useEffect, useState} from 'react';
import styles from './CreateAccount.module.css';
import {Link, useNavigate} from 'react-router-dom';
import axios from 'axios';
import InputField from '../../components/InputField/InputField.jsx';
import Button from '../../components/Button/Button.jsx';
import AuthenticatePage from "../../components/AuthenticatePage/AuthenticatePage.jsx";



function CreateAccount() {
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [username, setUsername] = useState('');
    const [error, toggleError] = useState(false);
    const [loading, toggleLoading] = useState(false);
    const navigate = useNavigate();


        async function handleSubmitAccount (e) {
             e.preventDefault();
             toggleError(false);
             toggleLoading(true);

             try {
                 await axios.post(
                     "https://novi-backend-api-wgsgz.ondigitalocean.app/api/users",{
                     email: email,
                     username: username,
                     password: password,
                         roles:["user"]
                 }, {
                     headers: {
                     "Content-Type":"application/json",
                         "novi-education-project-id": "35d6eeb3-c55f-4b14-a12a-9274341e30b1"}
                 });

                navigate("/inloggen");

            }catch(e) {
                 console.error(e);
                 toggleError(true);
             } finally {
                 toggleLoading(false);
             }
     }
    return (
        <>
            <AuthenticatePage title="Registreren">
                <form className={styles["create-account-form"]} onSubmit={handleSubmitAccount}>
                    <p>Vul onderstaande velden in om je te registreren</p>
                    <InputField name="email" label="e-mailadres:" inputType="email"
                                value={email} changeHandler={setEmail}
                                placeholder="Vul hier je e-mailadres in" />
                    <InputField name="create-password" label="wachtwoord:" inputType="password"
                                value={password} changeHandler={setPassword}
                                placeholder="Kies een wachtwoord"/>
                    <Button text={loading ? "Registreren..." : "registreren"} type="submit"/>
                    {error && <p>Het registreren is niet gelukt. Probeer het opnieuw.</p>}
                    <p>Al een account? Klik{" "} <Link to="/inloggen"><strong>hier</strong></Link> om naar de inlogpagina te gaan.</p>
                </form>
            </AuthenticatePage>
        </>
    )
}

export default CreateAccount;