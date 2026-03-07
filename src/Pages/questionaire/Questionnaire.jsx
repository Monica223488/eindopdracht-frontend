import styles from './Questionnaire.module.css';
import layout from "../../styles/shared-layout.module.css"
import axios from 'axios';
import {useState} from "react";
import {invertAnswers} from "../../Helpers/invertAnswers.js";
import Movie from '../../components/Movie/Movie.jsx';
import Header from '../../components/header/Header.jsx'
import Button from '../../components/Button/Button.jsx';
import popcorn from '../../assets/popcorn.png'

function Questionnaire() {
    const [answers, setAnswers] = useState({
        language: "en",
        genreId: 28,
        recency: "recent",
    });
    const [movies, setMovies] = useState([]);
    const [showResults, setShowResults] = useState(false);
    const [loading, toggleLoading] = useState(false);
    const [error, toggleError] = useState(false);

    async function handleSubmit (e) {
        e.preventDefault();
        console.log("Je formulier is verzonden");
        toggleLoading(true);
        toggleError(false);

        try{
            const inverted = invertAnswers(answers);

            const {data} = await axios.get(
            "https://api.themoviedb.org/3/discover/movie",
                {
                    params: {
                        api_key: import.meta.env.VITE_API_KEY,
                        with_original_language: inverted.language,
                        with_genres: inverted.genreId,
                        'primary_release_date.gte': inverted.gte,
                        'primary_release_date.lte': inverted.lte,
                        language: "nl-NL",
                        page: 1,
                    },
                }
            );
        setMovies(data.results ?? []);
        setShowResults(true);
    } catch (e) {
        console.error(e);
        toggleError(true);
    } finally {
        toggleLoading(false);
    }
}

    return (
        <div>
            <Header title="Vragenlijst" icon={popcorn}>
                <p>Vul deze vragenlijst in om een film suggestie te krijgen</p>
            </Header>
            <main className={`${styles["questionnaire-main"]} ${layout["centered-column"]}`}>
                {!showResults ? (<form onSubmit={handleSubmit} className={styles["questionnaire-form"]}>
                        <p className={layout["centerText"]}>Wil je vandaag eens iets kijken buiten je comfortzone? Vul dan onderstaande vragenlijst in en laat je
                            verrassen.</p>
                        <fieldset className={styles["form-group"]}>
                            <legend>Welke genres kijk je het meeste?</legend>

                            <select className={styles["dropdown"]} value={answers.genreId} onChange={(e) => setAnswers((prev) => ({
                                ...prev, genreId: Number(e.target.value),
                            }))
                            }>
                                <option value={28}>Actie</option>
                                <option value={35}>Comedy</option>
                                <option value={27}>Horror</option>
                                <option value={18}>Drama</option>
                                <option value={10749}>Romantiek</option>
                                <option value={99}>Documentaire</option>
                            </select>
                        </fieldset>

                        <fieldset className={styles["form-group"]}>
                            <legend>Kijk je meestal recente films(de afgelopen 5 jaar) of oudere films?</legend>

                            <label>
                                <input type="radio" name="recency" value="recent" checked={answers.recency === 'recent'}
                                       onChange={(e) =>
                                           setAnswers((prev) => ({...prev, recency: e.target.value,}))}/>
                                Recente films
                            </label>

                            <label>
                                <input type="radio" name="recency" value="older" checked={answers.recency === 'older'}
                                       onChange={(e) =>
                                           setAnswers((prev) => ({...prev, recency: e.target.value,}))}/>
                                Oudere films
                            </label>
                        </fieldset>

                    <fieldset className={styles["form-group"]}>
                        <legend>In welke taal kijk je meestal een film?</legend>

                        <label>
                            <input type="radio" name="language" value="en"
                                   checked={answers.language === 'en'}
                                   onChange={(e) => setAnswers((prev) => ({
                                       ...prev, language: e.target.value,
                                   }))
                                   }/>
                            Engels
                        </label>

                        <label>
                            <input type="radio" name="language" value="nl"
                                   checked={answers.language === 'nl'}
                                   onChange={(e) => setAnswers((prev) => ({
                                       ...prev, language: e.target.value,
                                   }))
                                   }/>
                            Nederlands
                        </label>

                        <label>
                            <input type="radio" name="language" value="fr"
                                   checked={answers.language === 'fr'}
                                   onChange={(e) => setAnswers((prev) => ({
                                       ...prev, language: e.target.value,
                                   }))
                                   }/>
                            Frans
                        </label>

                        <label>
                            <input type="radio" name="language" value="de"
                                   checked={answers.language === 'de'}
                                   onChange={(e) => setAnswers((prev) => ({
                                       ...prev, language: e.target.value,
                                   }))
                                   }/>
                            Duits
                        </label>
                        </fieldset>

                        <Button text="Uitkomsten" type="submit"></Button>
                </form>
                    ) : (
                    <div className={layout["pageContent"]}>
                        <div className={layout["centeredButtonRow"]}>
                    <Button text="Terug naar de vragenlijst" type="button" clickHandler={() => setShowResults(false)}/>
                        </div>
            {loading && <p>Loading...</p>}
            {error && <p>Er ging iets mis bij het ophalen van films.</p>}

            {!loading && !error && (
                <ul className={layout["movie-grid"]}>
                    {movies.map((movie) => (
                        <li key={movie.id} className={layout["movie-grid-item"]}>
                        <Movie movie={movie}/>
                        </li>
                        ))}
                </ul>
            )}
            </div>
                )}
            </main>
</div>);
}

export default Questionnaire;