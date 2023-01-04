import React from 'react'
import NoteContext from '../context/NoteContext'
import { useContext } from 'react'

 const Noteitem = (props) => {
  const  context  = useContext(NoteContext)
  const   {deleteNote} = context;
  const   {note,updateNote} = props;
  return (
    <div className="col-md-3">
<div className="card my-3" >
  <img src="..." className="card-img-top" alt="..."/>
  <div className="card-body" >
  <h5 className="card-title">{note.title}</h5>
    <p className="card-text">{note.description}</p>
    <p className="card-text">{note.tag}</p>
    <i className="far fa-trash-alt mx-2" onClick={()=>{deleteNote(note._id); }}></i>
    {/* props.showAlert("delete sucessfully","sucess") */}
    <i className="far fa-edit mx-2" onClick={()=>{updateNote(note)}}></i> 
  </div>
</div>
    </div>
  )
}
 export default Noteitem 