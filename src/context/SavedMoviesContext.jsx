import {createContext, useEffect, useState} from "react";
import axios from "axios";

const noviApiUrl = import.meta.env.VITE_NOVI_API_URL;
const projectId = import.meta.env.VITE_NOVI_PROJECT_ID;

export const SavedMoviesContext = createContext();

export function SavedMoviesProvider({children}) {
    const [savedMovieIds, setSavedMovieIds] = useState([])
    const [currentUser, setCurrentUser] = useState(null);
    const [loadingSavedMovies, setLoadingSavedMovies] = useState(true);


    useEffect(() => {
        const storedUser = localStorage.getItem("user");

        if (!storedUser) {
            setLoadingSavedMovies(false);
            return;
        }
        const parsedUser = JSON.parse(storedUser);
        setCurrentUser(parsedUser);
        loadSavedMovies(parsedUser);
    }, []);

    async function loadSavedMovies(user) {
        const token = localStorage.getItem("token");

        try {
            setLoadingSavedMovies(true);

            const response = await axios.get(
                `${noviApiUrl}/savedMovies`,
                {
                    headers:
                        {
                            Authorization: `Bearer ${token}`,
                            "novi-education-project-id":
                            projectId
                        },
                }
            );

            console.log("Opgeslagen films:", response.data);

            const moviesForCurrentUser = response.data.filter(
                (savedMovie) =>
                    savedMovie.userId === user.id
            );

            const movieIds = moviesForCurrentUser.map(
                (savedMovie) => savedMovie.movieId
            );

            setSavedMovieIds(movieIds);

        } catch
            (error) {
            console.error(
                "fout bij het laden van de films:",
                error.response?.data || error.message
            );
            setSavedMovieIds([]);
        } finally {
            setLoadingSavedMovies(false);
        }
    }

    async function saveMovie(movie) {
        if (savedMovieIds.includes(movie.id)) return;

        const token = localStorage.getItem("token");

        console.log("currentUser:", currentUser);
        console.log("userId dat wordt opgeslagen:", currentUser?.id);

        try {
            await axios.post(
                `${noviApiUrl}/savedMovies`,
                {
                    movieId: movie.id,
                    userId: currentUser.id,
                },
                {
                    headers: {
                        Authorization: `Bearer ${token}`,
                        "novi-education-project-id":
                        projectId,
                    }
                }
            );

            setSavedMovieIds((previousIds) => [
                ...previousIds,
                movie.id,
            ]);
        } catch (error) {
            console.error(
                "Fout bij het opslaan van film:",
                error.response?.data || error.message
            );
        }
    }

    async function removeMovie(movieId) {
        const token = localStorage.getItem("token");

        try {
            const response = await axios.get(
                `${noviApiUrl}/savedMovies`,
                {
                    headers:
                        {
                            Authorization: `Bearer ${token}`,
                            "novi-education-project-id":
                            projectId
                        },
                }
            );

            const foundRecord = response.data.find((savedMovie) => savedMovie.movieId === movieId && savedMovie.userId === currentUser.id);

            console.log(foundRecord);

            if (foundRecord) {
                await axios.delete(
                    `${noviApiUrl}/savedMovies/${foundRecord.id}`,
                    {
                        headers:
                            {
                                Authorization: `Bearer ${token}`,
                                "novi-education-project-id":
                                projectId
                            },
                    }
                );

                setSavedMovieIds((previousIds)=>
                previousIds.filter((id)=> id !== movieId)
                );
            }

        } catch (error) {

            console.log("Fout bij verwijderen van film:",
                error.response?.data || error.message
            );
        }
    }

    function isMovieSaved(movieId) {
        return savedMovieIds.includes(movieId);
    }

    return (
        <SavedMoviesContext.Provider
            value={{savedMovieIds, saveMovie, removeMovie, isMovieSaved, loadingSavedMovies,}}>
            {children}
        </SavedMoviesContext.Provider>
    );
}