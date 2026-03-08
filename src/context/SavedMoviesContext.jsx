import {createContext, useEffect, useState} from "react";

export const SavedMoviesContext = createContext();

export function SavedMoviesProvider({children}) {
    const [savedMovies, setSavedMovies] = useState(()=>{
        const storedMovies = localStorage.getItem("savedMovies");
        return storedMovies ? JSON.parse(storedMovies):[];
    });

    useEffect(()=>{
        localStorage.setItem("savedMovies", JSON.stringify(savedMovies));
    }, [savedMovies]);

    function saveMovie(movie){
        setSavedMovies((prev)=>{
            const alreadySaved = prev.some((savedMovie)=> savedMovie.id === movie.id);
            if (alreadySaved) return prev;
            return [...prev, movie];
        });
    }

    function removeMovie(movieId){
        setSavedMovies((prev)=>
        prev.filter((movie)=> movie.id !== movieId)
        );
    }

    return(
        <SavedMoviesContext.Provider value={{savedMovies, saveMovie, removeMovie}}>
            {children}
        </SavedMoviesContext.Provider>
    );
}