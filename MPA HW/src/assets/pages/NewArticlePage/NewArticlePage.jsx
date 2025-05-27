import { useState } from "react";
import { useNavigate } from "react-router-dom";
import ArticleForm from "../../components/ArticleForm/ArticleForm";
import { API_BASE_URL, ENDPOINTS } from "../../constants/api";
import styles from "./NewArticlePage.module.css";

export default function NewArticlePage() {
    const navigate = useNavigate();
    const [error, setError] = useState("");

    const handleSubmit = async (newArticle) => {
        setError(null);
        try {
            const response = await fetch(ENDPOINTS.ARTICLES, {
                method: "POST",
                headers: {
                    "Content-Type": "application/json"
                },
                body: JSON.stringify(newArticle)
            });
            if (!response.ok) {
                throw new Error("Failed to create article.");
            }
            const createdArticle = await response.json();
            navigate("/articles");
        } catch (error) {
            setError("Something went wrong. Please try again later.");
            console.error(error);
        }
    }

    return (
        <div className={styles.newArticlePage}>
            <h1>Create a new article</h1>
            {error && <p className={styles.error}>{error}</p>}
            <ArticleForm onSubmit={handleSubmit} />
            <button
                className={styles.backButton}
                onClick={() => navigate("/articles")}
            >
                ← Back to Articles
            </button>
        </div>
    );
}