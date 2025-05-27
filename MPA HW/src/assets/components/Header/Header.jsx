import {NavLink} from "react-router-dom";
import styles from "./Header.module.css";

export default function Header() {
    return (
        <header className={styles.header}>
            <nav className={styles.nav}>
                <NavLink
                    to="/articles"
                    className={({isActive}) =>
                        isActive ? styles.activeLink : styles.link
                    }
                >
                    Articles
                </NavLink>
                <NavLink to={"/new-article"}
                         className={({isActive}) =>
                             isActive ? styles.activeLink : styles.link
                         }
                >
                    New Articles
                </NavLink>
            </nav>
        </header>
    );
}