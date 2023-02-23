import React from "react";
import NoteForm from './NoteForm';

const Newnote = ({onSubmit, onAddTag, tags})=>{
    return(
        <div>
            <h1>
            New note
            </h1>
            <NoteForm onSubmit={onSubmit} onAddTag={onAddTag} tags={tags}/>
        </div>
    )
}

export default Newnote;