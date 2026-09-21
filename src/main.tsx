import {StrictMode} from 'react'
import {createRoot} from 'react-dom/client'
import './index.css'
import App from './App'
import {BrowserRouter as Router} from 'react-router-dom';
import {SavedMoviesProvider} from "./context/SavedMoviesContext";
import AuthContextProvider from "./context/AuthContext";

createRoot(document.getElementById('root')!).render(
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
