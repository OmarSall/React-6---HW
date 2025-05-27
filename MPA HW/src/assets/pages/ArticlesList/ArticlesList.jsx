import {useMemo, useCallback, useEffect, useState} from "react";
import { Link, useNavigate } from "react-router-dom";
import {useDebounce} from "use-debounce";
import Loader from "../../components/Loader/Loader";
import ArticleCard from "../../components/ArticleCard/ArticleCard";
import styles from "./ArticlesList.module.css";
import { fetchArticlesAPI } from "../../functionalities/articlesApi.js";
import { loadFromLocalStorage, saveToLocalStorage } from "../../functionalities/localStorage";



export default function ArticlesList() {
    const [articles, setArticles] = useState([]);
    const [search, setSearch] = useState("");
    const [debouncedSearch] = useDebounce(search, 300);
    const [loading, setLoading] = useState(false);
    const [error, setError] = useState(null);
    const navigate = useNavigate();
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
        } catch (error) {
            setError("Failed to load articles.");
            console.error(error);
        } finally {
            setLoading(false);
        }
    }, []);

    useEffect(() => {
        (async () => {
            await fetchArticles();
        })();
    }, [fetchArticles]);

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

    return (
        <div className={styles.wrapper}>
            <div className={styles.header}>
                <h1>Articles</h1>
                <div className={styles.topBar}>
                    <Link to="/new-article" className={styles.newArticleButton}>
                        + New Article
                    </Link>
                    <label className={styles.favoritesToggle}>
                        <input
                            type="checkbox"
                            checked={showFavoritesOnly}
                            onChange={toggleShowFavoritesOnly}
                        />
                        Show Favorites Only
                    </label>
                </div>
                <input
                    type="text"
                    placeholder="Search by title or content..."
                    value={search}
                    onChange={(event) => setSearch(event.target.value)}
                    className={styles.search}
                />
            </div>

            {error && <p className={styles.error}>{error}</p>}
            {loading ? (
                <Loader/>
            ) : (
                <div className={styles.articlesGrid}>
                    {filteredArticles.map((article) => (
                        <ArticleCard
                            key={article.id}
                            article={article}
                            onClick={() => navigate(`/articles/${article.id}`)}
                        />
                    ))}
                </div>
            )}
        </div>
    );
}