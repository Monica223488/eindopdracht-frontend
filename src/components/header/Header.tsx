import styles from "./Header.module.css"

type HeaderProps = {
    icon?: string;
    title: string;
}

function Header({icon, title}:HeaderProps) {
        return (
                <div className={styles ["title-container"]}>
                    {icon && <img src={icon} alt={title}/>}
                    <h1 className={styles["page-title"]}>{title}</h1>
                </div>
            )
}


export default Header;