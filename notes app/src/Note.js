import React from "react";
import { Link, useNavigate, useParams } from "react-router-dom";
import ReactMarkDown  from 'react-markdown';



const Note = ({notes, setNotes})=>{

    const {id} = useParams()
    const navigate = useNavigate()
    const note = notes.find(n=>n.id===id)

    const deleteNote = (note)=>{
       setNotes(()=>{
        return notes.filter(n=>{
           return n.id !== note.id
          
        })})
        navigate("/")
    }


    return(
        <div className="noteContainer">
            <div style={{"display":"flex", "flexDirection":"row", "justifyContent":"space-between", alignContent:"flex-end"}} className="noteHeader">
                <h1>Note</h1>
                <div style={{display: 'flex', alignItems: 'center'}} className="noteHeaderButtons">
                    <button><Link to={`/${note.id}/edit`}>Edit</Link></button>
                    <button onClick={()=>deleteNote(note)}>Delete</button>
                    <button><Link to={"/"} >Back</Link></button>
                </div>
            </div>
            <div className="noteDetails">
                <div className="noteTitleandTags">
                    <input type="text" defaultValue={note.title} />
                    <div className="noteTags">
                        {note.tag.map(t=>{
                           return <div key={t.id} className="tag">{t.label}</div>
                        })}
                    </div>

                </div>
                <div className="noteBody">
                    <ReactMarkDown>{note.body}</ReactMarkDown>
                </div>
            </div>
        </div>
    )
}

export default Note;