import React from 'react'
import { useSelector, useDispatch } from 'react-redux';
import { Icon } from 'react-icons-kit';
import {trash} from 'react-icons-kit/feather/trash'
import {edit2} from 'react-icons-kit/feather/edit2'
import { removeTodo, handleCheckbox } from '../redux/todoapp/actions';
import uuid from 'react-uuid';

export const Todos = ({handleEditClick, editFormVisibility}) => {
  // dispatch function to dispatch an action
  const dispatch = useDispatch();

  // getting todos from the store
  const todos = useSelector((state)=>state.operationsReducer);
  return todos.map((todo,key)=>(
    <div className='todo-box'>
        <div className='content' key={uuid()}>
            <p>
                {todo.title}
            </p>
            <p>{todo.description}</p>
            <p>{todo.date}</p>
            <p>{todo.priority}</p>
        </div>
        <div className='actions-box'>
              {editFormVisibility===false&&(
                <>
                  <span onClick={()=>handleEditClick({todo})}><Icon icon={edit2}/></span>
                  <span onClick={()=>dispatch(removeTodo(todo.title))}><Icon icon={trash}/></span>
                </>
              )}
        </div>
    </div>
  ))
}
