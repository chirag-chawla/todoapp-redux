/* eslint-disable array-callback-return */
import { ADD_TODO, REMOVE_TODO, UPDATE_TODO } from "../actions";

export const initialState=[
    {id:1, title: 'title1', description: 'Buy Laptop', date: "",priority: "High"},
    {id:2, title: 'title2', description: 'Master Redux', date: "", priority: "Low"},
    {id:3, title: 'title3', description: 'Watering Plants', date: "", priority: "High"},
];

export const operationsReducer=(state=initialState, action)=>{
    switch(action.type){
        case ADD_TODO:
            const todoList= [...state, action.payload];
            //localStorage.setItem("todoList",JSON.stringify(todoList));
            return todoList;
        case REMOVE_TODO:
            const filteredTodos = state.filter((todo)=>todo.title!==action.payload);
            //localStorage.setItem("todoList",JSON.stringify(filteredTodos));
            return filteredTodos;
        case UPDATE_TODO:
            let data = JSON.parse(JSON.stringify(action.payload));
            // const updatedArray=[];
            // console.log(updatedArray,"updated");
            console.log(JSON.parse(JSON.stringify(state)));
            // console.log(JSON.parse(JSON.stringify(action.payload)));
            console.log(data)

            const updatedToDoList = state.map(item => {
                if(item.id===data.id){
                    item.title=data.title;
                    item.description=data.description;
                    item.priority=data.priority;
                    item.date=data.date;
                }
                return item;
            })
            //localStorage.setItem("todoList",JSON.stringify(updatedToDoList));
            return updatedToDoList;
            // return updatedArray;
        default: return state;
    }
}