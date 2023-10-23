import { TaskFilterValueType } from "./App"
import { TasksList } from "./TasksList"

type TodolistPropsType = {
    tasks: TaskType[]
    title: string
    removeTask: (taskId: number) => void
    setFilter: (value: TaskFilterValueType) => void
}

export type TaskType = {
    id: number
    title: string
    isDone: boolean
}

export const Todolist = (props: TodolistPropsType) => {
    return (
        <div>
            <h3>{props.title}</h3>
            <div>
                <input/>
                <button>+</button>
            </div>
            <TasksList tasks={props.tasks} 
                removeTask={props.removeTask}
            />            
            <div>
                <button onClick={() => props.setFilter('all')}>All</button>
                <button onClick={() => props.setFilter('active')}>Active</button>
                <button onClick={() => props.setFilter('completed')}>Completed</button>
            </div>
        </div>
    )
}