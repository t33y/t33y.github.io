import React, {useState} from 'react';
import ReactSelect from 'react-select';
import { Link } from 'react-router-dom';
import "./Modal.css"


const NoteList = ({NoteWithTags, DeleteNotes, tags, setTags})=>{

    const [title, setTitle] = useState("")
    const [filteredTags, setFilteredTags] = useState([])
    const [modalIsClosed, setModalIsClosed] = useState(true)

    const updateTag = (id, label)=>{
        setTags(prevTags=>{
        return prevTags.map(tag=>{
            if(tag.id === id){
                return {...tag, label}
            }else{
                return tag
            }
        })
       })   
    }
    const deleteTag = (id)=>{
        setTags(prevTags=>{
            return prevTags.filter(tag=>{
                return tag.id !== id
            })
        })
    }

    return(
        <div className="container" >

            <div className="header">
                <h1>Notes</h1>
                <div className="buttons">
                    <Link to={"/new"}  >
                    <button>Create</button>
                    </Link>
                    <button onClick={()=>setModalIsClosed(false)} >Edit Tag</button>
                    <button onClick={DeleteNotes} >Clear All Notes</button>
                </div>
            </div>
            <div style={{display:"flex", justifyContent:"space-evenly" }} className="sub_body">
                <div style={{"display":"flex", "justifyContent":"space-evenly", "padding":"10px", alignItems:"center"  }} className="title">
                    <label style={{"paddingRight":"10px"}} htmlFor="title">Title</label>
                    <input type="text" id='title' value={title} onChange={e=>setTitle(e.target.value)} />
                </div>
                <div style={{display:"flex", "justifyContent":"space-evenly", padding:"10px", alignItems:"center"  }} className="tags">
                    <label style={{"paddingRight":"10px"}} htmlFor="tags">Tags</label>
                    <ReactSelect
                        styles={{width:"200px"}}
                        isMulti
                        id='tags' 
                        options={tags.map(tag=>{
                            return{label:tag.label, value:tag.id}})} 
                        value={filteredTags.map((tag)=>{
                            return {label:tag.label, value:tag.id}})} 
                        onChange={tags=>setFilteredTags(tags.map((tag)=>{
                            return {label:tag.label, id:tag.value}}))} 
                    />
                </div>
            </div>
            
            <div className="main_body" style={{"display":"flex", "flexDirection":"column"}}>
                {(title || filteredTags.length) ? 
                    NoteWithTags.filter((note)=>{
                        return (
                            title === "" ? filteredTags.some(tag=>{
                               return note.tagIds.includes(tag.id)
                            })
                        :note.title.toLowerCase().includes(title.toLocaleLowerCase()) 
                        || filteredTags.some((tag)=>note.tagIds.includes(tag.id))
                        )
                    })
                    .map((note)=>{
                        return <Link key={note.id} to= {`/${note.id}/note`}>
                                    <div className="card" style={{"border":"2px solid black"}}>
                                        <h3>{note.title}</h3>
                                        {filteredTags.filter(tag=> note.tagIds.includes(tag.id))
                                        .map((tag)=> <h5 key={tag.id}>{tag.label}</h5>)}
                                    </div>
                            </Link> 
                    }) 
                : NoteWithTags.map((note)=>{
                    return <Link key={note.id} to= {`/${note.id}/note`}>
                        <div className="card" style={{"border":"2px solid black"}}>
                            <h3>{note.title}</h3>
                            {note.tag.map((tag)=> <h5 key={tag.id}>{tag.label}</h5>)}
                        </div>
                    </Link> 
                })              
                }
                <div className="modal_container" style={{"border":"solid black 2px"}} >
                    <div className= {`overlay ${modalIsClosed? "inactive":""}`} style={{"width":"100%", "position":"absolute", top:"0px", "zIndex":10}} ></div>
                    <div className= {`modal ${modalIsClosed? "inactive":""}`} style={{"width":"37%", display:"flex", flexDirection:"column", justifyContent:"space-between", position:"absolute", top:'0px', backgroundColor:"whitesmoke", zIndex:10 }}>
                        <h1 style={{"display":"flex", alignItems:"center", "justifyContent":"end"}}>Edit tags <button style={{"width":"40%", textAlign:"end", border:"none",  backgroundColor:"transparent", fontSize:"50px"  }} onClick={()=>setModalIsClosed(true) }> &times;</button></h1>
                        {tags.map((tag)=>{
                            return <div style={{"display":"flex", "flexDirection":"row", padding:"10px", justifyContent:"space-evenly"}} key={tag.id} >
                            <input type="text" value={tag.label} onChange ={(e)=>updateTag(tag.id, e.target.value)} />
                            <button onClick={()=>deleteTag(tag.id)}>&times;</button>
                            </div>
                     })}
                    </div>
                </div>
            </div>
            
        </div>
    )
}

export default NoteList