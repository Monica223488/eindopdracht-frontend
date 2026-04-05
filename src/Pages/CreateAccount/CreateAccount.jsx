import {useEffect, useState} from 'react';
import styles from './CreateAccount.module.css';
import {Link, useNavigate} from 'react-router-dom';
import axios from 'axios';
import InputField from '../../components/InputField/InputField.jsx';
import Button from '../../components/Button/Button.jsx';



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
                     "/api/users",{
                     email: email,
                     username: username,
                     password: password,
                         info: "[]",
                 }, {
                     headers: {
                     "Content-Type":"application/json",
                     "X-Api-Key": "mooviematcher:RG3eIYx4yvmjXMS2Y5HO"}
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
            <div className={styles["create-account-container"]}>
                <div className={styles["create-account-text"]}>
                    <h1>Welke film wil je kijken? Eens iets buiten je comfortzone?</h1>
                </div>
                <form className={styles["create-account-form"]} onSubmit={handleSubmitAccount}>
                    <h2>Registreren</h2>
                    <p>Vul onderstaande velden in om je te registreren</p>
                    <InputField name="email" label="e-mailadres:" inputType="email"
                                value={email} changeHandler={setEmail}
                                placeholder="Vul hier je e-mailadres in" />
                    <InputField name="create-username" label="gebruikersnaam:" inputType="text"
                                value={username} changeHandler={setUsername}
                                placeholder="Kies een gebruikersnaam" />
                    <InputField name="create-password" label="wachtwoord:" inputType="password"
                                value={password} changeHandler={setPassword}
                                placeholder="Kies een wachtwoord"/>
                    <Button text={loading ? "Registreren..." : "registreren"} type="submit"/>
                    {error && <p>Registreren is niet gelukt. Probeer het opnieuw.</p>}
                    <p>Al een account? Klik{" "} <Link to="/inloggen"><strong>hier</strong></Link> om naar de inlogpagina te gaan.</p>
                </form>
            </div>
        </>
    )
}

export default CreateAccount;