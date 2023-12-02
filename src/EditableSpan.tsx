import Typography from "@mui/material/Typography"
import TextField from "@mui/material/TextField"
import { ChangeEvent, useState } from "react"

type EditableSpanPropsType = {
    title: string
    changeTitle: (title: string) => void
}

export const EditableSpan = (props: EditableSpanPropsType) => {
    const [edit, setEdit] = useState(false)
    const [title, setTitle] = useState(props.title)
    const spanHandler = () => setEdit(true)
    const inputHandler = () => {
        setEdit(false)
        props.changeTitle(title)
    }
    const onChangeTitleHandler = (e: ChangeEvent<HTMLInputElement>) => setTitle(e.currentTarget.value)

    return (
        edit
            ? <TextField
                size="small"
                value={title}
                variant="standard"
                onBlurCapture={inputHandler}
                onChange={onChangeTitleHandler}
                autoFocus
            />
            : <Typography onDoubleClick={spanHandler}>{props.title}</Typography>
    )
}