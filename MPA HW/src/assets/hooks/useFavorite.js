import { useEffect, useState } from "react";
import { loadFromLocalStorage, saveToLocalStorage } from "../functionalities/localStorage";

export function useFavorite(articleId) {
    const [isFavorite, setIsFavorite] = useState(false);

    useEffect(() => {
        const favorites = loadFromLocalStorage("favorites") || [];
        setIsFavorite(favorites.includes(articleId));
    }, [articleId]);

    const toggleFavorite = () => {
        const favorites = loadFromLocalStorage("favorites") || [];
        let updatedFavorites;
        if (favorites.includes(articleId)) {
            updatedFavorites = favorites.filter(id => id !== articleId);
            setIsFavorite(false);
        } else {
            updatedFavorites = [...favorites, articleId];
            setIsFavorite(true);
        }
        saveToLocalStorage("favorites", updatedFavorites);
    };

    return { isFavorite, toggleFavorite };
}