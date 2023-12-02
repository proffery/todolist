import IconButton from "@mui/material/IconButton"
import DeleteIcon from '@mui/icons-material/Delete'
import { AddItemForm } from "./AddItemForm"
import { TaskFilterValueType } from "./App"
import { EditableSpan } from "./EditableSpan"
import { TasksList } from "./TasksList"
import Button from "@mui/material/Button"
import Stack from "@mui/material/Stack"
import styled from "styled-components"
import { Typography } from "@mui/material"

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
    changeTask: (todoListID: string, taskID: string, taskTitle: string) => void
    changeTodoListTitle: (todoListID: string, todoListTitle: string) => void
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

    const changeTaskHandler = (taskID: string, title: string) => {
        props.changeTask(props.todoListID, taskID, title)
    }

    const changeTodoListTitleHandler = (todoListTitle: string) => {
        props.changeTodoListTitle(props.todoListID, todoListTitle)
    }

    return (
        <Stack gap={1}>
            <TodoListTitle>
                <EditableSpan title={props.title} changeTitle={changeTodoListTitleHandler} />
                <IconButton aria-label="delete" size="medium" onClick={todoListRemoveHandler}>
                    <DeleteIcon fontSize="inherit" />
                </IconButton>
            </TodoListTitle>
            <AddItemForm callback={addTaskHandler} />
            <TasksList
                tasks={props.tasks}
                todoListID={props.todoListID}
                removeTask={props.removeTask}
                changeStatus={props.changeStatus}
                changeTask={changeTaskHandler}
            />
            <Stack spacing={1} direction={"row"}>
                <Button
                    color="secondary"
                    variant={props.filter === "all" ? "contained" : "outlined"}
                    onClick={onAllClickHandler}
                    size="small"
                >All</Button>
                <Button
                    color="success"
                    variant={props.filter === "active" ? "contained" : "outlined"}
                    onClick={onActiveClickHandler}
                    size="small"
                >Active</Button>
                <Button
                    color="primary"
                    variant={props.filter === "completed" ? "contained" : "outlined"}
                    onClick={onCompletedClickHandler}
                    size="small"
                >Completed</Button>
            </Stack>
        </Stack>
    )
}

const TodoListTitle = styled.h2`
    display: flex;
    align-items: center;
    margin: 5px 0;
`