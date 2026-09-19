import styles from './MovieCard.module.css';
import { useContext } from "react";
import { SavedMoviesContext } from "../../context/SavedMoviesContext.js";
import { useAuth } from "../../context/AuthContext.js";
import Button from '../Button/Button.js';
import { Link } from "react-router-dom";

const IMG_URL = "https://image.tmdb.org/t/p/w500";
export type Movie = {
    id: number;
    title?: string;
    poster_path?: string | null;
    backdrop_path?: string | null;
};

type MovieCardProps = {
    movie: Movie;
};

function MovieCard({ movie }:MovieCardProps) {
    const {saveMovie, removeMovie, isMovieSaved} = useContext(SavedMoviesContext);
    const {user} = useAuth();

    const backdropUrl = movie.backdrop_path
        ? `${IMG_URL}${movie.backdrop_path}`
        : null;

    function handleSaveMovie() {
        if (!user) {
            alert("Log eerst in voordat je een film op kunt slaan.");
            return;
        }

        if (isMovieSaved(movie.id)){
            removeMovie(movie.id);
        } else {
            saveMovie(movie);
        }
    }


    return (
        <article className={styles['movie-tile']}>
            <Link to={`/movies/${movie.id}`}>
            <div className={styles['image-wrapper']}>
                {backdropUrl ? (
                    <img src={backdropUrl} alt={movie.title} />
                ) : (
                    <div className={styles.noPoster}>
                        <p>{movie.title}</p>
                    </div>
                )}
            </div>

            <h3>{movie.title}</h3>
            </Link>
            <Button text={isMovieSaved(movie.id) ? "film verwijderen": "film opslaan"}
                    className={styles['movie-save-button']}
                    clickHandler={handleSaveMovie} />
        </article>
    );
}

export default MovieCard;