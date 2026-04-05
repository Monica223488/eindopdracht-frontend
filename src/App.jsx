import {useState} from 'react'
import './App.css'
import Navigation from './components/navigation/Navigation.jsx';
import { Routes, Route } from 'react-router-dom';
import Questionnaire from './Pages/questionaire/Questionnaire.jsx';
import LogIn from './Pages/logIn/LogIn.jsx';
import Footer from './components/footer/Footer.jsx';
import Categories from './Pages/categories/Categories.jsx';
import SavedMovies from './Pages/SavedMovies/SavedMovies.jsx';
import CreateAccount from './Pages/CreateAccount/CreateAccount.jsx';
import ErrorPage from './Pages/errorPage/ErrorPage.jsx'
function App() {


    return (
        <>
            <div className="page-container">
                <Navigation/>

                <main className="page-content">
                <Routes>
                    <Route path="/" element={<Questionnaire />} />
                    <Route path="/vragenlijst" element={<Questionnaire />} />
                    <Route path="/categorieën" element={<Categories />} />
                    <Route path="/opgeslagenfilms" element={<SavedMovies /> }/>
                    <Route path="/inloggen" element={<LogIn />} />
                    <Route path="/registreren" element={<CreateAccount />}/>
                    <Route path="*" element={<ErrorPage />} />
                </Routes>
                </main>
                <Footer/>
            </div>
        </>
    )
}

export default App
