import styles from './SavedMovies.module.css';
import { useContext, useEffect, useState } from 'react';
import axios from "axios";
import { SavedMoviesContext } from "../../context/SavedMoviesContext.jsx";
import Header from '../../components/header/Header.jsx';
import MovieContainer from "../../components/MovieContainer/MovieContainer.jsx";
import Pagination from "../../components/Pagination/Pagination.jsx";

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
                    axios.get(`https://api.themoviedb.org/3/movie/${movieId}`, {
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

    console.log(movies);
    console.log("loadingSavedMovies:", loadingSavedMovies);
    console.log("loadingMovies:", loadingMovies);
    console.log("movies:", movies);
    return (
        <>
            <Header title="Opgeslagen films" />
            <main className={styles.container}>
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