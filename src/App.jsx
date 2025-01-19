import {useState} from 'react'
import './App.css'
import Navigation from './components/navigation/Navigation.jsx';
import { Routes, Route } from 'react-router-dom';
import Questionnaire from './Pages/questionaire/Questionnaire.jsx';
import LogIn from './Pages/logIn/LogIn.jsx';
import Footer from './components/footer/Footer.jsx';
import Categories from './Pages/categories/Categories.jsx';
import SavedMovies from './Pages/SavedMovies/SavedMovies.jsx';
function App() {


    return (
        <>
            <div className="page-container">
                <Navigation/>
                <Routes>
                    <Route path="/vragenlijst" element={<Questionnaire />} />
                    <Route path="/categorieën" element={<Categories />} />
                    <Route path="/opgeslagenfilms" element={<SavedMovies /> }/>
                    <Route path="/inloggen" element={<LogIn />} />
                </Routes>
            </div>
            <Footer/>
        </>
    )
}

export default App
