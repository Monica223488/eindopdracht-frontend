import styles from './Footer.module.css';

function Footer() {
    const currentYear = new Date().getFullYear();
    return (
            <footer className={styles["footer-container"]}>
                <h4>{currentYear} MoovieMatcher</h4>
            </footer>
    )
}

export default Footer;