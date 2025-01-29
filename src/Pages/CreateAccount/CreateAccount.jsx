import {useEffect, useState} from 'react';
import styles from './CreateAccount.module.css';
import {Link, useNavigate} from 'react-router-dom';
import axios from 'axios';
import InputField from '../../components/InputField/InputField.jsx';
import Button from '../../components/Button/Button.jsx';
import Movietheater from '../../assets/jake-hills-23LET4Hxj_U-unsplash.jpg'


function CreateAccount() {
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [username, setUsername] = useState('');

    const [error, toggleError] = useState(false);
    const [loading, toggleLoading] = useState(false);
    const navigate = useNavigate();

    const source = axios.CancelToken.source();

    useEffect(() => {
        return function cleanup() {
            source.cancel();
        }
    }, [] );

        async function handleSubmitAccount (e) {
            e.preventDefault();
            toggleError(false);
            toggleLoading(false);

            try {
                await axios.post(, {
                    email: email,
                    password: password,
                    username: username,
                }, {
                    cancelToken: source.token,
                });

                navigate('/inloggen');

            }catch(e) {
                console.error(e);
                toggleError(true);
            }
            toggleLoading(false);
    }
    return (
        <>
            <div className={styles["create-account-container"]}>
                <div className={styles["create-account-image"]}>
                    <h1>Welke film wil je kijken? Eens iets buiten je comfortzone?</h1>
                    <img src={Movietheater} alt="bioscoop"/>
                </div>
                <form className={styles["create-account-form"]}>
                    <h2>Registreren</h2>
                    <p>Vul onderstaande velden in om je te registreren</p>
                    <InputField name="email" label="e-mailadres:" inputType="email" placeholder="Vul hier je e-mailadres in" />
                    <InputField name="create-username" label="gebruikersnaam:" inputType="text" placeholder="Kies een gebruikersnaam" />
                    <InputField name="create-password" label="wachtwoord:" inputType="password" placeholder="Kies een wachtwoord"/>
                    <Button text="registreren"/>
                    <p>Al een account? Klik hier om naar de inlogpagina te gaan.</p>
                </form>
            </div>
        </>
    )
}

export default CreateAccount;