import styles from './Footer.module.css';
import tmdbLogo from '../../assets/tmdbLogo.svg';

function Footer() {
    const currentYear = new Date().getFullYear();
    return (
            <footer className={styles["footer-container"]}>
                <h4>© {currentYear} MoovieMatcher</h4>
                <div className={styles.attribution}>
                    <a
                        href="https://www.themoviedb.org/"
                        target="_blank"
                        rel="noopener noreferrer"
                    >
                        <img src={tmdbLogo} alt="TMDB logo" />
                    </a>

                    <p>
                        This product uses the TMDB API but is
                        not endorsed or certified by TMDB.
                    </p>
                </div>
            </footer>
    )
}

export default Footer;