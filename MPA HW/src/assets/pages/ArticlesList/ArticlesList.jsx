import { Link } from "react-router-dom";
import styles from "./ArticlesList.module.css";
import Loader from "../../components/Loader/Loader";
import ArticleCard from "../../components/ArticleCard/ArticleCard";

import useArticlesList from "../../hooks/useArticlesList"

export default function ArticlesList() {

    const {
        filteredArticles,
        search,
        setSearch,
        loading,
        error,
        showFavoritesOnly,
        toggleShowFavoritesOnly,
        handleDelete,
        handleFavoriteToggle
    } = useArticlesList();


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
                <Loader />
            ) : (
                <div className={styles.articlesGrid}>
                    {filteredArticles.map((article) => (
                        <ArticleCard
                            key={article.id}
                            article={article}
                            onDelete={handleDelete}
                            onFavoriteToggle={handleFavoriteToggle}
                        />
                    ))}
                </div>
            )}
        </div>
    );
}