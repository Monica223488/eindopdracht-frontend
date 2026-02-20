import { createContext, useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { jwtDecode } from "jwt-decode";
import axios from 'axios';


function AuthContextProvider({ children }) {
    const [authState, setAuthState] = useState({
        user: null,
        status: 'pending',
    })

    useEffect(() => {
        // check of er nog een token in Local Storage staat
        // ZO JA: haal dan de nieuwe data op en zet deze in de state:
        setAuthState({
            user: {
                username: 'Piet',
                email: 'pieter@gmail.com',
                id: 23,
            },
            status: 'done',
        });

        // ZO NEE:
        setAuthState({
            user: null,
            status: 'done',
        });

    }, []);

    const data = {
        ...authState,
        login: login,
        logout: logout,
    };

    return (
        <AuthContext.Provider value={data}>
            {authState.status === 'pending'
                ? <p>Loading...</p>
                : children
            }
        </AuthContext.Provider>
    );
}

export default AuthContextProvider;