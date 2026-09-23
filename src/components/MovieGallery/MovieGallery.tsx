import styles from './MovieGallery.module.css';
import MovieCard from "../MovieCard/MovieCard";
import type {Movie} from '../../types/Movie';

type MovieGalleryProps = {
    movies: Movie[];
};

function MovieGallery({movies}: MovieGalleryProps) {
    const variants = ['wide',
        'extra-wide',
        'extra-wide',
        'wide',
        'standard',
        'extra-wide',
        'standard',
        'extra-wide',
        'wide',
        'wide',
        'standard',
        'extra-wide',] as const;

    return (
        <ul className={styles["movie-list"]}>
            {movies.map((movie, index) => (
                <li key={movie.id}>
                    <MovieCard movie={movie} variant={variants[index % variants.length]}/>
                </li>
            ))}
        </ul>
    );

}

export default MovieGallery;