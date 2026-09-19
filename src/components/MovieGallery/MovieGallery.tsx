import styles from './MovieGallery.module.css';
import MovieCard, { type Movie } from "../MovieCard/MovieCard";

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