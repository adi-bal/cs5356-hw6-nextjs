"use server"

import { eq } from "drizzle-orm"
import { headers } from "next/headers"
import { revalidatePath } from "next/cache"

import { auth } from "@/lib/auth"
import { db } from "@/database/db"
import { todos, users } from "@/database/schema"
import { isAdmin } from "@/lib/role-check"

export async function createTodo(formData: FormData) {
    const session = await auth.api.getSession({ headers: await headers() });
    if (!session?.user) {
        throw new Error("Not authenticated");
    }

    const title = formData.get("title") as string;
    if (!title || title.trim() === "") {
        throw new Error("Title cannot be empty");
    }

    // Add artificial delay for development
    await new Promise(resolve => setTimeout(resolve, 1000));

    console.log('Creating todo for user:', session.user);

    await db.insert(todos)
        .values({
            title: title.trim(),
            userId: session.user.id
        });

    revalidatePath("/todos");
}

export async function toggleTodo(formData: FormData) {
    const session = await auth.api.getSession({ headers: await headers() });
    if (!session?.user) {
        throw new Error("Not authenticated");
    }

    const id = formData.get("id") as string;
    console.log('Toggling todo with id:', id);
    
    // Get the todo and ensure it belongs to the current user
    const [todo] = await db
        .select()
        .from(todos)
        .where(eq(todos.id, id));

    console.log('Session user:', session.user);
    console.log('Todo:', todo);

    // Only allow the todo owner to toggle it
    if (!todo || todo.userId !== session.user.id) {
        throw new Error("Not authorized to toggle this todo");
    }

    // Add artificial delay for development
    await new Promise(resolve => setTimeout(resolve, 1000));

    await db
        .update(todos)
        .set({ completed: !todo.completed })
        .where(eq(todos.id, id));

    revalidatePath("/todos");
}

export async function deleteTodo(formData: FormData) {
    const session = await auth.api.getSession({ headers: await headers() });
    if (!session?.user) {
        throw new Error("Not authenticated");
    }

    // Check if user is admin
    const isUserAdmin = await isAdmin(session.user.id);
    if (!isUserAdmin) {
        throw new Error("Not authorized");
    }

    const id = formData.get("id") as string;
    await db.delete(todos)
        .where(eq(todos.id, id));

    revalidatePath("/admin");
}
