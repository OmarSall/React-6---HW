export const API_BASE_URL = "http://localhost:3000";

export const ENDPOINTS = {
    ARTICLES: `${API_BASE_URL}/articles`,
    ARTICLE_BY_ID: (id) => `${API_BASE_URL}/articles/${id}`,
};