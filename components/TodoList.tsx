"use client"

import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { useActionState } from "@/lib/hooks"
import { useOptimistic } from "react"
import { Todo } from "@/database/schema"
import { createTodo } from "@/actions/todos"
import { TodoItem } from "./TodoItem"

export function TodoList({ todos }: { todos: Todo[] }) {
    const { execute, status, error } = useActionState(createTodo);
    const [optimisticTodos, addOptimisticTodo] = useOptimistic(
        todos,
        (state: Todo[], newTodo: { title: string }) => [
            {
                id: Math.random().toString(),
                title: newTodo.title,
                completed: false,
                createdAt: new Date(),
                updatedAt: new Date(),
                userId: todos[0]?.userId || "optimistic"
            } as Todo,
            ...state
        ]
    );

    async function onSubmit(formData: FormData) {
        const title = formData.get("title") as string;
        addOptimisticTodo({ title });
        await execute(formData);
        // Clear the form
        const form = document.querySelector("form") as HTMLFormElement;
        form.reset();
    }

    return (
        <div className="space-y-4">
            <form action={onSubmit} className="flex gap-2 items-stretch">
                <div className="flex-1">
                    <Input
                        name="title"
                        placeholder={"Add a new todo..."}
                        aria-invalid={error ? "true" : undefined}
                    />
                    {error && (
                        <p className="text-sm text-destructive mt-1">{error}</p>
                    )}
                </div>
                <Button type="submit" disabled={status === "executing"}>
                    {status === "executing" ? "Adding..." : "Add"}
                </Button>
            </form>

            <ul className="space-y-2">
                {optimisticTodos.map((todo) => (
                    <TodoItem key={todo.id} todo={todo} />
                ))}
            </ul>
        </div>
    )
} 