import React,{useState, useEffect} from 'react'
import { useDispatch } from 'react-redux';
import { fetchTodo, addTodo, handleEditSubmit } from '../redux/todoapp/actions';
import './form.css';
import {initialState} from '../redux/todoapp/reducers/operations';

export const Form = ({editFormVisibility, editTodo, cancelUpdate}) => {

    // todo value state for normal add todo form
    const [todoValue, setTodoValue]=useState([]);

    // state for if someone changes the (to edit) value in update form
    const [editValue, setEditValue]=useState(todoValue);

const fetchInfo = () => { 
return fetch('https://dummyjson.com/todos') 
        .then((res) => res.json())
        .then(res=>{
          const fetchState = res.todos.map(item => {
            return {
              id: item.id, 
              title: item.todo, 
              description: item.todo, 
              date: "",
              priority: "Low",
            }
          })
          setTodoValue(fetchState);
          dispatch(fetchTodo(fetchState));
})
}
console.log(todoValue,"TODOO");
useEffect(() => {
	fetchInfo();
}, [])

  const dispatch = useDispatch();
  // let storageTodoList = JSON.parse(localStorage.getItem("todoList"));
  // if(storageTodoList && storageTodoList.length){
  //   initialState = storageTodoList;
  // }

  // useEffect is to show the (to edit) value in update form
  useEffect(()=>{
    setEditValue(editTodo);
  },[editTodo])

  // normal add todo submit
  const handleSubmit=(e)=>{
      e.preventDefault();
      let date = new Date();
      let time = date.getTime();
      setTodoValue({title:"",description:"",date:"",priority:""});
      dispatch(addTodo(todoValue));
  }

  // update form submit
  const editSubmit = (e) =>{
    e.preventDefault();
    console.log(editValue,"edited");
    dispatch(handleEditSubmit(editValue))
    cancelUpdate();
    setTodoValue({title:"",description:"",date:"",priority:""});
  }

  return (
    <>
      {editFormVisibility===false?(
        <form onSubmit={handleSubmit}>
          <label>Add ToDo Items Here</label>
          <div className='create-area'>
              <input type="text" className='input' placeholder='Title' required
              value={todoValue.title} onChange={(e) => setTodoValue({...todoValue,title:e.target.value})}/>
              <input type="text" className='input' placeholder='Description'
              value={todoValue.description} onChange={(e) => setTodoValue({...todoValue,description:e.target.value})}/>
            <input type="date" className='input' placeholder='date'
              value={todoValue.date} onChange={(e) => setTodoValue({...todoValue,date:e.target.value})} />
            <select value={todoValue.priority} className='select-input' placeholder='priority' onChange={(e) => setTodoValue({...todoValue,priority:e.target.value})}>
              <option></option>
              <option>High</option>
              <option>Low</option>
            </select>
              <button type="submit">ADD</button>
          </div>
        </form>
      ):(
        <form onSubmit={editSubmit}>
            <label>Update ToDo Items Here</label>
          <div className='create-area'>
              <input type="text" className='input' placeholder='Title' required
              value={editValue.title} onChange={(e) => setEditValue({...editValue,title:e.target.value})}/>
              <input type="text" className='input' placeholder='Description'
              value={editValue.description} onChange={(e) => setEditValue({...editValue,description:e.target.value})}/>
            <input type="date" className='input' placeholder='date'
              value={editValue.date} onChange={(e) => setEditValue({...editValue,date:e.target.value})} />
            <select value={editValue.priority} className='select-input' placeholder='priority' onChange={(e) => setEditValue({...editValue,priority:e.target.value})}>
              <option></option>
              <option>High</option>
              <option>Low</option>
            </select>
              <button type="submit">UPDATE</button>
          </div>
          <button type="button" onClick={cancelUpdate}>BACK</button>
        </form>
      )}
    </>
  )
}
