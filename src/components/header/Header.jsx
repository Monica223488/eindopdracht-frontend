import styles from "../header/Header.module.css";

function Header({icon, title}) {
        return (
            <>
                <div className={styles ["title-container"]}><img src={icon} alt={title}/>
                    <h1 className={styles["page-title"]}>{title}</h1>
                </div>
            </>)
}

export default Header;