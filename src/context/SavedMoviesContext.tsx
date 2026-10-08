import {createContext, useContext, useEffect, useState} from 'react';
import type { ReactNode } from 'react';
import axios from 'axios';
import type { Movie } from '../types/Movie';

import {useAuth} from './AuthContext';

const apiUrl = import.meta.env.VITE_API_URL;

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
    tmdbId: number;
    title: string,
    posterPath: string | null;
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
    const [savedMovies, setSavedMovies] = useState<SavedMovieRecord[]>([]);
    const [loadingSavedMovies, setLoadingSavedMovies] = useState(true);

    const {user} = useAuth();

    const savedMovieIds = savedMovies.map((movie) => movie.tmdbId);

    useEffect(() => {

        if (!user) {
            setSavedMovies([]);
            setLoadingSavedMovies(false);
            return;
        }
        let cancelled = false;

    async function loadSavedMovies() {
        const token = localStorage.getItem("token");

        try {
            setLoadingSavedMovies(true);
            setSavedMovies([]);

            const response = await axios.get<SavedMovieRecord[]>(
                `${apiUrl}/saved-movies`,
                {
                    headers:
                        {
                            Authorization: `Bearer ${token}`,
                        },
                }
            );
            if (!cancelled) {
            setSavedMovies(response.data);
        }

    } catch (error) {
            if (!cancelled) {
                if (axios.isAxiosError(error)) {
                    console.error(
                        "Fout bij het laden van de films:",
                        error.response?.data || error.message
                    );
                } else {
                    console.error("Onbekende fout:", error);
                }

                setSavedMovies([]);
            }

        } finally {
            if (!cancelled) {
                setLoadingSavedMovies(false);
            }
        }
    }

    void loadSavedMovies();

    return () => {
        cancelled = true;
    };

}, [user]);

    async function saveMovie(movie: Movie) {
        if (!user) return;
        if (savedMovieIds.includes(movie.id)) return;

        const token = localStorage.getItem("token");

        try {
            const response = await axios.post<SavedMovieRecord>(
                `${apiUrl}/saved-movies`,
                {
                    tmdbId: movie.id,
                    title: movie.title,
                    posterPath: movie.poster_path,
                },
                {
                    headers: {
                        Authorization: `Bearer ${token}`,
                    },
                }
            );

            setSavedMovies((previousMovies) => [
                ...previousMovies,
                response.data,
            ]);

        } catch (error) {
            if (axios.isAxiosError(error)) {
                console.error(
                    "Fout bij het opslaan van film:",
                    error.response?.data || error.message
                );
            } else {
                console.error("Onbekende fout:", error);
            }
        }
    }

    async function removeMovie(movieId: number) {
        if (!user) return;

        const token = localStorage.getItem("token");

        const foundRecord = savedMovies.find(
            (movie) => movie.tmdbId === movieId
        );

        if (!foundRecord) return;

        try {
            await axios.delete(
                `${apiUrl}/saved-movies/${foundRecord.id}`,
                {
                    headers: {
                        Authorization: `Bearer ${token}`,
                    },
                }
            );

            setSavedMovies((previousMovies) =>
                previousMovies.filter(
                    (movie) => movie.tmdbId !== movieId
                )
            );

        } catch (error) {
            if (axios.isAxiosError(error)) {
                console.error(
                    "Fout bij het verwijderen van film:",
                    error.response?.data || error.message
                );
            } else {
                console.error("Onbekende fout:", error);
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