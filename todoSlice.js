import { createSlice } from "@reduxjs/toolkit";

const todos = [
    {
        id: 1, 
        todo: "Finish Reading \"The Laws of Human Nature\"",
        done: false
    }, 
     {
        id: 2, 
        todo: "Go over React Redux",
        done: false
    }, 
     {
        id: 3, 
        todo: "Be a good person",
        done: false
    }, 
]

const todoSlice = createSlice ({
    name: "todos", 
    initialState: {
        list: todos, 
        loading: false
    }, 
    reducers: {
        addTodo: (state, action) => {
            const newTodo = {
                id: state.list[state.list.length - 1].id + 1, 
                todo: action.payload, 
                done: false
            }
            state.list.push(newTodo)
        }, 
        removeTodo: (state, action) => {
            state.list = state.list.filter(todo => todo.id !== action.payload)
        },
    }
})

export const {addTodo, removeTodo} = todoSlice.actions
export default todoSlice.reducer