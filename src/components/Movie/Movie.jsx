import './Movie.module.css';
import PropTypes from "prop-types";
import styles from "../../Pages/categories/Categories.module.css";

const IMG_URL = "https://image.tmdb.org/t/p/w500";

function Movie({movie}) {
    return (
        <article className={styles['movie-tile']}>
            {movie.backdrop_path && (
                <img src={IMG_URL + movie.backdrop_path} alt={movie.title}/>
            )}
            <p><strong>Titel:</strong> {movie.title}</p>
            <p><strong>Omschrijving:</strong> {movie.overview}</p>
        </article>
    );
}

Movie.propTypes = {
    movie: PropTypes.shape({
        id: PropTypes.number.isRequired,
        title: PropTypes.string,
        overview: PropTypes.string,
        backdrop_path: PropTypes.string,
    }).isRequired,
};

export default Movie;