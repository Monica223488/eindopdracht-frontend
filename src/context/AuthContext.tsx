import {createContext, ReactNode, useContext, useEffect, useState} from 'react';
import { jwtDecode } from "jwt-decode";

export type User = {
    id: string;
    email: string;
    role: string;
};

type AuthState = {
    user: User | null;
    status: 'pending' | 'done';
};

type JwtPayload = {
    exp: number;
    userId: string;
    email: string;
    role: string;
};

type AuthContextType = {
    user: User | null;
    status: 'pending' | 'done';
    login: (token: string) => void;
    logout: () => void;
};

type AuthContextProviderProps = {
    children: ReactNode;
};


export const AuthContext = createContext<AuthContextType | null>(null);

export function useAuth() {
    const context = useContext(AuthContext);

    if (!context) {
        throw new Error(
            "useAuth moet binnen een AuthContextProvider gebruikt worden."
        );
    }

    return context;
}

function AuthContextProvider({ children }:AuthContextProviderProps) {
    const [authState, setAuthState] = useState<AuthState>({
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
            const decoded =jwtDecode<JwtPayload>(token);
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

    function login(token: string) {
        localStorage.setItem("token", token);
        const decoded = jwtDecode<JwtPayload>(token);

        setAuthState({
            user: {
                id: decoded.userId, email: decoded.email, role: decoded.role,
            }, status: "done",
        });
    }

    function logout() {
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