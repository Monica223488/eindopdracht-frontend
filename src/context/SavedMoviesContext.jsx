import { createContext, useEffect, useState } from "react";
import axios from "axios";

export const SavedMoviesContext = createContext();

export function SavedMoviesProvider({ children }) {
    const [savedMovieIds, setSavedMovieIds] = useState([]);
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
        try {
            setLoadingSavedMovies(true);

            if (user.info) {
                const parsedIds = JSON.parse(user.info);
                setSavedMovieIds(Array.isArray(parsedIds) ? parsedIds : []);
            } else {
                setSavedMovieIds([]);
            }
        } catch (error) {
            console.error("Fout bij laden van opgeslagen films:", error);
            setSavedMovieIds([]);
        } finally {
            setLoadingSavedMovies(false);
        }
    }

    async function updateSavedMoviesInBackend(updatedMovieIds) {
        if (!currentUser) return;

        const updatedUser = {
            name: currentUser.username || currentUser.name,
            email: currentUser.email,
            password: currentUser.password,
            info: JSON.stringify(updatedMovieIds),
        };

        try {
            await axios.put(
                `http://localhost:8080/users/${currentUser.username}`,
                updatedUser
            );

            const updatedCurrentUser = {
                ...currentUser,
                info: JSON.stringify(updatedMovieIds),
            };

            setCurrentUser(updatedCurrentUser);
            setSavedMovieIds(updatedMovieIds);

            localStorage.setItem("user", JSON.stringify(updatedCurrentUser));
        } catch (error) {
            console.error("Fout bij updaten van gebruiker:", error);
        }
    }

    async function saveMovie(movie) {
        const alreadySaved = savedMovieIds.includes(movie.id);
        if (alreadySaved) return;

        const updatedMovieIds = [...savedMovieIds, movie.id];
        await updateSavedMoviesInBackend(updatedMovieIds);
    }

    async function removeMovie(movieId) {
        const updatedMovieIds = savedMovieIds.filter((id) => id !== movieId);
        await updateSavedMoviesInBackend(updatedMovieIds);
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