import { useEffect, useState } from 'react';
import axios from 'axios';
import { useNavigate, useParams } from 'react-router-dom';

import { useAuth } from '../../context/AuthContext';
import { useSavedMovies } from '../../context/SavedMoviesContext';

import type { MovieDetails as MovieDetailsType } from '../../types/Movie';

import Button from '../../components/Button/Button';

import styles from './MovieDetails.module.css';

const tmdbUrl = import.meta.env.VITE_TMDB_URL;
const IMG_URL = 'https://image.tmdb.org/t/p/w500';
const languageNames = new Intl.DisplayNames(["nl"], {
    type: "language"
});


function MovieDetails() {
    const [movieDetails, setMovieDetails] = useState<MovieDetailsType | null>(null);
    const [error, toggleError] = useState(false);
    const [loading, toggleLoading] = useState(false);

    const {saveMovie, removeMovie, isMovieSaved} = useSavedMovies();
    const {user} = useAuth();
    const { movieId } = useParams();
    const navigate = useNavigate();

    function handleSaveMovie() {
        if (!user) {
            alert("Log eerst in voordat je een film op kunt slaan.");
            return;
        }

        if (!movieDetails) return;

        if (isMovieSaved(movieDetails.id)) {
            void removeMovie(movieDetails.id);
        } else {
            void saveMovie(movieDetails);
        }
    }


    useEffect(() => {
        const controller = new AbortController();

        async function fetchMovieDetails() {
            toggleLoading(true);
            toggleError(false);

            try {
                const { data } = await axios.get<MovieDetailsType>(
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
                if (axios.isAxiosError(e) && e.code === "ERR_CANCELED") return;

                console.error(e);
                toggleError(true);
            } finally {
                toggleLoading(false);
            }
        }

        void fetchMovieDetails();

        return () => controller.abort();
    }, [movieId]);

    return (
        <div className={styles["movie-details-overlay"]}>
        <main className={styles['movie-details-tile']}>
            {loading && <p>Film wordt geladen...</p>}
            {error && <p>De film kon niet worden opgehaald.</p>}

            {!loading && !error && movieDetails && (
                <>
                    <h1>{movieDetails.title}</h1>
                    <div className={styles['movie-detail-numbers']}>
                        <p>{movieDetails.release_date?.slice(0, 4) || "onbekend"}</p>
                        {movieDetails.runtime != null && movieDetails.runtime > 0 && (
                            <p>{movieDetails.runtime} min</p>
                        )}
                        {movieDetails.vote_average != null && movieDetails.vote_average > 0 && (
                            <p>★ {movieDetails.vote_average.toFixed(1)}/10</p>
                        )}
                    </div>
                    <div className={styles["image-wrapper"]}>
                        {movieDetails.backdrop_path ? (
                            <img
                                src={`${IMG_URL}${movieDetails.backdrop_path}`}
                                alt={movieDetails.title}
                            />
                        ) : (
                            <span>Geen afbeelding beschikbaar</span>
                        )}
                    </div>
                    <div className={styles['movie-details-genre-language']}>
                    <p>
                        {languageNames.of(movieDetails.original_language)}
                    </p>
                    <p>{movieDetails.genres?.map((genre) => genre.name).join(", ")}</p>
                    </div>
                    <p>{movieDetails.overview || "Geen omschrijving beschikbaar"}</p>
                </>
            )}
            <div className={styles["movie-detail-buttons"]}>
            <Button text={"← Terug"} clickHandler={() => navigate(-1)}/>
            {movieDetails && (
                <button
                onClick={handleSaveMovie}
                className={styles["favorite-button"]}
            aria-label={isMovieSaved(movieDetails.id)
                ? "Verwijder uit opgeslagen films"
                : "Sla film op"}
        >
            {isMovieSaved(movieDetails.id) ? "♥" : "♡"}
        </button>
            )}
            </div>
        </main>
        </div>
    );
}

export default MovieDetails;