import styles from './Questionnaire.module.css';
import {useEffect, useState} from 'react';
import axios from 'axios';
import Movie from '../../components/Movie/Movie.jsx';
import InputField from '../../components/InputField/InputField.jsx';
import Header from '../../components/header/Header.jsx'
import popcorn from '../../assets/popcorn.png'
import Button from "../../components/Button/Button.jsx";

function Questionnaire() {
    const [movies, setMovies] = useState({});
    const [loading, toggleLoading] = useState(false);
    const [error, toggleError] = useState(false);
    const [endpoint, setEndpoint] = useState('https://api.themoviedb.org/3/discover/movie',
        {params: {api_key: import.meta.env.VITE_API_KEY,},});

    const handleSubmit = (e) =>
        e.preventDefault();
        console.log("Je formulier is verzonden");

    useEffect(() => {
        const controller = new AbortController();

        async function fetchData() {
            try {
                const {data} = await axios.get(endpoint, {params: {api_key: import.meta.env.VITE_API_KEY,}});
                console.log(data.results);
                setMovies(data.results);
            } catch (e) {
                if (axios.isCancel(e)) {
                    console.error('Helaas is het niet gelukt');
                } else {
                    console.error(e);
                    toggleError(true);
                }
            } finally {
                toggleLoading(false);
            }
        }

            if (endpoint) {
                fetchData(endpoint);
            }

            return () => {
            controller.abort();
        }
    }, [endpoint]);

    return (
        <>
            <Header title="Vragenlijst" icon={popcorn}>
                <p>Vul deze vragenlijst in om een film suggestie te krijgen</p>
            </Header>
            <form onSubmit={handleSubmit}>
                <p>Wil je vandaag eens iets kijken buiten je comfortzone? Vul dan onderstaande vragenlijst in en laat je
                    verrassen.</p>
                <p>Welke genres kijk je het meeste?</p>
                <p>Kijk je recente films(de afgelopen 5 jaar) of oudere films?</p>
                <fieldset>
                    <legend>Welke talen kijk je meestal een film?</legend>
                    <div className={styles["checkbox-container"]}>
                        <div>
                            <input type="checkbox" id="Engels" name="Engels"/>
                            <label htmlFor="Engels">Engels</label>
                        </div>

                        <div>
                            <input type="checkbox" id="Nederlands" name="Nederlands"/>
                            <label htmlFor="Nederlands">Nederlands</label>
                        </div>
                        <div>
                            <input type="checkbox" id="Frans" name="Frans"/>
                            <label htmlFor="Frans">Frans</label>
                        </div>
                        <div>
                            <input type="checkbox" id="Duits" name="Duits"/>
                            <label htmlFor="Duits">Duits</label>
                        </div>
                        <Button text="Uitkomsten" type="submit"></Button>
                    </div>
                </fieldset>
            </form>
            {Object.keys(movies).length > 0 &&
            <article>
                <span>
                    <img/>
                    <h2>{Movie.title}</h2>
                </span>
            </article>}
        </>
    )
}

export default Questionnaire;