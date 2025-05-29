import styles from "./Loader.module.css";

export default function Loader() {
    return (
        <div className={styles.loaderWrapper}>
            <div className={`${styles.loaderWrapper} ${styles.fullscreenOverlay}`} aria-label="Loading"></div>
        </div>
    );
}