export const ADD_TODO = 'ADD_TODO';
export const REMOVE_TODO = 'REMOVE_TODO';
export const UPDATE_TODO = 'UPDATE_TODO';
export const FETCH_TODO = 'FETCH_TODO';

export const fetchTodo=(payload)=>{
    return{
        type: FETCH_TODO,
        payload
    }
}

export const addTodo=(payload)=>{
    return{
        type: ADD_TODO,
        payload
    }
}

export const removeTodo=(payload)=>{
    return{
        type: REMOVE_TODO,
        payload
    }
}

export const handleEditSubmit=(payload)=>{
    return{
        type: UPDATE_TODO,
        payload
    }
}