import {createContext, useContext, useEffect, useState} from 'react';
import type { ReactNode } from 'react';
import axios from 'axios';
import type { Movie } from '../types/Movie';

import {useAuth} from './AuthContext';
import type { User } from './AuthContext';

const noviApiUrl = import.meta.env.VITE_NOVI_API_URL;
const projectId = import.meta.env.VITE_NOVI_PROJECT_ID;

type SavedMoviesProviderProps = {
    children: ReactNode;
};

type SavedMoviesContextType = {
    savedMovieIds: number[];
    saveMovie: (movie: Movie) => Promise<void>;
    removeMovie: (movieId: number) => Promise<void>;
    isMovieSaved: (movieId: number) => boolean;
    loadingSavedMovies: boolean;
};

type SavedMovieRecord = {
    id: string;
    movieId: number;
    email: string;
};

export const SavedMoviesContext =
    createContext<SavedMoviesContextType | null>(null);

export function useSavedMovies() {
    const context = useContext(SavedMoviesContext);

    if (!context) {
        throw new Error(
            "useSavedMovies moet binnen een SavedMoviesProvider gebruikt worden."
        );
    }

    return context;
}

export function SavedMoviesProvider({
                                        children
                                    }: SavedMoviesProviderProps) {
    const [savedMovieIds, setSavedMovieIds] = useState<number[]>([]);
    const [loadingSavedMovies, setLoadingSavedMovies] = useState(true);

    const {user} = useAuth();

    useEffect(() => {

        if (!user) {
            setSavedMovieIds([]);
            setLoadingSavedMovies(false);
            return;
        }
        void loadSavedMovies(user);
    }, [user]);

    async function loadSavedMovies(user: User) {
        const token = localStorage.getItem("token");

        try {
            setLoadingSavedMovies(true);

            const response = await axios.get<SavedMovieRecord[]>(
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
            if (axios.isAxiosError(error)) {
                console.error(
                    "fout bij het laden van de films:",
                    error.response?.data || error.message
                );
            } else {
                console.error("Onbekende fout: ", error);
            }
            setSavedMovieIds([]);
        } finally {
            setLoadingSavedMovies(false);
        }
    }

    async function saveMovie(movie: Movie) {
        if (!user) return;
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
            if (axios.isAxiosError(error)) {
            console.error(
                "Fout bij het opslaan van film:",
                error.response?.data || error.message
            );
        } else {
            console.error("Onbekende fout: ", error)
            }
        }
    }

    async function removeMovie(movieId: number) {
        if (!user) return;

        const token = localStorage.getItem("token");

        try {
            const response = await axios.get<SavedMovieRecord[]>(
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

                setSavedMovieIds((previousIds) =>
                    previousIds.filter((id) => id !== movieId)
                );
            }

        } catch (error) {
            if (axios.isAxiosError(error)) {
            console.log("Fout bij verwijderen van film:",
                error.response?.data || error.message
            );
        } else {
            console.error("Onbekende fout: ", error);
            }
        }
    }

    function isMovieSaved(movieId: number) {
        return savedMovieIds.includes(movieId);
    }

    return (
        <SavedMoviesContext.Provider
            value={{savedMovieIds, saveMovie, removeMovie, isMovieSaved, loadingSavedMovies,}}>
            {children}
        </SavedMoviesContext.Provider>
    );
}