import React from 'react';
import styles from './Navigation.module.css';
import {NavLink, useNavigate} from 'react-router-dom';
import Button from '../../components/Button/Button.jsx';

function Navigation() {
    const Navigate = useNavigate();

    return (
        <>
            <nav>
                <div className={styles['nav-container']}>
                    <h4>MoovieMatcher</h4>
                    <ul className={styles['nav-pages']}>
                        <li><NavLink className={({isActive}) => isActive ? 'active-menu-link' : 'default-menu-link'}
                                     to="/vragenlijst">vragenlijst</NavLink></li>
                        <li><NavLink className={({isActive}) => isActive ? 'active-menu-link' : 'default-menu-link'}
                                     to="/categorieën">categorieën</NavLink></li>
                        <li><NavLink className={({isActive}) => isActive ? 'active-menu-link' : 'default-menu-link'}
                                     to="/opgeslagenfilms">opgeslagen films</NavLink></li>
                    </ul>
                    <div className={styles['nav-buttons']}>
                    <Button text="inloggen"
                            type= "button" clickHandler={() => Navigate("/inloggen")}/>
                    <Button text="registreren" clickHandler={()=>Navigate ("/registreren")} />
                    </div>
                </div>
            </nav>
        </>
    )
}

export default Navigation;