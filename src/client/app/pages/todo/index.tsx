import React from "react";
import { AddTodoForm, EditTodoForm, TodoListItem } from "../components";
import { useUnit } from "effector-react/compat";
import { $activeTodoId, $todos } from "../../model";
import { TodoItem } from "../../../types";

export const TodoPage = () => {
    const todos = useUnit($todos);
    const activeTodoId = useUnit($activeTodoId)

    return (<section>
        <h2>Todo's</h2>
        {todos.length === 0 && (<h3>Empty</h3>)}
        {todos.length > 0 && (<div className="todo-list">
            {todos.map((todo: TodoItem) => (<TodoListItem key={todo.id} { ...todo } />))}
        </div>) }
        { activeTodoId ? <EditTodoForm itemId={activeTodoId} /> : <AddTodoForm />}
    </section>)
}