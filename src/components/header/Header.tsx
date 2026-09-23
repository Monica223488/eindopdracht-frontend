import styles from "./Header.module.css"

type HeaderProps = {
    title: string;
}

function Header({title}:HeaderProps) {
        return (
                <div className={styles ["title-container"]}>
                    <h1 className={styles["page-title"]}>{title}</h1>
                </div>
            )
}


export default Header;