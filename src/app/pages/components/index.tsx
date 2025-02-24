import React, { ChangeEvent, FormEvent, useCallback, useEffect, useState } from "react";
import "./style.css";
import { $isAuthorized, $todos, addTodo, deleteTodo, editTodo, selectTodo } from "../../model";
import { TodoItem } from "../../../types";
import { useUnit } from "effector-react";
import { Navigate, Outlet } from "react-router-dom";

export const AddTodoForm = () => {
    const [title, setTitle] = useState("");
    const [description, setDescription] = useState("");
    const [disabled, setDisabled] = useState(true);
    const handleTitleChange = (ev: ChangeEvent<HTMLInputElement>) => {
        setTitle(ev.target.value);
    };
    const handleDescriptionChange = (ev: ChangeEvent<HTMLTextAreaElement>) => {
        setDescription(ev.target.value);
    };
    const handleSubmit = (ev: FormEvent) => {
        ev.preventDefault();
        addTodo({ title, description });
        setTitle("");
        setDescription("");
    }

    useEffect(() => {
        setDisabled(!description || !title);
    }, [title, description]);

    return (<form className="form form--size-m" onSubmit={ handleSubmit }>
        <div className="form__field">
            <label className="field__title">Title</label>
            <input value={ title } onChange={ handleTitleChange } className="field__value" type="text" name="title"
                   required/>
        </div>
        <div className="form__field">
            <label>Description</label>
            <textarea value={ description } onChange={ handleDescriptionChange } name="description" required/>
        </div>
        <button disabled={ disabled } type="submit">Add</button>
    </form>);
};

export const EditTodoForm = ({ itemId }: { itemId: string }) => {
    const todos = useUnit($todos);
    const [title, setTitle] = useState("");
    const [description, setDescription] = useState("");
    const [id, setId] = useState("");
    const handleTitleChange = (ev: ChangeEvent<HTMLInputElement>) => {
        setTitle(ev.target.value);
    };
    const handleDescriptionChange = (ev: ChangeEvent<HTMLTextAreaElement>) => {
        setDescription(ev.target.value);
    };
    const handleCancel = (ev: FormEvent) => {
        ev.preventDefault();
        selectTodo(null);
        setTitle("");
        setDescription("");
    };
    const handleSubmit = (ev: FormEvent) => {
        ev.preventDefault();
        editTodo({ id, title, description });
        selectTodo(null);
    }

    useEffect(() => {
        const item = todos.find(({ id }) => itemId === id);
        if (!item) {
            throw new Error(`Item with id = ${ itemId } not found`);
            return;
        } else {
            setTitle(item.title);
            setDescription(item.description);
            setId(item.id);
        }
    }, [itemId]);

    return (<form className="form form--size-m" onSubmit={ handleSubmit }>
        <div className="form__field">
            <label className="field__title">Title</label>
            <input value={ title } onChange={ handleTitleChange } className="field__value" type="text" name="title"
                   required/>
        </div>
        <div className="form__field">
            <label>Description</label>
            <textarea value={ description } onChange={ handleDescriptionChange } name="description" required/>
        </div>
        <button onClick={handleSubmit}>Save</button>
        <button onClick={handleCancel}>Cancel</button>
    </form>);
}

export const TodoListItem = ({ title, description, id, completed }: TodoItem) => {
    const handleDeleteClick = () => deleteTodo(id);
    const handleEditClick = () => selectTodo(id)
    const handleCheck = useCallback(() => {
        editTodo({
            id,
            completed: !completed,
        });
    }, [id, completed]);

    return (<div className={ `todo-list__item${ completed ? " todo-list__item--completed" : "" }` }>
        <input type="checkbox" checked={ completed } onClick={ handleCheck }/>
        <span className="todo-item__title">{ title }</span>
        <button onClick={ handleDeleteClick }>delete</button>
        <button onClick={ handleEditClick }>edit</button>
    </div>);
}

export const ProtectedRoute = () => {
    const isAuthorized = useUnit($isAuthorized);

    return isAuthorized ? <Outlet /> : <Navigate to="/login" />;
};