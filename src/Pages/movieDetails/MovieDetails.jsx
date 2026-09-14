import styles from './MovieDetails.module.css';
import { useParams } from "react-router-dom";
import {useEffect, useState} from "react";
import axios from 'axios';

const tmdbUrl = import.meta.env.VITE_TMDB_URL;
const IMG_URL = "https://image.tmdb.org/t/p/w500";

function MovieDetails() {
    const [movieDetails, setMovieDetails] = useState(null);
    const [error, toggleError] = useState(false);
    const [loading, toggleLoading] = useState(false);

    const { movieId } = useParams();

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
        <main>
            {loading && <p>Film wordt geladen...</p>}
            {error && <p>De film kon niet worden opgehaald.</p>}

            {!loading && !error && movieDetails && (
                <>
                    <h1>{movieDetails.title}</h1>
                    <p>{movieDetails.original_language}</p>
                    <p>{movieDetails.release_date}</p>
                    <p>{movieDetails.runtime}</p>
                    <img
                        src={`${IMG_URL}${movieDetails.backdrop_path}`}
                        alt={movieDetails.title}
                    />
                    <p>{movieDetails.genres?.map((genre) => genre.name).join(", ")}</p>
                    <p>{movieDetails.vote_average}</p>
                    <p>{movieDetails.overview}</p>
                </>
            )}
        </main>
    );
}

export default MovieDetails;