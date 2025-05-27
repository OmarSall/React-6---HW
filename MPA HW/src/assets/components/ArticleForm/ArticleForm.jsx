import { useState } from "react";
import styles from "./ArticleForm.module.css";

export default function ArticleForm({ initialData = {}, onSubmit, submitLabel = "Submit" }) {
    const [title, setTitle] = useState(initialData.title || "");
    const [content, setContent] = useState(initialData.content || "");
    const [error, setError] = useState("");

    const handleSubmit = async (event) => {
        event.preventDefault();
        if (title.trim() === "" || content.trim() === "") {
            setError("Title and content are required");
            return;
        }

        setError("");

        await onSubmit({ title: title.trim(), content: content.trim() });
    }

    return (
        <form className={styles.form} onSubmit={handleSubmit}>
            {error && <p className={styles.error}>{error}</p>}

            <label className={styles.label}>
                Title
                <input
                    className={styles.input}
                    type="text"
                    value={title}
                    onChange={(event) => setTitle(event.target.value)}
                />
            </label>
            <label className={styles.label}>
                Content
                <textarea
                    className={styles.input}
                    value={content}
                    onChange={(event) => setContent(event.target.value)}
                    rows={8}
                />
            </label>
            <button className={styles.button} type="submit">
                {submitLabel}
            </button>
        </form>
    );
}