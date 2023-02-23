import React, { useMemo } from 'react';
import { Navigate, Route, Routes } from 'react-router-dom';
import './App.css';
import Newnote from './Newnote';
import { UseLocalStorage } from './UseLocalStorage';
import { v4 as uuidv4 } from 'uuid';
import NoteList from './NoteList';
import Note from './Note';
import Editnote from './Editnote';



function App() {
  const [notes, setNotes] = UseLocalStorage("NOTES", []);
  const [tags, setTags] = UseLocalStorage("TAGS", []);


  const NoteWithTags = useMemo(()=>{
      return notes.map((note)=>{
        console.log(note, "memo")
        return{...note, tag:tags.filter((tag)=>{
          return note.tagIds.includes(tag.id)
        }) }
      })
    }, [tags, notes])


  const onCreateNote = ({tags, ...data})=>{
    console.log('truely verily')
    setNotes((prev)=>[...prev, {...data, id: uuidv4(), tagIds: tags.map((tag)=> {return tag.id})}])
  }
  
  const onUpdateNote = ({tags, id, ...data})=>{

    setNotes((prev)=>{
      return prev.map(prevNote=>{
        if(prevNote.id===id){
          return {...prevNote, ...data, tagIds:tags.map(tag=>tag.id)}
        }else{
          return prevNote
        }
      })
    })
  }

  const DeleteNotes = ()=>{
    localStorage.clear()
    window.location.reload()
   
  }

  const onAddTag = (tag)=>{
    setTags(prev=>[...prev, tag])
  }

  return (
    <div className="App">

      <Routes>
        <Route path='/' element={<NoteList NoteWithTags={NoteWithTags} DeleteNotes={DeleteNotes} tags={tags} setTags={setTags} />}/>
        <Route path='/new' element={<Newnote onSubmit={onCreateNote} onAddTag={onAddTag} tags={tags} />}/>
        <Route path='*' element={<Navigate to={'/'} />}/>
        <Route path='/:id' >
          <Route path='show' element={<h1>Show</h1>} />
          <Route path='note' element={<Note notes={NoteWithTags} setNotes={setNotes}/>}/>
          <Route path='edit' element={<Editnote onSubmit={onUpdateNote} onAddTag={onAddTag} tags={tags} notes={NoteWithTags}/>} />
        </Route>
      </Routes>
    </div>
  );
}

export default App;
