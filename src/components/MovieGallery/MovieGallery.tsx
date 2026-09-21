import styles from './MovieGallery.module.css';
import MovieCard from "../MovieCard/MovieCard";
import type { Movie } from '../../types/Movie';

type MovieGalleryProps = {
    movies: Movie[];
};

function MovieGallery({movies}:MovieGalleryProps) {

    return (
 <ul className={styles["movie-list"]}>
     {movies.map((movie)=> (
     <li key={movie.id}>
         <MovieCard movie={movie} />
     </li>
     ))}
 </ul>
    );

}

export default MovieGallery;