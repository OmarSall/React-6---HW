import {Link} from "react-router-dom";
import styles from "./ArticleCard.module.css";

export default function ArticleCard({article}) {
    const {id, title, content} = article;

    return (
        <div className={styles.card}>
            <h3 className={styles.title}>{title}</h3>
            <p>
                {content.length > 100 ? content.slice(0, 100) + "..." : content}
            </p>
            <div className={styles.actions}>
                <Link to={`/articles/${id}`} className={styles.viewButton}>
                    View
                </Link>
                <Link to={`/articles/${id}/modify`} className={styles.editButton}>
                    Modify
                </Link>
            </div>
        </div>
    );
}