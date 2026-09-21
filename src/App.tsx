import './App.css'
import Navigation from './components/navigation/Navigation.js';
import { Routes, Route } from 'react-router-dom';
import Questionnaire from './Pages/questionaire/Questionnaire.js';
import LogIn from './Pages/logIn/LogIn.js';
import Footer from './components/footer/Footer';
import Categories from './Pages/categories/Categories.js';
import SavedMovies from './Pages/SavedMovies/SavedMovies.js';
import CreateAccount from './Pages/CreateAccount/CreateAccount.js';
import ErrorPage from './Pages/errorPage/ErrorPage.js'
import MovieDetails from "./Pages/movieDetails/MovieDetails.js";
import PrivateRoute from "./components/PrivateRoute/PrivateRoute.js";
function App() {


    return (
            <div className="page-container">
                <Navigation/>

                <main className="page-content">
                <Routes>
                    <Route path="/" element={<Questionnaire />} />
                    <Route path="/vragenlijst" element={<Questionnaire />} />
                    <Route path="/categorieën" element={<Categories />} />
                    <Route path="/opgeslagenfilms" element={<PrivateRoute><SavedMovies /></PrivateRoute> }/>
                    <Route path="/inloggen" element={<LogIn />} />
                    <Route path="/registreren" element={<CreateAccount />}/>
                    <Route path="*" element={<ErrorPage />} />
                    <Route path="/movies/:movieId" element={<MovieDetails />}/>
                </Routes>
                </main>
                <Footer/>
            </div>
    )
}

export default App
