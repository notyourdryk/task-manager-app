import { createEvent, createStore } from "effector";
import { NoteItem, TodoItem } from "../../types";

export const $activeTodoId = createStore<TodoItem["id"] | null>(null);
export const selectTodo = createEvent<TodoItem["id"] | null>();
export const $todos = createStore<Array<TodoItem>>([]);
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

$activeTodoId.on(selectTodo, (_, id) => id);

export const $notes = createStore<Array<NoteItem>>([]);

export const addNote = createEvent<Omit<NoteItem, "createdAt" | "updatedAt">>();
export const deleteNote = createEvent<NoteItem["id"]>();
export const editNote = createEvent<Omit<NoteItem, "createdAt" | "updatedAt">>();

export const $activeNote = createStore<Partial<NoteItem> | null>(null);

export const selectNote = createEvent<Partial<NoteItem> | null>();

$notes
    .on(addNote, (prev, note) => {
        const newNote = {
            ...note,
            id: note.id || crypto.randomUUID() as string,
            createdAt: Date.now(),
            updatedAt: Date.now()
        }

        return [...prev, newNote];
    })
    .on(deleteNote, (prev, payload) => {
        return prev.filter(({ id }) => id !== payload);
    })
    .on(editNote, (prev, payload) => {
        return prev.map((note) => {
            if (note.id === payload.id) {
                return ({
                    ...note,
                    ...payload
                });
            } else return note;
        });
    });

$activeNote
    .on(selectNote, (_, payload) => payload);