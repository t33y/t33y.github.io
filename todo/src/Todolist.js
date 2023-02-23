import React from 'react'


export const Todolist = ({todo, setTodo, input, setInput, editTodo, setEditTodo}) => {
    const handleDelete = ({id}) => {
    setTodo(todo.filter((todos)=> todos.id !== id))
    }
    const handleComplete = (todos) => {
        setTodo(todo.map((item)=>{
            if(item.id===todos.id){item.completed=!item.completed}
            return item
        }))
    }
    const handleEdit = (todos) => {
        setEditTodo(todos)
    }
  return (
    <div>{todo.map((todos) => {return (
        <li key={todos.id} className='list-item' >
            <input className={`list ${todos.completed? 'complete':''}`} type="text" value={todos.title} onChange={(event)=>event.preventDefault} /> 
            <button className={'button-complete task-button'}onClick={()=>handleComplete(todos)}><i className='fa fa-check-circle' /></button> 
            <button className='button-edit task-button' onClick={()=>handleEdit(todos)}><i className='fa fa-edit' /></button> 
            <button className='button-delete task-button' onClick={()=>handleDelete(todos)}><i className='fa fa-trash'/></button> 
        </li> )}) }
    </div>
  )
}
