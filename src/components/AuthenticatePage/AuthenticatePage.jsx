import styles from './AuthenticatePage.module.css';
import React from "react";

function AuthenticatePage({title, children}) {
    return (
        <>
            <div className={styles['container']}>
                <div className={styles['left']}>
                    <h1>Welke film wil je kijken? Eens iets buiten je comfortzone?</h1>
                </div>
                <div className={styles['right']}>
                    <div className={styles['form-container']}>
                    <h2>{title}</h2>
                    {children}
                    </div>
                </div>
            </div>

        </>
    )
}

export default AuthenticatePage;