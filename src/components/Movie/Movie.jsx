import styles from './Movie.module.css';
import PropTypes from "prop-types";
import Button from '../../components/Button/Button.jsx';

const IMG_URL = "https://image.tmdb.org/t/p/w500";

function Movie({ movie }) {
    const backdropUrl = movie.backdrop_path
        ? `${IMG_URL}${movie.backdrop_path}`
        : null;

    return (
        <article className={styles['movie-tile']}>
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
            <p>{movie.overview || "Geen omschrijving beschikbaar"}</p>
            <Button text="film opslaan" className={styles['movie-save-button']} />
        </article>
    );
}

Movie.propTypes = {
    movie: PropTypes.shape({
        id: PropTypes.number.isRequired,
        title: PropTypes.string,
        overview: PropTypes.string,
        poster_path: PropTypes.string,
        backdrop_path: PropTypes.string,
    }).isRequired,
};

export default Movie;