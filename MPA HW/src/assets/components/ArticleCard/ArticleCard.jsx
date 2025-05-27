import {Link, useNavigate} from "react-router-dom";
import styles from "./ArticleCard.module.css";
import { useState, useEffect } from "react";
import { loadFromLocalStorage, saveToLocalStorage } from "../../functionalities/localStorage";
import { deleteArticleAPI } from "../../functionalities/articlesApi.js";


export default function ArticleCard({article}) {
    const {id, title, content} = article;
    const navigate = useNavigate();
    const [isFavorite, setIsFavorite] = useState(false);

    useEffect(() => {
        const favorites = loadFromLocalStorage("favorites") || [];
        setIsFavorite(favorites.includes(id));
    }, [id]);

    const toggleFavorite = () => {
        const favorites = loadFromLocalStorage("favorites") || [];
        let updatedFavorites;
        if (favorites.includes(id)) {
            updatedFavorites = favorites.filter(favId => favId !== id);
            setIsFavorite(false);
        } else {
            updatedFavorites = [...favorites, id];
            setIsFavorite(true);
        }
        saveToLocalStorage("favorites", updatedFavorites);
    };

    const handleDelete = async () => {
        if (confirm("Are you sure you want to delete this article?")) {
            try {
                await deleteArticleAPI(id);
                const updated = loadFromLocalStorage("articles")?.filter(a => a.id !== id);
                saveToLocalStorage("articles", updated || []);
                navigate("/articles");
            } catch (error) {
                console.error("Delete failed:", error);
                alert("Error deleting article.");
            }
        }
    };

    return (
        <div className={styles.card}>
            <h3 className={styles.title}>{title}</h3>
            <span
                onClick={toggleFavorite}
                className={`${styles.favoriteStar} ${isFavorite ? styles.favorite : ""}`}
                title={isFavorite ? "Remove from favorites" : "Add to favorites"}
                role="button"
                tabIndex={0}
                onKeyDown={(e) => { if(e.key === "Enter") toggleFavorite(); }}
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
                <button onClick={handleDelete} className={styles.deleteButton}>Delete</button>
            </div>
        </div>
    );
}