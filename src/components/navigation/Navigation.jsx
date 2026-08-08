import { useContext, useState } from 'react';
import { NavLink, useNavigate } from 'react-router-dom';

import { AuthContext } from '../../context/AuthContext.jsx';
import Button from '../../components/Button/Button.jsx';

import styles from './Navigation.module.css';

function Navigation() {
    const[menuOpen, setMenuOpen] = useState(false);
    const navigate = useNavigate();
    const {user, logout}= useContext(AuthContext);

    return (
        <>
            <nav>
                <div className={styles['nav-container']}>
                    <h4>MoovieMatcher</h4>

                    <button
                        type="button" className={styles["hamburger"]} onClick={() => setMenuOpen((prev) => !prev)}>
                        <span></span>
                        <span></span>
                        <span></span>
                    </button>
                    <div className={`${styles['nav-menu']} ${menuOpen ? styles.open : ''}`}>
                        <ul className={styles['nav-pages']}>
                            <li><NavLink className={({isActive}) => isActive ? 'active-menu-link' : 'default-menu-link'}
                                         to="/vragenlijst" onClick={() => setMenuOpen(false)}>vragenlijst</NavLink></li>
                            <li><NavLink className={({isActive}) => isActive ? 'active-menu-link' : 'default-menu-link'}
                                         to="/categorieën" onClick={() => setMenuOpen(false)}>categorieën</NavLink></li>
                            <li><NavLink className={({isActive}) => isActive ? 'active-menu-link' : 'default-menu-link'}
                                         to="/opgeslagenfilms" onClick={() => setMenuOpen(false)}>opgeslagen
                                films</NavLink></li>
                        </ul>
                        <div className={styles['nav-buttons']}>
                            {user ? (<>
                                    <Button text="uitloggen" type="button" clickHandler={logout}/>
                                </>
                            ) : (
                                <>
                                    <Button text="inloggen"
                                            type="button" clickHandler={() => {
                                        setMenuOpen(false);
                                        navigate("/inloggen");
                                    }}/>
                                    <Button text="registreren" clickHandler={() => {
                                        setMenuOpen(false);
                                        navigate("/registreren");
                                    }}/>
                                </>
                            )}

                        </div>
                    </div>
                </div>
            </nav>
        </>
    )
}

export default Navigation;