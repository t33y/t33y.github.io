import React, {useState, useEffect} from 'react';
import './App.css';
import Form from './Form';
import { Todolist } from './Todolist';


const App = () => {
  const initialState = JSON.parse(localStorage.getItem('stodo')) || []

  const [todo, setTodo] = useState(initialState)
  const [input, setInput] = useState(null)
  const [editTodo, setEditTodo] = useState("")
  

  useEffect(()=>{
    localStorage.setItem('stodo', JSON.stringify(todo))
  }, [todo])

  return (
    <div className="container">
      <div className="App-wrapper">
        <h1 className='header'> Tayo's Todo</h1>
        <Form todo={todo} setTodo={setTodo} input={input} setInput={setInput} editTodo={editTodo} setEditTodo={setEditTodo} />
        <Todolist todo={todo} setTodo={setTodo} input={input} setInput={setInput} editTodo={editTodo} setEditTodo={setEditTodo} />
      </div>
    </div>
  )
}


export default App;
