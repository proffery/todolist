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
    const onChangeTitleHandler = (e:ChangeEvent<HTMLInputElement>) => setTitle(e.currentTarget.value)
    
    return (
        edit 
        ? <input onBlurCapture={inputHandler} type="text" value={title} onChange={onChangeTitleHandler} autoFocus/>
        : <span onDoubleClick={spanHandler}>{props.title}</span>
    )
}