import React, { useRef, useState } from "react";
import CreatableReactSelect from "react-select/creatable"
import {v4 as uuidv4} from "uuid"
import { useNavigate } from 'react-router-dom';

const NoteForm = ({onSubmit, onAddTag, tags, noteToEdit})=>{
    const [selectedTags, setSelectedTags] = useState(noteToEdit? tags
        .filter(tag=>noteToEdit.tagIds.includes(tag.id))
        .map(t=> {
            return{label:t.label, value:t.id}
        }   
        ):[] )

    
    const titleRef = useRef(null)
    const bodyRef = useRef(null)
    const reactSelectRef = useRef("strat")
    const Navigate = useNavigate()

    console.log(selectedTags)
    const handleSubmit = (e)=>{
        e.preventDefault()

        onSubmit({
            title: titleRef.current.value,
            body: bodyRef.current.value,
            tags: selectedTags
        })

        Navigate("/")
    }


    return(
        <div className="container">
            <form onSubmit={handleSubmit}>
                <div className="container_title_tags" >
                    <div className="title">
                        <label htmlFor="title">Title</label>
                        <input ref={titleRef} type="text" id="title" name="title" defaultValue={noteToEdit? noteToEdit.title:""} />
                    </div>

                    <div className="tag">
                        <label htmlFor="tags">Tags</label>
                        <CreatableReactSelect
                            ref={reactSelectRef}
                            isMulti
                            onCreateOption={label=>{
                                const newTag = {label, id:uuidv4()}
                                onAddTag(newTag)
                                setSelectedTags(prev=>[...prev, newTag])
                            }} 
                            options={tags.map(tag=>{return{label:tag.label, value:tag.id}})}
                            value={selectedTags.map((tag)=>{
                                return {label:tag.label, value:tag.id}})}
                            // defaultValue={tags
                            //     .filter(tag=>noteToEdit.tagIds.includes(tag.id))
                            //     .map(t=> {
                            //         return{label:t.label, value:t.id}
                            //     }   
                            //     )
                            // }
                                onChange={tags=>{
                                    setSelectedTags(tags.map((tag)=>{return {label:tag.label, id:tag.value}}))
                            }} />

                    </div>
                </div>
                <div className="container_body">
                    <textarea ref={bodyRef} type="textarea" cols="50" rows="10" defaultValue={noteToEdit? noteToEdit.body:""} />
                </div>
                <div className="container_buttons">
                    <button>Cancel</button>
                    <input type={"submit"}  />
                     </div>
            </form>
        </div>
    )
}

export default NoteForm;