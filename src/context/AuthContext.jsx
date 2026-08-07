import { createContext, useEffect, useState } from 'react';
import { jwtDecode } from "jwt-decode";

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
            const expired = Date.now() > (decoded.exp * 1000)
                if (expired) {
                alert("Je sessie is verlopen. Log opnieuw in.");
                logout ();
                return;
            }

            setAuthState({
            user: {id: decoded.userId, email: decoded.email, role: decoded.role,},
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
        console.log("Decoded token:", decoded);

        setAuthState({
            user: {
                id: decoded.userId, email: decoded.email, role: decoded.role,
            }, status: "done",
        });
    }

    function logout(token) {
        localStorage.removeItem("token");

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