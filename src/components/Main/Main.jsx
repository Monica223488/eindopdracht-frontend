import styles from './Main.module.css';
import Popcorn from '../../assets/popcorn.png';

function Main({icon, title}) {
    return (
        <>
            <div className={styles ["title-container"]}><img src={icon} alt={title}/>
            <h1 className={styles["page-title"]}>{title}</h1>
        </div>
            <article>

            </article>
        </>
    )
}

export default Main;