import { ChangeEvent } from "react"
import { TaskType } from "./Todolist"
import { EditableSpan } from "./EditableSpan"
import IconButton from "@mui/material/IconButton"
import DeleteIcon from '@mui/icons-material/Delete'
import Checkbox from "@mui/material/Checkbox"
import styled from "styled-components"
import List from "@mui/material/List"
import ListItem from "@mui/material/ListItem"

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
        <List
        sx={{
          width: '100%',
          maxWidth: 300,
          bgcolor: 'background.paper',
          position: 'relative',
          overflow: 'auto',
          maxHeight: 250,
          '& ul': { padding: 0 },
        }}
      >
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
                        <ListItem  key={task.id} className={taskClass}>
                            <Checkbox 
                                checked={task.isDone}
                                onChange={onChangeTaskStatusHandler}
                            />
                            <EditableSpan title={task.title} changeTitle={changeTaskHandler} />
                            <IconButton aria-label="delete" size="small" onClick={onClickRemoveTaskHandler}>
                                <DeleteIcon fontSize="inherit" />
                            </IconButton>
                        </ListItem>
                    )
                })}
            </List>
            :
            <EmptyMessage>Your tasks list is empty!</EmptyMessage>
    )

}

const EmptyMessage = styled.span`
    margin: 15px 0;
`