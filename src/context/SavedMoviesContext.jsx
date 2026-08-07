import {createContext, useContext, useEffect, useState} from "react";
import axios from "axios";
import { AuthContext } from "./AuthContext.jsx";

const noviApiUrl = import.meta.env.VITE_NOVI_API_URL;
const projectId = import.meta.env.VITE_NOVI_PROJECT_ID;

export const SavedMoviesContext = createContext();

export function SavedMoviesProvider({children}) {
    const [savedMovieIds, setSavedMovieIds] = useState([])
    const [loadingSavedMovies, setLoadingSavedMovies] = useState(true);

    const {user} = useContext(AuthContext)

    useEffect(() => {

        if (!user) {
            setSavedMovieIds([]);
            setLoadingSavedMovies(false);
            return;
        }
        loadSavedMovies(user);
    }, [user]);

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


            const moviesForCurrentUser = response.data.filter(
                (savedMovie) =>
                    savedMovie.email === user.email
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


        try {
            await axios.post(
                `${noviApiUrl}/savedMovies`,
                {
                    movieId: movie.id,
                    userId: user.id,
                    email: user.email,
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

            const foundRecord = response.data.find((savedMovie) => savedMovie.movieId === movieId && savedMovie.email === user.email);


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