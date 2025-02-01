import React from 'react';
import styles from './Categories.module.css';
import {useEffect, useState} from 'react';
import axios from "axios";
import Movie from '../../components/Movie/Movie.jsx'

function Categories() {
    // const [categories, setCategories] = React.useState([]);
    // const [loading, toggleLoading] = useState(false);
    // const [error, toggleError] = useState(false);
    //
    // useEffect(() => {
    //     const controller = new AbortController();
    //
    //     async function fetchData() {
    //         toggleLoading(true);
    //         toggleError(false);
    //
    //         try {
    //             const result = await axios.get('https://api.chucknorris.io/jokes/random');
    //             console.log(result);
    //         } catch (e) {
    //             console.error(e);
    //         }
    //         return result;
    //     }
    //
    //     fetchData();


    const [Movie, setMovie] = useState({});
    const [endpoint, setEndpoint] = useState('https://api.themoviedb.org/3/search/movie');
    const [loading, toggleLoading] = useState(false);
    const [error, toggleError] = useState(false);

    useEffect(() => {
        const controller = new AbortController();

        async function fetchData() {
            toggleLoading(true);
            toggleError(false);

            try {
                const { data } = await axios.get(endpoint, {
                    signal: controller.signal,
                });
                setMovie(data);
            } catch (e) {
                if (axios.isCancel(e)) {
                    console.error('Request is canceled...');
                } else {
                    console.error(e);
                    toggleError(true);
                }
            } finally {
                toggleLoading(false);
            }
        }

        if (endpoint) {
            fetchData();
        }

        return () => {
            console.log('unmount effect is triggered');
            controller.abort();
        }

    }, []);

    return (
            <>
                <h2>Zie hier een overzicht van alle films</h2>
                <article className={styles['movie-ordering']}>
                   <p></p>
                </article>
            </>
        )
    }


export default Categories;