import { createEffect, createEvent, createStore, sample } from "effector";
import { AuthorizationParams, NoteItem, TodoItem } from "../../types";
import { getNotes, getTodos } from "../../db";
import * as db from "../../db";
import * as api from "../../api";

export const $isAuthorized = createStore(false);
export const authorizeUser = createEvent<AuthorizationParams>();
export const authorizeUserFx = createEffect(api.authorization);

sample({
    source: $isAuthorized,
    clock: authorizeUser,
    fn: (_, { username, password }: { username: string, password: string }) => ({
        username, password
    }),
    target: authorizeUserFx
});

$isAuthorized.on(authorizeUserFx.doneData, (_, payload) => payload);

export const $activeTodoId = createStore<TodoItem["id"] | null>(null);
export const selectTodo = createEvent<TodoItem["id"] | null>();
export const $todos = createStore<Array<TodoItem>>([]);
export const addTodo = createEvent<Omit<TodoItem, "id" | "completed">>();
export const deleteTodo = createEvent<TodoItem["id"]>();
export const editTodo = createEvent<Partial<TodoItem>>();

export const fetchTodosEx = createEffect(getTodos);
export const addTodoFx = createEffect(db.addTodo);
export const deleteTodoFx = createEffect(db.deleteTodo);
export const editTodoFx = createEffect(db.editTodo);

sample({
    source: $todos,
    clock: addTodo,
    fn: (_, { title, description }) => ({
        id: crypto.randomUUID() as string,
        title,
        description,
        completed: false
    }),
    target: addTodoFx
});

sample({
    source: $todos,
    clock: deleteTodo,
    fn: (_, todoId) => todoId,
    target: deleteTodoFx
});

sample({
    source: $todos,
    clock: editTodo,
    fn: (todos, item: Partial<TodoItem>) => {
        const targetItem = todos.find(({ id }) => item.id === id);
        if (!targetItem)
            throw new Error(`Item not found: ${item.id}`);
        return ({
            ...targetItem,
            ...item
        });
    },
    target: editTodoFx
})
$todos
    .on(fetchTodosEx.doneData, (_, payload) => payload)
    .on(addTodoFx.doneData, (prev, newTodo) => {
        return [...prev, newTodo as TodoItem];
    })
    .on(deleteTodoFx.doneData, (prev, todoId) => {
        return prev.filter(({ id }) => todoId !== id);
    })
    .on(editTodoFx.doneData, (prev, payload) => {
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
export const $activeNote = createStore<Partial<NoteItem> | null>(null);

export const addNote = createEvent<Omit<NoteItem, "createdAt" | "updatedAt">>();
export const deleteNote = createEvent<NoteItem["id"]>();
export const editNote = createEvent<Omit<NoteItem, "createdAt" | "updatedAt">>();
export const selectNote = createEvent<Partial<NoteItem> | null>();

export const fetchNotesEx = createEffect(getNotes);
export const addNoteFx = createEffect(db.addNote);
export const deleteNoteFx = createEffect(db.deleteNote);
export const editNoteFx = createEffect(db.editNote);

sample({
    source: $notes,
    clock: addNote,
    fn: (_, newNote) => ({
        ...newNote,
        id: newNote.id || crypto.randomUUID() as string,
        createdAt: Date.now(),
        updatedAt: Date.now()
    }),
    target: addNoteFx
});
sample({
    source: $notes,
    clock: deleteNote,
    fn: (_, noteId) => noteId,
    target: deleteNoteFx
});
sample({
    source: $notes,
    clock: editNote,
    fn: (notes, note) => {
        const targetNote = notes.find(({ id }) => note.id === id);
        if (!targetNote)
            throw new Error(`Note with id = [${note.id}] not found`);

        return ({
            ...targetNote,
            ...note,
            updatedAt: Date.now()
        })
    },
    target: editNoteFx
});
$notes
    .on(addNoteFx.doneData, (prev, note) => ([...prev, note]))
    .on(deleteNoteFx.doneData, (prev, payload) => prev.filter(({ id }) => id !== payload))
    .on(editNoteFx.doneData, (prev, payload) => {
        return prev.map((note) => {
            if (note.id === payload.id) return payload
            else return note;
        });
    });

$activeNote
    .on(selectNote, (_, payload) => payload);