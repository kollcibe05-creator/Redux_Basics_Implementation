import { useState } from "react"
import { useSelector, useDispatch } from "react-redux"
import { removeTodo } from "../../todoSlice"
function TodoList () {
    const todos = useSelector( state => state.todos.list)
    const dispatch = useDispatch()

    function handleDelete (id) {
        dispatch(removeTodo(id))
    } 
    return (
        <ul>
            {todos.map( todo => (
                <li key={todo.id} onClick={() => handleDelete(todo.id)}>
                    {todo.todo}
                </li>
            ))}
        </ul>
    )
}
export default TodoList
