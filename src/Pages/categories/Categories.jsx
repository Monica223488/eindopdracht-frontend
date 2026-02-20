import styles from './Categories.module.css';
import {useEffect, useState} from 'react';
import axios from "axios";
import Movie from '../../components/Movie/Movie.jsx';
import Header from '../../components/header/Header.jsx';
import Button from '../../components/Button/Button.jsx';



function Categories() {
    const [movies, setMovies] = useState([]);
    const [page, setPage] = useState(1);
    const [totalPages, setTotalPages] = useState(1);
    const [loading, toggleLoading] = useState(false);
    const [error, toggleError] = useState(false);

    useEffect(() => {
        const controller = new AbortController();

        async function fetchData() {
            toggleLoading(true);
            toggleError(false);

            try {
                const { data } = await axios.get(
                    'https://api.themoviedb.org/3/discover/movie',
                    {
                        signal: controller.signal,
                        params: {
                            api_key: import.meta.env.VITE_API_KEY,
                            page,
                            language: "nl-NL"
                        }
                    }
                );

                setMovies(data.results ?? []);
                setTotalPages(data.total_pages ?? 1);
            } catch (e) {
                if (e.code === "ERR_CANCELED") return;
                console.error(e);
                toggleError(true);
            } finally {
                toggleLoading(false);
            }
        }

        fetchData();
        return () => controller.abort();
    }, [page]);

    return (
        <>
            <Header title="Categorieën" />
            <main>
                <div className={styles['labels']}>
                    <div className={styles['label']}>Action</div>
                    <div className={styles['label']}>Adventure</div>
                    <div className={styles['label']}>Drama</div>
                    <div className={styles['label']}>Comedy</div>
                </div>

                <Button
                    disabled={page <= 1}
                    clickHandler={() => setPage(p => Math.max(1, p - 1))}
                    text="vorige"
                    className={styles['page-navigation-button']}
                />
                <Button
                    disabled={page >= totalPages}
                    clickHandler={() => setPage(p => Math.min(totalPages, p + 1))}
                    text="volgende"
                    className={styles['page-navigation-button']}
                />

                {loading && <p>Loading...</p>}
                {error && <p>Er ging iets mis met ophalen.</p>}

                {!loading && !error &&(
                    <ul className={styles["movie-list"]}>
                        {movies.map((movie) => (
                            <li key={movie.id}>
                                <Movie movie={movie}/>
                            </li>
                        ))}
                    </ul>
                )}


            </main>
        </>
    );
}

export default Categories;