import { TaskType } from "./Todolist"

type TasksListPropsType = {
    tasks: TaskType[]
    removeTask: (taskId: string) => void
}


export const TasksList = (props:TasksListPropsType) => {
    
    return (
        <ul>
            {props.tasks.map((task) => {
                const onClickRemoveTaskHandler = (id:string) => {
                    props.removeTask(id)
                }
                return (
                    <li key={task.id}>
                        <input type="checkbox" checked={task.isDone}/>
                        <span>{task.title}</span>
                        <button onClick={() => onClickRemoveTaskHandler(task.id)}>✖️</button>
                    </li>
                )
            })}
        </ul>
    )

}