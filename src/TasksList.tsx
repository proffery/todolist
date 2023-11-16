import { ChangeEvent } from "react"
import { TaskType } from "./Todolist"
import { EditableSpan } from "./EditableSpan"

type TasksListPropsType = {
    todoListID: string
    tasks: TaskType[]
    removeTask: (todoListID: string, taskId: string) => void
    changeStatus: (todoListID: string, taskID: string, newStatus: boolean) => void
    changeTask: (taskID: string, title: string) => void
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

                    const changeTaskHandler = (title: string) => {
                        props.changeTask(task.id, title)
                    }

                    return (
                        <li key={task.id} className={taskClass}>
                            <input
                                type="checkbox"
                                checked={task.isDone}
                                onChange={onChangeTaskStatusHandler}
                            />
                            <EditableSpan title={task.title} changeTitle={changeTaskHandler} />
                            <button onClick={onClickRemoveTaskHandler}>✖️</button>
                        </li>
                    )
                })}
            </ul>
            :
            <span>Your tasks list is empty!</span>
    )

}