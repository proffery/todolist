type TasksListPropsType = {
    tasks: TaskType[]
}

type TaskType = {
    id: number
    title: string
    isDone: boolean
}

export const TasksList = (props:TasksListPropsType) => {
    
    return (
        <ul>
            {props.tasks.map((task) => {
                return (
                    <li key={task.id}><input type="checkbox" checked={task.isDone}/><span>{task.title}</span></li>
                )
            })}
        </ul>
    )

}