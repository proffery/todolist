import { ChangeEvent, KeyboardEvent, useState } from "react"
import { TaskFilterValueType } from "./App"
import { TasksList } from "./TasksList"

type TodolistPropsType = {
    tasks: TaskType[]
    title: string
    filter: TaskFilterValueType
    removeTask: (taskId: string) => void
    addTask: (taskTitle: string) => void
    setFilter: (value: TaskFilterValueType) => void
    changeStatus: (taskID: string, newStatus: boolean) => void
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
        props.addTask(title)
        setTitle('')
    }

    const addTaskOnEnterHandler = (e: KeyboardEvent<HTMLInputElement>) => {
        if (e.key === 'Enter' && !isAddButtonDisabled) {
            addTaskHandler()
        }
    }

    const onAllClickHandler = () => {
        props.setFilter('all')
    }

    const onActiveClickHandler = () => {
        props.setFilter('active')
    }

    const onCompletedClickHandler = () => {
        props.setFilter('completed')
    }

    const usrMsgLengthTitle: boolean | JSX.Element = title.length > 15 && <p className="error">Your title too long!</p>
    const usMsgrEmptyError = error && <p className="error">Enter task title</p>
    const isAddButtonDisabled = title.length > 15 || title.length === 0

    return (
        <div>
            <h3>{props.title}</h3>
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