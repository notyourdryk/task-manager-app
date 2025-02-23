import React, { useCallback, useEffect, useState } from "react";
import "./style.css"
import { $notes, addNote, deleteNote, editNote, selectNote } from "../../model";
import { useUnit } from "effector-react";
import { NoteItem } from "../../../types";

export const NoteEditor = ({ title, id, content }: Partial<NoteItem>) => {
    const notes = useUnit($notes);
    const [noteTitle, setNoteTitle] = useState("");
    const [noteContent, setNoteContent] = useState("");

    useEffect(() => {
        setNoteTitle(title || "");
        setNoteContent(content || "");
    }, [id, notes]);

    const handleCancel = () => {
        selectNote(null);
    };
    const handleSave = () => {
        if (!id) {
            addNote({ id: "", title: noteTitle, content: noteContent });
        } else {
            editNote({
                id,
                title: noteTitle,
                content: noteContent
            });
        }
        selectNote(null);
        setNoteTitle("");
        setNoteContent("");
    }

    return (
        <>
            <div className="note-page__buttons">
                <button onClick={handleSave}>Save</button>
                <button onClick={handleCancel}>Cancel</button>
            </div>
            <form className="note-page__workspace">
                <input value={noteTitle} onChange={ev => setNoteTitle(ev.target.value)} type="text" className="workspsce__title"/>
                <textarea value={noteContent} onChange={ev => setNoteContent(ev.target.value)} className="workspace__content" />
            </form>
        </>
    );
}