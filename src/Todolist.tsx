import { ChangeEvent, KeyboardEvent, useState } from "react"
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
    const [title, setTitle] = useState<string>('')
    const [error, setError] = useState<boolean>(false)
 
    const inputOnChangeHandler = (e: ChangeEvent<HTMLInputElement>) => {
        error && setError(false)
        if (e.target.value.trimStart()) {
            setTitle(e.currentTarget.value)
        }
        else {
            setError(true)
            setTitle('')
        }
    }
    const addTaskHandler = () => {
        props.addTask(props.todoListID, title)
        setTitle('')
    }

    const addTaskOnEnterHandler = (e: KeyboardEvent<HTMLInputElement>) => {
        if (e.key === 'Enter' && !isAddButtonDisabled) {
            addTaskHandler()
        }
    }

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

    const usrMsgLengthTitle: boolean | JSX.Element = title.length > 15 && <p className="error">Your title too long!</p>
    const usMsgrEmptyError = error && <p className="error">Enter task title</p>
    const isAddButtonDisabled = title.length > 15 || title.length === 0

    return (
        <div>
            <h3>{props.title}<button onClick={todoListRemoveHandler}>✖️</button></h3>
            <div>
                <input
                    value={title.trim()}
                    onKeyDown={addTaskOnEnterHandler}
                    onChange={inputOnChangeHandler}
                    placeholder="Please, start typing..."
                    className={error ? "input-error" : ""}
                />
                <button
                    onClick={addTaskHandler}
                    disabled={isAddButtonDisabled}
                >+</button>
                {usrMsgLengthTitle}
                {usMsgrEmptyError}
            </div>
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