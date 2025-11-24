import { prisma } from "@/lib/prisma";
import { revalidatePath } from "next/cache";
import styles from "./page.module.css"; // Import CSS yang baru dibuat

export default async function Home() {
  const todos = await prisma.todo.findMany({
    orderBy: { createdAt: 'desc' }
  });

  async function addTodo(formData: FormData) {
    "use server";
    const title = formData.get("title") as string;
    if (!title) return;
    await prisma.todo.create({ data: { title } });
    revalidatePath("/");
  }

  async function deleteTodo(formData: FormData) {
    "use server";
    const id = formData.get("id") as string;
    await prisma.todo.delete({ where: { id: parseInt(id) } });
    revalidatePath("/");
  }

  return (
    <main className={styles.main}>
      <div className={styles.card}>
        <h1 className={styles.title}>📝 Tugas Hari Ini</h1>

        {/* Form Input */}
        <form action={addTodo} className={styles.form}>
          <input
            name="title"
            type="text"
            placeholder="Tambah tugas baru..."
            className={styles.input}
            required
            autoComplete="off"
          />
          <button type="submit" className={styles.addButton}>
            +
          </button>
        </form>

        {/* Daftar List */}
        <ul className={styles.list}>
          {todos.map((todo) => (
            <li key={todo.id} className={styles.listItem}>
              <span className={styles.todoText}>{todo.title}</span>
              <form action={deleteTodo}>
                <input type="hidden" name="id" value={todo.id} />
                <button type="submit" className={styles.deleteButton}>
                  Hapus
                </button>
              </form>
            </li>
          ))}

          {todos.length === 0 && (
            <p className={styles.emptyState}>Belum ada tugas. Yuk mulai produktif!</p>
          )}
        </ul>
      </div>
    </main>
  );
}