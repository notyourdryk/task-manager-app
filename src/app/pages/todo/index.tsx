import React, { useState } from "react";
import { AddTodoForm, EditTodoForm, TodoListItem } from "../components";
import { useUnit } from "effector-react/compat";
import { $activeTodoId, $todos } from "../../model";
import { TodoItem } from "../../../types";

import "./style.css";

export const TodoPage = () => {
    const todos = useUnit($todos);
    const activeTodoId = useUnit($activeTodoId);
    const [todoFormVisible, showTodoForm] = useState(false);
    const handleShowTodo = () => {
        showTodoForm(true);
    };
    const handleHideTodo = () => {
        showTodoForm(false);
    };

    return (<section>
        <h2>Todo's</h2>
        {todos.length > 0 && (<div className="todo-list">
            {todos.map((todo: TodoItem) => (<TodoListItem key={todo.id} { ...todo } />))}
        </div>) }
        { activeTodoId && <EditTodoForm itemId={activeTodoId} /> }
        { todoFormVisible && <AddTodoForm onCancel={handleHideTodo} /> }
        { !todoFormVisible && <button className="todo-page__button--add" onClick={handleShowTodo}>Add</button>}
    </section>)
}