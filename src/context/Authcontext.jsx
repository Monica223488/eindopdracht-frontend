import { createContext, useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { jwtDecode } from "jwt-decode";
import axios from 'axios';

export const AuthContext = createContext(null);

function AuthContextProvider({ children }) {
    const [authState, setAuthState] = useState({
        user: null,
        status: 'pending',
    })

    useEffect(() => {
        const token = localStorage.getItem('token');
        if (!token){
        setAuthState({
            user: null,
            status: 'done',
        });
        return;
        }

        try {
            const decoded =jwtDecode(token);

            setAuthState({
            user: {username: decoded.sub || decoded.username || null,},
            status: 'done',
        });

    } catch (error)
    {
        console.error(error);
        localStorage.removeItem('token');
        setAuthState({user: null, status: 'done',});
    }
    }, []);

    function login(token) {
        localStorage.setItem("token", token);
        const decoded = jwtDecode(token);

        setAuthState({
            user: {
                username: decoded.sub || decoded.username,
            }, status: "done",
        });
    }

    function logout(token) {
        localStorage.removeItem("token", token);

        setAuthState({
            user: null, status: "done",
        });
    }


    const data = {
        ...authState,
        login,
        logout,
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