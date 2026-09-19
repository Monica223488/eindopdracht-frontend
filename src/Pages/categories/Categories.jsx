import {useEffect, useState} from 'react';
import axios from 'axios';

import Header from '../../components/header/Header.tsx';
import MovieGallery from '../../components/MovieGallery/MovieGallery.tsx';
import Pagination from '../../components/Pagination/Pagination.tsx';

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
    const [searchInput, setSearchInput] = useState('');
    const [searchQuery, setSearchQuery] = useState('');
    const [genreError, toggleGenreError] = useState(false);

    function handleGenreClick(genreId) {
        setSelectedGenre(prev => (prev === genreId ? null : genreId));
        setSearchQuery('');
        setSearchInput('');
        setPage(1);
    }

    function handleSearch(e) {
        e.preventDefault();

        setSearchQuery(searchInput);
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
                toggleGenreError(true);
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
                const endpoint = searchQuery
                    ? `${tmdbUrl}/search/movie`
                    : `${tmdbUrl}/discover/movie`;

                const {data} = await axios.get(endpoint,
                    {
                        signal: controller.signal,
                        params: {
                            api_key: import.meta.env.VITE_API_KEY,
                            page,
                            language: "nl-NL",
                            query: searchQuery || undefined,
                            with_genres: searchQuery ? undefined : selectedGenre ?? undefined
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
    }, [page, selectedGenre, searchQuery]);

    return (
        <>
            <Header title="Ontdekken"/>
            <main>
                <form onSubmit={handleSearch}>
                    <input
                        type="text"
                        placeholder="Zoek een film..."
                        value={searchInput}
                        onChange={(e) => setSearchInput(e.target.value)}
                    />
                    <button type="submit">
                        Zoeken
                    </button>
                </form>
                <div className={styles['genre-labels']}>
                    {genreError && <p>De categorieën konden niet worden opgehaald.</p>}
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
                                setSearchQuery('');
                                setSearchInput('');
                                setPage(1);
                            }}
                            className={`${styles['genre-label']} ${selectedGenre === null ? styles['active'] : ''}`}>
                        Alle categorieën
                    </button>
                </div>

                {!loading && !error && movies.length > 0 && totalPages > 1 && (
                <Pagination page={page}
                            totalPages={totalPages}
                            onPrevious={() => setPage((previousPage) => previousPage - 1)}
                            onNext={() => setPage((previousPage) => previousPage + 1)}>
                </Pagination> )}

                {loading && <p>Films worden geladen...</p>}
                {error && <p>Er ging iets mis met ophalen.</p>}
                {!loading && !error && movies.length === 0 && (
                    <p>Geen films gevonden.</p>
                )}

                {!loading && !error && movies.length > 0 && (
                    <MovieGallery movies={movies}>
                    </MovieGallery>
                )}

                {!loading && !error && movies.length > 0 && totalPages > 1 && (
                <Pagination page={page}
                            totalPages={totalPages}
                            onPrevious={() => setPage((previousPage) => previousPage - 1)}
                            onNext={() => setPage((previousPage) => previousPage + 1)}>
                </Pagination> )}


            </main>
        </>
    );
}

export default Categories;