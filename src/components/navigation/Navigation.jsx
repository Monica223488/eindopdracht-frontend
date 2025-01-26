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
                    <ul>
                        <li><NavLink className={({isActive}) => isActive ? 'active-menu-link' : 'default-menu-link'}
                                     to="/vragenlijst">vragenlijst</NavLink></li>
                        <li><NavLink className={({isActive}) => isActive ? 'active-menu-link' : 'default-menu-link'}
                                     to="/categorieën">categorieën</NavLink></li>
                        <li><NavLink className={({isActive}) => isActive ? 'active-menu-link' : 'default-menu-link'}
                                     to="/opgeslagenflims">opgeslagen flims</NavLink></li>
                        {/*<li><NavLink className={({isActive}) => isActive ? 'active-menu-link' : 'default-menu-link'}*/}
                        {/*             to="/inloggen">inloggen</NavLink></li>*/}
                    </ul>
                    <Button text="inloggen"
                            type= "button" onClick="() => navigate('/inloggen')"/>
                    <Button text="registeren" clickHandler={()=>Navigate ("/registeren")} />
                    <button type="button" onClick={()=>Navigate("/registreren")}>registreren</button>
                </div>
            </nav>
        </>
    )
}

export default Navigation;