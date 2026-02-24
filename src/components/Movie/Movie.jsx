import styles from './Movie.module.css';
import PropTypes from "prop-types";
import Button from '../../components/Button/Button.jsx';

const IMG_URL = "https://image.tmdb.org/t/p/w500";

function Movie({movie}) {
    return (
        <article className={styles['movie-tile']}>
            {movie.backdrop_path && (
                <div className={styles['image-wrapper']}>
                <img src={IMG_URL + movie.backdrop_path} alt={movie.title}/>
                    </div>
            )}
            <h3> {movie.title}</h3>
            <p> {movie.overview}</p>
            <Button text="film opslaan"></Button>
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