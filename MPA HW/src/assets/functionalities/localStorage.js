export function saveToLocalStorage(key, value) {
    try {
        localStorage.setItem(key, JSON.stringify(value));
    } catch (error) {
        console.error(`Error saving "${key}" to localStorage:`, error);
    }
}

export function loadFromLocalStorage(key) {
    try {
        const data = localStorage.getItem(key);
        return data ? JSON.parse(data) : undefined;
    } catch (error) {
        console.error(`Error loading "${key}" from localStorage:`, error);
        return undefined;
    }
}