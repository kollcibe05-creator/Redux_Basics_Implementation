import { useState } from "react"
import { useDispatch } from "react-redux"
import { addTodo } from "../../todoSlice" 

function TodoInput () {
    const [todo, setTodo] = useState("")
    const dispatch = useDispatch()

    function handleChange(e) {
        setTodo(e.target.value)
    }
    function handleSubmit (e) {
        dispatch(addTodo(todo))
        setTodo("")
    }
    return (
        <>
            <label htmlFor="todo">Make it Rain!!</label>
            <input type="text" value={todo} name="todo" id="todo" onChange={handleChange}/>
            <input type="submit" value="submit" id="todo" onClick={handleSubmit}/>
        </>
    ) 
}

export default TodoInput