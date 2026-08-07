import styles from './MovieContainer.module.css';
import PropTypes from "prop-types";
import Movie from "../Movie/Movie.jsx";

function MovieContainer({movies}) {

    return (
 <ul className={styles["movie-list"]}>
     {movies.map((movie)=> (
     <li key={movie.id}>
         <Movie movie={movie} />
     </li>
     ))}
 </ul>
    );

}

MovieContainer.propTypes ={
    movies: PropTypes.array.isRequired,
};

export default MovieContainer;