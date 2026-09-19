import {StrictMode} from 'react'
import {createRoot} from 'react-dom/client'
import './index.css'
import App from './App.tsx'
import {BrowserRouter as Router} from 'react-router-dom';
import {SavedMoviesProvider} from "./context/SavedMoviesContext.tsx";
import AuthContextProvider from "./context/AuthContext.tsx";

createRoot(document.getElementById('root')).render(
    <StrictMode>
        <Router>
            <AuthContextProvider>
            <SavedMoviesProvider>
            <App/>
            </SavedMoviesProvider>
                </AuthContextProvider>
        </Router>
    </StrictMode>,
)
