import { useState, useEffect, useCallback } from "react";
import { useParams, useNavigate } from "react-router-dom";
import styles from "./EditArticlePage.module.css";
import { updateArticleAPI, fetchArticleByIdAPI } from "../../functionalities/articlesApi";
import { loadFromLocalStorage, saveToLocalStorage } from "../../functionalities/localStorage";
import Loader from "../../components/Loader/Loader";

export default function EditArticlePage() {
    const { id } = useParams();
    const navigate = useNavigate();
    const [title, setTitle] = useState("");
    const [content, setContent] = useState("");
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);

    const fetchArticle = useCallback(async () => {
        setLoading(true);
        setError(null);
        try {
            const article = await fetchArticleByIdAPI(id);
            setTitle(article.title);
            setContent(article.content);
        } catch (err) {
            console.error(err);
            setError("Failed to load article.");
        } finally {
            setLoading(false);
        }
    }, [id]);

    useEffect(() => {
        (async () => {
            if (id) await fetchArticle();
        })();
    }, [id, fetchArticle]);

    const handleUpdate = async (event) => {
        event.preventDefault();
        try {
            await updateArticleAPI(id, { title, content });
            navigate(`/articles/`);
        } catch (error) {
            console.error(error);
            alert("Failed to update article.");
        }
    };

    if (loading) {
        return <Loader />;
    }
    if (error) {
        return <p className={styles.error}>{error}</p>;
    }

    return (
        <div className={styles.wrapper}>
            <h1>Edit Article</h1>
            <form onSubmit={handleUpdate} className={styles.form}>
                <input
                    type="text"
                    placeholder="Title"
                    value={title}
                    onChange={(e) => setTitle(e.target.value)}
                    className={styles.input}
                    required
                />
                <textarea
                    placeholder="Content"
                    value={content}
                    onChange={(e) => setContent(e.target.value)}
                    className={styles.textarea}
                    required
                />
                <div className={styles.actions}>
                    <button
                        type="submit"
                        className={styles.saveButton}>
                        Save
                    </button>
                    <button
                        type="button"
                        onClick={() => navigate(-1)}
                        className={styles.cancelButton}
                    >
                        Cancel
                    </button>
                </div>
            </form>
        </div>
    );
}