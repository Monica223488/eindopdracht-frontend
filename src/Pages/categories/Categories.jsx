import React from 'react';
import styles from './Categories.module.css';
import {useEffect, useState} from 'react';
import axios from "axios";

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


    const [pokemon, setPokemon] = useState({});
    const [endpoint, setEndpoint] = useState('https://pokeapi.co/api/v2/pokemon/');
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
                setPokemon(data);
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
                   <p>{pokemon.name}</p>
                </article>
            </>
        )
    }


export default Categories;