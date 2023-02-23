import React from "react";
import NoteForm from './NoteForm';
import { useParams } from 'react-router-dom';

const Editnote = ({onSubmit, onAddTag, tags, notes})=>{
    const {id} = useParams()
    
    const noteToEdit = notes.find(n=>n.id===id)
    // const tagsToEdit = tags.map(tag=> noteToEdit.tagIds.includes(tag.id))
    
    return(
        <div>
            <h1>
            Edit note
            </h1>
            <NoteForm onSubmit={onSubmit} onAddTag={onAddTag} tags={tags} noteToEdit={noteToEdit}/>
        </div>
    )
}

export default Editnote;