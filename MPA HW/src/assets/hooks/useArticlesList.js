import { useCallback, useEffect, useMemo, useState } from "react";
import { useDebounce } from "use-debounce";
import {
    fetchArticlesAPI,
    deleteArticleAPI,
} from "../functionalities/articlesApi";
import {
    loadFromLocalStorage,
    saveToLocalStorage,
} from "../functionalities/localStorage";

export default function useArticlesList() {
    const [articles, setArticles] = useState([]);
    const [search, setSearch] = useState("");
    const [debouncedSearch] = useDebounce(search, 300);
    const [loading, setLoading] = useState(false);
    const [error, setError] = useState(null);
    const [showFavoritesOnly, setShowFavoritesOnly] = useState(false);
    const [favorites, setFavorites] = useState([]);

    useEffect(() => {
        const storedFavorites = loadFromLocalStorage("favorites") || [];
        setFavorites(storedFavorites);
    }, []);

    const fetchArticles = useCallback(async () => {
        setLoading(true);
        setError(null);
        try {
            const data = await fetchArticlesAPI();
            setArticles(data);
            saveToLocalStorage("articles", data);
        } catch (err) {
            console.error(err);
            setError("Failed to load articles.");
        } finally {
            setLoading(false);
        }
    }, []);

    useEffect(() => {
        (async () => {
            await fetchArticles();
        })();
    }, [fetchArticles]);

    const handleDelete = useCallback(async (id) => {
        try {
            await deleteArticleAPI(id);
            const updated = articles.filter((a) => a.id !== id);
            setArticles(updated);
            saveToLocalStorage("articles", updated);
        } catch (err) {
            console.error("Delete failed", err);
            setError("Failed to delete article.");
        }
    }, [articles]);

    const filteredArticles = useMemo(() => {
        let filtered = articles.filter(({ title, content }) =>
            `${title} ${content}`.toLowerCase().includes(debouncedSearch.toLowerCase())
        );
        if (showFavoritesOnly) {
            filtered = filtered.filter((article) => favorites.includes(article.id));
        }
        return filtered;
    }, [articles, debouncedSearch, showFavoritesOnly, favorites]);

    const toggleShowFavoritesOnly = () => {
        setShowFavoritesOnly((prev) => !prev);
    };

    const handleFavoriteToggle = () => {
        const updatedFavorites = loadFromLocalStorage("favorites") || [];
        console.log("Updated favorites:", updatedFavorites);
        setFavorites(updatedFavorites);
    };

    return {
        articles,
        filteredArticles,
        search,
        setSearch,
        loading,
        error,
        showFavoritesOnly,
        toggleShowFavoritesOnly,
        handleDelete,
        handleFavoriteToggle,
    };
}