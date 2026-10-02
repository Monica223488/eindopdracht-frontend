import {type FormEvent, useState} from 'react';
import axios from 'axios';
import {Link, useNavigate} from 'react-router-dom';

import {useAuth} from '../../context/AuthContext';

import AuthenticateLayout from '../../components/AuthenticateLayout/AuthenticateLayout';
import Button from '../../components/Button/Button';
import InputField from '../../components/InputField/InputField';

import styles from './LogIn.module.css';

const noviApiUrl = import.meta.env.VITE_NOVI_API_URL;
const projectId = import.meta.env.VITE_NOVI_PROJECT_ID;

type LoginResponse = {
    token: string;
};

function LogIn() {
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [error, toggleError] = useState(false);
    const {login} = useAuth();
    const navigate = useNavigate();

    async function handleSubmit(e:FormEvent<HTMLFormElement>) {
        e.preventDefault();
        toggleError(false);

        try {
            const response = await axios.post(
                'http://localhost:8080/auth/login',
                {
                    email,
                    password,
                }
            );

            login(response.data.token);

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
            <AuthenticateLayout title="Inloggen">
                <form className={styles["login-form"]} onSubmit={handleSubmit}>
                    <p>Log in om je favoriete films op te slaan.</p>
                    <InputField name="email" label="e-mail:" inputType="text" value={email}
                                changeHandler={setEmail} placeholder="Vul hier je email in"/>
                    <InputField name="password" label="wachtwoord:" inputType="password" value={password}
                                changeHandler={setPassword} placeholder="Vul hier je wachtwoord in"/>
                    <Button text="inloggen" type="submit"/>
                    {error && <p>Het inloggen is mislukt. Controleer je gegevens.</p>}
                    <p>Nog geen account? Registreer{" "}<Link to={"/registreren"}><strong>hier</strong></Link>. </p>
                </form>
            </AuthenticateLayout>
        </>
    )
}

export default LogIn;