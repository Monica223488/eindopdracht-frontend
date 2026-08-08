import {useEffect, useState} from 'react';
import axios from 'axios';

import Header from '../../components/header/Header.jsx';
import MovieContainer from '../../components/MovieContainer/MovieContainer.jsx';
import Pagination from '../../components/Pagination/Pagination.jsx';

import styles from './Categories.module.css';

const tmdbUrl = import.meta.env.VITE_TMDB_URL


function Categories() {
    const [movies, setMovies] = useState([]);
    const [page, setPage] = useState(1);
    const [totalPages, setTotalPages] = useState(1);
    const [loading, toggleLoading] = useState(false);
    const [error, toggleError] = useState(false);
    const [genres, setGenres] = useState([]);
    const [selectedGenre, setSelectedGenre] = useState(null);

    function handleGenreClick(genreId) {
        setSelectedGenre(prev => (prev === genreId ? null : genreId));
        setPage(1);
    }

    useEffect(() => {
        const controller = new AbortController();

        async function fetchGenres() {
            try {
                const {data} = await axios.get(`${tmdbUrl}/genre/movie/list`,
                    {
                        signal: controller.signal,
                        params: {
                            api_key: import.meta.env.VITE_API_KEY,
                            language: "nl-NL",
                        }
                    }
                );

                setGenres(data.genres);
            } catch (e) {
                if (e.code === "ERR_CANCELED") return;
                console.error(e);
            }
        }

        fetchGenres();
        return () => controller.abort();
    }, []);

    useEffect(() => {
        const controller = new AbortController();

        async function fetchData() {
            toggleLoading(true);
            toggleError(false);

            try {
                const {data} = await axios.get(`${tmdbUrl}/discover/movie`,
                    {
                        signal: controller.signal,
                        params: {
                            api_key: import.meta.env.VITE_API_KEY,
                            page,
                            language: "nl-NL",
                            with_genres: selectedGenre ?? undefined
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
    }, [page, selectedGenre]);

    return (
        <>
            <Header title="Categorieën"/>
            <main>
                <div className={styles['genre-labels']}>
                    {genres.map((genre) => (
                        <button
                            key={genre.id}
                            onClick={() => handleGenreClick(genre.id)}
                            className={`${styles['genre-label']} ${selectedGenre === genre.id ? styles['active'] : ''}`}
                        >
                            {genre.name}
                        </button>
                    ))}
                    <button type="button"
                            onClick={() => {
                                setSelectedGenre(null);
                                setPage(1);
                            }}
                            className={`${styles['genre-label']} ${selectedGenre === null ? styles['active'] : ''}`}>
                        Alle categorieën
                    </button>
                </div>

                <Pagination page={page}
                            totalPages={totalPages}
                            onPrevious={() => setPage((previousPage) => previousPage - 1)}
                            onNext={() => setPage((previousPage) => previousPage + 1)}>
                </Pagination>

                {loading && <p>Loading...</p>}
                {error && <p>Er ging iets mis met ophalen.</p>}

                {!loading && !error && (
                    <MovieContainer movies={movies}>
                    </MovieContainer>
                )}

                <Pagination page={page}
                            totalPages={totalPages}
                            onPrevious={() => setPage((previousPage) => previousPage - 1)}
                            onNext={() => setPage((previousPage) => previousPage + 1)}>
                </Pagination>


            </main>
        </>
    );
}

export default Categories;