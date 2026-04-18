import React from 'react';
import './ErrorPage.module.css';
import {Link} from "react-router-dom";

function ErrorPage() {
    return (
        <>
            <h2 className={styles["error-text"]}>O, nee! Er is iets fout gegaan. Klik <Link to="/vragenlijst"><strong>hier</strong></Link> om weer terug te keren naar de vragenlijst pagina.</h2>
        </>
    )
}

export default ErrorPage;