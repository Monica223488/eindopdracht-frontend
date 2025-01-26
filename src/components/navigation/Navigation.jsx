import React from 'react';
import './Navigation.module.css';
import {NavLink} from 'react-router-dom';

function Navigation() {
    return (
        <>
            <nav>
                <div className="nav-container">
                    <h4>MoovieMatcher</h4>
                    <ul>
                        <li><NavLink className={({isActive}) => isActive ? 'active-menu-link' : 'default-menu-link'}
                                     to="/vragenlijst">vragenlijst</NavLink></li>
                        <li><NavLink className={({isActive}) => isActive ? 'active-menu-link' : 'default-menu-link'}
                                     to="/categorieën">categorieën</NavLink></li>
                        <li><NavLink className={({isActive}) => isActive ? 'active-menu-link' : 'default-menu-link'}
                                     to="/opgeslagenflims">opgeslagen flims</NavLink></li>
                        <li><NavLink className={({isActive}) => isActive ? 'active-menu-link' : 'default-menu-link'}
                                     to="/inloggen">inloggen</NavLink></li>
                    </ul>
                </div>
            </nav>
        </>
    )
}

export default Navigation;