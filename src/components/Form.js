import React,{useState, useEffect} from 'react'
import { useDispatch } from 'react-redux';
import { addTodo, handleEditSubmit } from '../redux/todoapp/actions';
import './form.css';

export const Form = ({editFormVisibility, editTodo, cancelUpdate}) => {

  // dispatch function to dispatch an action
  const dispatch = useDispatch();
  const initital = {
    title: "",
    description: "",
    date: "",
    priority: "",
  }
  // todo value state for normal add todo form
  const [todoValue, setTodoValue]=useState(initital);

  // state for if someone changes the (to edit) value in update form
  const [editValue, setEditValue]=useState('');

  // useEffect is to show the (to edit) value in update form
  useEffect(()=>{
    setEditValue(editTodo.todo);
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
    let editedObj={
      id: editTodo.id,
      todo: editValue,
      completed: false
    }
    dispatch(handleEditSubmit(editedObj))
  }

 

  return (
    <>
      {editFormVisibility===false?(
        <form onSubmit={handleSubmit}>
          <label>Add ToDo Items Here</label>
          <div className='create-area'>
              <input type="text" className='input' placeholder='Title' required
              value={todoValue.title} onChange={(e) => setTodoValue({...todoValue,title:e.target.value})}/>
              <input type="text" className='input' placeholder='Description' required
              value={todoValue.description} onChange={(e) => setTodoValue({...todoValue,description:e.target.value})}/>
            <input type="date" className='input' required placeholder='date'
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
        <form className='form-group custom-form' onSubmit={editSubmit}>
            <label>Update ToDo Items Here</label>
          <div className='input-and-btn'>
              <input type="text" className='form-control' required
              value={editValue||""} onChange={(e)=>setEditValue(e.target.value)}/>
              <button type="submit" className='btn btn-secondary btn-md'>UPDATE</button>
          </div>
          <button type="button" className='btn btn-primary btn-md back-btn'
          onClick={cancelUpdate}>BACK</button>
        </form>
      )}
    </>
  )
}
