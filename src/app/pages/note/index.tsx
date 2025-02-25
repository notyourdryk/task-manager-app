import React from "react";
import "./style.css";
import { NoteEditor } from "./note-editor";
import { useUnit } from "effector-react";
import { $activeNote, $notes } from "../../model";
import { NoteListItem } from "./note-item";
import { NoteTools } from "./note-tools";

export const NotePage = () => {
    const notes = useUnit($notes);
    const activeNote = useUnit($activeNote);

    return (<section className="page">
        <h2>Note's</h2>
        {!activeNote && <NoteTools /> }
        {!activeNote && <div className="note-item__list">
            {!activeNote && notes.map(note => <NoteListItem key={note.id} {...note} />)}
        </div>}
        {activeNote && <NoteEditor {...activeNote} />}
    </section>);
};