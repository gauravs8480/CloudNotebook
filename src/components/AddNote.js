import React from 'react'
import noteContext from '../context/NoteContext';
import { useContext } from 'react';
import { useState } from 'react';
export const AddNote = (props) => {

    const context = useContext(noteContext)
    const { addNote } = context;
    const [note, setnote] = useState({ title: "", description: "", tag: "" })

    const handleClick = (e) => {
        e.preventDefault()
        addNote(note.title, note.description);
        setnote({title: "", description: "", tag: ""});
        //  props.showAlert("Added Notes sucessfully","sucess")
    }



    const onChange = (e) => {
        setnote({ ...note, [e.target.name]: e.target.value })
    }
    return (
        <div>
            <div className="container my-3">
                <h1>Add a Note</h1>
                <form>
                    <div className="mb-3">
                        <label htmlFor="title" className="form-label">title</label>
                        <input type="text" className="form-control" id="title" name="title" aria-describedby="emailHelp" value={note.title} onChange={onChange} minLength={5} required />

                    </div>
                    <div className="mb-3">
                        <label htmlFor="description" className="form-label">Description</label>
                        <input type="text" className="form-control" id="description" name="description" value={note.description} onChange={onChange} minLength={5} required/>
                    </div>
                    <div className="mb-3">
                        <label htmlFor="tag" className="form-label">Tag</label>
                        <input type="text" className="form-control" id="tag" name="tag" value={note.tag} onChange={onChange} />
                    </div>

                    <button type="submit" className="btn btn-primary" disabled={note.title.length<5 || note.description.length<5}  onClick={handleClick}>Add Note</button>
                </form>
            </div>





        </div>
    )
}
