import { createEvent, createStore } from "effector";
import { TodoItem } from "../../types";

export const $activeTodoId = createStore<TodoItem["id"] | null>(null);
export const selectTodo = createEvent<TodoItem["id"] | null>();
export const $todos = createStore<Array<TodoItem>>([
    {
        completed: false,
        id: crypto.randomUUID(),
        title: "First todo",
        description: "Description"
    },
    {
        completed: true,
        id: crypto.randomUUID(),
        title: "Second todo",
        description: "Description"
    }
]);
export const addTodo = createEvent<Omit<TodoItem, "id" | "completed">>();
export const deleteTodo = createEvent<TodoItem["id"]>();
export const editTodo = createEvent<Partial<TodoItem>>();

$todos
    .on(addTodo, (prev, { title, description }) => {
        return [...prev, {
            id: crypto.randomUUID() as string,
            title,
            description,
            completed: false
        } as TodoItem]
    })
    .on(deleteTodo, (prev, todoId) => {
        return prev.filter(({ id }) => todoId !== id);
    })
    .on(editTodo, (prev, payload) => {
        if (!payload.id) return prev;

        return prev.map((item) => {
            if (payload.id === item.id) {
                return ({
                    ...item,
                    ...payload
                })
            } else return item;
        });
    });

$activeTodoId.on(selectTodo, (prev, id) => id);
export const $notes = createStore([]);