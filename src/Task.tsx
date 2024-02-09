import React, { ChangeEvent } from "react"
import { TaskType } from "./Todolist"
import { EditableSpan } from "./EditableSpan"
import IconButton from '@mui/material/IconButton/IconButton';
import { Delete } from "@mui/icons-material";
import { Checkbox } from "@mui/material";

interface TaskPropsType extends TaskType {
    changeTaskStatus: (e: ChangeEvent<HTMLInputElement>) => void
    removeTask: () => void
    changeTitle: (newValue: string) => void
}

export const Task = (props: TaskPropsType) => {
    return (
        <div key={props.id} className={props.isDone ? "is-done" : ""}>
            <Checkbox
                checked={props.isDone}
                color="primary"
                onChange={props.changeTaskStatus}
            />

            <EditableSpan
                value={props.title}
                onChange={props.changeTitle} 
            />
            <IconButton onClick={props.removeTask}>
                <Delete />
            </IconButton>
        </div>
    )
}