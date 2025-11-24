"use client";

import { useState } from "react";
import styles from "./page.module.css";

// Hapus "createdAt: Date" dari sini agar tidak error serialization
type Todo = {
    id: number;
    title: string;
    completed: boolean;
};

type Props = {
    todo: Todo;
    deleteTodo: (formData: FormData) => void;
    updateTodo: (formData: FormData) => void;
};

export default function TodoItem({ todo, deleteTodo, updateTodo }: Props) {
    const [isEditing, setIsEditing] = useState(false);

    const handleSave = async (formData: FormData) => {
        await updateTodo(formData);
        setIsEditing(false);
    };

    if (isEditing) {
        return (
            <li className={styles.listItem}>
                <form action={handleSave} className={styles.editForm}>
                    <input type="hidden" name="id" value={todo.id} />
                    <input
                        name="title"
                        type="text"
                        defaultValue={todo.title}
                        className={styles.editInput}
                        autoFocus
                    />
                    <div className={styles.actionButtons}>
                        <button type="submit" className={styles.saveButton}>Simpan</button>
                        <button type="button" onClick={() => setIsEditing(false)} className={styles.cancelButton}>Batal</button>
                    </div>
                </form>
            </li>
        );
    }

    return (
        <li className={styles.listItem}>
            <span className={styles.todoText}>{todo.title}</span>
            <div className={styles.actionButtons}>
                <button onClick={() => setIsEditing(true)} className={styles.editButton}>Edit</button>
                <form action={deleteTodo}>
                    <input type="hidden" name="id" value={todo.id} />
                    <button type="submit" className={styles.deleteButton}>Hapus</button>
                </form>
            </div>
        </li>
    );
}