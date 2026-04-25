import { configureStore } from "@reduxjs/toolkit";
import movieReducer from  "./movieSlice"
import todoReducer from "./todoSlice"


export const store = configureStore({
     reducer: {    //takes two props ~ a state and an action
        movies: movieReducer,
        todos: todoReducer
     }
})  