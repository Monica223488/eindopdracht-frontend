import styles from './SavedMovies.module.css';
import {useEffect, useState} from 'react';
import { useContext } from "react";
import axios from "axios";
import {SavedMoviesContext} from "../../context/SavedMoviesContext.jsx";
import Movie from '../../components/Movie/Movie.jsx';
import Header from '../../components/header/Header.jsx'

function SavedMovies() {
    const {savedMovies} = useContext(SavedMoviesContext);

    return (
        <>
            <Header title="Opgeslagen films"></Header>
            <main>
                {savedMovies.length === 0 ? (
                    <p>Je hebt nog geen films opgeslagen.</p>):(
                        <ul>
                            {savedMovies.map((movie)=> (
                                <li key={movie.id}>
                                    <Movie movie={movie}/>
                                </li>
                            ))}
                        </ul>
                )}
            </main>
        </>
    )
}

export default SavedMovies;