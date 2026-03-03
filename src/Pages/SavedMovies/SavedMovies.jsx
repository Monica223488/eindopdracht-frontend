import styles from './SavedMovies.module.css';
import {useEffect, useState} from 'react';
import axios from "axios";
import Movie from '../../components/Movie/Movie.jsx';
import Header from '../../components/header/Header.jsx'
import Button from '../../components/Button/Button.jsx';

function SavedMovies() {
    const [savedMovies, setSavedMovies] = useState({});
    const [loading, toggleLoading] = useState(false);
    const [error, toggleError] = useState(false);
    const [endpoint, setEndpoint] = useState('https://api.themoviedb.org/3/discover/movie',
        {params: {api_key: import.meta.env.VITE_API_KEY,},});

    useEffect(() => {
            const controller = new AbortController();

            async function fetchData() {
                toggleLoading(true);
                toggleError(false);

                try {
                    const {data} = await axios.get(endpoint, {
                        signal: controller.signal, params: {api_key: import.meta.env.VITE_API_KEY,}
                    });
                    setSavedMovies(data);
                } catch (e) {
                    if (axios.isCancel(e)) {
                        console.error("Het is niet gelukt helaas");
                    } else {
                        console.error(e);
                        toggleError(true);
                    }

                } finally {
                    toggleLoading(false);
                }
            }

            if (endpoint) {
                fetchData(endpoint);
            }
            return () => {
                controller.abort();
            }
        } , [endpoint]);

    return (
        <>
            <Header title="Opgeslagen films"></Header>
        </>
    )
}

export default SavedMovies;