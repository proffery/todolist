import { AddItemForm } from "./AddItemForm"
import { TaskFilterValueType } from "./App"
import { TasksList } from "./TasksList"

type TodolistPropsType = {
    todoListID: string
    tasks: TaskType[]
    title: string
    filter: TaskFilterValueType
    removeTask: (todoListID: string, taskID: string) => void
    addTask: (todoListID: string, taskTitle: string) => void
    setFilter: (todoListID: string, value: TaskFilterValueType) => void
    changeStatus: (todoListID: string, taskID: string, newStatus: boolean) => void
    removeTodoList: (todoListID: string) => void
}

export type TaskType = {
    id: string
    title: string
    isDone: boolean
}

export const Todolist = (props: TodolistPropsType) => {

    const onAllClickHandler = () => {
        props.setFilter(props.todoListID, 'all')
    }

    const onActiveClickHandler = () => {
        props.setFilter(props.todoListID, 'active')
    }

    const onCompletedClickHandler = () => {
        props.setFilter(props.todoListID, 'completed')
    }

    const todoListRemoveHandler = () => {
        props.removeTodoList(props.todoListID)
    }

    const addTaskHandler = (title: string) => {
        props.addTask(props.todoListID, title)
    }

    return (
        <div>
            <h3>{props.title}<button onClick={todoListRemoveHandler}>✖️</button></h3>
            <AddItemForm callback={addTaskHandler} />
            <TasksList
                tasks={props.tasks}
                todoListID={props.todoListID}
                removeTask={props.removeTask}
                changeStatus={props.changeStatus}
            />
            <div>
                <button className={props.filter === "all" ? "btn-filter-active" : ""} onClick={onAllClickHandler}>All</button>
                <button className={props.filter === "active" ? "btn-filter-active" : ""} onClick={onActiveClickHandler}>Active</button>
                <button className={props.filter === "completed" ? "btn-filter-active" : ""} onClick={onCompletedClickHandler}>Completed</button>
            </div>
        </div>
    )
}