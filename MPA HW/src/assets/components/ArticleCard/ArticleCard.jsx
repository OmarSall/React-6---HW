import {Link, useNavigate} from "react-router-dom";
import styles from "./ArticleCard.module.css";
import { deleteArticleAPI } from "../../functionalities/articlesApi.js";
import {loadFromLocalStorage, saveToLocalStorage} from "../../functionalities/localStorage";
import { useFavorite } from "../../hooks/useFavorite";


export default function ArticleCard({article, onDelete, onFavoriteToggle}) {
    const {id, title, content} = article;
    const navigate = useNavigate();
    const { isFavorite, toggleFavorite } = useFavorite(id);

    const handleDelete = async () => {
        const confirmed = confirm("Are you sure you want to delete this article?");
        if (!confirmed) {
            return;
        }
        try {
            await deleteArticleAPI(id);
            const updated = loadFromLocalStorage("articles")?.filter(a => a.id !== id);
            saveToLocalStorage("articles", updated || []);
            onDelete?.(id); // Inform parent to re-fetch
        } catch (error) {
            console.error("Delete failed:", error);
            alert("Error deleting article.");
        }

    };

    const handleFavoriteClick = () => {
        toggleFavorite();
        onFavoriteToggle?.();
    };

    return (
        <div className={styles.card}>
            <h3 className={styles.title}>{title}</h3>
            <span
                onClick={handleFavoriteClick}
                className={`${styles.favoriteStar} ${isFavorite ? styles.favorite : ""}`}
                title={isFavorite ? "Remove from favorites" : "Add to favorites"}
                role="button"
                tabIndex={0}
                onKeyDown={(event) =>
                    event.key === "Enter" && handleFavoriteClick()}
            >
                    ★
            </span>
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
                <button
                    className={styles.deleteButton}
                    onClick={(e) => {
                        e.stopPropagation()
                        void handleDelete();
                    }}>
                    🗑 Delete
                </button>
            </div>
        </div>
    );
}