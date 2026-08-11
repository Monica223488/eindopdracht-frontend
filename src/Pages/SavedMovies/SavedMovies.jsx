import { useContext, useEffect, useState } from 'react';
import axios from 'axios';
import { Link } from 'react-router-dom';

import { AuthContext } from '../../context/AuthContext.jsx';
import { SavedMoviesContext } from '../../context/SavedMoviesContext.jsx';

import Header from '../../components/header/Header.jsx';
import MovieContainer from '../../components/MovieContainer/MovieContainer.jsx';
import Pagination from '../../components/Pagination/Pagination.jsx';

import styles from './SavedMovies.module.css';

const tmdbUrl = import.meta.env.VITE_TMDB_URL


function SavedMovies() {
    const { savedMovieIds, loadingSavedMovies } = useContext(SavedMoviesContext);
    const [movies, setMovies] = useState([]);
    const [loadingMovies, setLoadingMovies] = useState(false);
    const [page, setPage] = useState(1);
    const moviesPerPage=12;

    const totalPages = Math.ceil(movies.length / moviesPerPage);

    const startIndex = (page - 1) * moviesPerPage;
    const endIndex = startIndex + moviesPerPage;

    const moviesForCurrentPage = movies.slice(startIndex, endIndex);


    useEffect(() => {
        async function fetchSavedMovies() {
            try {
                setLoadingMovies(true);

                const requests = savedMovieIds.map((movieId) =>
                    axios.get(`${tmdbUrl}/movie/${movieId}`, {
                        params: {
                            api_key: import.meta.env.VITE_API_KEY,
                            language: "nl-NL",
                        },
                    })
                );

                const responses = await Promise.all(requests);
                const fetchedMovies = responses.map((response) => response.data);

                setMovies(fetchedMovies);
            } catch (error) {
                console.error("Fout bij ophalen van films uit TMDB:", error);
                setMovies([]);
            } finally {
                setLoadingMovies(false);
            }
        }

        if (savedMovieIds.length > 0) {
            fetchSavedMovies();
        } else {
            setMovies([]);
        }
    }, [savedMovieIds]);

    const {user} = useContext(AuthContext);


    if (!user) {
        return <>
            <Header title="Opgeslagen films" />
            <main className={styles["container"]}>
        <p>Je moet ingelogd zijn om je opgeslagen films te bekijken.</p>
            <Link to="/inloggen"><strong>Log hier in</strong></Link>
                </main>
        </>

    }

    return (
        <>
            <Header title="Opgeslagen films" />
            <main className={styles['container']}>
                {loadingSavedMovies || (loadingMovies && movies.length ===0) ? (
                    <p>Films laden...</p>
                ) : movies.length === 0 ? (
                    <p>Je hebt nog geen films opgeslagen.</p>
                ) : (
                    <>
                    <MovieContainer movies={moviesForCurrentPage}>
                    </MovieContainer>
                    <Pagination page={page}
            totalPages={totalPages}
            onPrevious={()=> setPage((previousPage)=> previousPage - 1 )}
            onNext={()=> setPage((previousPage)=> previousPage + 1)}>
                    </Pagination>
                    </>
                )}
            </main>
        </>
    );
}

export default SavedMovies;