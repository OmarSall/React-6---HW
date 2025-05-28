import { API_BASE_URL, ENDPOINTS } from "../constants/api";
import { saveToLocalStorage, loadFromLocalStorage } from "./localStorage";

const LOCAL_STORAGE_KEY = "articles";

// GET: Fetch all articles (from localStorage fallback)
export async function fetchArticlesAPI() {
    try {
        const response = await fetch(ENDPOINTS.ARTICLES);
        if (!response.ok) {
            throw new Error("Failed to fetch articles");
        }
        const data = await response.json();
        saveToLocalStorage(LOCAL_STORAGE_KEY, data);
        return data;
    } catch (error) {
        console.error("Fetch failed, loading articles from localStorage...");
        const cachedArticles = loadFromLocalStorage(LOCAL_STORAGE_KEY);
        if (cachedArticles) {
            return cachedArticles;
        }
        throw new Error("Failed to load articles from API and localStorage");
    }
}

// GET: Fetch single article by ID
export async function fetchArticleByIdAPI(id) {
    const response = await fetch(ENDPOINTS.ARTICLE_BY_ID(id));
    if (!response.ok) {
        throw new Error("Failed to fetch article");
    }
    return response.json();
}

// POST: Create new article
export async function createArticleAPI(article) {
    const response = await fetch(ENDPOINTS.ARTICLES, {
        method: "POST",
        headers: {
            "Content-Type": "application/json",
        },
        body: JSON.stringify(article),
    });
    if (!response.ok) {
        throw new Error("Failed to create article");
    }
    const newArticle = await response.json();

    // Update localStorage
    const existingArticles = loadFromLocalStorage(LOCAL_STORAGE_KEY) || [];
    const updatedArticles = [...existingArticles, newArticle];
    saveToLocalStorage(LOCAL_STORAGE_KEY, updatedArticles);

    return newArticle;
}

// PATCH: Update article
export async function updateArticleAPI(id, updatedFields) {
    const response = await fetch(ENDPOINTS.ARTICLE_BY_ID(id), {
        method: "PATCH",
        headers: {
            "Content-Type": "application/json",
        },
        body: JSON.stringify(updatedFields),
    });
    if (!response.ok) {
        throw new Error("Failed to update article");
    }
    const updatedArticle = await response.json();

    // Update localStorage
    const articles = loadFromLocalStorage(LOCAL_STORAGE_KEY) || [];
    const updatedArticles = articles.map((a) =>
        a.id === id ? updatedArticle : a
    );
    saveToLocalStorage(LOCAL_STORAGE_KEY, updatedArticles);

    return updatedArticle;
}

// DELETE: Remove article by ID
export async function deleteArticleAPI(id) {
    const response = await fetch(ENDPOINTS.ARTICLE_BY_ID(id), {
        method: "DELETE",
    });
    if (!response.ok) {
        throw new Error("Failed to delete article");
    }

    // Update localStorage
    const articles = loadFromLocalStorage(LOCAL_STORAGE_KEY) || [];
    const updatedArticles = articles.filter((a) => a.id !== id);
    saveToLocalStorage(LOCAL_STORAGE_KEY, updatedArticles);

    return;
}