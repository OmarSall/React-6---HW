import {useEffect, useState, useCallback} from "react";
import {
    fetchArticlesAPI,
    createArticleAPI,
    deleteArticleAPI,
    updateArticleAPI,
} from "../functionalities/articlesApi";

export function useArticlesData() {
    const [articles, setArticles] = useState([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);

    const fetchArticles = useCallback(async () => {
        setLoading(true);
        setError(null);
        try {
            const data = await fetchArticlesAPI();
            setArticles(data);
        } catch (err) {
            console.error("Fetch error:", err);
            setError(err);
        } finally {
            setLoading(false);
        }
    }, []);

    const createArticle = useCallback(async (article) => {
        try {
            const newArticle = await createArticleAPI(article);
            setArticles(prev => [...prev, newArticle]);
        } catch (err) {
            console.error("Create error:", err);
        }
    }, []);

    const deleteArticle = useCallback(async (id) => {
        try {
            await deleteArticleAPI(id);
            await fetchArticles();
        } catch (err) {
            console.error("Delete error:", err);
        }
    }, [fetchArticles]);

    const updateArticle = useCallback(async (id, updatedFields) => {
        try {
            await updateArticleAPI(id, updatedFields);
            await fetchArticles();
        } catch (err) {
            console.error("Update error:", err);
        }
    }, [fetchArticles]);

    useEffect(() => {
        fetchArticles();
    }, [fetchArticles]);

    return {
        articles,
        loading,
        error,
        createArticle,
        deleteArticle,
        updateArticle,
    };
}