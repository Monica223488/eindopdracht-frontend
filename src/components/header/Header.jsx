import styles from "../header/Header.module.css"
import PropTypes from "prop-types";

function Header({icon, title}) {
        return (
            <>
                <div className={styles ["title-container"]}>
                    {icon && <img src={icon} alt={title}/>}
                    <h1 className={styles["page-title"]}>{title}</h1>
                </div>
            </>)
}

Header.propTypes = {
    icon: PropTypes.string,
    title: PropTypes.string.isRequired,
};

export default Header;