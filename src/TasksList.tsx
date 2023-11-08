import { ChangeEvent } from "react"
import { TaskType } from "./Todolist"

type TasksListPropsType = {
    todoListID: string
    tasks: TaskType[]
    removeTask: (todoListID: string, taskId: string) => void
    changeStatus: (todoListID: string, taskID: string, newStatus: boolean) => void
}


export const TasksList = (props: TasksListPropsType) => {

    return (
        props.tasks.length ?
            <ul>
                {props.tasks.map((task) => {
                    const onClickRemoveTaskHandler = () => {
                        props.removeTask(props.todoListID, task.id)
                    }
                    const onChangeTaskStatusHandler = (e: ChangeEvent<HTMLInputElement>) => {
                        props.changeStatus(props.todoListID, task.id, e.currentTarget.checked)
                    }
                    const taskClass = task.isDone ? "task-is-done" : "task"
                    return (
                        <li key={task.id} className={taskClass}>
                            <input
                                type="checkbox"
                                checked={task.isDone}
                                onChange={onChangeTaskStatusHandler}
                            />
                            <span>{task.title} </span>
                            <button onClick={onClickRemoveTaskHandler}>✖️</button>
                        </li>
                    )
                })}
            </ul>
            :
            <span>Your tasks list is empty!</span>
    )

}