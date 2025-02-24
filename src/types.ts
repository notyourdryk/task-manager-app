export type AuthorizationParams = {
    username: string;
    password: string;
}

export type TodoItem = {
    title: string;
    description: string;
    completed: boolean;
    id: string
}

export type NoteItem = {
    id: string;
    title: string;
    content: string;
    createdAt: number;
    updatedAt: number;
}