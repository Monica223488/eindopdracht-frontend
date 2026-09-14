import styles from './MovieGallery.module.css';
import PropTypes from "prop-types";
import MovieCard from "../MovieCard/MovieCard.jsx";

function MovieGallery({movies}) {

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

MovieGallery.propTypes ={
    movies: PropTypes.array.isRequired,
};

export default MovieGallery;