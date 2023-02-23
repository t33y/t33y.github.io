import React, {useEffect} from 'react';
import {v4 as uuidv4} from 'uuid'

const Form = ({todo, setTodo, input, setInput, editTodo, setEditTodo}) => {
    const updateTodo = (editedTitle, editedTodo)=>{
        setTodo(todo.map((todos)=>
             todos.id === editTodo.id? {id: todos.id, title: editedTitle, completed: editTodo.completed}:todos
        ))
        setEditTodo('')
        setInput('')
    }

    useEffect(()=>{
        if(editTodo){
            setInput(editTodo.title)
        }else{setInput("")}
    }, [setInput, editTodo])

    const handleInputChange = (event) => {
        setInput(event.target.value)
    }

    const handleFormSubmit = (event) => {
        if(!editTodo && input){
            setTodo([...todo, {id: uuidv4(), title: input, completed: false }])
            setInput('')
        }else{updateTodo(input, editTodo)}
    }

  return (
    <form onSubmit={(event) => handleFormSubmit(event)}>
        <input type="text" className="taskinput" placeholder='Enter Todo...' value={input} onChange={(event) => handleInputChange(event)} />
        <button className='addbutton' type='submit'>{editTodo? 'OK':'Add'}</button>
    </form>
  )
}

export default Form