import React from "react";
import { addNote, selectNote } from "../../model";

export const NoteTools = () => {
    const handleAddNote = () => {
        selectNote({ id: "", title: "New note", content: "" });
    }

    return (<section className="note-page__tools">
        <button className="note-page__button--add" onClick={handleAddNote}>Add</button>
    </section>);
}