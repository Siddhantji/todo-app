import { useContext } from "react"
import { TodoItemsContext } from "../store/todo-items-store"

export default function Welcome(){
    const {todoItems} = useContext(TodoItemsContext);
    return todoItems.length === 0 &&  <p>Enjoy Your Day</p>
}