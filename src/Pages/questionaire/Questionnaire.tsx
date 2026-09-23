import {useState} from 'react';
import axios from 'axios';

import {invertAnswers} from '../../Helpers/invertAnswers';

import Header from '../../components/header/Header';
import Button from '../../components/Button/Button';
import MovieGallery from '../../components/MovieGallery/MovieGallery';

import type { Movie } from '../../types/Movie';
import type { FormEvent } from 'react';
import type {Answers, Language, Recency} from '../../types/Questionnaire';

import popcorn from '../../assets/popcorn.png';

import styles from './Questionnaire.module.css';

const tmdbUrl = import.meta.env.VITE_TMDB_URL

type MovieResponse = {
    results: Movie[];
};

function Questionnaire() {
    const [answers, setAnswers] = useState<Answers>({
        language: "en",
        genreId: 28,
        recency: "recent",
    });
    const [movies, setMovies] = useState<Movie[]>([]);
    const [showResults, setShowResults] = useState(false);
    const [loading, toggleLoading] = useState(false);
    const [error, toggleError] = useState(false);

    async function handleSubmit(e:FormEvent<HTMLFormElement>) {
        e.preventDefault();
        toggleLoading(true);
        toggleError(false);

        try {
            const inverted = invertAnswers(answers);

            const {data} = await axios.get<MovieResponse>(`${tmdbUrl}/discover/movie`,
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
            <Header title="Vragenlijst" />
            <main className={styles["questionnaire-main"]}>
                {!showResults ? (<form onSubmit={handleSubmit} className={styles["questionnaire-form"]}>
                        <p className={styles["centerText"]}>Wil je vandaag eens iets anders kijken? Beantwoord de onderstaande
                            vragen over jouw voorkeuren en ontvang juist aanbevelingen die daar nét van afwijken.
                            Zo ontdek je films die je anders misschien nooit zou kiezen.</p>
                        <fieldset className={styles["form-group"]}>
                            <legend>Welk genre kijk je het meeste?</legend>

                            <div className={styles["answer-options"]}>
                                <label>
                                    <input
                                        type="radio"
                                        name="genre"
                                        value={28}
                                        checked={answers.genreId === 28}
                                        onChange={(e) =>
                                            setAnswers((prev) => ({
                                                ...prev,
                                                genreId: Number(e.target.value),
                                            }))}
                                    />
                                    Actie
                                </label>
                                <label>
                                    <input
                                        type="radio"
                                        name="genre"
                                        value={35}
                                        checked={answers.genreId === 35}
                                        onChange={(e) =>
                                            setAnswers((prev) => ({
                                                ...prev,
                                                genreId: Number(e.target.value),
                                            }))}/>
                                    Comedy
                                </label>
                                <label>
                                    <input
                                        type="radio"
                                        name="genre"
                                        value={27}
                                        checked={answers.genreId === 27}
                                        onChange={(e) =>
                                            setAnswers((prev) => ({
                                                ...prev,
                                                genreId: Number(e.target.value),
                                            }))}/>
                                    Horror
                                </label>
                                <label>
                                    <input
                                        type="radio"
                                        name="genre"
                                        value={18}
                                        checked={answers.genreId === 18}
                                        onChange={(e) =>
                                            setAnswers((prev) => ({
                                                ...prev,
                                                genreId: Number(e.target.value),
                                            }))
                                        }
                                    />
                                    Drama
                                </label>
                                <label>
                                    <input
                                        type="radio"
                                        name="genre"
                                        value={10749}
                                        checked={answers.genreId === 10749}
                                        onChange={(e) =>
                                            setAnswers((prev) => ({
                                                ...prev,
                                                genreId: Number(e.target.value),
                                            }))
                                        }
                                    />
                                    Romantiek
                                </label>
                                <label>
                                    <input
                                        type="radio"
                                        name="genre"
                                        value={99}
                                        checked={answers.genreId === 99}
                                        onChange={(e) =>
                                            setAnswers((prev) => ({
                                                ...prev,
                                                genreId: Number(e.target.value),
                                            }))}/>
                                    Documentaire
                                </label>
                            </div>
                        </fieldset>
                        <fieldset className={styles["form-group"]}>
                            <legend>Kijk je meestal recente films(de afgelopen 5 jaar) of oudere films?</legend>
                            <div className={styles["answer-options"]}>
                            <label>
                                <input type="radio" name="recency" value="recent" checked={answers.recency === 'recent'}
                                       onChange={(e) =>
                                           setAnswers((prev) => ({...prev, recency: e.target.value as Recency,}))}/>
                                Recente films
                            </label>

                            <label>
                                <input type="radio" name="recency" value="older" checked={answers.recency === 'older'}
                                       onChange={(e) =>
                                           setAnswers((prev) => ({...prev, recency: e.target.value as Recency,}))}/>
                                Oudere films
                            </label>
                            </div>
                        </fieldset>
                        <fieldset className={styles["form-group"]}>
                            <legend>In welke taal kijk je meestal een film?</legend>
                            <div className={styles["answer-options"]}>
                            <label>
                                <input type="radio" name="language" value="en"
                                       checked={answers.language === 'en'}
                                       onChange={(e) => setAnswers((prev) => ({
                                           ...prev, language: e.target.value as Language,
                                       }))}/>
                                Engels
                            </label>

                            <label>
                                <input type="radio" name="language" value="nl"
                                       checked={answers.language === 'nl'}
                                       onChange={(e) => setAnswers((prev) => ({
                                           ...prev, language: e.target.value as Language,
                                       }))
                                       }/>
                                Nederlands
                            </label>

                            <label>
                                <input type="radio" name="language" value="fr"
                                       checked={answers.language === 'fr'}
                                       onChange={(e) => setAnswers((prev) => ({
                                           ...prev, language: e.target.value as Language,
                                       }))}/>
                                Frans
                            </label>
                                <label>
                                <input type="radio" name="language" value="de"
                                       checked={answers.language === 'de'}
                                       onChange={(e) => setAnswers((prev) => ({
                                           ...prev, language: e.target.value as Language,
                                       }))}/>
                                Duits
                            </label>
                            </div>
                        </fieldset>

                        <Button text="Uitkomsten" type="submit"></Button>
                    </form>
                ) : (
                    <div className={styles["pageContent"]}>
                        <div className={styles["centeredButtonRow"]}>
                            <Button text="Terug naar de vragenlijst" type="button"
                                    clickHandler={() => setShowResults(false)}/>
                        </div>
                        {loading && <p>Loading...</p>}
                        {error && <p>Er ging iets mis bij het ophalen van films.</p>}

                        {!loading && !error && (
                            <MovieGallery movies={movies}>

                            </MovieGallery>
                        )}
                    </div>
                )}
            </main>
        </div>);
}

export default Questionnaire;