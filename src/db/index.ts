import { NoteItem, TodoItem } from "../types";

const dbName = "task-manager-db";
const todoStore = "todos";
const noteStore = "notes";
const dbVersion = 1;

function openDB(): Promise<IDBDatabase> {
    const dbOpenRequest = indexedDB.open(dbName, dbVersion);

    dbOpenRequest.onupgradeneeded = () => {
        const db = dbOpenRequest.result;

        db.createObjectStore(todoStore, { keyPath: "id" });
        db.createObjectStore(noteStore, { keyPath: "id" });
    };

    return (new Promise((res, rej) => {
        dbOpenRequest.onsuccess = () => {
            res(dbOpenRequest.result);
        };

        dbOpenRequest.onerror = () => {
            // error popup
            console.error("Error on open indexed db");
            rej(dbOpenRequest.error);
        }
    }));
}

async function getStore(storeName: string, permission: IDBTransactionMode): Promise<IDBObjectStore> {
    const db = await openDB();

    return  db.transaction(storeName, permission).objectStore(storeName);
}

export async function addTodo(todo: TodoItem): Promise<TodoItem> {
    const store = await getStore(todoStore, "readwrite");
    const req = store.add(todo);

    return new Promise((res, rej) => {
        req.onsuccess = () => res(todo);
        req.onerror = () => rej(req.error);
    })
}

export async function deleteTodo(todoId: TodoItem["id"]): Promise<TodoItem["id"]> {
    const store = await getStore(todoStore, "readwrite")
    const req = store.delete(todoId);

    return new Promise((res, rej) => {
        req.onsuccess = () => res(todoId);
        req.onerror = () => rej(req.error);
    });
}

export async function editTodo(todo: TodoItem): Promise<TodoItem> {
    const store = await getStore(todoStore, "readwrite");
    const req = store.put(todo);

    return new Promise((res, rej) => {
        req.onsuccess = () => res(todo);
        req.onerror = () => rej(req.error);
    });
}

export async function getTodos(): Promise<Array<TodoItem>> {
    const store = await getStore(todoStore, "readonly")
    const req = store.getAll();

    return new Promise((res, rej) => {
        req.onsuccess = () => res(req.result);
        req.onerror = () => rej(req.error);
    });
}


export async function addNote(note: NoteItem): Promise<NoteItem> {
    const store = await getStore(noteStore, "readwrite");
    const req = store.add(note);

    return new Promise((res, rej) => {
        req.onsuccess = () => res(note);
        req.onerror = () => rej(req.error);
    })
}

export async function deleteNote(noteId: NoteItem["id"]): Promise<NoteItem["id"]> {
    const store = await getStore(noteStore, "readwrite")
    const req = store.delete(noteId);

    return new Promise((res, rej) => {
        req.onsuccess = () => res(noteId);
        req.onerror = () => rej(req.error);
    });
}

export async function editNote(note: NoteItem): Promise<NoteItem> {
    const store = await getStore(noteStore, "readwrite");
    const req = store.put(note);

    return new Promise((res, rej) => {
        req.onsuccess = () => res(note);
        req.onerror = () => rej(req.error);
    });
}


export async function getNotes(): Promise<Array<NoteItem>> {
    const store = await getStore(noteStore, "readonly")
    const req = store.getAll();

    return new Promise((res, rej) => {
        req.onsuccess = () => res(req.result);
        req.onerror = () => rej(req.error);
    })
}