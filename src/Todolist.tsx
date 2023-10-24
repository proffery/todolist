import { useState } from "react"
import { TaskFilterValueType } from "./App"
import { TasksList } from "./TasksList"

type TodolistPropsType = {
    tasks: TaskType[]
    title: string
    removeTask: (taskId: string) => void
    addTask: (taskTitle: string) => void
    setFilter: (value: TaskFilterValueType) => void
}

export type TaskType = {
    id: string
    title: string
    isDone: boolean
}

export const Todolist = (props: TodolistPropsType) => {
    const [title, setTitle] = useState('')

    const inputOnChangeHandler = (e: any) => {
        setTitle(e.currentTarget.value)
    }
    const addTaskOnClickHandler = () => {
        props.addTask(title)
        setTitle('')
    }

    const addTaskOnEnterHandler = (e: any) => {
        if (e.key === 'Enter') { 
            props.addTask(title)
            setTitle('')
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


    return (
        <div>
            <h3>{props.title}</h3>
            <div>
                <input 
                    value={title} 
                    onKeyDown={addTaskOnEnterHandler} 
                    onChange={inputOnChangeHandler}
                />
                <button onClick={addTaskOnClickHandler}>+</button>
            </div>
            <TasksList tasks={props.tasks} 
                removeTask={props.removeTask}
            />            
            <div>
                <button onClick={onAllClickHandler}>All</button>
                <button onClick={onActiveClickHandler}>Active</button>
                <button onClick={onCompletedClickHandler}>Completed</button>
            </div>
        </div>
    )
}