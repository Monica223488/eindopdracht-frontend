import styles from './MovieDetails.module.css';
import { useParams, useNavigate } from "react-router-dom";
import {useContext, useEffect, useState} from "react";
import axios from 'axios';
import {SavedMoviesContext} from "../../context/SavedMoviesContext.tsx";
import {AuthContext} from "../../context/AuthContext.tsx";
import Button from "../../components/Button/Button.tsx";

const tmdbUrl = import.meta.env.VITE_TMDB_URL;
const IMG_URL = "https://image.tmdb.org/t/p/w500";
const languageNames = new Intl.DisplayNames(["nl"], {
    type: "language"
});

function MovieDetails() {
    const [movieDetails, setMovieDetails] = useState(null);
    const [error, toggleError] = useState(false);
    const [loading, toggleLoading] = useState(false);

    const {saveMovie, removeMovie, isMovieSaved} = useContext(SavedMoviesContext);
    const {user} = useContext(AuthContext);
    const { movieId } = useParams();
    const navigate = useNavigate();

    function handleSaveMovie() {
        if (!user) {
            alert("Log eerst in voordat je een film op kunt slaan.");
            return;
        }

        if (isMovieSaved(movieDetails.id)) {
            removeMovie(movieDetails.id);
        } else {
            saveMovie(movieDetails);
        }
    }


    useEffect(() => {
        const controller = new AbortController();

        async function fetchMovieDetails() {
            toggleLoading(true);
            toggleError(false);

            try {
                const { data } = await axios.get(
                    `${tmdbUrl}/movie/${movieId}`,
                    {
                        signal: controller.signal,
                        params: {
                            api_key: import.meta.env.VITE_API_KEY,
                            language: "nl-NL",
                        },
                    }
                );

                setMovieDetails(data);
            } catch (e) {
                if (e.code === "ERR_CANCELED") return;

                console.error(e);
                toggleError(true);
            } finally {
                toggleLoading(false);
            }
        }

        fetchMovieDetails();

        return () => controller.abort();
    }, [movieId]);

    return (
        <main className={styles['movie-details-tile']}>
            {loading && <p>Film wordt geladen...</p>}
            {error && <p>De film kon niet worden opgehaald.</p>}

            {!loading && !error && movieDetails && (
                <>
                    <h1>{movieDetails.title}</h1>
                    <div className={styles['movie-detail-numbers']}>
                        <p>{movieDetails.release_date?.slice(0, 4) || "onbekend"}</p>
                        <p>{movieDetails.runtime} min</p>
                        <p>★ {movieDetails.vote_average?.toFixed(1)}</p>
                    </div>
                    <img
                        src={`${IMG_URL}${movieDetails.backdrop_path}`}
                        alt={movieDetails.title}
                    />
                    <div className={styles['movie-details-genre-language']}>
                    <p>
                        {languageNames.of(movieDetails.original_language)}
                    </p>
                    <p>{movieDetails.genres?.map((genre) => genre.name).join(", ")}</p>
                    </div>
                    <p>{movieDetails.overview || "Geen omschrijving beschikbaar"}</p>
                </>
            )}
            {movieDetails && (
                <Button
                    text={isMovieSaved(movieDetails.id) ? "film verwijderen" : "film opslaan"}
                    clickHandler={handleSaveMovie}
                />
            )}
            <Button text={"← Terug"} clickHandler={() => navigate(-1)}/>
        </main>
    );
}

export default MovieDetails;