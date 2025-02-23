import React from "react";
import { useUnit } from "effector-react";
import { $notes, $todos } from "../../model";
import { AddTodoForm } from "../components";

export const MainPage = () => {
    const todos = useUnit($todos);
    const notes = useUnit($notes);

    return (<section>
        <h2>Main</h2>
        <hr/>
        <h3>Todo</h3>
        <span>Amount: {todos.length}</span>
        <hr/>
        <h3>Notes</h3>
        <span>Amount: {notes.length}</span>
    </section>)
}