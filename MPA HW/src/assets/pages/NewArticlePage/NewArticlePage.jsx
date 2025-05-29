import { useState } from "react";
import { useNavigate } from "react-router-dom";
import ArticleForm from "../../components/ArticleForm/ArticleForm";
import { createArticleAPI } from "../../functionalities/articlesApi.js";
import { API_BASE_URL, ENDPOINTS } from "../../constants/api";
import styles from "./NewArticlePage.module.css";

export default function NewArticlePage() {
    const navigate = useNavigate();
    const [error, setError] = useState("");
    const [loading, setLoading] = useState(false);

    const handleSubmit = async (newArticle) => {
        setError(null);
        setLoading(true);
        try {
            await createArticleAPI(newArticle);
            navigate("/articles");
        } catch (error) {
            setError("Something went wrong. Please try again later.");
            console.error(error);
        } finally {
            setLoading(false);
        }
    }

    return (
        <div className={styles.newArticlePage}>
            <h1>Create a new article</h1>
            {error && <p className={styles.error}>{error}</p>}
            <ArticleForm
                onSubmit={handleSubmit}
                disabled={loading}
            />
            <button
                className={styles.backButton}
                onClick={() => navigate("/articles")}
                disabled={loading}
            >
                ← Back to Articles
            </button>
        </div>
    );
}