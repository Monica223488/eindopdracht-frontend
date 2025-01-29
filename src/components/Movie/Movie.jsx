import './Movie.module.css';
import {useEffect, useState} from 'react';
import axios from 'axios';

function Movie({endpoint}) {
    const [movies, setMovies] = useState({});
    const [loading, toggleLoading] = useState(false);
    const [error, toggleError] = useState(false);

    useEffect(()=>{
        const controller = new AbortController();

        async function fetchData() {
            toggleLoading(true);
            toggleError(false);

            try {
                const { data } = await axios.get('https://api.themoviedb.org/3/search/movie', {
                    signal: controller.signal,
                });
                setMovie(data);
            } catch (e) {
                if (axios.isCancel(e)) {
                    console.error(e);
                    toggleError(true);
                }

            } finally {
                toggleLoading(false);
            }
        }
        if ('https://api.themoviedb.org/3/search/movie') {
            fetchData();
        }
        return () => {
            console.log('unmount effect is triggered');
            controller.abort();
        }
    },[]);

    return (
        <article className={styles['movie-tile']}>
            {console.log('Rerender is triggered')}
        <h2>title:</h2>
        <h3>{text}</h3>
        <h2>description:</h2>
        <h3>{text}</h3>
</article>
)
}

export default Movie;