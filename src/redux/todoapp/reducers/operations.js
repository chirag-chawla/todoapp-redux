/* eslint-disable array-callback-return */
import { ADD_TODO, REMOVE_TODO, UPDATE_TODO } from "../actions";

const initialState=[
    {title: 1, description: 'Buy Laptop', date: "",priority: "High"},
    {title: 2, description: 'Master Redux', date: "", priority: "Low"},
    {title: 3, description: 'Watering Plants', date: "", priority: "High"},
];

export const operationsReducer=(state=initialState, action)=>{
    switch(action.type){
        case ADD_TODO:
            return [...state, action.payload];
        case REMOVE_TODO:
            const filteredTodos = state.filter((todo)=>todo.title!==action.payload);
            return filteredTodos;
        case UPDATE_TODO:
            let data = action.payload;
            const updatedArray=[];
            state.map((item)=>{
                if(item.id===data.id){
                    item.id = data.id;
                    item.todo = data.todo;
                    item.completed = data.completed;
                }
                updatedArray.push(item);
            })
            return updatedArray;
        default: return state;
    }
}