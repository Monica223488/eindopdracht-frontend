import styles from './MovieCard.module.css';
import { useSavedMovies} from "../../context/SavedMoviesContext.js";
import { useAuth } from "../../context/AuthContext.js";
import Button from '../Button/Button.js';
import { Link } from "react-router-dom";
import type { Movie } from '../../types/Movie';

const IMG_URL = "https://image.tmdb.org/t/p/w500";

type MovieCardProps = {
    movie: Movie;
    variant: 'wide' | 'square' | 'portrait';
};

function MovieCard({ movie, variant }:MovieCardProps) {
    const {saveMovie, removeMovie, isMovieSaved} = useSavedMovies();
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
            void removeMovie(movie.id);
        } else {
            void saveMovie(movie);
        }
    }


    return (
        <article className={styles['movie-tile']}>
            <Link to={`/movies/${movie.id}`}>
            <div className={`${styles['image-wrapper']} ${styles[variant]}`}>
                {backdropUrl ? (
                    <img src={backdropUrl} alt={movie.title} />
                ) : (
                    <div className={styles['no-poster']}>
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