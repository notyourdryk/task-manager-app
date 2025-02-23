import React from "react";
import { deleteNote, selectNote } from "../../model";
import { NoteItem } from "../../../types";

export const NoteListItem = (item: NoteItem) => {
    const { id, title, createdAt, updatedAt } = item;
    const handleEditClick = () => selectNote(item);
    const handleDeleteClick = () => deleteNote(id);

    return (<div className="note-item">
        <button onClick={handleEditClick}>Edit</button>
        <button onClick={handleDeleteClick}>Delete</button>
        <div className="note-item__title">
            {title}
        </div>
        <div className="note-item__dates">
            <div>{createdAt}</div>
            <div>{updatedAt}</div>
        </div>
    </div>)
}