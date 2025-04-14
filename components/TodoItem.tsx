"use client"

import { Todo } from "@/database/schema";
import { Checkbox } from "@/components/ui/checkbox";
import { toggleTodo } from "@/actions/todos";
import { useOptimistic, startTransition } from "react";
import { useActionState } from "@/lib/hooks";

export function TodoItem({ todo }: { todo: Todo }) {
    const { execute, status } = useActionState(toggleTodo);
    const [optimisticTodo, setOptimisticTodo] = useOptimistic(
        todo,
        (state: Todo) => ({ ...state, completed: !state.completed })
    );

    async function onToggle(formData: FormData) {
        startTransition(() => {
            setOptimisticTodo(todo);
        });
        await execute(formData);
    }

    return (
        <li
            key={todo.id}
            className={`flex items-center gap-2 rounded-lg border px-4 py-2`}
        >
            <form action={onToggle} data-todo-id={todo.id}>
                <input type="hidden" name="id" value={todo.id} />
                <Checkbox
                    checked={optimisticTodo.completed}
                    disabled={status === "executing"}
                    onCheckedChange={() => {
                        const form = document.querySelector(`form[data-todo-id="${todo.id}"]`) as HTMLFormElement;
                        if (form) {
                            onToggle(new FormData(form));
                        }
                    }}
                />
            </form>
            <span className={`flex-1 ${optimisticTodo.completed ? "line-through text-muted-foreground" : ""}`}>
                {optimisticTodo.title}
            </span>
        </li>
    )
}