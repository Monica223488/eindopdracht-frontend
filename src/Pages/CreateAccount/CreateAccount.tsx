import { type FormEvent, useState } from 'react';
import axios from 'axios';
import { Link, useNavigate } from 'react-router-dom';

import AuthenticateLayout from '../../components/AuthenticateLayout/AuthenticateLayout';
import Button from '../../components/Button/Button';
import InputField from '../../components/InputField/InputField';

import styles from './CreateAccount.module.css';

const apiUrl = import.meta.env.VITE_API_URL;

function CreateAccount() {
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [name, setName] = useState('');
    const [error, toggleError] = useState(false);
    const [loading, toggleLoading] = useState(false);
    const navigate = useNavigate();


        async function handleSubmitAccount (e: FormEvent<HTMLFormElement>) {
             e.preventDefault();
             toggleError(false);
             toggleLoading(true);

             try {
                 await axios.post(`${apiUrl}/auth/register`, {
                     name,
                     email,
                     password,
                 });

                navigate("/inloggen");

            }catch(e) {
                 console.error("Registreren mislukt:", error);
                 toggleError(true);
             } finally {
                 toggleLoading(false);
             }
     }
    return (
        <>
            <AuthenticateLayout title="Registreren">
                <form className={styles["create-account-form"]} onSubmit={handleSubmitAccount}>
                    <p>Maak een account aan om films op te slaan.</p>
                    <InputField name="naam" inputType="text"
                                label="naam:" value={name} changeHandler={setName}
                                placeholder="Vul hier je naam in"
                                autoComplete="name"/>
                    <InputField name="email" label="e-mailadres:" inputType="email"
                                value={email} changeHandler={setEmail}
                                placeholder="Vul hier je e-mailadres in"
                                autoComplete="email"/>
                    <InputField name="create-password" label="wachtwoord:" inputType="password"
                                value={password} changeHandler={setPassword}
                                placeholder="Kies een wachtwoord"
                                autoComplete="new-password"/>
                    <Button text={loading ? "Registreren..." : "registreren"} type="submit"/>
                    {error && <p>Het registreren is niet gelukt. Probeer het opnieuw.</p>}
                    <p>Al een account? Log{" "} <Link to="/inloggen"><strong>hier</strong></Link> in.</p>
                </form>
            </AuthenticateLayout>
        </>
    )
}

export default CreateAccount;