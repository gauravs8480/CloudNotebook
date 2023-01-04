import React from 'react'
import { useContext } from 'react'
import noteContext from '../context/NoteContext'
import { AddNote } from './AddNote'
import { useEffect } from 'react'
import Noteitem from './Noteitem'
import { useRef } from 'react'
import { useState } from 'react'
import { useNavigate } from 'react-router-dom';


export const Notes = (props) => {

  const context = useContext(noteContext)
  let Navigate = useNavigate();
  const { notes, getNotes, editNote } = context;
  useEffect(() => {
    if (localStorage.getItem('token')) {

      getNotes()
    }
    else {
      Navigate("/login")
    }
    // react-hooks/exhaustive-deps
    // eslint-disable-next-line 
  }, [])






  const ref = useRef(null)
  const refClose = useRef(null)


  const [note, setnote] = useState({ id: "", etitle: "", edescription: "", etag: "" })


  const updateNote = (currentNote) => {
    ref.current.click();
    setnote({ id: currentNote._id, etitle: currentNote.title, edescription: currentNote.description, etag: currentNote.tag })

  }

  const handleClick = (e) => {

    editNote(note.id, note.etitle, note.edescription, note.etag)
    refClose.current.click();
    // props.showAlert("deleted sucessfully", "sucess")
    // Navigate("/login")

  }

  const onChange = (e) => {
    setnote({ ...note, [e.target.name]: e.target.value })
  }


  return (
    <>
      <AddNote />
      {/* showAlert={props.showAlert} */}


      <button ref={ref} type="button" className="btn btn-primary d-none" data-bs-toggle="modal" data-bs-target="#exampleModal">
        Launch demo modal
      </button>


      <div className="modal fade" id="exampleModal" tabIndex="-1" role="dialog" aria-labelledby="exampleModalLabel" aria-hidden="true">
        <div className="modal-dialog" role="document">
          <div className="modal-content">
            <div className="modal-header">
              <h5 className="modal-title" id="exampleModalLabel">Modal title</h5>
              <button type="button" className="close" data-dismiss="modal" aria-label="Close">
                <span aria-hidden="true">&times;</span>
              </button>
            </div>
            <div className="modal-body">

              <form>
                <div className="mb-3">
                  <label htmlFor="title" className="form-label">title</label>
                  <input type="text" className="form-control" id="etitle" name="etitle" value={note.etitle} aria-describedby="emailHelp" onChange={onChange} />

                </div>
                <div className="mb-3">
                  <label htmlFor="description" className="form-label">Description</label>
                  <input type="text" className="form-control" id="edescription" name="edescription" value={note.edescription} minLength={5} required onChange={onChange} />
                </div>
                <div className="mb-3">
                  <label htmlFor="tag" className="form-label">Tag</label>
                  <input type="text" className="form-control" id="etag" name="etag" value={note.etag} onChange={onChange} minLength={5} required />
                </div>

              </form>
            </div>
            <div className="modal-footer">
              <button ref={refClose} type="button" className="btn btn-secondary" data-bs-dismiss="modal">Close</button>
              <button disabled={note.etitle.length < 5 || note.edescription.length < 5} onClick={handleClick} type="button" className="btn btn-primary">Update Note</button>
            </div>
          </div>
        </div>
      </div>


      <div className=" row my-3">
        <h2> Your Notes</h2>

        <div className="container">
          {notes.length === 0 && 'No Notes to display'}
        </div>
        {notes.map((note) => {
          return <Noteitem key={note._id} updateNote={updateNote} note={note} />


        })}
      </div>
    </>
  )
}
// showAlert={props.showAlert} 