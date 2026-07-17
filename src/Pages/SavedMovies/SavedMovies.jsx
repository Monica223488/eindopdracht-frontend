import styles from './SavedMovies.module.css';
import { useContext, useEffect, useState } from 'react';
import axios from "axios";
import { SavedMoviesContext } from "../../context/SavedMoviesContext.jsx";
import Movie from '../../components/Movie/Movie.jsx';
import Header from '../../components/header/Header.jsx';

function SavedMovies() {
    const { savedMovieIds, loadingSavedMovies } = useContext(SavedMoviesContext);
    const [movies, setMovies] = useState([]);
    const [loadingMovies, setLoadingMovies] = useState(false);

    useEffect(() => {
        async function fetchSavedMovies() {
            try {
                setLoadingMovies(true);

                const requests = savedMovieIds.map((movieId) =>
                    axios.get(`https://api.themoviedb.org/3/movie/${movieId}`, {
                        params: {
                            api_key: import.meta.env.VITE_TMDB_API_KEY,
                            language: "nl-NL",
                        },
                    })
                );

                const responses = await Promise.all(requests);
                const fetchedMovies = responses.map((response) => response.data);

                setMovies(fetchedMovies);
            } catch (error) {
                console.error("Fout bij ophalen van films uit TMDB:", error);
                setMovies([]);
            } finally {
                setLoadingMovies(false);
            }
        }

        if (savedMovieIds.length > 0) {
            fetchSavedMovies();
        } else {
            setMovies([]);
        }
    }, [savedMovieIds]);

    return (
        <>
            <Header title="Opgeslagen films" />
            <main className={styles.container}>
                {loadingSavedMovies || loadingMovies ? (
                    <p>Films laden...</p>
                ) : movies.length === 0 ? (
                    <p>Je hebt nog geen films opgeslagen.</p>
                ) : (
                    <ul className={styles.list}>
                        {movies.map((movie) => (
                            <li key={movie.id} className={styles.listItem}>
                                <Movie movie={movie} />
                            </li>
                        ))}
                    </ul>
                )}
            </main>
        </>
    );
}

export default SavedMovies;