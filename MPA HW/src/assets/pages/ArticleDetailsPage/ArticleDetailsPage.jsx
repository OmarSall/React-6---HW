import { useState, useEffect, useCallback } from "react";
import { useParams, useNavigate } from "react-router-dom";
import styles from "./ArticleDetailsPage.module.css";
import Loader from "../../components/Loader/Loader";
import { ENDPOINTS } from "../../constants/api";

export default function ArticleDetailsPage() {
    const { id } = useParams();
    const navigate = useNavigate();
    const [article, setArticle] = useState(null);
    const [error, setError] = useState(null);
    const [loading, setLoading] = useState(true);
    import { fetchArticleByIdAPI, deleteArticleAPI } from "../../functionalities/articlesApi";

    const fetchArticle = useCallback(async () => {
        setLoading(true);
        setError(null);
        try {
            const data = await fetchArticleByIdAPI(id);
            setArticle(data);
        } catch (error) {
            setError("Something went wrong. Please try again later.");
            console.error(error);
        } finally {
            setLoading(false);
        }
    }, [id]);

    useEffect(() => {
        (async () => {
            if (id) {
                await fetchArticle();
            }
        })();
    }, [id, fetchArticle]);

    if (loading) {
        return <Loader />;
    }
    if (error) {
        return <div>{error}</div>;
    }
    if (!article) {
        return <div>Article not found.</div>;
    }

    return (
        <div className={styles.articleDetails}>
            <h1 className={styles.title}>{article.title}</h1>
            <p className={styles.content}>{article.content}</p>
            <button
                className={styles.modifyButton}
                onClick={() => navigate(`/articles/${id}/modify`)}
            >
                Modify Article
            </button>
        </div>
    );
}